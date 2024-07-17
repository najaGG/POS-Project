import Template from "../components/Template";
import axios from "axios";
import config from "../config";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import Modal from "../components/Model";

function Home() {
    const [user, setUser] = useState({});
    const [users, setUsers] = useState([]);
    const [password, setPassword] = useState('');
    useEffect(() => {
        Login();
    },[])

    const handleSave = async () => {
        try {
            if (user.phone === undefined || user.pws === undefined) {
                Swal.fire({
                    title: 'โปรดระบุข้อมูลให้ครบถ้วน',
                    icon: 'warning',
                    timer: 3000
                })
            } else {
                await axios.post(config.api_path + '/users/insert', user).then(res => {
                    if (res.data.message === 'success') {
                        Swal.fire({
                            title: 'บันทึกข้อมูล',
                            text: "สำเร็จ",
                            icon: 'success',
                            timer: 2000
                        });
                    }
                }).catch(err => {
                    throw err.response.data
                })
            }
        } catch (e) {
            Swal.fire({
                title: "Error",
                text: "ระบุข้อมูลไม่ครบ",
                icon: "error",
            })
        }
    }
    const Login = () => {
        const btnlogin = document.getElementById('login');
            btnlogin.click();
    }
    const handleLogin = async () => {
        if (user.phone === undefined || user.pws === undefined) {
                Swal.fire({
                    title: 'โปรดระบุข้อมูลให้ครบถ้วน',
                    icon: 'warning',
                    timer: 3000
                })
            }else{

            }
    }
    return (
        <>
            <button data-toggle="modal" data-target="#modalUser"
                className="btn invisible" title="Edit" id="login">
            </button>
            <Modal id='modalUser' title='Login' modalSize='modal-lg' className="Login">
                <div className="container">
                    <div className="text-center"><strong>Admin</strong></div>
                    <div className="row">
                        <div className="mt-2 col-6">
                            <label>Phone</label>
                            <input value={user.name} onChange={e => setUser({ ...user, phone: e.target.value })}
                                className="form-control" />
                        </div>
                        <div className="mt-2 col-6">
                            <label>PIN digit</label>
                            <input value={user.pws} onChange={e => setUser({ ...user, pws: e.target.value })}
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
        </>
    )
}

export default Home;