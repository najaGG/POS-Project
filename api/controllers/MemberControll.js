const express = require('express');
const app = express();
const MemberModel = require('../models/MemberModel');
const jwt = require('jsonwebtoken');
const service = require('./Service');
const AdminModel = require('../models/AdminModel');

app.get('/member/info',service.Islogin, async (req, res) => {
    try{
        const token = service.getToken(req);
        const payload = jwt.decode(token);
        const member = await AdminModel.findByPk(payload.id,{
            attributes: ['id','phone']
        });
        res.send({result:member , message: 'success'});
    }catch(e){
        res.statusCode = 500;
        return res.send({message: e.message});
    }
})

module.exports = app;