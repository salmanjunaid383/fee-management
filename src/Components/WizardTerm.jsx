import React, { useState, useEffect } from "react";
import { Link, useHistory,useParams } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Snackbar from "@material-ui/core/Snackbar";

import axios from "axios";
import  './Wizard.css';




function WizardTerm({state,triggerParentUpdate}) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    const school_id = localStorage.getItem("school_id")
    const [term, setTerm] = useState([]);
    const [startingdate, setStartingdate] = useState("");
    const [endingdate, setEndingdate] = useState("");
   
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
  
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    var StartDate = new Date(startingdate);
    // var startdate = StartDate.getDate()
    var startmonth = months[StartDate.getMonth()];
    var startyear = StartDate.getFullYear().toString().substr(-2);
    var EndDate = new Date(endingdate);
  
    const data = {
      start_date: `${StartDate.getTime() / 1000}`,
      end_date: `${EndDate.getTime() / 1000}`,
      term_name: term,
      school_id: school_id,
      month_or_year: `${startmonth}-${startyear}`,
    };
    const sendData = () => {
      if (startingdate === "") {
        setMessageinfo("Select Starting Date");
        handleMessage();
      } else if (endingdate === "") {
        setMessageinfo("Select Ending Date");
        handleMessage();
      } else if (term === "") {
        setMessageinfo("Enter Term Name");
        handleMessage();
      } else {
        axios
          .post(`http://fee-management-api.nastechltd.co/api/term`, data)
          .then((response) => {
            console.log(response);
            setStartingdate("");
            setEndingdate("");
            setTerm("");
            
          })
          .catch((error) => {
            if (error.response) {
              setMessageinfo(error.response.data.message);
              handleMessage();
            }
          });
      }
    };

    return(
        <>
        <div class="form-card">
								<div class="row">
										<div class="col-7">
											<h2 class="fs-title">Term:</h2>
										</div>
										<div class="col-5">
											<h2 class="steps">Step 5 - 5</h2>
										</div>
										
                                      <div class="row">
                                          <div class="col-md-4">
                                          <TextField className="pb-3" 
                                            type="text" 
                                            onChange={(e) => setTerm(e.target.value)} 
                                            label="Term name" fullWidth />
                                          </div>
                                          <div class="col-md-4">
                                          <TextField className="pb-3" 
                                            type="date" 
                                            onChange={(e) => setStartingdate(e.target.value)} 
                                            label="Starting date" defaultValue="2021-01-01" fullWidth />
                                          </div>
                                          <div class="col-md-4">
                                          <TextField className="pb-3" 
                                            type="date" 
                                            onChange={(e) => setEndingdate(e.target.value)} 
                                            label="Ending date"  defaultValue="2021-01-01" fullWidth />
                                          </div>
                                        

                                      </div>
                                        
                                      <div style={{textAlign:'center'}}>
                                        <button class="btn btn-success"  style={{marginTop:'5px',width:'100px'}} onClick={sendData}>Submit</button>
                                        </div>   
                                        
                                       
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
       
        </>
    )
}
export default WizardTerm;