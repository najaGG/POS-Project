const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const ProductModel = require('./controllers/ProductControll');
app.use(ProductModel);

app.listen(port,() =>{
    console.log('listening on port ', port);
})