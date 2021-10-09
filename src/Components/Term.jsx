import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Modal } from "react-bootstrap";
import axios from "axios";
import logo from "./jb1.png";
import UpdateIcon from "@material-ui/icons/Update";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Snackbar from "@material-ui/core/Snackbar";
import Select1 from "react-select";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

// import * as React from 'react';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

// const useStyles = makeStyles((theme) => ({
//     root: {
//       '& > *': {
//         margin: theme.spacing(1),
//         width: '30ch',
//       },
//     },
//   }));
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "30ch",
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
}));

const Term = () => {
  const [Clickopen, setClickOpen] = React.useState(false);

  const handleClickOpen = () => {
    setClickOpen(true);
  };

  const handleClickClose = () => {
    setClickOpen(false);
  };

  const classes = useStyles();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [studentdata, setStudentdata] = useState([]);
  const [classdata, setClassdata] = useState([]);
  const [term, setTerm] = useState([]);
  const [startingdate, setStartingdate] = useState("");
  const [endingdate, setEndingdate] = useState("");
  const [startdatefinal, setStartdatefinal] = useState();
  const [enddatefinal, setEnddatefinal] = useState();
  const [monthyear, setMonthyear] = useState();
  const [description, setDescription] = useState("");
  const [classid, setClassid] = useState();
  const school_id = localStorage.getItem("school_id");
  const history = useHistory();
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  const [prevdata, setPrevdata] = useState("");
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
  const handleClick = (id) => {
    localStorage.setItem("user_id", id);
    handleShow2();
  };
  const remove = () => {
    localStorage.removeItem("user_id");
    handleClose2();
  };
  useEffect(() => {
    axios
      .get(`http://fee-management-api.nastechltd.co/api/show_term/${school_id}`)
      .then((response) => {
        console.log(response);
        setTerm(response.data);
      })
      .catch((error) => {
        if (error.response) {
          setMessageinfo(error.response.data.message);
          handleMessage();
        }
      });
    axios
      .get(
        `http://fee-management-api.nastechltd.co/api/schools_class/${school_id}`
      )
      .then((response) => {
        console.log(response.data);
        setClassdata(response.data);
      })
      .catch((error) => {
        if (error.response) {
          setMessageinfo(error.response.data.message);
          handleMessage();
        }
      });
    axios
      .get(`http://fee-management-api.nastechltd.co/api/student/${school_id}`)
      .then((response) => {
        console.log(response);
        setStudentdata(response.data);
      })
      .catch((error) => {
        if (error.response) {
          setMessageinfo(error.response.data.message);
          handleMessage();
        }
      });
  }, []);

  const reload = () => {
    axios
      .get(`http://fee-management-api.nastechltd.co/api/show_term/${school_id}`)
      .then((response) => {
        console.log(response);
        setTerm(response.data);
      })
      .catch((error) => {
        if (error.response) {
          setMessageinfo(error.response.data.message);
          handleMessage();
        }
      });
  };
  const deleteTerm = (id) => {
    axios
      .delete(
        `http://fee-management-api.nastechltd.co/api/term/${localStorage.getItem(
          "user_id"
        )}`
      )
      .then((response) => {
        console.log(response);
        remove();
        reload();
      })
      .catch((error) => {
        if (error.response) {
          setMessageinfo(error.response.data.message);
          handleMessage();
        }
      });
  };

  const update = (id) => {
    axios
      .get(`http://fee-management-api.nastechltd.co/api/term/${id}`)
      .then((response) => {
        console.log(response.data);
        setPrevdata(response.data);
        getStartDate(response.data.start_date);
        getEndDate(response.data.end_date);

        handleShow();
        setDescription(response.data.term_name);
      })
      .catch((error) => console.log(error));
  };
  const getStartDate = (UNIX_timestamp) => {
    var a = new Date(UNIX_timestamp * 1000);
    var year = a.getFullYear();
    var month = ("0" + (a.getMonth() + 1)).slice(-2);
    var date = ("0" + a.getDate()).slice(-2);
    setStartingdate(`${year}-${month}-${date}`);
  };
  console.log(startingdate);
  const getEndDate = (UNIX_timestamp) => {
    var b = new Date(UNIX_timestamp * 1000);
    var yearb = b.getFullYear();
    var monthb = ("0" + (b.getMonth() + 1)).slice(-2);
    var dateb = ("0" + b.getDate()).slice(-2);
    setEndingdate(`${yearb}-${monthb}-${dateb}`);
    console.log(endingdate);
  };
  console.log(endingdate);

  function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + " " + month + " " + year;
    return time;
  }

  const sendUpdated = () => {
    if (startingdate === "") {
      setMessageinfo("Select Starting Date");
      handleMessage();
    } else if (endingdate === "") {
      setMessageinfo("Select Ending Date");
      handleMessage();
    } else if (description === "") {
      setMessageinfo("Enter Term Name");
      handleMessage();
    } else {
      axios
        .put(
          `http://fee-management-api.nastechltd.co/api/term/${prevdata.id}`,
          {
            start_date: `${StartDate.getTime() / 1000}`,
            end_date: `${EndDate.getTime() / 1000}`,
            term_name: description,
            school_id: school_id,
            month_or_year: `${startmonth}-${startyear}`,
          }
        )
        .then((response) => {
          console.log(response.data);
          setPrevdata("");
          setStartingdate("");
          setEndingdate("");
          setDescription("");
          reload();
          handleClose();
        })
        .catch((error) => {
          if (error.response) {
            setMessageinfo(error.response.data.message);
            handleMessage();
          }
        });
    }
  };

  // const feedDate = () => {
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  var StartDate = new Date(startingdate);
  // var startdate = StartDate.getDate()
  var startmonth = months[StartDate.getMonth()];
  var startyear = StartDate.getFullYear().toString().substr(-2);
  var EndDate = new Date(endingdate);

  const data = {
    start_date: `${StartDate.getTime() / 1000}`,
    end_date: `${EndDate.getTime() / 1000}`,
    term_name: description,
    school_id: school_id,
    month_or_year: `${startmonth}-${startyear}`,
  };
  const sendData = () => {
    if (startingdate === "") {
      setMessageinfo("Select Starting Date");
      handleMessage();
    } else if (endingdate === "") {
      setMessageinfo("Select Ending Date");
      handleMessage();
    } else if (description === "") {
      setMessageinfo("Enter Term Name");
      handleMessage();
    } else {
      axios
        .post(`http://fee-management-api.nastechltd.co/api/term`, data)
        .then((response) => {
          console.log(response);
          setStartingdate("");
          setEndingdate("");
          setDescription("");
          reload();
          handleClickClose();
        })
        .catch((error) => {
          if (error.response) {
            setMessageinfo(error.response.data.message);
            handleMessage();
          }
        });
    }
  };

  const logOut = () => {
    localStorage.clear();
    history.push("/");
  };

  return (
    <>
      <div class="dashboard">
        <div class="left">
          <div class="navigation">
            <div class="wrapper2">
              <div class="abilan">
                <img alt="Logo" src={"http://fee-management-api.nastechltd.co/api/school_profile/"+localStorage.getItem("school_id")} />
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
                    <i class="fas fa-users-class"></i>
                  </div>
                  <div class="icon-name">Class</div>
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
                    <i class="fas fa-calendar-alt active"></i>
                  </div>
                  <div class="icon-name active">Term</div>
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
                <div class="big-inbox">Term</div>
                <button onClick={logOut} class="btn text-bolder text-right">
                  Log Out
                </button>
              </div>
            </div>
            <hr class="new-hr" />
          </div>
          <div class="right-body">
             

            <a href="/campusdashboard" style={{ textDecoration: "none" }}>
              <div
                className="col-xl-2 dash-button"
                style={{
                  marginBottom: "10px",
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "center",
                  padding: "6px",
                  color: "#fff",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                <i
                  class="fas fa-tachometer-alt"
                  style={{ fontSize: "25px" }}
                ></i>
                <h5
                  style={{
                    margin: "0px",
                    marginLeft: "10px",
                    fontSize: "15px",
                    fontWeight: "bold",
                  }}
                >
                  Dashboard
                </h5>
              </div>
            </a>

            <div className="row" style={{margin:"0px",marginBottom:"10px"}}>
                  <div className="col-xl-12" style={{display:"flex", justifyContent:"flex-end"}}>
                    <Button  variant="outlined" style={{width:"200px", backgroundColor:"blue", color:"#fff", fontWeight:"bold"}} onClick={handleClickOpen}>
                        Add terms
                    </Button>
                  </div>
              </div>

            <div class="message">
              <div className="add-student">
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Update Term</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div class="row billing-main">
                      <div class="col-6 billing-box">
                        <TextField
                          type="date"
                          className="pb-3"
                          label="Starting Date"
                          onChange={(e) => setStartingdate(e.target.value)}
                          defaultValue={startingdate}
                          variant="filled"
                        />
                        <TextField
                          type="text"
                          className="pb-3"
                          required
                          label="Term Name"
                          defaultValue={prevdata.term_name}
                          onChange={(e) => setDescription(e.target.value)}
                          variant="filled"
                        />
                      </div>
                      <div class="col-6 billing-box">
                        <TextField
                          type="date"
                          className="pb-3"
                          required
                          label="Ending Date"
                          onChange={(e) => setEndingdate(e.target.value)}
                          defaultValue={endingdate}
                          variant="filled"
                        />
                      </div>
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <button class="btn btn-secondary" onClick={handleClose}>
                      Close
                    </button>
                    <button onClick={sendUpdated} className="btn btn-primary">
                      Update
                    </button>
                  </Modal.Footer>
                </Modal>
                <Modal show={show2} onHide={remove}>
                  <Modal.Header closeButton>
                    <Modal.Title>Confirmation</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div className="row">
                      <div className="col-12">
                        <h2 className="text-center">
                          Are You Sure You Want To Delete?
                        </h2>
                      </div>
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <button class="btn btn-secondary" onClick={remove}>
                      Close
                    </button>
                    <button onClick={deleteTerm} className="btn btn-primary">
                      Yes
                    </button>
                  </Modal.Footer>
                </Modal>
              </div>
              {term.length > 0 ? (
                <>
                  <div class="table-responsive">
                    <table class="table no-wrap">
                      <thead>
                        <tr>
                          <th class="border-top-0">#</th>
                          <th class="border-top-0">Name</th>
                          <th class="border-top-0">Starting Date</th>
                          <th class="border-top-0">Ending Date</th>
                          <th class="border-top-0">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {term.map((val, i) => {
                          return (
                            <>
                              <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{val.term_name}</td>
                                <td>{timeConverter(val.start_date)}</td>
                                <td class="txt-oflo">
                                  {timeConverter(val.end_date)}
                                </td>
                                <td>
                                  <ButtonGroup
                                    disableElevation
                                    variant="contained"
                                    color="primary "
                                  >
                                    <Button
                                      className="student-btn-up"
                                      onClick={() => update(val.id)}
                                    >
                                      <UpdateIcon className="text-white" />
                                    </Button>
                                    <Button
                                      className="student-btn-del"
                                      onClick={() => handleClick(val.id)}
                                    >
                                      <DeleteIcon className="text-white" />
                                    </Button>
                                  </ButtonGroup>
                                </td>
                              </tr>
                            </>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </>
              ) : (
                <>
                  <h2 class="text-center mt-3 secondary">Term</h2>
                  <hr class="new-hr1 secondary" />

                  <div class="row billing-main">
                    <div class="col-4 billing-box">
                      <TextField
                        type="date"
                        className="pb-3"
                        label="Starting Date"
                        onChange={(e) => setStartingdate(e.target.value)}
                        defaultValue="2021-01-01"
                        variant="filled"
                      />
                      <TextField
                        type="text"
                        className="pb-3"
                        label="Term Name"
                        onChange={(e) => setDescription(e.target.value)}
                        variant="filled"
                      />
                    </div>
                    <div class="col-4 billing-box">
                      <TextField
                        type="date"
                        className="pb-3"
                        label="Ending Date"
                        onChange={(e) => setEndingdate(e.target.value)}
                        defaultValue="2021-01-01"
                        variant="filled"
                      />
                    </div>
                  </div>
                  <div class="text-center my-4">
                    {" "}
                    <button
                      onClick={sendData}
                      class="btn btn-generate btn-success"
                    >
                      Submit
                    </button>
                  </div>
                </>
              )}
              <div style={{ overflow: "hidden" }}>
                {/* <Button variant="outlined" onClick={handleClickOpen}>
                  Open form dialog
                </Button> */}
                <Dialog
                  open={Clickopen}
                  style={{ overflow: "hidden" }}
                  onClose={handleClickClose}
                >
                  <div style={{ width: "590px", overflow: "hidden" }}>
                    <h2 class="text-center mt-3 secondary">Term</h2>
                    <hr class="new-hr1 secondary" />

                    <div class="row billing-main">
                      <div class="col-4 billing-box">
                        <TextField
                          type="date"
                          className="pb-3"
                          label="Starting Date"
                          onChange={(e) => setStartingdate(e.target.value)}
                          defaultValue="2021-01-01"
                          variant="filled"
                        />
                        <TextField
                          type="text"
                          className="pb-3"
                          label="Term Name"
                          onChange={(e) => setDescription(e.target.value)}
                          variant="filled"
                        />
                      </div>
                      <div class="col-4 billing-box">
                        <TextField
                          type="date"
                          className="pb-3"
                          label="Ending Date"
                          onChange={(e) => setEndingdate(e.target.value)}
                          defaultValue="2021-01-01"
                          variant="filled"
                        />
                      </div>
                    </div>
                    <div class="text-center my-4"> </div>
                    <DialogActions>
                      <Button onClick={handleClickClose}>Cancel</Button>
                      <button onClick={sendData} class="btn btn-success">
                        Submit
                      </button>
                    </DialogActions>
                  </div>
                </Dialog>
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
      </div>
    </>
  );
};
export default Term;
