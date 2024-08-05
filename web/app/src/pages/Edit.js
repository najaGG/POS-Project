import Template from "../components/TemplateAdmin";
import axios from "axios";
import config from "../config";
import Swal from "sweetalert2";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Editproduct() {
    const [product, setProduct] = useState({})

    const handlesave = async (e) => {
        e.preventDefault();
        try {
            await axios.post(config.api_path + "/product/insert", product, config.headers()).then(res => {
                if (res.data.message === "success") {
                    Swal.fire({
                        title: 'บันทึกข้อมูล',
                        text: 'บันทึกข้อมูลสำเร็จ',
                        icon: 'success',
                        timer: 2000
                    })
                }
            });
        } catch (e) {
            Swal.fire({
                title: "Error",
                text: e.message,
                icon: "error",
                timer: 2000
            })
        }

    }
    const handlesavePic = () => {
        Swal.fire({
            title: 'ยืนยันการเพิ่มรูป',
            text: 'โปรดยืนยันเพื่ออัพโหลด',
            icon: 'question',
            showCancelButton: true,
            showConfirmButton: true
        }).then(async res => {
            try {
                const _config = {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem(config.token_name),
                        'Content-Type': 'mulipart/form-data'
                    }
                }

            } catch (e) {

            }
        })
    }

    return (
        <>
            <Template>
                <div className="row">
                    <p className="text-start">แก้ไข / เพิ่มเติมสินค้า</p>
                    <div className="col-4">
                        <div className="input-group input-group-lg mb-3 ">
                            <span className="input-group-text" id="inputGroup-sizing-lg">ชื่อสินค้า</span>
                            <input type="text" className="form-control" aria-label="Sizing example input"
                                aria-describedby="inputGroup-sizing-lg" value={product.name}
                                onChange={e => setProduct({ ...product, name: e.target.value })} />

                        </div>
                    </div>

                    <div className="col-4">
                        <div className="input-group input-group-lg mb-3">
                            <span className="input-group-text" id="inputGroup-sizing-lg">จำนวนเริ่มต้น</span>
                            <input type="number" className="form-control" aria-label="Sizing example input"
                                aria-describedby="inputGroup-sizing-lg" placeholder="ตัวเลขเท่านั้น" value={product.stock}
                                onChange={e => setProduct({ ...product, stock: e.target.value })} />
                        </div>
                    </div>

                    <div className="col-4">
                        <div className="input-group input-group-lg mb-3">
                            <span className="input-group-text" id="inputGroup-sizing-lg">ราคาต่อชิ้น</span>
                            <input type="number" className="form-control" aria-label="Sizing example input"
                                aria-describedby="inputGroup-sizing-lg" placeholder="ตัวเลขเท่านั้น" value={product.price}
                                onChange={e => setProduct({ ...product, price: e.target.value })} />
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="input-group input-group-lg mb-3">
                            <span className="input-group-text" id="inputGroup-sizing-lg">การใช้งานสินค้า</span>
                            <input type="text" className="form-control" aria-label="Sizing example input"
                                aria-describedby="inputGroup-sizing-lg" value={product.detail}
                                onChange={e => setProduct({ ...product, detail: e.target.value })} />
                        </div>
                    </div>
                    <div>
                        <label for="formFileLg" class="form-label">เลือกภาพสินค้า</label>
                        <input class="form-control form-control-lg" id="formFileLg" type="file" />
                    </div>

                    <div>
                        <label htmlFor="productImage" className="form-label">เลือกภาพสินค้า</label>
                        <input className="form-control form-control-lg" id="productImage" type="file" />
                    </div>

                </div>

                <div className="mt-2 text-center">
                    <button type="submit" className="btn btn-primary mb-3">บันทึก</button>
                </div>
                <form className="row g-3">
                    <div className="col-auto">
                        <button type="submit" className="btn btn-primary mb-3" onClick={handlesave}>
                            Confirm identity</button>
                    </div>
                </form>

            </Template>
        </>
    );
}

export default EditProduct;
