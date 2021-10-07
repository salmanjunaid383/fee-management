import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import "../Components/reports.css";
import Checkbox from "@mui/material/Checkbox";
const label = { inputProps: { "aria-label": "Checkbox demo" } };

const   WarSlip = () => {
  const [classteacher, setClassTeacher] = useState("");
  const [schoolprincipal, setSchoolPrincipal] = useState("");
  const [nameofstudent, setNameOfStudent] = useState("");
  const [classid, setClassID] = useState("");
  const [sectionid, setSectionID] = useState("");
  const [schoolid, setSchoolID] = useState("");
  const [studentid, setStudentID] = useState("");
  const [complaintno, setComplaintNo] = useState("");
  const [starttime, setStartTime]= useState("")
  const [endtime, setEndTime]= useState("")
  const [AllRecord, setallrecord]= useState("")
  const [allclass, setAllClass]= useState("")
  const [allsec, setAllSection]= useState("")
  const [date, setDate]= useState("")
  const [warning_items,setWarningItems] = useState([])
  

  


 
  
  function postdata(){
  
    const data = {
      class_teacher: classteacher,
      principal: schoolprincipal,
      name_of_student: nameofstudent,
      class_id: classid,
      section_id: sectionid,
      school_id: schoolid,
      student_id: studentid,
      complaint_no: complaintno,
      warning_items: warning_items,
      warning:"sasas",
      description:"ssasas",
      start_time:starttime,
      end_time:endtime
    };
  axios
    .post("http://fee-management-api.nastechltd.co/api/warning_slip", data)
    .then((response) => {
      console.log(response);
    });
    console.log(data)
  }
  
  
  function pushDocument(val) {
 
    let index = null;
    console.log(val);

    if (warning_items.length != 0) {
      console.log("ran second time");
      for (var i = 0; i < warning_items.length; i++) {
        if (val == warning_items[i].warning_item) {
          console.log(val);
          console.log(warning_items[i].warning_item);
          index = i;
        }
      }
      if (index == null) {
        setWarningItems([...warning_items,{ warning_item: val }])
      } else {
        warning_items.splice(index, 1);
      }
    } else {
      setWarningItems([...warning_items,{ warning_item: val }])    }
    console.log(warning_items);
  
  }

// useEffect(()=>{
//   axios
//   .get(`http://fee-management-api.nastechltd.co/api/warning_slip/${7}`)
//   .then((response) => {
//     console.log("response",response);
//   });

// },[])

const [Gr_NO, setGR_NO]=useState('')

function getRecord(){
  
  axios.get(`http://fee-management-api.nastechltd.co/api/gr_no/${Gr_NO}`)
  .then((response)=>{
      console.log(response)

      setallrecord(response.data.student)
      setAllClass(response.data.class)
      setAllSection(response.data.section)
      setDate(response.data.date)
      setSchoolID(response.data.student.school_id)
      setStudentID(response.data.student.id)
      setNameOfStudent(response.data.student.first_name)
      setClassID(response.data.class.id)
      setSectionID(response.data.section.id)
      
      
  })}

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

        <div className="row" style={{marginBottom:"20px"}}>
          <div className="col-xl-12 s-sec-col">
            <h2 >Campus (I)</h2>
          </div>
        </div>
         

        <div className="row">
          <div className="col-xl-12">
          <div className="" style={{ display: "flex" }}>
              <input
                type="text"
                className="for-input-change"
                placeholder="G.R No"
                style={{ width: "15%" }}
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
          <div className="col-xl-12 t-sec-col">
            <h5>Warning Slip</h5>
          </div>
        </div>

        <div className="row">
          <div className="col-xl-12">
            <h5 style={{ fontWeight: "bold" }}>Dear Parents:</h5>
          </div>
        </div>

        <div className="row">
          <div className="col-xl-12">
            <p>
              We would like to bring the following ticked points to your notice,
              We hope that you will take necessary action
            </p>
          </div>

          {/* CHECK BOXES  */}

          <div>
            <p>
              {" "}
              1.{" "}
              <Checkbox
                value="Your ward does not behave properly"
                {...label}
                onChange={(e) => pushDocument(e.target.value)}
              />{" "}
              Your ward does not behave properly
            </p>
            <p>
              {" "}
              2.{" "}
              <Checkbox
                value="Doe not come in proper uniform"
                {...label}
                onChange={(e) => pushDocument(e.target.value)}
              />{" "}
              Doe not come in proper uniform
            </p>
            <p>
              {" "}
              3.{" "}
              <Checkbox
                value="Does not do homework"
                {...label}
                onChange={(e) => pushDocument(e.target.value)}
              />{" "}
              Does not do homework
            </p>
            <p>
              {" "}
              4.{" "}
              <Checkbox
                value="Does not pay attention to the lesson in
              class"
                {...label}
                onChange={(e) => pushDocument(e.target.value)}
              />{" "}
              Does not pay attention to the lesson in class
            </p>
            <p>
              {" "}
              5.{" "}
              <Checkbox
                value="Does not take interest in class
              discussion"
                {...label}
                onChange={(e) => pushDocument(e.target.value)}
              />{" "}
              Does not take interest in class discussion
            </p>
            <p>
              {" "}
              6.{" "}
              <Checkbox
                value="Your ward is always irregular"
                {...label}
                onChange={(e) => pushDocument(e.target.value)}
              />{" "}
              Your ward is always irregular
            </p>
            <p>
              {" "}
              7.{" "}
              <Checkbox
                value="Your ward always comes late to the
              school"
                {...label}
                onChange={(e) => pushDocument(e.target.value)}
              />{" "}
              Your ward always comes late to the school
            </p>
            <p>
              {" "}
              8.{" "}
              <Checkbox
                value="Does not bring complete books/copies
              according to the time table"
                {...label}
                onChange={(e) => pushDocument(e.target.value)}
              />{" "}
              Does not bring complete books/copies according to the time table
            </p>
            <p>
              {" "}
              9.{" "}
              <Checkbox
                value="keep long hair / nails"
                {...label}
                onChange={(e) => pushDocument(e.target.value)}
              />{" "}
              keep long hair / nails
            </p>
            <p>
              {" "}
              10.{" "}
              <Checkbox
                value="Has lice in hair"
                {...label}
                onChange={(e) => pushDocument(e.target.value)}
              />{" "}
              Has lice in hair
            </p>
            <p>
              {" "}
              11.{" "}
              <Checkbox
                value="Has lice in hair"
                {...label}
                onChange={(e) => pushDocument(e.target.value)}
              />{" "}
              Has lice in hair
            </p>
            <p>
              {" "}
              12.{" "}
              <Checkbox
                value="Is week in subjects"
                {...label}
                onChange={(e) => pushDocument(e.target.value)}
              />{" "}
              Is week in subjects
            </p>
            <p>
              {" "}
              13.{" "}
              <Checkbox
                value="Irregular during assignments"
                {...label}
                onChange={(e) => pushDocument(e.target.value)}
              />{" "}
              Irregular during assignments
            </p>
          </div>
          <div className="col-xl-12">
            <div
              className="row"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <div
                className="col-xl-4"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                <h6>Date</h6>
                <input
                defaultValue={date}
                  type="text"
                  className="for-input-change"
                  // onChange={(e) => setDate(e.target.value)}
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
                <h6>Class Teacher</h6>
                <input
                  onChange={(e) => setClassTeacher(e.target.value)}
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
                <h6>Principal</h6>
                <input
                  onChange={(e) => setSchoolPrincipal(e.target.value)}
                  type="text"
                  className="for-input-change"
                  style={{
                    width: "60%",
                    marginBottom: "20px",
                    marginRight: "5px",
                  }}
                />
              </div>

              <div className="dash-line"></div>

              <div className="col-xl-12">
                <p>
                  {" "}
                  Note: Parents must see the principal/In charge on
                  <input
                    type="text"
                    className="for-input-change"
                  /> between <input type="text" className="for-input-change" onChange={(e)=>setStartTime(e.target.value)} />{" "}
                  to <input type="text" className="for-input-change" onChange={(e)=>setEndTime(e.target.value)} />
                  Please acknowledge this letter by signing this slip.
                </p>
              </div>

              <div className="row">
                <div
                  className="col-xl-3"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                  }}
                >
                  <h6>Name.</h6>
                  <input
                  defaultValue={AllRecord.first_name}
                    type="text"
                    className="for-input-change"
                    onChange={(e) => setNameOfStudent(e.target.value)}
                    style={{
                      width: "60%",
                      marginBottom: "20px",
                      marginRight: "5px",
                    }}
                  />
                </div>

                <div
                  className="col-xl-3"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                  }}
                >
                  <h6>Class</h6>
                  <input
                  defaultValue={allclass.name}
                    onChange={(e) => setClassID(e.target.value)}
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
                  className="col-xl-3"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                  }}
                >
                  <h6>Sec</h6>
                  <input
                  defaultValue={allsec.name}
                    onChange={(e) => setSectionID(e.target.value)}
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
                  className="col-xl-3"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                  }}
                >
                  <h6>Complaint No.</h6>
                  <input
                    onChange={(e) => setComplaintNo(e.target.value)}
                    type="text"
                    className="for-input-change"
                    style={{
                      width: "50%",
                      marginBottom: "20px",
                      marginRight: "5px",
                    }}
                  />
                </div>

                <div
                  className="col-xl-12"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                  }}
                >
                  <div
                    className=""
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      marginTop: "20px",
                    }}
                  >
                    <input
                      onChange={(e) => setComplaintNo(e.target.value)}
                      type="text"
                      className="for-input-change"
                      style={{
                        width: "100%",
                      }}
                    />
                    <h6>Signature.</h6>
                  </div>
                  <div
                    className="col-xl-12"
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <button className="btn btn-success" onClick={postdata}  style={{height:"30px",display:"flex",alignItems:"center"}}>
                      Submit
                    </button>
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
export default WarSlip;
