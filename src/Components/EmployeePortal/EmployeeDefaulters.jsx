// import LaunchIcon from '@material-ui/icons/Launch';
// import UpdateIcon from '@material-ui/icons/Update';
// import AddIcon from '@material-ui/icons/Add';
// import DeleteIcon from '@material-ui/icons/Delete';
// import ButtonGroup from '@material-ui/core/ButtonGroup';
// import { Modal } from 'react-bootstrap';
// import TextField from '@material-ui/core/TextField';
import { React, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import logo from '../jb1.png'
import PrintIcon from '@material-ui/icons/Print';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import Snackbar from '@material-ui/core/Snackbar';
import '../dashboard.css';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
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
        //   width: '30ch',
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    navigation: {
        marginTop: theme.spacing(2),
    },
}));
const EmployeeDefaulters = () => {
    // const [document, setDocument] = useState();
    // const [show, setShow] = useState(false);
    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
    // const [show1, setShow1] = useState(false);
    // const handleClose1 = () => setShow1(false);
    // const handleShow1 = () => setShow1(true);
    // const {formNo} = useParams();
    const classes = useStyles();
    const [payable, setPayable] = useState([]);
    const [locked, setLocked] = useState([]);
    const history = useHistory();
    const school_id = localStorage.getItem("school_id")
    const [classdata, setClassdata] = useState([]);
    const [sectiondata, setSectiondata] = useState([]);
    const [classid, setClassid] = useState('');
    const [sectionid, setSectionid] = useState('');
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
        // setSearchTerm('');
        setSectionid('');
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
        axios.get(`http://fee-management-api.nastechltd.co/api/defaulter/${school_id}`)
            .then(response => {
                console.log(response.data)
                setPayable(response.data.payable_accounts)
                setLocked(response.data.locked_account)
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
    }, [])
    const sendEmail = (id) => {
        axios.post(`http://fee-management-api.nastechltd.co/api/email_defaulter/${id}`)
            .then(response => {
                console.log(response.data);
            })
            .catch((error) => {
                if (error.response) {
                    setMessageinfo(error.response.data.message);
                    handleMessage();
                }
            })
    }

    const myData = payable.concat(locked);
    console.log(myData)












    return (
        <>
            <div class="dashboard">
                <div class="left">
                    <div class="navigation">
                        <div class="wrapper2">
                            <div class="abilan">
                                <img src={logo} />
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
                                    Defaulters
                                </div>
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
                                <Typography color="textPrimary">Defaulters</Typography>
                            </Breadcrumbs>
                        </div>
                        <div class="message">
                            <div class="add-student">
                                {/* <button type="button" onClick={handleShow} class="btn btn-primary btn-lg"><AddIcon />Add Document</button> */}
                                {/* <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Add Document</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <div class="row billing-main">
                                            <div class="col-6 billing-box">
                                                <TextField className="pb-3 bg-white" type="text" onChange={(e) => setDocument(e.target.value)} label="Document Name" variant="filled" />
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
                                        <Modal.Title>Update Document</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <div class="row billing-main">
                                            <div class="col-6 billing-box">
                                                <TextField className="pb-3 bg-white" type="text" defaultValue={localStorage.getItem("name")} onChange={(e) => setDocument(e.target.value)} label="Section" variant="filled" />
                                            </div>
                                        </div>


                                    </Modal.Body>
                                    <Modal.Footer>
                                        <button class="btn btn-secondary" onClick={handleClose1}>
                                            Close
                                            </button>
                                        <button onClick={sendUpdated} className="btn btn-primary">Update</button>
                                    </Modal.Footer>
                                </Modal> */}
                            </div>
                            {myData.length === 0 ?
                                <>
                                    <div className="col-12">
                                        <h2 className="text-center">Nothing To Show...</h2>
                                    </div>
                                </>
                                :
                                <>
                                    <div className="row">
                                        <div className="col-12 text-center">
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
                                            <button onClick={reset} className="btn btn-primary mt-3 ml-5">Reset</button>

                                        </div>
                                    </div>
                                    <div class="table-responsive">
                                        <table class="table no-wrap">
                                            <thead>
                                                <tr>
                                                    <th class="border-top-0">#</th>
                                                    <th class="border-top-0">GR No.</th>
                                                    <th class="border-top-0">Name</th>
                                                    <th class="border-top-0">Gender</th>
                                                    <th class="border-top-0">Send Mail</th>
                                                    {/* <th class="border-top-0">Created At</th> */}
                                                    <th class="border-top-0">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {myData.filter((val) => {
                                                    if (sectionid == '') {
                                                        return val;
                                                    }
                                                    else if (val.section_id.toString().includes(sectionid)) {
                                                        return val;
                                                    }
                                                }).map((val, i) => {
                                                    return (
                                                        <>
                                                            <tr key={i}>
                                                                <td>{i + 1}</td>
                                                                <td class="txt-oflo">{val.G_R_NO}</td>
                                                                {val.middle_name === null ?
                                                                    <td class="txt-oflo print-capitalize">{`${val.first_name} ${val.last_name}`}</td>
                                                                    :
                                                                    <td class="txt-oflo print-capitalize">{`${val.first_name} ${val.middle_name} ${val.last_name}`}</td>
                                                                }
                                                                <td>{val.gender}</td>
                                                                <td><Button onClick={(e) => sendEmail(val.id)}><SendIcon /></Button></td>
                                                                <td><Button onClick={() => history.push("/defaulternotice")}><PrintIcon /></Button></td>
                                                                {/* <td>
                                                            <ButtonGroup disableElevation variant="contained" color="primary">
                                                                <Button className="student-btn-up" onClick={() => update(val.id)}  ><UpdateIcon className="text-white" /></Button>
                                                                <Button className="student-btn-del" onClick={() => deleteSchool(val.id)} ><DeleteIcon className="text-white" /></Button>
                                                            </ButtonGroup>
                                                        </td>  */}
                                                            </tr>
                                                        </>
                                                    )
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </>
                            }
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
export default EmployeeDefaulters;











