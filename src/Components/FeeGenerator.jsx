import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from "./jb1.png";
import { Modal } from 'react-bootstrap';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(0),
            width: '30ch'

        },
    },
    formControl: {
        margin: theme.spacing(0),
          width: '20ch',
        // minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(0),
    },
}));


const Fee = () => {
    const classes = useStyles();
    const [classid, setClassid]= useState();
    const [classdata, setClassdata]= useState([]);
    const [description, setDescription]= useState();
    const [charges, setCharges]= useState();
    const [descriptionadmission, setDescriptionadmission]= useState();
    const [chargesadmission, setChargesadmission]= useState();
    const [descriptionyear, setDescriptionyear]= useState();
    const [chargesyear, setChargesyear]= useState();
    const school_id = localStorage.getItem("school_id")
    useEffect(() => {
        axios.get(`http://fee-management-api.nastechltd.co/api/schools_class/${school_id}`)
            .then(response => {
                console.log(response.data)
                setClassdata(response.data)
            })
            .catch(error => console.log(error))

    }, [])
    const sendAdmission = () =>{
        axios.post(`http://fee-management-api.nastechltd.co/api/admission_charges`,
        {
            discription : descriptionadmission,
            charges : chargesadmission,
            class_id : classid

        })
        .then(response => {
            console.log(response)
            setDescriptionadmission('');
            setChargesadmission('');

        })
        .catch(error => console.log(error) )

    };
    const sendMonthly = () =>{
        axios.post(`http://fee-management-api.nastechltd.co/api/monthly_charges`,
        {
            description : description,
            charges : charges,
            fee_structure_id :1
        })
        .then(response => {
 
            console.log(response)
            setDescription('');
            setCharges('');
        })
        .catch(error => console.log(error) )
    };


    const sendYearly = () =>{
        axios.post(`http://fee-management-api.nastechltd.co/api/yearly_charges`,
        {
            description : descriptionyear,
            charges : chargesyear,
            // fee_structure_id: 1  
            // description : "tuition",
            // charges : 344,
            // fee_structure_id: 8  
        })
        .then(response => {
            console.log(response)
            setDescriptionyear('');
            setChargesyear('');
        })        
        .catch(error => console.log(error) )
    };



    
    return(
        <>
            <div class="dashboard">
                <div class="left">
                    <div class="navigation">
                        <div class="wrapper2">
                            <div class="abilan">
                                <img src={logo} />
                            </div>
                            <Link to="/dashboard" class="nav-link active"><div class="folder-icons ">
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
                                <i class="fas fa-wallet active"></i>
                                </div>
                                <div class="icon-name active">Fee Generation</div>
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
                                    Fee
                                </div>
                            </div>
                        </div>
                        <hr class="new-hr" />
                    </div>
                    <div class="right-body">
                        <div class="message">
                            <h2 class="text-center secondary">Fee Generation</h2>
                            {/* <hr class="new-hr1 secondary" /> */}
                            {/* <div class="row">
                                <div class="col-5"> */}
                                    {/* <input class="inline select" name="class" onChange={(e)=> setSchoolclass(e.target.value)} aria-label="Default select example"/> */}
                                {/* <label for="select-class" class="inline" >Class:</label>     
                                    <select class="inline select" id="select-class" aria-label="Default select example">
                                        <option selected disabled>Select Class</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                </select>  
                                </div>
                                <div class="col-5">
                                    <label for="tax">Tax:</label>
                                    <input type="text" id="tax" name="tax" onChange={(e)=> setTax(e.target.value)} placeholder="Enter Tax" class="inline select"/>
                                </div>
                                <div className="col-2">
                                    <button className="btn btn-primary" onClick={sendTax}>Submit</button>
                                </div>
                            </div> */}
                            <div class="monthly-charges">
                                <hr class="new-hr"/>
                                <h4 class="text-center">Admission Charges</h4>
                                <hr class="new-hr"/>
                                <div  class="row mb-2">
                                    <div class="col-3">
                                     <FormControl className={classes.formControl}>
                                                    <InputLabel id="demo-simple-select-label">Class</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        variant="filled"

                                                        onChange={(e) => setClassid(e.target.value)}
                                                    >
                                                        {classdata.map((val, i) => {
                                                            return (
                                                                <MenuItem value={val.id}>{`${val.name}`}</MenuItem>
                                                            )

                                                        })}
                                                    </Select>
                                                </FormControl>
                                    </div>   
                                    <div class="col-3">
                                        <input type="text" id="tax" name="DescriptionAdmission" value={descriptionadmission} onChange={e => setDescriptionadmission(e.target.value)} placeholder="Description" class="inline select"/>
                                    </div>
                                                
                                    <div class="col-3">
                                        <input type="text" id="tax" name="ChargesAdmission" value={chargesadmission} onChange={e => setChargesadmission(e.target.value)} placeholder="Charges" class="inline select"/>
                                    </div>
                                    <div class="col-3">
                                        <button type="button" onClick={sendAdmission} class="btn btn-primary mt-1">Add </button>
                                    </div>
                                </div>
                            </div>
                            <hr class="new-hr"/>
                            <div class="monthly-charges">
                                <h4 class="text-center">Monthly Charges</h4>
                                <hr class="new-hr"/>
                                <div  class="row mb-2">
                                    <div class="col-3">
                                        <input type="text" id="tax" name="Description" onChange={(e) => setDescription(e.target.value)} value={description} placeholder="Description" class="inline select"/>
                                    </div>
                                    <div class="col-5">
                                        <input type="text" id="tax" name="Charges" onChange={(e) => setCharges(e.target.value)} value={charges} placeholder="Charges" class="inline select"/>
                                    </div>
                                    <div class="col-2">
                                        <button type="button" onClick={sendMonthly}  class="btn btn-primary mt-1">Add </button>
                                    </div>
                                </div>
                            </div>
                            <div class="monthly-charges">
                                <hr class="new-hr"/>
                                <h4 class="text-center">Yearly Charges</h4>
                                <hr class="new-hr"/>
                                <div  class="row mb-2">
                                    <div class="col-5">
                                        <input type="text" id="tax" name="DescriptionYear" value={descriptionyear} onChange={e => setDescriptionyear(e.target.value)} placeholder="Description" class="inline select"/>
                                    </div>
                                    <div class="col-5">
                                        <input type="text" id="tax" name="ChargesYear" value={chargesyear} onChange={e => setChargesyear(e.target.value)} placeholder="Charges" class="inline select"/>
                                    </div>
                                    <div class="col-2">
                                        <button type="button" onClick={sendYearly} class="btn btn-primary mt-1">Add </button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Fee;




                        
                                           


                                
                                
                   
                

                   
            
                   
                    
                       
                     
                       
                    

                        


