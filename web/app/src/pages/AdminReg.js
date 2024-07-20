import Template from "../components/Template";
import axios from "axios";
import config from "../config";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import Modal from "../components/Model";
import './reg.css'
function Home() {
    const [user, setUser] = useState();
    const [pws, setPws] = useState();


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
                    timer: 2000
                });
            }
            else {
                const payload = {
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
    const numpad = () => {

    }
    return (
        <>
            <div className="container mt-5">
                <div className="text-center mb-2"><strong>โปรดระบุข้อมูลให้ครบถ้วน</strong></div>
                <div className="row">
                    <div className="mt-2 col-6 ">
                        <label>Phone</label>
                        <input id='out1' onChange={e => setUser(e.target.value)}
                            className="form-control" readOnly />
                    </div>
                    <div className="mt-2 col-6">
                        <label>PIN digit</label>
                        <input id='out2' onChange={e => setPws(e.target.value)}
                            type="password" className="form-control" readOnly />
                    </div>
                </div>
                <div className=" numpad mt-3 text-center">
                    <button onClick={numpad} value={1} className="btn btn-outline-success">1</button>
                    <button className="btn btn-outline-success">2</button>
                    <button className="btn btn-outline-success">3</button>
                    <button className="btn btn-outline-success">4</button>
                    <button className="btn btn-outline-success">5</button>
                    <button className="btn btn-outline-success">6</button>
                    <button className="btn btn-outline-success">7</button>
                    <button className="btn btn-outline-success">8</button>
                    <button className="btn btn-outline-success">9</button>
                    <button className="btn btn-outline-success">0</button>
                    <button id='comfirmS' onClick={handleLogin} className="btn btn-outline-success">
                        <i class="fa-solid fa-user-check mr-2"></i>
                        Login</button>
                </div>
            </div>
        </>
    )
}

export default Home;