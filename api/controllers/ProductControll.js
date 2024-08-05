const express = require('express');
const app = express();
const ProductModel = require('../models/ProductModel');
const service = require('./service');
app.post('/product/insert', service.Islogin, async (req, res) => {
    try{
        let payload = req.body
        payload.adminID = service.getAdminId(req);
        const result = await ProductModel.create(payload);
        res.send({result: result,message: 'success'});
    }catch(e) {
        res.statusCode = 500;
        res.send({massage: e.message});
    }
})

module.exports = app;