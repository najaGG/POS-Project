import Template from "../components/Template";
import axios from "axios";
import config from "../config";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import Modal from "../components/Model";

function Home() {
    const [user, setUser] = useState({});
    useEffect(() => {
        Login();
    }, [])

    const Login = () => {
        const btnlogin = document.getElementById('nonClosableModal');
            btnlogin.click();
    }
    const handleLogin = async () => {
        if (user.phone === undefined || user.pws === undefined) {
            Swal.fire({
                title: 'โปรดจดจำรหัสผ่านของท่าน',
                icon: 'warning',
                text: 'เพื่อสิทธิประโยชน์ของท่านเอง',
                showConfirmButton: true
            });
        }
        else {
            await axios.post(config.api_path + '/user/login', user).then(res => {
                if (res.data.message === 'success') {
                    Swal.fire({
                        title: 'บันทึกข้อมูล',
                        text: "สำเร็จ",
                        icon: 'success',
                        timer: 2000
                    });
                    localStorage.setItem(config.token_name, res.data.token);

                }
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
            </Template>
        </>
    )
}

export default Home;