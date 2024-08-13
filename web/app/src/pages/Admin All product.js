import { useState, useEffect } from "react";
import Modal from "../components/Model";
import TemplateAdmin from "../components/TemplateAdmin";
import axios from "axios";
import config from "../config";
import Swal from "sweetalert2";
import './Allproduct.css'

function Allproduct() {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fatchData()
    }, [])

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
            <TemplateAdmin>
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
                                    <div style={{ textAlign: 'left'}}>
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
            </TemplateAdmin>
        </>
    );
}

export default Allproduct;
