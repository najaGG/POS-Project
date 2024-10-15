{/*------------ ไฟล์ DashboardControll.js ------------- */}
const express = require('express');
const app = express();
const DashboardModel = require('../models/DashboardModel');
const { Op, Sequelize } = require('sequelize');
{/*------------ API สำหรับ การสร้างข้อมูลลง dashboard ------------- */}
app.post('/data/dashboard', async (req, res) => {
    try {
        let payload = req.body;
        await DashboardModel.create(payload);
        res.send({ message: 'success', payload: payload });
    } catch (e) {
        res.status(500).send(e.message);
    }
})
{/*------------ API สำหรับ การดึงข้อมูลไปแสดงผลเป็น dashboard ------------- */}
app.get('/datas/dashboard', async (req, res) => {
    try {
        const allData = await DashboardModel.findAll({
            attributes: ['productID','nameProduct','stockD','decrease','all','createdAt'],
            where: {
                status: 'active',
                createdAt: {
                    [Op.gte]: Sequelize.literal("NOW() - INTERVAL '1 month'")
                },
                decrease: {
                    [Op.gt]: 0
                }
            },
        });

        const result = Object.values(allData);

        res.send({ message: 'success', result: result });
    } catch (e) {
        res.status(500).send(e.message);
    }
});


module.exports = app;

