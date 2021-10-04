import { React, useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import axios from "axios";
import "./dashboard.css";
import TextField from "@material-ui/core/TextField";
import Snackbar from "@material-ui/core/Snackbar";

const StudentAttendance = () => {
    const school_id = useParams()
    console.log(school_id)
    const [studentid, setStudentID]=useState("")

    function sendAttendance(){
        axios.post(`http://fee-management-api.nastechltd.co/api/student_attendance`, data)
        .then((response)=>{
            console.log(response)
        })
    }
    const data= {
        student_id:4,
        attendance:"P"
    }
    


    return(
        <>
            <div className="row" style={{margin:"0px"}}>
                <div className="col-xl-12" style={{textAlign:"center"}}>
                    <h1>Student Attendance</h1>
                    <hr/>
                </div>
            </div>

            <div className="row" style={{margin:"0px"}}>
                <div className="col-xl-12" style={{textAlign:"center"}}>
                    <h3>Enter studentID</h3>
                    <input type="text" placeholder="Student ID" onChange={(e) => setStudentID(e.target.value)}></input>
                    
                </div>
                <div className="col-xl-12" style={{display:"flex", justifyContent:"flex-end"}}>

                    <button className="btn btn-success" onClick={sendAttendance}>Submit</button>
                </div>
            </div>

            

        </>
    )
}
export default StudentAttendance;