const express = require('express');
const app = express();
const ProductImageModel = require('../models/ProductImageModel');
const fileUpload = require('express-fileupload');
const fs =require('fs');
const service = require('./service');

app.use(fileUpload());

app.post('/picture/insert', service.Islogin, async (req, res) => {
    try{
        const productImage = req.files.productImage;
        const date = new Date();
        const y = date.getFullYear();
        const m = date.getMonth()+1;
        const d = date.getDate();
        const h = date.getHours();
        const random = Math.floor(Math.random() * 98765416482) ;

        const newName = y + '-' + m + '-' + d + '-' + h + '-'  + random;
        const arr = productImage.name.split('.');
        const ext = arr[arr.length - 1];
        const fullnewname = newName + '.' + ext;
        const uploadpath = __dirname + '/../upload/' + fullnewname
        productImage.mv(uploadpath , async err =>{
            if(err){
                throw new Error(err);
            }else{
                await  ProductImageModel .create({
                    Ismain: false,
                    imgName: fullnewname,
                    productID: req.body.productID,
                })
                res.send({message: 'success'})
            }
        })
    }catch(e){
        res.statusCode = 500
        res.send({message: e.message});
    }

})

module.exports = app;