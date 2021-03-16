import React, { useState } from 'react';
import axios from 'axios';
import './personal.css';
import { Link, useHistory } from 'react-router-dom';
// import WebcamCapture from './Webcam'
// import Webcam from 'react-webcam';



const Emergency = () => {


    const [name, setName] = useState('');
    const [relation, setRelation] = useState('');
    const [address, setAddress] = useState('');
    const [cnic, setCnic] = useState('');
    const [cell, setCell] = useState('');
    const [tel, setTel] = useState('');
    const [buttonshow, setButtonshow] = useState(false);

    const history = useHistory();
    
    const handleChange = (e) =>{
        setCell(e.target.value)
        if ((cnic.length > 0) && (relation.length > 0) && (name.length > 0) && (cell.length > 0) && (tel.length > 0) && (address.length > 0)){
            setButtonshow(true);
        }
        else{
            setButtonshow(false)
        }
    }
    
    console.log(buttonshow)
    console.log(cell)
    console.log(tel)
    

    var student = JSON.parse(localStorage.getItem('student'))
    var guardian = JSON.parse(localStorage.getItem('guardian'))
    var mother = JSON.parse(localStorage.getItem('mother'))
    var father = JSON.parse(localStorage.getItem('father'))
    var sibling = JSON.parse(localStorage.getItem('siblings'))
    var emergency = JSON.parse(localStorage.getItem('emergency'))
    // console.log(guardian)
    
    const data = {
        name : name,
        CNIC : cnic,
        address : address,
        cell_no : cell,
        tel_no : tel,
        relation : relation
    }
    const d ={
         students : [student],
         guardians : [guardian],
         mothers : [mother],
         fathers : [father],
         emergencies : [data],
         siblings : sibling.siblings
         
    }
    const sendData = () => {
        // localStorage.setItem('emergency', JSON.stringify(data))
        axios.post(`http://fee-management-api.nastechltd.co/api/admission_form`, d)
        .then(response => {
            console.log(response.data)
            history.push("/requirements")
        })
        .catch(error => console.log(error))
        
        // axios.post(`http://fee-management-api.nastechltd.co/api/student_guardian`, {
        //     CNIC: "567890",
        // cell: "76890",
        // email: "klakla@gmail.com",
        // name: "rtyuio",
        // nationality: "jukil",
        // occupation: "trtyuio",
        // qualification: "tryuio",
        // religion: "tjhkl",
        // residential_address: "ertyuio",
        // tel: "567890"})
        // .then(response => {
        //     console.log(response)
        // })
        // .error (error => console.log(error))

      }


    return (
        <>

            <div className="container-fluid form_body">
                <div className="container ">
                    <h1 className="text-center text-dark">STUDENT ADMISSION FORM</h1>
                    <form onSubmit={(e)=> e.preventDefault()} >
                    <fieldset className="mt-4 field_box shadow">
                        <legend>Incase Of Emergency</legend>
                        <div className="row">
                                <div className="col-4">
                                    <label for="guardCnic">CNIC:</label>
                                    <input id="guardCnic" type="number" className="form-control" placeholder="CNIC Number" onChange={(e)=> setCnic(e.target.value)}/>
                                </div>
                                <div className="col-4">
                                    <label for="email">Name of the person to be contacted:</label>
                                    <input id="email" type="text" className="form-control" placeholder="Name" onChange={(e)=> setName(e.target.value)}/>
                                </div>
                                <div className="form-group col-4">
                                    <label for="guardAddress">Relation with the student</label>
                                    <input id="email" type="text" className="form-control" placeholder="Realtion" onChange={(e)=> setRelation(e.target.value)}/>
                                </div>
                                <div className="form-group col-4">
                                    <label for="guardAddress">Address</label>
                                    <textarea className="form-control" id="guardAddress" rows="1" onChange={(e)=> setAddress(e.target.value)}></textarea>
                                </div>
                                <div className="col-4">
                                    <label for="guardPhone">Telephone:</label>
                                    <input id="guardPhone" type="number" className="form-control" placeholder="Telephone" onChange={(e)=> setTel(e.target.value)}/>
                                </div>
                                <div className="col-4">
                                    <label for="guardPhone">Cell:</label>
                                    <input id="guardPhone" type="number" className="form-control" placeholder="Cell" onChange={handleChange}/>
                                </div>
                                {buttonshow == true ? 
                                <>
                                <div className="col-12 text-right mt-3">
                                    <button onClick={sendData}className="btn btn-success w25">Next</button>
                                </div>
                                </>
                                :
                                null
                                }
                                
                            </div>
                            

                    </fieldset>

                    </form>
                </div>
            </div>



        </>
    );
};
export default Emergency;