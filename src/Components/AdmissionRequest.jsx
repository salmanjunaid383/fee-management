import React, { useState, useEffect } from 'react';
import './dashboard.css';
import { Link, useHistory } from 'react-router-dom';
import UpdateIcon from '@material-ui/icons/Update';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import DescriptionIcon from '@material-ui/icons/Description';
import logo from './jb1.png'
import StnData from './Crud.jsx'
import { Modal } from 'react-bootstrap';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';


import firebase from './Firebase'
import axios from 'axios';



import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '30ch'

        },
    },
    formControl: {
        margin: theme.spacing(1),
        //   width: '30ch',
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));


const AdmissionRequest = () => {

    const classes = useStyles();
    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);
    const handleClose = () => setShow(false);
    const handleClose1 = () => setShow1(false);
    const handleShow = () => setShow(true);
    const handleShow1 = () => setShow1(true);
    const [studentdata, setStudentdata] = useState([]);
    const [classdata, setClassdata] = useState([]);
    const [classid, setClassid] = useState([]);
    const [email, setEmail] = useState();
    const [form_no, setForm_no] = useState();
    const [GR_no, setGR_no] = useState();
    const [lname, setLname] = useState();
    const [password, setPassword] = useState();
    const [confirmpassword, setConfirmpassword] = useState();
    const [contact, setContact] = useState();
    const [address, setAddress] = useState();
    const [gender, setGender] = useState();
    const [userdata, setUserdata] = useState([]);
    var mydata = [];
    const history = useHistory();
    const school_id = localStorage.getItem("school_id")

    if ((studentdata.length > 0) && (userdata.length > 0)) {
        for (var i = 0; i < studentdata.length; i++) {
            for (var j = 0; j < userdata.length; j++) {
                var dd = {
                    contact: `${studentdata[i].contact}`,
                    address: `${studentdata[i].address}`,
                    gender: `${studentdata[i].gender}`,
                    id: `${studentdata[i].id}`,
                    name: "",
                    email: ""
                };
                if (studentdata[i].user_id === userdata[j].id) {
                    dd.name = `${userdata[j].first_name} ${userdata[j].last_name}`;
                    dd.email = `${userdata[j].email}`
                }
            }
            mydata.push(dd)
        }
    }


    useEffect(() => {
        axios.get(`http://fee-management-api.nastechltd.co/api/show_form/${school_id}`)
            .then(response => {
                console.log(response);
                setStudentdata(response.data);
            })
            .catch((error) => {
                if (error.response) {
                    alert(error.response.data.message);
                }
            })

    }, [])
    
    useEffect(() => {
        axios.get(`http://fee-management-api.nastechltd.co/api/schools_class/${school_id}`)
            .then(response => {
                console.log(response.data)
                setClassdata(response.data)
            })
            .catch((error) => {
                if (error.response) {
                    alert(error.response.data.message);
                }
            })

    }, [])






    const reload = () => {
        axios.get(`http://fee-management-api.nastechltd.co/api/show_form/${school_id}`)
            .then(response => {
                console.log(response);
                setStudentdata(response.data);
            })
            .catch((error) => {
                if (error.response) {
                    alert(error.response.data.message);
                }
            })

    }



    // const deleteData = (id) => {
    //     axios.delete(`http://fee-management-api.nastechltd.co/api/user/${id}`)
    //         .then(response => {
    //             console.log(response)
    //             reload();
    //         })
    //         .catch((error) => {
    //             if (error.response) {
    //                 alert(error.response.data.message);
    //             }
    //         })
    // }

    const data = {
        school_id: school_id,
        form_no : form_no,
        G_R_NO : GR_no,
        class_id: classid
    };
    // console.log(contact)
    const sendData = () => {
        
        
            axios.post('http://fee-management-api.nastechltd.co/api/student', data)
            .then(response => {
                handleClose();
                reload();
                localStorage.removeItem("registration_no")
            })
            .catch((error) => {
                if (error.response) {
                    alert(error.response.data.message);
                }
            })        
        // console.log(data)
    }
    const add = (id) => {
        axios.get(`http://fee-management-api.nastechltd.co/api/admission_form/${id}`)
            .then(response => {
                
                
                console.log(response.data)
                localStorage.setItem("registration_no",response.data.AdmissionForm.registration_no);
                setForm_no(response.data.AdmissionForm.registration_no);
                setClassid(response.data.AdmissionForm.class_id)
                handleShow();
                
            })
            .catch((error) => {
                if (error.response) {
                    alert(error.response.data.message);
                }
            })
    }
    // console.log(fname)
    // const sendUpdated = () => {
    //     axios.put(`http://fee-management-api.nastechltd.co/api/user/${localStorage.getItem("id")}`, {

    //     })
    //         .then(response => {
    //             console.log(response);
    //             localStorage.removeItem("id")
    //             localStorage.removeItem("fname")
    //             localStorage.removeItem("lname")
    //             localStorage.removeItem("email")
    //             localStorage.removeItem("contact")
    //             localStorage.removeItem("address")
    //             localStorage.removeItem("gender")
    //             reload();
    //             handleClose1();

    //         })
    //         .catch(error => console.log(error))
    // }
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
                                    <i class="fas  fa-columns"></i>
                                </div>
                                <div class="icon-name1 ">Dashboard</div>
                            </div></Link>
                            <Link to="/documents" class="nav-link "><div class="folder-icons ">
                                <div class="icon1">
                                    <i class="fas  fa-columns"></i>
                                </div>
                                <div class="icon-name1 ">Documents</div>
                            </div></Link>
                            <Link class="nav-link" to="/class"><div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas fa-user-graduate"></i>
                                </div>
                                <div class="icon-name">Class</div>
                            </div></Link>
                            <Link class="nav-link" to="/admissionrequest"><div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas fa-user-graduate active"></i>
                                </div>
                                <div class="icon-name active">Pending Admissions</div>
                            </div></Link>
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
                            
                            <Link class="nav-link" to="/feeperiod"><div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas fa-wallet"></i>
                                </div>
                                <div class="icon-name">Fee Period</div>
                            </div></Link>
                            <Link class="nav-link" to="/structure"><div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas fa-wallet"></i>
                                </div>
                                <div class="icon-name">Fee Structure</div>
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
                            <Link class="nav-link" to="/admission"><div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas fa-wallet"></i>
                                </div>
                                <div class="icon-name">Admission Charges</div>
                            </div></Link>
                            <Link class="nav-link" to="/discounted"><div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas fa-wallet"></i>
                                </div>
                                <div class="icon-name">Discounted</div>
                            </div></Link>
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
                            <div class="add-student">
                                {/* <button type="button" onClick={handleShow} class="btn btn-primary btn-lg"><AddIcon /> Add Student</button> */}
                                <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Add Student</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <div class="row billing-main">
                                            <div class="col-6 billing-box">
                                                <TextField className="pb-3 bg-white" type="number" defaultValue={localStorage.getItem("registration_no")} onChange={(e) => setForm_no(e.target.value)} label="Registeration No." variant="filled" />
                                                {/* <FormControl className={classes.formControl}>
                                                    <InputLabel id="demo-simple-select-label">Class</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        variant="filled"

                                                        onChange={(e) => setClassid(e.target.value)}
                                                    >
                                                        {classdata.map((val, i) => {
                                                            return (
                                                                <MenuItem value={val.id}>{`${val.name}`}</MenuItem>
                                                            )

                                                        })}
                                                    </Select>
                                                </FormControl> */}

                                            </div>

                                            <div class="col-6 billing-box">
                                                <TextField className="pb-3" type="text" onChange={(e) => setGR_no(e.target.value)} label="GR Number" variant="filled" />
                                            </div>
                                            
                                        </div>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <button class="btn btn-secondary" onClick={handleClose}>
                                            Close
                                            </button>
                                        <button onClick={sendData} className="btn btn-primary">Add</button>
                                    </Modal.Footer>
                                </Modal>
                                
                            </div>
                            <div class="table-responsive">
                                <table class="table no-wrap">
                                    <thead>
                                        <tr>
                                            <th class="border-top-0">#</th>
                                            <th class="border-top-0">NAME</th>
                                            <th class="border-top-0">GENDER</th>
                                            <th class="border-top-0">Details</th>
                                            <th class="border-top-0">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {studentdata.map((val, i) => {
                                            return (
                                                <>
                                                {val.G_R_NO == null ?
                                                <>
                                                <tr key={i}>
                                                    <td>{val.id}</td>
                                                    <td class="txt-oflo">{`${val.first_name} ${val.middle_name} ${val.last_name}`}</td>
                                                    <td>{val.gender}</td>
                                                    <td><Button onClick={() => history.push(`/printform/${val.registration_no}`)}><DescriptionIcon /></Button></td>

                                                    <td>
                                                        <ButtonGroup disableElevation variant="contained" color="primary">
                                                            <Button className="student-btn-up" onClick={() => add(val.registration_no)}><ThumbUpIcon className="text-white" /></Button>
                                                            {/* <Button className="student-btn-del" onClick={() => deleteData(val.id)} ><DeleteIcon className="text-white" /></Button> */}
                                                        </ButtonGroup>
                                                    </td>
                                                </tr>
                                                </>
                                                :
                                                null
                                                }
                                                </>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default AdmissionRequest;


