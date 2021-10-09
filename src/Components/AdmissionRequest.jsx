import React, { useState, useEffect } from 'react';
import './dashboard.css';
import { Link, useHistory } from 'react-router-dom';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import DescriptionIcon from '@material-ui/icons/Description';
import logo from './jb1.png'
import { Modal } from 'react-bootstrap';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
// import UpdateIcon from '@material-ui/icons/Update';
// import AddIcon from '@material-ui/icons/Add';
// import DeleteIcon from '@material-ui/icons/Delete';
// import FormLabel from '@material-ui/core/FormLabel';



import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '30ch'

        },
    },
    formControl: {
        marginTop: theme.spacing(1),
        width: '218px',
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    navigation: {
        marginTop: theme.spacing(2),
    },
}));


const AdmissionRequest = () => {
    const [messageinfo, setMessageinfo] = useState('');
    const [notify, setNotify] = useState('Add Student')
    const [message, setMessage] = useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    });
    const { vertical, horizontal, open } = message;
    const handleMessage = () => {
        setMessage({ open: true, vertical: 'top', horizontal: 'center' });
    };

    const CloseMessage = () => {
        setMessage({ ...message, open: false });
    };
    const classes = useStyles();
    const [show, setShow] = useState(false);
    // const [show1, setShow1] = useState(false);
    // const handleClose1 = () => setShow1(false);
    // const handleShow1 = () => setShow1(true);
    // const [password, setPassword] = useState();
    // const [email, setEmail] = useState();
    // const [confirmpassword, setConfirmpassword] = useState();
    // const [contact, setContact] = useState();
    // const [address, setAddress] = useState();
    // const [gender, setGender] = useState();
    // const [userdata, setUserdata] = useState([]);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [studentdata, setStudentdata] = useState([]);
    const [sectiondata, setSectiondata] = useState([]);
    const [sectionid, setSectionid] = useState('');
    const [form_no, setForm_no] = useState();
    const [dueDate, setDueDate] = useState('');
    const [validDate, setValidDate] = useState('');
    const [GR_no, setGR_no] = useState('');
    const history = useHistory();
    const school_id = localStorage.getItem("school_id")

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

    // var mydata = [];
    // if ((studentdata.length > 0) && (userdata.length > 0)) {
    //     for (var i = 0; i < studentdata.length; i++) {
    //         for (var j = 0; j < userdata.length; j++) {
    //             var dd = {
    //                 contact: `${studentdata[i].contact}`,
    //                 address: `${studentdata[i].address}`,
    //                 gender: `${studentdata[i].gender}`,
    //                 id: `${studentdata[i].id}`,
    //                 name: "",
    //                 email: ""
    //             };
    //             if (studentdata[i].user_id === userdata[j].id) {
    //                 dd.name = `${userdata[j].first_name} ${userdata[j].last_name}`;
    //                 dd.email = `${userdata[j].email}`
    //             }
    //         }
    //         mydata.push(dd)
    //     }
    // }


    useEffect(() => {
        axios.get(`http://fee-management-api.nastechltd.co/api/show_form/${school_id}`)
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

    }, [])








    const reload = () => {
        axios.get(`http://fee-management-api.nastechltd.co/api/show_form/${school_id}`)
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



    // const deleteData = (id) => {
    //     axios.delete(`http://fee-management-api.nastechltd.co/api/user/${id}`)
    //         .then(response => {
    //             reload();
    //         })
    //         .catch((error) => {
    //             if (error.response) {
    //                 alert(error.response.data.message);
    //             }
    //         })
    // }

    const data = {
        school_id: school_id,
        form_no: form_no,
        G_R_NO: GR_no.toUpperCase(),
        section_id: sectionid,
        due_date: `${startdate}-${startmonth}-${startyear}`,
        valid_date: `${startvaliddate}-${startvalidmonth}-${startvalidyear}`
    };
    // console.log(contact)
    const sendData = () => {
        if (GR_no === '') {
            setMessageinfo("Enter GR NO.")
            handleMessage();
        }
        else if (sectionid === '') {
            setMessageinfo("Select Class/Section")
            handleMessage();
        }
        else if (dueDate === '') {
            setMessageinfo("Select Due Date")
            handleMessage();
        }
        else if (validDate === '') {
            setMessageinfo("Select Valid Date")
            handleMessage();
        }
        else {
            setNotify('Please wait...')
            axios.post('http://fee-management-api.nastechltd.co/api/student', data)
                .then(response => {
                    reload();
                    setDueDate('');
                    setSectionid('');
                    setGR_no('');
                    localStorage.removeItem("registration_no")
                    setMessageinfo("Student Successfully Added");
                    setNotify('Add Student')
                    handleMessage();
                    handleClose();

                })
                .catch((error) => {
                    setNotify('Add Student');
                    if (error.response) {
                        setMessageinfo(error.response.data.message);
                        handleMessage();
                    }
                })
        }
        // console.log(data)
    }
    const add = (id) => {
        axios.get(`http://fee-management-api.nastechltd.co/api/admission_form/${id}`)
            .then(response => {
                console.log(response.data)
                localStorage.setItem("registration_no", response.data.AdmissionForm.registration_no);
                setForm_no(response.data.AdmissionForm.registration_no);
                axios.get(`http://fee-management-api.nastechltd.co/api/section/${response.data.AdmissionForm.class_id}`)
                    .then(response => {
                        console.log(response.data)
                        setSectiondata(response.data)
                    })
                    .catch((error) => {
                        if (error.response) {
                            setMessageinfo(error.response.data.message);
                            handleMessage();
                        }
                    })
                handleShow();

            })
            .catch((error) => {
                if (error.response) {
                    setMessageinfo(error.response.data.message);
                    handleMessage();
                }
            })
    }
    // console.log(fname)
    // const sendUpdated = () => {
    //     axios.put(`http://fee-management-api.nastechltd.co/api/user/${localStorage.getItem("id")}`, {

    //     })
    //         .then(response => {
    //             console.log(response);
    //             localStorage.removeItem("id")
    //             localStorage.removeItem("fname")
    //             localStorage.removeItem("lname")
    //             localStorage.removeItem("email")
    //             localStorage.removeItem("contact")
    //             localStorage.removeItem("address")
    //             localStorage.removeItem("gender")
    //             reload();
    //             handleClose1();

    //         })
    //         .catch(error => console.log(error))
    // }
    var count = 0;
    const logOut = () => {
        localStorage.clear();
        history.push("/")
    }

    // console.log(classid)
    // console.log(classname)

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
                    <i class="fas  fa-columns active"></i>
                  </div>
                  <div class="icon-name1 active ">Dashboard</div>
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
                    <i class="fas fa-users-class "></i>
                  </div>
                  <div class="icon-name ">Class</div>
                </div>
              </Link>

              <Link class="nav-link" to="/students">
                <div class="folder-icons">
                  <div class="icon1">
                    <i class="fas fa-user-graduate"></i>
                  </div>
                  <div class="icon-name">Students</div>
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
                                    Pending Admissions
                                </div>
                                <button onClick={logOut} class="btn text-bolder text-right">Log Out</button>

                            </div>
                        </div>
                        <hr class="new-hr" />
                    </div>
                    <div class="right-body">
                        <div className={`${classes.navigation}`}>
                            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                                <Link color="inherit" to="/admissioncomponents">
                                    Admissions
                                </Link>
                                <Typography color="textPrimary">Admission Requests</Typography>
                            </Breadcrumbs>
                        </div>
                        <div class="message">
                            <div class="add-student">
                                {/* <button type="button" onClick={handleShow} class="btn btn-primary btn-lg"><AddIcon /> Add Student</button> */}
                                <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Confirm Admission</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <div class="row billing-main">
                                            <div class="col-6 billing-box">
                                                <TextField className="pb-3 bg-white" type="number" defaultValue={localStorage.getItem("registration_no")} onChange={(e) => setForm_no(e.target.value)} label="Registeration No." disabled variant="filled" />
                                                <FormControl className={classes.formControl}>
                                                    <InputLabel id="demo-simple-select-label">Class</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        variant="filled"
                                                        onChange={(e) => setSectionid(e.target.value)}
                                                    >
                                                        {sectiondata.map((val, i) => {
                                                            return (

                                                                <MenuItem value={val.id}>{`${val.class_name} ${val.name}`}</MenuItem>

                                                            )

                                                        })}
                                                    </Select>
                                                </FormControl>
                                                <TextField className="pb-3 mt-2" type="date" onChange={(e) => setValidDate(e.target.value)} label="Valid Date" defaultValue="2021-01-01" helperText="Valid Date for Admission Voucher" variant="filled" />


                                            </div>

                                            <div class="col-6 billing-box">
                                                <TextField className="pb-3" type="text" onChange={(e) => setGR_no(e.target.value)} label="GR Number" variant="filled" />
                                                <TextField className="pb-3 mt-2" type="date" onChange={(e) => setDueDate(e.target.value)} label="Due Date" defaultValue="2021-01-01" helperText="Due Date for Admission Voucher" variant="filled" />
                                            </div>

                                        </div>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <button class="btn btn-secondary" onClick={handleClose}>
                                            Close
                                            </button>
                                        <button onClick={sendData} className="btn btn-primary">{notify}</button>
                                    </Modal.Footer>
                                </Modal>

                            </div>
                            <div class="table-responsive">
                                <table class="table no-wrap">
                                    <thead>
                                        <tr>
                                            <th class="border-top-0">#</th>
                                            <th class="border-top-0">Registeration NO.</th>
                                            <th class="border-top-0">Name</th>
                                            <th class="border-top-0">Gender</th>
                                            <th class="border-top-0">Details</th>
                                            <th class="border-top-0">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {studentdata.map((val, i) => {
                                            return (
                                                <>
                                                    {val.G_R_NO == null ?
                                                        <>
                                                            <tr key={i}>
                                                                <td>{count = 1 + count}</td>
                                                                <td>{val.registration_no}</td>
                                                                {val.middle_name === null ?
                                                                    <td class="txt-oflo print-capitalize">{`${val.first_name} ${val.last_name}`}</td>
                                                                    :
                                                                    <td class="txt-oflo print-capitalize">{`${val.first_name} ${val.middle_name} ${val.last_name}`}</td>
                                                                }
                                                                <td className="print-capitalize">{val.gender}</td>
                                                                <td><Button onClick={() => history.push(`/printform/${val.registration_no}`)}><DescriptionIcon /></Button></td>
                                                                <td>
                                                                    <ButtonGroup disableElevation variant="contained" color="primary">
                                                                        <Button className="student-btn-up" onClick={() => add(val.registration_no)}><ThumbUpIcon className="text-white" /></Button>
                                                                        {/* <Button className="student-btn-del" onClick={() => deleteData(val.id)} ><DeleteIcon className="text-white" /></Button> */}
                                                                    </ButtonGroup>
                                                                </td>
                                                            </tr>
                                                        </>
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
        </>
    );
};
export default AdmissionRequest;


