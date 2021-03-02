import React, { useState, useEffect } from 'react';
import './dashboard.css';
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom';
import UpdateIcon from '@material-ui/icons/Update';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import logo from './jb1.png'
import { Modal } from 'react-bootstrap';
import FormLabel from '@material-ui/core/FormLabel';

import TextField from '@material-ui/core/TextField';


const Finance = () => {
    const [employeedata, setEmployeedata] = useState([]);
    const history = useHistory();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [email, setEmail] = useState();
    const [fname, setFname] = useState();
    const [lname, setLname] = useState();
    const [password, setPassword] = useState();
    const [confirmpassword, setConfirmpassword] = useState();
    const [contact, setContact] = useState();
    const [address, setAddress] = useState();
    const [gender, setGender] = useState();
    const school_id = localStorage.getItem("school_id")

    useEffect(() => {
        axios.get(`http://fee-management-api.nastechltd.co/api/finance/${school_id}`)
            .then(response => {
                console.log(response);
                setEmployeedata(response.data);
            })
            .catch(error => (console.log(error)))
    }, [])

    const reload = () => {
        axios.get(`http://fee-management-api.nastechltd.co/api/finance/${school_id}`)
            .then(response => {
                console.log(response);
                setEmployeedata(response.data);
            })
            .catch(error => (console.log(error)))
    }

    // const Reload = () => {
    //     axios.get(`http://fee-management-api.nastechltd.co/api/student`)
    //     .then(response => {
    //         console.log(response);
    //         setData(response.data);
    //     })
    //     .catch(error => (console.log(error)))

    // }

    const deleteData = (id) => {
        axios.delete(`http://fee-management-api.nastechltd.co/api/finance/${id}`)
            .then(response => {
                console.log(response)
                reload();
            })
    }
    const data = {
        school_id: school_id,
        first_name: fname,
        last_name: lname,
        password: password,
        email: email,
        contact: contact,
        address: address,
        gender: gender
    };
    const sendData = () => {
        if (password != confirmpassword) {
            alert("Incorrect Password");
        }
        else {
            axios.post('http://fee-management-api.nastechltd.co/api/finance_employee', data)
            .then(response => {
                console.log(response);
                console.log(response.data.id);
                handleClose();
                reload();
            })
            .catch(error => console.log(error))
        }
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

                            <Link to="/dashboard" class="nav-link "><div class="folder-icons ">
                                <div class="icon1">
                                    <i class="fas  fa-columns"></i>
                                </div>
                                <div class="icon-name1 ">Dashboard</div>
                            </div></Link>
                            <Link class="nav-link" to="/class"><div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas fa-user-graduate"></i>
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
                                    <i class="fas fa-wallet active"></i>
                                </div>
                                <div class="icon-name active">Finance Employee</div>
                            </div></Link>
                            <Link class="nav-link" to="/fee"><div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas fa-wallet"></i>
                                </div>
                                <div class="icon-name">Fee Generation</div>
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
                            <Link class="nav-link" to="/ledger"><div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas fa-wallet"></i>
                                </div>
                                <div class="icon-name">Student Ledger</div>
                            </div></Link>


                        </div>
                    </div>
                </div>
                <div class="right-side">
                    <div class="right-header">
                        <div class="top-bar">
                            <div class="top-bar-justify">
                                <div class="big-inbox">
                                    Finance Employee
                                </div>
                            </div>
                        </div>
                        <hr class="new-hr" />
                    </div>
                    <div class="right-body">

                        <div class="message">
                            <div class="add-student">
                                <button type="button" onClick={handleShow} class="btn btn-primary btn-lg"><AddIcon /> Add Employee</button>
                            </div>
                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Finance Employee</Modal.Title>
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
                                                
                                            </div>
                                            <div className="mt-2">
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
                            </Modal>
                            <div class="table-responsive">
                                <table class="table no-wrap">
                                    <thead>
                                        <tr>
                                            <th class="border-top-0">#</th>
                                            <th class="border-top-0">NAME</th>
                                            <th class="border-top-0">Gender</th>
                                            <th class="border-top-0">Phone</th>
                                            <th class="border-top-0">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {employeedata.map((val, i) => {
                                            return (
                                                <tr>
                                                    <td>{val.id}</td>
                                                    <td class="txt-oflo">{`${val.first_name} ${val.last_name}`}</td>
                                                    <td>{val.gender}</td>
                                                    <td>{val.contact}</td>
                                                    <td>
                                                        <ButtonGroup disableElevation variant="contained" color="primary">
                                                            <Button className="student-btn-up" onClick={() => history.push(`/employeupdate/${val.id}`)}><UpdateIcon className="text-white" /></Button>
                                                            <Button className="student-btn-del" onClick={() => deleteData(val.id)}><DeleteIcon className="text-white" /></Button>
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
export default Finance;