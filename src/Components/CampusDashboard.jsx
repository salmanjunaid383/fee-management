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
    const [isOppened, setIsOppened] = useState();
    const [totalClasses, setTotalClasses] = useState();
    const [totalStudents, setTotalStudents] = useState();
    const [totalEmployees, setTotalEmployees] = useState();
    const [totalDefaulters, setTotalDefaulters] = useState();
    const [totalAdmissions, setTotalAdmissions] = useState();
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
    useEffect(() => {
        axios.get(`http://fee-management-api.nastechltd.co/api/show_school/${school_id}`)
            .then(response => {
                // console.log(response.data.is_oppend)
                setSchooldata(response.data)
                setIsOppened(response.data.is_oppend)
            })
            .catch((error) => {
                if (error.response) {
                    setMessageinfo(error.response.data.message);
                    handleMessage();
                }
            })
            axios.get(`http://fee-management-api.nastechltd.co/api/total_classes/${school_id}`)
            .then(response => {
                // console.log(response.data.is_oppend)
                setTotalClasses(response.data)
            })
            .catch((error) => {
                if (error.response) {
                    setMessageinfo(error.response.data.message);
                    handleMessage();
                }
            })
            axios.get(`http://fee-management-api.nastechltd.co/api/total_defaulter/${school_id}`)
            .then(response => {
                console.log(response.data)
                setTotalDefaulters(response.data)
            })
            .catch((error) => {
                if (error.response) {
                    setMessageinfo(error.response.data.message);
                    handleMessage();
                }
            })
            axios.get(`http://fee-management-api.nastechltd.co/api/total_students/${school_id}`)
            .then(response => {
                // console.log(response.data)
                setTotalStudents(response.data)
            })
            .catch((error) => {
                if (error.response) {
                    setMessageinfo(error.response.data.message);
                    handleMessage();
                }
            })
            axios.get(`http://fee-management-api.nastechltd.co/api/total_employees/${school_id}`)
            .then(response => {
                // console.log(response.data)
                setTotalEmployees(response.data)
            })
            .catch((error) => {
                if (error.response) {
                    setMessageinfo(error.response.data.message);
                    handleMessage();
                }
            })
            axios.get(`http://fee-management-api.nastechltd.co/api/pending_admissions/${school_id}`)
            .then(response => {
                // console.log(response.data)
                setTotalAdmissions(response.data)
            })
            .catch((error) => {
                if (error.response) {
                    setMessageinfo(error.response.data.message);
                    handleMessage();
                }
            })

    }, [])
    // useEffect(() => {
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
        
    // }, [])
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
                            setMessageinfo(error.response.data.message);
                            handleMessage();
                        }
                    })
            })
            .catch((error) => {
                if (error.response) {
                    setMessageinfo(error.response.data.message);
                    handleMessage();
                }
            })
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

                            <Link class="nav-link" to="/feecomponents"><div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas fa-money-check-alt"></i>
                                </div>
                                <div class="icon-name">Fee</div>
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
                    <div className="row">

<div className="col-12 text-right">
    {isOppened == 0 ?
        <>
            <p className="m-0 mr-2 pb-2 d-inline-block text-primary text-bold">Are You Sure You Want To Open Admissions?</p>
            <button type="button" onClick={openAdmission} class="btn btn-success mt-1 mb-3 d-inline-block"><i class="txt-wite-icon fas mr-1 fa-check"></i>Open Admission</button>
        </>
        :
        <>
            <p className="m-0 mr-2 pb-2 d-inline-block text-primary text-bold">Are You Sure You Want To Close Admissions?</p>
            <button type="button" onClick={openAdmission} class="btn btn-danger mb-3 d-inline-block mt-1"><i class="fas fa-times txt-wite-icon mr-1"></i>Close Admission</button>
        </>
    }

</div>
</div>
                    <div class="right-body">
                       
                        <div class="campus-sts">
                            <div className="show_fee p-5">
                                <div class="card p-2 shadow" style={{ width: '19rem', height: '8rem' }}>
                                    <div class="card-body w-100">
                                        <div className="float-start ">
                                            <h3>Classes</h3>
                                            <p>{totalClasses}</p>
                                        </div>
                                        <div className="float-end mb-2"> <i class="fas fa-5x fa-users-class"></i></div>
                                    </div>
                                </div>
                                <div class="card p-2 shadow" style={{ width: '19rem', height: '8rem' }}>
                                    <div class="card-body w-100">
                                        <div className="float-start ">
                                            <h3>Employees</h3>
                                            <p>{totalEmployees}</p>
                                        </div>
                                        <div className="float-end mb-2"><i class="fas campus-txt-icon fa-5x fa-user-tie"></i></div>
                                    </div>
                                </div>
                                <div class="card p-2 shadow" style={{ width: '19rem', height: '8rem' }}>
                                    <div class="card-body w-100">
                                        <div className="float-start ">
                                            <h3 className="text-primary">Students</h3>
                                            <p>{totalStudents}</p>
                                        </div>
                                        <div className="float-end mb-2"><i class="fas fa-5x icon-name fa-user-graduate"></i></div>
                                    </div>
                                </div>
                                <div class="card p-2 shadow" style={{ width: '19rem', height: '8rem' }}>
                                    <div class="card-body w-100">
                                        {isOppened === 1 ?
                                            <>
                                                <div className="float-start ">
                                                    <h3>Admissions</h3>
                                                    <p className="text-success text-bold">Oppened</p>
                                                </div>
                                                <div className="float-end mb-2"><i class="fas fa-5x text-success fa-check"></i></div>
                                            </>
                                            :
                                            <>
                                                <div className="float-start ">
                                                    <h3>Admissions</h3>
                                                    <p className="text-danger text-bold">Closed</p>

                                                </div>
                                                <div className="float-end mb-2"><i class="fas fa-times fa-5x text-danger"></i></div>
                                            </>
                                        }
                                    </div>
                                </div>
                                <div class="card p-2 shadow" style={{ width: '19rem', height: '8rem' }}>
                                    <div class="row card-body w-100">
                                        <div className="float-start col-8">
                                            <h4>Pending Admissions</h4>
                                            <p className="text-bold text-danger">{totalAdmissions}</p>
                                        </div>
                                        <div className="float-end mb-2 col-4"><i class="txt-icon fas fa-5x fa-user-plus"></i></div>
                                    </div>
                                </div>
                                <div class="card p-2 shadow" style={{ width: '19rem', height: '8rem' }}>
                                    <div class="card-body w-100">
                                        <div className="float-start ">
                                            <h3>Defaulters</h3>
                                            <p className="text-danger">{totalDefaulters}</p>
                                        </div>
                                        <div className="float-end mb-2"><i class="txt-icon fas fa-5x fa-user-slash"></i></div>
                                    </div>
                                </div>
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