import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, Link, useParams } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';



const Studentparticular = () => {

    const history = useHistory();
    const [fname, setFname] = useState('');
    const [fathername, setFathername] = useState('');
    const [mname, setMname] = useState('');
    const [lname, setLname] = useState('');
    const [bform, setBform] = useState('');
    const [prevdata, setPrevdata] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [classid, setClassid] = useState('');
    const [singleclass, setSingleclass] = useState({});
    const [classdata, setClassdata] = useState([]);
    const [dob, setDOB] = useState('');
    const [pob, setPOB] = useState('');
    const [lastschool, setLastschool] = useState('');
    const [addresspresent, setAddresspresent] = useState('');
    const [addresspermanent, setAddresspermanent] = useState('');
    const [tel, setTel] = useState('');
    const [cell, setCell] = useState('');
    const { schoolid } = useParams();
    const [cell2,setCell2]=useState('')
    const school_id = localStorage.getItem("school_id");
    const form_id = localStorage.getItem("form_id");
    const [messageinfo, setMessageinfo] = useState('');
    const [message, setMessage] = useState({
        open: false,
        vertical: 'top',
        horizontal: 'right',
    });
    const { vertical, horizontal, open } = message;
    const handleMessage = () => {
        setMessage({ open: true, vertical: 'top', horizontal: 'right' });
    };
    const CloseMessage = () => {
        setMessage({ ...message, open: false });
    };
    useEffect(() => {
        axios.get(`http://fee-management-api.nastechltd.co/api/schools_class/${school_id}`)
            .then(response => {
                console.log(response.data)
                setClassdata(response.data)

            })
            .catch((error) => {
                if (error.response) {
                    setMessageinfo(error.response.data.message);
                    handleMessage();
                }
            })
        if (form_id != null) {
            axios.get(`http://fee-management-api.nastechltd.co/api/show_admission/${form_id}`)
                .then(response => {
                    console.log(response.data)
                    setPrevdata(response.data)
                    setFname(response.data.first_name);
                    setLname(response.data.last_name);
                    setMname(response.data.middle_name);
                    setFathername(response.data.father_name);
                    setDOB(response.data.date_of_birth)
                    setEmail(response.data.email)
                    setBform(response.data.b_form)
                    setLastschool(response.data.last_school_attended)
                    setPOB(response.data.place_of_birth)
                    setAddresspermanent(response.data.permanent_address)
                    setTel(response.data.tel_no)
                    setAddresspresent(response.data.address)
                    setClassid(response.data.class_id)
                    setGender(response.data.gender)
                    setCell(response.data.cell_no)
                    setCell2(response.data.cell2)
                    axios.get(`http://fee-management-api.nastechltd.co/api/show_class/${response.data.class_id}`)
                        .then(response => {
                            setSingleclass(response.data)
                        })
                        .catch((error) => {
                            if (error.response) {
                                setMessageinfo(error.response.data.message);
                                handleMessage();
                            }
                        })
                })
                .catch((error) => {
                    if (error.response) {
                        setMessageinfo(error.response.data.message);
                        handleMessage();
                    }
                })
        }
    }, [])

    const data = {
        school_id: school_id,
        first_name: fname.toUpperCase(),
        middle_name: mname.toUpperCase(),
        last_name: lname.toUpperCase(),
        address: addresspresent,
        permanent_address: addresspermanent,
        email: email,
        gender: gender,
        father_name: fathername,
        date_of_birth: dob,
        place_of_birth: pob,
        last_school_attended: lastschool,
        cell_no: cell,
        tel_no: tel,
        class_id: classid,
        b_form : bform,
        cell_no2:cell2
    }
    var today = new Date();
    var birthDate = new Date(dob);
    var age_now = today.getFullYear() - birthDate.getFullYear();

    const sendData = () => {
        // localStorage.setItem('student', JSON.stringify(data))
        if (form_id == null) {
            if (fname == '') {
                setMessageinfo("Enter First Name")
                handleMessage();
            }

            else if (lname == '') {
                setMessageinfo("Enter Last Name")
                handleMessage();
            }
            else if (bform == '') {
                setMessageinfo("Enter Bform No.")
                handleMessage();
            }
            else if (bform.length < 13 || bform.length > 13) {
                setMessageinfo("Enter Valid B-Form No.")
                handleMessage();
            }
            else if (fathername == '') {
                setMessageinfo("Enter Father Name")
                handleMessage();
            }
            else if (classid == '') {
                setMessageinfo("Select Class")
                handleMessage();
            }
            else if (tel == '') {
                setMessageinfo("Enter Telephone")
                handleMessage();
            }
            else if (gender == '') {
                setMessageinfo("Select Gender")
                handleMessage();
            }
            else if (cell == '') {
                setMessageinfo("Enter Cellphone")
                handleMessage();
            }
            else if (dob == '') {
                setMessageinfo("Enter Date of Birth")
                handleMessage();
            }
            else if (age_now < 2) {
                setMessageinfo("Enter Valid Date")
                handleMessage();
            }
            else if (pob == '') {
                setMessageinfo("Enter Place of Birth")
                handleMessage();
            }
            else if (addresspermanent == '') {
                setMessageinfo("Enter Permanent Address")
                handleMessage();
            }
            else if (addresspresent == '') {
                setMessageinfo("Enter Present Address")
                handleMessage();
            }
            else {
                if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
                    axios.post(`http://fee-management-api.nastechltd.co/api/admission_form`, data)
                        .then(response => {
                            console.log(response);
                            history.push(`/fatherparticular/${response.data.registration_no}`)
                            localStorage.setItem("form_id", response.data.id)

                            // setStudentdata(response.data);
                        })
                        .catch((error) => {
                            if (error.response) {
                                setMessageinfo(error.response.data.message);
                                handleMessage();
                            }
                        })
                }
                else {
                    setMessageinfo("Enter Valid Email")
                    handleMessage();

                }
            }
        }
        else {
            if (fname == '') {
                setMessageinfo("Enter First Name")
                handleMessage();
            }

            else if (lname == '') {
                setMessageinfo("Enter Last Name")
                handleMessage();
            }
            else if (bform == '') {
                setMessageinfo("Enter Bform No.")
                handleMessage();
            }
            else if (bform.length < 13 || bform.length > 13) {
                setMessageinfo("Enter Valid B-Form No.")
                handleMessage();
            }
            else if (fathername == '') {
                setMessageinfo("Enter Father Name")
                handleMessage();
            }
            else if (classid == '') {
                setMessageinfo("Select Class")
                handleMessage();
            }
            else if (tel == '') {
                setMessageinfo("Enter Telephone")
                handleMessage();
            }
            else if (gender == '') {
                setMessageinfo("Select Gender")
                handleMessage();
            }
            else if (cell == '') {
                setMessageinfo("Enter Cellphone")
                handleMessage();
            }
            else if (dob == '') {
                setMessageinfo("Enter Date of Birth")
                handleMessage();
            }
            else if (age_now < 2) {
                setMessageinfo("Enter Valid Date")
                handleMessage();
            }
            else if (pob == '') {
                setMessageinfo("Enter Place of Birth")
                handleMessage();
            }
            else if (addresspermanent == '') {
                setMessageinfo("Enter Permanent Address")
                handleMessage();
            }
            else if (addresspresent == '') {
                setMessageinfo("Enter Present Address")
                handleMessage();
            }
            else {
                if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
                    axios.put(`http://fee-management-api.nastechltd.co/api/admission_form/${form_id}`, data)
                        .then(response => {
                            console.log(response);
                            history.push(`/fatherparticular/${response.data.registration_no}`)
                            localStorage.setItem("form_id", response.data.id);
                            // setStudentdata(response.data);
                        })
                        .catch((error) => {
                            if (error.response) {
                                setMessageinfo(error.response.data.message);
                                handleMessage();
                            }
                        })
                }
                else {
                    setMessageinfo("Enter Valid Email")
                    handleMessage();

                }
            }
        }
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
                                    <input id="fname" defaultValue={prevdata.first_name} type="text" className="form-control" placeholder="First Name" onChange={(e) => setFname(e.target.value)} />
                                </div>
                                <div className="col-4">
                                    <label for="mname">Middle Name:</label>
                                    <input id="mname" defaultValue={prevdata.middle_name} type="text" className="form-control" placeholder="Middle Name" onChange={(e) => setMname(e.target.value)} />
                                </div>
                                <div className="col-4">
                                    <label for="lname">Last Name:</label>
                                    <input id="lname" defaultValue={prevdata.last_name} type="text" className="form-control" placeholder="Last Name" onChange={(e) => setLname(e.target.value)} />
                                </div>
                                <div className="col-4">
                                    <label for="tel">B-Form No:</label>
                                    <input id="tel" defaultValue={prevdata.b_form} type="number" className="form-control" placeholder="without '-'" onChange={(e) => setBform(e.target.value)} />
                                </div>
                                <div className="col-4">
                                    <label for="class">Select Class:</label>

                                    <select id="class" class="form-select" aria-label="Default select example" onChange={(e) => setClassid(e.target.value)}>
                                        <option selected disabled>{singleclass.name}</option>
                                        {classdata.map((val, i) => {
                                            return (
                                                <>
                                                    <option key={i} value={val.id}>{val.name}</option>
                                                </>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div className="col-4">
                                    <label for="nameLast">Father's Name:</label>
                                    <input id="nameLast" defaultValue={prevdata.father_name} type="text" className="form-control" placeholder="Father's Name" onChange={(e) => setFathername(e.target.value)} />
                                </div>
                                <div className="col-4">
                                    <label for="dob">Date Of Birth:</label>
                                    <input id="dob" defaultValue={prevdata.date_of_birth} type="date" className="form-control" placeholder="Date Of Birth" onChange={(e) => setDOB(e.target.value)} />

                                </div>

                                <div className="col-4">
                                    <label for="email">Place Of Birth</label>
                                    <input id="email" defaultValue={prevdata.place_of_birth} type="text" className="form-control" placeholder="Place of Birth" onChange={(e) => setPOB(e.target.value)} />
                                </div>
                                
                                <div className="col-4">
                                    <label for="email">School Last Attended:</label>
                                    <input id="email" defaultValue={prevdata.last_school_attended} type="text" className="form-control" placeholder="School Attended" onChange={(e) => setLastschool(e.target.value)} />
                                </div>


                                <div className="col-4">
                                    <label for="email">Student's Email:</label>
                                    <input id="email" defaultValue={prevdata.email} type="email" className="form-control" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                                </div>

{/* 
                                <div className="col-4">
                                    <label for="email">Mother's Email:</label>
                                    <input id="email" defaultValue={prevdata.mother_email} type="email" className="form-control" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                                </div> */}


                                {/* <div className="col-4">
                                    <label for="email">Father's Email:</label>
                                    <input id="email" defaultValue={prevdata.father_email} type="email" className="form-control" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                                </div> */}
                                
                                <div className="form-group col-12">
                                    <label for="address">Permanent Address</label>
                                    <textarea className="form-control" defaultValue={prevdata.permanent_address} id="address" rows="1" onChange={(e) => setAddresspermanent(e.target.value)}></textarea>
                                </div>
                                <div className="col-4">
                                    <label for="tel">Tel:</label>
                                    <input id="tel" defaultValue={prevdata.tel_no} type="number" className="form-control" placeholder="Telephone" onChange={(e) => setTel(e.target.value)} />
                                </div>
                                <div className="form-group col-8">
                                    <label for="address">Present Address</label>
                                    <textarea className="form-control" defaultValue={prevdata.address} id="address" rows="1" onChange={(e) => setAddresspresent(e.target.value)}></textarea>
                                </div>

                                <div className="col-4">
                                    <label for="tel">Cell:</label>
                                    <input id="tel" defaultValue={prevdata.cell_no} type="number" className="form-control" placeholder="Cellphone" onChange={(e) => setCell(e.target.value)} />
                                </div>
                                <div className="col-4">
                                    <label for="tel">Cell:</label>
                                    <input id="tel" defaultValue={prevdata.cell_no2} type="number" className="form-control" placeholder="Cellphone" onChange={(e) => setCell2(e.target.value)} />
                                </div>
                                
                                {form_id === null ?
                                    <>
                                        <div className="col-12 mt-5" style={{display:"flex",flexDirection:"column"}}>
                                            <label>Gender:</label>
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="radio" name="gender" id="male" value="male" onChange={(e) => setGender(e.target.value)} />
                                                <label className="form-check-label" for="male" style={{marginRight:"10px"}}>
                                                    Male
                                                </label>
                                                <input className="form-check-input" type="radio" name="gender" id="female" value="female"
                                                    onChange={(e) => setGender(e.target.value)} />
                                                <label className="form-check-label" for="female">
                                                    Female
                                                </label>
                                            </div>
                                        </div>
                                    </>
                                    :
                                    <>
                                        {prevdata.gender === "male" ?
                                            <>
                                                <div className="col-4 mt-5">
                                                    <label>Gender:</label>
                                                    <div className="form-check form-check-inline">
                                                        <input className="form-check-input" type="radio" name="gender" id="male" value="male" checked onChange={(e) => setGender(e.target.value)} />
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
                                            </>
                                            :
                                            <>
                                                <div className="col-4 mt-5">
                                                    <label>Gender:</label>
                                                    <div className="form-check form-check-inline">
                                                        <input className="form-check-input" type="radio" name="gender" id="male" value="male" onChange={(e) => setGender(e.target.value)} />
                                                        <label className="form-check-label" for="male">
                                                            Male
                                                </label>
                                                    </div>
                                                    <div className="form-check form-check-inline">
                                                        <input className="form-check-input" type="radio" name="gender" id="female" value="female" checked
                                                            onChange={(e) => setGender(e.target.value)} />
                                                        <label className="form-check-label" for="female">
                                                            Female
                                                </label>
                                                    </div>
                                                </div>
                                            </>
                                        }
                                    </>


                                }
                               


                                <div className="col-12 text-right mt-3">
                                    <button onClick={sendData} className="btn btn-success w25">Next</button>
                                </div>
                            </div>
                        </fieldset>
                    </form>
                </div>
                <Snackbar
                    anchorOrigin={{ vertical, horizontal }}
                    open={open}
                    autoHideDuration={4000}
                    onClose={CloseMessage}
                    message={messageinfo}
                    key={vertical + horizontal}
                />
            </div>

        </>);
};

export default Studentparticular;