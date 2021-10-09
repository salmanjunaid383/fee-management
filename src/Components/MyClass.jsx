import { React, useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import axios from "axios";
import logo from "./jb1.png";
import "./dashboard.css";
import UpdateIcon from "@material-ui/icons/Update";
import LaunchIcon from "@material-ui/icons/Launch";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { Modal } from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import Snackbar from "@material-ui/core/Snackbar";

const MyClass = () => {
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
  const handleClick = (id) => {
    localStorage.setItem("user_id", id);
    handleShow2();
  };
  const remove = () => {
    localStorage.removeItem("user_id");
    handleClose2();
  };
  const [sections, setSections] = useState([{ name: "" }]);
  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...sections];
    list[index][name] = value;
    setSections(list);
  };
  const handleAdd = () => {
    setSections([...sections, { name: "" }]);
  };
  const removeField = (index) => {
    const list = [...sections];
    list.splice(index, 1);
    setSections(list);
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

  const data = {
    name: schoolClass,
    school_id: localStorage.getItem("school_id"),
    sections: sections,
  };
  const sendData = (e) => {
    if (schoolClass === "") {
      setMessageinfo("Enter Class");
      handleMessage();
    } else if (sections[0].name === "") {
      setMessageinfo("Enter Section(s)");
      handleMessage();
    } else {
      axios
        .post("http://fee-management-api.nastechltd.co/api/schools_class", data)
        .then((response) => {
          console.log(response);
          console.log(response.data.id);
          setSchoolClass();
          setSections([{ name: "" }]);
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
  };
  const deleteClass = (id) => {
    axios
      .delete(
        `http://fee-management-api.nastechltd.co/api/schools_class/${localStorage.getItem(
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
      .get(`http://fee-management-api.nastechltd.co/api/show_class/${id}`)
      .then((response) => {
        console.log(response.data);
        setPrevdata(response.data);
        setSchoolClass(response.data.name);
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
    if (schoolClass === "") {
      setMessageinfo("Enter Class");
      handleMessage();
    } else {
      axios
        .put(
          `http://fee-management-api.nastechltd.co/api/schools_class/${prevdata.id}`,
          {
            name: schoolClass,
          }
        )
        .then((response) => {
          console.log(response);
          setPrevdata("");
          setSchoolClass();
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
                <div class="big-inbox">Classes</div>
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
                  <AddIcon /> Add Class
                </button>
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Add Class</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div class="row billing-main">
                      <div class="col-6 billing-box">
                        <TextField
                          className="pb-3 bg-white"
                          type="text"
                          onChange={(e) => setSchoolClass(e.target.value)}
                          label="Class"
                          variant="filled"
                        />
                      </div>
                    </div>
                    {sections.map((item, i) => {
                      return (
                        <>
                          <div key={i} class="row mb-2 billing-main">
                            <div class="col-6">
                              <TextField
                                className="pb-3 bg-white"
                                name="name"
                                type="text"
                                onChange={(e) => handleChange(e, i)}
                                label="Section"
                                variant="filled"
                              />
                            </div>
                            <div class="col-2 text-right p-0">
                              {sections.length - 1 === i && (
                                <button
                                  type="button"
                                  onClick={handleAdd}
                                  class="btn btn-primary mt-3"
                                >
                                  More
                                </button>
                              )}
                            </div>
                            <div className="col-2 text-left p-0">
                              {sections.length !== 1 && (
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
                          <div className="row billing-main"></div>
                        </>
                      );
                    })}
                  </Modal.Body>
                  <Modal.Footer>
                    <button class="btn btn-secondary" onClick={handleClose}>
                      Close
                    </button>
                    <button onClick={sendData} className="btn btn-primary">
                      Create
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
                          onChange={(e) => setSchoolClass(e.target.value)}
                          label="Class"
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
                      <th class="border-top-0">Class</th>
                      <th class="border-top-0">Section</th>
                      <th class="border-top-0">Created At</th>
                      <th class="border-top-0">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {classdata.map((val, i) => {
                      return (
                        <>
                          <tr key={i}>
                            <td>{i + 1}</td>
                            <td class="txt-oflo">{val.name}</td>

                            <td>
                              <Link to="/section">
                                <button
                                  class="btn"
                                  onClick={() => {
                                    localStorage.setItem("class_id", val.id);
                                    localStorage.setItem(
                                      "class_name",
                                      val.name
                                    );
                                  }}
                                >
                                  <LaunchIcon />
                                </button>
                              </Link>
                            </td>

                            <td>{val.created_at.slice(0, 10)}</td>
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
export default MyClass;
