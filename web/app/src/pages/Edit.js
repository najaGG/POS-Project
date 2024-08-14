import Template from "../components/TemplateAdmin";
import axios from "axios";
import config from "../config";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import Modal from "../components/Model";

function Editproduct() {
    const [product, setProduct] = useState({})
    const [productImage, setProductImage] = useState({});
    const [products, setProducts] = useState([]);
    const [productImg, setProductImg] = useState([]);

    useEffect(() => {
        fatchData()
    }, [])

    const fatchData = async () => {
        try {
            await axios.get(config.api_path + "/product/list", config.headers()).then(res => {
                if (res.data.message === "success") {
                    setProducts(res.data.result);
                }
            })
        } catch (e) {
            Swal.fire({
                title: "List of products Error",
                text: e.message,
                icon: "error",
                timer: 3000
            })
        }
    }

    const close = () => {
        const closebtn = document.getElementsByClassName('btn-Close');
        for (let i = 0; i < closebtn.length; i++) {
            closebtn[i].click();
        }
    }

    const clearForm = () => {
        setProduct({
            name: '',
            detail: '',
            price: '',
            cost: '',
            barcode: ''
        });
    }
    const saveImg = () => {
        Swal.fire({
            title: "ยืนยันการเพิ่มรูปภาพใหม่",
            icon: 'question',
            showCancelButton: true,
            showConfirmButton: true
        }).then(res => {
            if (res.isConfirmed) {
                handlesavePic();
                clearForm();
            }
        })
    }

    const handlesave = async (e) => {
        e.preventDefault();
        try {
            let url = '/product/insert';
            if (product.id !== undefined) {
                url = '/product/update';
            }
            await axios.post(config.api_path + url, product, config.headers()).then(res => {
                if (res.data.message === "success") {
                    Swal.fire({
                        title: 'บันทึกข้อมูล',
                        text: 'บันทึกข้อมูลสำเร็จ',
                        icon: 'success',
                        timer: 2000
                    })
                    fatchData()
                    close()
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
    const handlesavePic = async () => {
        try {
            const _config = {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem(config.token_name),
                    'Content-Type': 'mulipart/form-data'
                }
            }
            const formdata = new FormData();
            formdata.append('productImage', productImage);
            formdata.append('productImagename', productImage.name);
            formdata.append('productID', product.id);
            await axios.post(config.api_path + '/picture/insert', formdata, _config).then(res => {

                console.log("Response received:", res);
                Swal.fire({
                    title: 'บันทึกข้อมูล',
                    text: 'บันทึกข้อมูลสำเร็จ',
                    icon: 'success',
                    timer: 2000
                })
                fatchDataproductImg({ id: product.id });
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

    const handleChange = (files) => {
        setProductImage(files[0]);
    }

    const fatchDataproductImg = async (item) => {
        try {
            await axios.get(config.api_path + "/productImage/list/" + item.id, config.headers()).then(res => {
                if (res.data.message === "success") {
                    setProductImg(res.data.result);
                }
            }).catch(err => {
                throw err.response.data
            })
        } catch (e) {
            Swal.fire({
                title: 'Error ',
                icon: 'error',
                text: e.message,
                timer: 3000
            })
        }
    }

    const handlechoose = (item) => {
        setProduct(item);
        fatchDataproductImg(item);
    }

    const hendleChooseMainImage = (item) => {
        Swal.fire({
            title: "เลือกภาพหลัก",
            text: "ยืนยันการเลือกภาพหลักของสินค้าา",
            icon: 'question',
            showCancelButton: true,
            showConfirmButton: true
        }).then(async res => {
            if (res.isConfirmed) {
                try {
                    let url = config.api_path + '/productImage/chooseMainImage/' + item.id + '/' + item.productID;
                    await axios.get(url, config.headers()).then(res => {
                        if (res.data.message === 'success') {
                            fatchDataproductImg({
                                id: item.productID,
                            });
                            Swal.fire({
                                title: 'บันทึกภาพหลัก',
                                text: 'บันทึกภาพหลักสำเร็จ',
                                icon: 'success',
                                timer: 2000
                            })
                        }
                    }).catch(err => {
                        throw err.response.data;
                    })
                } catch (e) {
                    Swal.fire({
                        title: 'Error',
                        text: e.message,
                        icon: 'error'
                    })
                }
            }
        })
    }

    const hendleDeleteImage = (item) => {
        try {
            Swal.fire({
                title: 'ลบภาพสินค้า',
                text: 'ยืนยันการลบภาพสินค้า',
                icon: 'question',
                showCancelButton: true,
                showConfirmButton: true
            }).then(async res => {
                if (res.isConfirmed) {
                    await axios.delete(config.api_path + '/productImage/delete/' + item.id, config.headers()).then(res => {
                        if (res.data.message === 'success') {
                            fatchDataproductImg({
                                id: product.id
                            });
                            Swal.fire({
                                title: 'ลบภาพสินค้า',
                                text: 'ลบภาพสินค้าเรียบร้อยแล้ว',
                                icon: 'success',
                                timer: 2000
                            });
                        }
                    }).catch(err => {
                        throw err.response.data
                    })
                }
            })
        } catch (e) {
            Swal.fire({
                title: 'Error',
                text: e.message,
                icon: 'error'
            })
        }
    }

    const handleDelete = (item) => {
        Swal.fire({
            title: 'ลบข้อมูล',
            text: 'ยืนยันการลบข้อมูล ?',
            showCancelButton: true,
            showConfirmButton: true,
            icon: 'warning',
        }).then(async res => {
            if (res.isConfirmed) {
                try {
                    await axios.delete(config.api_path + '/product/delete/' + item.id, config.headers()).then(res => {
                        if (res.data.message === "success") {
                            fatchData();
                            Swal.fire({
                                title: 'ลบข้อมูล',
                                text: 'ลบข้อมูลเรียบร้อย',
                                icon: 'success',
                                timer: 2000
                            });
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
                    <div className="col-8">
                        <div className="input-group input-group-lg mb-3">
                            <span className="input-group-text" id="inputGroup-sizing-lg">การใช้งานสินค้า</span>
                            <input type="text" className="form-control" aria-label="Sizing example input"
                                aria-describedby="inputGroup-sizing-lg" value={product.detail}
                                onChange={e => setProduct({ ...product, detail: e.target.value })} />
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="input-group input-group-lg mb-3">
                            <span className="input-group-text" id="inputGroup-sizing-lg">ตำแหน่งสินค้า</span>
                            <select className="form-select" aria-label="Select product position"
                                value={product.motor}
                                
                                onChange={e => setProduct({ ...product, motor: e.target.value })}>
                                <option disabled>*กรุณาเลือกให้ไม่ซ่ำกัน*</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                            </select>
                        </div>
                    </div>


                </div>
                <div className="mt-2 text-center">
                    <button type="submit" className="btn btn-primary mb-3" onClick={handlesave}>บันทึก</button>
                </div>
                <table className="mt-3 table table-hover table-bordered">
                    <thead>
                        <tr>
                            <th>รหัสสินค้า</th>
                            <th>ชื่อสินค้า</th>
                            <th className="text-right">จำนวนสินค้าปัจจุบัน</th>
                            <th className="text-right">ราคาจำหน่ายต่อชิ้น</th>
                            <th>รายละเอียดเพิ่มเติม</th>
                            <th width="200px" className="text-center">แก้ไข</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length > 0 ? products.map(item =>
                            <tr className="h5">
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td className="text-right">{parseInt(item.stock).toLocaleString('th-TH')}</td>
                                <td className="text-right">{parseInt(item.price).toLocaleString('th-TH')}</td>
                                <td>{item.detail}</td>
                                <td className="text-center">
                                    <button onClick={e => handlechoose(item)} className="btn btn-info mr-2"
                                        title="Add Image" data-toggle='modal' data-target="#modalProductImage">
                                        <i className="fa fa-image"></i>
                                    </button>
                                    <button onClick={e => setProduct(item)} data-toggle='modal' data-target='#modalProduct'
                                        className="btn btn-primary" title="Edit">
                                        <i className="fa fa-pencil "></i>
                                    </button>
                                    <button onClick={e => handleDelete(item)} className="btn btn-danger ml-2" title="Delete">
                                        <i className="fa fa-times "></i>
                                    </button>
                                </td>
                            </tr>
                        ) : ''}
                    </tbody>
                </table>
            </Template>

            <Modal id="modalProduct" title="เพิ่มสินค้า" modalSize='modal-lg'>
                <div className="row">
                    <div className="mt-3 col-4">
                        <label>รหัสสินค้า</label>
                        <input value={product.id} onChange={e => setProduct({ ...product, id: e.target.value })}
                            readOnly className="form-control" />
                    </div>

                    <div className="mt-3 col-4">
                        <label>ชื่อสินค้า</label>
                        <input value={product.name} onChange={e => setProduct({ ...product, name: e.target.value })}
                            className="form-control" />
                    </div>

                    <div className="mt-3 col-4">
                        <label>เพิ่มสินค้า</label>
                        <input value={product.stock} onChange={e => setProduct({ ...product, stock: e.target.value })}
                            className="form-control" type="number" />
                    </div>

                    <div className="mt-3 col-3">
                        <label>ราคาจำหน่ายต่อชิ้น</label>
                        <input value={product.price} onChange={e => setProduct({ ...product, price: e.target.value })}
                            className="form-control" type="number" />
                    </div>

                    <div className="mt-3 col-9">
                        <label>รายละเอียดเพิ่มเติม</label>
                        <input value={product.detail} onChange={e => setProduct({ ...product, detail: e.target.value })}
                            className="form-control" />
                    </div>
                    <div className="mt-3 text-center">
                        <button onClick={handlesave} className="btn btn-outline-success">
                            <i class="fa-solid fa-cart-arrow-down mr-2"></i>
                            บันทึก
                        </button>
                    </div>
                </div>
            </Modal>

            <Modal id="modalProductImage" title="สินค้า" modalSize='modal-lg'>
                <div className="row">
                    <div className="mt-3 col-4">
                        <label>รหัสสินค้า</label>
                        <input value={product.id} onChange={e => setProduct({ ...product, id: e.target.value })} readOnly className="form-control" />
                    </div>

                    <div className="mt-3 col-4">
                        <label>ชื่อสินค้า</label>
                        <input value={product.name} onChange={e => setProduct({ ...product, name: e.target.value })} readOnly className="form-control" />
                    </div>

                    <div className="mt-3 col-4">
                        <label>จำนวนสินค้าคงเหลือ</label>
                        <input value={product.stock} onChange={e => setProduct({ ...product, stock: e.target.value })} readOnly className="form-control" />
                    </div>

                    <div className="mt-3 col-3">
                        <label>ราคาจำหน่ายต่อชิ้น</label>
                        <input value={product.price} onChange={e => setProduct({ ...product, price: e.target.value })} readOnly className="form-control" />
                    </div>

                    <div className="mt-3 col-9">
                        <label>รายละเอียดเพิ่มเติม</label>
                        <input value={product.detail} onChange={e => setProduct({ ...product, detail: e.target.value })} readOnly className="form-control" />
                    </div>
                    <div className="mt-3 col-12">
                        <label className="form-label">เลือกภาพสินค้า</label>
                        <input className="form-control form-control-lg" id="productImage"
                            type="file" name="imageName" onChange={e => handleChange(e.target.files)} />
                    </div>
                    <div className="mt-3 text-center">
                        <button onClick={saveImg} className="btn btn-outline-success">
                            <i class="fa-solid fa-download fa-lg mr-2"></i>
                            บันทึก
                        </button>

                    </div>
                    <hr className="my-4" />
                    <div className="mt-3 h5">ภาพสินค้า</div>
                    <div className="row mt-2">
                        {console.log('productImg:', productImg)}
                        {productImg.length > 0 ? productImg.map(item =>
                            <div className="col-4" key={item.id}>
                                <div className="card">
                                    <img className="card-image-top" src={`${config.api_path}/uploads/${item.imgName}`}
                                        width='100%' alt=" " />
                                    <div className="card-body text-center">
                                        {item.Ismain ?
                                            <button className="btn btn-info">
                                                <i className="fa fa-check mr-2"></i>
                                                ภาพหลัก</button>
                                            :
                                            <button onClick={e => hendleChooseMainImage(item)}
                                                className="btn btn-default">ภาพหลัก</button>
                                        }
                                        <button onClick={e => hendleDeleteImage(item)} className="btn btn-danger ml-3" title="Delete">
                                            <i className="fa fa-times"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : ''}
                    </div>
                </div>
            </Modal >
        </>

    );
}

export default Editproduct;

