import React, { useState, useEffect } from 'react';
import './dashboard.css';
import { Link, useHistory } from 'react-router-dom';
import UpdateIcon from '@material-ui/icons/Update';
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


const Mystudents = () => {

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
    const [fname, setFname] = useState();
    const [lname, setLname] = useState();
    const [mname, setMname] = useState();
    const [password, setPassword] = useState();
    const [confirmpassword, setConfirmpassword] = useState();
    const [contact, setContact] = useState();
    const [address, setAddress] = useState();
    const [gender, setGender] = useState();
    const [userdata, setUserdata] = useState([]);
    const [prevdata, setPrevdata] = useState('');
    var mydata = [];
    const history = useHistory();
    const school_id = localStorage.getItem("school_id");
    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);
    const handleClick = (id) => {
        localStorage.setItem("user_id", id)
        handleShow2();
    }
    const remove = () => {
        localStorage.removeItem("user_id")
        handleClose2();
    }

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
        axios.get(`http://fee-management-api.nastechltd.co/api/student/${school_id}`)
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
        axios.get(`http://fee-management-api.nastechltd.co/api/finance/${school_id}`)
            .then(response => {
                console.log(response);
                setUserdata(response.data)
                // setStudentdata(response.data);
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
        axios.get(`http://fee-management-api.nastechltd.co/api/student/${school_id}`)
            .then(response => {
                console.log(response);
                setStudentdata(response.data);
            })
            .catch((error) => {
                if (error.response) {
                    alert(error.response.data.message);
                }
            })
        axios.get(`http://fee-management-api.nastechltd.co/api/finance/${school_id}`)
            .then(response => {
                console.log(response);
                setUserdata(response.data)
            })
            .catch((error) => {
                if (error.response) {
                    alert(error.response.data.message);
                }
            })
    }



    const deleteData = (id) => {
        axios.delete(`http://fee-management-api.nastechltd.co/api/user/${localStorage.getItem("user_id")}`)
            .then(response => {
                console.log(response);
                remove();
                reload();
            })
            .catch((error) => {
                if (error.response) {
                    alert(error.response.data.message);
                }
            })
    }


    // console.log(contact)

    const update = (id) => {
        axios.get(`http://fee-management-api.nastechltd.co/api/user/${id}`)
            .then(response => {
                setPrevdata(response.data)
                setFname(response.data.first_name)
                setLname(response.data.last_name)
                setMname(response.data.middle_name)
                setEmail(response.data.email)
                setAddress(response.data.address)
                setContact(response.data.contact)
                setGender(response.data.gender)
                handleShow1();
                console.log(response.data)
            })
            .catch((error) => {
                if (error.response) {
                    alert(error.response.data.message);
                }
            })
    }
    // console.log(fname)
    const sendUpdated = () => {
        axios.put(`http://fee-management-api.nastechltd.co/api/user/${prevdata.id}`, {
            first_name: fname,
            last_name: lname,
            middle_name: mname,
            email: email,
            contact: contact,
            address: address,
            gender: gender

        })
            .then(response => {
                console.log(response);
                setPrevdata('')
                reload();
                handleClose1();

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
                                <img
                                    src={logo} />
                            </div>

                            <Link to="/campusdashboard" class="nav-link "><div class="folder-icons ">
                                <div class="icon1">
                                    <i class="fas  fa-columns"></i>
                                </div>
                                <div class="icon-name1 ">Dashboard</div>
                            </div></Link>
                            <Link to="/admissioncomponents" class="nav-link "><div class="folder-icons ">
                                <div class="icon1">
                                    <i class="fas fa-columns"></i>
                                </div>
                                <div class="icon-name1">Admission</div>
                            </div></Link>
                            <Link class="nav-link" to="/class"><div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas fa-user-graduate"></i>
                                </div>
                                <div class="icon-name">Class</div>
                            </div></Link>
                            
                            <Link class="nav-link" to="/students"><div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas fa-user-graduate active"></i>
                                </div>
                                <div class="icon-name active">Students</div>
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
                                    Students
                                </div>
                                <button onClick={logOut} class="btn text-bolder text-right">Log Out</button>

                            </div>
                        </div>
                        <hr class="new-hr" />
                    </div>
                    <div class="right-body">

                        <div class="message">
                            <div class="add-student">
                                {/* <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Add Student</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <div class="row billing-main">
                                            <div class="col-6 billing-box">
                                                <TextField className="pb-3 bg-white" type="text" onChange={(e) => setFname(e.target.value)} label="First Name" variant="filled" />
                                                <TextField className="pb-3 bg-white" type="number" onChange={(e) => setContact(e.target.value)} label="Contact No." variant="filled" />
                                                <TextField className="pb-3 bg-white" type="password" onChange={(e) => setPassword(e.target.value)} label="Password" variant="filled" />
                                                <TextField className="TextField" onChange={(e) => setAddress(e.target.value)} label="Address" multiline rows={1} variant="filled" />

                                            </div>

                                            <div class="col-6 billing-box">
                                                <TextField className="pb-3" type="text" onChange={(e) => setLname(e.target.value)} label="Last Name" variant="filled" />
                                                <TextField className="pb-3" type="email" onChange={(e) => setEmail(e.target.value)} label="Email" variant="filled" />
                                                <TextField className="pb-3" type="password" onChange={(e) => setConfirmpassword(e.target.value)} label="Confirm Password" variant="filled" />
                                                <FormControl className={classes.formControl}>
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
                                                </FormControl>
                                            </div>
                                            <div className="">
                                                <FormLabel component="legend">Gender</FormLabel>
                                                <div class="form-check form-check-inline">
                                                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" onChange={(e) => setGender(e.target.value)} value="male" />
                                                    <label class="form-check-label" for="inlineRadio1">Male</label>
                                                </div>
                                                <div class="form-check form-check-inline">
                                                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" onChange={(e) => setGender(e.target.value)} value="female" />
                                                    <label class="form-check-label" for="inlineRadio2">Female</label>
                                                </div>
                                            </div>
                                        </div>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <button class="btn btn-secondary" onClick={handleClose}>
                                            Close
                                            </button>
                                        <button onClick={sendData} className="btn btn-primary">Create</button>
                                    </Modal.Footer>
                                </Modal> */}
                                <Modal show={show1} onHide={handleClose1}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Update Students</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <div class="row billing-main">
                                            <div class="col-6 billing-box">
                                                <TextField className="pb-3 bg-white" type="text" defaultValue={prevdata.first_name} onChange={(e) => setFname(e.target.value)} label="First Name" variant="filled" />
                                                <TextField className="pb-3" type="text" defaultValue={prevdata.last_name} onChange={(e) => setLname(e.target.value)} label="Last Name" variant="filled" />
                                                <TextField className="pb-3 bg-white" type="number" defaultValue={prevdata.contact} onChange={(e) => setContact(e.target.value)} label="Contact No." variant="filled" />

                                            </div>

                                            <div class="col-6 billing-box">
                                                <TextField className="pb-3 bg-white" type="text" defaultValue={prevdata.middle_name} onChange={(e) => setMname(e.target.value)} label="Middle Name" variant="filled" />
                                                <TextField className="pb-3" type="email" defaultValue={prevdata.email} onChange={(e) => setEmail(e.target.value)} label="Email" variant="filled" />
                                                <TextField className="TextField" defaultValue={prevdata.address} onChange={(e) => setAddress(e.target.value)} label="Address" multiline rows={1} variant="filled" />

                                            </div>
                                            {
                                                gender == "male" ?
                                                    <div className="mt-2">
                                                        <FormLabel component="legend">Gender</FormLabel>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" name="inlineRadioOptions" checked id="inlineRadio1" onChange={(e) => setGender(e.target.value)} value="male" />
                                                            <label class="form-check-label" for="inlineRadio1">Male</label>
                                                        </div>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" onChange={(e) => setGender(e.target.value)} value="female" />
                                                            <label class="form-check-label" for="inlineRadio2">Female</label>
                                                        </div>
                                                    </div>
                                                    :
                                                    <div className="mt-2">
                                                        <FormLabel component="legend">Gender</FormLabel>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" onChange={(e) => setGender(e.target.value)} value="male" />
                                                            <label class="form-check-label" for="inlineRadio1">Male</label>
                                                        </div>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" name="inlineRadioOptions" checked id="inlineRadio2" onChange={(e) => setGender(e.target.value)} value="female" />
                                                            <label class="form-check-label" for="inlineRadio2">Female</label>
                                                        </div>
                                                    </div>
                                            }
                                        </div>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <button class="btn btn-secondary" onClick={handleClose1}>
                                            Close
                                            </button>
                                        <button onClick={sendUpdated} className="btn btn-primary">Update</button>
                                    </Modal.Footer>
                                </Modal>
                                <Modal show={show2} onHide={remove}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Confirmation</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <div className="row">
                                            <div className="col-12">
                                                <h2 className="text-center">Are You Sure You Want To Delete?</h2>
                                            </div>
                                        </div>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <button class="btn btn-secondary" onClick={remove}>
                                            Close
                                            </button>
                                        <button onClick={deleteData} className="btn btn-primary">Yes</button>
                                    </Modal.Footer>
                                </Modal>
                            </div>
                            <div class="table-responsive">
                                <table class="table no-wrap">
                                    <thead>
                                        <tr>
                                            <th class="border-top-0">#</th>
                                            <th class="border-top-0">GR NO</th>
                                            <th class="border-top-0">NAME</th>
                                            <th class="border-top-0">GENDER</th>
                                            <th class="border-top-0">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {studentdata.map((val, i) => {
                                            return (
                                                <tr key={i}>
                                                    <td>{val.id}</td>
                                                    <td>{val.G_R_NO}</td>
                                                    <td class="txt-oflo">{`${val.first_name} ${val.middle_name} ${val.last_name}`}</td>
                                                    <td>{val.gender}</td>
                                                    {/* <td><Button onClick={() => history.push(`/student1/${val.id}`)}><DescriptionIcon /></Button></td> */}

                                                    <td>
                                                        <ButtonGroup disableElevation variant="contained" color="primary">
                                                            <Button className="student-btn-up" onClick={() => update(val.id)}><UpdateIcon className="text-white" /></Button>
                                                            <Button className="student-btn-del" onClick={() => handleClick(val.id)} ><DeleteIcon className="text-white" /></Button>
                                                        </ButtonGroup>
                                                    </td>
                                                </tr>
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
export default Mystudents;


