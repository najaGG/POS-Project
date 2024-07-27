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

app.use(DashboardControll);
app.use(BuyproductControll);
app.use(ProductImageControll);
app.use(MemberControll);
app.use(ProductControll);
app.use(AdminControll);
app.use(OwnerControll);

const socketIo = require('socket.io');
const http = require('http');
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('sendMessage', (message) => {
        console.log(message);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});




server.listen(port,() =>{
    console.log('listening on port ', port);
})