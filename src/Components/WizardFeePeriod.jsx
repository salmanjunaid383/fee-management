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
  
    const onTrigger = (event) => {
      triggerParentUpdate();
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
                                        type="text" 
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