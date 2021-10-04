import React, { useState, useEffect } from 'react';
import './dashboard.css';
import { Link, useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'react-bootstrap';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import AddIcon from '@material-ui/icons/Add';
import logo from "./jb1.png";
import Snackbar from '@material-ui/core/Snackbar';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

const Mydashboard = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [schoolName, setSchoolName] = useState();
    const [phone, setPhone] = useState();
    const [address, setAddress] = useState();
    const [email, setEmail] = useState();
    const [administratordata, setadministratordata] = useState([]);
    const [studentdata, setStudentdata] = useState([]);
    const [schooldata, setSchooldata] = useState([]);
    const admin_id = localStorage.getItem("admin_id");
    const school_id = localStorage.getItem("school_id");
    const history = useHistory();
    const [messageinfo, setMessageinfo] = useState('');
    const [message, setMessage] = useState({
        open: false,
        vertical: 'top',
        horizontal: 'right',
    });
    const { vertical, horizontal, open } = message;
    const handleMessage = () => {
        setMessage({ open: true, vertical: 'top', horizontal: 'right' });
    };
    const CloseMessage = () => {
        setMessage({ ...message, open: false });
    };
    useEffect(() => {
        axios.get(`http://fee-management-api.nastechltd.co/api/student/${school_id}`)
            .then(response => {
                console.log(response);
                setStudentdata(response.data);
            })
            .catch((error) => {
                if (error.response) {
                    setMessageinfo(error.response.data.message);
                    handleMessage();
                }
            })
    }, [])
    useEffect(() => {
        axios.get(`http://fee-management-api.nastechltd.co/api/schools/${admin_id}`)
            .then(response => {
                console.log(response.data)
                setSchooldata(response.data)
            })
            .catch((error) => {
                if (error.response) {
                    setMessageinfo(error.response.data.message);
                    handleMessage();
                }
            })
    }, [])
    const logOut = () => {
        localStorage.clear();
        history.push("/");
    }




    return (
        <>
            <div class="dashboard">
                <div class="left">
                    <div class="navigation">
                        <div class="wrapper2">
                            <div class="abilan">
                                <img alt="Logo" src={"http://fee-management-api.nastechltd.co/api/school_profile/"+localStorage.getItem("school_id")} />
                            </div>

                            <Link class="nav-link" to="/dashboard"><div class="folder-icons ">
                                <div class="icon1">
                                    <i class="fas active fa-columns"></i>
                                </div>
                                <div class="icon-name1 active">Dashboard</div>
                            </div></Link>

                            <Link class="nav-link" to="/school"><div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas fa-school"></i>
                                </div>
                                <div class="icon-name1">Schools</div>
                            </div></Link>


                        </div>
                    </div>
                </div>
                <div class="right-side">
                    <div class="right-header">
                        <div class="top-bar">
                            <div class="top-bar-justify">
                                <div class="big-inbox">
                                    School Administrator
                                </div>
                                <button onClick={logOut} class="btn text-bolder text-right">Log Out</button>

                            </div>
                        </div>
                        <hr class="new-hr" />
                    </div>
                    <div class="right-body">
                        {/* <div class="scroll-cards">
                            <div class="card">
                                <div class="mails">
                                    <div class="mail-names">
                                        Schools Active
                                    </div>

                                </div>
                                <div class="mail-info">
                                    {schooldata.length} Schools all over Pakistan

                                </div>
                                <div>
                                </div>

                            </div>
                            <div class="card">
                                <div class="mails">
                                    <div class="mail-names">
                                        Active Students
                                    </div>

                                </div>
                                <div class="mail-info">
                                    {studentdata.length} Students
                                </div>
                                <div>
                                </div>
                            </div> */}
                        {/* <div class="card">
                                <div class="mails">
                                    <div class="mail-names">
                                        Visits
                                    </div>
                                </div>
                                <div class="mail-info">
                                    100K+ Visits Per Day
                                </div>
                                <div>
                                </div>
                            </div> */}
                        {/* </div> */}
                        <div class="message">

                            <div class="table-responsive">








                                <table class="table no-wrap">
                                    <thead>
                                        <tr>
                                            <th class="border-top-0">#</th>
                                            <th class="border-top-0">NAME</th>
                                            <th class="border-top-0">Contact</th>
                                            <th class="border-top-0">Email</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {schooldata.map((val, i) => {
                                            return (
                                                <tr key={i}>
                                                    <td>{val.id}</td>
                                                    <td class="txt-oflo print-capitalize">{`${val.name}`}</td>
                                                    <td className="">{val.contact}</td>
                                                    <td class="txt-oflo">{val.email}</td>
                                                </tr>
                                            )
                                        })}


                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <Snackbar
                            anchorOrigin={{ vertical, horizontal }}
                            open={open}
                            autoHideDuration={4000}
                            onClose={CloseMessage}
                            message={messageinfo}
                            key={vertical + horizontal}
                        />
                    </div>
                </div>
            </div>


        </>
    );
};
export default Mydashboard;