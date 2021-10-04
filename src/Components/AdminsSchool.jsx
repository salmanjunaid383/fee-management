import { React, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import { Modal } from 'react-bootstrap';
import TextField from '@material-ui/core/TextField';
import logo from "./jb2.png";
import './dashboard.css';
import UpdateIcon from '@material-ui/icons/Update';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Snackbar from '@material-ui/core/Snackbar';

// import AddIcon from '@material-ui/icons/Add';

const AdminsSchool = () => {
    const [messageinfo, setMessageinfo] = useState('');
    const [message, setMessage] = useState({
        open: false,
        vertical: 'top',
        horizontal: 'right',
    });
    const { vertical, horizontal, open } = message;
    const handleMessage =() => {
        setMessage({ open: true,vertical: 'top',horizontal: 'right' });
    };

    const CloseMessage = () => {
        setMessage({ ...message, open: false });
    };
    const [data, setData] = useState([]);
    const history = useHistory();
    const { adminid } = useParams();
    const [show1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);
    const [schoolName, setSchoolName] = useState();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState();
    const [address, setAddress] = useState();
    const [prevdata, setPrevdata] = useState('');
    const [email, setEmail] = useState();
    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);
    // const id = localStorage.getItem("school_id");
    useEffect(() => {
        axios.get(`http://fee-management-api.nastechltd.co/api/schools/${adminid}`)
            .then(response => {
                console.log(response.data);
                setData(response.data);
            })
            .catch((error) => {
                if (error.response) {
                    setMessageinfo(error.response.data.message);
                    handleMessage();
                }
            })
        axios.get(`http://fee-management-api.nastechltd.co/api/user/${adminid}`)
            .then(response => {
                console.log(response.data);
                setName(`${response.data.first_name} ${response.data.last_name}`);
            })
            .catch((error) => {
                if (error.response) {
                    setMessageinfo(error.response.data.message);
                    handleMessage();
                }
            })

    }, [])
    const reload = () => {
        axios.get(`http://fee-management-api.nastechltd.co/api/schools/${adminid}`)
            .then(response => {
                setData(response.data);
            })
            .catch((error) => {
                if (error.response) {
                    setMessageinfo(error.response.data.message);
                    handleMessage();
                }
            })

    }

    const deleteSchool = (id) => {
        axios.delete(`http://fee-management-api.nastechltd.co/api/schools/${localStorage.getItem('user_id')}`)
            .then(response => {
                console.log(response)
                localStorage.removeItem("user_id")
                handleClose2();
                reload();
            })
            .catch((error) => {
                if (error.response) {
                    setMessageinfo(error.response.data.message);
                    handleMessage();
                }
            })
    }
    const handleClick = (id) => {
        localStorage.setItem("user_id", id)
        handleShow2();
    }
    const remove = () => {
        localStorage.removeItem("user_id")
        handleClose2();
    }
    const update = (id) => {
        axios.get(`http://fee-management-api.nastechltd.co/api/show_school/${id}`)
            .then(response => {
                console.log(response.data)
                setPrevdata(response.data)
                setAddress(response.data.address)
                setSchoolName(response.data.name)
                setPhone(response.data.contact)
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
        if (schoolName == '') {
            setMessageinfo("Enter School Name")
            handleMessage();
        }
        else if (address == '') {
            setMessageinfo("Enter School Address")
            handleMessage();
        }
        else if (phone == '') {
            setMessageinfo("Enter School Contact No.")
            handleMessage();
        }
        else {
            if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
                axios.put(`http://fee-management-api.nastechltd.co/api/schools/${prevdata.id}`, {
                    name: schoolName,
                    email: email,
                    contact: phone,
                    address: address

                })
                    .then(response => {
                        console.log(response);
                        setPrevdata('');
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
                                <img
                                    alt="Logo" src={"http://fee-management-api.nastechltd.co/api/school_profile/"+localStorage.getItem("school_id")} />
                            </div>

                            <Link class="nav-link" to="/super"><div class="folder-icons ">
                                <div class="icon1">
                                    <i class="fas fa-columns"></i>
                                </div>
                                <div class="icon-name1">Administrators</div>
                            </div></Link>

                            <Link to="/superschool" class="nav-link active "><div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas active fa-school"></i>
                                </div>
                                <div class="icon-name active">School</div>
                            </div></Link>

                            {/* <div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas fa-user-graduate"></i>
                                </div>
                                <div class="icon-name nav-link"><Link to="/students">Students</Link></div>
                            </div>
                            <div class="folder-icons">
                                <div class="icon1">
                                <i class="fas fa-wallet"></i>
                                </div>
                                <div class="icon-name nav-link "><Link to="/finance" class="">Finance Employee </Link></div>
                            </div>
                            <div class="folder-icons">
                                <div class="icon1">
                                <i class="fas fa-wallet"></i>
                                </div>
                                <div class="icon-name nav-link "><Link to="/class" class="">Class </Link></div>
                            </div>
                            <div class="folder-icons">
                        <div class="icon1">
                            <i class="fas fa-user-graduate"></i>
                        </div>
                        <div class="icon-name nav-link"><Link to="/fee">Fee Generation</Link></div>
                    </div>
                    <div class="folder-icons">
                        <div class="icon1">
                        <i class="fas fa-wallet"></i>
                        </div>
                        <div class="icon-name nav-link "><Link to="/feeperiod" >Fee Period</Link></div>
                    </div>
                    <div class="folder-icons">
                        <div class="icon1">
                        <i class="fas fa-wallet"></i>
                        </div>
                        <div class="icon-name nav-link "><Link to="/structure">Fee Structure</Link></div>
                    </div> */}



                        </div>
                    </div>
                </div>
                <div class="right-side">
                    <div class="right-header">
                        <div class="top-bar">
                            <div class="top-bar-justify">
                                <div class="big-inbox print-capitalize">
                                    {`${name}'s Schools`}
                                </div>
                                <button onClick={logOut} class="btn text-bolder text-right">Log Out</button>
                            </div>

                        </div>
                        <hr class="new-hr" />
                    </div>
                    <div class="right-body">
                        <div class="message">
                            <Modal show={show1} onHide={handleClose1}>
                                <Modal.Header closeButton>
                                    <Modal.Title className="text-center"> Update School</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <div class="row billing-main">
                                        <div class="col-6 billing-box">

                                            <TextField className="pb-3 bg-white" type="text" defaultValue={prevdata.name} onChange={(e) => setSchoolName(e.target.value)} label="School Name" variant="filled" />
                                            <TextField className="pb-3 bg-white" type="number" defaultValue={prevdata.contact} onChange={(e) => setPhone(e.target.value)} label="Contact No." variant="filled" />
                                        </div>

                                        <div class="col-6 billing-box">
                                            <TextField className="pb-3" type="email" defaultValue={prevdata.email} onChange={(e) => setEmail(e.target.value)} label="Email" variant="filled" />
                                            <TextField className="pb-3" defaultValue={prevdata.address} onChange={(e) => setAddress(e.target.value)} label="Address" multiline rows={1} variant="filled" />
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
                                    <button onClick={deleteSchool} className="btn btn-primary">Yes</button>
                                </Modal.Footer>
                            </Modal>
                            <div class="table-responsive">
                                <table class="table no-wrap">
                                    <thead>
                                        <tr>
                                            <th class="border-top-0">#</th>
                                            <th class="border-top-0">Name</th>
                                            <th class="border-top-0">Email</th>
                                            <th class="border-top-0">Address</th>
                                            <th class="border-top-0">Phone</th>
                                            {/* <th class="border-top-0">Visit</th> */}
                                            <th class="border-top-0">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((val, i) => {
                                            return (
                                                <tr key={i}>
                                                    <td>{count = 1 + count}</td>
                                                    <td class="txt-oflo print-capitalize">{val.name}</td>
                                                    <td class="txt-oflo print-capitalize">{val.email}</td>
                                                    <td className="print-capitalize">{val.address}</td>
                                                    <td>{val.contact}</td>
                                                    <td>
                                                        <ButtonGroup disableElevation variant="contained" color="primary">
                                                            <Button className="student-btn-up" onClick={() => update(val.id)}  ><UpdateIcon className="text-white" /></Button>
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
export default AdminsSchool;