import { useState, useEffect } from "react";
import Modal from "../components/Model";
import TemplateAdmin from "../components/TemplateAdmin";
import axios from "axios";
import config from "../config";
import Swal from "sweetalert2";
import './Allproduct.css'
{/*---------------- สร้างที่เก็บตัวแปรที่ใช้ภายในหน้าเว็บแอปพลิเคชัน ------------------ */}
function Allproduct() {
    const [products, setProducts] = useState([]);
    {/*------------ เรียกฟังก์ชันดังกล่าวเมื่อมีการเข้าเว็บแอปพลิเคชัน -------------- */}
    useEffect(() => {
        fatchData()
    }, [])
    {/*---------------- ฟังก์ชันเรียกData ข้อมูลของรายการขายสินค้า ------------------ */}
    const fatchData = async () => {
        try {
            await axios.get(config.api_path + '/product/listsale', config.headers()).then(res => {
                if (res.data.message === 'success') {
                    setProducts(res.data.result);
                    console.log(products);
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

    return (
        <>
        {/*---------------- โค้ดแสดงหน้าเว็บแอปพลิเคชัน ------------------ */}
            <TemplateAdmin>
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
                                            <button
                                                className="btn btn-secondary"
                                                style={{ marginRight: '5px', padding: '5px 10px' }}
                                            >
                                                <i class="fa-solid fa-minus"></i>
                                            </button>
                                            <p style={{ margin: '0 10px', fontSize: '16px' }}>
                                                <strong>จำนวน :</strong>
                                            </p>
                                            <button
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
                    <button className="btn btn-primary btn-lg " data-toggle='modal' data-target="#modalEndSale">
                        <i class="fa-solid fa-cart-shopping me-2"></i>ยืนยันการสั่งซื้อ

                    </button>
                </div>
            </TemplateAdmin>
        </>
    );
}

export default Allproduct;
