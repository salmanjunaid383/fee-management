import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, Link, useParams } from 'react-router-dom';



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
    const {schoolid}= useParams();
    const [buttonshow, setButtonshow] = useState(false);

    const handleChangegender = (e) =>{
        if ((fname.length > 0)&& (lastschool.length > 0) && (lname.length > 0)&& (email.length > 0)&& (gender.length > 0)&& (dob.length > 0)&& (pob.length > 0) && (fathername.length > 0) && (mname.length > 0) && (cell.length > 0) && (tel.length > 0) && (addresspermanent.length > 0)&&(addresspresent.length > 0)){
            setButtonshow(true);
        }
        else{
            setButtonshow(false)
        }
        setGender(e.target.value)
    }
    const handleChangefname = (e) =>{
        if ((fname.length > 0)&& (lastschool.length > 0) && (lname.length > 0)&& (email.length > 0)&& (gender.length > 0)&& (dob.length > 0)&& (pob.length > 0) && (fathername.length > 0) && (mname.length > 0) && (cell.length > 0) && (tel.length > 0) && (addresspermanent.length > 0)&&(addresspresent.length > 0)){
            setButtonshow(true);
        }
        else{
            setButtonshow(false)
        }
        setFname(e.target.value)
    }
    const handleChangemname = (e) =>{
        if ((fname.length > 0)&& (lastschool.length > 0) && (lname.length > 0)&& (email.length > 0)&& (gender.length > 0)&& (dob.length > 0)&& (pob.length > 0) && (fathername.length > 0) && (mname.length > 0) && (cell.length > 0) && (tel.length > 0) && (addresspermanent.length > 0)&&(addresspresent.length > 0)){
            setButtonshow(true);
        }
        else{
            setButtonshow(false)
        }
        setMname(e.target.value)
    }
    const handleChangelname = (e) =>{
        if ((fname.length > 0)&& (lastschool.length > 0) && (lname.length > 0)&& (email.length > 0)&& (gender.length > 0)&& (dob.length > 0)&& (pob.length > 0) && (fathername.length > 0) && (mname.length > 0) && (cell.length > 0) && (tel.length > 0) && (addresspermanent.length > 0)&&(addresspresent.length > 0)){
            setButtonshow(true);
        }
        else{
            setButtonshow(false)
        }
        setLname(e.target.value)
    }
    const handleChangefathername = (e) =>{
        if ((fname.length > 0)&& (lastschool.length > 0) && (lname.length > 0)&& (email.length > 0)&& (gender.length > 0)&& (dob.length > 0)&& (pob.length > 0) && (fathername.length > 0) && (mname.length > 0) && (cell.length > 0) && (tel.length > 0) && (addresspermanent.length > 0)&&(addresspresent.length > 0)){
            setButtonshow(true);
        }
        else{
            setButtonshow(false)
        }
        setFathername(e.target.value)
    }
    const handleChangedob = (e) =>{
        if ((fname.length > 0)&& (lastschool.length > 0) && (lname.length > 0)&& (email.length > 0)&& (gender.length > 0)&& (dob.length > 0)&& (pob.length > 0) && (fathername.length > 0) && (mname.length > 0) && (cell.length > 0) && (tel.length > 0) && (addresspermanent.length > 0)&&(addresspresent.length > 0)){
            setButtonshow(true);
        }
        else{
            setButtonshow(false)
        }
        setDOB(e.target.value)
    }
    const handleChangepob = (e) =>{
        if ((fname.length > 0)&& (lastschool.length > 0) && (lname.length > 0)&& (email.length > 0)&& (gender.length > 0)&& (dob.length > 0)&& (pob.length > 0) && (fathername.length > 0) && (mname.length > 0) && (cell.length > 0) && (tel.length > 0) && (addresspermanent.length > 0)&&(addresspresent.length > 0)){
            setButtonshow(true);
        }
        else{
            setButtonshow(false)
        }
        setPOB(e.target.value)
    }
    const handleChangeemail = (e) =>{
        if ((fname.length > 0)&& (lastschool.length > 0) && (lname.length > 0)&& (email.length > 0)&& (gender.length > 0)&& (dob.length > 0)&& (pob.length > 0) && (fathername.length > 0) && (mname.length > 0) && (cell.length > 0) && (tel.length > 0) && (addresspermanent.length > 0)&&(addresspresent.length > 0)){
            setButtonshow(true);
        }
        else{
            setButtonshow(false)
        }
        setEmail(e.target.value)
    }
    const handleChangelastschool = (e) =>{
        if ((fname.length > 0)&& (lastschool.length > 0) && (lname.length > 0)&& (email.length > 0)&& (gender.length > 0)&& (dob.length > 0)&& (pob.length > 0) && (fathername.length > 0) && (mname.length > 0) && (cell.length > 0) && (tel.length > 0) && (addresspermanent.length > 0)&&(addresspresent.length > 0)){
            setButtonshow(true);
        }
        else{
            setButtonshow(false)
        }
        setLastschool(e.target.value)
    }
    const handleChangeaddresspermanent = (e) =>{
        if ((fname.length > 0)&& (lastschool.length > 0) && (lname.length > 0)&& (email.length > 0)&& (gender.length > 0)&& (dob.length > 0)&& (pob.length > 0) && (fathername.length > 0) && (mname.length > 0) && (cell.length > 0) && (tel.length > 0) && (addresspermanent.length > 0)&&(addresspresent.length > 0)){
            setButtonshow(true);
        }
        else{
            setButtonshow(false)
        }
        setAddresspermanent(e.target.value)
    }
    const handleChangeaddresspresent = (e) =>{
        if ((fname.length > 0)&& (lastschool.length > 0) && (lname.length > 0)&& (email.length > 0)&& (gender.length > 0)&& (dob.length > 0)&& (pob.length > 0) && (fathername.length > 0) && (mname.length > 0) && (cell.length > 0) && (tel.length > 0) && (addresspermanent.length > 0)&&(addresspresent.length > 0)){
            setButtonshow(true);
        }
        else{
            setButtonshow(false)
        }
        setAddresspresent(e.target.value)
    }
    const handleChangetel = (e) =>{
        if ((fname.length > 0)&& (lastschool.length > 0) && (lname.length > 0)&& (email.length > 0)&& (gender.length > 0)&& (dob.length > 0)&& (pob.length > 0) && (fathername.length > 0) && (mname.length > 0) && (cell.length > 0) && (tel.length > 0) && (addresspermanent.length > 0)&&(addresspresent.length > 0)){
            setButtonshow(true);
        }
        else{
            setButtonshow(false)
        }
        setTel(e.target.value)
    }
    const handleChangecell = (e) =>{
        if ((fname.length > 0)&& (lastschool.length > 0) && (lname.length > 0)&& (email.length > 0)&& (gender.length > 0)&& (dob.length > 0)&& (pob.length > 0) && (fathername.length > 0) && (mname.length > 0) && (cell.length > 0) && (tel.length > 0) && (addresspermanent.length > 0)&&(addresspresent.length > 0)){
            setButtonshow(true);
        }
        else{
            setButtonshow(false)
        }
        setCell(e.target.value)
    }


    // useEffect(() => {
    //     axios.get(`http://fee-management-api.nastechltd.co/api/show_school/${schoolid}`)
    //     .then(response => {
    //             console.log(response);
    //             // setStudentdata(response.data);
    //         })
    //         .catch(error => (console.log(error)))

    // }, [])
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
                                    <input id="fname" type="text" className="form-control" placeholder="First Name" onChange={(e) => handleChangefname(e)} />
                                </div>
                                <div className="col-4">
                                    <label for="mname">Middle Name:</label>
                                    <input id="mname" type="text" className="form-control" placeholder="Middle Name" onChange={(e) => handleChangemname(e)} />
                                </div>
                                <div className="col-4">
                                    <label for="lname">Last Name:</label>
                                    <input id="lname" type="text" className="form-control" placeholder="Last Name" onChange={(e) => handleChangelname(e)} />
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
                                    <input id="nameLast" type="text" className="form-control" placeholder="Father's Name" onChange={(e) => handleChangefathername(e)} />
                                </div>
                                <div className="col-4">
                                    <label for="dob">Date Of Birth:</label>
                                    <input id="dob" type="date" className="form-control" placeholder="Date Of Birth" onChange={(e) => handleChangedob(e)} />

                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label for="email">Email:</label>
                                    <input id="email" type="email" className="form-control" placeholder="Email" onChange={(e) => handleChangeemail(e)} />
                                </div>
                                <div className="col">
                                    <label for="email">School Last Attended:</label>
                                    <input id="email" type="text" className="form-control" placeholder="School Attended" onChange={(e) => handleChangelastschool(e)} />
                                </div>
                                <div className="col">
                                    <label for="email">Place Of Birth</label>
                                    <input id="email" type="text" className="form-control" placeholder="Place of Birth" onChange={(e) => handleChangepob(e)} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-8">
                                    <label for="address">Permanent Address</label>
                                    <textarea className="form-control" id="address" rows="1" onChange={(e) => handleChangeaddresspermanent(e)}></textarea>
                                </div>
                                <div className="col-4">
                                    <label for="tel">Tel:</label>
                                    <input id="tel" type="number" className="form-control" placeholder="Telephone" onChange={(e) => handleChangetel(e)} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-8">
                                    <label for="address">Present Address</label>
                                    <textarea className="form-control" id="address" rows="1" onChange={(e) => handleChangeaddresspresent(e)}></textarea>
                                </div>
                                <div className="col-4 mt-5">
                                    <label>Gender:</label>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="gender" id="male" value="male" onChange={(e) => handleChangegender(e)} />
                                        <label className="form-check-label" for="male">
                                            Male
                                        </label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="gender" id="female" value="female"
                                            onChange={(e) => handleChangegender(e)} />
                                        <label className="form-check-label" for="female">
                                            Female
                                        </label>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <label for="tel">Cell:</label>
                                    <input id="tel" type="number" className="form-control" placeholder="Cellphone" onChange={(e) => handleChangecell(e)} />
                                </div>

                                {buttonshow == true ? 
                                <>
                                <div className="col-12 text-right mt-3">
                                    <Link to="fatherparticular"><button onClick={sendData}className="btn btn-success w25">Next</button></Link>
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

        </>);
};

export default Studentparticular;