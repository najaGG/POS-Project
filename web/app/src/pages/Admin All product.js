import { useState } from 'react';
import TemplateAdmin from "../components/TemplateAdmin";

function Allproduct() {
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
            shortText: "details",
            longText: "รายละเอียดเพิ่มเติมเกี่ยวกับการใช้งานสินค้า.",
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
            <TemplateAdmin>
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    {products.map((item, index) => (
                        <div className="col" key={index} style={{ display: 'flex', flexDirection: 'column' }}>
                            <div className="card h-100" style={{ display: 'flex', flexDirection: 'column' }}>
                                <img 
                                    src="/images/PIR sensor.png" 
                                    className="card-img-top" 
                                    alt="PIR Sensor" 
                                    style={{ marginBottom: '20px' }} 
                                />
                                <div className="card-body" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                    <h5 className="card-title" style={{ textAlign: 'left', width: '100%' }}>
                                        <div style={{ textAlign: 'center' }}>
                                            <strong>{item.title}</strong>
                                        </div>
                                        <div style={{ textAlign: 'left', marginTop: '20px', fontWeight: 'bold' }}>
                                            การใช้งานสินค้า
                                        </div>
                                    </h5>
                                    <div style={{ textAlign: 'left', width: '100%', marginTop: '10px' }}>
                                        <p className="card-text">
                                            {expanded[index] ? item.longText : item.shortText}
                                        </p>
                                    </div>
                                    <button 
                                        onClick={() => toggleExpand(index)} 
                                        className="btn btn-primary" 
                                        style={{ marginTop: '20px' }}
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
                                                -
                                            </button>
                                            <p style={{ margin: '0 10px', fontSize: '16px' }}>
                                                <strong>จำนวน :</strong> {quantities[index] !== undefined ? quantities[index] : item.quantity}
                                            </p>
                                            <button 
                                                onClick={() => handleQuantityChange(index, 1)}
                                                className="btn btn-secondary"
                                                style={{ marginLeft: '5px', padding: '5px 10px' }} 
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </TemplateAdmin>
        </>
    );
}

export default Allproduct;
