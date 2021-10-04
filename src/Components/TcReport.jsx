import axios from "axios";
import React, { useEffect, useState } from "react";
import "../Components/reports.css";
import { useHistory} from "react-router-dom";
import Snackbar from '@material-ui/core/Snackbar';

const TcReport = () => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [fathername, setFatherName] = useState("");
  const [gr_no, setGR_NO] = useState("");
  const [reason, setReason] = useState("");
  const [date, setDate] = useState("");
  const [issuedto, setIssuedTo] = useState("");
  const [amounts, setAmounts] = useState("");
  const [remarks, setRemarks] = useState("");
  const [class_id, setClassID] = useState("");
  const [studentid, setStudentID] = useState("");
  const [schoolid, setSchoolID] = useState("");
  const [sectionid, setSectionID] = useState("");
  const [AllRecord, setallRecord]= useState("");
  const [allclass,setAllClass]=useState('')

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



  const data = {
    name: name,
    father_name: fathername,
    G_R_NO: gr_no,
    reason: reason,
    issued_to: issuedto,
    remarks: remarks,
    amount: amounts,
    class_id: class_id,
    section_id: sectionid,
    school_id: schoolid,
    student_id: studentid,
    date: date,
  };

  const tc_id = localStorage.getItem("Valid_id")
  function postData(){
    console.log("valid_id",tc_id)
      if (tc_id == "notvalid"){
        if (gr_no == "") {
          setMessageinfo("Enter GR No.");
          handleMessage();
         
        } 
        else if (name == "") {
          setMessageinfo("Enter Name");
          handleMessage();
        }
        else if (fathername == "") {
          setMessageinfo("Enter Father Name");
          handleMessage();
        }
        else if (class_id == "") {
          setMessageinfo("Enter Class");
          handleMessage();
        } 
         
        else if (reason == "") {
          setMessageinfo("Enter Reason");
          handleMessage();
        } 
        else if (amounts == "") {
          setMessageinfo("Enter Amount");
          handleMessage();
        }
        else if (issuedto == "") {
          setMessageinfo("Enter Issued to");
          handleMessage();
        } 
        else if (remarks == "") {
          setMessageinfo("Enter Remarks");
          handleMessage();
        } 
      
        else{
          axios.post("http://fee-management-api.nastechltd.co/api/issued_tc",data).then((response)=>{
            console.log(response)
            history.push("/TcPrint");
            localStorage.setItem("TcPrint",response.data.id)
            localStorage.setItem("Valid_id","notvalid")
          })
        }
      }




  }

  function getRecord() {
    axios
      .get(`http://fee-management-api.nastechltd.co/api/gr_no/${gr_no}`)
      .then((response) => {
        console.log(response);

        setallRecord(response.data.student)
        setAllClass(response.data.class)
        // setAllSection(response.data.section)
        setName(response.data.student.first_name)
        // setAddress(response.data.student.address)
        setSchoolID(response.data.student.school_id)
        setStudentID(response.data.student.id)
        setDate(response.data.date)
        setSectionID(response.data.section.id)
        setClassID(response.data.class.id)
        setFatherName(response.data.student.father_name)
        localStorage.setItem("gr_no",gr_no)
        // setSectionID(response.data.section.id)

        // localStorage.setItem("TcPrintID",response.data.id)
      });
  }
  useEffect(() => {
    localStorage.setItem("Valid_id","notvalid")
    localStorage.setItem("TcPrint","")
  }, []);

  return (
    <>
      <div className="container" style={{ width: "80%" }}>
        <div className="row">
          <div className="col-xl-6 f-sec-col">
            {/* <img src="" alt="logo" /> */}

            <h4>Wonderland Grammer Sec. School</h4>
          </div>
        </div>

        <div className="row">
          <div className="col-xl-12 s-sec-col">
            <h6>....a positive change towards education</h6>
          </div>
        </div>

        <div className="row">
          <div
            className="col-xl-12"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div className="">
              <h6>The Principal</h6>
              <h6>WonderLand Grammer Secondary School</h6>
              <h6>Campus-I</h6>
              <h6>B-16, Block-10, F.B.Area</h6>
              <h6>Karachi.</h6>
              <br />
              <br />
              <h6>Dear Sir,</h6>
            </div>

            <div className="" style={{ display: "flex" }}>
              <input
                type="text"
                className="for-input-change"
                placeholder="G.R No"
                style={{ width: "50%" }}
                onChange={(e) => setGR_NO(e.target.value)}
              />
              <button className="btn btn-primary" onClick={getRecord}>
                {" "}
                Search{" "}
              </button>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-xl-12 t-sec-col" style={{ marginBottom: "20px" }}>
            <h5>ISSUE OF T.C.</h5>
          </div>
          <div className="col-xl-12">
            <p>
              I shall be thankfull if my son/daugther
              <input 
              // dafaultValue={}
              type="text" style={{marginLeft:"10px", marginRight:"10px"}} className="for-input-change" defaultValue={AllRecord.first_name} onChange={(e)=>setName(e.target.value)}/>
              S/O, D/O <input type="text" style={{marginLeft:"10px", marginRight:"10px"}} defaultValue={AllRecord.father_name} className="for-input-change" onChange={(e)=>setFatherName(e.target.value)} />
              studying in Class
              <input type="text" className="for-input-change" defaultValue={allclass.name} /> is issued to
              me.
            </p>
          </div>
        </div>
        <br />
        <br />

        <div className="row">
          <div className="col-xl-12">
            <h6>The reason is as below:-</h6>
          </div>
          <div className="col-xl-12">
            <input
            onChange={(e)=>setReason(e.target.value)}
              type="text"
              className="for-input-change"
              style={{ width: "100%", marginBottom: "20px" }}
            />
          </div>
          
        </div>

        <div className="col-xl-12">
          <p style={{ margin: "0px" }}>
            I have deposited/paid Rs.
            <input type="text" className="for-input-change" onChange={(e)=>setAmounts(e.target.value)} /> as your
            prescribed fee in this reguard.{" "}
          </p>
        </div>

        <br />
        <br />

        <div className="row">
          <div className="col-xl-6">
            <input
              type="text"
              className="for-input-change"
              style={{ width: "50%",margin:"0px" }}
            />
            <h6>Name/Signature</h6>
          </div>
          <div
            className="col-xl-6"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <h6>Date</h6>
            <input
            defaultValue={date}
              type="text"
              className="for-input-change"
              style={{ width: "50%" }}
            />
          </div>
        </div>

        <div
          className="col-xl-12"
          style={{
            padding: "0px",
            margin: "0px",
            marginBottom: "40px",
            marginTop: "40px",
          }}
        >
          <div
            className="line"
            style={{ height: "2px", width: "100%", backgroundColor: "#000" }}
          ></div>
        </div>

        <div className="col-xl-12">
          <h5 style={{ marginBottom: "30px" }}>Received T.C</h5>

          <div className="row">
            <div className="col-xl-6">
              <input
                type="text"
                className="for-input-change"
                style={{ width: "50%" }}
              />
              <h6>Name/Signature</h6>
            </div>
            <div
              className="col-xl-6"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <h6>Date</h6>
              <input
              defaultValue={date}
                type="text"
                className="for-input-change"
                style={{ width: "50%" }}
              />
            </div>
          </div>
        </div>
        <div
          className="col-xl-12"
          style={{
            padding: "0px",
            margin: "0px",
            marginBottom: "40px",
            marginTop: "40px",
          }}
        >
          <div
            className="line"
            style={{ height: "2px", width: "100%", backgroundColor: "#000" }}
          ></div>

          <div className="col-xl-12 t-sec-col">
            <h5>Office Use</h5>
          </div>
          <div className="row">
            <div
              className="col-xl-4"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <h6>G.R.</h6>
              <input
              defaultValue={gr_no}
                type="text"
                className="for-input-change"
                style={{
                  width: "60%",
                  marginBottom: "20px",
                  marginRight: "5px",
                }}
              />
            </div>

            <div
              className="col-xl-4"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <h6>Name</h6>
              <input
                type="text"
                defaultValue={AllRecord.first_name}
                className="for-input-change"
                style={{
                  width: "60%",
                  marginBottom: "20px",
                  marginRight: "5px",
                }}
              />
            </div>

            <div
              className="col-xl-4"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <h6>Father Name</h6>
              <input
                type="text"
                className="for-input-change"
                defaultValue={AllRecord.father_name}
                style={{
                  width: "60%",
                  marginBottom: "20px",
                  marginRight: "5px",
                }}
              />
            </div>

            <div
              className="col-xl-4"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <h6>Issued to</h6>
              <input
                type="text"
                className="for-input-change"
                style={{
                  width: "50%",
                  marginBottom: "20px",
                  marginRight: "5px",
                }}
                onChange={(e)=>setIssuedTo(e.target.value)}
              />
            </div>

            <div
              className="col-xl-4"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <h6>Remarks</h6>
              <input
                type="text"
                className="for-input-change"
                style={{
                  width: "54%",
                  marginBottom: "20px",
                  marginRight: "5px",
                  
                }}
                onChange={(e)=>setRemarks(e.target.value)}
              />
            </div>

            <div
              className="col-xl-4"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <h6>Date of issue</h6>
              <input
              defaultValue={date}
                type="text"
                className="for-input-change"
                style={{
                  width: "60%",
                  marginBottom: "20px",
                  marginRight: "5px",
                }}
              />
            </div>
          </div>
          <div
            className="col-xl-12"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <button className="btn btn-success" onClick={postData} type="button">
              Submit
            </button>
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
    </>
  );
};
export default TcReport;
