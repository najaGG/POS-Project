import Template from "../components/Template";
import axios from "axios";
import config from "../config";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import Modal from "../components/Model";

function Home() {
    const [user, setUser] = useState();
    const [pws, setPws] = useState();
    useEffect(() => {
        Login();
    }, [])

    const Login = () => {
        const btnlogin = document.getElementById('nonClosableModal');
        btnlogin.click();
    }
    const handleLogin = async () => {
        try {
            if (user === undefined || pws === undefined) {
                Swal.fire({
                    title: 'โปรดระบุข้อมูลให้ครบถ้วน',
                    icon: 'warning',
                    timer:2000
                });
            }
            else {
                const payload ={
                    phone: user,
                    pws: pws
                }
                await axios.post(config.api_path + '/users/login', payload).then(res => {
                    if (res.data.message === 'success') {
                        Swal.fire({
                            title: 'โปรดจดจำรหัสผ่านของท่าน',
                            icon: 'success',
                            text: 'เพื่อสิทธิประโยชน์ของท่านเอง',
                            showConfirmButton: true
                        });
                        localStorage.setItem(config.token_name, res.data.token);
                    }
                }).catch(err => {
                    throw err.response.data;
                })
            }
        } catch (e) {
            Swal.fire({
                title: "Error",
                text: e.message,
                icon: "error",
            })
        }
    }
    return (
        <>
            <Template>
                <button data-toggle="modal" data-target="#modalUser"
                    className="btn invisible login" title="Edit" id="nonClosableModal"
                    data-backdrop="static" data-keyboard="false" aria-labelledby="nonClosableModalLabel" >
                </button>
                <Modal id='modalUser' title='Login' modalSize='modal-lg' >
                    <div className="container">
                        <div className="text-center"><strong>โปรดระบุข้อมูลให้ครบถ้วน</strong></div>
                        <div className="row">
                            <div className="mt-2 col-6">
                                <label>Phone</label>
                                <input onChange={e => setUser(e.target.value)}
                                    className="form-control" />
                            </div>
                            <div className="mt-2 col-6">
                                <label>PIN digit</label>
                                <input  onChange={e => setPws(e.target.value)}
                                    type="password" className="form-control" />
                            </div>
                        </div>
                        <div className="mt-3 text-center">
                            <button id='comfirmS' onClick={handleLogin} className="btn btn-outline-success">
                                <i class="fa-solid fa-user-check mr-2"></i>
                                Login</button>
                        </div>
                    </div>
                </Modal>
            </Template>
        </>
    )
}

export default Home;