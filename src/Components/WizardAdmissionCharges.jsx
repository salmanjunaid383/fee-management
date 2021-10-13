import React, { useState, useEffect } from "react";
import { Link, useHistory,useParams } from "react-router-dom";
import TextField from "@material-ui/core/TextField";

import axios from "axios";
import  './Wizard.css';




const WizardAdmissionCharges = ({state,triggerParentUpdate}) => {

	const onTrigger = (event) => {
        triggerParentUpdate();
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
										id="standard-textarea"
										name="Admission Charges"
										label="Admission Charges"
										placeholder="Add admission Charges"
										type="text"
										fullWidth
										/>
										</div>
                                        
									</div> 
								</div> 
								
								
								
        </>
    )
}
export default WizardAdmissionCharges;