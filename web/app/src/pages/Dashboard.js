import Template from "../components/TemplateAdmin";
import axios from "axios";
import config from "../config";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import Modal from "../components/Model";

function Dashboard() {
    const [datas ,setDatas] = useState({});
    const fatchdata = async() =>{
        await axios.get(config.api_path + '/datas/dashboard', config.headers()).then(res =>{
            if(res.data.message === 'success'){
                setDatas(res.data.result);
                console.log(datas);
            }
        })
    }
    return (
        <>
            <Template>
                
            </Template>
        </>
    )
}

export default Dashboard;