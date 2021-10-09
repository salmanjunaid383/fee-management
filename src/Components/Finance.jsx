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
import VpnKeyIcon from '@material-ui/icons/VpnKey';

import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';


const Finance = () => {
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
    const [employeedata, setEmployeedata] = useState([]);
    const history = useHistory();
    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);
    const handleClose = () => setShow(false);
    const handleClose1 = () => setShow1(false);
    const handleShow = () => setShow(true);
    const handleShow1 = () => setShow1(true);
    const [email, setEmail] = useState('');
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmpassword] = useState('');
    const [contact, setContact] = useState('');
    const [address, setAddress] = useState('');
    const [gender, setGender] = useState('');
    const [prevdata, setPrevdata] = useState('');
    const school_id = localStorage.getItem("school_id")
    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);
    const [show3, setShow3] = useState(false);
    const handleClose3 = () => setShow3(false);
    const handleShow3 = () => setShow3(true);
    const changeClick = (id) => {
        localStorage.setItem("user_id", id)
        handleShow3();
    }
    const remove1 = () => {
        localStorage.removeItem("user_id")
        handleClose3();
    }
    const handleClick = (id) => {
        localStorage.setItem("user_id", id)
        handleShow2();
    }
    const remove = () => {
        localStorage.removeItem("user_id")
        handleClose2();
    }

    useEffect(() => {
        axios.get(`http://fee-management-api.nastechltd.co/api/finance/${school_id}`)
            .then(response => {
                console.log(response);
                setEmployeedata(response.data);
            })
            .catch((error) => {
                if (error.response) {
                    setMessageinfo(error.response.data.message);
                    handleMessage();
                }
            })
    }, [])

    const reload = () => {
        axios.get(`http://fee-management-api.nastechltd.co/api/finance/${school_id}`)
            .then(response => {
                console.log(response);
                setEmployeedata(response.data);
            })
            .catch((error) => {
                if (error.response) {
                    setMessageinfo(error.response.data.message);
                    handleMessage();
                }
            })
    }
    const changePassword = () => {
        if (password !== confirmpassword){
            setMessageinfo("Password Does not Match")
            handleMessage();
        }
        else if (password === ''){
            setMessageinfo("Enter Password")
            handleMessage();
        } 
        else if (password.length < 8) {
            setMessageinfo("Password should be atleast 8 characters");
            handleMessage();
          } 
        else{
            axios.put(`http://fee-management-api.nastechltd.co/api/password/${localStorage.getItem("user_id")}`, { password: password })
                .then(response => {
                    console.log(response)
                    setPassword('')
                    setConfirmpassword('')
                    setMessageinfo("Password Changed");
                    handleMessage();
                    reload();
                    remove1();
                })
                .catch((error) => {
                    if (error.response) {
                        setMessageinfo(error.response.data.message);
                        handleMessage();
                    }
                })
        }

    }

    // const Reload = () => {
    //     axios.get(`http://fee-management-api.nastechltd.co/api/student`)
    //     .then(response => {
    //         console.log(response);
    //         setData(response.data);
    //     })
    //     

    // }

    const deleteData = (id) => {
        axios.delete(`http://fee-management-api.nastechltd.co/api/finance/${localStorage.getItem("user_id")}`)
            .then(response => {
                console.log(response)
                reload();
                remove();
            })
            .catch((error) => {
                if (error.response) {
                    setMessageinfo(error.response.data.message);
                    handleMessage();
                }
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
            setMessageinfo("Password Does not Match");
            handleMessage();
        }
        else if (fname == '') {
            setMessageinfo("Enter First Name")
            handleMessage();
        }
        else if (lname == '') {
            setMessageinfo("Enter Last Name")
            handleMessage();
        }
        else if (contact == '') {
            setMessageinfo("Enter Contact No.")
            handleMessage();
        }
        else if (address == '') {
            setMessageinfo("Enter Address")
            handleMessage();
        }
        else if (password == '') {
            setMessageinfo("Enter Password")
            handleMessage();
        }
        else if (gender == '') {
            setMessageinfo("Select Gender")
            handleMessage();
        }
        else {
            if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
                axios.post('http://fee-management-api.nastechltd.co/api/finance_employee', data)
                    .then(response => {
                        console.log(response);
                        console.log(response.data.id);
                        setFname();
                        setLname();
                        setContact();
                        setAddress();
                        setEmail();
                        setGender();
                        setPassword();
                        handleClose();
                        reload();
                    })
                    .catch((error) => {
                        if (error.response) {
                            setMessageinfo(error.response.data.message);
                            handleMessage();
                        }
                    })
            }
            else {
                setMessageinfo("Enter Valid Email")
                handleMessage();
            }

        }
    }
    const update = (id) => {
        axios.get(`http://fee-management-api.nastechltd.co/api/user/${id}`)
            .then(response => {
                console.log(response.data)
                setPrevdata(response.data);
                setAddress(response.data.address)
                setFname(response.data.first_name)
                setLname(response.data.last_name)
                setContact(response.data.contact)
                setEmail(response.data.email)
                setGender(response.data.gender)
                handleShow1();
            })
            .catch((error) => {
                if (error.response) {
                    setMessageinfo(error.response.data.message);
                    handleMessage();
                }
            })
    }
    const sendUpdated = () => {
        if (fname == '') {
            setMessageinfo("Enter First Name")
            handleMessage();
        }
        else if (lname == '') {
            setMessageinfo("Enter Last Name")
            handleMessage();
        }
        else if (contact == '') {
            setMessageinfo("Enter Contact No.")
            handleMessage();
        }
        else if (address == '') {
            setMessageinfo("Enter Address")
            handleMessage();
        }
        else if (gender == '') {
            setMessageinfo("Select Gender")
            handleMessage();
        }
        else {
            if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
                axios.put(`http://fee-management-api.nastechltd.co/api/user/${prevdata.id}`, {
                    first_name: fname,
                    last_name: lname,
                    email: email,
                    contact: contact,
                    address: address,
                    gender: gender

                })
                    .then(response => {
                        console.log(response);
                        setPrevdata('');
                        setFname('');
                        setLname('');
                        setContact('');
                        setAddress('');
                        setEmail('');
                        setGender('');
                        setPassword('');
                        reload();
                        handleClose1();

                    })
                    .catch((error) => {
                        if (error.response) {
                            setMessageinfo(error.response.data.message);
                            handleMessage();
                        }
                    })
            }
            else {
                setMessageinfo("Enter Valid Email")
                handleMessage();
            }
        }
    }
    const logOut = () => {
        localStorage.clear();
        history.push("/")
    }
    var count = 0;
    return (
        <>
            <div class="dashboard">
                <div class="left">
                    <div class="navigation">
                        <div class="wrapper2">
                            <div class="abilan">
                                <img
                                    alt="Logo" src={"http://fee-management-api.nastechltd.co/api/school_profile/"+localStorage.getItem("school_id")} />
                            </div>

                            <Link to="/campusdashboard" class="nav-link "><div class="folder-icons ">
                                <div class="icon1">
                                    <i class="fas  fa-columns"></i>
                                </div>
                                <div class="icon-name1 ">Dashboard</div>
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
                                    <i class="fas fa-user-tie active"></i>
                                </div>
                                <div class="icon-name active">Finance Employee</div>
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
                            <Link class="nav-link" to="/expense">
                <div class="folder-icons">
                  <div class="icon1">
                    <i class="fas fa-receipt"></i>
                  </div>
                  <div class="icon-name">Expense Tracking</div>
                </div>
              </Link>

              <Link class="nav-link" to="/MainReportPage">
                <div class="folder-icons">
                  <div class="icon1">
                    <i class="fas fa-file-medical-alt"></i>
                  </div>
                   <div class="icon-name">Reports</div>
                </div>
              </Link>

              <Link class="nav-link" to="/Voucher-List">
                <div class="folder-icons">
                  <div class="icon1">
                    <i class="fas fa-file-alt"></i>
                  </div>
                  <div class="icon-name">Paid Vouchers</div>
                </div>
              </Link>

              <Link class="nav-link" to="/AdminAttendance">
                <div class="folder-icons">
                  <div class="icon1">
                    <i class="fas fa-file-alt"></i>
                  </div>
                  <div class="icon-name">Attendance</div>
                </div>
              </Link>

              <Link class="nav-link" to="/Inventory">
                <div class="folder-icons">
                  <div class="icon1">
                    <i class="fas fa-file-alt"></i>
                  </div>
                  <div class="icon-name">Inventory</div>
                </div>
              </Link>

              <Link class="nav-link" to="/Asset-Tracking">
                <div class="folder-icons">
                  <div class="icon1">
                    <i class="fas fa-file-alt"></i>
                  </div>
                  <div class="icon-name">School Assets</div>
                </div>
              </Link>
                            <Link class="nav-link" to="/MainReportPage">
                <div class="folder-icons">
                  <div class="icon1">
                    <i class="fas fa-file-medical-alt"></i>
                  </div>
                   <div class="icon-name">Reports</div>
                </div>
              </Link>

              <Link class="nav-link" to="/Voucher-List">
                <div class="folder-icons">
                  <div class="icon1">
                    <i class="fas fa-file-alt"></i>
                  </div>
                  <div class="icon-name">Paid Vouchers</div>
                </div>
              </Link>

              <Link class="nav-link" to="/AdminAttendance">
                <div class="folder-icons">
                  <div class="icon1">
                    <i class="fas fa-file-alt"></i>
                  </div>
                  <div class="icon-name">Attendance</div>
                </div>
              </Link>

              <Link class="nav-link" to="/Inventory">
                <div class="folder-icons">
                  <div class="icon1">
                    <i class="fas fa-file-alt"></i>
                  </div>
                  <div class="icon-name">Inventory</div>
                </div>
              </Link>

              <Link class="nav-link" to="/Asset-Tracking">
                <div class="folder-icons">
                  <div class="icon1">
                    <i class="fas fa-file-alt"></i>
                  </div>
                  <div class="icon-name">School Assets</div>
                </div>
              </Link>



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
                                <button onClick={logOut} class="btn text-bolder text-right">Log Out</button>

                            </div>
                        </div>
                        <hr class="new-hr" />
                    </div>
                    <div class="right-body">

                      {/* back to dashboard option*/}
                      <a href="/campusdashboard" style={{textDecoration:"none"}}>
                                <div className="col-xl-2 dash-button" style={{marginBottom:"10px",display:"flex",alignItems:"flex-end",justifyContent:"center",padding:"6px",color:"#fff", borderRadius:"5px",cursor:"pointer"}}>
                                   
                                <i class="fas fa-tachometer-alt" style={{fontSize:"25px"}}></i>
                                <h5 style={{margin:"0px",marginLeft:"10px", fontSize:"15px", fontWeight:"bold"}}>Dashboard</h5>
                                </div>
                                </a>

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
                            <Modal show={show1} onHide={handleClose1}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Update Finance Employee</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <div class="row billing-main">
                                        <div class="col-6 billing-box">
                                            <TextField className="pb-3 bg-white" type="text" defaultValue={prevdata.first_name} onChange={(e) => setFname(e.target.value)} label="First Name" variant="filled" />
                                            <TextField className="pb-3 bg-white" type="number" defaultValue={prevdata.contact} onChange={(e) => setContact(e.target.value)} label="Contact No." variant="filled" />
                                            <TextField className="TextField" defaultValue={prevdata.address} onChange={(e) => setAddress(e.target.value)} label="Address" multiline rows={1} variant="filled" />

                                        </div>

                                        <div class="col-6 billing-box">
                                            <TextField className="pb-3" type="text" defaultValue={prevdata.last_name} onChange={(e) => setLname(e.target.value)} label="Last Name" variant="filled" />
                                            <TextField className="pb-3" type="email" defaultValue={prevdata.email} onChange={(e) => setEmail(e.target.value)} label="Email" variant="filled" />

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
                            <Modal show={show3} onHide={remove1}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Change Password</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <div className="row billing-main">
                                        <div className="col-8 billing-box">
                                            <TextField className="pb-3 bg-white" type="password" onChange={(e) => setPassword(e.target.value)} label="Password" variant="filled" />
                                            <TextField className="pb-3" type="password" onChange={(e) => setConfirmpassword(e.target.value)} label="Confirm Password" variant="filled" />

                                        </div>
                                    </div>
                                </Modal.Body>
                                <Modal.Footer>
                                    <button class="btn btn-secondary" onClick={remove1}>
                                        Close
                                            </button>
                                    <button onClick={changePassword} className="btn btn-primary">Change</button>
                                </Modal.Footer>
                            </Modal>
                            <div class="table-responsive">
                                <table class="table no-wrap">
                                    <thead>
                                        <tr>
                                            <th class="border-top-0">#</th>
                                            <th class="border-top-0">Name</th>
                                            <th class="border-top-0">Gender</th>
                                            <th class="border-top-0">Phone</th>
                                            <th class="border-top-0">Email</th>
                                            <th class="border-top-0">Password</th>
                                            <th class="border-top-0">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {employeedata.map((val, i) => {
                                            return (
                                                <>

                                                    {
                                                        (val.type).slice(11, 40) == "Finance" ?
                                                            <tr key={i}>
                                                                <td>{`${count = 1 + count}`}</td>
                                                                <td class="txt-oflo print-capitalize">{`${val.first_name} ${val.last_name}`}</td>
                                                                <td className="print-capitalize">{val.gender}</td>
                                                                <td>{val.contact}</td>
                                                                <td class="txt-oflo">{val.email}</td>
                                                                {/* <td><Button><VpnKeyIcon/></Button></td> */}
                                                                <td><Button className="text-bold" onClick={() => changeClick(val.id)}><span>Change</span></Button></td>
                                                                <td>
                                                                    <ButtonGroup disableElevation variant="contained" color="primary">
                                                                        <Button className="student-btn-up" onClick={() => update(val.id)}  ><UpdateIcon className="text-white" /></Button>
                                                                        <Button className="student-btn-del" onClick={() => handleClick(val.id)} ><DeleteIcon className="text-white" /></Button>
                                                                    </ButtonGroup>
                                                                </td>
                                                            </tr>
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
                <Snackbar
                    anchorOrigin={{ vertical, horizontal }}
                    open={open}
                    autoHideDuration={4000}
                    onClose={CloseMessage}
                    message={messageinfo}
                    key={vertical + horizontal}
                />
            </div>
        </>
    );

};
export default Finance;