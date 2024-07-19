const express = require('express');
const app = express();
const AdminModel = require('../models/AdminModel');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const service = require('./service');


app.post('/users/insert', async (req, res) => {
    try{
        let payload = req.body;
        await AdminModel.create(payload);
        res.send({message: "success"});
    }catch(e){
        res.statusCode = 500;
        res.send({message: e.message});
    }
})

app.post('/users/login', async (req, res) => {
    try{
        const member = await AdminModel.findAll({
            where: {
                phone: req.body.phone,
                pws: req.body.pws,
                role: 'admin'
            }
        })
        if(member.length > 0) {
            let token = jwt.sign({id: member[0].id}, process.env.secret)
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

module.exports = app;

