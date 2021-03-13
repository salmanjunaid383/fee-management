import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
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
  
const ShowFeePeriod = () => {
    const classes = useStyles();
    const [due, setDue]= useState();
    const [generate, setGenerate]= useState();
    const [latefee, setLatefee]= useState();
    const history = useHistory();

    

    
        
        

    const logOut = () => {
        localStorage.clear();
        history.push("/")
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
                        <button onClick={logOut} class="btn text-bolder text-right">Log Out</button>

                    </div>
                </div>
                <hr class="new-hr" />
            </div>
            <div class="right-body">
                
                <div class="message">
                
                </div>
                       
                
            </div>
        </div>
    </div>
        </>
    );
};
export default ShowFeePeriod;