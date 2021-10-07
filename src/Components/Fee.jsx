import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Modal } from 'react-bootstrap';
import axios from 'axios';
import UpdateIcon from '@material-ui/icons/Update';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import logo from './jb1.png';


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '35ch',
        },
    },
}));

const FeeComponents = () => {
    const classes = useStyles();
    const school_id = localStorage.getItem("school_id")
    const history = useHistory();

    // console.log(billingperiod)



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
                                    Fee
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
                            <div className="show_fee">
                                <div class="card p-2" style={{ width: '18rem' }}>
                                    <div class="card-body w-100 p-0">
                                        <div className="text-center mb-2"><i class="txt-icon fas fa-7x fa-calendar-times"></i></div>
                                        <button type="button" onClick={() => history.push("/feeperiod")} class="btn mb-0 mt-0 w-100 btn-primary btn-lg">Fee Period</button>

                                    </div>
                                </div>
                                <div class="card p-2" style={{ width: '18rem' }}>
                                    <div class="card-body w-100 p-0">
                                        <div className="text-center mb-2"><i class="txt-icon fas fa-7x fa-money-check-alt"></i></div>
                                        <button type="button" onClick={() => history.push("/structure")} class="btn my-0 w-100 btn-primary btn-lg">Fee Structure</button>

                                    </div>
                                </div>
                                <div class="card p-2" style={{ width: '18rem' }}>
                                    <div class="card-body w-100 p-0">
                                        <div className="text-center mb-2"><i class="txt-icon fas fa-7x fa-user-tag"></i></div>
                                        <button type="button" onClick={() => history.push("/discounted")} class="btn mb-0 mt-0 w-100 btn-primary btn-lg">Discount</button>

                                    </div>
                                </div>
                                <div class="card p-2" style={{ width: '18rem' }}>
                                    <div class="card-body w-100 p-0">
                                        <div className="text-center mb-2"><i class="txt-icon fas fa-7x fa-user-slash"></i></div>
                                        <button type="button" onClick={() => history.push("/defaulters")} class="btn my-0 w-100 btn-primary btn-lg">Defaulters</button>

                                    </div>
                                </div>
                                <div class="card p-2" style={{ width: '18rem' }}>
                                    <div class="card-body w-100 p-0">
                                        <div className="text-center mb-2"><i class="txt-icon fas fa-7x fa-file-invoice-dollar"></i></div>
                                        <button type="button" onClick={() => history.push("/customfeevoucher")} class="btn my-0 w-100 btn-primary btn-lg">Custom Feevoucher</button>

                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default FeeComponents;