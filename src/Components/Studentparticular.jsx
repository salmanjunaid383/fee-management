import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, Link, useParams } from 'react-router-dom';



const Studentparticular = () => {

    const history = useHistory();
    const [fname, setFname] = useState('');
    const [fathername, setFathername] = useState('');
    const [mname, setMname] = useState('');
    const [lname, setLname] = useState('');
    const [prevdata, setPrevdata] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [classid, setClassid] = useState();
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
    const [buttonshow, setButtonshow] = useState(false);
    const school_id = localStorage.getItem("school_id");
    const form_id = localStorage.getItem("form_id");

    useEffect(() => {
        axios.get(`http://fee-management-api.nastechltd.co/api/schools_class/${school_id}`)
            .then(response => {
                console.log(response.data)
                setClassdata(response.data)

            })
            .catch((error) => {
                if (error.response) {
                    alert(error.response.data.message);
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
                    setLastschool(response.data.last_school_attended)
                    setPOB(response.data.place_of_birth)
                    setAddresspermanent(response.data.permanent_address)
                    setTel(response.data.tel_no)
                    setAddresspresent(response.data.address)
                    setClassid(response.data.class_id)
                    setGender(response.data.gender)
                    setCell(response.data.cell_no)
                    axios.get(`http://fee-management-api.nastechltd.co/api/show_class/${response.data.class_id}`)
                        .then(response => {
                            setSingleclass(response.data)
                        })
                        .catch((error) => {
                            if (error.response) {
                                alert(error.response.data.message);
                            }
                        })
                })
                .catch((error) => {
                    if (error.response) {
                        alert(error.response.data.message);
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
        class_id: classid
    }

    const sendData = () => {
        // localStorage.setItem('student', JSON.stringify(data))
        if ((fname.length > 0) && (lastschool.length > 0) && (lname.length > 0) && (email.length > 0) && (gender.length > 0) && (dob.length > 0) && (pob.length > 0) && (fathername.length > 0) && (mname.length > 0) && (cell.length > 0) && (tel.length > 0) && (addresspermanent.length > 0) && (addresspresent.length > 0)) {
            if (form_id == null) {
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
                                alert(error.response.data.message);
                            }
                        })
                }
                else {
                    alert("Enter Valid Email")
                }

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
                                alert(error.response.data.message);
                            }
                        })
                }
                else{
                    alert("Enter Valid Email")

                }

            }

        }
        else {
            alert("Enter Valid Fields")
            // console.log(data)
            // console.log(fname.length)
            // console.log(mname.length)
            // console.log(lname.length)
            // console.log(fathername.length)
            // console.log(addresspermanent.length)
            // console.log(addresspresent.length)
            // console.log(email.length)
            // console.log(gender.length)
            // console.log(dob.length)
            // console.log(pob.length)
            // console.log(lastschool.length)
            // console.log(cell.length)
            // console.log(tel.length)
        }
    }

    // console.log(classid)





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
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label for="email">Email:</label>
                                    <input id="email" defaultValue={prevdata.email} type="email" className="form-control" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="col">
                                    <label for="email">School Last Attended:</label>
                                    <input id="email" defaultValue={prevdata.last_school_attended} type="text" className="form-control" placeholder="School Attended" onChange={(e) => setLastschool(e.target.value)} />
                                </div>
                                <div className="col">
                                    <label for="email">Place Of Birth</label>
                                    <input id="email" defaultValue={prevdata.place_of_birth} type="text" className="form-control" placeholder="Place of Birth" onChange={(e) => setPOB(e.target.value)} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-8">
                                    <label for="address">Permanent Address</label>
                                    <textarea className="form-control" defaultValue={prevdata.permanent_address} id="address" rows="1" onChange={(e) => setAddresspermanent(e.target.value)}></textarea>
                                </div>
                                <div className="col-4">
                                    <label for="tel">Tel:</label>
                                    <input id="tel" defaultValue={prevdata.tel_no} type="number" className="form-control" placeholder="Telephone" onChange={(e) => setTel(e.target.value)} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-8">
                                    <label for="address">Present Address</label>
                                    <textarea className="form-control" defaultValue={prevdata.address} id="address" rows="1" onChange={(e) => setAddresspresent(e.target.value)}></textarea>
                                </div>
                                {form_id === null ?
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
                                <div className="col-4">
                                    <label for="tel">Cell:</label>
                                    <input id="tel" defaultValue={prevdata.cell_no} type="number" className="form-control" placeholder="Cellphone" onChange={(e) => setCell(e.target.value)} />
                                </div>


                                <div className="col-12 text-right mt-3">
                                    <button onClick={sendData} className="btn btn-success w25">Next</button>
                                </div>



                            </div>

                        </fieldset>






                    </form>
                </div>
            </div>

        </>);
};

export default Studentparticular;