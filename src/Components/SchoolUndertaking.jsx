import { React, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import logo from './jb1.png'
import LaunchIcon from '@material-ui/icons/Launch';
import './dashboard.css';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import UpdateIcon from '@material-ui/icons/Update';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { Modal } from 'react-bootstrap';
import TextField from '@material-ui/core/TextField';
import PublishIcon from '@material-ui/icons/Publish';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
const useStyles = makeStyles((theme) => ({
    root: {
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
    navigation: {
        marginTop: theme.spacing(2),
    },
    modal: {
        width: '600px',
    },
}));
const SchoolUndertaking = () => {
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
    const classes = useStyles();
    const [document, setDocument] = useState('');
    const [undertakingdata, setUndertakingdata] = useState([]);
    const [documentdata, setDocumentdata] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [show1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);
    const history = useHistory();
    const school_id = localStorage.getItem("school_id")
    const [selectedFile, setSelectedFile] = useState();
    const [documentid, setDocumentid] = useState('');
    const changeHandler = (e) => {
        setSelectedFile(e.target.files[0]);

    };

    const changeHandlerbox = async (e) => {
        setDocumentid(e.target.value);

    };
    useEffect(() => {
        axios.get(`http://fee-management-api.nastechltd.co/api/show_undertaking/${school_id}`)
            .then(response => {
                console.log(response.data)
                setUndertakingdata(response.data)
            })
            .catch((error) => {
                if (error.response) {
                    setMessageinfo(error.response.data.message);
                    handleMessage();
                }
            })
    }, [])
    const handleClick = (id) => {
        axios.get(`http://fee-management-api.nastechltd.co/api/undertaking/${id}`)
            .then(response => {
                console.log(response);
                setDocumentdata(response.data.undertaking);
            })
            .catch((error) => {
                if (error.response) {
                    setMessageinfo(error.response.data.message);
                    handleMessage();
                }
            })
        localStorage.setItem("user_id", id)
        handleShow();
    }
    const handleSubmission = () => {
        axios.get(`http://fee-management-api.nastechltd.co/api/student_document/${documentid}`)
            .then(response => {
                console.log(response.data)
                const formData = new FormData();
                formData.append('file', selectedFile);
                formData.append('document_id', response.data.document_id);
                formData.append('document', response.data.document);
                formData.append('form_no', localStorage.getItem("user_id"));
                formData.append('school_id', school_id);
                console.log(formData.get('document'))
                axios({
                    method: "post",
                    url: `http://fee-management-api.nastechltd.co/api/update_document/${response.data.id}`,
                    data: formData,
                    headers: { "Content-Type": "multipart/form-data" },
                })
                    .then(function (response) {
                        //handle success
                        console.log(response.data.document_id);
                        setSelectedFile();
                        setDocumentid('');
                        reload();
                        setDocument('');
                        setMessageinfo("Submitted!!")
                        handleMessage();

                    })
                    .catch(function (response) {
                        //handle error
                        console.log(response);
                    });

            })
            .catch((error) => {
                if (error.response) {
                    setMessageinfo(error.response.data.message);
                    handleMessage();
                }
            })
    }
    // console.log(documentdata);
    const remove = () => {
        localStorage.removeItem("user_id")
        handleClose();
    }





    const reload = () => {
        axios.get(`http://fee-management-api.nastechltd.co/api/show_undertaking/${school_id}`)
            .then(response => {
                console.log(response.data)
                setUndertakingdata(response.data)
            })
            .catch((error) => {
                if (error.response) {
                    setMessageinfo(error.response.data.message);
                    handleMessage();
                }
            })
        axios.get(`http://fee-management-api.nastechltd.co/api/undertaking/${localStorage.getItem("user_id")}`)
            .then(response => {
                console.log(response);
                if (response.data.undertaking.length === 0) {
                    remove();
                }
                setDocumentdata(response.data.undertaking);
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
                                {/* <img alt="Logo" src={"http://fee-management-api.nastechltd.co/api/school_profile/"+localStorage.getItem("school_id")} /> */}
                            </div>
                         
                         
                            <Link to="/campusdashboard" class="nav-link ">
                <div class="folder-icons ">
                  <div class="icon1">
                    <i class="fas  fa-columns "></i>
                  </div>
                  <div class="icon-name1  ">Dashboard</div>
                </div>
              </Link>
              <Link to="/admissioncomponents" class="nav-link ">
                <div class="folder-icons ">
                  <div class="icon1">
                    <i class="fas fa-school active"></i>
                  </div>
                  <div class="icon-name1 active">Admission</div>
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
                    <i class="fas fa-file"></i>
                  </div>
                  <div class="icon-name">Paid Vouchers</div>
                </div>
              </Link>

              <Link class="nav-link" to="/AdminAttendance">
                <div class="folder-icons">
                  <div class="icon1">
                    <i class="fas fa-user-graduate"></i>
                  </div>
                  <div class="icon-name">Attendance</div>
                </div>
              </Link>

              <Link class="nav-link" to="/Inventory">
                <div class="folder-icons">
                  <div class="icon1">
                    <i class="              fas fa-shuttle-van
"></i>
                  </div>
                  <div class="icon-name">Inventory</div>
                </div>
              </Link>

              <Link class="nav-link" to="/Asset-Tracking">
                <div class="folder-icons">
                  <div class="icon1">
                    <i class="fas fa-book-reader"></i>
                  </div>
                  <div class="icon-name">School Assets</div>
                </div>
              </Link>

             <Link class="nav-link" to="/AssetsBorrow">
                <div class="folder-icons">
                  <div class="icon1">
                    <i class="fas fa-book-reader"></i>
                  </div>
                  <div class="icon-name">Assets Borrow</div>
                </div>
              </Link> 

              <Link class="nav-link" to="/ExpenseVoucher">
                <div class="folder-icons">
                  <div class="icon1">
                    <i class="fas fa-book-reader"></i>
                  </div>
                  <div class="icon-name"> Expense Voucher</div>
                </div>
              </Link>

              <Link class="nav-link" to="/SchoolAccounts">
                <div class="folder-icons">
                  <div class="icon1">
                    <i class="fas fa-book-reader"></i>
                  </div>
                  <div class="icon-name"> School Accounts</div>
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
                                    Student Undertaking
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
                                <Typography color="textPrimary">Undertaking</Typography>
                            </Breadcrumbs>
                        </div>
                        <div class="message">
                            <div class="add-student">
                                {/* <button type="button" onClick={handleShow} class="btn btn-primary btn-lg"><AddIcon />Add Document</button> */}
                                <Modal className="w-100" show={show} onHide={remove} size="lg">
                                    <Modal.Header closeButton>
                                        <Modal.Title>Add Document</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body >{documentdata.map((val, i) => {
                                        return (
                                            <>
                                                <div className="row">
                                                    <div className="ml-2 mt-2 col-3 form-check">
                                                        <input className="form-check-input" type="checkbox" value={val.id} onChange={(e) => changeHandlerbox(e)} id={val.id} />
                                                        <label className="form-check-label print-capitalize" for={val.id}>
                                                            {val.document}
                                                        </label>
                                                    </div>
                                                    <div className="col-6">
                                                        {documentid == val.id ?
                                                            <>
                                                                <input class="form-control" name="file" type="file" id={`${val.id}file`} onChange={(e) => changeHandler(e)} />
                                                            </>
                                                            :
                                                            null}

                                                    </div>
                                                    <div className="col-2 my-1">
                                                        {documentid == val.id ?
                                                            <>
                                                                <button onClick={handleSubmission} className="btn btn-success">Upload</button>
                                                            </>
                                                            :
                                                            <button disabled className="btn btn-success">Upload</button>

                                                        }
                                                    </div>

                                                </div>
                                            </>
                                        )
                                    })}


                                    </Modal.Body>
                                    <Modal.Footer >
                                        <button class="btn btn-secondary" onClick={remove}>Close </button>
                                    </Modal.Footer>
                                </Modal>
                                {/* <Modal show={show1} onHide={handleClose1}>
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
                            {undertakingdata.length === 0 ?
                                <>
                                    <div className="col-12">
                                        <h2 className="text-center">Nothing To Show...</h2>
                                    </div>
                                </>
                                :
                                <div class="table-responsive">
                                    <table class="table no-wrap">
                                        <thead>
                                            <tr>
                                                <th class="border-top-0">#</th>
                                                <th class="border-top-0">Registeration No.</th>
                                                <th class="border-top-0">Name</th>
                                                <th class="border-top-0">Upload</th>
                                                <th class="border-top-0">Documents</th>
                                                <th class="border-top-0">Created At</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {undertakingdata.map((val, i) => {
                                                return (
                                                    <>
                                                        <tr key={i}>
                                                            <td>{i + 1}</td>
                                                            <td class="txt-oflo">{val.registration_no}</td>
                                                            {val.middle_name === null ?
                                                                <td class="txt-oflo print-capitalize">{`${val.first_name} ${val.last_name}`}</td>
                                                                :
                                                                <td class="txt-oflo print-capitalize">{`${val.first_name} ${val.middle_name} ${val.last_name}`}</td>
                                                            }                                                            <td><button class="btn" onClick={() => handleClick(`${val.registration_no}`)}><PublishIcon /></button></td>
                                                            <td><button class="btn" onClick={() => history.push(`/undertaking/${val.registration_no}`)}><LaunchIcon /></button></td>
                                                            <td>{val.created_at.slice(0, 10)}</td>
                                                            {/* <td>
                                                            <ButtonGroup disableElevation variant="contained" color="primary">
                                                                <Button className="student-btn-up" onClick={() => update(val.id)}  ><UpdateIcon className="text-white" /></Button>
                                                                <Button className="student-btn-del" onClick={() => deleteSchool(val.id)} ><DeleteIcon className="text-white" /></Button>
                                                            </ButtonGroup>
                                                        </td> */}
                                                        </tr>
                                                    </>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            }
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
export default SchoolUndertaking;











