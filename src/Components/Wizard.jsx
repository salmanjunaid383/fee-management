import React, { useState, useEffect } from "react";
import { Link, useHistory,useParams } from "react-router-dom";
import TextField from "@material-ui/core/TextField";

import axios from "axios";
import  './Wizard.css';

///Steps
import AdmissionCharges from './WizardAdmissionCharges'
import WizardClasses from './WizardClasses'
import FeeStructure from './WizardFeeStructure'
import FeePeriod from './WizardFeePeriod'
import WizardTerm from './WizardTerm'
const Wizard = () => {
	const[stepCount,setStepCount]=useState(0);
	const[school_id]=localStorage.getItem("school_id")
	const[phase,setPhase]=useState([])
	useEffect(() => {
		axios.get(`http://fee-management-api.nastechltd.co/api/schools_phase/${school_id}`)
            .then(response => {
				setPhase(response.data)
				var i = 0;
				response.data.forEach(element => {
					if(element.confirm===0){
						setStepCount(i)
						
						
						return;
					}
					i = 1 + parseInt(i);
				});
               

            })
            
	},[school_id])
    
	
	const updatePageState = (state) => {
		axios.put(`http://fee-management-api.nastechltd.co/api/schools_phase/${phase[stepCount].id}`,null)
            
		setStepCount(stepCount + 1);
               

	  
	}
	const prevPageState = () => {
		axios.put(`http://fee-management-api.nastechltd.co/api/schools_phase/${phase[stepCount-1].id}`,null)
		setStepCount(stepCount -1);
	}
    return (
      <>
	  <div class="wrapper" >
        <div class="container">
          <div class="row">
              <div class="col-xl-2"></div>
            <div class="col-xl-8 ">

            <div class="wizard-container">
		                <div class="card wizard-card" data-color="red" id="wizard">

		                    	<div class="wizard-header">
		                        	<h3 class="wizard-title">
		                        		Get Started With Your School
		                        	</h3>
									<h6>This information will get your school up and running as fast as possible.</h6>
		                    	</div>
								<div class="wizard-navigation">
								<ul id="progressbar">
									<li className='active' id="admission"><strong>Admission Charges</strong></li>
									<li className={stepCount >= 1 ? 'active' : null} id="classes"><strong>Classes</strong></li>
									<li className={stepCount >= 2 ? 'active' : null} id="structure"><strong>Fee Structure</strong></li>
									<li className={stepCount >= 3 ? 'active' : null} id="period"><stron>Fee Period</stron></li>
									<li className={stepCount >= 4 ? 'active' : null} id="term"><strong>Term</strong></li>
								</ul>
									<div class="progress">
										<div class="progress-bar progress-bar-striped progress-bar-animated" style={{width:(stepCount+1)*20+'%'}} role="progressbar" aria-valuemin="0" aria-valuemax="100"></div>
									</div>
								</div> <br/>
								<fieldset style={{transition:'0.5s'}}>
									{
										stepCount===0 ? <AdmissionCharges state={stepCount} triggerParentUpdate = {updatePageState}></AdmissionCharges> : null
									}
									{
										stepCount===1 ? <WizardClasses state={stepCount} triggerParentUpdate = {updatePageState}></WizardClasses> : null
									}
									{
										stepCount===2 ? <FeeStructure state={stepCount} triggerParentUpdate = {updatePageState}></FeeStructure> : null
									}
									{
										stepCount===3 ? <FeePeriod state={stepCount} triggerParentUpdate = {updatePageState}></FeePeriod> : null
									}
									{
										stepCount===4 ? <WizardTerm state={stepCount} triggerParentUpdate = {updatePageState}></WizardTerm> : null
									}
									<div class="row">
									<div class="col-md-6">
									<input type="button" name="next" class="next action-button-previous" onClick={prevPageState} value="Previous" style={stepCount===0 ? {display:'none'} : null} />
									</div>
									<div class="col-md-6">
									<input type="button" name="next" class="next action-button" onClick={updatePageState} value={stepCount===4 ? "Complete" : "Next"} />	
									</div>
									</div>
									
							</fieldset>

		                       
		                                	
		                          
		                           
	                        	
		                </div>
		            </div> 
                    
                  



            </div>
          </div>
        </div>
		</div>
      </>
    );
}

export default Wizard;