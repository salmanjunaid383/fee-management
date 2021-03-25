import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import logo from './jb1.png'
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import UpdateIcon from '@material-ui/icons/Update';
import LaunchIcon from '@material-ui/icons/Launch';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { Modal } from 'react-bootstrap';
import FormLabel from '@material-ui/core/FormLabel';



// const useStyles = makeStyles((theme) => ({
//     root: {
//       '& > *': {
//         margin: theme.spacing(1),
//         width: '30ch',
//       },
//     },
//   }));
const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '30ch'

        },
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const Discounted = () => {
    const classes = useStyles();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [show1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);
    const [studentdata, setStudentdata] = useState([]);
    const [discounteddata, setDiscounteddata] = useState([]);
    const [studentid, setStudentid] = useState();
    const [discount, setDiscount] = useState();
    const [prevdata, setPrevdata] = useState('');
    const school_id = localStorage.getItem("school_id");
    const history = useHistory();
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
        axios.get(`http://fee-management-api.nastechltd.co/api/student/${school_id}`)
            .then(response => {
                console.log(response);
                setStudentdata(response.data);
            })
            .catch(error => (console.log(error)))

    }, [])
    useEffect(() => {
        axios.get(`http://fee-management-api.nastechltd.co/api/show_discount/${school_id}`)
            .then(response => {
                console.log(response);
                setDiscounteddata(response.data);
            })
            .catch(error => (console.log(error)))

    }, [])

    const reload = () => {
        axios.get(`http://fee-management-api.nastechltd.co/api/show_discount/${school_id}`)
            .then(response => {
                console.log(response);
                setDiscounteddata(response.data);
            })
            .catch(error => (console.log(error)))
    }




    const data = {
        student_id: studentid,
        discount: discount,
        school_id: school_id

    }

    const sendData = () => {
        axios.post(`http://fee-management-api.nastechltd.co/api/discount`, data)
            .then(response => {
                console.log(response);
                setDiscount();
                reload();
                handleClose();
            })
            .catch(error => {
                console.log(error);
                alert("Enter Valid Field(s)")
            })
    }

    const update = (id) => {
        axios.get(`http://fee-management-api.nastechltd.co/api/discount/${id}`)
            .then(response => {
                console.log(response.data);
                setPrevdata(response.data)
                
                setDiscount(response.data.discount)
                handleShow1();
            })
            .catch(error => (console.log(error)))
    }

    const sendUpdated = () => {
        axios.put(`http://fee-management-api.nastechltd.co/api/discount/${prevdata.id}`, {
            student_id: prevdata.student_id,
            discount: discount
        })
            .then(response => {
                console.log(response);
                setPrevdata('')
                setDiscount();
                reload();
                handleClose1();

            })
            .catch(error => {
                console.log(error);
                alert("Enter Valid Field(s)")
            })
    }
    const deleteDiscount = (id) => {
        axios.delete(`http://fee-management-api.nastechltd.co/api/discount/${localStorage.getItem("user_id")}`)
            .then(response => {
                console.log(response);
                remove();
                reload();
            })
            .catch(error => console.log(error))
    }
    // ect(() => {
    //     axios.get(`http://fee-management-api.nastechltd.co/api/monthly_charges`)
    //         .then(response => {
    //             console.log(response.data)
    //             setChargesdata(response.data)

    //         })
    //         .catch(error => console.log(error))
    // }, [])
    // console.log(studentid)
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

                            <Link to="/campusdashboard" class="nav-link active"><div class="folder-icons ">
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
                                    <i class="fas fa-user-graduate"></i>
                                </div>
                                <div class="icon-name">Pending Admissions</div>
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
                                    <i class="fas fa-wallet active"></i>
                                </div>
                                <div class="icon-name active">Discounted</div>
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
                                    Discount
                        </div>
                                <button onClick={logOut} class="btn text-bolder text-right">Log Out</button>

                            </div>
                        </div>
                        <hr class="new-hr" />
                    </div>
                    <div class="right-body">

                        <div class="message">
                            <div class="add-student">
                                <button type="button" onClick={handleShow} class="btn btn-primary btn-lg"><AddIcon /> Add Discount</button>
                                <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Add Discount</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <div class="row billing-main">
                                            <div class="col-8 billing-box">
                                                <FormControl className={classes.formControl}>
                                                    <InputLabel id="demo-simple-select-label">Student</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        // value={id}
                                                        onChange={(e) => setStudentid(e.target.value)}
                                                    >
                                                        {studentdata.map((val, i) => {
                                                            return (
                                                                <MenuItem value={val.id}>{`${val.first_name} ${val.middle_name} ${val.last_name}`}</MenuItem>
                                                            )

                                                        })}
                                                    </Select>
                                                </FormControl>
                                                {/* <Select1 className="pb-3 searchSelect"  onChange={(e)=>setStudentid(e.target.value)} placeholder="Select Student" options={options} /> */}
                                                <TextField type="number" helperText="Discount Amount (Not In %)" onChange={(e) => setDiscount(e.target.value)} label="Discount" variant="filled" />


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
                                <Modal show={show1} onHide={handleClose1}>
                                    <Modal.Header closeButton>
                                        <Modal.Title className="text-center">Update Discount</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <div class="row billing-main">
                                            <div className="col-8">
                                                <TextField type="number" helperText="Discount Amount" defaultValue={prevdata.discount} onChange={(e) => setDiscount(e.target.value)} label="Discount" variant="filled" />

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
                                        <button onClick={deleteDiscount} className="btn btn-primary">Yes</button>
                                    </Modal.Footer>
                                </Modal>
                            </div>
                            <div class="table-responsive">
                                <table class="table no-wrap">
                                    <thead>
                                        <tr>
                                            <th class="border-top-0">#</th>
                                            <th class="border-top-0">Name</th>
                                            <th class="border-top-0">Amount</th>
                                            <th class="border-top-0">Created At</th>
                                            <th class="border-top-0">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {discounteddata.map((val, i) => {
                                            return (
                                                <>
                                                    <tr key={i}>
                                                        <td>{val.id}</td>
                                                        <td class="txt-oflo">{val.name}</td>

                                                        <td>{val.discount}</td>

                                                        <td>{val.created_at.slice(0, 10)}</td>
                                                        <td>
                                                            <ButtonGroup disableElevation variant="contained" color="primary">
                                                                <Button className="student-btn-up" onClick={() => update(val.id)}  ><UpdateIcon className="text-white" /></Button>
                                                                <Button className="student-btn-del" onClick={() => handleClick(val.id)} ><DeleteIcon className="text-white" /></Button>
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
export default Discounted;