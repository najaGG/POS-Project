const express = require('express');
const app = express();
const AdminModel = require('../models/AdminModel');

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


module.exports = app;

