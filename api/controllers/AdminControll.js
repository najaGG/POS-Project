const express = require('express');
const app = express();
const AdminModel = require('../models/AdminModel');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const service = require('./service');

app.post('/admin/insert', async (req, res) => {
    try{
        let payload = req.body;
        await AdminModel.create(payload);
        res.send({message: "success"});
    }catch(e){
        res.statusCode = 500;
        res.send({message: e.message});
    }
})

app.post('/admin/login', async (req, res) => {
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

app.get('/admin/info',service.Islogin, async (req, res) => {
    try{
        const token = service.getToken(req);
        const payload = jwt.decode(token);
        const Admin = await AdminModel.findByPk(payload.id,{
            attributes: ['id','phone']
        });
        res.send({result:Admin , message: 'success'});
    }catch(e){
        res.statusCode = 500;
        return res.send({message: e.message});
    }
})

module.exports = app;

