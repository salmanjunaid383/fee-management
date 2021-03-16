import React, { useState } from 'react';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';



const Studentparticular = () => {

    const history = useHistory();
    const [fname, setFname] = useState('');
    const [fathername, setFathername] = useState('');
    const [mname, setMname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [classid, setClassid] = useState('');
    const [dob, setDOB] = useState('');
    const [pob, setPOB] = useState('');
    const [lastschool, setLastschool] = useState('');
    const [addresspresent, setAddresspresent] = useState('');
    const [addresspermanent, setAddresspermanent] = useState('');
    const [tel, setTel] = useState('');
    const [cell, setCell] = useState('');

    const data = {
        first_name : fname,
        middle_name : mname,
        last_name : lname,
        address : addresspresent,
        permanent_address : addresspermanent,
        email : email,
        gender : gender,
        father_name : fathername,
        date_of_birth : dob,
        place_of_birth : pob,
        last_school_attended : lastschool,
        cell_no : cell,
        tel_no : tel
    }
    const sendData = () => {
        localStorage.setItem('student', JSON.stringify(data))
    }
    






    return (
        <>
            <div className="container-fluid form_body">
                <div className="container ">
                    <h1 className="text-center text-dark">STUDENT ADMISSION FORM</h1>
                    <form onSubmit={(e) => e.preventDefault()} >


                        <fieldset className="mt-4 field_box shadow">
                            <legend>Student's Particular</legend>
                            <div className="row">
                                <div className="col-4">
                                    <label for="fname">First Name:</label>
                                    <input id="fname" type="text" className="form-control" placeholder="First Name" onChange={(e) => setFname(e.target.value)} />
                                </div>
                                <div className="col-4">
                                    <label for="mname">Middle Name:</label>
                                    <input id="mname" type="text" className="form-control" placeholder="Middle Name" onChange={(e) => setMname(e.target.value)} />
                                </div>
                                <div className="col-4">
                                    <label for="lname">Last Name:</label>
                                    <input id="lname" type="text" className="form-control" placeholder="Last Name" onChange={(e) => setLname(e.target.value)} />
                                </div>
                                <div className="col-4">
                                    <label for="class">Select Class:</label>

                                    <select id="class" class="form-select" aria-label="Default select example" onChange={(e) => setClassid(e.target.value)}>
                                        <option selected>Class</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                </div>
                                <div className="col-4">
                                    <label for="nameLast">Father's Name:</label>
                                    <input id="nameLast" type="text" className="form-control" placeholder="Father's Name" onChange={(e) => setFathername(e.target.value)} />
                                </div>
                                <div className="col-4">
                                    <label for="dob">Date Of Birth:</label>
                                    <input id="dob" type="date" className="form-control" placeholder="Date Of Birth" onChange={(e) => setDOB(e.target.value)} />

                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label for="email">Email:</label>
                                    <input id="email" type="email" className="form-control" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="col">
                                    <label for="email">School Last Attended:</label>
                                    <input id="email" type="text" className="form-control" placeholder="School Attended" onChange={(e) => setLastschool(e.target.value)} />
                                </div>
                                <div className="col">
                                    <label for="email">Place Of Birth</label>
                                    <input id="email" type="text" className="form-control" placeholder="Place of Birth" onChange={(e) => setPOB(e.target.value)} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-8">
                                    <label for="address">PermanentAddress</label>
                                    <textarea className="form-control" id="address" rows="1" onChange={(e) => setAddresspermanent(e.target.value)}></textarea>
                                </div>
                                <div className="col-4">
                                    <label for="tel">Tel:</label>
                                    <input id="tel" type="number" className="form-control" placeholder="Telephone" onChange={(e) => setTel(e.target.value)} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-8">
                                    <label for="address">Present Address</label>
                                    <textarea className="form-control" id="address" rows="1" onChange={(e) => setAddresspresent(e.target.value)}></textarea>
                                </div>
                                <div className="col-4">
                                    <label for="tel">Cell:</label>
                                    <input id="tel" type="number" className="form-control" placeholder="Cellphone" onChange={(e) => setCell(e.target.value)} />
                                </div>

                                <div className="col-4">
                                    <label>Gender:</label>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="gender" id="male" value="male" onChange={(e) => setGender(e.target.value)} />
                                        <label className="form-check-label" for="male">
                                            Male
                                        </label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="gender" id="female" value="female"
                                            onChange={(e) => setGender(e.target.value)} />
                                        <label className="form-check-label" for="female">
                                            Female
                                        </label>
                                    </div>
                                </div>
                                <div className="col-8 text-right">
                                    <Link to="/fatherparticular"><button onClick={sendData} className="btn btn-success w25">Next</button></Link>
                                </div>


                            </div>

                        </fieldset>






                    </form>
                </div>
            </div>

        </>);
};

export default Studentparticular;