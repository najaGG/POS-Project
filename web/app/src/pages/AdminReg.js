import Template from "../components/Template";
import axios from "axios";
import config from "../config";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";

function Home() {
    const [user, setUser] = useState({});
    const [users, setUsers] = useState([]);
    const [password, setPassword] = useState('');

    const handleSave = async () => {
        try {
            if(user.phone === undefined || user.pws === undefined){
                Swal.fire({
                    title:'โปรดระบุข้อมูลให้ครบถ้วน',
                    icon: 'warning',
                    timer: 3000
                })
            }else {
                await axios.post(config.api_path + '/users/insert' , user).then(res => {
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
    return (
        <>
            <div className="container mt-5">
                <div className="text-center"><strong>Admin</strong></div>
                <div className="row">
                <div className="mt-3 col-6">
                    <label>Phone</label>
                    <input value={user.name} onChange={e => setUser({ ...user, phone: e.target.value })}
                        className="form-control" />
                </div>
                    <div className="mt-3 col-6">
                        <label>PIN digit</label>
                        <input value={user.pws} onChange={e => setUser({ ...user, pws: e.target.value })} 
                            type="password" className="form-control" />
                    </div>
                </div>

                <div className="mt-3 text-center">
                    <button id='comfirmS' onClick={handleSave} className="btn btn-outline-success">
                        <i class="fa-solid fa-user-check mr-2"></i>
                        บันทึกข้อมูล</button>
                </div>
                </div>
        </>
    )
}

export default Home;