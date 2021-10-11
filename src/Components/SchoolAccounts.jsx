import React, { useState, useEffect } from 'react';
import './dashboard.css';
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom';
import UpdateIcon from '@material-ui/icons/Update';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import logo from './jb1.png'
import { Modal } from 'react-bootstrap';
import FormLabel from '@material-ui/core/FormLabel';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';


const Finance = () => {
    const history=useHistory();
    const school_id = localStorage.getItem("school_id")
    const[accountData,setAccountData]=useState([])
    const[name,setName]=useState("");
    const[description,setDescription]=useState("")
    useEffect(() => {
        axios.get(`http://fee-management-api.nastechltd.co/api/show_school_account/${school_id}`)
            .then(response => {
                console.log(response);
                setAccountData(response.data);
            })
            .catch((error) => {
                if (error.response) {
                    
                }
            })
    }, [school_id])
    const [Clickopen, setClickOpen] = React.useState(false);

        const handleClickOpen = () => {
            setClickOpen(true);
        };

        const handleClickClose = () => {
            setClickOpen(false);
        };
        const [show, setShow] = useState(false);
        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);
        
        const submit = () => {
            if(name === "") alert("Name is required");
            if(description === "") alert("Description is required");
            axios.post(`http://fee-management-api.nastechltd.co/api/create_school_account`,{
                school_id:school_id,
                account_name:name,
                account_description:description
            })
            .then(response => {
                handleClose();
                reload();
            })
            .catch((error) => {
                console.log(error)
            })
        }

        const reload = () => {
            axios.get(`http://fee-management-api.nastechltd.co/api/show_school_account/${school_id}`)
            .then(response => {
                console.log(response);
                setAccountData(response.data);
            })
            .catch((error) => {
                if (error.response) {
                    
                }
            })
        }

        const logOut = () => {
        localStorage.clear();
        history.push("/")
    }
    var count = 0;
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
                                    <i class="fas fa-user-tie "></i>
                                </div>
                                <div class="icon-name ">Finance Employee</div>
                            </div></Link>
                            <Link class="nav-link" to="/feecomponents"><div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas fa-money-check-alt"></i>
                                </div>
                                <div class="icon-name">Fee</div>
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
                    <i class="fas fa-book-reader active"></i>
                  </div>
                  <div class="icon-name active"> School Accounts</div>
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
                                    Finance Employee
                                </div>
                                <button onClick={logOut} class="btn text-bolder text-right">Log Out</button>

                            </div>
                        </div>
                        <hr class="new-hr" />
                    </div>
                    <div class="right-body">

                      {/* back to dashboard option*/}
                      <a href="/campusdashboard" style={{textDecoration:"none"}}>
                                <div className="col-xl-2 dash-button" style={{marginBottom:"10px",display:"flex",alignItems:"flex-end",justifyContent:"center",padding:"6px",color:"#fff", borderRadius:"5px",cursor:"pointer"}}>
                                   
                                <i class="fas fa-tachometer-alt" style={{fontSize:"25px"}}></i>
                                <h5 style={{margin:"0px",marginLeft:"10px", fontSize:"15px", fontWeight:"bold"}}>Dashboard</h5>
                                </div>
                                </a>

                        <div class="message">
                            <div class="add-student">
                                <button type="button"  class="btn btn-primary btn-lg" onClick={handleShow}><AddIcon /> Add Account</button>
                            </div>

                            <div className="add-student">
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Create Account</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div class="row billing-main">
                      <div class="col-6 billing-box">
                        <TextField
                          type="text"
                          className="pb-3"
                          label="Account Name"
                          onChange={(e) => setName(e.target.value)}
                          variant="filled"
                        />
                        <TextField
                          type="text"
                          className="pb-3"
                          required
                          label="Description"
                          onChange={(e) => setDescription(e.target.value)}
                          variant="filled"
                        />
                      </div>
                      
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <button class="btn btn-secondary" onClick={handleClose}>
                      Close
                    </button>
                    <button  className="btn btn-primary" onClick={submit}>
                      Create
                    </button>
                  </Modal.Footer>
                </Modal>
               
              </div>
                           
                            <div class="table-responsive">
                                <table class="table no-wrap">
                                    <thead>
                                        <tr>
                                            <th class="border-top-0">#</th>
                                            <th class="border-top-0">Name</th>
                                            <th class="border-top-0">Description</th>
                                            
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {accountData.map((val, i) => {
                                            return (
                                                <>
                                                  <tr key={i}>
                                                                <td>{`${count = 1 + count}`}</td>
                                                                <td class="txt-oflo print-capitalize">{val.name}</td>
                                                                <td className="print-capitalize">{val.description}</td>
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
export default Finance;