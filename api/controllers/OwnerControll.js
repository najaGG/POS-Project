const express = require('express');
const app = express();
const OwnerModel = require('../models/OwnerModel');
require('dotenv').config();
const jwt = require('jsonwebtoken');

app.post('/owner/check', async (req, res) => {
    try{
        const Owner = await OwnerModel.findAll({
            where: {
                phone: req.body.phone,
                pws: req.body.pws,
                role:'Owner'
            }
        })
        if(Owner.length > 0) {
            let token = jwt.sign({id: Owner[0].id}, process.env.secret)
            return res.send({token: token, message: 'success'});
        } else {
            res.statusCode = 401;
            return res.send({message: 'เบอร์โทรหรือรหัสผ่านไม่ถูกต้อง'});
        }
    }catch(e){
        res.statusCode = 500;
        res.send({message: e});
    }
})

app.post('/owner/insert', async (req, res) => {
    try{
        let payload = req.body;
        await OwnerModel.create(payload);
        res.send({message: "success"});
    }catch(e){
        res.statusCode = 500;
        res.send({message: e.message});
    }
})

module.exports = app;

