import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import Select1 from 'react-select'
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';



// const useStyles = makeStyles((theme) => ({
//     root: {
//       '& > *': {
//         margin: theme.spacing(1),
//         width: '30ch',
//       },
//     },
//   }));
const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '30ch'
        
      },
    },
    formControl: {
      margin: theme.spacing(1),
    //   width: '30ch',
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));
  
const Admission = () => {
  const classes = useStyles();
  const [studentdata, setStudentdata]= useState([]);
  const [classdata, setClassdata]= useState([]);
  useEffect(() => {
    axios.get(`http://fee-management-api.nastechltd.co/api/school_class`)
    .then(response => {
        console.log(response.data)
        setClassdata(response.data)
    })
    .catch(error => console.log(error) )

},[])
  useEffect(() => {
    axios.get(`http://fee-management-api.nastechltd.co/api/student`)
    .then(response => {
        console.log(response);
        setStudentdata(response.data);
    })
    .catch(error => (console.log(error)))

},[])

    const options = [
        { value: 'chocolate', label: studentdata.first_name},
        { value: 'strawberry', label: 'Haider' },
        { value: 'vanilla', label: 'Mubeen' }
    ]
    // const classes = useStyles();
    // const [schoolid, setSchoolid]= useState();
    // const [billing, setBilling]= useState();
    // const [issue, setIssue]= useState();
    // const [due, setDue]= useState();
    // const [generate, setGenerate]= useState();
    // const [bank, setBank]= useState();
    // const [latefee, setLatefee]= useState();

    // const data = {
    //     school_id :schoolid,
    //     month : billing ,
    //     date_of_a_month :generate,
    //     issue_date : issue ,
    //     due_date : due ,
    //     bank_valid_date : bank ,
    //     fix_date_addup : latefee

    // }

    // const sendData = () => {
    //     axios.post(`http://fee-management-api.nastechltd.co/api/billing_date`,data)
    //     .then (response => {
    //         console.log(response);
    //     })
    //     .catch (error => console.log(error))
    // }

   

    return(
        <>
        <div class="dashboard">
        <div class="left">
            <div class="navigation">
                <div class="wrapper2">
                    <div class="abilan">
                        <img
                            src="https://www.pngitem.com/pimgs/m/536-5365943_school-management-system-icons-hd-png-download.png" />
                    </div>

                    <div class="folder-icons ">
                        <div class="icon1">
                            <i class="fas fa-columns"></i>
                        </div>
                        <div class="icon-name1 nav-link "><Link to="/dashboard" >Dashboard</Link></div>
                    </div>

                    {/* <div class="folder-icons">
                        <div class="icon1">
                            <i class="fas fa-school"></i>
                        </div>
                        <div class="icon-name nav-link"><Link to="/school" >Schools</Link></div>
                    </div> */}
                    <div class="folder-icons">
                        <div class="icon1">
                            <i class="fas fa-user-graduate"></i>
                        </div>
                        <div class="icon-name nav-link "><Link to="/students" class="">Students</Link></div>
                    </div>
                    <div class="folder-icons">
                        <div class="icon1">
                        <i class="fas fa-wallet"></i>
                        </div>
                        <div class="icon-name nav-link "><Link to="/finance">Finance Employee</Link></div>
                    </div>
                    <div class="folder-icons">
                        <div class="icon1">
                            <i class="fas fa-user-graduate"></i>
                        </div>
                        <div class="icon-name nav-link"><Link to="/fee">Fee Generation</Link></div>
                    </div>
                    <div class="folder-icons">
                        <div class="icon1">
                        <i class="fas fa-wallet"></i>
                        </div>
                        <div class="icon-name "><Link to="/feeperiod" className="nav-link active">Fee Period</Link></div>
                    </div>
                    <div class="folder-icons">
                        <div class="icon1">
                        <i class="fas fa-wallet"></i>
                        </div>
                        <div class="icon-name nav-link "><Link to="/structure">Fee Structure</Link></div>
                    </div>


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
                    <h2 class="text-center mt-3 secondary">Term</h2>
                    <hr class="new-hr1 secondary" />

                    <div class="row billing-main">
                        <div class="col-4 billing-box">
                        <TextField type="number" className="pb-3" label="Admission Charges"variant="filled" />
                        <TextField type="date" className="pb-3" label="Starting Date" defaultValue="2021-01-01" variant="filled" />
                        <TextField type="text" className="pb-3" label="Term Name" variant="filled" />



                        </div>
                        
                        <div class="col-4 billing-box">
                        <TextField type="number" className="pb-3" label="Security Deposit"variant="filled" />
                        <TextField type="date" className="pb-3" label="Ending Date" defaultValue="2021-01-01" variant="filled" />
                        <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Class</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    variant="filled"
                    
                    // onChange={(e)=> setClassid(e.target.value)}
                    >
                      { classdata.map ((val,i)=>{
                        return(
                          <MenuItem value={val.id}>{`${val.class}${val.section}`}</MenuItem>
                        )

                      })}
                  </Select>
              </FormControl>
                     
                        
                        

                     
                        </div>
                    </div>
                  
                <div class="text-center my-4">  <button class="btn btn-generate btn-success">Submit</button></div>
                </div>
                       
                
            </div>
        </div>
    </div>
        </>
    );
};
export default Admission;