import { React, useEffect } from 'react';
import './dashboard.css';
import { Link, useHistory } from 'react-router-dom';
import UpdateIcon from '@material-ui/icons/Update';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import logo from './jb1.png'
import { useState } from 'react';
import axios from 'axios'
import { Modal } from 'react-bootstrap';
import TextField from '@material-ui/core/TextField';

const AdmissionCharges = () => {
    const school_id = localStorage.getItem("school_id");
    const [chargesadmission, setChargesadmission] = useState();
    const [admissiondata, setAdmissiondata] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [show1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);
    const [prevdata, setPrevdata] = useState('');
    const history = useHistory();
    useEffect(() => {
        axios.get(`http://fee-management-api.nastechltd.co/api/show_admission_charges/${school_id}`)
            .then(response => {
                console.log(response.data)
                setAdmissiondata(response.data)
            })
            .catch((error) => {
                if (error.response) {
                    alert(error.response.data.message);
                }
            })
    }, [])
    const reload = () => {
        axios.get(`http://fee-management-api.nastechltd.co/api/show_admission_charges/${school_id}`)
            .then(response => {
                console.log(response.data)
                setAdmissiondata(response.data)
            })
            .catch((error) => {
                if (error.response) {
                    alert(error.response.data.message);
                }
            })

    }
    const sendAdmission = () => {
        axios.post(`http://fee-management-api.nastechltd.co/api/admission_charges`,
            {

                school_id: school_id,
                charges: chargesadmission

            })
            .then(response => {
                console.log(response)
                setChargesadmission();
                reload();
                handleClose();
            })
            .catch((error) => {
                if (error.response) {
                    alert(error.response.data.message);
                }
            })

    };
    const update = (id) => {
        axios.get(`http://fee-management-api.nastechltd.co/api/admission_charges/${id}`)
            .then(response => {
                console.log(response.data)
                setPrevdata(response.data);
                setChargesadmission(response.data.charges)
                handleShow1();
            })
            .catch((error) => {
                if (error.response) {
                    alert(error.response.data.message);
                }
            })
    }
    const sendUpdated = () => {
        axios.put(`http://fee-management-api.nastechltd.co/api/admission_charges/${prevdata.id}`, {
            charges: chargesadmission,
            school_id: school_id
        })
            .then(response => {
                console.log(response.data)
                setPrevdata('');
                setChargesadmission();
                reload();
                handleClose1();
            })
            .catch((error) => {
                if (error.response) {
                    alert(error.response.data.message);
                }
            })
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
    const deleteCharges = (id) => {
        axios.delete(`http://fee-management-api.nastechltd.co/api/admission_charges/${localStorage.getItem("user_id")}`)
            .then(response => {
                console.log(response)
                handleClose2();
                localStorage.removeItem("user_id")
                reload();

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
                                    Admission Charges
                                </div>
                                <button onClick={logOut} class="btn text-bolder text-right">Log Out</button>

                            </div>
                        </div>
                        <hr class="new-hr" />
                    </div>
                    <div class="right-body">

                        <div class="message">
                            <div class="add-student">
                                <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Add Charges</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <div class="row billing-main">
                                            <div class="col-6 billing-box">
                                                <TextField className="pb-3 bg-white" type="number" onChange={(e) => setChargesadmission(e.target.value)} label="Charges" variant="filled" />
                                            </div>
                                        </div>


                                    </Modal.Body>
                                    <Modal.Footer>
                                        <button class="btn btn-secondary" onClick={handleClose}>
                                            Close
                                            </button>
                                        <button onClick={sendAdmission} className="btn btn-primary">Add</button>
                                    </Modal.Footer>
                                </Modal>
                                <Modal show={show1} onHide={handleClose1}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Update Charges</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <div class="row billing-main">
                                            <div class="col-6 billing-box">
                                                <TextField className="pb-3 bg-white" type="number" defaultValue={prevdata.charges} onChange={(e) => setChargesadmission(e.target.value)} label="Charges" variant="filled" />
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
                                        <button onClick={deleteCharges} className="btn btn-primary">Yes</button>
                                    </Modal.Footer>
                                </Modal>
                            </div>
                            <div class="table-responsive">
                                <table class="table no-wrap">
                                    <thead>
                                        <tr>
                                            <th class="border-top-0">#</th>
                                            <th class="border-top-0">Charges</th>
                                            <th class="border-top-0">Created At</th>
                                            <th class="border-top-0">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {admissiondata.map((val, i) => {
                                            return (
                                                <>
                                                    <tr key={i}>
                                                        <td>{i + 1}</td>
                                                        <td class="txt-oflo">{val.charges}</td>
                                                        <td>{val.created_at.slice(0, 10)}</td>
                                                        <td>
                                                            <ButtonGroup disableElevation variant="contained" color="primary">
                                                                <Button className="student-btn-up" onClick={() => update(val.id)}><UpdateIcon className="text-white" /></Button>
                                                                <Button className="student-btn-del" onClick={() => handleClick(val.id)} ><DeleteIcon className="text-white" /></Button>
                                                            </ButtonGroup>
                                                        </td>
                                                    </tr>
                                                </>
                                            )
                                        })}

                                    </tbody>
                                </table>
                                {
                                    admissiondata.length == 0 ?

                                        <div class="text-center mb-2">
                                            <button onClick={handleShow} class="btn btn-primary">Define Admission Charges</button>
                                        </div>
                                        :
                                        null

                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

};
export default AdmissionCharges;