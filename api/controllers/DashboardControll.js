const express = require('express');
const app = express();
const DashboardModel = require('../models/DashboardModel');
const { Op, Sequelize } = require('sequelize');

app.get('/api/dashboard-data', async (req, res) => {
    try {
        const { startDate, endDate } = req.query;

        const data = await DashboardModel.findAll({
            attributes: ['productID', 'nameProduct', 'storkD', 'decrease', 'createdAt','status'],
            where: {
                createdAt: {
                    [Op.between]: [new Date(startDate), new Date(endDate)]
                }
            }
        });

        const groupedData = data.reduce((acc, item) => {
            const productID = item.productID;
            if (!acc[productID]) {
                acc[productID] = [];
            }
            acc[productID].push({
                nameProduct: item.nameProduct,
                storkD: item.storkD,
                decrease: item.decrease,
                remaining: item.storkD - item.decrease,
                date: item.date
            });
            return acc;
        }, {});

        res.json(groupedData);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

app.post('/data/dashboard', async (req, res) => {
    try {
        let payload = req.body;
        await DashboardModel.create(payload);
        res.send({ message: 'success', payload: payload });
    } catch (e) {
        res.status(500).send(e.message);
    }
})

app.get('/datas/dashboard', async (req, res) => {
    try {
        const allData = await DashboardModel.findAll({
            attributes: ['productID', 'nameProduct', 'stockD', 'decrease', 'all', 'createdAt'],
            where: {
                status: 'active',
                createdAt: {
                    [Op.gte]: Sequelize.literal("NOW() - INTERVAL '1 month'")
                },
                decrease: {
                    [Op.gt]: 0 
                }
            },
            order: [['productID', 'ASC'], ['createdAt', 'DESC']]
        });

        const latestData = allData.reduce((acc, item) => {
            if (!acc[item.productID] || item.createdAt > acc[item.productID].createdAt) {
                acc[item.productID] = item;
            }
            return acc;
        }, {});

        const result = Object.values(latestData).filter(item => item.decrease > 0);

        res.send({ message: 'success', result: result });
    } catch (e) {
        res.status(500).send(e.message);
    }
});


module.exports = app;

