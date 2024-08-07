const express = require('express');
const cors = require('cors');
const app = express();
const port = 3555
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const ProductControll = require('./controllers/ProductControll');
const AdminControll = require('./controllers/AdminControll');
const MemberControll = require('./controllers/MemberControll');
const ProductImageControll = require('./controllers/ProductImageControll');
const BuyproductControll = require('./controllers/BuyproductControll');
const DashboardControll = require('./controllers/DashboardControll');
const OwnerControll = require('./controllers/OwnerControll');
const BillsaleControll = require('./controllers/BillsaleControll');
app.use('/uploads',express.static('uploads'))
app.use(DashboardControll);
app.use(BuyproductControll);
app.use(ProductImageControll);
app.use(MemberControll);
app.use(ProductControll);
app.use(AdminControll);
app.use(OwnerControll);
app.use(BillsaleControll);


app.listen(port,() =>{
    console.log('listening on port ', port);
})