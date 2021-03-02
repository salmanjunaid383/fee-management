import {React,useEffect,useState} from 'react';
import './dashboard.css';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

import firebase from './Firebase';
import StnData from './Crud.jsx'

import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

// import Radio from '@material-ui/core/Radio';
// import RadioGroup from '@material-ui/core/RadioGroup';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
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
  


const StudentEntry = () => {
  const history= useHistory();
  const [Data, setData]= useState([]);
  const [fname, setFname]= useState();
  const [classid, setClassid]= useState();
  const [lname, setLname]= useState();
  const [age, setAge]= useState();
  const [dob, setDob]= useState();
  const [address, setAddress]= useState();
  const [phone, setPhone]= useState();
  const [fathername, setFathername]= useState();
  const [mothername, setMothername]= useState();
  const [fathercnic, setFathercnic]= useState();
  const [gender, setGender]= useState();
  const classes = useStyles();


  
  const data ={
    school_class_id : classid,
    first_name : fname,
    last_name : lname,
    age : age,
    date_of_birth : dob,
    address : address,
    contact_no : phone,
    gender : gender,
    father_CNIC : fathercnic,
    mother_name : mothername,
    father_name : fathername
  }
  
    const sendData = () => {
     axios.post('http://fee-management-api.nastechltd.co/api/student', data )
      .then (response => {
        console.log(response)
        console.log(response.data.id)
        localStorage.setItem("student_id", response.data.id)
        history.push("/students")
      })
      .catch (error => console.log(error))
    }
    useEffect(() => {
      axios.get(`http://fee-management-api.nastechltd.co/api/school_class`)
      .then(response => {
          console.log(response.data)
          setData(response.data)
      })
      .catch(error => console.log(error) )

  },[])
  
  
  

  

    return(
  <>
    <div className="student_main main">
      <div className="student_ent">
        <h1 className="text-center mt-2">Student Entry</h1>
        <form className={classes.root} noValidate autoComplete="off">
        
      <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Class</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    onChange={(e)=> setClassid(e.target.value)}
                    >
                      { Data.map ((val,i)=>{
                        return(
                          <MenuItem value={val.id}>{`${val.class}${val.section}`}</MenuItem>
                        )

                      })}
                  </Select>
              </FormControl>

          <TextField  className="TextField" label="First Name" type="text" onChange={(e) =>setFname(e.target.value)}/>
          <TextField  className="TextField" label="Last Name" type="text" onChange={(e) =>setLname(e.target.value)}/>
          <TextField  className="TextField" label="Age" type="Number" onChange={(e) =>setAge(e.target.value)} />
          <TextField  className="TextField" label="Date of Birth" type="date" defaultValue="2002-03-03" onChange={(e) =>setDob(e.target.value)}/>
          <TextField  className="TextField" label="Address" multiline rows={1} onChange={(e) =>setAddress(e.target.value)}/>
          <TextField  className="TextField" label="Contact NO." type="Number" onChange={(e) =>setPhone(e.target.value)} />
          <TextField  className="TextField" label="Father Name" type="text" onChange={(e) =>setFathername(e.target.value)}/>
          <TextField  className="TextField" label="Father's CNIC" type="text" onChange={(e) =>setFathercnic(e.target.value)}/>
          <TextField  className="TextField" label="Mother Name" type="text" onChange={(e) =>setMothername(e.target.value)} />
          
        

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
export default StudentEntry;
