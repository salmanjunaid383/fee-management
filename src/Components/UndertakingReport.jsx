import React, { useEffect, useState } from "react";
import "../Components/reports.css";
import axios from "axios";
import { useHistory} from "react-router-dom";


const UndertakingReport = () => {

  const history = useHistory();
  const [name,setName]=useState('')
  const [gr,setGR]=useState("")
  const [fatherName,setFatherName]=useState('')
  const [AllRecord, setallRecord]= useState("");
  const [date, setDate]=useState('')
  const [schoolid,setSchoolID]=useState('')

function getRecord() {
  
  axios
    .get(`http://fee-management-api.nastechltd.co/api/gr_no/${gr}`)
    .then((response) => {
      console.log(response);
      setallRecord(response.data.student)

      setName(response.data.student.first_name)
  
      setSchoolID(response.data.student.school_id)

      setDate(response.data.date)
   
      setFatherName(response.data.student.father_name)
      
    });
}
const data={
  G_R_NO:gr,
  name:name,
  name_of_parent:fatherName,
  student_id:AllRecord.id,
  school_id:schoolid
}
function post(){
   axios.post("http://fee-management-api.nastechltd.co/api/student_undertaking",data).then((response)=>{
     console.log(response)
     localStorage.setItem("undertaking_print_id",response.data.id)
     history.push("/printUndertakin");
   })
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

        <form>
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
                type="text"
                className="form-control"
                placeholder="G.R No"
                onChange={(e) => setGR(e.target.value)}
              />

              <button className="btn btn-primary" type="button" onClick={getRecord}>search</button>
            </div>
        </form>

        <div className="row">
          <div className="col-xl-12 t-sec-col" style={{marginBottom:"20px"}}>
            <h5>Undertaking by the parents</h5>
          </div>
        </div>

        <div className="row" >
            <div className="col-xl-12">
                <pre>We the parents of <input type="text" style={{border:"none",borderBottom:"1px solid #000"}} defaultValue={AllRecord.first_name} onChange={(e)=>setName(e.target.value)}/> of class, accept here for undertake that,
                 <pre style={{marginTop:"20px"}}>i. We solely take the responsibility of our ward, if he/she does not show improvement in the next class 
                    of if he/she does not cope with the class</pre>

                    <pre style={{marginTop:"20px"}}>ii. We will not blame the teachers/ school for our ward's slow progress</pre>
                </pre>  
            </div>
            <div
              className="col-6"
              style={{ display: "flex", alignItems: "center" }}
            >
              <label for="fname" style={{width:"200px"}}>Name of the Parent:</label>
              <input
                style={{
                  width: "100%",
                  border: "none",
                  borderRadius: "0px",
                  borderBottom: "1px solid #000",
                  outline: "none",
                  marginLeft:"10px"
                }}
                id="fname"
                defaultValue={AllRecord.father_name}
                type="text"

              />
            </div>

            <div
              className="col-6"
              style={{ display: "flex", alignItems: "center" }}
            >
              <label for="fname" style={{width:"90px"}}>Signature:</label>
              <input
                style={{
                  width: "100%",
                  border: "none",
                  borderRadius: "0px",
                  borderBottom: "1px solid #000",
                  outline: "none",
                }}
                id="fname"
                // defaultValue={getdata.first_name}
                type="text"
               
                // placeholder="Signature"
                // onChange={(e) => setFname(e.target.value)}
              />
            </div>

            <div
              className="col-6"
              style={{ display: "flex", alignItems: "center" , marginTop:"10px"}}
            >
              <label for="fname" style={{width:"50px"}}>Date:</label>
              <input
                style={{
                  width: "100%",
                  border: "none",
                  borderRadius: "0px",
                  borderBottom: "1px solid #000",
                  outline: "none",
                }}
                id="fname"
                defaultValue={date}
                type="text"
               
                // placeholder="Date "
                // onChange={(e) => setFname(e.target.value)}
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
            <button className="btn btn-success" onClick={post} type="button">
              Submit
            </button>
          </div>
      </div>
    </>
  );
};
export default UndertakingReport;
