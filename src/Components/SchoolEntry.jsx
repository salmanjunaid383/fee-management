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
  


const SchoolEntry = () => {
  const history= useHistory();
  const [schoolName, setSchoolName]= useState();
  const [phone, setPhone]= useState();
  const [address, setAddress]= useState();
  const [adminid, setAdminid]= useState();
  const classes = useStyles();
  
  
  const data ={
    admin_id : localStorage.getItem("admin_id"),
    school_name : schoolName,
    contact_no : phone,
    address : address

  }
  
    const sendData = () => {
      axios.post('http://fee-management-api.nastechltd.co/api/school', data )
      .then (response => {
        console.log(response);
        console.log(response.data.id);
        localStorage.setItem("school_id", response.data.id);
        history.push("/school")
      })
      .catch (error => {
        console.log(error)
        alert("Invali Field(s)")
      })
      }
   
  
  
  

  
    return(
  <>
    <div className="student_main main">
      <div className="student_ent">
        <h1 className="text-center mt-2">School Entry</h1>
        <form className={classes.root} noValidate autoComplete="off">
          <TextField  className="TextField" label="School Name" type="text" onChange={(e) =>setSchoolName(e.target.value)}/>
          <TextField  className="TextField" label="Contact NO." type="number" onChange={(e) =>setPhone(e.target.value)} />
          <TextField  className="TextField" label="Address" multiline rows={1} onChange={(e) =>setAddress(e.target.value)}/>

        
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
          
      
          
      
      
            <div className="student-btn">
            <Link to="#"><button onClick={sendData} type="button" class="btn stbtn btn-primary btn-lg px-5">Add </button></Link>
            </div>
            
        </form>
      </div>
    </div>
  </>

  );
};
export default SchoolEntry;
