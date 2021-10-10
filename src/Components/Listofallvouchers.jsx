import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";


const Listofallvouchers = () => {
  const [allvoucher, setAllVoucher]=useState([])
  const history = useHistory();
  const logOut = () => {
    localStorage.clear();
    history.push("/");
  };

  useEffect(() => {
    axios
      .get(`http://fee-management-api.nastechltd.co/api/paid_fee_voucher/${localStorage.getItem("school_id")}`)
      .then((response) => {
        console.log(response);
        setAllVoucher(response.data)
        if(response.data.length == 0){
          alert("no pending vouchers")
      }
       
      })
      .catch((error) => {
        // alert("something went wrong")
      });
      

  }, []);

  function viewVoucher(id,type) {
    console.log(id,type)
    if(type == "Cashable"){
     console.log("cashable wala page")
     history.push(`/CashableFeeVoucher/${id}`)
   }
   else if(type=="Custom"){
     history.push(`/FeeVoucherCustom/${id}`)
   }
  }


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
                    <i class="fas fa-file-alt active"></i>
                  </div>
                  <div class="icon-name active">Paid Vouchers</div>
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



            </div>
          </div>
        </div>
        <div class="right-side">
          <div class="right-header">
            <div class="top-bar">
              <div class="top-bar-justify">
                <div class="big-inbox">Paid Voucher List</div>
                <button onClick={logOut} class="btn text-bolder text-right">
                  Log Out
                </button>
              </div>
            </div>
            <hr class="new-hr" />
          </div>
          <div class="right-body">
          <div className="row" style={{margin:"0px"}}>
          <div className="col-xl-12" style={{display:"flex" , justifyContent:"flex-end"}}>
                <Link to={`/unpaidfeevoucher`}>  <button className="btn btn-primary">View Unpaid Vouchers</button></Link>
              </div>
              </div>
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
          </div>
          <div class="table-responsive">
            <table class="table no-wrap">
              <thead>
                <tr>
                  <th class="border-top-0">#</th>
                  <th class="border-top-0">Voucher No.</th>
                  <th class="border-top-0">Amount</th>
                  <th class="border-top-0">Voucher Type</th>
                  {/* <th class="border-top-0">View Voucher</th> */}
                  
                </tr>
              </thead>
              <tbody>
                    {allvoucher.map((val, i) => {
                        return (
                          <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{val.voucher_no}</td>
                            <td>{val.total_amount}</td>
                            <td>{val.voucher_type}</td> 
                            {/* <td>
                              <button className="btn btn-primary" onClick={() => viewVoucher(val.id,val.voucher_type)}>View Voucher</button>
                            </td> */}
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
export default Listofallvouchers;
