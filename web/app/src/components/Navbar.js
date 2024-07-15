
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useState } from 'react'

function Navbar() {

    return (
        <>
            <nav class="main-header navbar navbar-expand navbar-white navbar-light">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
                    </li>
                </ul>
                <div class="clearfix">
                    <button class="btn btn-outline-success float-end" type="submit">Reg</button>
                </div>
            </nav>
        </>
    )
}

export default Navbar;