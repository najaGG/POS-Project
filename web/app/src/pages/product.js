import Template from "../components/Template";
import axios from "axios";
import config from "../config";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import Modal from "../components/Model";

function Product() {
    const [expanded, setExpanded] = useState({});
    const [quantities, setQuantities] = useState({});

    const toggleExpand = (index) => {
        setExpanded((prev) => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    const handleQuantityChange = (index, change) => {
        setQuantities((prev) => {
            const newQuantity = (prev[index] || 0) + change;
            return {
                ...prev,
                [index]: Math.max(newQuantity, 0)
            };
        });
    };

    const calculateTotalPrice = (price, quantity) => {
        const priceValue = parseFloat(price.replace(' บาท', '').replace(',', ''));
        const quantityValue = quantity !== undefined ? quantity : 0;
        return (priceValue * quantityValue).toLocaleString() + ' บาท';
    };

    const products = [
        {
            title: "PIR sensors",
            shortText: "PIR (Passive Infrared) sensors ใช้ในการตรวจจับการเคลื่อนไหวโดยการตรวจจับการเปลี่ยนแปลงของการกระจายของรังสีอินฟราเรดที่ปล่อยออกมาจากวัตถุ ",
            longText: "PIR (Passive Infrared) sensors ใช้ในการตรวจจับการเคลื่อนไหวโดยการตรวจจับการเปลี่ยนแปลงของการกระจายของรังสีอินฟราเรดที่ปล่อยออกมาจากวัตถุ เช่น คนหรือสัตว์ มักใช้ในระบบรักษาความปลอดภัยและระบบควบคุมการส่องสว่างอัตโนมัติ เมื่อมีการเคลื่อนไหวเกิดขึ้น ระบบนี้ทำงานโดยการตรวจจับความแตกต่างในระดับรังสีอินฟราเรดที่ตรวจพบและเซ็นเซอร์จะส่งสัญญาณไปยังระบบควบคุมเพื่อดำเนินการที่เหมาะสม",
            price: "1,500 บาท",
            quantity: "จำนวน 10 ชิ้น"
        },
        {
            title: "sensors",
            shortText: "A relay is an electrically operated switch. It consists of a set of input terminals for a single or multiple control signals, and a set of operating contact terminals. The switch",
            longText: "A relay is an electrically operated switch. It consists of a set of input terminals for a single or multiple control signals, and a set of operating contact terminals. The switch may have any number of contacts in multiple contact forms, such as make contacts, break contacts, or combinations thereof.",
            price: "800 บาท",
            quantity: "จำนวน 15 ชิ้น"
        },
        {
            title: "sensors",
            shortText: "details",
            longText: "รายละเอียดเพิ่มเติมเกี่ยวกับการใช้งานสินค้า.",
            price: "1,200 บาท",
            quantity: "จำนวน 20 ชิ้น"
        },
    ];

    return (
        <>
            <Template>
                <div className="row row-cols-md-3 ">
                    {products.map((item, index) => (
                        <div className="col" key={index} style={{ display: 'flex', flexDirection: 'column' }}>
                            <div className="card " style={{ display: 'flex', flexDirection: 'column' }}>
                                <img
                                    src="/images/PIR sensor.png"
                                    className="card-img-top"
                                    alt="PIR Sensor"
                                />
                                <div className="card-body" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                    <h5 className="card-title" style={{ textAlign: 'left', width: '100%' }}>
                                        <div style={{ textAlign: 'center' }}>
                                            <strong>{item.title}</strong>
                                        </div>
                                        <div style={{ textAlign: 'left', marginTop: '0px', fontWeight: 'bold' }}>
                                            การใช้งานสินค้า
                                        </div>
                                    </h5>
                                    <div style={{ textAlign: 'left', width: '100%', marginTop: '0px' }}>
                                        <p className="card-text">
                                            {expanded[index] ? item.longText : item.shortText}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => toggleExpand(index)}
                                        className="btn btn-primary"
                                        style={{ marginTop: '10px' }}
                                    >
                                        {expanded[index] ? "Read Less" : "Read More"}
                                    </button>
                                    <div style={{ marginTop: '20px', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <p><strong>ราคา :</strong> {calculateTotalPrice(item.price, quantities[index])}</p>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <button
                                                onClick={() => handleQuantityChange(index, -1)}
                                                className="btn btn-secondary"
                                                style={{ marginRight: '5px', padding: '5px 10px' }}
                                            >
                                                <i class="fa-solid fa-minus"></i>
                                            </button>
                                            <p style={{ margin: '0 10px', fontSize: '16px' }}>
                                                <strong>จำนวน :</strong> {quantities[index] !== undefined ? quantities[index] : item.quantity}
                                            </p>
                                            <button
                                                onClick={() => handleQuantityChange(index, 1)}
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
                    ))}

                </div>
                <div className="d-flex justify-content-center mb-4">
                    <button className="btn btn-danger btn-lg">ยืนยันการสั่งซื้อสินค้า</button>
                </div>

            </Template>
        </>
    );
}

export default Product;

