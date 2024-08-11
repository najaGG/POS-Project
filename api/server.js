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

app.use('/uploads', express.static('uploads'))
app.use(DashboardControll);
app.use(BuyproductControll);
app.use(ProductImageControll);
app.use(MemberControll);
app.use(ProductControll);
app.use(AdminControll);
app.use(OwnerControll);
app.use(BillsaleControll);

const { spawn } = require('child_process');

app.post('/api/call', (req, res) => {
    const { totalPrice } = req.body;
    if (totalPrice === undefined) {
        return res.status(400).json({ error: 'Missing coin parameter' });
    }

    const pythonProcess = spawn('python', ['coin.py', totalPrice]);
    let count = 0;
    let outputData = '';

    pythonProcess.stdout.on('data', (data) => {
        outputData += data.toString();  // รวบรวมข้อมูลทั้งหมด
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`Error: ${data}`);
    });

    pythonProcess.on('close', (code) => {
        // ตรวจสอบข้อมูลทั้งหมดที่รวบรวมได้
        console.log(`Complete Python output: ${outputData}`);
        
        // แปลงข้อมูลออกเป็นบรรทัด
        const outputs = outputData.split('\n');
        outputs.forEach(line => {
            if (line.trim() === '1') {
                count += 10;  // เพิ่มค่า count ทุกครั้งที่เจอ '1'
            }
        });

        res.json({ count, code });
    });
});

app.listen(port, () => {
    console.log('listening on port ', port);
})