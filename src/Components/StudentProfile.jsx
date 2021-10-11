import { React, useEffect, useState } from "react";
import axios from "axios";
import { Link, useHistory,useParams } from "react-router-dom";
import logo from "../Components/jb1.png";
import { padding } from "@mui/system";
import QRCode from "qrcode"

const StudentProfile = () => {
  const [src , setSRC]= useState("")
  const [qrcode , setQRCode]= useState(0)
  const history = useHistory();
  const logOut = () => {
    localStorage.clear();
    history.push("/");
  };

  const [profile_pic, setProfilePic] = useState("");
  const [student_data, setStudentData] = useState("");
  const { studentid } = useParams();
  useEffect(() => {
    axios
      .get(`http://fee-management-api.nastechltd.co/api/user_profile/${studentid}`)
      .then((response) => {
        localStorage.setItem("profile pic of student", response.config.url);
        setProfilePic(response.config.url);
        console.log("pro", profile_pic);
      })
      .catch((error) => {
        if (error.response) {
          // alert(error.response.data.message)
        }
      });

    axios
      .get(`http://fee-management-api.nastechltd.co/api/show_student/${studentid}`)
      .then((response) => {
        console.log(response.data);
        setStudentData(response.data);
        setQRCode(response.data.id)
        QRCode.toDataURL(response.data.id.toString()).then((res)=>{
          console.log(typeof(qrcode))
          setSRC(res)
      
      })
      .catch((error) => {
        if (error.response) {
          alert(error.response.data.message);
        }
      });
      
      // var salman = 1;
      // var sal = toString(qrcode)
      // console.log(qrcode. +"qrcode")
      
    })
     
  }, []);

 

  return (
    <>
      <div class="dashboard">
      <div class="left">
          <div class="navigation">
            <div class="wrapper2">
              <div class="abilan">
                <img alt="Logo" src={"http://fee-management-api.nastechltd.co/api/school_profile/"+localStorage.getItem("school_id")} />
                
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
                    <i class="fas fa-user-circle active"></i>
                  </div>
                  <div class="icon-name active">Profile</div>
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
                    <i class="fas fa-file-alt "></i>
                  </div>
                  <div class="icon-name ">Student Vouchers</div>
                </div>
              </Link>

             <Link class="nav-link" to={`/ViewAttendance/${studentid}`}>
                <div class="folder-icons">
                  <div class="icon1">
                    <i class="fas fa-clipboard-check "></i>
                  </div>
                  <div class="icon-name ">View Attendance</div>
                </div>
              </Link>
              
              <Link class="nav-link" to={`/StudentLeave/${studentid}`}>
                <div class="folder-icons">
                  <div class="icon1">
                    <i class="fas fa-clipboard-check "></i>
                  </div>
                  <div class="icon-name ">Student Leave</div>
                </div>
              </Link>


             

             
            </div>
          </div>
        </div>
        <div class="right-side">
          <div class="right-header">
            <div class="top-bar">
              <div class="top-bar-justify">
                <div class="big-inbox">Student Profile</div>
                <button onClick={logOut} class="btn text-bolder text-right">
                  Log Out
                </button>
              </div>
            </div>
            <hr class="new-hr" />
          </div>
          <div className="right-body">
            <div className="row" style={{ margin: "0px" }}>
              <div className="col-xl-12" style={{ marginBottom: "20px" }}>
                <div
                  className="background"
                  style={{
                    backgroundColor: "#fff",
                    margin: "auto",
                    height: "100px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <div
                    className="col-xl-2"
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <img src={profile_pic} height="60px" width="60px" />
                  </div>
                  <div className="col-xl-8">
                    <div className="">
                      <h2>
                        {student_data.first_name} {student_data.middle_name}{" "}
                        {student_data.last_name}
                      </h2>
                    </div>
                    <div className="">
                      <h6>{student_data.email}</h6>
                    </div>
                  </div>
                  <div className="col-xl-2">
                  <img src={src} />
                  </div>
                </div>
              </div>

              <div className="col-xl-12">
                <div
                  className="background"
                  style={{
                    backgroundColor: "#fff",
                    margin: "auto",
                    display: "flex",
                    alignItems: "center",
                    padding: "20px",
                    height: "auto",
                  }}
                >
                  <div className="col-xl-12">
                    <div className="col-xl-12">
                      <h2>Personal Information</h2>
                    </div>
                    <div className="row" style={{ margin:"0", marginTop: "20px" }}>
                      <div className="col-4">
                        <div className="">
                          <h4 style={{ fontSize: "20px" }}>Contact:</h4>
                        </div>
                        <div className="">
                          <h4 style={{ fontSize: "15px" }}>
                            {student_data.contact}
                          </h4>
                        </div>
                      </div>

                      <div className="col-4">
                        <div className="">
                          <h4 style={{ fontSize: "20px" }}>Gender:</h4>
                        </div>
                        <div className="">
                          <h4 style={{ fontSize: "15px", textTransform:"capitalize" }}>
                            {student_data.gender}
                          </h4>
                        </div>
                      </div>

                      <div className="col-4">
                        <div className="">
                          <h4 style={{ fontSize: "20px" }}>Reg. No. :</h4>
                        </div>
                        <div className="">
                          <h4 style={{ fontSize: "15px" }}>
                            {student_data.registration_no}
                          </h4>
                        </div>
                      </div>

                      <div className="col-4">
                        <div className="">
                          <h4 style={{ fontSize: "20px" }}>Father Name:</h4>
                        </div>
                        <div className="">
                          <h4 style={{ fontSize: "15px" }}>
                            {student_data.father_name}
                          </h4>
                        </div>
                      </div>

                      <div className="col-4">
                        <div className="">
                          <h4 style={{ fontSize: "20px" }}>Father CNIC:</h4>
                        </div>
                        <div className="">
                          <h4 style={{ fontSize: "15px" }}>
                            {student_data.father_CNIC}
                          </h4>
                        </div>
                      </div>

                      <div className="col-4">
                        <div className="">
                          <h4 style={{ fontSize: "20px" }}>Date Of Birth:</h4>
                        </div>
                        <div className="">
                          <h4 style={{ fontSize: "15px" }}>
                            {student_data.date_of_birth}
                          </h4>
                        </div>
                      </div>

                      {/* <div className="col-4">
                        <div className="">
                          <h4 style={{ fontSize: "20px" }}>Cell No. :</h4>
                        </div>
                        <div className="">
                          <h4 style={{ fontSize: "15px" }}>
                            {student_data.contact}
                          </h4>
                        </div>
                      </div> */}

                      <div className="col-4">
                        <div className="">
                          <h4 style={{ fontSize: "20px" }}>B_Form:</h4>
                        </div>
                        <div className="">
                          <h4 style={{ fontSize: "15px" }}>
                            {student_data.b_form}
                          </h4>
                        </div>
                      </div>
                     

                      <div className="col-xl-8">
                        <div className="">
                          <h4 style={{ fontSize: "20px" }}>Address:</h4>
                        </div>
                        <div className="">
                          <h4 style={{ fontSize: "15px" }}>
                            {student_data.address}
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default StudentProfile;
