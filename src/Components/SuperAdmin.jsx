import React, { useState, useEffect } from 'react';
import './dashboard.css';
import { Link, useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from "./jb1.png";
import { Modal } from 'react-bootstrap';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import UpdateIcon from '@material-ui/icons/Update';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import FormLabel from '@material-ui/core/FormLabel';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';



const SuperAdmin = () => {
    const [studentdata, setStudentdata] = useState([]);
    const [schooldata, setSchooldata] = useState([]);
    const [allSelected, setAllSelected] = useState(false);
    const [deleteA, setDeleteA] = useState(false);
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
    const [prevdata, setPrevdata] = useState('');
    const [administratordata, setAdministratordata] = useState([]);
    const history = useHistory();
    const [show3, setShow3] = useState(false);
    const handleClose3 = () => setShow3(false);
    const handleShow3 = () => setShow3(true);
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
    const changeClick = (id) => {
        localStorage.setItem("user_id", id)
        handleShow3();
    }
    const remove1 = () => {
        localStorage.removeItem("user_id")
        handleClose3();
    }
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

    useEffect(() => {
        axios.get(`http://fee-management-api.nastechltd.co/api/user`)
            .then(response => {
                console.log(response.data)
                setAdministratordata(response.data)
            })
            .catch((error) => {
                if (error.response) {
                    setMessageinfo(error.response.data.message);
                    handleMessage();

                }
            })
    }, [])
    const reload = () => {
        axios.get(`http://fee-management-api.nastechltd.co/api/user`)
            .then(response => {
                console.log(response.data)
                setAdministratordata(response.data)
            })
            .catch((error) => {
                if (error.response) {
                    setMessageinfo(error.response.data.message);
                    handleMessage();
                }
            })
    }
    // useEffect(() => {
    //     axios.get(`http://fee-management-api.nastechltd.co/api/student`)
    //         .then(response => {
    //             console.log(response);
    //             setStudentdata(response.data);
    //         })
    //         .catch((error) => {
    //             if (error.response) {
    //                 
    // setMessageinfo(error.response.data.message);
    //             }
    //         })
    // }, [])
    // const relaod = () => {
    //     axios.get(`http://fee-management-api.nastechltd.co/api/student`)
    //         .then(response => {
    //             console.log(response);
    //             setStudentdata(response.data);
    //         })
    //         .catch((error) => {
    //             if (error.response) {
    // handleMessage();
    //                 
    // setMessageinfo(error.response.data.message);
    //             }
    //         })
    // }
    const changePassword = () => {
        if (password == confirmpassword) {
            axios.put(`http://fee-management-api.nastechltd.co/api/password/${localStorage.getItem("user_id")}`, { password: password })
                .then(response => {
                    console.log(response)
                    setPassword('')
                    setConfirmpassword('')
                    reload();
                    remove1();
                })
                .catch((error) => {
                    if (error.response) {
                        setMessageinfo(error.response.data.message);
                        handleMessage();

                    }
                })
            setMessageinfo("Password Does not Match")
        }
        else {
            handleMessage();

        }

    }
    useEffect(() => {
        axios.get(`http://fee-management-api.nastechltd.co/api/schools`)
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
    const data = {
        first_name: fname,
        last_name: lname,
        password: password,
        email: email,
        contact: contact,
        address: address
        // age : age
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
        else {
            if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
                axios.post('http://fee-management-api.nastechltd.co/api/administrator', data)
                    .then(response => {
                        console.log(response);
                        console.log(response.data.id);
                        setAddress('');
                        setPassword('');
                        setFname('');
                        setLname('');
                        setContact('');
                        setEmail('');
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
                setMessageinfo("Enter valid Email")
                handleMessage();

            }
        }
    }
    const deleteAdministrator = () => {
        axios.delete(`http://fee-management-api.nastechltd.co/api/user/${localStorage.getItem('user_id')}`)
            .then(response => {
                console.log(response)
                localStorage.removeItem("user_id")
                reload();
                handleClose2();
            })
            .catch((error) => {
                if (error.response) {
                    setMessageinfo(error.response.data.message);
                    handleMessage();

                }
            })
    }

    const update = (id) => {
        axios.get(`http://fee-management-api.nastechltd.co/api/user/${id}`)
            .then(response => {
                console.log(response.data)
                setPrevdata(response.data)
                setAddress(response.data.address)
                setFname(response.data.first_name)
                setLname(response.data.last_name)
                setContact(response.data.contact)
                setEmail(response.data.email)
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
        else {
            if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
                axios.put(`http://fee-management-api.nastechltd.co/api/user/${prevdata.id}`, {
                    first_name: fname,
                    last_name: lname,
                    email: email,
                    contact: contact,
                    address: address
                })
                    .then(response => {
                        console.log(response);
                        setPrevdata('');
                        setAddress('');
                        setPassword('');
                        setFname('');
                        setLname('');
                        setContact('');
                        setEmail('');
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
                setMessageinfo("Enter valid Email")
                handleMessage();
            }
        }
    }
    var count = 0;
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
                                <img src={logo} />
                            </div>

                            <Link class="nav-link" to="/super"><div class="folder-icons ">
                                <div class="icon1">
                                    <i class="fas active fa-columns"></i>
                                </div>
                                <div class="icon-name1 active">Administrators</div>
                            </div></Link>

                            <Link class="nav-link" to="/superschool"><div class="folder-icons">
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
                                    Administrators
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
                                <div></div>
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
                                <div></div>
                            </div>
                        </div> */}
                        <div class="message">
                            <div class="add-student">
                                <button type="button" onClick={handleShow} class="btn btn-primary btn-small"><AddIcon /> Add School Administrator</button>
                            </div>
                            <div class="table-responsive">
                                <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>School Administrator</Modal.Title>
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
                                        <Modal.Title>Update School Administrator</Modal.Title>
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
                                        <button onClick={deleteAdministrator} className="btn btn-primary">Yes</button>
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
                                <table class="table no-wrap">
                                    <thead>
                                        <tr>
                                            <th class="border-top-0">#</th>
                                            <th class="border-top-0">NAME</th>
                                            <th class="border-top-0">Contact No.</th>
                                            <th class="border-top-0">Address</th>
                                            <th class="border-top-0">Email</th>
                                            <th class="border-top-0">Password</th>
                                            <th class="border-top-0">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {administratordata.map((val, i) => {
                                            return (
                                                <>
                                                    {
                                                        (val.type).slice(11, 40) == "SchoolAdministrator" ?
                                                            <tr key={i}>
                                                                <td>{count = 1 + count}</td>
                                                                <td class="txt-oflo print-capitalize">{`${val.first_name} ${val.last_name}`}</td>
                                                                <td>{val.contact}</td>
                                                                <td className="print-capitalize">{val.address}</td>
                                                                <td class="txt-oflo">{val.email}</td>
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
export default SuperAdmin;





