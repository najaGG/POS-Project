import { useState, useEffect } from "react";
import Modal from "../components/Model";
import Template from "../components/Template";
import axios from "axios";
import config from "../config";
import Swal from "sweetalert2";
import './Allproduct.css'
import configMember from "../configMember"
import { useNavigate } from "react-router-dom";

function Allproduct() {
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [billSale, setBillSale] = useState({});
    const [Itemqty, setItemQty] = useState(0);
    const [currentBill, setCurrentBill] = useState({})
    const [totalPrice, setTotalPrice] = useState(0);
    const [coins, setCoins] = useState();
    const [datas, setDatas] = useState([]);
    useEffect(() => {
        fatchData()
        openBill()
        fatchBill()
        fetchcoin()
    }, [])
    useEffect(() => {
        if (datas.buyproducts) {
            const payloads = datas.buyproducts.map(product => ({
                productID: product.productID,
                decrease: parseInt(product.qty),
                nameProduct: product.product.name,
                stockD: parseInt(product.product.stock),
                all: parseInt(product.product.stock) - parseInt(product.qty),
                status:product.product.status
            }));
            payloads.forEach(async (payload) => {
                await datadashboard(payload);
            });
        }
    }, [datas]);

    const openBill = async () => {
        try {
            await axios.get(config.api_path + "/billsale/openbill", config.headers()).then(res => {
                if (res.data.message === 'success') {
                    setBillSale(res.data.result);
                }
            }).catch(err => {
                throw err.response.data
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

    const fetchcoin = async () => {
        try {
            axios.get(config.api_path + '/member/info', configMember.headers()).then(res => {
                if (res.data.message === 'success') {
                    setCoins(res.data.result.coin);
                }
            }).catch(err => {
                throw err.response.data;
            })
        } catch (e) {
            Swal.fire({
                titel: "Error",
                icon: "error",
                text: e.message
            })
        }
    }

    const fatchData = async () => {
        try {
            await axios.get(config.api_path + '/product/listsale', config.headers()).then(res => {
                if (res.data.message === 'success') {
                    setProducts(res.data.result);
                }
            }).catch(err => {
                throw err.response.data
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
            }).catch(err => {
                throw err.response.data
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
            }).catch(err => {
                throw err.response.data
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

    const motor = async () => {
        try {
            const payload = currentBill.buyproducts.map(products => ({
                motorid: products.product.motor,
                numberrounds: products.qty
            }));

            await axios.post(config.api_path + '/api/motor', payload).then(res => {
                console.log(res.data)
            }).catch(err => {
                throw err.response.data
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

    const datadashboard = async (payload) => {
        try {
            await axios.post(config.api_path + '/data/dashboard', payload)
        } catch (e) {
            Swal.fire({
                title: "Error",
                text: e.message,
                icon: "error",
                timer: 2000
            });
        }

    }
    const handleSingout = () => {
        localStorage.removeItem(configMember.token_name);
        navigate('/memberlogin');
    }

    const endsale = async () => {
        try {
            await axios.get(config.api_path + '/bill/end', config.headers()).then(res => {
                if (res.data.message === 'success') {
                    setDatas(res.data.result)
                    openBill();
                    fatchBill();
                    fetchcoin();
                    setTotalPrice(0);
                    setTimeout(() => {
                        handleSingout();
                    }, 2000);
                }
            }).catch(err => {
                throw err.response.data;
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

    const newcoins = async (UCion) => {
        try {
            let monney = parseInt(coins) + parseInt(UCion);
            let Umonney = monney - totalPrice;
            const payload = {
                coin: Umonney
            }
            await axios.post(config.api_path + '/member/coins', payload, configMember.headers()).then(res => {
                if (res.data.message === "success") {
                    endsale();
                    motor()
                    close();
                    close2();
                }
            }).catch(err => {
                throw err.response.data
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

    const close = () => {
        const closebtn = document.getElementsByClassName('btn-Close');
        for (let i = 0; i < closebtn.length; i++) {
            closebtn[i].click();
        }
    }
    const close2 = () => {
        const modal = document.getElementById('modalEnd');
        if (modal) {
            // Remove "show" class to hide the modal
            modal.classList.remove('show');
            modal.style.display = 'none';

            // Remove any backdrop elements
            const backdrops = document.querySelectorAll('.modal-backdrop');
            backdrops.forEach((backdrop) => {
                backdrop.parentNode.removeChild(backdrop);
            });

            // Remove classes that prevent interaction with the background
            document.body.classList.remove('modal-open');
            document.body.style.overflow = ''; // Reset overflow style

            // Ensure modal is hidden from screen readers
            modal.setAttribute('aria-hidden', 'true');
        }
    };

    const call = async (totalPrice) => {
        if (coins >= totalPrice) {
            newcoins(0)
            Swal.fire({
                title: "ชำระเงินสำเร็จ",
                html: "กรุณารอซักครู่ กำลังดำเนินการ<br>ยอดเงินคงเหลือจะเก็บไว้ใช้ในครั้งถัดไป<br>จะทำการออกจากระบบในอีกซักครู่",
                icon: 'success',
                timer: 3000,
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading();
                }
            })
        } else {
            try {
                console.log(totalPrice);
                await axios.post(config.api_path + '/api/call', { totalPrice }).then(res => {
                    if (res.data.message === 'success') {
                        const UCion = res.data.count
                        console.log('UCoin:', UCion)
                        newcoins(UCion);
                        Swal.fire({
                            title: "ชำระเงินสำเร็จ",
                            html: "กรุณารอซักครู่ กำลังดำเนินการ<br>ยอดเงินคงเหลือจะเก็บไว้ใช้ในครั้งถัดไป<br>จะทำการออกจากระบบในอีกซักครู่",
                            icon: 'success',
                            timer: 3000,
                            timerProgressBar: true,
                            didOpen: () => {
                                Swal.showLoading();
                            }
                        })
                    }
                }).catch(err => {
                    throw err.response.data
                })
            } catch (error) {
                console.error('Error:', error);
            }
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
                                <div class="card-image-container">
                                    <img
                                        src={`${config.api_path}/uploads/${item.productimages[0].imgName}`}
                                        className="card-img-top card-image"
                                        style={{ marginBottom: '5px' }}
                                    />
                                </div>
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

                    </button>
                </div>

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

            <div className="modal fade" id="modalEnd" data-backdrop="static" >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">รอการชำระเงิน</h5>
                            <button id="btnModalClose" type="button" className="btn-close btn-Close" data-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="d-flex justify-content-center my-1">
                                <div className="loader"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Allproduct;
