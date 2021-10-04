import { React, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import logo from '../jb1.png'
import '../dashboard.css';
import UpdateIcon from '@material-ui/icons/Update';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { Modal } from 'react-bootstrap';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    navigation: {
        marginTop: theme.spacing(2),
    },
}));

const EmployeeBreakDown = () => {
    const classes = useStyles();
    const [monthly, setMonthly] = useState([]);
    const [monthlydescription, setMonthlydescription] = useState();
    const [monthlycharges, setMonthlycharges] = useState();
    const [yearlydescription, setYearlydescription] = useState();
    const [yearlycharges, setYearlycharges] = useState();
    const [yearlymonth, setYearlymonth] = useState();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [show1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);
    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);
    const [show3, setShow3] = useState(false);
    const handleClose3 = () => setShow3(false);
    const handleShow3 = () => setShow3(true);
    const [yearly, setYearly] = useState([]);
    const [prevdata, setPrevdata] = useState('');
    const history = useHistory();
    const fee_structure_id = localStorage.getItem("fee_structure_id");
    const [show4, setShow4] = useState(false);
    const handleClose4 = () => setShow4(false);
    const handleShow4 = () => setShow4(true);
    const [show5, setShow5] = useState(false);
    const handleClose5 = () => setShow5(false);
    const handleShow5 = () => setShow5(true);
    const handleClick1 = (id) => {
        localStorage.setItem("user_id", id)
        handleShow4();
    }
    const remove1 = () => {
        localStorage.removeItem("user_id")
        handleClose4();
    }
    const handleClick2 = (id) => {
        localStorage.setItem("user_id", id)
        handleShow5();
    }
    const remove2 = () => {
        localStorage.removeItem("user_id")
        handleClose5();
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
        axios.get(`http://fee-management-api.nastechltd.co/api/show_charges/${fee_structure_id}`)
            .then(response => {
                console.log(response.data)
                setMonthly(response.data.monthly_charges)
                setYearly(response.data.yearly_charges)
            })
            .catch((error) => {
                if (error.response) {
                    setMessageinfo(error.response.data.message);
                    handleMessage();
                }
            })
    }, [])

    // const sendData = () => {
    //     axios.post(`http://fee-management-api.nastechltd.co/api/section`, {
    //         name: section,
    // class_id :class_id,
    // class_name : class_name

    //     })
    //         .then(response => {
    //             console.log(response);
    //             reload();
    //             handleClose();
    //         })
    //         .catch((error) => {

    // }
    const updateMonthly = (id) => {
        axios.get(`http://fee-management-api.nastechltd.co/api/monthly_charges/${id}`)
            .then(response => {
                console.log(response.data)
                setPrevdata(response.data);
                setMonthlydescription(response.data.description)
                setMonthlycharges(response.data.charges)
                handleShow();
                // setSection(response.data.name)
                // handleShow1();
            })
            .catch((error) => {
                if (error.response) {
                    setMessageinfo(error.response.data.message);
                    handleMessage();
                }
            })
    }
    const updateYearly = (id) => {
        axios.get(`http://fee-management-api.nastechltd.co/api/yearly_charges/${id}`)
            .then(response => {
                console.log(response.data)
                setPrevdata(response.data)
                setYearlymonth(response.data.month);
                setYearlydescription(response.data.description);
                setYearlycharges(response.data.charges);
                handleShow1();
                // setSection(response.data.name)
                // handleShow1();
            })
            .catch((error) => {
                if (error.response) {
                    setMessageinfo(error.response.data.message);
                    handleMessage();
                }
            })
    }
    const sendUpdatedYearly = () => {
        axios.put(`http://fee-management-api.nastechltd.co/api/yearly_charges/${prevdata.id}`, {
            description: yearlydescription,
            charges: yearlycharges,
            month: yearlymonth,
            fee_structure_id: fee_structure_id

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
    const sendUpdatedMonthly = () => {
        axios.put(`http://fee-management-api.nastechltd.co/api/monthly_charges/${prevdata.id}`, {
            description: monthlydescription,
            charges: monthlycharges,
            fee_structure_id: fee_structure_id

        })
            .then(response => {
                console.log(response);
                setPrevdata('');
                reload();
                handleClose();
            })
            .catch((error) => {
                if (error.response) {
                    setMessageinfo(error.response.data.message);
                    handleMessage();
                }
            })
    }

    const sendMonthly = () => {
        axios.post(`http://fee-management-api.nastechltd.co/api/monthly_charges`, {
            description: monthlydescription,
            charges: monthlycharges,
            fee_structure_id: fee_structure_id

        })
            .then(response => {
                console.log(response);
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

    const sendYearly = () => {
        axios.post(`http://fee-management-api.nastechltd.co/api/yearly_charges`, {
            description: yearlydescription,
            charges: yearlycharges,
            month: yearlymonth,
            fee_structure_id: fee_structure_id

        })
            .then(response => {
                console.log(response);
                reload();
                handleClose3();

            })
            .catch((error) => {
                if (error.response) {
                    setMessageinfo(error.response.data.message);
                    handleMessage();
                }
            })
    }




    const reload = () => {
        axios.get(`http://fee-management-api.nastechltd.co/api/show_charges/${fee_structure_id}`)
            .then(response => {
                console.log(response.data)
                setMonthly(response.data.monthly_charges)
                setYearly(response.data.yearly_charges)
            })
            .catch((error) => {
                if (error.response) {
                    setMessageinfo(error.response.data.message);
                    handleMessage();
                }
            })


    }
    const deleteCharges = (id) => {
        axios.delete(`http://fee-management-api.nastechltd.co/api/monthly_charges/${localStorage.getItem("user_id")}`)
            .then(response => {
                console.log(response)
                reload();
                remove1()
            })
            .catch((error) => {
                if (error.response) {
                    setMessageinfo(error.response.data.message);
                    handleMessage();
                }
            })

    }

    const deleteYearlyCharges = (id) => {
        axios.delete(`http://fee-management-api.nastechltd.co/api/yearly_charges/${localStorage.getItem("user_id")}`)
            .then(response => {
                console.log(response)
                remove2();
                reload();
            })
            .catch((error) => {
                if (error.response) {
                    setMessageinfo(error.response.data.message);
                    handleMessage();
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
                                <img alt="Logo" src={"http://fee-management-api.nastechltd.co/api/school_profile/"+localStorage.getItem("school_id")} />
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
                                <div class="big-inbox">Fee Structure</div>
                                <button onClick={logOut} class="btn text-bolder text-right">Log Out</button>
                            </div>

                        </div>
                        <hr class="new-hr" />
                    </div>
                    <div class="right-body">
                        <div className={`${classes.navigation}`}>
                            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                                <Link className="text-decoration-none" color="inherit" to="/employeefeecomponents">
                                    Fee
                                </Link>
                                <Link className="text-decoration-none" color="inherit" to="/employeestructure">
                                    Fee Structure
                                </Link>
                                <Typography color="textPrimary">Fee Structure Breakdown</Typography>
                            </Breadcrumbs>
                        </div>
                        <div class="message">
                            <div class="add-student">
                                <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Update Monthly Charges</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <div class="row billing-main">
                                            <div class="col-6 billing-box">
                                                <TextField className="pb-3 bg-white" type="text" defaultValue={prevdata.description} onChange={(e) => setMonthlydescription(e.target.value)} label="Description" variant="filled" />
                                            </div>
                                            <div class="col-6 billing-box">
                                                <TextField className="pb-3 bg-white" type="number" defaultValue={prevdata.charges} onChange={(e) => setMonthlycharges(e.target.value)} label="Charges" variant="filled" />
                                            </div>
                                        </div>


                                    </Modal.Body>
                                    <Modal.Footer>
                                        <button class="btn btn-secondary" onClick={handleClose}>
                                            Close
                                            </button>
                                        <button onClick={sendUpdatedMonthly} className="btn btn-primary">Update</button>
                                    </Modal.Footer>
                                </Modal>
                                <Modal show={show1} onHide={handleClose1}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Update Yearly Charges</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <div class="row billing-main">
                                            <div class="col-6 billing-box">
                                                <select class="inline select-update" id="select-class" name="month" onChange={(e) => setYearlymonth(e.target.value)}>
                                                    <option selected disabled="disabled" value="" >{prevdata.month}</option>
                                                    <option>Jan</option>
                                                    <option>Feb</option>
                                                    <option>Mar</option>
                                                    <option>Apr</option>
                                                    <option>May</option>
                                                    <option>Jun</option>
                                                    <option>Jul</option>
                                                    <option>Aug</option>
                                                    <option>Sep</option>
                                                    <option>Oct</option>
                                                    <option>Nov</option>
                                                    <option>Dec</option>
                                                </select>


                                            </div>
                                            <div class="col-6 billing-box">
                                                <TextField className="pb-3 bg-white" type="text" defaultValue={prevdata.description} onChange={(e) => setYearlydescription(e.target.value)} label="Description" variant="filled" />
                                            </div>
                                        </div>
                                        <div class="row ">
                                            <div class="col-6 billing-box">
                                                <TextField className="pb-3 bg-white" type="number" defaultValue={prevdata.charges} onChange={(e) => setYearlycharges(e.target.value)} label="Charges" variant="filled" />
                                            </div>
                                        </div>



                                    </Modal.Body>
                                    <Modal.Footer>
                                        <button class="btn btn-secondary" onClick={handleClose1}>
                                            Close
                                            </button>
                                        <button onClick={sendUpdatedYearly} className="btn btn-primary">Update</button>
                                    </Modal.Footer>
                                </Modal>
                                <Modal show={show2} onHide={handleClose2}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Add Monthly Charges</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <div class="row billing-main">
                                            <div class="col-6 billing-box">
                                                <TextField className="pb-3 bg-white" type="text" onChange={(e) => setMonthlydescription(e.target.value)} label="Description" variant="filled" />
                                            </div>
                                            <div class="col-6 billing-box">
                                                <TextField className="pb-3 bg-white" type="number" onChange={(e) => setMonthlycharges(e.target.value)} label="Charges" variant="filled" />
                                            </div>
                                        </div>


                                    </Modal.Body>
                                    <Modal.Footer>
                                        <button class="btn btn-secondary" onClick={handleClose2}>
                                            Close
                                            </button>
                                        <button onClick={sendMonthly} className="btn btn-primary">Add</button>
                                    </Modal.Footer>
                                </Modal>
                                <Modal show={show3} onHide={handleClose3}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Add Yearly Charges</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <div class="row billing-main">
                                            <div class="col-6 billing-box">
                                                <select class="inline select-update" id="select-class" name="month" onChange={(e) => setYearlymonth(e.target.value)}>
                                                    <option selected disabled="disabled" value="" >Month</option>
                                                    <option>Jan</option>
                                                    <option>Feb</option>
                                                    <option>Mar</option>
                                                    <option>Apr</option>
                                                    <option>May</option>
                                                    <option>Jun</option>
                                                    <option>Jul</option>
                                                    <option>Aug</option>
                                                    <option>Sep</option>
                                                    <option>Oct</option>
                                                    <option>Nov</option>
                                                    <option>Dec</option>
                                                </select>


                                            </div>
                                            <div class="col-6 billing-box">
                                                <TextField className="pb-3 bg-white" type="text" onChange={(e) => setYearlydescription(e.target.value)} label="Description" variant="filled" />
                                            </div>
                                        </div>
                                        <div class="row ">
                                            <div class="col-6 billing-box">
                                                <TextField className="pb-3 bg-white" type="number" onChange={(e) => setYearlycharges(e.target.value)} label="Charges" variant="filled" />
                                            </div>
                                        </div>


                                    </Modal.Body>
                                    <Modal.Footer>
                                        <button class="btn btn-secondary" onClick={handleClose3}>
                                            Close
                                            </button>
                                        <button onClick={sendYearly} className="btn btn-primary">Add</button>
                                    </Modal.Footer>
                                </Modal>
                                <Modal show={show4} onHide={remove1}>
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
                                        <button class="btn btn-secondary" onClick={remove1}>
                                            Close
                                            </button>
                                        <button onClick={deleteCharges} className="btn btn-primary">Yes</button>
                                    </Modal.Footer>
                                </Modal>
                                <Modal show={show5} onHide={remove2}>
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
                                        <button class="btn btn-secondary" onClick={remove2}>
                                            Close
                                            </button>
                                        <button onClick={deleteYearlyCharges} className="btn btn-primary">Yes</button>
                                    </Modal.Footer>
                                </Modal>
                            </div>


                            <div class="table-responsive">
                                <div class="text-right">
                                    <h3 class="text-center">Monthly Charges</h3>
                                    <button type="button" onClick={handleShow2} class="btn btn-primary  text-right"><AddIcon />Add Monthly</button>
                                </div>
                                <table class="table no-wrap">
                                    <thead>
                                        <tr>
                                            <th class="border-top-0">#</th>
                                            <th class="border-top-0">Description</th>
                                            <th class="border-top-0">Charges</th>
                                            <th class="border-top-0">Created At</th>
                                            <th class="border-top-0">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {monthly.map((val, i) => {
                                            return (
                                                <>
                                                    <tr key={i}>
                                                        <td>{i + 1}</td>
                                                        <td class="txt-oflo print-capitalize">{val.description}</td>
                                                        <td>{val.charges}</td>
                                                        <td>{val.created_at.slice(0, 10)}</td>
                                                        <td>
                                                            <ButtonGroup disableElevation variant="contained" color="primary">
                                                                <Button className="student-btn-up" onClick={() => updateMonthly(val.id)}  ><UpdateIcon className="text-white" /></Button>
                                                                <Button className="student-btn-del" onClick={() => handleClick1(val.id)} ><DeleteIcon className="text-white" /></Button>
                                                            </ButtonGroup>
                                                        </td>
                                                    </tr>
                                                </>
                                            )
                                        })}

                                    </tbody>
                                </table>
                                <div class="text-right">
                                    <h3 class="text-center">Yearly Charges</h3>
                                    <button type="button" onClick={handleShow3} class="btn btn-primary  text-right"><AddIcon />Add Yearly</button>
                                </div>
                                <table class="table no-wrap">
                                    <thead>
                                        <tr>
                                            <th class="border-top-0">#</th>
                                            <th class="border-top-0">Month</th>
                                            <th class="border-top-0">Description</th>
                                            <th class="border-top-0">Charges</th>
                                            <th class="border-top-0">Created At</th>
                                            <th class="border-top-0">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {yearly.map((val, i) => {
                                            return (
                                                <>
                                                    <tr key={i}>
                                                        <td>{i + 1}</td>
                                                        <td>{val.month}</td>
                                                        <td class="txt-oflo print-capitalize">{val.description}</td>
                                                        <td>{val.charges}</td>
                                                        <td>{val.created_at.slice(0, 10)}</td>
                                                        <td>
                                                            <ButtonGroup disableElevation variant="contained" color="primary">
                                                                <Button className="student-btn-up" onClick={() => updateYearly(val.id)}  ><UpdateIcon className="text-white" /></Button>
                                                                <Button className="student-btn-del" onClick={() => handleClick2(val.id)} ><DeleteIcon className="text-white" /></Button>
                                                            </ButtonGroup>
                                                        </td>
                                                    </tr>
                                                </>
                                            )
                                        })}
                                    </tbody>
                                </table>
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
        </>
    );
};
export default EmployeeBreakDown;











