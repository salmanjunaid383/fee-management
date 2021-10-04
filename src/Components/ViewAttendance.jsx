import { React, useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import axios from "axios";
import "./dashboard.css";
import logo from "../Components/jb1.png"
import TextField from "@material-ui/core/TextField";
import Snackbar from "@material-ui/core/Snackbar";


const ViewAttendance = () => {

    const history = useHistory();
    const[month,setMonth]=useState("");
    const[studentId,setStudentId]=useState(0);
    const logOut = () => {
        localStorage.clear();
        history.push("/");
      };
    function getAttendance(){
      axios
      .post(
        "http://fee-management-api.nastechltd.co/api/attendance_report",{
          month: month,
	        student_id:studentId
        }
      ).then((response) => {
        console.log(response)
      },(error) => {
        console.log(error)
      })
    }

    return(
        <>

<div class="dashboard">
        <div class="left">
          <div class="navigation">
            <div class="wrapper2">
              <div class="abilan">
                <img src={logo} />
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
                    <i class="fas fa-users-class active"></i>
                  </div>
                  <div class="icon-name active">Class</div>
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
                    <i class="fas fa-receipt"></i>
                  </div>
                   <div class="icon-name">Reports</div>
                </div>
              </Link>

              <Link class="nav-link" to="/Voucher-List">
                <div class="folder-icons">
                  <div class="icon1">
                    <i class="fas fa-receipt"></i>
                  </div>
                  <div class="icon-name">Paid Vouchers</div>
                </div>
              </Link>
           
            </div>
          </div>
        </div>
        <div class="right-side">
          <div class="right-header">
            <div class="top-bar">
              <div class="top-bar-justify">
                <div class="big-inbox">View Attendance</div>
                <button onClick={logOut} class="btn text-bolder text-right">
                  Log Out
                </button>
              </div>
            </div>
            <hr class="new-hr" />
          </div>
          <div class="right-body">
            
          <div className="container">
            <div className="row">
              <div className="col-md-3">
              <div className="col-md-11 text-center px-2 w-100 p-0">
                                                                    <TextField
                                                                        onChange={(e) => setMonth(e.target.value)}
                                                                        id="standard-textarea"
                                                                        name='date'
                                                                        label="Date"
                                                                        placeholder="Add date"
                                                                        type="date" 
                                                                        InputLabelProps={{
                                                                            shrink: true,
                                                                        }} />                                                
                                                                        </div>
              </div>
              <div className="col-md-3">
              <div className="col-md-11 text-center px-2 w-100 p-0">
                                                                    <TextField
                                                                        onChange={(e) => setStudentId(e.target.value)}
                                                                        id="standard-textarea"
                                                                        name='studentId'
                                                                        label="studentId"
                                                                        placeholder="Student Id"
                                                                        type="number" 
                                                                        InputLabelProps={{
                                                                            shrink: true,
                                                                        }} />                                                
                                                                        </div>

              </div>
              <div className="col-md-3">
                <button className="btn btn-primary" onClick={getAttendance}> Submit</button>
              </div>
            </div>
          </div>

          </div>
        </div>
      </div>


        </>
    )
}
export default ViewAttendance;