import { React, useEffect, useState } from "react";
import "./dashboard.css";
import { Link, useHistory } from "react-router-dom";
import UpdateIcon from "@material-ui/icons/Update";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal } from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import logo from "./jb1.png";
import axios from "axios";
import MultiSelect from "react-multi-select-component";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Snackbar from "@material-ui/core/Snackbar";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "30ch",
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const MyExpense = () => {
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
  const [expensedata, setExpensedata] = useState([]);
  const [selected, setSelected] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const [sectiondata, setSectiondata] = useState([]);
  const [classdata, setClassdata] = useState([]);
  const [sectionid, setSectionid] = useState("");
  const [classid, setClassid] = useState("");
  const classes = useStyles();
  const [studentdata, setStudentdata] = useState([]);
  const [studentname, setStudentname] = useState();
  const [studentid, setStudentid] = useState("");
  const [charges, setCharges] = useState("");
  const [paid, setPaid] = useState();
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [inventory_id, setInventoryID] = useState("");
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
  useEffect(() => {
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
  }, []);
  useEffect(() => {
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

  const [inventorydata, setInventoryData] = useState([])
  useEffect(() => {
    axios
      .get(
        `http://fee-management-api.nastechltd.co/api/expense_tracking/${school_id}`
      )
      .then((response) => {
        console.log(response);
        setExpensedata(response.data);
      })
      .catch((error) => {
        if (error.response) {
          setMessageinfo(error.response.data.message);
          handleMessage();
        }
      });


      axios
      .get(`http://fee-management-api.nastechltd.co/api/inventory/${school_id}`)
      .then((response) => {
        console.log("salman",response.data);
        setInventoryData(response.data);
      })
      .catch((error) => {
        if (error.response) {
          setMessageinfo(error.response.data.message);
          handleMessage();
        }
     

      })
  }, []);
  const search = () => {
    axios
      .get(`http://fee-management-api.nastechltd.co/api/section/${classid}`)
      .then((response) => {
        console.log(response.data);
        setSectiondata(response.data);
      })
      .catch((error) => console.log(error));
  };
  const reset = () => {
    setClassid("");
    setSearchTerm("");
    setSectionid("");
  };
  const options = studentdata
    .filter((val) => {
      if (sectionid == "") {
        return val;
      } else if (val.section_id.toString().includes(sectionid)) {
        return val;
      }
    })
    .map((val) =>
      val.middle_name === null
        ? {
            label: `${val.first_name} ${val.last_name}`,
            value: val.id,
          }
        : {
            label: `${val.first_name} ${val.middle_name} ${val.last_name}`,
            value: val.id,
          }
    );

  // const handleCharges = (e) => {
  //     axios.get(`http://fee-management-api.nastechltd.co/api/user/${studentid}`)
  //         .then(response => {
  //             // console.log(response.data)
  //             setStudentname(`${response.data.first_name} ${response.data.middle_name} ${response.data.last_name}`);

  //         })
  //         .catch((error) => {
  //             if (error.response) {
  //  handleMessage();
  //             }
  //         })
  // }

  const data = {
    school_id: school_id,
    students: selected,
    charges: charges,
    description: description,
    quantity: quantity,
    inventory_id: inventory_id,
    paid: 0,
  };
  const sendData = () => {
    if (charges < 0) {
      setMessageinfo("charges can't be Negative");
      handleMessage();
    }else if (description == "") {
      setMessageinfo("Enter Description");
      handleMessage();
      
    } 
    else if (quantity == "") {
      setMessageinfo("Enter Quantity");
      handleMessage();
    }
    else if (inventory_id == "") {
      setMessageinfo("Enter Inventory ID");
      handleMessage();
    }
    else if (selected.length == 0) {
      setMessageinfo("Select Student(s)");
      handleMessage();
    } else {
      axios
        .post(
          `http://fee-management-api.nastechltd.co/api/expense_tracking`,
          data
        )
        .then((response) => {
          console.log(response);
          setDescription("");
          setSelected([]);
          setCharges("");
          setQuantity("");
          setInventoryID("");
          reset();
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

  const reload = () => {
    axios
      .get(
        `http://fee-management-api.nastechltd.co/api/expense_tracking/${school_id}`
      )
      .then((response) => {
        setExpensedata(response.data);
      })
      .catch((error) => {
        if (error.response) {
          setMessageinfo(error.response.data.message);
          handleMessage();
        }
      });
  };

  const sendpay = (id) => {
    axios
      .get(
        `http://fee-management-api.nastechltd.co/api/show_expense_tracking/${id}`
      )
      .then((response) => {
        console.log(response.data);
        axios
          .put(
            `http://fee-management-api.nastechltd.co/api/expense_tracking/${id}`,
            {
              description: response.data.description,
              // charges: response.data.charges,
              student_id: response.data.student_id,
              name: response.data.name,
              quantity:response.data.quantity,
              paid: 1,
            }
          )
          .then((response) => {
            console.log(response.data);
            reload();
          })
          .catch((error) => {
            if (error.response) {
              setMessageinfo(error.response.data.message);
              handleMessage();
            }
          });
      })
      .catch((error) => console.log(error));
  };

  const [alldata ,  setAllData] = useState("")
  const [updatechages ,  setUpadateCharges] = useState("")
  const [updateinventories ,  setUpadateInventories] = useState("")
  const update = (id) => {
    axios
      .get(
        `http://fee-management-api.nastechltd.co/api/show_expense_tracking/${id}`
      )
      .then((response) => {
        console.log(response.data);
       
        setCharges(response.data.charges);
    
        setAllData(response.data)
        setStudentname(response.data.name);
        setQuantity(response.data.quantity)
        setDescription(response.data.description);
        setUpadateCharges(response.data.charges);
        setUpadateInventories(response.data.inventory_id)
        localStorage.setItem("student_id", response.data.student_id);
        localStorage.setItem("student_update_id", response.data.id);
        setPaid(response.data.paid);
        handleShow1();
        //   setSection(response.data.name)
      })
      .catch((error) => {
        if (error.response) {
          setMessageinfo(error.response.data.message);
          handleMessage();
        }
      });
  };
  const sendUpdated = () => {
    if (charges < 0) {
      setMessageinfo("charges can't be Negative");
      handleMessage();
    }  else if (description == "") {
      setMessageinfo("Enter Description");
      handleMessage();
    } else {
      axios
        .put(
          `http://fee-management-api.nastechltd.co/api/expense_tracking/${localStorage.getItem(
            "student_update_id"
          )}`,
          {
          
            description: description,
            name: studentname,
            paid: paid,
            student_id: localStorage.getItem("student_id"),
            charges:updatechages,
            quantity: quantity,
            school_id: school_id,
            inventory_id: updateinventories
          
          }
        )
        .then((response) => {
          console.log(response);
          localStorage.removeItem("id");
          localStorage.removeItem("charges");
          localStorage.removeItem("description");
          localStorage.removeItem("name");
          localStorage.removeItem("student_id");
          setDescription("");
          setCharges("");
          reload();
          handleClose1();
        })
        .catch((error) => {
          if (error.response) {
            setMessageinfo(error.response.data.message);
            handleMessage();
          }
        });
    }
  };
  const deleteExpense = (id) => {
    axios
      .delete(
        `http://fee-management-api.nastechltd.co/api/expense_tracking/${localStorage.getItem(
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
                    <i class="fas fa-calendar-alt"></i>
                  </div>
                  <div class="icon-name">Term</div>
                </div>
              </Link>
              <Link class="nav-link" to="/expense">
                <div class="folder-icons">
                  <div class="icon1">
                    <i class="fas fa-receipt active"></i>
                  </div>
                  <div class="icon-name active">Expense Tracking</div>
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
                <div class="big-inbox">Expense Tracking</div>
                <button onClick={logOut} class="btn text-bolder text-right">
                  Log Out
                </button>
              </div>
            </div>
            <hr class="new-hr" />
          </div>
          <div class="right-body">
            {/* back to dashboard option*/}
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

            <div class="message">
              <div class="add-student">
                <div className="col-12">
                  <div className="float-start">
                    <TextField
                      className="pb-3 bg-white"
                      value={searchTerm}
                      type="text"
                      helperText="Search by Name"
                      onChange={(e) => setSearchTerm(e.target.value)}
                      label="Search Student"
                    />
                    <button
                      onClick={reset}
                      className="btn btn-primary mt-3 ml-5 mr-5"
                    >
                      Reset
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={handleShow}
                    class="btn btn-primary btn-lg float-end"
                  >
                    <AddIcon /> Add
                  </button>
                </div>
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title className="text-center">
                      Add Expense
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div class="row billing-main">
                      <div className="col-12">
                      <FormControl className={classes.formControl}>
                          <InputLabel id="demo-simple-select-label">
                            Class
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={classid}
                            onChange={(e) => setClassid(e.target.value)}
                          >
                            {classdata.map((val, i) => {
                              return (
                                <MenuItem
                                  value={val.id}
                                >{`${val.name}`}</MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>

                        <button
                          onClick={search}
                          className="btn btn-primary mt-3 ml-1"
                        >
                          Search
                        </button>
                       
                        <button
                          style={{ display: "none" }}
                          onClick={reset}
                          className="btn btn-primary mt-3 ml-2"
                        >
                          Reset
                        </button>
                      </div>
                      <div class="col-6 mt-2 billing-box">
                        <TextField
                          className="pb-3"
                          type="text"
                          label="Quantity"
                          onChange={(e) => setQuantity(e.target.value)}
                          variant="filled"
                        />
                      </div>

                      <div class="col-6 mt-2 billing-box" >
                      
                         <FormControl className={classes.formControl} style={{marginTop:"-0px"}} >
                          <InputLabel id="demo-simple-select-label">
                            Inventory List
                          </InputLabel>
                          <Select
                         variant="filled"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={inventory_id}
                            onChange={(e) => setInventoryID(e.target.value)}
                          >
                            {inventorydata.map((val, i) => {
                              return (
                                <MenuItem
                                  value={val.id}
                                >{`${val.name}`}</MenuItem>
                              );
                            })}
                          </Select>
                          
                        </FormControl>

                         
                      </div>


                      
                     


                      <div class="col-6 mt-2 billing-box">
                        <TextField
                          className="pb-3"
                          type="text"
                          label="Description"
                          onChange={(e) => setDescription(e.target.value)}
                          variant="filled"
                        />
                      </div>

                      <div class="col-6 mt-2 billing-box" >
                     
                        <MultiSelect
                        
                          className="mb-1"
                          options={options}
                          value={selected}
                          onChange={setSelected}
                          labelledBy={"Select"}
                        />
                      </div>

                      
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <button
                      class="btn btn-secondary"
                      onClick={(e) => {
                        handleClose();
                        reset();
                      }}
                    >
                      Close
                    </button>
                    <button onClick={sendData} className="btn btn-primary">
                      Create
                    </button>
                  </Modal.Footer>
                </Modal>
                <Modal show={show1} onHide={handleClose1}>
                  <Modal.Header closeButton>
                    <Modal.Title className="text-center">
                      Update Expense
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div class="row billing-main">
                      

                      <div class="col-6 billing-box">
                        <TextField
                          className="pb-3"
                          type="text"
                          defaultValue={alldata.name}
                          label="Name"
                          onChange={(e) => setStudentname(e.target.value)}
                          variant="filled"
                        />
                      </div>
                      <div class="col-6 billing-box">
                        <TextField
                          className="pb-3"
                          type="text"
                          defaultValue={alldata.quantity}
                          label="Quantity"
                          onChange={(e) => setQuantity(e.target.value)}
                          variant="filled"
                        />
                      </div>
                      <div class="col-6 billing-box">
                        <TextField
                          className="pb-3"
                          type="text"
                          defaultValue={alldata.description}
                          label="Description"
                          onChange={(e) => setDescription(e.target.value)}
                          variant="filled"
                        />
                      </div>
                     
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <button class="btn btn-secondary" onClick={handleClose1}>
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
                    <button onClick={deleteExpense} className="btn btn-primary">
                      Yes
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
                      <th class="border-top-0">Quantity</th>
                      <th class="border-top-0">Charged</th>
                      <th class="border-top-0">Status</th>
                      <th class="border-top-0">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {expensedata
                      .filter((val) => {
                        if (searchTerm === "") {
                          return val;
                        } else if (
                          `${val.first_name} ${val.middle_name} ${val.last_name}`
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase())
                        ) {
                          return val;
                        }
                      })
                      .map((val, i) => {
                        return (
                          <>
                            <tr key={i}>
                              <td>{i + 1}</td>
                              <td class="txt-oflo print-capitalize">
                                {val.name}
                              </td>
                              <td className="print-capitalize">
                                {val.description}
                              </td>
                              <td>{val.quantity}</td>
                              <td>{val.charges}</td>
                              <td>
                                {val.paid == 1 ? (
                                  <span class="text-primary text-bolder">
                                    Paid
                                  </span>
                                ) : (
                                  <ButtonGroup
                                    disableElevation
                                    variant="contained"
                                    color="primary"
                                  >
                                    <Button
                                      className="expense-btn-p "
                                      onClick={() => sendpay(val.id)}
                                    >
                                      <span class="text-white text-bolder mb-1">
                                        Pay
                                      </span>
                                    </Button>
                                  </ButtonGroup>
                                )}
                              </td>
                              {val.paid == 1 ? (
                                <td>
                                  <ButtonGroup
                                    disableElevation
                                    variant="contained"
                                    color="primary"
                                  >
                                    <Button
                                      style={{ visibility: "hidden" }}
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
                              ) : (
                                <td>
                                  <ButtonGroup
                                    disableElevation
                                    variant="contained"
                                    color="primary"
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
                              )}
                            </tr>
                          </>
                        );
                      })}
                  </tbody>
                </table>
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
      </div>
    </>
  );
};
export default MyExpense;
