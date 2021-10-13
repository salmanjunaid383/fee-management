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

const AssetsBorrow = () => {
  const [schoolClass, setSchoolClass] = useState();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const [classdata, setClassdata] = useState([]);
  const history = useHistory();
  const [prevdata, setPrevdata] = useState("");
  const school_id = localStorage.getItem("school_id");
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  const [givenby, setGIVENBY] = useState("")
  const [description, setDescription] = useState("")
  const [inventory_id, setInventoryID] = useState("")
  const [user_id, setUserID] = useState("")
  const classes = useStyles();
  const handleClick = (id) => {
    localStorage.setItem("asset_id", id);
    handleShow2();
  };
  const remove = () => {
    localStorage.removeItem("asset_id");
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



  const [name, setName] = useState("");

  const [quantity, setQunatity] = useState("");
  const [inventorydata, setInventoryData] = useState([])
  const [userdata, setUserData] = useState([])
//   const [price, setPrice] = useState("");

  const data = 
    {
      given_by:givenby ,
      quantity: quantity,
      user_id:user_id,
      school_id: school_id,
      assets_id:inventory_id,
      description : description
    }
  
    const [feildvalue, setFieldValue] = useState("student")

  useEffect(() => {
    axios
      .get(`http://fee-management-api.nastechltd.co/api/assets_borrow/${school_id}`)
      .then((response) => {
        console.log("salman",response.data);
        setClassdata(response.data);
      })
      .catch((error) => {
        if (error.response) {
          setMessageinfo(error.response.data.message);
          handleMessage();
        }
      });


      axios
      .get(`http://fee-management-api.nastechltd.co/api/assets/${school_id}`)
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

  function userid(field){
    console.log(field)
    axios
    .post(`http://fee-management-api.nastechltd.co/api/assets_user/${school_id}`,{
      value:field
    })
    .then((response) => {
      console.log("salman",response.data);
      setUserData(response.data);
      console.log(userdata)
    })
    .catch((error) => {
      if (error.response) {
        setMessageinfo(error.response.data.message);
        handleMessage();
      }
    })
  }

  function sendData() {
    
    console.log(data);
 
    axios
      .post(`http://fee-management-api.nastechltd.co/api/assets_borrow`, data)
      .then((response) => {
        console.log(response.data);
        handleClose();
        axios
        .get(`http://fee-management-api.nastechltd.co/api/assets_borrow/${school_id}`)
        .then((response) => {
          console.log("salman",response.data);
          setClassdata(response.data);
        })
        .catch((error) => {
          if (error.response) {
            setMessageinfo(error.response.data.message);
            handleMessage();
          }
        });
      })
      .catch((error) => {
        if (error.response) {
          setMessageinfo(error.response.data.message);
          handleMessage();
        }
      });
  }
// }

  const deleteClass = () => {
    axios
      .delete(
        `http://fee-management-api.nastechltd.co/api/assets/${localStorage.getItem(
          "asset_id"
        )}`
      )
      .then((response) => {
        console.log(response);
        remove();
        axios
        .get(`http://fee-management-api.nastechltd.co/api/assets/${school_id}`)
        .then((response) => {
          console.log("salman",response.data);
          setClassdata(response.data);
        })
        .catch((error) => {
          if (error.response) {
            setMessageinfo(error.response.data.message);
            handleMessage();
          }
        });
      
        
       
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

  const update = (id) => {
    axios
      .get(`http://fee-management-api.nastechltd.co/api/show_assets/${id}`)
      .then((response) => {
        console.log(response.data);
        setPrevdata(response.data);
        setName(response.data.name);
        
        setQunatity(response.data.quantity);
        // setPrice(response.data.price);
        handleShow1();
      })
      .catch((error) => {
        if (error.response) {
          setMessageinfo(error.response.data.message);
          handleMessage();
        }
      });
  };

  const sendUpdated = () => {
  
      axios
        .put(
          `http://fee-management-api.nastechltd.co/api/assets/${prevdata.id}`,
          {
            name: name,
           
            quantity:quantity,
            school_id:school_id,
            // price:price
          }
        )
        .then((response) => {
          console.log(response);
          setPrevdata("");
          setSchoolClass();
          handleClose1();

          axios
        .get(`http://fee-management-api.nastechltd.co/api/assets/${school_id}`)
        .then((response) => {
          console.log("salman",response.data);
          setClassdata(response.data);
        })
        .catch((error) => {
          if (error.response) {
            setMessageinfo(error.response.data.message);
            handleMessage();
          }
        });

        })
        .catch((error) => {
          if (error.response) {
            setMessageinfo(error.response.data.message);
            handleMessage();
          }
        });
    }
  

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
                    <i class="fas fa-users-class "></i>
                  </div>
                  <div class="icon-name ">Class</div>
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
                    <i class="fas fa-shuttle-van"></i>
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
                    <i class="fas fa-book-reader active"></i>
                  </div>
                  <div class="icon-name active">Assets Borrow</div>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div class="right-side">
          <div class="right-header">
            <div class="top-bar">
              <div class="top-bar-justify">
                <div class="big-inbox">Assests Borrow</div>
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
                <button
                  type="button"
                  onClick={handleShow}
                  class="btn btn-primary btn-lg"
                >
                  <AddIcon /> add 
                </button>
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Add Assets</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div class="col-12">
                      <TextField
                        style={{ width: "100%" }}
                        className="pb-3 bg-white"
                        name="name"
                        type="text"
                        label="Given By"
                        variant="filled"
                        onChange={(e) => setGIVENBY(e.target.value)}
                      />
                    </div>

                    <div class="col-12">
                      <TextField
                        style={{ width: "100%" }}
                        className="pb-3 bg-white"
                        name="name"
                        type="text"
                        label="Description"
                        variant="filled"
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>

                    <div class="col-12">
                      <TextField
                        style={{ width: "100%" }}
                        className="pb-3 bg-white"
                        name="quantity"
                        type="number"
                        label="Quantity"
                        variant="filled"
                        onChange={(e) => setQunatity(e.target.value)}
                      />
                    </div>

                    <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="voucher"
                          value="student"
                          onChange={(e) => {setFieldValue(e.target.value); userid("student")}}
                         
                        />
                        <label
                          className="form-check-label"
                          for="male"
                          style={{ marginRight: "10px" }}
                        >
                          Student
                        </label>
                        <input
                          className="form-check-input"
                          type="radio"
                          name="voucher"
                          
                          value="finance"
                          onChange={(e) => {setFieldValue(e.target.value); userid("finance")}}
                       
                        />
                        <label className="form-check-label" for="female">
                          Finance
                        </label>
                      </div>

                    <div class="col-6 mt-2 billing-box" >
                      
                      <FormControl className={classes.formControl} style={{marginTop:"-0px"}} >
                       <InputLabel id="demo-simple-select-label">
                         Assets List
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

                   <div class="col-6 mt-2 billing-box" >
                      
                      <FormControl className={classes.formControl} style={{marginTop:"-0px"}} >
                       <InputLabel id="demo-simple-select-label">
                         Assets List
                       </InputLabel>
                       <Select
                      variant="filled"
                         labelId="demo-simple-select-label"
                         id="demo-simple-select"
                         value={user_id}
                         onChange={(e) => setUserID(e.target.value)}
                       >
                         {userdata.map((val, i) => {
                           return (
                             <MenuItem
                               value={val.id}
                             >{`${val.first_name}`}</MenuItem>
                           );
                         })}
                       </Select>
                       
                     </FormControl>

                      
                   </div>

                   
                  </Modal.Body>
                  <Modal.Footer>
                    <button class="btn btn-secondary" onClick={handleClose}>
                      Close
                    </button>
                    <button onClick={sendData} className="btn btn-primary">
                      Send
                    </button>
                  </Modal.Footer>
                </Modal>
                <Modal show={show1} onHide={handleClose1}>
                  <Modal.Header closeButton>
                    <Modal.Title>Update Class</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div class="row billing-main">
                      <div class="col-6 billing-box">
                        <TextField
                          className="pb-3 bg-white"
                          type="text"
                          defaultValue={prevdata.name}
                          onChange={(e) => setName(e.target.value)}
                          label="Name"
                          variant="filled"
                        />
                      </div>
                    </div>

                    {/* <div class="row billing-main">
                      <div class="col-6 billing-box">
                        <TextField
                          className="pb-3 bg-white"
                          type="text"
                          defaultValue={prevdata.description}
                          onChange={(e) => setDescription(e.target.value)}
                          label="Description"
                          variant="filled"
                        />
                      </div>
                    </div> */}

                    <div class="row billing-main">
                      <div class="col-6 billing-box">
                        <TextField
                          className="pb-3 bg-white"
                          type="number"
                          defaultValue={prevdata.quantity}
                          onChange={(e) => setQunatity(e.target.value)}
                          label="Quantity"
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
                    <button onClick={deleteClass} className="btn btn-primary">
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
                      <th class="border-top-0">Given By</th>
                   
                      <th class="border-top-0">Quantity</th>
                      <th class="border-top-0">Description</th>
                      <th class="border-top-0">Borrowed Assets</th>
                      
                      <th class="border-top-0">Action</th>
                      

                    </tr>
                  </thead>

                   {/* <tbody>
                    {classdata.map((val, i) => {
                      return (
                        <>
                          <tr key={i}>
                            <td>{i + 1}</td>
                            <td class="txt-oflo">{val.given_by}</td>
                           
                            <td class="txt-oflo">{val.quantity}</td>
                            <td class="txt-oflo">{val.price}</td> 
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
                        
                            
                          </tr>
                        </>
                      );
                    })}
                  </tbody> */}
            
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
export default AssetsBorrow;
