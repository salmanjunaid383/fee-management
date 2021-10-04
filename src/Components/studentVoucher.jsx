import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useHistory, useParams } from "react-router-dom";
import "./AdminAttendance.css";
import TextField from "@material-ui/core/TextField";
import logo from "../Components/jb1.png";

const StudentVoucher = () => {
    const { studentid } = useParams();
  const [allpaidvoucher, setAllPaidVoucher] = useState([]);
  const history = useHistory();
  const logOut = () => {
    localStorage.clear();
    history.push("/");
  };

  useEffect(() => {
    axios
      .get(
        `http://fee-management-api.nastechltd.co/api/student_paid_fee_voucher/${studentid}`
      )
      .then((response) => {
        console.log("paid", response.data);
        setAllPaidVoucher(response.data);
        console.log(studentid);
        if(response.data.length == 0){
            alert("no pending vouchers")
        }
      })
      .catch((error) => {
        alert(error.data)
      });

  }, []);

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
                    <i class="fas fa-tachometer-alt"></i>
                  </div>
                  <div class="icon-name">Dashboard</div>
                </div>
              </Link>

              <Link class="nav-link" to={`/student-profile/${studentid}`}>
                <div class="folder-icons">
                  <div class="icon1">
                    <i class="fas fa-user-circle "></i>
                  </div>
                  <div class="icon-name ">Profile</div>
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

              <Link class="nav-link" to={`/studentVoucher/${studentid}`}>
                <div class="folder-icons">
                  <div class="icon1">
                    <i class="fas fa-file-alt active"></i>
                  </div>
                  <div class="icon-name active">Student Vouchers</div>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div class="right-side">
          <div class="right-header">
            <div class="top-bar">
              <div class="top-bar-justify">
                <div class="big-inbox">Student Ledger</div>
                <button onClick={logOut} class="btn text-bolder text-right">
                  Log Out
                </button>
              </div>
            </div>
            <hr class="new-hr" />
          </div>
         
          <div className="right-body">
              <div className="row" style={{margin:"0px"}}>
          <div className="col-xl-12" style={{display:"flex" , justifyContent:"flex-end"}}>
                <Link to={`/studentUnpaidVoucher/${studentid}`}>  <button className="btn btn-primary">View Unpaid Vouchers</button></Link>
              </div>
              </div>
              
          <div class="table-responsive" style={{marginTop:"20px"}}>
            <table class="table no-wrap">
              <thead>
                <tr>
                  <th class="border-top-0">#</th>
                  <th class="border-top-0">Voucher No.</th>
                  <th class="border-top-0">Amount</th>
                  <th class="border-top-0">Voucher Type</th>
                  
                </tr>
              </thead>
              <tbody>
                    {allpaidvoucher.map((val, i) => {
                        return (
                          <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{val.voucher_no}</td>
                            <td>{val.total_amount}</td>
                            <td>{val.voucher_type}</td> 
                          </tr>
                       );
                    })}
                  </tbody>
            </table>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};
export default StudentVoucher;
