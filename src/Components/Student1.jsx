import React,{useState,useEffect} from 'react';
import './dashboard.css';
import axios from 'axios';
import { Link, useHistory, useParams } from 'react-router-dom';
import logo from './jb1.png'

import UpdateIcon from '@material-ui/icons/Update';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import StnData from './Crud.jsx'

import firebase from './Firebase'




  
const Student1 = () => {
    
    const history= useHistory();
    const {studentid}= useParams();
    const [data, setData]= useState([]);
    const school_id = localStorage.getItem("school_id")

    useEffect(()=>{
        axios.get(`http://fee-management-api.nastechltd.co/api/show_student/${studentid}`)
        .then(response => {
            console.log(response.data);
            setData(response.data)
        })
        .catch(error => console.log(error))
    
    },[])


    

    return (
        <>
        
            <div class="dashboard">
                <div class="left">
                    <div class="navigation">
                        <div class="wrapper2">
                            <div class="abilan">
                                <img
                                    src={logo} />
                            </div>

                            <Link to="/dashboard" class="nav-link "><div class="folder-icons ">
                                <div class="icon1">
                                    <i class="fas  fa-columns"></i>
                                </div>
                                <div class="icon-name1 ">Dashboard</div>
                            </div></Link>

                            <Link class="nav-link" to="/class"><div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas fa-user-graduate"></i>
                                </div>
                                <div class="icon-name">Class</div>
                            </div></Link>
                            <Link class="nav-link" to="/students"><div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas fa-user-graduate active"></i>
                                </div>
                                <div class="icon-name active">Students</div>
                            </div></Link>
                            <Link class="nav-link" to="/finance"><div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas fa-wallet"></i>
                                </div>
                                <div class="icon-name">Finance Employee</div>
                            </div></Link>
                            <Link class="nav-link" to="/fee"><div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas fa-wallet"></i>
                                </div>
                                <div class="icon-name">Fee Generation</div>
                            </div></Link>
                            <Link class="nav-link" to="/feeperiod"><div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas fa-wallet"></i>
                                </div>
                                <div class="icon-name">Fee Period</div>
                            </div></Link>
                            <Link class="nav-link" to="/structure"><div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas fa-wallet"></i>
                                </div>
                                <div class="icon-name">Fee Structure</div>
                            </div></Link>
                            <Link class="nav-link" to="/discounted"><div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas fa-wallet"></i>
                                </div>
                                <div class="icon-name">Discounted</div>
                            </div></Link>
                            <Link class="nav-link" to="/term"><div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas fa-wallet"></i>
                                </div>
                                <div class="icon-name">Term</div>
                            </div></Link>
                            <Link class="nav-link" to="/expense"><div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas fa-wallet"></i>
                                </div>
                                <div class="icon-name">Expense Tracking</div>
                            </div></Link>
                            <Link class="nav-link" to="/ledger"><div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas fa-wallet"></i>
                                </div>
                                <div class="icon-name">Student Ledger</div>
                            </div></Link>


                        </div>
                    </div>
                </div>
                <div class="right-side">
                    <div class="right-header">
                        <div class="top-bar">
                            <div class="top-bar-justify">
                                <div class="big-inbox">
                                    Students
                                </div>
                            </div>
                        </div>
                        <hr class="new-hr" />
                    </div>
                    <div class="right-body">
                        
                        <div class="message row">
                                <h2 class="text-center">Student Information</h2>
                                <hr class="new-hr" />
                            <div className="student-info-box col-4">
                                <div>
                                <h5 class="student-info"> First Name : </h5>
                                <p class="student-info"> {data.first_name}</p>
                                </div>
                                <div>
                                    <div>
                                <h5 class="student-info"> Last Name : </h5>
                                <p class="student-info">{data.last_name}</p>
                                </div>
                                <div>
                                <h5 class="student-info"> Address : </h5>
                                <p class="student-info"> {data.address}</p>
                                </div>
                                <div>
                                <h5 class="student-info">Father Name : </h5>
                                <p class="student-info"> {data.father_name} </p>
                                </div>
                                <div>
                                <h5 class="student-info"> Father cnic : </h5>
                                <p class="student-info"> {data.father_CNIC}</p>
                                </div>
                                </div>
                            </div>
                            <div className="student-info-box col-4">
                            <div>
                                <h5 class="student-info"> Gender : </h5>
                                <p class="student-info"> {data.gender}</p>
                                </div>
                                <div>
                                <h5 class="student-info"> Age : </h5>
                                <p class="student-info"> {data.age}</p>
                                </div>
                                <div>
                                <h5 class="student-info"> DOB : </h5>
                                <p class="student-info"> {data.date_of_birth}</p>
                                <div>
                                <h5 class="student-info"> Contact : </h5>
                                <p class="student-info"> {data.contact_no} </p>
                                </div>
                                </div>
                                <div>
                                <h5 class="student-info">Mother Name : </h5>
                                <p class="student-info"> {data.mother_name} </p>
                                </div>
                            </div>
                        </div>
                    </div>
                            
                </div>
            </div>
        </>
    );

};
export default Student1;