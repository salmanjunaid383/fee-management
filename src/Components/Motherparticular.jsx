import React, { useState } from 'react';
import axios from 'axios';
import './personal.css';
import { Link, useHistory } from 'react-router-dom';
// import WebcamCapture from './Webcam'
// import Webcam from 'react-webcam';



const Motherparticular = () => {
    const history = useHistory();
    const [cnic, setCnic] = useState('');
    const [mothername, setMothername] = useState('');
    const [email, setEmail] = useState('');
    const [addressresidential, setAddressresidential] = useState('');
    const [cell, setCell] = useState('');
    const [tel, setTel] = useState('');
    const [qualification, setQualification] = useState('');
    const [occupation, setOccupation] = useState('');
    const [nationality, setNationality] = useState('');
    const [religion, setReligion] = useState('');
    const [buttonshow, setButtonshow] = useState(false);

    const handleChangemothername = (e) =>{
        if ((cnic.length > 0)&&(email.length > 0)&& (qualification.length > 0)&& (mothername.length > 0) && (occupation.length > 0)&& (nationality.length > 0)&& (religion.length > 0) && (cell.length > 0) && (tel.length > 0) &&(addressresidential.length > 0)){
            setButtonshow(true);
        }
        else{
            setButtonshow(false)
        }
        setMothername(e.target.value)
    }
    const handleChangecnic = (e) =>{
        if ((cnic.length > 0)&&(email.length > 0)&& (qualification.length > 0)&& (mothername.length > 0) && (occupation.length > 0)&& (nationality.length > 0)&& (religion.length > 0) && (cell.length > 0) && (tel.length > 0) &&(addressresidential.length > 0)){
            setButtonshow(true);
        }
        else{
            setButtonshow(false)
        }
        setCnic(e.target.value)
    }
    const handleChangeemail = (e) =>{
        if ((cnic.length > 0)&&(email.length > 0)&& (qualification.length > 0)&& (mothername.length > 0) && (occupation.length > 0)&& (nationality.length > 0)&& (religion.length > 0) && (cell.length > 0) && (tel.length > 0) &&(addressresidential.length > 0)){
            setButtonshow(true);
        }
        else{
            setButtonshow(false)
        }
        setEmail(e.target.value)
    }
    const handleChangeaddressresidential = (e) =>{
        if ((cnic.length > 0)&&(email.length > 0)&& (qualification.length > 0)&& (mothername.length > 0) && (occupation.length > 0)&& (nationality.length > 0)&& (religion.length > 0) && (cell.length > 0) && (tel.length > 0) &&(addressresidential.length > 0)){
            setButtonshow(true);
        }
        else{
            setButtonshow(false)
        }
        setAddressresidential(e.target.value)
    }
    const handleChangecell = (e) =>{
        if ((cnic.length > 0)&&(email.length > 0)&& (qualification.length > 0)&& (mothername.length > 0) && (occupation.length > 0)&& (nationality.length > 0)&& (religion.length > 0) && (cell.length > 0) && (tel.length > 0) &&(addressresidential.length > 0)){
            setButtonshow(true);
        }
        else{
            setButtonshow(false)
        }
        setCell(e.target.value)
    }
    const handleChangetel = (e) =>{
        if ((cnic.length > 0)&&(email.length > 0)&& (qualification.length > 0)&& (mothername.length > 0) && (occupation.length > 0)&& (nationality.length > 0)&& (religion.length > 0) && (cell.length > 0) && (tel.length > 0) &&(addressresidential.length > 0)){
            setButtonshow(true);
        }
        else{
            setButtonshow(false)
        }
        setTel(e.target.value)
    }
    const handleChangequalification = (e) =>{
        if ((cnic.length > 0)&&(email.length > 0)&& (qualification.length > 0)&& (mothername.length > 0) && (occupation.length > 0)&& (nationality.length > 0)&& (religion.length > 0) && (cell.length > 0) && (tel.length > 0) &&(addressresidential.length > 0)){
            setButtonshow(true);
        }
        else{
            setButtonshow(false)
        }
        setQualification(e.target.value)
    }
    const handleChangeoccupation = (e) =>{
        if ((cnic.length > 0)&&(email.length > 0)&& (qualification.length > 0)&& (mothername.length > 0) && (occupation.length > 0)&& (nationality.length > 0)&& (religion.length > 0) && (cell.length > 0) && (tel.length > 0) &&(addressresidential.length > 0)){
            setButtonshow(true);
        }
        else{
            setButtonshow(false)
        }
        setOccupation(e.target.value)
    }
    const handleChangenationality = (e) =>{
        if ((cnic.length > 0)&&(email.length > 0)&& (qualification.length > 0)&& (mothername.length > 0) && (occupation.length > 0)&& (nationality.length > 0)&& (religion.length > 0) && (cell.length > 0) && (tel.length > 0) &&(addressresidential.length > 0)){
            setButtonshow(true);
        }
        else{
            setButtonshow(false)
        }
        setNationality(e.target.value)
    }
    const handleChangereligion = (e) =>{
        if ((cnic.length > 0)&&(email.length > 0)&& (qualification.length > 0)&& (mothername.length > 0) && (occupation.length > 0)&& (nationality.length > 0)&& (religion.length > 0) && (cell.length > 0) && (tel.length > 0) &&(addressresidential.length > 0)){
            setButtonshow(true);
        }
        else{
            setButtonshow(false)
        }
        setReligion(e.target.value)
    }

    const data = {
        name: mothername,
        qualification: qualification,
        religion: religion,
        nationality: nationality,
        occupation: occupation,
        tel_no: tel,
        cell_no: cell,
        CNIC: cnic,
        residential_address: addressresidential,
        email: email
    }
    const sendData = () => {
        localStorage.setItem('mother', JSON.stringify(data))

    }

    var a = JSON.parse(localStorage.getItem('father'))
    console.log(a)




    return (
        <>

            <div className="container-fluid form_body">
                <div className="container ">
                    <h1 className="text-center text-dark">STUDENT ADMISSION FORM</h1>
                    <form onSubmit={(e)=> e.preventDefault()} >
                        <fieldset className="mt-4 field_box shadow">
                            <legend>Mother's Particular</legend>
                            <div className="row">
                                <div className="col-4">
                                    <label for="guardname">Full Name:</label>
                                    <input id="guardname" type="text" className="form-control" placeholder="Full Name" onChange={(e) => handleChangemothername(e)} />
                                </div>
                                <div className="col-4">
                                    <label for="age">Qualification:</label>
                                    <input id="age" type="text" className="form-control" placeholder="Qualification" onChange={(e) => handleChangequalification(e)} />
                                </div>
                                <div className="col-4">
                                    <label for="guardPhone">Phone:</label>
                                    <input id="guardPhone" type="number" className="form-control" placeholder="Phone" onChange={(e) => handleChangetel(e)} />
                                </div>
                                <div className="col-4">
                                    <label for="guardPhone">Cell:</label>
                                    <input id="guardPhone" type="number" className="form-control" placeholder="Cellphone" onChange={(e) => handleChangecell(e)} />
                                </div>
                                <div className="col-4">
                                    <label for="guardCnic">CNIC:</label>
                                    <input id="guardCnic" type="number" className="form-control" placeholder="CNIC Number" onChange={(e) => handleChangecnic(e)} />
                                </div>
                                <div className="col-4">
                                    <label for="email">Email:</label>
                                    <input id="email" type="email" className="form-control" placeholder="Email" onChange={(e) => handleChangeemail(e)} />
                                </div>
                                <div className="form-group col-4">
                                    <label for="guardAddress">Residential Address</label>
                                    <textarea className="form-control" id="guardAddress" onChange={(e) => handleChangeaddressresidential(e)} rows="1"></textarea>
                                </div>

                                <div className="col-4">
                                    <label for="age">Occupation:</label>
                                    <input id="age" type="text" className="form-control" placeholder="Occupation" onChange={(e) => handleChangeoccupation(e)}/>
                                </div>
                                <div className="col-4">
                                    <label for="age">Nationality:</label>
                                    <input id="age" type="text" className="form-control" placeholder="Nationality" onChange={(e) => handleChangenationality(e)} />
                                </div>
                                <div className="col-4">
                                    <label for="age">Religion:</label>
                                    <input id="age" type="text" className="form-control" placeholder="Religion" onChange={(e) => handleChangereligion(e)} />
                                </div>
                                {buttonshow == true ? 
                                <>
                                <div className="col-12 text-right mt-3">
                                    <Link to="/guardianparticular"><button onClick={sendData}className="btn btn-success w25">Next</button></Link>
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
export default Motherparticular;