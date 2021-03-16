import React, { useState } from 'react';
import axios from 'axios';
import './personal.css';
import { Link, useHistory } from 'react-router-dom';
// import WebcamCapture from './Webcam'
// import Webcam from 'react-webcam';



const Fatherparticular = () => {


    const history = useHistory();
    const [cnic, setCnic] = useState('');
    const [fathername, setFathername] = useState('');
    const [email, setEmail] = useState('');
    const [addressoffice, setAddressoffice] = useState('');
    const [cell, setCell] = useState('');
    const [tel, setTel] = useState('');
    const [qualification, setQualification] = useState('');
    const [occupation, setOccupation] = useState('');
    const [nationality, setNationality] = useState('');
    const [religion, setReligion] = useState('');






    var a = JSON.parse(localStorage.getItem('student'))
    console.log(a)
    const data = {
        name: fathername,
        qualification: qualification,
        religion: religion,
        nationality: nationality,
        occupation: occupation,
        tel_no: tel,
        cell_no: cell,
        CNIC: cnic,
        office_address: addressoffice,
        email: email
    }

    const sendData = () => {
        localStorage.setItem('father', JSON.stringify(data))

    }













    return (
        <>

            <div className="container-fluid form_body">
                <div className="container ">
                    <h1 className="text-center text-dark">STUDENT ADMISSION FORM</h1>
                    <form onSubmit={(e) => e.preventDefault()} >
                        <fieldset className="mt-4 field_box shadow">
                            <legend>Father's Particular</legend>
                            <div className="row">
                                <div className="col-4">
                                    <label for="guardname">Full Name:</label>
                                    <input id="guardname" type="text" className="form-control" placeholder="Full Name" onChange={(e) => setFathername(e.target.value)} />
                                </div>
                                <div className="col-4">
                                    <label for="age">Qualification:</label>
                                    <input id="age" type="text" className="form-control" placeholder="Qualification" onChange={(e) => setQualification(e.target.value)} />
                                </div>
                                <div className="col-4">
                                    <label for="guardPhone">Tel:</label>
                                    <input id="guardPhone" type="number" className="form-control" placeholder="Telephone" onChange={(e) => setTel(e.target.value)} />
                                </div>
                                <div className="col-4">
                                    <label for="guardPhone">Cell:</label>
                                    <input id="guardPhone" type="number" className="form-control" placeholder="Cellphone" onChange={(e) => setCell(e.target.value)} />
                                </div>


                                <div className="col-4">
                                    <label for="guardCnic">CNIC:</label>
                                    <input id="guardCnic" type="number" className="form-control" placeholder="CNIC Number" onChange={(e) => setCnic(e.target.value)} />
                                </div>
                                <div className="col-4">
                                    <label for="email">Email:</label>
                                    <input id="email" type="email" className="form-control" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="form-group col-4">
                                    <label for="guardAddress">Office Address</label>
                                    <textarea className="form-control" id="guardAddress" onChange={(e) => setAddressoffice(e.target.value)} rows="1"></textarea>
                                </div>

                                <div className="col-4">
                                    <label for="age">Occupation:</label>
                                    <input id="age" type="text" className="form-control" placeholder="Occupation" onChange={(e) => setOccupation(e.target.value)} />
                                </div>
                                <div className="col-4">
                                    <label for="age">Nationality:</label>
                                    <input id="age" type="text" className="form-control" placeholder="Nationality" onChange={(e) => setNationality(e.target.value)} />
                                </div>
                                <div className="col-4">
                                    <label for="age">Religion:</label>
                                    <input id="age" type="text" className="form-control" placeholder="Religion" onChange={(e) => setReligion(e.target.value)} />
                                </div>
                                <div className="col-12 text-right mt-3">
                                    <Link to="motherparticular"><button onClick={sendData} className="btn btn-success w25">Next</button></Link>
                                </div>

                            </div>
                        </fieldset>
                    </form>
                </div>
            </div>



        </>
    );
};
export default Fatherparticular;