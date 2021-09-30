import React, { useState, useEffect } from 'react';
import { useHistory, Link, useParams } from 'react-router-dom';

import axios from 'axios';
// import React from 'react';   
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';


const Termsandconditions = () => {
 

    // let btnEnabled = document.querySelector('button')
    const [checkState,setCheckState]=useState('');
    const { school_id } = useParams();
    console.log(school_id)
    localStorage.setItem("school_id",school_id)
    
    function handleChange()
    {
        if(checkState=='') setCheckState("true")
        if(checkState=='true') setCheckState("false")
        if(checkState=='false') setCheckState('true')
        
        
    }

    return(
        <>
            <h1>Here are the following terms and conditions </h1>        
            <br/>
            <br/>
           <p>
            We are pleased to know that you are seeking admission for your child in this school. before 
           </p>
            <div className="container">
       <div className="row" >  
       <div className="col-xl-12" style={{display:"flex", justifyContent:"center"}}>   
        <FormControl component="fieldset">
      {/* <FormLabel component="legend">Please check the below box</FormLabel> */}
      <FormGroup aria-label="position" row>
        <FormControlLabel
          value="start"
          onChange={handleChange}
          control={<Checkbox color="primary" />}
          label="Terms and Conditions"
          labelPlacement="start"
        />
      </FormGroup>
    </FormControl>
    <br/>
    </div>
   <Link to={`/issued-form/${localStorage.getItem("school_id")}`}>

    <div className="col-xl-12" style={{display:"flex", justifyContent:"center"}}>
    <button disabled={checkState=='' || checkState=="false"? true : false}  style={checkState=='true' ? {backgroundColor:"green", color:"#fff", border:"none",outline:"none",padding:"7px", borderRadius:"5px"} : {backgroundColor:"grey", color:"#000", border:"none",outline:"none",padding:"7px", borderRadius:"5px"}}>
        Proceed
    </button>

    </div>

   </Link>
    </div>   
    </div>         
        </>
  );

    
}
export default Termsandconditions;