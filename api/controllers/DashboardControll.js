const express = require('express');
const app = express();
const DashboardModel = require('../models/DashboardModel');
const { Op } = require('sequelize');

app.get('/api/dashboard-data', async (req, res) => {
    try {
        const { startDate, endDate } = req.query;

        const data = await DashboardModel.findAll({
            attributes: ['productID', 'nameProduct', 'storkD', 'decrease', 'createdAt'],
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

app.post('/data/dashboard',async (req, res) => {
    try{
        let payload = req.body;
        await DashboardModel.create(payload);
        res.send({message: 'success',payload: payload});
    }catch (e) {
        res.status(500).send(e.message);
    }
})

app.get('/datas/dashboard', async (req, res) => {
    try{
        const result = await DashboardModel.findAll();
        res.send({message: 'success',payload: result});
    }catch (e){
        res.status(500).send(e.message);
    }
})


module.exports = app;

