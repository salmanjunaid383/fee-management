import { React, useEffect } from 'react';
import '../dashboard.css';
import { Link, useHistory } from 'react-router-dom';
import UpdateIcon from '@material-ui/icons/Update';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import logo from '../jb1.png'
import { useState } from 'react';
import axios from 'axios';
import { Modal } from 'react-bootstrap';
import TextField from '@material-ui/core/TextField';
import { SportsEsportsOutlined } from '@material-ui/icons';
import Snackbar from '@material-ui/core/Snackbar';

const EmployeeStructure = () => {
    const [feedata, setFeedata] = useState([]);
    const [classdata, setClassdata] = useState([]);
    const [chargesdata, setChargesdata] = useState([]);
    const school_id = localStorage.getItem("school_id");
    const history = useHistory();
    const [classid, setClassid] = useState();
    const [tax, setTax] = useState('');
    const [prevdata, setPrevdata] = useState('');
    const [description, setDescription] = useState('');
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
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
        axios.get(`http://fee-management-api.nastechltd.co/api/show_fee_structure/${school_id}`)
            .then(response => {
                setFeedata(response.data)
                console.log(response.data)

            })
            .catch((error) => {
                if (error.response) {
                    setMessageinfo(error.response.data.message);
                    handleMessage();
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
                    setMessageinfo(error.response.data.message);
                    handleMessage();
                }
            })
    }, [])

    var mydata = [];
    for (var i = 0; i < feedata.length; i++) {
        var dd = {
            description: feedata[i].description,
            id: feedata[i].id,
            tax: feedata[i].tax,
            total_monthly: feedata[i].total_monthly_charges,
            total_yearly: feedata[i].total_yearly_charges,
            class_name: ""
        }
        for (var j = 0; j < classdata.length; j++) {
            if (feedata[i].class_id == classdata[j].id) {
                dd.class_name = classdata[j].name
            }
        }
        mydata.push(dd)
    }
    const reload = () => {
        axios.get(`http://fee-management-api.nastechltd.co/api/show_fee_structure/${school_id}`)
            .then(response => {
                setFeedata(response.data)
                console.log(response.data)

            })
            .catch((error) => {
                if (error.response) {
                    setMessageinfo(error.response.data.message);
                    handleMessage();
                }
            })
    }
    const deleteFee = (id) => {
        axios.delete(`http://fee-management-api.nastechltd.co/api/fee_structure/${localStorage.getItem("user_id")}`)
            .then(response => {
                console.log(response);
                remove();
                reload();
            })
            .catch((error) => {
                if (error.response) {
                    setMessageinfo(error.response.data.message);
                    handleMessage();
                }
            })
    }

    const update = (id) => {
        axios.get(`http://fee-management-api.nastechltd.co/api/fee_structure/${id}`)
            .then(response => {
                setPrevdata(response.data);
                setTax(response.data.tax)
                setDescription(response.data.description);
                setClassid(response.data.class_id);
                console.log(response.data)
                handleShow();

            })
            .catch((error) => {
                if (error.response) {
                    setMessageinfo(error.response.data.message);
                    handleMessage();
                }
            })

    }
    const sendUpdated = () => {
        if (tax < 0) {
            setMessageinfo("Tax can't be Negative");
            handleMessage();
        }
        if (tax === '') {
            setMessageinfo("Enter Tax");
            handleMessage();
        }
        if (description === '') {
            setMessageinfo("Enter Description");
            handleMessage();
        }
        else {
            axios.put(`http://fee-management-api.nastechltd.co/api/fee_structure/${prevdata.id}`, {
                description: description,
                class_id: classid,
                school_id: school_id,
                monthly_charges: prevdata.total_monthly_charges,
                yearly_charges: prevdata.total_yearly_charges,
                tax: tax
            })
                .then(response => {
                    setPrevdata('');

                    reload();
                    handleClose();
                    console.log(response.data);


                })
                .catch((error) => {
                    if (error.response) {
                        setMessageinfo(error.response.data.message);
                        handleMessage();
                    }
                })
        }
    }

    // console.log(mydata)
    // useEffect(() => {
    //     axios.get(`http://fee-management-api.nastechltd.co/api/monthly_charges/2`)
    //         .then(response => {
    //             console.log(response.data)
    //             // setChargesdata(response.data)

    //         })
    //         .catch((error) => {

    // }, [])



    // var mydata = []
    // for (var i = 0; i < feedata.length; i++) {


    //     for (var j = 0; j < chargesdata.length; j++) {
    //         var objectdata = {
    //             id: feedata[i].id,
    //             class_id: feedata[i].class_id,
    //             school_id: feedata[i].school_id,
    //             tax: feedata[i].tax,
    //             totalmonthlyCharges: feedata[i].total_monthly_charges,
    //             totalyearlyCharges: feedata[i].total_yearly_charges,
    //             monthlyCharges: [],
    //             yearlyCharges: [],
    //         }
    //         if (feedata[i].id == chargesdata[j].fee_structure_id) {
    //             objectdata.monthlyCharges.push(chargesdata[j].monthly_charges)
    //             objectdata.yearlyCharges.push(chargesdata[j].yearly_charges)

    //         }
    //     }
    //     mydata.push(objectdata)
    // }
    // console.log(mydata)
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

                            <Link to="/employeedashboard" class="nav-link "><div class="folder-icons ">
                                <div class="icon1">
                                    <i class="fas fa-columns"></i>
                                </div>
                                <div class="icon-name1">Dashboard</div>
                            </div></Link>
                            
                            <Link class="nav-link" to="/employeefeecomponents"><div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas fa-money-check-alt active"></i>
                                </div>
                                <div class="icon-name active">Fee</div>
                            </div></Link>
                            <Link class="nav-link" to="/employeefeevoucheradmin"><div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas fa-print"></i>
                                </div>
                                <div class="icon-name">Fee Voucher</div>
                            </div></Link>
                            <Link class="nav-link" to="/employeeadminledger"><div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas fa-calculator-alt"></i>
                                </div>
                                <div class="icon-name">Student Ledger</div>
                            </div></Link>
                            <Link class="nav-link" to="/employeeexpense"><div class="folder-icons">
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
                                <div class="big-inbox">
                                    Fee Structure
                                </div>
                                <button onClick={logOut} class="btn text-bolder text-right">Log Out</button>

                            </div>
                        </div>
                        <hr class="new-hr" />
                    </div>
                    <div class="right-body">

                        <div class="message">
                            <div class="add-student1">
                                <Link to="/employeeaddstructure"> <button type="button" class="btn mb-1 btn-primary btn-lg"><AddIcon /> Add Structure</button></Link>
                                <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Update Fee Structure</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <div class="row billing-main">
                                            <div class="col-6 billing-box">
                                                <TextField className="pb-3 bg-white" type="text" defaultValue={prevdata.description} onChange={(e) => setDescription(e.target.value)} label="Description" variant="filled" />
                                            </div>
                                            <div class="col-6 billing-box">
                                                <TextField className="pb-3 bg-white" type="number" defaultValue={prevdata.tax} onChange={(e) => setTax(e.target.value)} label="Tax" variant="filled" />
                                            </div>
                                        </div>


                                    </Modal.Body>
                                    <Modal.Footer>
                                        <button class="btn btn-secondary" onClick={handleClose}>
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
                                        <button onClick={deleteFee} className="btn btn-primary">Yes</button>
                                    </Modal.Footer>
                                </Modal>
                            </div>
                            <div class="show_fee">

                                {/* <div class="fee_card shadow rounded mx-2 my-3">
                                    <table class="table table-hover">
                                        <thead>
                                            <tr>
                                                <th scope="col">Class</th>
                                                <th scope="col">Monthly</th>
                                                <th scope="col">Yearly</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th scope="row">1</th>
                                                <td>567</td>
                                                <td>67</td>
                                            </tr>

                                        </tbody>
                                    </table>
                                    <div className="col text-center my-3">
                                        <ButtonGroup disableElevation variant="contained" color="primary ">
                                            <Button className="student-btn-up"   ><UpdateIcon className="text-white" /></Button>
                                            <Button className="student-btn-del"  ><DeleteIcon className="text-white" /></Button>
                                        </ButtonGroup>
                                    </div>
                                </div> */}

                                {/* <div class="fee_card shadow mx-2 rounded my-3">
                                    <div className="col">
                                        <span>Class:</span>
                                        <span>1</span>
                                    </div>
                                    <div className="col">
                                        <span>Monthly Charges:</span>
                                        <span>4556</span>
                                    </div>

                                    <div className="col">
                                        <span>Yearly Charges:</span>
                                        <span>4556</span>
                                    </div>
                                    <div className="col text-center mb-3">
                                        <ButtonGroup disableElevation variant="contained" color="primary ">
                                            <Button className="student-btn-up"   ><UpdateIcon className="text-white" /></Button>
                                            <Button className="student-btn-del"  ><DeleteIcon className="text-white" /></Button>
                                        </ButtonGroup>
                                    </div>
                                </div>

                                <div class="fee_card shadow mx-2 rounded my-3">
                                    <div className="col">
                                        <span>Class:</span>
                                        <span>1</span>
                                    </div>
                                    <div className="col">
                                        <span>Monthly Charges:</span>
                                        <span>4556</span>
                                    </div>

                                    <div className="col">
                                        <span>Yearly Charges:</span>
                                        <span>4556</span>
                                    </div>
                                    <div className="col text-center mb-3">
                                        <ButtonGroup disableElevation variant="contained" color="primary ">
                                            <Button className="student-btn-up"   ><UpdateIcon className="text-white" /></Button>
                                            <Button className="student-btn-del"  ><DeleteIcon className="text-white" /></Button>
                                        </ButtonGroup>
                                    </div>
                                </div> */}
                                {mydata.map((val, i) => {
                                    return (
                                        <>
                                            <div class="fee_card shadow mx-2 rounded my-3">
                                                <div className="col">
                                                    <span>Class:</span>
                                                    <span class="text-bolder">{val.class_name}</span>
                                                </div>
                                                <div className="col ">
                                                    <span>Description:</span>
                                                    <span class="text-bolder">{val.description}</span>
                                                </div>
                                                <div className="col ">
                                                    <span>Monthly Charges:</span>
                                                    <span class="text-bolder">{val.total_monthly}</span>
                                                </div>

                                                <div className="col ">
                                                    <span>Yearly Charges:</span>
                                                    <span class="text-bolder">{val.total_yearly}</span>
                                                </div>
                                                <div className="col ">
                                                    <span>Tax:</span>
                                                    <span class="text-bolder">{val.tax}</span>
                                                </div>
                                                <div className="col">
                                                    <Link to="/employeebreakdown"><button onClick={() => localStorage.setItem("fee_structure_id", val.id)} class="btn text-success">Details</button></Link>
                                                </div>

                                                <div className="col text-right my-3">
                                                    <ButtonGroup disableElevation variant="contained" color="primary ">
                                                        <Button className="student-btn-up" onClick={() => update(val.id)}   ><UpdateIcon className="text-white" /></Button>
                                                        <Button className="student-btn-del" onClick={() => handleClick(val.id)}  ><DeleteIcon className="text-white" /></Button>
                                                    </ButtonGroup>
                                                </div>
                                            </div>

                                        </>
                                    )
                                })}
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
            </div>
        </>
    );

};
export default EmployeeStructure;