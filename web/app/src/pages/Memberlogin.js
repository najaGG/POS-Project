
import axios from "axios";
import config from "../config";
import configMember from "../configMember";
import Swal from "sweetalert2";
import { useState } from "react";
import './reg.css'
import { useNavigate } from "react-router-dom";
import hashSum from 'hash-sum';
{/*---------------- สร้างที่เก็บตัวแปรที่ใช้ภายในหน้าเว็บแอปพลิเคชัน ------------------ */}
function Home() {
    const [input1Value, setInput1Value] = useState('');
    const [input2Value, setInput2Value] = useState('');
    const [selectedInput, setSelectedInput] = useState(null);
{/*------------ สร้างการส่งต่อหน้าแอปพลิเคชัน -------------- */}
    const navigate = useNavigate();
{/*------------ ฟังก์ชันการตรวจสอบข้อมูลการล็อกอินกับฐานข้อมูล -------------- */}
    const handleLogin = async () => {
        try {
            if (input1Value === '' || input2Value === '') {
                Swal.fire({
                    title: 'โปรดระบุข้อมูลให้ครบถ้วน',
                    icon: 'warning',
                    timer: 2000
                });
            }
            else {
                const hash = hashSum(input2Value);
                const payload = {
                    phone: input1Value,
                    pws: hash
                }
                await axios.post(config.api_path + '/member/insert', payload, config.headers()).then(res => {
                    if (res.data.message === 'success') {
                        Swal.fire({
                            title: 'โปรดจดจำรหัสผ่านของท่าน',
                            icon: 'success',
                            text: 'เพื่อสิทธิประโยชน์ของท่านเอง',
                            timer: 2000,
                            timerProgressBar: true,
                            didOpen: () => {
                                Swal.showLoading();
                            }
                        });
                        localStorage.setItem(configMember.token_name, res.data.token);
                        navigate('/product')
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
    {/*------------ ฟังก์ชันการกรอกเลขเบอร์มือถือและ pin -------------- */}
    const handleNumpadClick = (value) => {
        if (selectedInput === 1) {
            setInput1Value(prevValue => prevValue + value);
        } else if (selectedInput === 2) {
            setInput2Value(prevValue => prevValue + value);
        }
    };
    {/*------------ ฟังก์ชันการลบเลขที่กรอกในฟอร์มเลขเบอร์มือถือและ pin -------------- */}
    const handledel = () => {
        if (selectedInput === 1) {
            setInput1Value(prevValue => prevValue.slice(0, -1));
        } else if (selectedInput === 2) {
            setInput2Value(prevValue => prevValue.slice(0, -1));
        }
    }
    {/*------------ ฟังก์ชันการเปลี่ยนหน้าไปยังหน้า Edit -------------- */}
    const handleLoginEdit = () =>{
        navigate('/EditAdmin')
    }

    return (
        <>
        {/*---------------- โค้ดแสดงหน้าเว็บแอปพลิเคชัน ------------------ */}
            <div className="containers">
                <div className="kmitlpcc"></div>
                <div className="form-container">
                    <div className="text-center mb-2" style={{ fontSize: 20 }}>โปรดระบุข้อมูลให้ครบถ้วน</div>
                    <div className="row">
                        <div className="mt-2 col-6 ">
                            <label style={{ fontSize: 18 }}>Phone</label>
                            <input onChange={e => setInput1Value(e.target.value)}
                                className="form-control" value={input1Value} onFocus={() => setSelectedInput(1)} readOnly />
                        </div>
                        <div className="mt-2 col-6">
                            <label style={{ fontSize: 18 }}>PIN digit</label>
                            <input onChange={e => setInput2Value(e.target.value)}
                                type="password" className="form-control" value={input2Value} onFocus={() => setSelectedInput(2)} readOnly />
                        </div>
                    </div>
                    <div>
                        <div className="numpad pad" style={{ fontSize: 20 }}>
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
                                <button className="btn btn-outline-primary buttonREG" key={num} onClick={() => handleNumpadClick(num.toString())}>
                                    {num}
                                </button>
                            ))}
                            <button className="btn btn-outline-primary buttonREG" onClick={handledel}>Detele</button>
                            <button className="btn btn-outline-primary buttonREG" onClick={handleLogin}>Login</button>
                        </div>
                    </div>

                </div>

                    <button className="btn toptext"  onClick={handleLoginEdit}>
                        <i class="fa-solid fa-xl fa-user-tie" style={{color: "#ffffff"}} title="Admin only"></i>
                    </button>
                

            </div>
        </>
    )
}

export default Home;