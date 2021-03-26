import { React, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import logo from './jb1.png'
import LaunchIcon from '@material-ui/icons/Launch';
import './dashboard.css';
import UpdateIcon from '@material-ui/icons/Update';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { Modal } from 'react-bootstrap';
import TextField from '@material-ui/core/TextField';

const Admissions = () => {
    const history = useHistory();
    const [isOppened, setIsOppened] = useState();
    const school_id = localStorage.getItem("school_id")
    useEffect(() => {
        axios.get(`http://fee-management-api.nastechltd.co/api/show_school/${school_id}`)
            .then(response => {
                console.log(response.data.is_oppend)
                setIsOppened(response.data.is_oppend)
            })
            .catch((error) => {
                if (error.response) {
                    alert(error.response.data.message);
                }
            })
    }, [])
    const openAdmission = () => {
        axios.put(`http://fee-management-api.nastechltd.co/api/admission_open/${school_id}`)
            .then(response => {
                console.log(response);
                axios.get(`http://fee-management-api.nastechltd.co/api/show_school/${school_id}`)
                    .then(response => {
                        console.log(response.data.is_oppend)
                        setIsOppened(response.data.is_oppend)
                    })
                    .catch((error) => {
                        if (error.response) {
                            alert(error.response.data.message);
                        }
                    })
            })
            .catch((error) => {
                if (error.response) {
                    alert(error.response.data.message);
                }
            })
    }
    const logOut = () => {
        localStorage.clear();
        history.push("/")
    }

    return (
        <>
            <div class="dashboard">
                <div class="left">
                    <div class="navigation">
                        <div class="wrapper2">
                            <div class="abilan">
                                <img src={logo} />
                            </div>
                            <Link to="/campusdashboard" class="nav-link "><div class="folder-icons ">
                                <div class="icon1">
                                    <i class="fas  fa-columns"></i>
                                </div>
                                <div class="icon-name1 ">Dashboard</div>
                            </div></Link>
                            <Link to="/admissioncomponents" class="nav-link "><div class="folder-icons ">
                                <div class="icon1">
                                    <i class="fas active fa-columns"></i>
                                </div>
                                <div class="icon-name1 active">Admission</div>
                            </div></Link>
                            <Link class="nav-link" to="/class"><div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas fa-user-graduate"></i>
                                </div>
                                <div class="icon-name">Class</div>
                            </div></Link>
                            {/* <Link class="nav-link" to="/admissionrequest"><div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas fa-user-graduate"></i>
                                </div>
                                <div class="icon-name">Pending Admissions</div>
                            </div></Link> */}
                            <Link class="nav-link" to="/students"><div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas fa-user-graduate"></i>
                                </div>
                                <div class="icon-name">Students</div>
                            </div></Link>
                            <Link class="nav-link" to="/finance"><div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas fa-wallet"></i>
                                </div>
                                <div class="icon-name">Finance Employee</div>
                            </div></Link>
                            <Link class="nav-link" to="/feecomponents"><div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas fa-wallet"></i>
                                </div>
                                <div class="icon-name">Fee</div>
                            </div></Link>
                            <Link class="nav-link" to="/feevoucheradmin"><div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas fa-wallet"></i>
                                </div>
                                <div class="icon-name">Fee Voucher</div>
                            </div></Link>
                            <Link class="nav-link" to="/adminledger"><div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas fa-wallet"></i>
                                </div>
                                <div class="icon-name">Student Ledger</div>
                            </div></Link>
                            {/* <Link class="nav-link" to="/admission"><div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas fa-wallet"></i>
                                </div>
                                <div class="icon-name">Admission Charges</div>
                            </div></Link> */}
                            
                            <Link class="nav-link" to="/term"><div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas fa-wallet"></i>
                                </div>
                                <div class="icon-name">Term</div>
                            </div></Link>
                            <Link class="nav-link" to="/expense"><div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas fa-wallet"></i>
                                </div>
                                <div class="icon-name">Expense Tracking</div>
                            </div></Link>

                        </div>
                    </div>
                </div>
                <div class="right-side">
                    <div class="right-header">
                        <div class="top-bar">
                            <div class="top-bar-justify">
                                <div class="big-inbox">
                                    Admissions
                                </div>
                                <button onClick={logOut} class="btn text-bolder text-right">Log Out</button>

                            </div>
                        </div>
                        <hr class="new-hr" />
                    </div>
                    <div class="right-body">
                        <div class="message">
                            <div className="show_fee">
                                <div className="">

                                    {isOppened == 0 ?
                                        <button type="button" onClick={openAdmission} class="btn btn-primary my-3 btn-lg">Open Admission</button>
                                        :
                                        <button type="button" onClick={openAdmission} class="btn btn-primary my-3 btn-lg">Close Admission</button>
                                    }
                                    <button type="button" onClick={() => history.push("/admission")} class="btn my-3 mx-1 btn-primary btn-lg">Admission Charges</button>
                                    <button type="button" onClick={() => history.push("/documents")} class="btn my-3 mx-1 btn-primary btn-lg">Documents</button>
                                    <button type="button" onClick={() => history.push("/admissionrequest")} class="btn my-3 mx-1 btn-primary btn-lg">Pending Admissions</button>

                                    {/* <button type="button" class="btn my-3 mx-1 btn-primary btn-lg"><Link to="/" className="text-white">Admission</Link></button> */}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Admissions;











