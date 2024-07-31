const express = require('express');
const app = express();
const MemberModel = require('../models/MemberModel');
const jwt = require('jsonwebtoken');
const service = require('./service');

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
        const member = await MemberModel.findAll({
            where: {
                phone: req.body.phone,
                pws: req.body.pws,
            }
        })
        if (member.length === 0) {
            let payload = req.body;
            payload.AdminID = service.getAdminId(req);
            const newMember = await MemberModel.create(payload);
            let token = jwt.sign({id: newMember.id}, process.env.secret)
            res.send({ message: 'success',token: token});
        } else {
            if(member.length > 0) {
                let token = jwt.sign({id: member[0].id}, process.env.secret)
                return res.send({token: token, message: 'success'});
            } else {
                res.statusCode = 401;
                return res.send({message: 'เบอร์โทรหรือรหัสผ่านไม่ถูกต้อง'});
            }
        }
    }catch(e){
        res.statusCode = 500;
        res.send({message: e.message});
    }
})

module.exports = app;