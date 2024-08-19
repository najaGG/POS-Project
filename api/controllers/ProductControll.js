const express = require('express');
const app = express();
const ProductModel = require('../models/ProductModel');
const service = require('./service');
app.post('/product/insert', service.Islogin, async (req, res) => {
    try {
        let payload = req.body;
        payload.adminID = service.getAdminId(req);
        
        const activeCount = await ProductModel.count({
            where: { status: 'active' }
        });
        if (activeCount >= 3) {
            return res.status(400).send({ message: 'ไม่สามารถเพิ่มสินค้าได้มากกว่า 3 ชิ้น' });
        }
        
        const result = await ProductModel.create(payload);
        res.send({ result: result, message: 'success' });
    } catch (e) {
        res.status(500).send({ message: e.message });
    }
});

app.get('/product/list', service.Islogin, async (req, res) => {
    try {
        const result = await ProductModel.findAll({
            where: {
                adminID: service.getAdminId(req),
                status: 'active'
            },
            order: [['id', 'DESC']]
        });
        res.send({ result: result, message: 'success' });
    } catch (e) {
        res.statusCode = 500;
        res.send({ message: e.message })
    }
})

app.delete('/product/delete/:id', service.Islogin, async (req, res) => {
    try {
        const result = await ProductModel.update(
            { status: 'close' },
            { where: { id: req.params.id } }
        );

        res.send({ result: result, message: 'success' });
    } catch (e) {
        res.statusCode = 500;
        res.send({ message: e.message });
    }
})

app.post('/product/update', service.Islogin, async (req, res) => {
    try {
        let payload = req.body;
        payload.adminID = service.getAdminId(req)

        const result = await ProductModel.update(payload, {
            where: {
                id: req.body.id
            }
        });
        res.send({ result: result, message: 'success' });
    } catch (e) {
        res.statusCode = 500;
        res.send({ message: e.message });
    }
})

app.get('/product/listsale', service.Islogin, async (req, res) => {
    const ProductImageModel = require('../models/ProductImageModel');
    ProductModel.hasMany(ProductImageModel, { foreignKey: 'productID' });
    ProductImageModel.belongsTo(ProductModel, { foreignKey: 'productID' })

    try {
        const result = await ProductModel.findAll({
            where: {
                adminID: service.getAdminId(req),
                status: 'active'
            },
            include: {
                model: ProductImageModel,
                where: {
                    Ismain: true
                }
            },
            order: [['id', 'DESC']]
        })
        res.send({ result: result, message: 'success' });
    } catch (e) {
        res.statusCode = 500;
        res.send({ message: e.message });
    }
})



module.exports = app;