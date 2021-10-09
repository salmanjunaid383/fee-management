import { Link, useHistory } from "react-router-dom";
import logo from "./jb1.png";
import axios from "axios";
import { useState } from "react";
const ExpenseRecord = () => {
  const history = useHistory();
  const [alldata, setAllData] = useState([]);
  const logOut = () => {
    localStorage.clear();
    history.push("/");
  };

  function expense(value) {
    axios
      .post(`http://fee-management-api.nastechltd.co/api/ledger_report`, {
        school_id: localStorage.getItem("school_id"),
        value: value,
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
                    <i class="fas fa-columns active"></i>
                  </div>
                  <div class="icon-name1 active">Dashboard</div>
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

              <Link class="nav-link" to="/feecomponents">
                <div class="folder-icons">
                  <div class="icon1">
                    <i class="fas fa-money-check-alt"></i>
                  </div>
                  <div class="icon-name">Fee</div>
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
                <div class="big-inbox print-capitalize">Voucher Record</div>
                <button onClick={logOut} class="btn text-bolder text-right">
                  Log Out
                </button>
              </div>
            </div>
            <hr class="new-hr" />
          </div>
          <a href="/campusdashboard" style={{ textDecoration: "none" }}>
            <div
              className="col-xl-2 dash-button"
              style={{
                marginBottom: "20px",
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "center",
                padding: "6px",
                color: "#fff",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              <i class="fas fa-tachometer-alt" style={{ fontSize: "25px" }}></i>
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
          <div className="container">
            <div className="row">
              <div className="col-md-3">
                <button
                  className="btn btn-primary"
                  onClick={(e) => {
                    expense("one_day");
                  }}
                >
                  Today
                </button>
              </div>
              <div className="col-md-3">
                <button
                  className="btn btn-primary"
                  onClick={(e) => {
                    expense("last_seven");
                  }}
                >
                  7 Days
                </button>
              </div>
              <div className="col-md-3">
                <button
                  className="btn btn-primary"
                  onClick={(e) => {
                    expense("month");
                  }}
                >
                  Month
                </button>
              </div>
              <div className="col-md-3">
                <button
                  className="btn btn-primary"
                  onClick={(e) => {
                    expense("over_all");
                  }}
                >
                  OverAll
                </button>
              </div>
            </div>
          </div>

          <br />
          <br />

          <div class="table-responsive">
            <table class="table no-wrap">
              <thead>
                <tr>
                  <th class="border-top-0">#</th>
                  <th class="border-top-0">Date</th>
                  <th class="border-top-0">Descrition</th>
                  <th class="border-top-0">Debit</th>
                  <th class="border-top-0">Credit</th>
                  <th class="border-top-0">Balance</th>
                </tr>
              </thead>
              <tbody>
                {alldata.map((val, i) => {
                  return (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{val.date}</td>
                      <td>{val.description}</td>
                      {val.debcred == "C" ? <td></td> : <td>{val.amount}</td>}
                      {val.debcred == "D" ? <td></td> : <td>{val.amount}</td>}
                      <td>{val.balance}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
export default ExpenseRecord;
