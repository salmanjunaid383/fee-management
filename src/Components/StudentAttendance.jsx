import { React, ReactPropTypes, useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import axios from "axios";
import "./dashboard.css";
import TextField from "@material-ui/core/TextField";
import Snackbar from "@material-ui/core/Snackbar";
// import React, { PropTypes } from 'react';

const StudentAttendance = () => {
  const school_id = useParams();
  console.log(school_id);
  const [studentid, setStudentID] = useState("");

  function sendAttendance() {
      console.log(data)
    axios
      .post(
        `http://fee-management-api.nastechltd.co/api/student_attendance`,
        data
      )
      .then((response) => {
        console.log(response);
        ClearFields()
       
      }) .catch((error) => {
        if (error.response) {
        ClearFields()
        }
      });
  }
  const data = {
    student_id: studentid,
    attendance: "P",
  };

  
  const handleSubmit = e => {
    e.preventDefault();
    sendAttendance()
    

  };

  const handleKeypress = e => {
    if (e.keyCode === 13) {
      console.log("enter is pressed")
    }
  };

  function ClearFields() {

    document.getElementById("name").value = "";
   
}

  return (
    <>
      <div className="row" style={{ margin: "0px" }}>
        <div className="col-xl-12" style={{ textAlign: "center" }}>
          <h1>Student Attendance</h1>
          <hr />
        </div>
      </div>

      <div className="row" style={{ margin: "0px" }}>
        <div className="col-xl-12" style={{ textAlign: "center" }}>
          <h3>Enter studentID</h3>
         

      <form>
        <input
          autoFocus
          onKeyPress={handleKeypress}
          id="name"
              type="text"
              placeholder="Student ID"
              onChange={(e) => setStudentID(e.target.value)}

        />
        <br/>
        <div className="col-xl-12" style={{textAlign:"right"}}>
        <button
          onClick={handleSubmit}
            className="btn btn-primary"
          type="submit"
        >
          Submit
        </button>
        </div>
      </form>
      </div>
      </div>
    </>
  );
};
export default StudentAttendance;
    