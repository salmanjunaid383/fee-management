import React,{useEffect,useState} from "react";
// import ReactToPrint from "react-to-print";
import UndertakingReport from "./UndertakingReport";
import axios from "axios";
import "../Components/reports.css";

const PrintUndertakin=()=>{
  const undertaking_id = localStorage.getItem("undertaking_print_id")
  const [AllRecord, setallrecord] = useState("")
  useEffect(()=>{
    axios.get(`http://fee-management-api.nastechltd.co/api/student_undertaking/${undertaking_id}`)
    .then((response)=>{
      console.log(response)
      setallrecord(response.data)
    })
  },[])
  return(
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
              defaultValue={AllRecord.G_R_NO}
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
               
              />

             
            </div>
        </form>

        <div className="row">
          <div className="col-xl-12 t-sec-col" style={{marginBottom:"20px"}}>
            <h5>Undertaking by the parents</h5>
          </div>
        </div>

        <div className="row" >
            <div className="col-xl-12">
                We the parents of <input type="text" style={{border:"none",borderBottom:"1px solid #000"}} defaultValue={AllRecord.name} /> of class, accept here for undertake that,
                 <p style={{marginTop:"20px"}}>i. We solely take the responsibility of our ward, if he/she does not show improvement in the next class 
                    of if he/she does not cope with the class</p>

                    <p style={{marginTop:"20px"}}>ii. We will not blame the teachers/ school for our ward's slow progress</p>
                 
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
                defaultValue={AllRecord.name_of_parent}
                type="text"
               
                // placeholder="Name of the parent"
                // onChange={(e) => setFname(e.target.value)}
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
                
                type="text"
               
             
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

                type="text"

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
            <button className="btn btn-success" id="bton" onClick={()=>{window.print()}} type="button">
              Print
            </button>
          </div>
      </div>
    </>
  )
}


export default PrintUndertakin;