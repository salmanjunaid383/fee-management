import React, { useState, useEffect } from "react";
import { Link, useHistory,useParams } from "react-router-dom";
import TextField from "@material-ui/core/TextField";

import axios from "axios";
import  './Wizard.css';




const WizardAdmissionCharges = ({state,triggerParentUpdate}) => {
	const[school_id] = localStorage.getItem("school_id");
	const[admissionCharges,setAdmissionCharges]=useState([])
	const[buttonText,setButtonText]=useState("Add Charges")
	const[charges,setCharges]=useState(0);
	useEffect(() => {
		axios.get(`http://fee-management-api.nastechltd.co/api/show_admission_charges/${school_id}`)
            .then(response => {
                console.log(response);
                setAdmissionCharges(response.data);
            })
            
	},[school_id])
	const sendData = () => {
		
		setButtonText("Loading...")
		if(admissionCharges.length===1){
			axios.delete(`http://fee-management-api.nastechltd.co/api/admission_charges/${admissionCharges[0].id}`)
            .then(response => {
                console.log(response)
            },error => {
				console.log(error)
			})
			
		}
		axios.post(`http://fee-management-api.nastechltd.co/api/admission_charges`,
                {

                    school_id: school_id,
                    charges: charges

                })
                .then(response => {
                    console.log(response)
                    setButtonText("Successfull")
					setTimeout(1000);
                })
	}
    return(
        <>
        <div class="form-card">
								<div class="row">
										<div class="col-7">
											<h2 class="fs-title">Admission Charges:</h2>
										</div>
										<div class="col-5">
											<h2 class="steps">Step 1 - 5</h2>
										</div>
										<div>
										<TextField
										onChange={(e) => setCharges(e.target.value)}
										id="standard-textarea"
										name="Admission Charges"
										label="Admission Charges"
										placeholder="Add admission Charges"
										defaultValue={admissionCharges.length === 1 ? admissionCharges[0].charges : charges}
										type="number"
										fullWidth
										/>
										</div>
                                        
									</div> 
									<div style={{textAlign:'center'}}>
                                        <button class="btn btn-success" style={{marginTop:'5px'}} disabled={charges===0} onClick={sendData}>{buttonText}</button>
                                        </div>
								</div> 
								
								
								
        </>
    )
}
export default WizardAdmissionCharges;