import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import config from "../config";
import configMember from "../configMember";
import { Link } from "react-router-dom";

function Sidebar() {
    const[userName, setUserName] = useState();
    useEffect(() => {
        {/*fetchData();*/}
    },[])

    const  fetchData = async () =>{
        try{
            axios.get(config.api_path + '/member/info',configMember.headers()).then(res =>{
                if(res.data.message === 'success'){
                    setUserName(res.data.result.phone);
                }
            }).catch(err =>  {
                throw err.response.data;
            })
        }catch(e){
            Swal.fire({
                titel: "Error",
                icon: "error",
                text: e.message
            })
        }
    }
    return (
        <>
            <aside className="main-sidebar sidebar-dark-primary elevation-4">
                <a href="#" className="brand-link">
                    <img src="dist/img/logo-top.png"  className="brand-image img-circle elevation-3" style={{ opacity: .8 }} />
                    <span className="brand-text">Let's Shop!</span>
                </a>
                <div className="sidebar">
                    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                    <i class="fa-solid fa-user mt-3 ms-4" style={{color: "#ffffff"}}></i>
                        <div className="info">
                            <span className="text-light ms-1 d-block" style={{fontSize:20}}>phone:{userName}</span>
                        </div>
                    </div>
                    <nav className="mt-2">
                        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                            <li className="nav-item menu-open"> 
                                <ul className="nav nav-treeview">
                                
                                    <li className="nav-item">
                                        <a href="#" className="nav-link">
                                            <i class="fa-solid fa-chart-line fa-xl ms-1"></i>
                                            <p className='ms-2' style={{fontSize:24}}>
                                                Dashboard
                                            </p>
                                        </a>
                                    </li>
                                    <hr className="custom-hr"/>
                                    <li className="nav-item">
                                        <a href="#" className="nav-link">
                                        <i className="fa-solid fa-cart-plus fa-xl ms-1"></i>
                                            <p className='ms-3'style={{fontSize:24}}>
                                                สินค้า
                                            </p>
                                        </a>
                                    </li>
                                    <hr className="custom-hr"/>
                                    <li className="nav-item">
                                        <a href="#" className="nav-link">
                                        <i class="fa-solid fa-user-tie fa-xl ms-1"></i>
                                            <p className='ms-3' style={{fontSize:24}}>
                                                Admin
                                            </p>
                                        </a>
                                    </li>
                                    <hr className="custom-hr"/>
                                </ul>
                            </li>
                        </ul>
                    </nav>
                </div >
            </aside >
        </>
    )
}
export default Sidebar;