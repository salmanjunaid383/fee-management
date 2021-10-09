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
import Snackbar from '@material-ui/core/Snackbar';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
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
    navigation: {
        marginTop: theme.spacing(2)
    },
}));
const CustomFeeVoucher = () => {
    const classes = useStyles();
    const [studentdata, setStudentdata] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [amount, setAmount] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [validDate, setValidDate] = useState('');
    const [gender, setGender] = useState("")
    const [description, setValidDescription] = useState('');
    const [sectiondata, setSectiondata] = useState([]);
    const [classdata, setClassdata] = useState([]);
    const [classid, setClassid] = useState('');
    const [sectionid, setSectionid] = useState('');
    const history = useHistory();
    const [searchTerm, setSearchTerm] = useState('');
    const school_id = localStorage.getItem("school_id")
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
    const [start, setStartingdate] = useState("")
    useEffect(() => {
        axios.get(`http://fee-management-api.nastechltd.co/api/student/${school_id}`)
            .then(response => {
                console.log(response);
                setStudentdata(response.data);
            })
            .catch((error) => {
                if (error.response) {
                    setMessageinfo(error.response.data.message);
                    handleMessage();
                }
            })
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


           

            
            var a = new Date();
            var year = a.getFullYear();
            var month = ("0" + (a.getMonth() + 1)).slice(-2);
            var date = ("0" + a.getDate()).slice(-2);
            setStartingdate(`${year}-${month}-${date}`)
            console.log( `${year}-${month}-${date}`)
   

    }, [])
    // console.log(sectionid)


    const sendNew = (id) => {
        handleShow();
        localStorage.setItem("user_id", id)
    }
    const remove = () => {
        localStorage.removeItem("user_id");
        handleClose();
    }
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul",
        "Aug", "Sep", "Oct", "Nov", "Dec"];
    var StartDate = new Date(dueDate);
    var startdate = StartDate.getDate()
    var startmonth = months[StartDate.getMonth()];
    var startyear = StartDate.getFullYear().toString().substr(-2);

    var StartValidDate = new Date(validDate);
    var startvaliddate = StartValidDate.getDate()
    var startvalidmonth = months[StartValidDate.getMonth()];
    var startvalidyear = StartValidDate.getFullYear().toString().substr(-2);

    const generate = () => {
        if (amount === '') {
            setMessageinfo("Enter Amount")
            handleMessage();
        }
        else if (amount < 0) {
            setMessageinfo("Amount can't ne Negative")
            handleMessage();
        }
        else if (dueDate === '') {
            setMessageinfo("Enter Due Date")
            handleMessage();
        }
        else if (validDate === '') {
            setMessageinfo("Enter Valid Date")
            handleMessage();
        }
        else {
            console.log(validDate)
            axios.post(`http://fee-management-api.nastechltd.co/api/custom_voucher`, {
                student_id: localStorage.getItem("user_id"),
                total_amount: amount,
                due_date: `${startdate}-${startmonth}-${startyear}`,
                valid_date: `${startvaliddate}-${startvalidmonth}-${startvalidyear}`,
                description:description,
                type:gender
            })
                .then(response => {
                    console.log(response.data);
                    setAmount('');
                    setDueDate('');
                    setValidDate('');
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
                                <img
                                    alt="Logo" src={"http://fee-management-api.nastechltd.co/api/school_profile/"+localStorage.getItem("school_id")} />
                            </div>

                            <Link to="/campusdashboard" class="nav-link ">
                <div class="folder-icons ">
                  <div class="icon1">
                    <i class="fas  fa-columns"></i>
                  </div>
                  <div class="icon-name1 ">Dashboard</div>
                </div>
              </Link>
              <Link to="/admissioncomponents" class="nav-link ">
                <div class="folder-icons ">
                  <div class="icon1">
                    <i class="fas fa-school"></i>
                  </div>
                  <div class="icon-name1">Admission</div>
                </div>
              </Link>

              <Link class="nav-link" to="/class">
                <div class="folder-icons">
                  <div class="icon1">
                    <i class="fas fa-users-class"></i>
                  </div>
                  <div class="icon-name">Class</div>
                </div>
              </Link>

              <Link class="nav-link" to="/students">
                <div class="folder-icons">
                  <div class="icon1">
                    <i class="fas fa-user-graduate active"></i>
                  </div>
                  <div class="icon-name active">Students</div>
                </div>
              </Link>
              <Link class="nav-link" to="/finance">
                <div class="folder-icons">
                  <div class="icon1">
                    <i class="fas fa-user-tie"></i>
                  </div>
                  <div class="icon-name">Finance Employee</div>
                </div>
              </Link>
              <Link class="nav-link" to="/feecomponents">
                <div class="folder-icons">
                  <div class="icon1">
                    <i class="fas fa-money-check-alt"></i>
                  </div>
                  <div class="icon-name">Fee</div>
                </div>
              </Link>
              <Link class="nav-link" to="/feevoucheradmin">
                <div class="folder-icons">
                  <div class="icon1">
                    <i class="fas fa-print"></i>
                  </div>
                  <div class="icon-name">Fee Voucher</div>
                </div>
              </Link>
              <Link class="nav-link" to="/adminledger">
                <div class="folder-icons">
                  <div class="icon1">
                    <i class="fas fa-calculator-alt"></i>
                  </div>
                  <div class="icon-name">Student Ledger</div>
                </div>
              </Link>
              <Link class="nav-link" to="/term">
                <div class="folder-icons">
                  <div class="icon1">
                    <i class="fas fa-calendar-alt"></i>
                  </div>
                  <div class="icon-name">Term</div>
                </div>
              </Link>
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
                        <div className={`${classes.navigation}`}>
                            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                                <Link className="text-decoration-none" color="inherit" to="/feecomponents">
                                    Fee
                                </Link>
                                <Typography color="textPrimary">Custom Fee Voucher</Typography>
                            </Breadcrumbs>
                        </div>
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
                                        <div class="col-8 billing-box">
                                            <TextField className="pb-3 bg-white" type="date" onChange={(e) => setDueDate(e.target.value)} label="Due Date" defaultValue={start} variant="filled" />
                                        </div>
                                        <div class="col-8 billing-box">
                                            <TextField className="pb-3 bg-white" type="date" onChange={(e) => setValidDate(e.target.value)} label="Valid Date" defaultValue="2021-01-01" variant="filled" />
                                        </div>

                                        <div class="col-8 billing-box">
                                            <TextField className="pb-3 bg-white" type="text" onChange={(e) => setValidDescription(e.target.value)} label="Description" variant="filled" />
                                        </div>

                                        <div class="col-8 billing-box">
                                        <label>Voucher Type:</label>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="voucher"
                          
                          value="Custom"
                          onChange={(e) => setGender(e.target.value)}
                        />
                        <label
                          className="form-check-label"
                          for="male"
                          style={{ marginRight: "10px" }}
                        >
                          Custom
                        </label>
                        <input
                          className="form-check-input"
                          type="radio"
                          name="voucher"
                          
                          value="Cashable"
                          onChange={(e) => setGender(e.target.value)}
                       
                        />
                        <label className="form-check-label" for="female">
                          Cashable
                        </label>
                      </div>
                    </div>
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
                                    {/* <FormControl className={classes.formControl}>
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
                                    <button onClick={search} className="btn btn-primary mt-3 ml-1">Search</button> */}
                                    {/* <FormControl className={classes.formControl}>
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
                                    </FormControl> */}

                                </div>
                            </div>
                            <div class="table-responsive">
                                <table class="table no-wrap">
                                    <thead>
                                        <tr>
                                            <th class="border-top-0">G.R No</th>
                                            <th class="border-top-0">Name</th>
                                            <th class="border-top-0">Gender</th>
                                            <th class="border-top-0">Generate</th>
                                            {/* <th class="border-top-0">Details</th> */}
                                            {/* <th class="border-top-0">Action</th> */}
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
                                                    {val.middle_name === null ?
                                                        <td class="txt-oflo print-capitalize">{`${val.first_name} ${val.last_name}`}</td>
                                                        :
                                                        <td class="txt-oflo print-capitalize">{`${val.first_name} ${val.middle_name} ${val.last_name}`}</td>
                                                    }                                                    <td className="print-capitalize">{val.gender}</td>
                                                    <td><Button onClick={() => sendNew(val.id)}><AddIcon /></Button></td>
                                                    {/* <td>
                                                        {val.paid == 1 ?
                                                            <span class="text-primary text-bolder">Paid</span>
                                                            :
                                                            <ButtonGroup disableElevation variant="contained" color="primary">
                                                                <Button className="expense-btn-p " onClick={() => sendpay(val.voucher_no)}><span class="text-white text-bolder mb-1">Pay</span></Button>
                                                            </ButtonGroup>}
                                                    </td> */}
                                                    {/* <td><Button onClick={() => history.push(`/student1/${val.id}`)}><DescriptionIcon /></Button></td> */}


                                                    {/* <td><Button onClick={() => history.push(`/feevoucher/${val.id}`)}><PrintIcon /></Button></td> */}


                                                </tr>
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
export default CustomFeeVoucher;


