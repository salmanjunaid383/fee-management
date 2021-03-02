import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import logo from './jb1.png'
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
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));
  
const Discounted = () => {
  const classes = useStyles();
  const [studentdata, setStudentdata]= useState([]);
  const [studentid, setStudentid]= useState();
  const [discount, setDiscount]= useState();
  const school_id = localStorage.getItem("school_id")
  useEffect(() => {
    axios.get(`http://fee-management-api.nastechltd.co/api/student/${school_id}`)
    .then(response => {
        console.log(response);
        setStudentdata(response.data);
    })
    .catch(error => (console.log(error)))

},[])


    const data = {
        student_id : 1,
        discount : discount

    }

    const sendData = () => {
        axios.post(`http://fee-management-api.nastechltd.co/api/discount`,data)
        .then (response => {
            console.log(response);
        })
        .catch (error => console.log(error))
    }

   

    return(
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
                                    <i class="fas  fa-columns"></i>
                                </div>
                                <div class="icon-name1 ">Dashboard</div>
                            </div></Link>
                            
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
                                <i class="fas fa-wallet active"></i>
                                </div>
                                <div class="icon-name active">Discounted</div>
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
                    <h2 class="text-center mt-3 secondary">Discount</h2>
                    <hr class="new-hr1 secondary" />

                    <div class="row billing-main">
                        <div class="col-4 billing-box">
                        <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Student</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    // value={id}
                    onChange={(e)=> setStudentid(e.target.value)}
                    >
                      { studentdata.map ((val,i)=>{
                        return(
                          <MenuItem value={val.id}>{`${val.first_name} ${val.last_name}`}</MenuItem>
                        )

                      })}
                  </Select>
              </FormControl>
                        {/* <Select1 className="pb-3 searchSelect"  onChange={(e)=>setStudentid(e.target.value)} placeholder="Select Student" options={options} /> */}
                        <TextField type="number"  helperText="Discount Amount" onChange={(e)=>setDiscount(e.target.value)} label="Discount" variant="filled" />


                        </div>
                    </div>
                        
                        
                     
                        
                        

                     
                        
                  
                <div class="text-center my-4">  <button onClick={sendData}class="btn btn-generate btn-success">Submit</button></div>
                </div>
                       
                
            </div>
        </div>
    </div>
        </>
    );
};
export default Discounted;