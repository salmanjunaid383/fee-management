import { React, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import logo from './jb1.png'
import LaunchIcon from '@material-ui/icons/Launch';
import './dashboard.css';
import UpdateIcon from '@material-ui/icons/Update';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { Modal } from 'react-bootstrap';
import TextField from '@material-ui/core/TextField';

const BreakDown = () => {

    const [monthly, setMonthly] = useState([]);
    const [section, setSection] = useState();
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
    const history = useHistory();
    const fee_structure_id = localStorage.getItem("fee_structure_id")

    useEffect(() => {
        axios.get(`http://fee-management-api.nastechltd.co/api/show_charges/${fee_structure_id}`)
            .then(response => {
                console.log(response.data)
                setMonthly(response.data.monthly_charges)
                setYearly(response.data.yearly_charges)
            })
            .catch((error) => {
                if (error.response) {
                    alert(error.response.data.message);
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
                localStorage.setItem("id", response.data.id);
                localStorage.setItem("description", response.data.description);
                localStorage.setItem("charges", response.data.charges);
                setMonthlydescription(response.data.description)
                setMonthlycharges(response.data.charges)
                handleShow();
                // setSection(response.data.name)
                // handleShow1();
            })
            .catch((error) => {
                if (error.response) {
                    alert(error.response.data.message);
                }
            })
    }
    const updateYearly = (id) => {
        axios.get(`http://fee-management-api.nastechltd.co/api/yearly_charges/${id}`)
            .then(response => {
                console.log(response.data)
                localStorage.setItem("id", response.data.id);
                localStorage.setItem("description", response.data.description);
                localStorage.setItem("charges", response.data.charges);
                localStorage.setItem("month", response.data.month);
                setYearlymonth(response.data.month);
                setYearlydescription(response.data.description);
                setYearlycharges(response.data.charges);
                handleShow1();
                // setSection(response.data.name)
                // handleShow1();
            })
            .catch((error) => {
                if (error.response) {
                    alert(error.response.data.message);
                }
            })
    }
    const sendUpdatedYearly = () => {
        axios.put(`http://fee-management-api.nastechltd.co/api/yearly_charges/${localStorage.getItem("id")}`, {
            description: yearlydescription,
            charges: yearlycharges,
            month: yearlymonth,
            fee_structure_id: fee_structure_id

        })
            .then(response => {
                console.log(response);
                localStorage.removeItem("id")
                localStorage.removeItem("description")
                localStorage.removeItem("charges")
                localStorage.removeItem("month")
                reload();
                handleClose1();
            })
            .catch((error) => {
                if (error.response) {
                    alert(error.response.data.message);
                }
            })
    }
    const sendUpdatedMonthly = () => {
        axios.put(`http://fee-management-api.nastechltd.co/api/monthly_charges/${localStorage.getItem("id")}`, {
            description: monthlydescription,
            charges: monthlycharges,
            fee_structure_id: fee_structure_id

        })
            .then(response => {
                console.log(response);
                localStorage.removeItem("id")
                localStorage.removeItem("description")
                localStorage.removeItem("charges")
                reload();
                handleClose();
            })
            .catch((error) => {
                if (error.response) {
                    alert(error.response.data.message);
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
                    alert(error.response.data.message);
                }
            })
    }

    const sendYearly = () => {
        axios.post(`http://fee-management-api.nastechltd.co/api/yearly_charges`, {
            description: yearlydescription,
            charges: yearlycharges,
            month : yearlymonth,
            fee_structure_id: fee_structure_id

        })
            .then(response => {
                console.log(response);
                reload();
                handleClose3();

            })
            .catch((error) => {
                if (error.response) {
                    alert(error.response.data.message);
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
                    alert(error.response.data.message);
                }
            })


    }
    const deleteCharges = (id) => {
        axios.delete(`http://fee-management-api.nastechltd.co/api/monthly_charges/${id}`)
            .then(response => {
                console.log(response)
                reload();
            })
            .catch((error) => {
                if (error.response) {
                    alert(error.response.data.message);
                }
            })

    }

    const deleteYearlyCharges = (id) => {
        axios.delete(`http://fee-management-api.nastechltd.co/api/yearly_charges/${id}`)
            .then(response => {
                console.log(response)
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
                                <img src={logo} />
                            </div>
                            <Link to="/campusdashboard" class="nav-link "><div class="folder-icons ">
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
                                    <i class="fas fa-wallet"></i>
                                </div>
                                <div class="icon-name">Finance Employee</div>
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
                                    <i class="fas fa-wallet active"></i>
                                </div>
                                <div class="icon-name active">Fee Structure</div>
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
                                <div class="big-inbox">Fee Structure</div>
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
                                        <Modal.Title>Update Monthly Charges</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <div class="row billing-main">
                                            <div class="col-6 billing-box">
                                                <TextField className="pb-3 bg-white" type="text" defaultValue={localStorage.getItem("description")} onChange={(e) => setMonthlydescription(e.target.value)} label="Description" variant="filled" />
                                            </div>
                                            <div class="col-6 billing-box">
                                                <TextField className="pb-3 bg-white" type="number" defaultValue={localStorage.getItem("charges")} onChange={(e) => setMonthlycharges(e.target.value)} label="Charges" variant="filled" />
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
                                                    <option selected disabled="disabled" value="" >{localStorage.getItem("month")}</option>
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
                                                <TextField className="pb-3 bg-white" type="text" defaultValue={localStorage.getItem("description")} onChange={(e) => setYearlydescription(e.target.value)} label="Description" variant="filled" />
                                            </div>
                                        </div>
                                        <div class="row ">
                                            <div class="col-6 billing-box">
                                                <TextField className="pb-3 bg-white" type="number" defaultValue={localStorage.getItem("charges")} onChange={(e) => setYearlycharges(e.target.value)} label="Charges" variant="filled" />
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
                                                        <td class="txt-oflo">{val.description}</td>
                                                        <td>{val.charges}</td>
                                                        <td>{val.created_at.slice(0, 10)}</td>
                                                        <td>
                                                            <ButtonGroup disableElevation variant="contained" color="primary">
                                                                <Button className="student-btn-up" onClick={() => updateMonthly(val.id)}  ><UpdateIcon className="text-white" /></Button>
                                                                <Button className="student-btn-del" onClick={() => deleteCharges(val.id)} ><DeleteIcon className="text-white" /></Button>
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
                                                        <td class="txt-oflo">{val.description}</td>
                                                        <td>{val.charges}</td>
                                                        <td>{val.created_at.slice(0, 10)}</td>
                                                        <td>
                                                            <ButtonGroup disableElevation variant="contained" color="primary">
                                                                <Button className="student-btn-up" onClick={() => updateYearly(val.id)}  ><UpdateIcon className="text-white" /></Button>
                                                                <Button className="student-btn-del" onClick={() => deleteYearlyCharges(val.id)} ><DeleteIcon className="text-white" /></Button>
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
                </div>
            </div>
        </>
    );
};
export default BreakDown;











