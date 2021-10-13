import React, { useState, useEffect } from "react";
import { Link, useHistory,useParams } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Snackbar from "@material-ui/core/Snackbar";

import axios from "axios";
import  './Wizard.css';




const WizardFeePeriod = ({state,triggerParentUpdate}) => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [billing, setBilling] = useState('');
    const [validDate, setValidDate] = useState('');
    const [due, setDue] = useState('');
    const [prevdata, setPrevdata] = useState('');
    const [generate, setGenerate] = useState('');
    const [latefee, setLatefee] = useState('');
    const school_id = localStorage.getItem("school_id")

   
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
      school_id: localStorage.getItem("school_id"),
      phase: billing,
      generation_date: generate,
      due_date: due,
      late_fee_charge: latefee,
      valid_date : validDate
  }
  const sendData = () => {
      if (billing < 0 || billing > 12) {
          setMessageinfo("Months Can Only Be From 1-12")
          handleMessage();
      }
      else if (billing === '') {
          setMessageinfo("Enter Billing Month(s)")
          handleMessage();
      }
      else if (generate === '') {
          setMessageinfo("Enter Generation date")
          handleMessage();
      }
      else if (due === '') {
          setMessageinfo("Enter Due date")
          handleMessage();
      }
      else if (latefee === '') {
          setMessageinfo("Enter Late Fee Charges")
          handleMessage();
      }
      else if (validDate === '') {
          setMessageinfo("Enter Valid Bank Date")
          handleMessage();
      }
      else if (validDate < 0 || validDate > 28) {
          setMessageinfo("Valid Bank Date can only be from 1-28")
          handleMessage();
      }
      else if (generate < 0 || generate > 28) {
          setMessageinfo("Generation date can only be from 1-28")
          handleMessage();
      }
      else if (due < 0 || due > 28) {
          setMessageinfo("Due date can only be from 1-28")
          handleMessage();
      }
      else if (latefee < 0) {
          setMessageinfo("charges can't be negative")
          handleMessage();
      }
      else {
          axios.post(`http://fee-management-api.nastechltd.co/api/billing_period`, data)
              .then(response => {
                  console.log(response);
                  setDue('');
                  setGenerate('');
                  setBilling('');
                  setLatefee('');
                  setValidDate('')
              })
              .catch((error) => {
                  if (error.response) {
                      setMessageinfo(error.response.data.message);
                      handleMessage();
                  }
              })
      }

  }

    return(
        <>
        <div class="form-card">
								<div class="row">
										<div class="col-7">
											<h2 class="fs-title">Fee Period:</h2>
										</div>
										<div class="col-5">
											<h2 class="steps">Step 4 - 5</h2>
										</div>
										
                                      <div class="row">
                                          
                                        <div class="col-md-6">
                                        <TextField className="pb-3" 
                                        type="number" 
                                        onChange={(e) => setBilling(e.target.value)} helperText="Month" 
                                        label="Fee period" fullWidth />
                                        </div>

                                        <div class="col-md-6">
                                        <TextField className="pb-3" 
                                        type="number" 
                                        onChange={(e) => setDue(e.target.value)} helperText="The day Fee to be expired" 
                                        label="Due date" fullWidth />
                                        </div>

                                        <div class="col-md-6">
                                        <TextField className="pb-3" 
                                        type="number" onChange={(e) => setValidDate(e.target.value)} 
                                        helperText="Bank Expiry Date" label="Valid bank date" fullWidth />
                                        </div>

                                        <div class="col-md-6">
                                        <TextField type="number" 
                                        className="pb-3"  onChange={(e) => setLatefee(e.target.value)} 
                                        helperText=" " label="Late fee charges" fullWidth />
                                        </div>

                                        <div class="col-md-6">
                                        <TextField className="pb-3" 
                                        type="number" onChange={(e) => setGenerate(e.target.value)}
                                        helperText="The day fee to be generated" label="Generation date" fullWidth />
                                        </div>

                                      </div>
                                        
                                      <div style={{textAlign:'center'}}>
                                        <button class="btn btn-success" style={{marginTop:'5px'}}  onClick={sendData}>Add Fee Period</button>
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
export default WizardFeePeriod;