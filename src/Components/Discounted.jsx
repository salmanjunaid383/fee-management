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
    const school_id = localStorage.getItem("school_id");
    const history = useHistory();
    useEffect(() => {
        axios.get(`http://fee-management-api.nastechltd.co/api/student/${school_id}`)
            .then(response => {
                console.log(response);
                setStudentdata(response.data);
            })
            .catch(error => (console.log(error)))

    }, [])
    useEffect(() => {
        axios.get(`http://fee-management-api.nastechltd.co/api/discount`)
            .then(response => {
                console.log(response);
                setDiscounteddata(response.data);
            })
            .catch(error => (console.log(error)))

    }, [])

    const reload = () => {
        axios.get(`http://fee-management-api.nastechltd.co/api/discount`)
        .then(response => {
            console.log(response);
            setDiscounteddata(response.data);
        })
        .catch(error => (console.log(error)))
    }

    


    const data = {
        student_id: studentid,
        discount: discount

    }

    const sendData = () => {
        axios.post(`http://fee-management-api.nastechltd.co/api/discount`, data)
            .then(response => {
                console.log(response);
                reload();
                handleClose();
            })
            .catch(error => console.log(error))
    }

    const update = (id) => {
        axios.get(`http://fee-management-api.nastechltd.co/api/discount/${id}`)
        .then(response => {
            console.log(response.data.Discount);
            localStorage.setItem("id",response.data.Discount.id)
            localStorage.setItem("student_id",response.data.Discount.student_id)
            localStorage.setItem("discount",response.data.Discount.discount)
            // setDiscounteddata(response.data);
        })
        .catch(error => (console.log(error)))
    }

    const sendUpdated = () => {
        axios.put(`http://fee-management-api.nastechltd.co/api/discount/${localStorage.getItem("id")}`,{
            student_id : localStorage.getItem("student_id"),
            discount : discount

        })
    }
    const deleteDiscount = (id) => {
        axios.delete(`http://fee-management-api.nastechltd.co/api/discount/${id}`)
        .then(response => {
            console.log(response);
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

                            <Link to="/dashboard" class="nav-link active"><div class="folder-icons ">
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
                                    <i class="fas fa-wallet"></i>
                                </div>
                                <div class="icon-name">Fee Structure</div>
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
                                                                <MenuItem value={val.id}>{`${val.first_name} ${val.last_name}`}</MenuItem>
                                                            )

                                                        })}
                                                    </Select>
                                                </FormControl>
                                                {/* <Select1 className="pb-3 searchSelect"  onChange={(e)=>setStudentid(e.target.value)} placeholder="Select Student" options={options} /> */}
                                                <TextField type="number" helperText="Discount Amount" onChange={(e) => setDiscount(e.target.value)} label="Discount" variant="filled" />


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
                                        <Modal.Title className="text-center">Update Expense</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <div class="row billing-main">
                                            <div className="col-8">
                                            <TextField type="number" helperText="Discount Amount" onChange={(e) => setDiscount(e.target.value)} label="Discount" variant="filled" />

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
                                                                <Button className="student-btn-del" onClick={()=>deleteDiscount(val.id)} ><DeleteIcon className="text-white"/></Button>
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