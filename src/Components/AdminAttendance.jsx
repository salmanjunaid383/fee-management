import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useHistory, useParams } from "react-router-dom";
import "./AdminAttendance.css";
import TextField from "@material-ui/core/TextField";
import logo from "../Components/jb1.png";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@material-ui/core/Button";

const AdminAttendance = () => {
  const [Clickopen, setClickOpen] = React.useState(false);

  const handleClickOpen = () => {
    setClickOpen(true);
  };

  const handleClickClose = () => {
    setClickOpen(false);
  };

  const history = useHistory();
  const logOut = () => {
    localStorage.clear();
    history.push("/");
  };

  const [attendance, setattendance] = useState([{ date: "" }]);
  const handleChange = (e, index) => {
    const { date, value } = e.target;
    const list = [...attendance];
    list[index][date] = value;
    setattendance(list);
  };

  const handleAdd = () => {
    setattendance([...attendance, { date: "" }]);
    console.log(attendance);
  };
  const removeField = (index) => {
    const list = [...attendance];
    list.splice(index, 1);
    setattendance(list);
  };

  return (
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
                <div class="big-inbox">Attendance</div>
                <button onClick={logOut} class="btn text-bolder text-right">
                  Log Out
                </button>
              </div>
            </div>
            <hr class="new-hr" />
          </div>
          <div class="right-body">
            {attendance.map((item, i) => {
              return (
                <>
                  <div style={{ overflow: "hidden" }}>
                    <Button variant="outlined" onClick={handleClickOpen}>
                      Open form dialog
                    </Button>
                    <Dialog
                      open={Clickopen}
                      style={{ overflow: "hidden" }}
                      onClose={handleClickClose}
                    >
                      <div style={{ width: "490px", overflow: "hidden"  }}>
                        <h2 class="text-center mt-3 secondary">Select Date</h2>
                        <hr class="new-hr1 secondary"/>

                     
                          <div key={i} class="row mb-2 billing-main">
                            <div class="col-6">
                              <TextField
                                className="pb-3 bg-white"
                                name="date"
                                type="text"
                                onChange={(e) => handleChange(e, i)}
                                label="Section"
                                variant="filled"
                              />
                            </div>
                            <div class="col-2 text-right p-0">
                              {attendance.length - 1 === i && (
                                <button
                                  type="button"
                                  onClick={handleAdd}
                                  class="btn btn-primary mt-3"
                                >
                                 Add
                                </button>
                              )}
                            </div>
                            <div className="col-2 text-left p-0">
                              {attendance.length !== 1 && (
                                <button
                                  type="button"
                                  onClick={() => removeField(i)}
                                  class="btn btn-primary mt-3"
                                >
                                  Remove
                                </button>
                              )}
                            </div>
                          </div>
                      
                        <DialogActions>
                          <Button onClick={handleClickClose}>Cancel</Button>
                          <button class="btn btn-success">Submit</button>
                        </DialogActions>
                      </div>
                    </Dialog>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
export default AdminAttendance;
