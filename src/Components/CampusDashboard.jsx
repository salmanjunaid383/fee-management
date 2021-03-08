import React, { useState, useEffect } from 'react';
import './dashboard.css';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal} from 'react-bootstrap';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import FormLabel from '@material-ui/core/FormLabel';
import logo from "./jb1.png";



import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

const CampusDashboard = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [data, setData]= useState([]);
    const [studentdata, setStudentdata]= useState([]);
    const [schooldata, setSchooldata]= useState([]);
    const school_id = localStorage.getItem("school_id")
    const admin_id = localStorage.getItem("admin_id")
    // useEffect(() => {
    //     axios.get(`http://fee-management-api.nastechltd.co/api/school_administrator`)
    //     .then(response => {
    //         console.log(response.data)
    //         setData(response.data)
    //     })
    //     .catch(error => console.log(error) )

    // },[])
    useEffect(() => {
        axios.get(`http://fee-management-api.nastechltd.co/api/student/${school_id}`)
        .then(response => {
            console.log(response);
            setStudentdata(response.data);
        })
        .catch(error => (console.log(error)))

    },[])
    useEffect(() => {
        axios.get(`http://fee-management-api.nastechltd.co/api/schools/${admin_id}`)
        .then(response => {
            console.log(response.data)
            setSchooldata(response.data)
        })
        .catch(error => console.log(error) )

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
        
                            <Link to="/dashboard" class="nav-link active"><div class="folder-icons ">
                                <div class="icon1">
                                    <i class="fas active fa-columns"></i>
                                </div>
                                <div class="icon-name1 active">Dashboard</div>
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
                                <i class="fas fa-wallet"></i>
                                </div>
                                <div class="icon-name">Fee Period</div>
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
                                    School Administrator
                        </div>
                            </div>
                        </div>
                        <hr class="new-hr" />
                    </div>
                    <div class="right-body">
                        <div class="scroll-cards">
                            <div class="card">
                                <div class="mails">
                                    <div class="mail-names">
                                        Schools Active
                            </div>

                                </div>
                                <div class="mail-info">
                                    {schooldata.length} Schools all over Pakistan

                        </div>
                                <div>
                                </div>

                            </div>
                            <div class="card">
                                <div class="mails">
                                    <div class="mail-names">
                                        Active Students
                            </div>

                                </div>
                                <div class="mail-info">
                                    {studentdata.length} Students
                        </div>
                                <div>
                                </div>
                            </div>
                            {/* <div class="card">
                                <div class="mails">
                                    <div class="mail-names">
                                        Visits
                                    </div>
                                </div>
                                <div class="mail-info">
                                    100K+ Visits Per Day
                                </div>
                                <div>
                                </div>
                            </div> */}
                        </div>
                        <div class="message">
                        {/* <div class="add-student">
                                <button type="button" onClick={handleShow} class="btn btn-primary btn-small"><AddIcon/> Add More</button>
                            </div> */}
                            <div class="table-responsive">
                                        <Modal show={show} onHide={handleClose}>
                                            <Modal.Header closeButton>
                                            <Modal.Title>School Administrator</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                            <div class="row billing-main">
                                                <div class="col-6 billing-box">
                                                    <TextField className="pb-3 bg-white" type="text"  label="First Name" variant="filled" />
                                                    <TextField className="pb-3 bg-white" type="number"  label="Contact No." variant="filled" />
                                                    <TextField className="pb-3 bg-white" type="password"  label="Password" variant="filled" />
                                                </div>
                                                
                                                <div class="col-6 billing-box">
                                                    <TextField className="pb-3" type="text"  label="Last Name" variant="filled" />
                                                    <TextField className="pb-3" type="email"  label="Email" variant="filled" />
                                                    <TextField className="pb-3" type="password"  label="Confirm Password" variant="filled" />
                                                </div>
                                                <div className="">
            <FormLabel component="legend">Gender</FormLabel>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="male" />
              <label class="form-check-label" for="inlineRadio1">Male</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="female" />
              <label class="form-check-label" for="inlineRadio2">Female</label>
            </div>
          </div>
                                            </div>
                                            </Modal.Body>
                                            <Modal.Footer>
                                            <button class="btn btn-secondary" onClick={handleClose}>
                                                Close
                                            </button>
                                            <button className="btn btn-primary">Create</button>
                                            </Modal.Footer>
                                        </Modal>


                                                   

         

                                <table class="table no-wrap">
                                    <thead>
                                        <tr>
                                            <th class="border-top-0">#</th>
                                            <th class="border-top-0">NAME</th>
                                            <th class="border-top-0">Gender</th>
                                            <th class="border-top-0">Email</th>
                                            <th class="border-top-0">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        { data.map ((val, i)=> {
                                            return (
                                                <tr key={i}>
                                                    <td>{val.id}</td>
                                                    <td class="txt-oflo">{`${val.first_name} ${val.last_name}`}</td>
                                                    <td>{val.gender}</td>
                                                    <td class="txt-oflo">{val.email}</td>
                                                    <td><button className="btn btn-primary">Add School</button></td>
                                                </tr>
                                                    )
                                                })}
                                                

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    );
};
export default CampusDashboard;