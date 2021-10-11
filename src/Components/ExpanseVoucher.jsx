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

const ExpanseVoucher = () => {
    const [voucherNo,setVoucherNo]=useState("")
    const[voucher,setVoucher]=useState([])
    const history = useHistory();
    const logOut = () => {
        localStorage.clear();
        history.push("/");
    }
    function submitVoucher(){
        
    }
    useEffect(() => {
        axios.get('http://fee-management-api.nastechltd.co/api/cashable_voucher/'+localStorage.getItem("school_id"))
        .then( (response) => {
            setVoucher(response.data);
            console.log(response.data);
        }, (error) => {
            console.log(error)
        })
    },[])

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

              {/* <Link class="nav-link" to="/AssetsBorrow">
                <div class="folder-icons">
                  <div class="icon1">
                    <i class="fas fa-book-reader"></i>
                  </div>
                  <div class="icon-name">Assets Borrow</div>
                </div>
              </Link> */}

              <Link class="nav-link" to="/ExpenseVoucher">
                <div class="folder-icons">
                  <div class="icon1">
                    <i class="fas fa-book-reader active"></i>
                  </div>
                  <div class="icon-name active"> Expense Voucher</div>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div class="right-side">
          <div class="right-header">
            <div class="top-bar">
              <div class="top-bar-justify">
                <div class="big-inbox">Voucher</div>
                <button onClick={logOut} class="btn text-bolder text-right">
                  Log Out
                </button>
              </div>
            </div>
            <hr class="new-hr" />
          </div>
          <div class="right-body">
            <div className="container">
                <div className="row align-items-end">
                  <div className="col-3">
                  <TextField
                          className=""
                          type="text"
                          onChange={(e) => setVoucherNo(e.target.value)}
                          label="Voucher Number"
                          
                        />
                  </div>
                  <div className="col-2">
                  <button className={'btn btn-primary align-bottom'} onClick={submitVoucher}>Submit</button>
                  </div>
                  
                </div>
                <div className="row">
                <div class="table-responsive">
            <table class="table no-wrap">
              <thead>
                <tr>
                <th class="border-top-0">#</th>
                  <th class="border-top-0">Voucher No</th>
                  <th class="border-top-0">Amount</th>
                  <th class="border-top-0">Issue Date</th>
                  <th class="border-top-0">Due Date</th>
                  <th class="border-top-0">Student Id</th>
                  <th class="border-top-0">Paid On</th>
                </tr>
              </thead>
              <tbody>
                {voucher.map((val, i) => {
                  return (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td><Link to={"/ExpenseForm/"+val.voucher_no}>{val.voucher_no}</Link></td>
                      <td>{val.final_amount}</td>
                      <td>{val.issue_date}</td>
                      <td>{val.due_date}</td>
                      <td>{val.student_id}</td>
                      <td>{val.paid_on}</td>    
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ExpanseVoucher;
