import {React,useEffect,useState} from 'react';
import './dashboard.css';
import { Link, useHistory,useParams } from 'react-router-dom';
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



const ClassUpdate = () => {
    const [updatedata, setUpdatedata] =useState([]);
    const { classid } = useParams();
    const history= useHistory();
    const [schoolclass, setSchoolclass]= useState();
    const [schoolid, setSchoolid]= useState();
    const [section, setSection]= useState();
    const classes = useStyles();
    console.log(classid)
    useEffect(()=>{
        axios.get(`http://fee-management-api.nastechltd.co/api/school_class/${classid}`)
        .then(response => {
            console.log(response);
            setUpdatedata(response.data)
            setSchoolclass(response.data.class)
            setSection(response.data.section)
        })
        .catch(error => console.log(error))

    },[])


  
  
    const data ={
        // school_id : localStorage.getItem("school_id"),
        class : schoolclass ,
        section : section
        
    
      }


    const sendData = () => {
      axios.put(`http://fee-management-api.nastechltd.co/api/school_class/${classid}`,data)
      .then (response => {
        console.log(response);
        console.log(response.data.id);
        history.push("/class")
      })
      .catch (error => console.log(error))
      }
   
  
  
  
// console.log(updatedata.school_name);
  
    return(
  <>
    <div className="student_main main">
      <div className="student_ent">
        <h1 className="text-center mt-2">Class Update</h1>
        <form className={classes.root} noValidate autoComplete="off">
          <TextField  className="TextField" label="Class" type="text"   value={schoolclass} onChange={(e) =>setSchoolclass(e.target.value)}/>
          <TextField  className="TextField" label="Section" type="text"   value={section} onChange={(e) =>setSection(e.target.value)} />

        
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
            <Link to="#"><button onClick={sendData} type="button" class="btn stbtn btn-primary btn-lg px-5">Update </button></Link>
            </div>
            
        </form>
      </div>
    </div>
  </>

  );
};
export default ClassUpdate;
