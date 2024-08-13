import Swal from "sweetalert2";
import configMember from "../configMember";
import { useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const handleSingout = () =>{
        Swal.fire({
            title: "ยืนยันการออก",
            icon: 'question',
            showCancelButton: true, 
            showConfirmButton: true, 
        }).then(res =>{
            if(res.isConfirmed){
                localStorage.removeItem(configMember.token_name);
                navigate('/memberlogin');
            }
        })
    }
    return (
        <>
            <nav className="main-header navbar navbar-expand navbar-white navbar-light">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars"></i></a>
                    </li>
                </ul>
                <ul className="navbar-nav ms-auto">
                    <button className="btn btn-outline-danger" onClick={handleSingout}>
                        <i className="fa fa-times me-2"></i> Sign out
                    </button>
                </ul>
            </nav>
        </>
    )
}

export default Navbar;