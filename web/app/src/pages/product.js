import { useState, useEffect } from "react";
import Modal from "../components/Model";
import Template from "../components/Template";
import axios from "axios";
import config from "../config";
import Swal from "sweetalert2";
import './Allproduct.css'

function Allproduct() {

    const [products, setProducts] = useState([]);
    const [billSale, setBillSale] = useState({});
    const [Itemqty, setItemQty] = useState(0);
    const [currentBill, setCurrentBill] = useState({})
    const [totalPrice, setTotalPrice] = useState(0);
    const [coins, setCoins] = useState(100); // ค่า totalPrice ที่ต้องการส่งไป
    useEffect(() => {
        fatchData()
        openBill()
        fatchBill()
    }, [])

    const openBill = async () => {
        try {
            await axios.get(config.api_path + "/billsale/openbill", config.headers()).then(res => {
                if (res.data.message === 'success') {
                    setBillSale(res.data.result);
                }
            })
        } catch (e) {
            Swal.fire({
                title: "Error",
                text: e.message,
                icon: "error",
                timer: 2000
            })
        }
    }

    const fatchData = async () => {
        try {
            await axios.get(config.api_path + '/product/listsale', config.headers()).then(res => {
                if (res.data.message === 'success') {
                    setProducts(res.data.result);
                }
            })
        } catch (e) {
            Swal.fire({
                title: "Error",
                text: e.message,
                icon: "error",
                timer: 2000
            });
        }
    }

    const fatchBill = async () => {
        try {
            await axios.get(config.api_path + '/Bill/currentInfo', config.headers()).then(res => {
                if (res.data.result !== null) {
                    setCurrentBill(res.data.result);
                    sumtotalprice(res.data.result.buyproducts);
                }
            })
        } catch (e) {
            Swal.fire({
                title: "Error",
                text: e.message,
                icon: "error",
                timer: 2000
            })
        }
    }

    const sumtotalprice = (buyproducts) => {
        let sum = 0
        for (let i = 0; i < buyproducts.length; i++) {
            const item = buyproducts[i];
            const qty = parseInt(item.qty);
            const price = parseInt(item.price);
            sum += qty * price;
        }
        setTotalPrice(sum);
    }

    const buyproduct = async (item, action) => {
        try {
            item.action = action;
            await axios.post(config.api_path + '/product/sale', item, config.headers()).then(res => {
                if (res.data.message === 'success') {
                    item.qty = res.data.qty;
                    setItemQty(item.qty)
                }
            });
        } catch (e) {
            Swal.fire({
                title: "Error",
                text: e.message,
                icon: "error",
                timer: 2000
            });
        }
    }

    const call = async (totalPrice) => {
        try {
            console.log(totalPrice)
            const response = await axios.post(config.api_path +'/api/call',  { totalPrice });
            const { count, code } = response.data;

            console.log(`Count: ${count}`);
            console.log(`Python process exited with code ${code}`);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
            <Template>
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    {products.length > 0 ? products.map((item) => (
                        <div className="col" key={item.id} style={{ display: 'flex', flexDirection: 'column' }}>
                            <div className="card h-100" style={{ display: 'flex', flexDirection: 'column' }}>
                                <div class="card-headert text-center mb-1" style={{ fontSize: '25px' }}>
                                    {item.name}
                                </div>
                                <img
                                    src={`${config.api_path}/uploads/${item.productimages[0].imgName}`}
                                    className="card-img-top "
                                    style={{ marginBottom: '5px' }}
                                />
                                <div className="card-body" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                    <h5 className="card-title" style={{ textAlign: 'left', }}>
                                        <div style={{ textAlign: 'left', marginTop: '0px', fontWeight: 'bold' }}>
                                            การใช้งานสินค้า
                                        </div>
                                    </h5>
                                    <div style={{ textAlign: 'left' }}>
                                        <p className="card-text">
                                            {item.detail}
                                        </p>
                                    </div>

                                    <div style={{ marginTop: '20px', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <p><strong>ราคา : {parseInt(item.price).toLocaleString('th-TH')} บาท</strong></p>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <button onClick={e => buyproduct(item, '-')}
                                                className="btn btn-secondary"
                                                style={{ marginRight: '5px', padding: '5px 10px' }}
                                            >
                                                <i class="fa-solid fa-minus"></i>
                                            </button>
                                            <p style={{ margin: '0 10px', fontSize: '16px' }}>
                                                <strong>จำนวน : {item.qty} ชิ้น  </strong>
                                            </p>
                                            <button onClick={e => buyproduct(item, '+')}
                                                className="btn btn-secondary"
                                                style={{ marginLeft: '5px', padding: '5px 10px' }}
                                            >
                                                <i class="fa-solid fa-plus"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )) : ''}

                </div>
                <div class="d-flex justify-content-center mb-1">
                    <button className="btn btn-primary btn-lg " onClick={fatchBill} data-toggle='modal' data-target="#modalEndSale">
                        <i class="fa-solid fa-cart-shopping me-2"></i>ยืนยันการสั่งซื้อ
                    </button></div>

            </Template>
            <Modal id='modalEndSale' title="ยืนยันการซื้อสินค้า">
                <div>
                    <div><label>ยอดเงินทั้งหมด</label></div>
                    <div className=" d-flex align-items-center mb-3">
                        <div className="input-group">
                            <input
                                value={totalPrice.toLocaleString('th-TH')}
                                className="form-control text-end"
                                style={{ fontSize: '30px' }}
                                disabled
                            />
                            <span className="input-group-text">บาท</span>
                        </div>
                    </div>
                </div>
                {currentBill != {} && currentBill.buyproducts != undefined
                    && currentBill.buyproducts.length > 0 ? currentBill.buyproducts.map(item =>
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-10 h5">ชื่อสินค้า : {item.product.name}</div>
                                    <div className="col-10"><strong className="text-danger" style={{ fontSize: '25px' }}>{item.qty} </strong>
                                        X  <span className="text-success">{parseInt(item.price).toLocaleString('th-TH')} </span>
                                        =  <span className="text-success">{(item.price * item.qty).toLocaleString('th-TH')} บาท</span></div>
                                </div>
                            </div>
                        </div>
                    ) : ''}
                <div className="d-flex justify-content-center">
                    <button data-toggle='modal' data-target="#modalEnd"
                        className="btn btn-success mt-3"
                        onClick={e => call(totalPrice)}
                    >
                        ยืนยันการสั่งซื้อ
                    </button>
                </div>
            </Modal>

            <div class="modal fade" id="modalEnd" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLongTitle">รอการชำระเงิน</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div className="d-flex justify-content-center my-1">
                                <div className="loader"></div>
                            </div>
                            <div className="d-flex justify-content-center mt-3">
                                <p>จำนวนเงินปัจจุบัน : </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    );
}

export default Allproduct;
