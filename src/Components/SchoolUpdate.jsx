import { React, useEffect, useState } from 'react';
import './dashboard.css';
import { Link, useHistory, useParams } from 'react-router-dom';
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



const SchoolUpdate = () => {
  const [classdata, setClassdata] = useState([]);
  const [sectiondata, setSectiondata] = useState();
  const final_data = []

  const classes = useStyles();
  useEffect(() => {
    axios.get(`http://fee-management-api.nastechltd.co/api/schools_class`)
      .then(response => {
        console.log(response.data)
        setClassdata(response.data)
      })
      .catch(error => console.log(error))
  },[])  
  useEffect(() => {
    axios.get(`http://fee-management-api.nastechltd.co/api/section`)
      .then(response => {
        console.log(response.data)
        setSectiondata(response.data)
      })
      .catch(error => console.log(error))
  },[])

    console.log(classdata[0])
    console.log()

  //   if (sectiondata.length > 0) {
  //     
  // }
  return (
    <>
      <h1>jahanzaib</h1>
    </>

  );
};
export default SchoolUpdate;







