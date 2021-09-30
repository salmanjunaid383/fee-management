import { React, useEffect, useState } from "react";
import "./dashboard.css";
import { Link, useHistory, useParams } from "react-router-dom";
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
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import styleFunctionSx from "@mui/system/styleFunctionSx";

const StudentDashboard = () => {
  const [schooldata, setSchooldata] = useState([]);
  const [isOppened, setIsOppened] = useState();
  const [totalClasses, setTotalClasses] = useState();
  const [totalStudents, setTotalStudents] = useState();
  const [totalEmployees, setTotalEmployees] = useState();
  const [totalDefaulters, setTotalDefaulters] = useState();
  const [totalAdmissions, setTotalAdmissions] = useState();
  const { studentid } = useParams();
  const school_id = localStorage.getItem("school_id");
  // const admin_id = localStorage.getItem("admin_id");
  const history = useHistory();
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
        `http://fee-management-api.nastechltd.co/api/show_school/${school_id}`
      )
      .then((response) => {
        // console.log(response.data.is_oppend)
        setSchooldata(response.data);
        setIsOppened(response.data.is_oppend);
      })
      .catch((error) => {
        if (error.response) {
          setMessageinfo(error.response.data.message);
          handleMessage();
        }
      });
    axios
      .get(
        `http://fee-management-api.nastechltd.co/api/total_classes/${school_id}`
      )
      .then((response) => {
        // console.log(response.data.is_oppend)
        setTotalClasses(response.data);
      })
      .catch((error) => {
        if (error.response) {
          setMessageinfo(error.response.data.message);
          handleMessage();
        }
      });
    axios
      .get(
        `http://fee-management-api.nastechltd.co/api/total_defaulter/${school_id}`
      )
      .then((response) => {
        console.log(response.data);
        setTotalDefaulters(response.data);
      })
      .catch((error) => {
        if (error.response) {
          setMessageinfo(error.response.data.message);
          handleMessage();
        }
      });
    axios
      .get(
        `http://fee-management-api.nastechltd.co/api/total_students/${school_id}`
      )
      .then((response) => {
        // console.log(response.data)
        setTotalStudents(response.data);
      })
      .catch((error) => {
        if (error.response) {
          setMessageinfo(error.response.data.message);
          handleMessage();
        }
      });
    axios
      .get(
        `http://fee-management-api.nastechltd.co/api/total_employees/${school_id}`
      )
      .then((response) => {
        // console.log(response.data)
        setTotalEmployees(response.data);
      })
      .catch((error) => {
        if (error.response) {
          setMessageinfo(error.response.data.message);
          handleMessage();
        }
      });
    axios
      .get(
        `http://fee-management-api.nastechltd.co/api/pending_admissions/${school_id}`
      )
      .then((response) => {
        // console.log(response.data)
        setTotalAdmissions(response.data);
      })
      .catch((error) => {
        if (error.response) {
          setMessageinfo(error.response.data.message);
          handleMessage();
        }
      });
  }, []);
  // useEffect(() => {
  // axios.get(`http://fee-management-api.nastechltd.co/api/student/${school_id}`)
  //     .then(response => {
  //         console.log(response);
  //         setStudentdata(response.data);
  //     })
  //     .catch((error) => {
  //         if (error.response) {
  //             alert(error.response.data.message);
  //         }
  //     })

  // }, [])
  // useEffect(() => {
  //     axios.get(`http://fee-management-api.nastechltd.co/api/schools/${admin_id}`)
  //         .then(response => {
  //             console.log(response.data)
  //             setSchooldata(response.data)
  //         })
  //         .catch((error) => {
  //             if (error.response) {
  //                 alert(error.response.data.message);
  //             }
  //         })
  // }, [])

  const logOut = () => {
    localStorage.clear();
    history.push("/");
  };

  const openAdmission = () => {
    axios
      .put(
        `http://fee-management-api.nastechltd.co/api/admission_open/${school_id}`
      )
      .then((response) => {
        console.log(response);
        axios
          .get(
            `http://fee-management-api.nastechltd.co/api/show_school/${school_id}`
          )
          .then((response) => {
            console.log(response.data.is_oppend);
            setIsOppened(response.data.is_oppend);
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
  return (
    <>
      <div class="dashboard">
        <div class="left">
          <div class="navigation">
            <div class="wrapper2">
              <div class="abilan">
                <img src={logo} />
              </div>

              <Link class="nav-link" to={`/studentdashboard/${studentid}`}>
                <div class="folder-icons">
                  <div class="icon1">
                  <i class="fas fa-tachometer-alt active"></i>
                  </div>
                  <div class="icon-name active">Dashboard</div>
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
            </div>
          </div>
        </div>
        <div class="right-side">
          <div class="right-header">
            <div class="top-bar">
              <div class="top-bar-justify">
                <div class="big-inbox print-capitalize">{schooldata.name}</div>
                <button onClick={logOut} class="btn text-bolder text-right">
                  Log Out
                </button>
              </div>
            </div>
            <hr class="new-hr" />
          </div>
         

          <div class="right-body">
            <div class="campus-sts">
              <div className="show_fee p-5">
                <div
                  class="card p-2 shadow"
                  style={{ width: "19rem", height: "8rem" }}
                >
                  <div class="row card-body w-100">
                    <div className="float-start col-8">
                      <h4>Pending Admissions</h4>
                      <p className="text-bold text-danger">{totalAdmissions}</p>
                    </div>
                    <div className="float-end mb-2 col-4">
                      <i class="txt-icon fas fa-5x fa-user-plus"></i>
                    </div>
                  </div>
                </div>
                <div
                  class="card p-2 shadow"
                  style={{ width: "19rem", height: "8rem" }}
                >
                  <div class="card-body w-100">
                    <div className="float-start ">
                      <h3>Defaulters</h3>
                      <p className="text-danger">{totalDefaulters}</p>
                    </div>
                    <div className="float-end mb-2">
                      <i class="txt-icon fas fa-5x fa-user-slash"></i>
                    </div>
                  </div>
                </div>

                {/* salman changes  */}

                <div
                  class="card p-2 shadow"
                  style={{ width: "19rem", height: "8rem" }}
                >
                  <div class="card-body w-100">
                    <div className="float-start ">
                      <h3>Today</h3>
                      <p>{totalEmployees}</p>
                    </div>
                    <div className="float-end mb-2">
                      <i class="fas fa-calendar-day fa-5x "></i>
                    </div>
                  </div>
                </div>

                <div
                  class="card p-2 shadow"
                  style={{ width: "19rem", height: "8rem" }}
                >
                  <div class="card-body w-100">
                    <div className="float-start ">
                      <h3>Last Week</h3>
                      <p>{totalEmployees}</p>
                    </div>
                    <div className="float-end mb-2">
                      <i class="fas fa-calendar-week fa-5x"></i>
                    </div>
                  </div>
                </div>

                <div
                  class="card p-2 shadow"
                  style={{ width: "19rem", height: "8rem" }}
                >
                  <div class="card-body w-100">
                    <div className="float-start ">
                      <h3>This Month</h3>
                      <p>{totalEmployees}</p>
                    </div>
                    <div className="float-end mb-2">
                      <i class="fas fa-calendar-alt fa-5x"></i>
                    </div>
                  </div>
                </div>

                <div
                  class="card p-2 shadow"
                  style={{ width: "19rem", height: "8rem" }}
                >
                  <div class="card-body w-100">
                    <div className="float-start ">
                      <h3>Overall</h3>
                      <p>{totalEmployees}</p>
                    </div>
                    <div className="float-end mb-2">
                      <i class="fas fa-list-alt fa-5x "></i>
                    </div>
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
        </div>
      </div>
    </>
  );
};
export default StudentDashboard;
