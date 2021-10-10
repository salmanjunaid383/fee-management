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
import Snackbar from "@material-ui/core/Snackbar";

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

  const [alldata, setAllData] = useState([]);
  const schoolId = localStorage.getItem("school_id");
  function submit() {
    console.log(attendances);
    axios
      .post(`http://fee-management-api.nastechltd.co/api/attendance`, {
        attendances: attendances,
      })
      .then(
        (response) => {
          console.log(response);
          setMessageinfo("Submitted!");
          handleMessage();
          axios
            .get(`http://fee-management-api.nastechltd.co/api/attendance`)
            .then(
              (response) => {
                console.log(response);
                setAllData(response.data);
              },
              (error) => {
                setMessageinfo("Please fill all fields!");
                handleMessage();
              }
            );
        },
        (error) => {
          setMessageinfo("Please fill all fields!");
          handleMessage();
        }
      );
  }

  const [attendances, setItemList] = useState([
    { date: "", school_id: schoolId, description: "" },
  ]);
  function AddMore() {
    setItemList([
      ...attendances,
      { date: "", school_id: schoolId, description: "" },
    ]);
  }
  function handleChange(e, index) {
    const { name, value } = e.target;
    const list = [...attendances];
    list[index][name] = value;
    setItemList(list);
  }
  function Remove(i) {
    const list = [...attendances];
    list.pop(i);
    setItemList(list);
  }

  const [messageinfo, setMessageinfo] = useState("");
  const [message, setMessage] = useState({
    open: false,
    vertical: "top",
    horizontal: "right",
  });
  const { vertical, horizontal, open } = message;
  const handleMessage = () => {
    setMessage({ open: true, vertical: "top", horizontal: "right" });
  };
  const CloseMessage = () => {
    setMessage({ ...message, open: false });
  };

  useEffect(() => {
    axios
    .get(`http://fee-management-api.nastechltd.co/api/attendance`)
    .then(
      (response) => {
        console.log(response);
        setAllData(response.data);
      },
      (error) => {
        setMessageinfo("Please fill all fields!");
        handleMessage();
      }
    );
  }, [])
  return (
    <>
      <div class="dashboard">
        <div class="left">
          <div class="navigation">
            <div class="wrapper2">
              <div class="abilan">
                <img
                  alt="Logo"
                  src={
                    "http://fee-management-api.nastechltd.co/api/school_profile/" +
                    localStorage.getItem("school_id")
                  }
                />
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
                    <i
                      class="fas fa-shuttle-van"
                    ></i>
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
            <h5>Add Attendance Date</h5>

            <div style={{ overflow: "auto",overflowX:"hidden", padding: "10px" , height:"60%" }}>
              <div className="row mt-3">
                {attendances.map((val, i) => {
                  return (
                    <>
                      <div className="col-md-11 text-center px-2 w-100 p-0">
                        <TextField
                          onChange={(e) => handleChange(e, i)}
                          id="standard-textarea"
                          name="date"
                          label="Date"
                          placeholder="Add date"
                          type="date"
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />

                        <TextField
                          style={{ marginLeft: "10px" }}
                          onChange={(e) => handleChange(e, i)}
                          id="standard-textarea"
                          name="description"
                          label="Description"
                          placeholder="Add Description"
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </div>
                      <div className="col-md-1 text-center px-2 w-100 p-0">
                        <i
                          className="fa fa-minus p-2 text-center pt-1 bg-dark text-light"
                          style={{ marginTop: "10px", cursor: "pointer" }}
                          onClick={(e) => Remove(i)}
                        ></i>
                      </div>
                    </>
                  );
                })}
                <div className="col-md-6  px-2 w-100 p-0">
                  <i
                    className="fa fa-plus p-2 text-center pt-1 bg-dark text-light"
                    style={{ marginTop: "10px", cursor: "pointer" }}
                    onClick={AddMore}
                  ></i>
                </div>
              </div>
              <div className="col-xl-12 text-right" >
                <button
                  className="btn btn-primary  px-2  py-1"
                  style={{ marginTop: "5px" }}
                  onClick={submit}
                >
                  Submit
                </button>
              </div>
            </div>
            
         
          
          <div class="table-responsive">
            <table class="table no-wrap">
              <thead>
                <tr>
                  <th class="border-top-0">#</th>
                  <th class="border-top-0">Date.</th>
                  <th class="border-top-0">Description</th>
                
                </tr>
              </thead>
              <tbody>
                {alldata.map((val, i) => {
                  return (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{val.date}</td>
                      <td>{val.description}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
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
    </>
  );
};
export default AdminAttendance;
