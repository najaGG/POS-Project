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
        const payload = {
            adminID: service.getAdminId(req),
            status: 'open'
        }
        const currentBill = await BillsaleModal.findOne({
            where: payload
        });
        const item = {
            price: req.body.price,
            productID: req.body.id,
            billSaleId: currentBill.id,
            adminID: payload.adminID
        }
        const Buyproduct = await BuyproductModel.findOne({
            where: item
        })

        const action = req.body.action
        let qty = 0
        if (Buyproduct == null && action === '+') {
            item.qty = 1
            qty = item.qty
            await BuyproductModel.create(item)
        } else {
            if (action === '+') {
                item.qty = parseInt(Buyproduct.qty) + 1;
                qty = item.qty
            } else if (action === '-') {
                item.qty = parseInt(Buyproduct.qty) - 1;
                qty = item.qty
                if (item.qty <= 0) {
                    qty = '0'
                    await BuyproductModel.destroy({
                        where: { id: Buyproduct.id }
                    });
                    res.send({ message: 'success', qty: qty });
                    return;
                }
            } else {
                res.status(400).send({ message: 'Invalid action'  });
                return;
            }
            await BuyproductModel.update(item, {
                where: { id: Buyproduct.id },
            });
        }
        res.send({ message: 'success' , qty: qty})
    } catch (e) {
        res.statusCode = 500;
        res.send({ message: e.message });
    }
})

app.get('/Bill/currentInfo', service.Islogin, async (req, res) =>{
    try{
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
            include:{
                model: BuyproductModel,
                order:[['id','DESC']],
                include:{
                    model:ProductModel,
                    attributes:['name']
                }
            }
        })
        res.send({result: result})
    }catch (e) {
        res.statusCode = 500;
        res.send({message: e.message});
    }
})

app.get ('/bill/end',service.Islogin,async (req, res) => {
    try{
        await BillsaleModal.update({
            status: 'pay',
        },{
            where: {
                status: 'open',
                adminID: service.getAdminId(req)
            }
        })
        res.send({message: 'success'})
    }catch(e){
        res.statusCode =500
        res.send({message:e.message})
    }
})


module.exports = app;

