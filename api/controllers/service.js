{/*------------ ไฟล์ service ช่วยในการเขียนสิ่งที่ต้องเขียนซ่ำๆ ------------- */}
module.exports = {
    getToken: (req) => {
        return req.headers.authorization.replace('Bearer ','');
    },
    Islogin:(req,res,next) => {
        require('dotenv').config();
        const jwt = require('jsonwebtoken');
        if(req.headers.authorization != null){
            const token = req.headers.authorization.replace('Bearer ','');
            const secret = process.env.secret;
            try{
                const verify = jwt.verify(token,secret);
                if(verify != null){
                    next();
                }
            }catch(e){
                res.statuscode = 401;
                return res.send('โปรดเข้าสู่ระบบ');
            }
        }
        else{
            res.statuscode = 401;
            return res.send('โปรดเข้าสู่ระบบ');
        }
    },
    getAdminId: (req) =>{
        const jwt = require('jsonwebtoken');
        const token = req.headers.authorization.replace('Bearer ', '');
        const payLoad =jwt.decode(token);
        return payLoad.id
    }
}

