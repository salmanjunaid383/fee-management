import React, { useState, useEffect } from 'react';
import './dashboard.css';
import { Link, useHistory } from 'react-router-dom';
import PrintIcon from '@material-ui/icons/Print';
// import UpdateIcon from '@material-ui/icons/Update';
import AddIcon from '@material-ui/icons/Add';
// import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
// import ButtonGroup from '@material-ui/core/ButtonGroup';
// import DescriptionIcon from '@material-ui/icons/Description';
import logo from './jb1.png'
import { Modal } from 'react-bootstrap';
import TextField from '@material-ui/core/TextField';
// import FormLabel from '@material-ui/core/FormLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';


import axios from 'axios';



import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '30ch'

        },
    },

    formControl: {
        margin: theme.spacing(1),
        width: '20ch',
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));


const CustomFeeVoucher = () => {

    const classes = useStyles();
    const [studentdata, setStudentdata] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [amount,setAmount]=useState();
    const [sectiondata, setSectiondata] = useState([]);
    const [classdata, setClassdata] = useState([]);
    const [classid, setClassid] = useState('');
    const [sectionid, setSectionid] = useState('');
    const history = useHistory();
    const [searchTerm, setSearchTerm] = useState('');
    const school_id = localStorage.getItem("school_id")





    useEffect(() => {
        axios.get(`http://fee-management-api.nastechltd.co/api/student/${school_id}`)
            .then(response => {
                console.log(response);
                setStudentdata(response.data);
            })
            .catch((error) => {
                if (error.response) {
                    alert(error.response.data.message);
                }
            })
        axios.get(`http://fee-management-api.nastechltd.co/api/schools_class/${school_id}`)
            .then(response => {
                console.log(response.data)
                setClassdata(response.data)
            })
            .catch((error) => {
                if (error.response) {
                    alert(error.response.data.message);
                }
            })
    }, [])
    console.log(sectionid)


    const sendNew = (id) => {
        handleShow();
        localStorage.setItem("user_id",id)
    }
    const remove = ()=>{
        localStorage.removeItem("user_id");
        handleClose();
    }
    const generate = ()=>{
        axios.post(`http://fee-management-api.nastechltd.co/api/custom_voucher`, {
            student_id: localStorage.getItem("user_id"),
            total_amount : amount
        })
            .then(response => {
                console.log(response.data);
                remove();
                reload();
            })
            .catch((error) => {
                if (error.response) {
                    alert(error.response.data.message);
                }
            })
    }
    const search = () => {
        axios.get(`http://fee-management-api.nastechltd.co/api/section/${classid}`)
            .then(response => {
                console.log(response.data)
                setSectiondata(response.data)
            })
            .catch(error => console.log(error))
    }
    const reset = () => {
        setClassid('');
        setSearchTerm('');
        setSectionid('');
    }







    const reload = () => {
        
        axios.get(`http://fee-management-api.nastechltd.co/api/student/${school_id}`)
            .then(response => {
                console.log(response);
                setStudentdata(response.data);
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
                                    <i class="fas fa-user-tie"></i>
                                </div>
                                <div class="icon-name">Finance Employee</div>
                            </div></Link>
                            <Link class="nav-link" to="/feecomponents"><div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas fa-money-check-alt active"></i>
                                </div>
                                <div class="icon-name active">Fee</div>
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
                            <Link class="nav-link" to="/expense"><div class="folder-icons">
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
                                    Custom Fee Voucher
                                </div>
                                <button onClick={logOut} class="btn text-bolder text-right">Log Out</button>

                            </div>
                        </div>
                        <hr class="new-hr" />
                    </div>
                    <div class="right-body">

                        <div class="message">
                            <Modal show={show} onHide={remove}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Generate Custom Voucher</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <div className="row billing-main">
                                        <div class="col-8 billing-box">
                                            <TextField className="pb-3 bg-white" type="number" onChange={(e) => setAmount(e.target.value)} label="Total Amount" variant="filled" />

                                        </div>

                                        <div class="col-6 billing-box"></div>
                                    </div>
                                </Modal.Body>
                                <Modal.Footer>
                                    <button class="btn btn-secondary" onClick={remove}>
                                        Close
                                            </button>
                                    <button onClick={generate} className="btn btn-primary">Yes</button>
                                </Modal.Footer>
                            </Modal>
                            <div className="row">
                                <div className="col-6 text-left mt-1">
                                    <TextField className="pb-3 bg-white" value={searchTerm} type="text" helperText="By GR.No or Name" onChange={(e) => setSearchTerm(e.target.value)} label="Search Student" />
                                    <button onClick={reset} className="btn btn-primary mt-3 ml-5">Reset</button>
                                </div>
                                <div className="col-6 text-right">
                                    <FormControl className={classes.formControl}>
                                        <InputLabel id="demo-simple-select-label">Class</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={classid}
                                            onChange={(e) => setClassid(e.target.value)}
                                        >
                                            {classdata.map((val, i) => {
                                                return (
                                                    <MenuItem value={val.id}>{`${val.name}`}</MenuItem>
                                                )

                                            })}
                                        </Select>
                                    </FormControl>
                                    <button onClick={search} className="btn btn-primary mt-3 ml-1">Search</button>
                                    <FormControl className={classes.formControl}>
                                        <InputLabel id="demo-simple-select-label">Section</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={sectionid}
                                            onChange={(e) => setSectionid((e.target.value).toString())}
                                        >
                                            {sectiondata.map((val, i) => {
                                                return (
                                                    <MenuItem value={val.id}>{`${val.name}`}</MenuItem>
                                                )

                                            })}
                                        </Select>
                                    </FormControl>

                                </div>
                            </div>

                            <div class="table-responsive">
                                <table class="table no-wrap">
                                    <thead>
                                        <tr>
                                            <th class="border-top-0">G.R No</th>
                                            <th class="border-top-0">NAME</th>
                                            <th class="border-top-0">GENDER</th>
                                            <th class="border-top-0">Generate</th>
                                            {/* <th class="border-top-0">Details</th> */}
                                            <th class="border-top-0">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {studentdata.filter((val) => {
                                            if (searchTerm == '') {
                                                return val;
                                            }
                                            else if (val.section_id.toString().includes(searchTerm)) {
                                                return val;
                                            }
                                            else if (val.G_R_NO.toLowerCase().includes(searchTerm.toLowerCase())) {
                                                return val;
                                            }
                                            else if (`${val.student_name}`.toLowerCase().includes(searchTerm.toLowerCase())) {
                                                return val;
                                            }
                                        }).filter((val) => {
                                            if (sectionid == '') {
                                                return val;
                                            }
                                            else if (val.section_id.toString().includes(sectionid)) {
                                                return val;
                                            }
                                        }).map((val, i) => {
                                            return (
                                                <tr key={i}>
                                                    <td>{val.G_R_NO}</td>
                                                    <td class="txt-oflo print-capitalize">{`${val.first_name} ${val.middle_name} ${val.last_name} `}</td>
                                                    <td className="print-capitalize">{val.gender}</td>
                                                    <td><Button onClick={()=>sendNew(val.id)}><AddIcon /></Button></td>
                                                    {/* <td>
                                                        {val.paid == 1 ?
                                                            <span class="text-primary text-bolder">Paid</span>
                                                            :
                                                            <ButtonGroup disableElevation variant="contained" color="primary">
                                                                <Button className="expense-btn-p " onClick={() => sendpay(val.voucher_no)}><span class="text-white text-bolder mb-1">Pay</span></Button>
                                                            </ButtonGroup>}
                                                    </td> */}
                                                    {/* <td><Button onClick={() => history.push(`/student1/${val.id}`)}><DescriptionIcon /></Button></td> */}


                                                    <td><Button onClick={() => history.push(`/feevoucher/${val.id}`)}><PrintIcon /></Button></td>


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
export default CustomFeeVoucher;


