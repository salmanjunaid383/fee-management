import React, { useState, useEffect } from 'react';
import '../dashboard.css';
import { Link, useHistory } from 'react-router-dom';
import PrintIcon from '@material-ui/icons/Print';
// import UpdateIcon from '@material-ui/icons/Update';
// import AddIcon from '@material-ui/icons/Add';
// import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import DescriptionIcon from '@material-ui/icons/Description';
import logo from '../jb1.png'
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


const EmployeeFeeVoucher = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [selectedFile, setSelectedFile] = useState();
    const classes = useStyles();
    const [studentdata, setStudentdata] = useState([]);
    const [feedata, setFeedata] = useState([]);
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
    const changeHandler = (e) => {
        setSelectedFile(e.target.files[0]);
    };
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
            axios.get(`http://fee-management-api.nastechltd.co/api/unpaid_fee_voucher/${school_id}`)
            .then(response => {
                console.log(response);
                setFeedata(response.data);
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
            axios.get(`http://fee-management-api.nastechltd.co/api/unpaid_fee_voucher/${school_id}`)
            .then(response => {
                console.log(response);
                setFeedata(response.data);
            })
            .catch((error) => {
                if (error.response) {
                    setMessageinfo(error.response.data.message);
                    handleMessage();
                }
            })
    }
    console.log(sectionid)

    var mydata = [];
    for (var i = 0; i < feedata.length; i++) {
        var dd = {
            student_id: feedata[i].student_id,
            id: feedata[i].id,
            voucher_no: feedata[i].voucher_no,
            final_amount: feedata[i].final_amount,
            paid: feedata[i].paid,
            student_name: "",
            G_R_NO: "",
            gender: "",
            section_id: ""


        }
        for (var j = 0; j < studentdata.length; j++) {
            if (feedata[i].student_id == studentdata[j].id) {
                studentdata[j].middle_name === null ? dd.student_name = `${studentdata[j].first_name} ${studentdata[j].last_name}` :dd.student_name = `${studentdata[j].first_name} ${studentdata[j].middle_name} ${studentdata[j].last_name}`;;
                dd.G_R_NO = studentdata[j].G_R_NO;
                dd.gender = studentdata[j].gender;
                dd.section_id = studentdata[j].section_id;


            }
        }
        mydata.push(dd)
    }
    const handleSubmission = () => {
        const formData = new FormData();
        formData.append('file', selectedFile);
        if (selectedFile === undefined) {
            setMessageinfo("Select File");
            handleMessage();
        }
        else {
            axios({
                method: "post",
                url: `http://fee-management-api.nastechltd.co/api/import`,
                data: formData,
                headers: { "Content-Type": "multipart/form-data" },
            })
                .then(function (response) {
                    //handle success
                    console.log(response);
                    setSelectedFile();
                    setMessageinfo("Submitted!!");
                    reload();
                    handleClose();
                    handleMessage();

                })
                .catch(function (response) {
                    //handle error
                    console.log(response);
                });
        }
    }
    const sendpay = (id) => {
        axios.post(`http://fee-management-api.nastechltd.co/api/paid`, {
            voucher_no: id
        })
            .then(response => {
                console.log(response.data);
                reload();
            })
            .catch((error) => {
                if (error.response) {
                    setMessageinfo(error.response.data.message);
                    handleMessage();
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
                            </div><Link to="/employeedashboard" class="nav-link "><div class="folder-icons ">
                                <div class="icon1">
                                    <i class="fas fa-columns"></i>
                                </div>
                                <div class="icon-name1">Dashboard</div>
                            </div></Link>
                            
                            <Link class="nav-link" to="/employeefeecomponents"><div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas fa-money-check-alt"></i>
                                </div>
                                <div class="icon-name">Fee</div>
                            </div></Link>
                            <Link class="nav-link" to="/employeefeevoucheradmin"><div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas fa-print active"></i>
                                </div>
                                <div class="icon-name active">Fee Voucher</div>
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
                                    Fee Voucher
                                </div>
                                <button onClick={logOut} class="btn text-bolder text-right">Log Out</button>

                            </div>
                        </div>
                        <hr class="new-hr" />
                    </div>
                    <div class="right-body">

                        <div class="message">
                        <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Add File</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <div className="row">
                                        <div className="col-8">
                                            <input class="form-control" name="file" type="file" onChange={(e) => changeHandler(e)} />
                                        </div>
                                        <div className="col-4">
                                            <button onClick={handleSubmission} className="btn btn-success">Upload</button>
                                        </div>
                                    </div>
                                </Modal.Body>
                                <Modal.Footer>
                                    <button class="btn btn-secondary" onClick={handleClose}>Close</button>
                                </Modal.Footer>
                            </Modal>
                            <div className="row">
                                <div className="col-6 text-left mt-1">
                                    <TextField className="pb-3 bg-white" value={searchTerm} type="text" helperText="By GR.No or Name" onChange={(e) => setSearchTerm(e.target.value)} label="Search Student" />
                                    <button onClick={reset} className="btn btn-primary mt-3 ml-5">Reset</button>
                                    <button onClick={handleShow} className="btn btn-primary mt-3 ml-5">Upload File</button>
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
                                            <th class="border-top-0">Status</th>
                                            {/* <th class="border-top-0">Details</th> */}
                                            <th class="border-top-0">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {mydata.filter((val) => {
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
                                                    <td class="txt-oflo print-capitalize">{`${val.student_name}`}</td>
                                                    <td className="print-capitalize">{val.gender}</td>
                                                    <td>
                                                        {val.paid == 1 ?
                                                            <span class="text-primary text-bolder">Paid</span>
                                                            :
                                                            <ButtonGroup disableElevation variant="contained" color="primary">
                                                                <Button className="expense-btn-p " onClick={() => sendpay(val.voucher_no)}><span class="text-white text-bolder mb-1">Pay</span></Button>
                                                            </ButtonGroup>}
                                                    </td>
                                                    {/* <td><Button onClick={() => history.push(`/student1/${val.id}`)}><DescriptionIcon /></Button></td> */}


                                                    <td><Button onClick={() => history.push(`/feevoucher/${val.student_id}`)}><PrintIcon /></Button></td>


                                                </tr>
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
export default EmployeeFeeVoucher;


