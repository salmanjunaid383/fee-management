import {React,useEffect,useState} from 'react';
import './dashboard.css';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

import firebase from './Firebase';
import StnData from './Crud.jsx'

import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

// import Radio from '@material-ui/core/Radio';
// import RadioGroup from '@material-ui/core/RadioGroup';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
// import { green } from '@material-ui/core/colors';
// import Button from '@material-ui/core/Button';


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
  


const EmployeeEntry = () => {
  const history= useHistory();
  const [fname, setFname]= useState();
  const [lname, setLname]= useState();
  const [password, setPassword] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [email, setEmail]= useState();
  const [phone, setPhone]= useState();
  const [gender, setGender]= useState();
  const classes = useStyles();
  
  
  const data ={
    school_id : localStorage.getItem("school_id"),
    first_name : fname,
    last_name : lname,
    contact_no : phone,
    gender : gender,
    password : password,
    email : email

  }
  
    const sendData = () => {
      if(confirmpassword != password){
        alert("Incorrect Password")
      }
      else{
      axios.post('http://fee-management-api.nastechltd.co/api/finance_employee', data )
      .then (response => {
        console.log(response)
        console.log(response.data.id)
        localStorage.setItem("employee_id",response.data.id);
        history.push("/finance")
      })
      .catch (error => console.log(error))
    }
      }

    
  
  
  

  
    return(
  <>
    <div className="student_main main">
      <div className="student_ent">
        <h1 className="text-center mt-2">Finance Employee Entry</h1>
        <form className={classes.root} noValidate autoComplete="off">
          <TextField  className="TextField" label="First Name" type="text" onChange={(e) =>setFname(e.target.value)}/>
          <TextField  className="TextField" label="Last Name" type="text" onChange={(e) =>setLname(e.target.value)}/>
          <TextField  className="TextField" label="Email" type="email" onChange={(e) =>setEmail(e.target.value)}/>
          <TextField  className="TextField" label="Password" type="password" onChange={(e) =>setPassword(e.target.value)}/>
          <TextField  className="TextField" label="Confirm Password" type="password" onChange={(e) =>setConfirmpassword(e.target.value)}/>
          <TextField  className="TextField" label="Contact NO." type="text" onChange={(e) =>setPhone(e.target.value)} />
          
        
          {/* <div className="col-md-6 ">
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Class</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    onChange={handleChange}
                    >
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  </Select>
              </FormControl>
          </div> */}
          <div className="">
            <FormLabel component="legend">Gender</FormLabel>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="male" onChange={(e) =>setGender(e.target.value)}/>
              <label class="form-check-label" for="inlineRadio1">Male</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="female" onChange={(e) =>setGender(e.target.value)}/>
              <label class="form-check-label" for="inlineRadio2">Female</label>
            </div>
          </div>
      
          
      
      
            <div className="student-btn">
            <Link to="#"><button onClick={sendData} type="button" class="btn stbtn btn-primary btn-lg px-5">Add </button></Link>
            </div>
            
        </form>
      </div>
    </div>
  </>

  );
};
export default EmployeeEntry;
