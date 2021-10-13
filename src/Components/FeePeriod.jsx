import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Modal } from "react-bootstrap";
import axios from "axios";
import UpdateIcon from "@material-ui/icons/Update";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import logo from "./jb1.png";
import Snackbar from "@material-ui/core/Snackbar";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from "@material-ui/core/Typography";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "35ch",
    },
  },
  navigation: {
    marginTop: theme.spacing(2),
  },
}));

const FeePeriod = () => {
  const classes = useStyles();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [billing, setBilling] = useState("");
  const [validDate, setValidDate] = useState("");
  const [billingperiod, setBillingperiod] = useState([]);
  const [due, setDue] = useState("");
  const [prevdata, setPrevdata] = useState("");
  const [generate, setGenerate] = useState("");
  const [latefee, setLatefee] = useState("");
  const school_id = localStorage.getItem("school_id");
  const history = useHistory();
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  const handleClick = (id) => {
    localStorage.setItem("user_id", id);
    handleShow2();
  };
  const remove = () => {
    localStorage.removeItem("user_id");
    handleClose2();
  };
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

  const [start, setStartingdate] = useState("");
  const [startmonth, setStartingMonth] = useState("");
  const [startyear, setStartingYear] = useState("");
  useEffect(() => {
    axios
      .get(
        `http://fee-management-api.nastechltd.co/api/show_billing_period/${school_id}`
      )
      .then((response) => {
        console.log(response.data);
        setBillingperiod(response.data);
      })
      .catch((error) => {
        if (error.response) {
          setMessageinfo(error.response.data.message);
          handleMessage();
        }
      });

    var a = new Date();
    var year = a.getFullYear();
    var month = ("0" + (a.getMonth() + 1)).slice(-2);
    var date = ("0" + a.getDate()).slice(-2);
    setStartingdate(`${date}`);
    setStartingMonth(`${month}`);
    setStartingYear(`${year}`);
    console.log(`${year}-${month}-${date}`);
  }, []);
  const reload = () => {
    axios
      .get(
        `http://fee-management-api.nastechltd.co/api/show_billing_period/${school_id}`
      )
      .then((response) => {
        console.log(response.data);
        setBillingperiod(response.data);
      })
      .catch((error) => {
        if (error.response) {
          setMessageinfo(error.response.data.message);
          handleMessage();
        }
      });
  };
  const deletePeriod = (id) => {
    axios
      .delete(
        `http://fee-management-api.nastechltd.co/api/billing_period/${localStorage.getItem(
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
      .get(`http://fee-management-api.nastechltd.co/api/billing_period/${id}`)
      .then((response) => {
        console.log(response.data);
        setPrevdata(response.data);
        setDue(response.data.due_date);
        setGenerate(response.data.generation_date);
        setBilling(response.data.phase);
        setLatefee(response.data.late_fee_charge);
        setValidDate(response.data.valid_date);
        handleShow();
      })

      .catch((error) => {
        if (error.response) {
          setMessageinfo(error.response.data.message);
          handleMessage();
        }
      });
  };

  const sendUpdated = () => {
    if (billing < 0 || billing > 12) {
      setMessageinfo("Months Can Only Be From 1-12");
      handleMessage();
    } else if (billing === "") {
      setMessageinfo("Enter Billing Month(s)");
      handleMessage();
    } else if (generate === "") {
      setMessageinfo("Enter Generation date");
      handleMessage();
    } else if (due === "") {
      setMessageinfo("Enter Due date");
      handleMessage();
    } else if (latefee === "") {
      setMessageinfo("Enter Late Fee Charges");
      handleMessage();
    } else if (validDate === "") {
      setMessageinfo("Enter Valid Bank Date");
      handleMessage();
    } else if (validDate < 0 || validDate > 28) {
      setMessageinfo("Valid Bank Date can only be from 1-28");
      handleMessage();
    } else if (generate < 0 || generate > 28) {
      setMessageinfo("Generation date can only be from 1-28");
      handleMessage();
    } else if (due < 0 || due > 28) {
      setMessageinfo("Due date can only be from 1-28");
      handleMessage();
    } else if (latefee < 0) {
      setMessageinfo("charges can't be negative");
      handleMessage();
    } else {
      axios
        .put(
          `http://fee-management-api.nastechltd.co/api/billing_period/${prevdata.id}`,
          {
            phase: billing,
            generation_date: generate,
            due_date: due,
            valid_date: validDate,
            late_fee_charge: latefee,
            school_id: localStorage.getItem("school_id"),
          }
        )
        .then((response) => {
          console.log(response.data);
          setPrevdata("");
          setDue("");
          setGenerate("");
          setValidDate("");
          setBilling("");
          setLatefee("");
          handleClose();
          reload();
        })
        .catch((error) => {
          if (error.response) {
            setMessageinfo(error.response.data.message);
            handleMessage();
          }
        });
    }
  };
  const index = 0;
  function indexVariable() {
    return index + 1;
  }
  const data = {
    school_id: localStorage.getItem("school_id"),
    phase: billing,
    generation_date: generate,
    due_date: due,
    late_fee_charge: latefee,
    valid_date: validDate,
  };
  const sendData = () => {
    if (billing < 0 || billing > 12) {
      setMessageinfo("Months Can Only Be From 1-12");
      handleMessage();
    } else if (billing === "") {
      setMessageinfo("Enter Billing Month(s)");
      handleMessage();
    } else if (generate === "") {
      setMessageinfo("Enter Generation date");
      handleMessage();
    } else if (due === "") {
      setMessageinfo("Enter Due date");
      handleMessage();
    } else if (latefee === "") {
      setMessageinfo("Enter Late Fee Charges");
      handleMessage();
    } else if (validDate === "") {
      setMessageinfo("Enter Valid Bank Date");
      handleMessage();
    } else if (validDate < 0 || validDate > 28) {
      setMessageinfo("Valid Bank Date can only be from 1-28");
      handleMessage();
    } else if (generate < 0 || generate > 28) {
      setMessageinfo("Generation date can only be from 1-28");
      handleMessage();
    } else if (due < 0 || due > 28) {
      setMessageinfo("Due date can only be from 1-28");
      handleMessage();
    } else if (latefee < 0) {
      setMessageinfo("charges can't be negative");
      handleMessage();
    } else {
      axios
        .post(
          `http://fee-management-api.nastechltd.co/api/billing_period`,
          data
        )
        .then((response) => {
          console.log(response);
          setDue("");
          setGenerate("");
          setBilling("");
          setLatefee("");
          setValidDate("");
          reload();
        })
        .catch((error) => {
          if (error.response) {
            setMessageinfo(error.response.data.message);
            handleMessage();
          }
        });
    }
  };
  // console.log(billingperiod)

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
                    <i class="fas fa-users-class"></i>
                  </div>
                  <div class="icon-name">Class</div>
                </div>
              </Link>

              <Link class="nav-link" to="/students">
                <div class="folder-icons">
                  <div class="icon1">
                    <i class="fas fa-user-graduate "></i>
                  </div>
                  <div class="icon-name ">Students</div>
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
                    <i class="fas fa-money-check-alt active"></i>
                  </div>
                  <div class="icon-name active">Fee</div>
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
                    <i
                      class="              fas fa-shuttle-van
"
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
                <div class="big-inbox">Billing Period</div>
                <button onClick={logOut} class="btn text-bolder text-right">
                  Log Out
                </button>
              </div>
            </div>
            <hr class="new-hr" />
          </div>
          <div class="right-body">
            <div className={`${classes.navigation}`}>
              <Breadcrumbs
                separator={<NavigateNextIcon fontSize="small" />}
                aria-label="breadcrumb"
              >
                <Link
                  className="text-decoration-none"
                  color="inherit"
                  to="/feecomponents"
                >
                  Fee
                </Link>
                <Typography color="textPrimary">Fee Period</Typography>
              </Breadcrumbs>
            </div>
            <div class="message">
              <div class="add-student">
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Update Fee Period</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div class="row billing-main">
                      <div class="col-6 billing-box">
                        <TextField
                          className="pb-3"
                          type="number"
                          defaultValue={prevdata.phase}
                          onChange={(e) => setBilling(e.target.value)}
                          helperText="Month"
                          label="Fee Period"
                          variant="filled"
                        />
                        <TextField
                          className="pb-3"
                          type="text"
                          defaultValue={prevdata.due_date}
                          onChange={(e) => setDue(e.target.value)}
                          helperText="The day Fee to be expired"
                          label="Due Date"
                          variant="filled"
                        />
                        <TextField
                          className="pb-3"
                          type="number"
                          defaultValue={prevdata.valid_date}
                          onChange={(e) => setValidDate(e.target.value)}
                          helperText="Bank Expiry Date"
                          label="Valid Bank Date"
                          variant="filled"
                        />
                      </div>

                      <div class="col-6 billing-box">
                        <TextField
                          type="number"
                          className="pb-3"
                          defaultValue={prevdata.late_fee_charge}
                          onChange={(e) => setLatefee(e.target.value)}
                          helperText=" "
                          label="Late Fee Charges"
                          variant="filled"
                        />
                        <TextField
                          className="pb-3"
                          type="number"
                          defaultValue={prevdata.generation_date}
                          onChange={(e) => setGenerate(e.target.value)}
                          helperText="The day Fee to be Generated"
                          label="Generation Date"
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
                    <button onClick={deletePeriod} className="btn btn-primary">
                      Yes
                    </button>
                  </Modal.Footer>
                </Modal>
              </div>
              {billingperiod.length > 0 ? (
                <>
                  <div class="table-responsive">
                    <table class="table no-wrap">
                      <thead>
                        <tr>
                          <th class="border-top-0">#</th>
                          <th class="border-top-0">Phase</th>
                          <th class="border-top-0">Generation Date</th>
                          <th class="border-top-0">Due Date</th>
                          <th class="border-top-0">Valid Date</th>
                          <th class="border-top-0">Late Charges</th>
                          <th class="border-top-0">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {billingperiod.map((val, i) => {
                          console.log(startmonth);
                          return (
                            <>
                              <tr key={i}>
                                <td>{indexVariable()}</td>
                                <td>{val.phase}</td>

                                <td class="txt-oflo">
                                  {startmonth}-{val.generation_date}-{startyear}
                                </td>
                                <td class="txt-oflo">
                                  {startmonth}-{val.due_date}-{startyear}
                                </td>
                                <td class="txt-oflo">
                                  {startmonth}-{val.valid_date}-{startyear}
                                </td>
                                <td>{val.late_fee_charge}</td>
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
                  <hr class="new-hr1 secondary" />

                  <div class="row billing-main">
                    <div class="col-4 billing-box">
                      <TextField
                        className="pb-3"
                        type="text"
                        onChange={(e) => setBilling(e.target.value)}
                        helperText="Month"
                        label="Billing Period"
                        variant="filled"
                      />
                      <TextField
                        className="pb-3 bg-white"
                        type="text"
                        onChange={(e) => setDue(e.target.value)}
                        label="Due Date"
                        defaultValue={start}
                        variant="filled"
                      />
                      <TextField
                        className="pb-3"
                        type="text"
                        defaultValue={prevdata.due_date}
                        onChange={(e) => setValidDate(e.target.value)}
                        helperText="Bank Expiry Date"
                        label="Valid Bank Date"
                        variant="filled"
                      />
                    </div>
                    <div class="col-4 billing-box">
                      <TextField
                        type="number"
                        className="pb-3"
                        onChange={(e) => setLatefee(e.target.value)}
                        helperText=" "
                        label="Late Fee Charges"
                        variant="filled"
                      />
                      <TextField
                        className="pb-3"
                        type="text"
                        onChange={(e) => setGenerate(e.target.value)}
                        helperText="The day Fee to be Generated"
                        label="Issue Date"
                        variant="filled"
                      />
                    </div>
                  </div>

                  <div class="text-center my-4">
                    {" "}
                    <button
                      class="btn btn-generate btn-success"
                      onClick={sendData}
                    >
                      Submit
                    </button>
                  </div>
                </>
              )}
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
export default FeePeriod;
