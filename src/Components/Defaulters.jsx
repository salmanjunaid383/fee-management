import { React, useEffect, useState } from 'react';
import { Link, useHistory} from 'react-router-dom';
import axios from 'axios';
import logo from './jb1.png'
// import LaunchIcon from '@material-ui/icons/Launch';
// import UpdateIcon from '@material-ui/icons/Update';
// import AddIcon from '@material-ui/icons/Add';
// import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
// import ButtonGroup from '@material-ui/core/ButtonGroup';
// import { Modal } from 'react-bootstrap';
// import TextField from '@material-ui/core/TextField';
import './dashboard.css';

const Defaulters = () => {
    // const [document, setDocument] = useState();
    const [payable, setPayable] = useState([]);
    const [locked, setLocked] = useState([]);
    // const [show, setShow] = useState(false);
    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
    // const [show1, setShow1] = useState(false);
    // const handleClose1 = () => setShow1(false);
    // const handleShow1 = () => setShow1(true);
    const history = useHistory();
    // const {formNo} = useParams();
    const school_id = localStorage.getItem("school_id")

    useEffect(() => {
        axios.get(`http://fee-management-api.nastechltd.co/api/defaulter/${school_id}`)
            .then(response => {
                console.log(response.data)
                setPayable(response.data.payable_accounts)
                setLocked(response.data.locked_account)
            })
            .catch((error) => {
                if (error.response) {
                    alert(error.response.data.message);
                }
            })
    }, [])

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
                                    Defaulters
                                </div>
                            </div>
                        </div>
                        <hr class="new-hr" />
                    </div>
                    <div class="right-body">
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
                                                {/* <th class="border-top-0">Action</th> */}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {myData.map((val, i) => {
                                                return (
                                                    <>
                                                        <tr key={i}>
                                                            <td>{i + 1}</td>
                                                            <td class="txt-oflo">{val.G_R_NO}</td>
                                                            <td class="txt-oflo">{`${val.first_name} ${val.middle_name} ${val.last_name}`}</td>
                                                            <td>{val.gender}</td>
                                                            <td><Button><SendIcon/></Button></td>
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
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Defaulters;











