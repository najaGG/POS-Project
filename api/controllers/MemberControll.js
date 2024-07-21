const express = require('express');
const app = express();
const MemberModel = require('../models/MemberModel');
const jwt = require('jsonwebtoken');
const service = require('./Service');

app.get('/member/info',service.Islogin, async (req, res) => {
    try{
        const token = service.getToken(req);
        const payload = jwt.decode(token);
        const member = await MemberModel.findByPk(payload.id,{
            attributes: ['id','phone']
        });
        res.send({result:member , message: 'success'});
    }catch(e){
        res.statusCode = 500;
        return res.send({message: e.message});
    }
})

app.post('/member/insert',service.Islogin, async (req, res) => {
    try{
        let payload = req.body;
        payload.AdminID = service.getAdminId(req);
        await MemberModel.create(payload);
        res.send({message: payload});
    }catch(e){
        res.statusCode = 500;
        res.send({message: e.message});
    }
})

module.exports = app;