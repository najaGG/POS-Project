const express = require('express');
const app = express();
const ProductImageModel = require('../models/ProductImageModel');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const service = require('./service');

app.use(fileUpload());

app.post('/picture/insert', service.Islogin, async (req, res) => {
    try {
        const productImage = req.files.productImage;
        const date = new Date();
        const y = date.getFullYear();
        const m = date.getMonth() + 1;
        const d = date.getDate();
        const h = date.getHours();
        const mm = date.getMinutes();
        const s = date.getSeconds();
        const ms = date.getMilliseconds();
        const random = Math.floor(Math.random() * 98765416482);

        const newName = y + '-' + m + '-' + d + '-' + h + '-' + mm + '-' + s + '-' + ms + random;
        const arr = productImage.name.split('.');
        const ext = arr[arr.length - 1];
        const fullnewname = newName + '.' + ext;
        const uploadpath = __dirname + '/../uploads/' + fullnewname;

        productImage.mv(uploadpath, async err => {
            if (err) {
                throw new Error(err);
            } else {
                await ProductImageModel.create({
                    Ismain: false,
                    imgName: fullnewname,
                    productID: req.body.productID,
                })
                res.send({ message: 'success' })
            }
        })
    } catch (e) {
        res.statusCode = 500
        res.send({ message: e.message });
    }
})

app.get('/productImage/list/:productID', service.Islogin, async (req, res) => {
    try {
        const result = await ProductImageModel.findAll({
            where: {
                productID: req.params.productID
            },
            order: [['id', 'DESC']]
        });
        res.send({message: 'success',result: result});
    } catch (e) {
        res.statusCode = 500;
        res.send({message: e.message});
    }
});
app.get('/productImage/chooseMainImage/:id/:productID', service.Islogin , async (req,res)=>{
    try{
        await ProductImageModel.update({
            Ismain: false
        }, {
            where: {
                productID: req.params.productID
            }
        })
        await ProductImageModel.update({
            Ismain: true
        },{
            where: {
                id: req.params.id
            }
        })
        res.send({message: 'success'})
    }catch(e){
        res.statusCode = 500;
        res.send({message: e.message});
    }
})

app.delete('/productImage/delete/:id', service.Islogin , async (req,res)=>{
    try{
        const row = await ProductImageModel.findByPk(req.params.id);
        const imgName = row.imgName;
        await ProductImageModel.destroy({
            where:{
                id: req.params.id
            }
        });
        fs.unlinkSync('uploads/' + imgName);

        res.send({message: 'success'});
    }catch(e){
        res.statusCode = 500;
        res.send({message: e.message});
    }
})

module.exports = app;