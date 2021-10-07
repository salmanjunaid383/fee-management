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
        
            <h1 style={{textAlign:"center", marginTop:"30px"}}>Here are the following terms and conditions </h1>        
            <br/>
            <br/>
            <div className="" style={{width:"90%", margin:"auto"}}>
           <p>
            We are pleased to know that you are seeking admission for your child in this school. before filling the admisiion form please go through there points very carefully so that is the child is admitted, you are able to know what is expected from both the parents and child.
           </p>
           <p>
             <b>1.</b> W.G.S.S.(wonderland Grammer Secondary Shool) caters the students for the Matric classes.
           </p>

           <p>
           <b>2.</b> The student will have to come time i.e before 07.50 hours. Any student, if late, will NOT be allowed to attend class and will have to go home.NO EXCUSES WHATSOEVER WILL BE ENTERTAINED.
           </p>

           <p>
           <b>3.</b>The student will have to come daily in uniform, neatly dressed. The student must be equipped with all the books etc, as work is done regularly in class.
           </p>

           <p>
           <b>4.</b>Complaints, if any should directly be made to PRINCIPAL, VICE PRINCIPAL or INCHARGE alone.
           </p>

           <p>
           <b>5.</b>Every student must have daily homework diary. Parent should check and sign daily.All exercise books should be covered with plastic sheet.
           </p>

           <p>
           <b>6.</b>IF a student is absent, a note of excuse must follow. If the absense is more than a day, a Medical Certificate is a must
           </p>

           <p>
           <b>7.</b>Parent should devote some time to their children. Education is a two way traffic, it is not enough to send the student to school and leave everything to the teachers.
           </p>

           <p>
           <b>8.</b>In pri primary section we are following Montessori method of teaching where the learning is activity based, which caters not only to personality development of the young mind and enhances their considence.
           </p>

           <p>
           <b>9.</b>Parent should plan their summer and winter vacations, as no leave will be allowed during the acadmic year. 
           </p>

           <p>
           <b>10.</b>The boy's haircut should be crew-cut.
           </p>

           <p>
           <b>11.</b>The Parents/Guardians should understand that school management do manage the transport say Bus, Mini Bus, Suzuki etc. for the collective convinence of the parents at their entire responsibilty/risk. 
             School management is not at all responsible in any way.Transport charges are also to be settled by the parents/guardians etc. with the transporters independently without interferance or consent of the school. School Management is totally released in such mattters.Pick and drop of the student(s) is entirely the responsibilty of the parent. Parent are also advised to keep a photo copy of the CNIC of the transporter and his contact number.
           </p>

           <p>
           <b>12.</b>Our hopes are to make your child a worthy member of society and strong pillar of Pakistan. This is only possible with your co-operation. In case of any query feel free to contact us any time. Once the admission is finalized fee shall not be refunded. 
           </p>
           </div>













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

    <div className="col-xl-12" style={{display:"flex", justifyContent:"center", marginBottom:"20px"}}>
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