import { React, useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import axios from "axios";
import "./dashboard.css";
import logo from "../Components/jb1.png";
import TextField from "@material-ui/core/TextField";
import Snackbar from "@material-ui/core/Snackbar";

const ViewAttendance = () => {
  const { studentid } = useParams()
  const history = useHistory();
  const [alldata, setAllData] = useState("");
  const [month, setMonth] = useState("");
  // const [studentId, setStudentId] = useState(0);
  const logOut = () => {
    localStorage.clear();
    history.push("/");
  };
  console.log(studentid)
  function getAttendance() {
  
    axios
      .post("http://fee-management-api.nastechltd.co/api/attendance_report", {
        month: month,
        student_id: studentid,
        
        
      })
      .then(
        (response) => {
          console.log(response);
          setAllData(response.data);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  // function addmonth(date, months){
  //   var d = month;
  //   date.setMonth(date.getMonth() + + months)
  // }

//   const monthNames = ["January", "February", "March", "April", "May", "June",
//   "July", "August", "September", "October", "November", "December"
// ];

// const d = month;
// console.log("The current month is " + monthNames[d.getMonth()]);

  return (
    <>
      <div class="dashboard">
        <div class="left">
          <div class="navigation">
            <div class="wrapper2">
              <div class="abilan">
              <div class="abilan">
                <img alt="Logo" src={"http://fee-management-api.nastechltd.co/api/school_profile/"+localStorage.getItem("school_id")} />
              </div>
              </div>

              <Link class="nav-link" to={`/studentdashboard/${studentid}`}>
                <div class="folder-icons">
                  <div class="icon1">
                    <i class="fas fa-tachometer-alt"></i>
                  </div>
                  <div class="icon-name">Dashboard</div>
                </div>
              </Link>

              <Link class="nav-link" to={`/student-profile/${studentid}`}>
                <div class="folder-icons">
                  <div class="icon1">
                    <i class="fas fa-user-circle "></i>
                  </div>
                  <div class="icon-name ">Profile</div>
                </div>
              </Link>

              <Link class="nav-link" to={`/studentledger/${studentid}`}>
                <div class="folder-icons">
                  <div class="icon1">
                    <i class="fas fa-calculator-alt "></i>
                  </div>
                  <div class="icon-name ">Student Ledger</div>
                </div>
              </Link>
              <Link class="nav-link" to={`/feevoucher/${studentid}`}>
                <div class="folder-icons">
                  <div class="icon1">
                    <i class="fas fa-print"></i>
                  </div>
                  <div class="icon-name">Fee Voucher</div>
                </div>
              </Link>
              <Link class="nav-link" to={`/studentpassword/${studentid}`}>
                <div class="folder-icons">
                  <div class="icon1">
                    <i class="fas fa-key"></i>
                  </div>
                  <div class="icon-name">Change Password</div>
                </div>
              </Link>

              <Link class="nav-link" to={`/studentVoucher/${studentid}`}>
                <div class="folder-icons">
                  <div class="icon1">
                    <i class="fas fa-file-alt "></i>
                  </div>
                  <div class="icon-name ">Student Vouchers</div>
                </div>
              </Link>

              <Link class="nav-link" to={`/ViewAttendance/${studentid}`}>
                <div class="folder-icons">
                  <div class="icon1">
                    <i class="fas fa-clipboard-check active "></i>
                  </div>
                  <div class="icon-name active">View Attendance</div>
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
                      name="date"
                      label="Date" 
                      placeholder="jan-2021"
                      type="text"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  {/* <div className="col-md-11 text-center px-2 w-100 p-0">
                    <TextField
                      onChange={(e) => setStudentId(e.target.value)}
                      id="standard-textarea"
                      name="studentId"
                      label="studentId"
                      placeholder="Student Id"
                      type="number"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </div> */}
                </div>
                <div className="col-md-3">
                  <button className="btn btn-primary" onClick={getAttendance}>
                    {" "}
                    Submit
                  </button>
                </div>
              </div>
            </div>

            <div class="table-responsive">
              <table class="table no-wrap">
                <thead>
                  <tr>
                    <th class="border-top-0">G.R No</th>
                    <th class="border-top-0">Present</th>
                    <th class="border-top-0">Percentage</th>
                    <th class="border-top-0">Absent</th>
                    <th class="border-top-0">Leave</th>
                  
                  </tr>
                </thead>
                <tbody>
                  {
                    alldata.length==0 ? <></> : 
                    <>
                    <tr>
                    <td>{alldata.student.G_R_NO}</td>
                    <td>{alldata.present}</td>
                    <td>{alldata.percentage}</td>
                   {
                     alldata.absent.length==0 ? 
                     <>
                     <td>
                          none
                     </td>
                     </> 
                     :
                     <>
                     </>
                   }

{
                     alldata.leave.length==0 ? 
                     <>
                     <td>
                          none
                     </td>
                     </> 
                     :
                     <>
                     <td>
                        
                    </td>
                     </>
                   }

                    </tr>
                    </>
                  }
                  <tr>
                
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ViewAttendance;
