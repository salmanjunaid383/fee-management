import React, { useState } from 'react';
import axios from 'axios';
import './personal.css';
import { useHistory } from 'react-router-dom';
// import WebcamCapture from './Webcam'
// import Webcam from 'react-webcam';
 


const Personal = () => {

        
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [gender, setGender] = useState('');
    const [dob, setDOB] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [Confirmpass, setConfirmpass] = useState('');
    const [phone, setPhone] = useState('');
    const [postal, setPostal] = useState('');
    const [email, setEmail] = useState('');
    const [cnic, setCNIC] = useState('');

    const history = useHistory();




    const SendData = () => {


        if (password !== Confirmpass) {
            alert("Incorrect Password")
        } else {

            axios.post('http://employee-portal-api.nastechltd.co/api/employee', {

                first_name: fname,
                last_name: lname,
                gender: gender,
                date_of_birth: dob,
                address: address,


                cell_phone: phone,
                password: password,
                postal_code: postal,
                email: email,
                government_id: cnic



            })
                .then((response) => {
                    console.log(response.data.id)
                    localStorage.setItem('user_id', response.data.id)
                    history.push('/guardian')

                })
                .catch(error => console.log(error))



        }
    }



    return (
        <>

            <div className="container register">
                <div className="row">
                    <div className="col-md-3 register-left">
                        <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt="" />
                        <h3>Welcome</h3>
                        <p>You are 30 seconds away from earning your own money!</p>
                        <input type="submit" name="" value="Login" /><br />


                    </div>
                    <div className="col-md-9 register-right">
                        {/* <ul className="nav nav-tabs nav-justified" id="myTab" role="tablist">
                            <li className="nav-item">
                                <Link className="nav-link active" id="home-tab" data-toggle="tab" to="/" role="tab" aria-controls="home" aria-selected="true">Employee</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" id="profile-tab" data-toggle="tab" to="/guardian" role="tab" aria-controls="profile" aria-selected="false">Guardian</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" id="profile-tab" data-toggle="tab" to="/employment" role="tab" aria-controls="profile" aria-selected="false">Employment</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" id="profile-tab" data-toggle="tab" to="/education" role="tab" aria-controls="profile" aria-selected="false">Education</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link " id="profile-tab" data-toggle="tab" to="/reference" role="tab" aria-controls="profile" aria-selected="false">Reference</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link " id="profile-tab" data-toggle="tab" to="/device" role="tab" aria-controls="profile" aria-selected="false">Device</Link>
                            </li>
                        </ul> */}
                        {/* <ul className="nav nav-tabs nav-justified" id="myTab" role="tablist">
                            <li className="nav-item">

                                <Link className="nav-link " id="home-tab" to="/">Employee</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link " id="profile-tab" to="/profile"> Hirer</Link>
                            </li>
                        </ul> */}

                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <h3 className="register-heading">Apply as a Employee</h3>
                                <div className="row register-form">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="First Name *" onChange={(e) => setFname(e.target.value)} />
                                        </div>
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="Last Name *" onChange={(e) => setLname(e.target.value)} />
                                        </div>
                                        <div className="form-group">
                                            <input type="password" className="form-control" placeholder="Password *" onChange={(e) => setPassword(e.target.value)} />
                                        </div>
                                        <div className="form-group">
                                            <input type="password" className="form-control" placeholder="Confirm Password *" onChange={(e) => setConfirmpass(e.target.value)} />
                                        </div>
                                        <div className="form-group">
                                            <input type="number" className="form-control" placeholder="Postal Code *" onChange={(e) => setPostal(e.target.value)} />
                                        </div>
                                        <div className="form-group">
                                            <div className="maxl">
                                                <label className="radio inline">
                                                    <input type="radio" name="gender" value="male" onChange={(e) => setGender(e.target.value)} />
                                                    <span> Male </span>
                                                </label>
                                                <label className="radio inline">
                                                    <input type="radio" name="gender" value="female" onChange={(e) => setGender(e.target.value)} />
                                                    <span>Female </span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input type="email" className="form-control" placeholder="Your Email *" onChange={(e) => setEmail(e.target.value)} />
                                        </div>
                                        <div className="form-group">
                                            <input type="number" minLength="10" maxLength="12" name="txtEmpPhone" className="form-control" placeholder="Your Phone *" onChange={(e) => setPhone(e.target.value)} />
                                        </div>
                                        <div className="form-group">
                                            <input placeholder="Date of Birth *" className="textbox-n form-control " type="text" onFocus={(e) => (e.currentTarget.type = "date")} onBlur={(e) => (e.currentTarget.type = "text")} id="date" onChange={(e) => setDOB(e.target.value)} />

                                        </div>
                                        <div className="form-group">
                                            <input type="number" className="form-control" placeholder="Enter Your CNIC/B-FORM No.*" onChange={(e) => setCNIC(e.target.value)} />
                                        </div>
                                        <div className="form-group">
                                            <textarea className="form-control" placeholder="Full Address *" rows="1" onChange={(e) => setAddress(e.target.value)} />
                                        </div>
                                        {/* <WebcamCapture/> */}

                                        <button className="btnRegister" onClick={SendData}>Register</button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>


        </>
    );
};
export default Personal;