{/*------------ ไฟล์ MemberControll.js ------------- */}
const express = require('express');
const app = express();
const MemberModel = require('../models/MemberModel');
const jwt = require('jsonwebtoken');
const service = require('./service');

{/*------------ API สำหรับ การโชว์ข้อมูลพื้นฐานของ member ------------- */}
app.get('/member/info', service.Islogin, async (req, res) => {
    try {
        const token = service.getToken(req);
        const payload = jwt.decode(token);
        const member = await MemberModel.findByPk(payload.id, {
            attributes: ['id', 'phone', 'coin']
        });
        res.send({ result: member, message: 'success' });
    } catch (e) {
        res.statusCode = 500;
        return res.send({ message: e.message });
    }
})

{/*------------ API สำหรับ การเรียกจำนวนเหรียญปัจจุบันของผู้ใช้ ------------- */}
app.post('/member/coins', async (req, res) => {
    try {
        let payload = req.body
        payload.id = service.getAdminId(req);
        const result = await MemberModel.update(payload, {
            where: {
                id: payload.id
            }
        });
        res.send({ payload: payload,message: 'success' });
    } catch (e) {
        res.statusCode = 500;
        res.send({message: e.message});
    }

})
{/*------------ API สำหรับ การเพิ่มบัญชีผู้ใช้งานใหม่ ------------- */}
app.post('/member/insert', service.Islogin, async (req, res) => {
    try {
        const member = await MemberModel.findAll({
            where: {
                phone: req.body.phone,
            }
        });
        if (member.length > 0) {
            if (member[0].pws !== req.body.pws) {
                res.statusCode = 401;
                return res.send({ message: 'เบอร์โทรหรือรหัสผ่านไม่ถูกต้อง' });
            } else {
                let token = jwt.sign({ id: member[0].id }, process.env.secret);
                return res.send({ token: token, message: 'success' });
            }
        } else {
            let payload = req.body;
            payload.AdminID = service.getAdminId(req);
            const newMember = await MemberModel.create(payload);
            let token = jwt.sign({ id: newMember.id }, process.env.secret);
            return res.send({ message: 'success', token: token });
        }
    } catch (e) {
        res.statusCode = 500;
        res.send({ message: e.message });
    }
});


module.exports = app;