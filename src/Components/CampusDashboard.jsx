import React, { useState, useEffect } from 'react';
import './dashboard.css';
import { Link, useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Snackbar from '@material-ui/core/Snackbar';
import logo from "./jb1.png";
import axios from 'axios';
// import { Modal } from 'react-bootstrap';
// import TextField from '@material-ui/core/TextField';
// import FormLabel from '@material-ui/core/FormLabel';
// import InputLabel from '@material-ui/core/InputLabel';
// import MenuItem from '@material-ui/core/MenuItem';
// import FormHelperText from '@material-ui/core/FormHelperText';
// import FormControl from '@material-ui/core/FormControl';
// import Select from '@material-ui/core/Select';
// import { makeStyles } from '@material-ui/core/styles';

const CampusDashboard = () => {
    // const [show, setShow] = useState(false);
    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
    // const [data, setData] = useState([]);
    // const [studentdata, setStudentdata] = useState([]);
    const [schooldata, setSchooldata] = useState([]);
    const school_id = localStorage.getItem("school_id")
    // const admin_id = localStorage.getItem("admin_id");
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
    // useEffect(() => {
    //     axios.get(`http://fee-management-api.nastechltd.co/api/school_administrator`)
    //     .then(response => {
    //         console.log(response.data)
    //         setData(response.data)
    //     })
    //     .catch(error => console.log(error) )

    // },[])
    useEffect(() => {
        // axios.get(`http://fee-management-api.nastechltd.co/api/student/${school_id}`)
        //     .then(response => {
        //         console.log(response);
        //         setStudentdata(response.data);
        //     })
        //     .catch((error) => {
        //         if (error.response) {
        //             alert(error.response.data.message);
        //         }
        //     })
        axios.get(`http://fee-management-api.nastechltd.co/api/show_school/${school_id}`)
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
    // useEffect(() => {
    //     axios.get(`http://fee-management-api.nastechltd.co/api/schools/${admin_id}`)
    //         .then(response => {
    //             console.log(response.data)
    //             setSchooldata(response.data)
    //         })
    //         .catch((error) => {
    //             if (error.response) {
    //                 alert(error.response.data.message);
    //             }
    //         })
    // }, [])


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
                                <img
                                    src={logo} />
                            </div>
                            <Link to="/campusdashboard" class="nav-link "><div class="folder-icons ">
                                <div class="icon1">
                                    <i class="fas fa-columns active"></i>
                                </div>
                                <div class="icon-name1 active">Dashboard</div>
                            </div></Link>
                            <Link to="/admissioncomponents" class="nav-link "><div class="folder-icons ">
                                <div class="icon1">
                                    <i class="fas fa-school"></i>
                                </div>
                                <div class="icon-name1">Admission</div>
                            </div></Link>

                            <Link class="nav-link" to="/class"><div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas fa-users-class"></i>
                                </div>
                                <div class="icon-name">Class</div>
                            </div></Link>

                            <Link class="nav-link" to="/students"><div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas fa-user-graduate"></i>
                                </div>
                                <div class="icon-name">Students</div>
                            </div></Link>
                            <Link class="nav-link" to="/finance"><div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas fa-user-tie"></i>
                                </div>
                                <div class="icon-name">Finance Employee</div>
                            </div></Link>
                            <Link class="nav-link" to="/feecomponents"><div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas fa-money-check-alt"></i>
                                </div>
                                <div class="icon-name">Fee</div>
                            </div></Link>
                            <Link class="nav-link" to="/feevoucheradmin"><div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas fa-print"></i>
                                </div>
                                <div class="icon-name">Fee Voucher</div>
                            </div></Link>
                            <Link class="nav-link" to="/adminledger"><div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas fa-calculator-alt"></i>
                                </div>
                                <div class="icon-name">Student Ledger</div>
                            </div></Link>
                            <Link class="nav-link" to="/term"><div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas fa-calendar-alt"></i>
                                </div>
                                <div class="icon-name">Term</div>
                            </div></Link>
                            <Link class="nav-link" to="/expense"><div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas fa-receipt"></i>
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
                                <div class="big-inbox print-capitalize">
                                    {schooldata.name}
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
                            {/* <div class="add-student">
                                {isOppened == 0 ?
                                    <button type="button" onClick={openAdmission} class="btn text-bolder btn-primary btn-small">Open Admission</button>
                                    :
                                    <button type="button" onClick={openAdmission} class="btn text-bolder btn-primary btn-small">Close Admission</button>

                                }
                            </div> */}
                            <div class="table-responsive">






                                <table class="table no-wrap">
                                    <thead>
                                        <tr>
                                            <th class="border-top-0">#</th>
                                            <th class="border-top-0">NAME</th>
                                            <th class="border-top-0">Gender</th>
                                            <th class="border-top-0">Email</th>
                                            <th class="border-top-0">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* {data.map((val, i) => {
                                            return (
                                                <tr key={i}>
                                                    <td>{val.id}</td>
                                                    <td class="txt-oflo">{`${val.first_name} ${val.last_name}`}</td>
                                                    <td>{val.gender}</td>
                                                    <td class="txt-oflo">{val.email}</td>
                                                    <td><button className="btn btn-primary">Add School</button></td>
                                                </tr>
                                            )
                                        })} */}


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
export default CampusDashboard;