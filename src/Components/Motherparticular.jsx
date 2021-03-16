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
                                    <input id="guardname" type="text" className="form-control" placeholder="Full Name" onChange={(e) => setMothername(e.target.value)} />
                                </div>
                                <div className="col-4">
                                    <label for="age">Qualification:</label>
                                    <input id="age" type="text" className="form-control" placeholder="Qualification" onChange={(e) => setQualification(e.target.value)} />
                                </div>
                                <div className="col-4">
                                    <label for="guardPhone">Phone:</label>
                                    <input id="guardPhone" type="number" className="form-control" placeholder="Phone" onChange={(e) => setTel(e.target.value)} />
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
                                    <label for="guardAddress">Residential Address</label>
                                    <textarea className="form-control" id="guardAddress" onChange={(e) => setAddressresidential(e.target.value)} rows="1"></textarea>
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
                                    <Link to="/guardianparticular"><button onClick={sendData} className="btn btn-success w25">Next</button></Link>
                                </div>
                            </div>
                        </fieldset>

                    </form>
                </div>
            </div>



        </>
    );
};
export default Motherparticular;