const express = require('express');
const app = express();
const service = require('./service')
const jwt = require('jsonwebtoken');

const BuyproductModel = require('../models/BuyproductModel');
const BillsaleModal = require('../models/BillsaleModal');

require('dotenv').config()

app.get('/billsale/openbill', service.Islogin, async (req, res) => {
    try {
        const payload = {
            adminID: service.getAdminId(req),
            status: 'open'
        }
        let result = await BillsaleModal.findOne({
            where: payload
        });
        if (result == null) {
            result = await BillsaleModal.create(payload);
        }
        res.send({ message: 'success', result: result });
    } catch (e) {
        res.statusCode = 500;
        res.send({ message: e.message });
    }
})

app.post('/product/sale', service.Islogin, async (req, res) => {
    try {
        const ProductModel = require('../models/ProductModel');
        const payload = {
            adminID: service.getAdminId(req),
            status: 'open'
        }
        const currentBill = await BillsaleModal.findOne({ where: payload });

        const item = {
            price: req.body.price,
            productID: req.body.id,
            billSaleId: currentBill.id,
            adminID: payload.adminID
        };

        const Buyproduct = await BuyproductModel.findOne({ where: item });
        const productInStock = await ProductModel.findOne({ where: { id: req.body.id } });
        let availableQty = parseInt(productInStock.stock); // แปลงค่าเป็นจำนวนเต็ม
        const action = req.body.action;
        let qty = 0;

        if (Buyproduct == null && action === '+') {
            if (availableQty >= 1) {
                item.qty = 1;
                qty = item.qty;
                await BuyproductModel.create(item);
                await ProductModel.update({ stock: availableQty - 1 }, { where: { id: req.body.id } });
            } else {
                res.status(400).send({ message: 'จำนวนสินค้าไม่เพียงพอ' });
                return;
            }
        } else if (Buyproduct) {
            if (action === '+') {
                if (availableQty > 0) {
                    item.qty = parseInt(Buyproduct.qty) + 1;
                    qty = item.qty;
                    await BuyproductModel.update({ qty: item.qty }, { where: { id: Buyproduct.id } });
                    await ProductModel.update({ stock: availableQty - 1 }, { where: { id: req.body.id } });
                } else {
                    res.status(400).send({ message: 'จำนวนสินค้าไม่เพียงพอ' });
                    return;
                }
            } else if (action === '-') {
                item.qty = parseInt(Buyproduct.qty) - 1;
                qty = item.qty;

                await ProductModel.update({ stock: availableQty + 1 }, { where: { id: req.body.id } });

                if (item.qty <= 0) {
                    qty = '0';
                    await BuyproductModel.destroy({ where: { id: Buyproduct.id } });
                    res.send({ message: 'success', qty: qty });
                    return;
                }

                await BuyproductModel.update({ qty: item.qty }, { where: { id: Buyproduct.id } });
            } else {
                res.status(400).send({ message: 'Invalid action' });
                return;
            }
        }

        res.send({ message: 'success', qty: qty });
    } catch (e) {
        res.status(500).send({ message: e.message });
    }
});

app.get('/Bill/currentInfo', service.Islogin, async (req, res) => {
    try {
        const BuyproductModel = require('../models/BuyproductModel');
        const ProductModel = require('../models/ProductModel');

        BuyproductModel.belongsTo(ProductModel, { foreignKey: 'productID' });
        BuyproductModel.belongsTo(BillsaleModal, { foreignKey: 'billSaleId' });
        BillsaleModal.hasMany(BuyproductModel, { foreignKey: 'billSaleId' });

        const result = await BillsaleModal.findOne({
            where: {
                status: 'open',
                adminID: service.getAdminId(req)
            },
            include: {
                model: BuyproductModel,
                order: [['id', 'DESC']],
                include: {
                    model: ProductModel,
                    attributes: ['name','motor']
                }
            }
        })
        res.send({ result: result })
    } catch (e) {
        res.statusCode = 500;
        res.send({ message: e.message });
    }
})

app.get('/bill/end', service.Islogin, async (req, res) => {
    try {
        await BillsaleModal.update({
            status: 'pay',
        }, {
            where: {
                status: 'open',
                adminID: service.getAdminId(req)
            }
        })
        res.send({ message: 'success' })
    } catch (e) {
        res.statusCode = 500
        res.send({ message: e.message })
    }
})


module.exports = app;

