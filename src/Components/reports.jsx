import axios from "axios";
import React, { useEffect, useState } from "react";
import "../Components/reports.css";




const Reports = () => {
  // hooks 
  const [Gr_NO, setgr_no]=useState('')
  const [classid, setClassID]=useState('')
  const [sectionid, setSectionID]=useState('')
  const [naam, setNaam]=useState('')
  const [reasonforpickup, setReasonForPickup]=useState('')
  const [timeofpickingup, setTimeOfPickingUp]=useState('')
  const [nameoftheperson, setNameOfThePerson]=useState('')
  const [relationwiththestudent, setRelationWithTheStudent]=useState('')
  const [CNIC, setCNIC]=useState('')
  const [address, setAddress]=useState('')
  const [cell, setCell]=useState('')
  const [remarks, setRemarks]=useState('')
  const [studentid, setStudentID]=useState('')
  const [schoolid, setSchoolID]=useState('')
  const [date, setDate]=useState('')
  const [AllRecord,setallRecord]=useState('')

  const [allclass,setAllClass]=useState('')
  const [allsection,setAllSection]=useState('')

  function postDate(){
    axios.post("http://fee-management-api.nastechltd.co/api/pickup_slip",data).then((response)=>{
      console.log(response)
    }) 
  }


  function getRecord(){
  
  axios.get(`http://fee-management-api.nastechltd.co/api/gr_no/${Gr_NO}`)
  .then((response)=>{
      console.log(response)

      setallRecord(response.data.student)
      setAllClass(response.data.class)
      setAllSection(response.data.section)
      setNaam(response.data.student.first_name)
      setAddress(response.data.student.address)
      setSchoolID(response.data.student.school_id)
      setStudentID(response.data.student.id)
      setDate(response.data.date)  
      setClassID(response.data.class.id)
      setSectionID(response.data.section.id)
      
  })}

  const data={
    class_id:classid,
    section_id:sectionid,
    G_R_NO:Gr_NO,
    name:AllRecord.first_name,
    reason_for_pickup:reasonforpickup,
    timing_of_picking_up:timeofpickingup,
    name_of_person:nameoftheperson,
    realation_with_student:relationwiththestudent,
    CNIC:CNIC,
    address:address,
    cell:cell,  
    remarks:remarks,
    student_id:3,
    school_id:schoolid,
    date:date

  }
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-xl-6 f-sec-col">
            <img src="" alt="logo" />

            <h4>Wonderland Grammer Sec. School</h4>
          </div>
        </div>

        <div className="row">
          <div className="col-xl-12 s-sec-col">
            <h6>....a positive change towards education</h6>
          </div>
        </div>

        <div className="row">
          <div className="col-xl-12 t-sec-col">
            <h5>Student's Early Pick up Slip</h5>
          </div>
        </div>
      </div>

      {/* input fields  */}

      <form>
        <fieldset className="mt-4 field_box shadow">
          {/* <div
                style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              </div> */}
          <div className="row" style={{ width: "80%", margin: "auto" }}>
            <div
              className="col-3"
              style={{ display: "flex", alignItems: "center" }}
            >
              <label for="fname">G.R. No:</label>
              <input
                style={{
                  width: "40%",
                  border: "none",
                  borderRadius: "0px",
                  borderBottom: "1px solid #000",
                  outline: "none",
                }}
                // id="fname"
                // defaultValue={getdata.first_name}
                type="text"
                className="form-control"
                placeholder="G.R No"
                onChange={(e) => setgr_no(e.target.value)}
              />

              <button className="btn btn-primary" type="button" onClick={getRecord}>search</button>
            </div>

            <div
              className="col-3"
              style={{ display: "flex", alignItems: "center" }}
            >
              <label for="fname">Class:</label>
              <input
                style={{
                  width: "40%",
                  border: "none",
                  borderRadius: "0px",
                  borderBottom: "1px solid #000",
                  outline: "none",
                }}
                id="fname"
                defaultValue={allclass.name}
                type="text"
                className="form-control"
                placeholder="Class"
                onChange={(e) => setClassID(e.target.value)}
              />
            </div>

            <div
              className="col-3"
              style={{ display: "flex", alignItems: "center" }}
            >
              <label for="fname">Section:</label>
              <input
                style={{
                  width: "40%",
                  border: "none",
                  borderRadius: "0px",
                  borderBottom: "1px solid #000",
                  outline: "none",
                }}
                id="fname"
               defaultValue={allsection.name}
                type="text"
                className="form-control"
                placeholder="Section"
                onChange={(e) => setSectionID(e.target.value)}
              />
            </div>

            <div
              className="col-3"
              style={{ display: "flex", alignItems: "center" }}
            >
              <label for="fname">Date:</label>
              <input
                style={{
                  width: "40%",
                  border: "none",
                  borderRadius: "0px",
                  borderBottom: "1px solid #000",
                  outline: "none",
                }}
                id="fname"
                defaultValue={date}
                type="text"
                className="form-control"
                placeholder="Date"
                // onChange={(e) => setFname(e.target.value)}
              />
            </div>

            <div className="row" style={{ marginTop: "30px" }}>
              <div className="col-xl-4">
                <label>Student Name:</label>
                <input
                  type="text"
                  defaultValue={AllRecord.first_name}
                  placeholder="Enter your name"
                  className="form-control"
                  onChange={(e) => setNaam(e.target.value)}

                />
              </div>

              <div className="col-xl-4">
                <label>Reason for early pickup:</label>
                <input
                  type="text"
                  placeholder="Reason for early pickup:"
                  className="form-control"
                  onChange={(e) => setReasonForPickup(e.target.value)}
                />
              </div>

              <div className="col-xl-4">
                <label>Time of picking up:</label>
                <input
                  type="text"
                  placeholder="Time of picking up:"
                  className="form-control"
                  onChange={(e) => setTimeOfPickingUp(e.target.value)}
                />
              </div>

              <div className="col-xl-4">
                <label>Relation with the student:</label>
                <input
                  type="text"
                  placeholder="Relation with the student:"
                  className="form-control"
                  onChange={(e) => setRelationWithTheStudent(e.target.value)}
                />
              </div>

              <div className="col-xl-4">
                <label>Address:</label>
                <input
                  type="text"
                  defaultValue={AllRecord.address}
                  placeholder="Address:"
                  className="form-control"
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              <div className="col-xl-4">
                <label>Remarks:</label>
                <input
                  type="text"
                  placeholder="Remarks:"
                  className="form-control"
                  onChange={(e) => setRemarks(e.target.value)}

                />
              </div>

              <div className="col-xl-4">
                <label>Name of the person:</label>
                <input
                  type="text"
                  placeholder="Name of the person:"
                  className="form-control"
                  onChange={(e) => setNameOfThePerson(e.target.value)}
                />
              </div>

              <div className="col-xl-4">
                <label>CNIC:</label>
                <input
                  type="text"
                  placeholder="CNIC:"
                  className="form-control"
                  onChange={(e) => setCNIC(e.target.value)}

                />
              </div>

              <div className="col-xl-4">
                <label>Cell</label>
                <input
                  type="text"
                  placeholder="Cell"
                  className="form-control"
                  onChange={(e) => setCell(e.target.value)}

                />
              </div>
            </div>
            <div className="col-xl-12" style={{ marginTop: "40px" }}>
              <h5 style={{ fontWeight: "400" }}>Thank You,</h5>
            </div>
            <div className="col-xl-5" style={{ marginTop: "30px" }}>
              <input
                type="text"
                style={{ border: "none", borderBottom: "1px solid #000" }}/>
                <h6 style={{fontWeight:"bold"}}>Principal's Signature</h6>
            </div>

            <div className="col-xl-5" style={{ marginTop: "30px" }}>
              <input
                type="text"
                style={{ border: "none", borderBottom: "1px solid #000" }}/>
                <h6 style={{fontWeight:"bold"}}>Signature of Parent's</h6>
            </div>

            <div className="col-xl-2">
              <button className="btn btn-primary" type="button" onClick={postDate}>Submit</button>
            </div>

            
          </div>
        </fieldset>
      </form>
    </>
  );
};
export default Reports;
