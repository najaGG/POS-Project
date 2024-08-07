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

app.get('/product/list',service.Islogin, async (req, res) => {
    try{
        const result = await ProductModel.findAll({
            where: {
                adminID: service.getAdminId(req)
            },
            order:[['id','DESC']]
        });
        res.send({result: result,message: 'success'});
    }catch(e) {
        res.statusCode =500;
        res.send({message : e.message})
    }
})

app.delete('/product/delete/:id',service.Islogin , async (req,res) =>{
    try{
        const result = await ProductModel.destroy({
            where:{
                id: req.params.id
            }
        })
        res.send({result: result, message: 'success'});
    }catch(e){
        res.statusCode = 500;
        res.send({message: e.message});
    }
})

app.post('/product/update',service.Islogin , async (req,res) =>{
    try{
        let payload = req.body;
        payload.adminID = service.getAdminId(req)

        const result = await ProductModel.update(payload,{
            where:{
                id: req.body.id
            }
        });
        res.send({result: result, message: 'success'});
    }catch(e){
        res.statusCode = 500;
        res.send({message: e.message});
    }
})

module.exports = app;