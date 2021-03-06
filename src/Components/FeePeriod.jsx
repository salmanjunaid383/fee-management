import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import logo from './jb1.png';


const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '30ch',
      },
    },
  }));
  
const FeePeriod = () => {
    const classes = useStyles();
    const [billing, setBilling]= useState();
    const [due, setDue]= useState();
    const [generate, setGenerate]= useState();
    const [latefee, setLatefee]= useState();

    const data = {
        school_id :localStorage.getItem("school_id"),
        phase : billing ,
        generation_date :generate,
        due_date : due ,
        late_fee_charge : latefee
    }
    const sendData = () => {
        if (billing < 0 || billing > 12){
            alert("Months Can Only Be From 1-12")
        }
        else if (generate < 0 || generate >28){
            alert ("Generation date can only be from 1-28")
        }
        else if (due < 0 || due > 28){
            alert ("Due date can only be from 1-28")
        }
        else {
            axios.post(`http://fee-management-api.nastechltd.co/api/billing_period`,data)
            .then (response => {
                console.log(response);
            })
            .catch (error => console.log(error))
        }
        
    }

        
        


   

    return(
        <>
        <div class="dashboard">
        <div class="left">
            <div class="navigation">
                <div class="wrapper2">
                    <div class="abilan">
                        <img
                            src={logo}/>
                    </div>

                    <Link to="/dashboard" class="nav-link "><div class="folder-icons ">
                                <div class="icon1">
                                    <i class="fas  fa-columns"></i>
                                </div>
                                <div class="icon-name1 ">Dashboard</div>
                            </div></Link>
                            
                            {/* <div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas fa-school"></i>
                                </div>
                                <div class="icon-name"><Link  class="nav-link"to="/school">Campuses</Link></div>
                            </div> */}
                            <Link  class="nav-link"to="/class"><div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas fa-user-graduate"></i>
                                </div>
                                <div class="icon-name">Class</div>
                            </div></Link>
                            <Link  class="nav-link"to="/students"><div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas fa-user-graduate"></i>
                                </div>
                                <div class="icon-name">Students</div>
                            </div></Link>
                            <Link  class="nav-link"to="/finance"><div class="folder-icons">
                                <div class="icon1">
                                <i class="fas fa-wallet"></i>
                                </div>
                                <div class="icon-name">Finance Employee</div>
                            </div></Link>
                            <Link  class="nav-link"to="/fee"><div class="folder-icons">
                                <div class="icon1">
                                <i class="fas fa-wallet"></i>
                                </div>
                                <div class="icon-name">Fee Generation</div>
                            </div></Link>
                            <Link  class="nav-link"to="/feeperiod"><div class="folder-icons">
                                <div class="icon1">
                                <i class="fas fa-wallet active"></i>
                                </div>
                                <div class="icon-name active">Fee Period</div>
                            </div></Link>
                            <Link  class="nav-link"to="/structure"><div class="folder-icons">
                                <div class="icon1">
                                <i class="fas fa-wallet"></i>
                                </div>
                                <div class="icon-name">Fee Structure</div>
                            </div></Link>
                            <Link  class="nav-link"to="/discounted"><div class="folder-icons">
                                <div class="icon1">
                                <i class="fas fa-wallet"></i>
                                </div>
                                <div class="icon-name">Discounted</div>
                            </div></Link>
                            <Link  class="nav-link"to="/term"><div class="folder-icons">
                                <div class="icon1">
                                <i class="fas fa-wallet"></i>
                                </div>
                                <div class="icon-name">Term</div>
                            </div></Link>
                            <Link  class="nav-link"to="/expense"><div class="folder-icons">
                                <div class="icon1">
                                <i class="fas fa-wallet"></i>
                                </div>
                                <div class="icon-name">Expense Tracking</div>
                            </div></Link>
                            


                </div>
            </div>
        </div>
        <div class="right-side">
            <div class="right-header">
                <div class="top-bar">
                    <div class="top-bar-justify">
                        <div class="big-inbox">
                            Fee
                        </div>
                    </div>
                </div>
                <hr class="new-hr" />
            </div>
            <div class="right-body">
                
                <div class="message">
                    <h2 class="text-center mt-3 secondary">Billing Period</h2>
                    <hr class="new-hr1 secondary" />

                    <div class="row billing-main">
                        <div class="col-4 billing-box">
                            <TextField className="pb-3" type="number" onChange={(e)=>setBilling(e.target.value)} helperText="Month" label="Billing Period" variant="filled" />
                            <TextField className="pb-3" type="number"  onChange={(e)=>setDue(e.target.value)} helperText="The day Fee to be expired" label="Due Date" variant="filled" />
                        </div>
                        
                        <div class="col-4 billing-box">
                            <TextField type="number" className="pb-3"  onChange={(e)=>setLatefee(e.target.value)} helperText=" " label="Late Fee Charges" variant="filled" />
                            <TextField className="pb-3" type="number"  onChange={(e)=>setGenerate(e.target.value)} helperText="The day Fee to be Generated" label="Generation Date" variant="filled" />
                            
                        </div>
                    </div>
                  
                <div class="text-center my-4">  <button class="btn btn-generate btn-success" onClick={sendData}>Submit</button></div>
                </div>
                       
                
            </div>
        </div>
    </div>
        </>
    );
};
export default FeePeriod;