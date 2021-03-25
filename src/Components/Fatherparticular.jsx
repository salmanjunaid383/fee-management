import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './personal.css';
import { Link, useHistory, useParams } from 'react-router-dom';
// import WebcamCapture from './Webcam'
// import Webcam from 'react-webcam';



const Fatherparticular = () => {


    const history = useHistory();
    const [Fathercnic, setFatherCnic] = useState('');
    const [Fathername, setFatherName] = useState('');
    const [Fatheremail, setFatherEmail] = useState('');
    const [Fatheraddressoffice, setFatherAddressoffice] = useState('');
    const [Fathercell, setFatherCell] = useState('');
    const [Fathertel, setFatherTel] = useState('');
    const [Fatherqualification, setFatherQualification] = useState('');
    const [Fatheroccupation, setFatherOccupation] = useState('');
    const [Fathernationality, setFatherNationality] = useState('');
    const [Fatherreligion, setFatherReligion] = useState('');
    const [Mothername, setMotherName] = useState('');
    const [Mothercnic, setMotherCnic] = useState('');
    const [Motheremail, setMotherEmail] = useState('');
    const [Motheraddress, setMotherAddress] = useState('');
    const [Mothercell, setMotherCell] = useState('');
    const [Mothertel, setMotherTel] = useState('');
    const [prevdata, setPrevdata] = useState('');
    const [Motherqualification, setMotherQualification] = useState('');
    const [Motheroccupation, setMotherOccupation] = useState('');
    const [Mothernationality, setMotherNationality] = useState('');
    const [Motherreligion, setMotherReligion] = useState('');
    const { formNo } = useParams();
    const parent_id = localStorage.getItem("parent_id");
    localStorage.setItem("form_no", formNo)
    useEffect(() => {

        if (parent_id != null) {
            axios.get(`http://fee-management-api.nastechltd.co/api/student_parent/${parent_id}`)
                .then(response => {
                    console.log(response.data)
                    setPrevdata(response.data)
                    setMotherName(response.data.mother_name);
                    setMotherQualification(response.data.mother_qualification)
                    setMotherNationality(response.data.mother_nationality)
                    setMotherOccupation(response.data.mother_occupation)
                    setMotherReligion(response.data.mother_religion)
                    setMotherAddress(response.data.mother_residential_address)
                    setMotherEmail(response.data.mother_email)
                    setMotherCnic(response.data.mother_CNIC)
                    setMotherCell(response.data.mother_cell_no)
                    setMotherTel(response.data.mother_tel_no)
                    setFatherName(response.data.father_name);
                    setFatherQualification(response.data.father_qualification)
                    setFatherNationality(response.data.father_nationality)
                    setFatherOccupation(response.data.father_occupation)
                    setFatherReligion(response.data.father_religion)
                    setFatherAddressoffice(response.data.father_office_address)
                    setFatherEmail(response.data.father_email)
                    setFatherCnic(response.data.father_CNIC)
                    setFatherCell(response.data.father_cell_no)
                    setFatherTel(response.data.father_tel_no)

                })
                .catch((error) => {
                    if (error.response) {
                        alert(error.response.data.message);
                    }
                })
        }
    }, [])










    const data = {
        form_no: formNo,
        father_name: Fathername,
        father_qualification: Fatherqualification,
        father_religion: Fatherreligion,
        father_nationality: Fathernationality,
        father_occupation: Fatheroccupation,
        father_tel_no: Fathertel,
        father_cell_no: Fathercell,
        father_CNIC: Fathercnic,
        father_office_address: Fatheraddressoffice,
        father_email: Fatheremail,
        mother_name: Mothername,
        mother_qualification: Motherqualification,
        mother_religion: Motherreligion,
        mother_nationality: Mothernationality,
        mother_occupation: Motheroccupation,
        mother_tel_no: Mothertel,
        mother_cell_no: Mothercell,
        mother_CNIC: Mothercnic,
        mother_residential_address: Motheraddress,
        mother_email: Motheremail
    }

    const sendData = () => {
        if ((Fathercnic.length > 0) && (Fatheremail.length > 0) && (Fatherqualification.length > 0) && (Fathername.length > 0) && (Fatheroccupation.length > 0) && (Fathernationality.length > 0) && (Fatherreligion.length > 0) && (Fathercell.length > 0) && (Fathertel.length > 0) && (Fatheraddressoffice.length > 0) && (Mothercnic.length > 0) && (Motheremail.length > 0) && (Motherqualification.length > 0) && (Mothername.length > 0) && (Motheroccupation.length > 0) && (Mothernationality.length > 0) && (Motherreligion.length > 0) && (Mothercell.length > 0) && (Mothertel.length > 0) && (Motheraddress.length > 0)) {
            if (parent_id == null) {
                if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(Fatheremail) && /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(Motheremail)) {
                    axios.post(`http://fee-management-api.nastechltd.co/api/student_parent`, data)
                        .then(response => {
                            localStorage.setItem('parent_id', response.data.id)
                            console.log(response.data);
                            history.push("/guardianparticular")
                            // setStudentdata(response.data);
                        })
                        .catch((error) => {
                            if (error.response) {
                                alert(error.response.data.message);
                            }
                        })
                }
                else{
                    alert("Enter Valid Email(s)")
                }


            }
            else {
                if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(Fatheremail) && /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(Motheremail)) {
                    axios.put(`http://fee-management-api.nastechltd.co/api/student_parent/${parent_id}`, data)
                        .then(response => {
                            localStorage.setItem('parent_id', response.data.id)
                            console.log(response.data);
                            history.push("/guardianparticular")
                            // setStudentdata(response.data);
                        })
                        .catch((error) => {
                            if (error.response) {
                                alert(error.response.data.message);
                            }
                        })
                }
                else{
                    alert("Enter Valid Email(s)")
                }
            }
        }
        else {
            alert("enter valid fileds")
        }

    }













    return (
        <>

            <div className="container-fluid form_body">
                <div className="container ">
                    <h1 className="text-center text-dark">STUDENT ADMISSION FORM</h1>
                    <form onSubmit={(e) => e.preventDefault()} >
                        <fieldset className="mt-1 field_box shadow">
                            <legend>Father's Particular</legend>
                            <div className="row">
                                <div className="col-4">
                                    <label for="guardname">Full Name:</label>
                                    <input id="guardname" defaultValue={prevdata.father_name} type="text" className="form-control" placeholder="Full Name" onChange={(e) => setFatherName(e.target.value)} />
                                </div>
                                <div className="col-4">
                                    <label for="age">Qualification:</label>
                                    <input id="age" defaultValue={prevdata.father_qualification} type="text" className="form-control" placeholder="Qualification" onChange={(e) => setFatherQualification(e.target.value)} />
                                </div>
                                <div className="col-4">
                                    <label for="guardPhone">Tel:</label>
                                    <input id="guardPhone" defaultValue={prevdata.father_tel_no} type="number" className="form-control" placeholder="Telephone" onChange={(e) => setFatherTel(e.target.value)} />
                                </div>
                                <div className="col-4">
                                    <label for="guardPhone">Cell:</label>
                                    <input id="guardPhone" defaultValue={prevdata.father_cell_no} type="number" className="form-control" placeholder="Cellphone" onChange={(e) => setFatherCell(e.target.value)} />
                                </div>


                                <div className="col-4">
                                    <label for="guardCnic">CNIC:</label>
                                    <input id="guardCnic" defaultValue={prevdata.father_CNIC} type="number" className="form-control" placeholder='Without "-" ' onChange={(e) => setFatherCnic(e.target.value)} />
                                </div>
                                <div className="col-4">
                                    <label for="email">Email:</label>
                                    <input id="email" defaultValue={prevdata.father_email} type="email" className="form-control" placeholder="Email" onChange={(e) => setFatherEmail(e.target.value)} />
                                </div>
                                <div className="form-group col-4">
                                    <label for="guardAddress">Office Address</label>
                                    <textarea className="form-control" defaultValue={prevdata.father_office_address} id="guardAddress" onChange={(e) => setFatherAddressoffice(e.target.value)} rows="1"></textarea>
                                </div>

                                <div className="col-4">
                                    <label for="age">Occupation:</label>
                                    <input id="age" defaultValue={prevdata.father_occupation} type="text" className="form-control" placeholder="Occupation" onChange={(e) => setFatherOccupation(e.target.value)} />
                                </div>
                                <div className="col-4">
                                    <label for="age">Nationality:</label>
                                    <input id="age" defaultValue={prevdata.father_nationality} type="text" className="form-control" placeholder="Nationality" onChange={(e) => setFatherNationality(e.target.value)} />
                                </div>
                                <div className="col-4">
                                    <label for="age">Religion:</label>
                                    <input id="age" defaultValue={prevdata.father_religion} type="text" className="form-control" placeholder="Religion" onChange={(e) => setFatherReligion(e.target.value)} />
                                </div>

                            </div>
                            <legend>Mother's Particular</legend>
                            <div className="row">
                                <div className="col-4">
                                    <label for="guardname">Full Name:</label>
                                    <input id="guardname" defaultValue={prevdata.mother_name} type="text" className="form-control" placeholder="Full Name" onChange={(e) => setMotherName(e.target.value)} />
                                </div>
                                <div className="col-4">
                                    <label for="age">Qualification:</label>
                                    <input id="age" defaultValue={prevdata.mother_qualification} type="text" className="form-control" placeholder="Qualification" onChange={(e) => setMotherQualification(e.target.value)} />
                                </div>
                                <div className="col-4">
                                    <label for="guardPhone">Phone:</label>
                                    <input id="guardPhone" defaultValue={prevdata.mother_tel_no} type="number" className="form-control" placeholder="Phone" onChange={(e) => setMotherTel(e.target.value)} />
                                </div>
                                <div className="col-4">
                                    <label for="guardPhone">Cell:</label>
                                    <input id="guardPhone" defaultValue={prevdata.mother_cell_no} type="number" className="form-control" placeholder="Cellphone" onChange={(e) => setMotherCell(e.target.value)} />
                                </div>
                                <div className="col-4">
                                    <label for="guardCnic">CNIC:</label>
                                    <input id="guardCnic" defaultValue={prevdata.mother_CNIC} type="number" className="form-control" placeholder="CNIC Number" onChange={(e) => setMotherCnic(e.target.value)} />
                                </div>
                                <div className="col-4">
                                    <label for="email">Email:</label>
                                    <input id="email" defaultValue={prevdata.mother_email} type="email" className="form-control" placeholder="Email" onChange={(e) => setMotherEmail(e.target.value)} />
                                </div>
                                <div className="form-group col-4">
                                    <label for="guardAddress">Residential Address</label>
                                    <textarea className="form-control" defaultValue={prevdata.mother_residential_address} id="guardAddress" onChange={(e) => setMotherAddress(e.target.value)} rows="1"></textarea>
                                </div>

                                <div className="col-4">
                                    <label for="age">Occupation:</label>
                                    <input id="age" defaultValue={prevdata.mother_occupation} type="text" className="form-control" placeholder="Occupation" onChange={(e) => setMotherOccupation(e.target.value)} />
                                </div>
                                <div className="col-4">
                                    <label for="age">Nationality:</label>
                                    <input id="age" defaultValue={prevdata.mother_nationality} type="text" className="form-control" placeholder="Nationality" onChange={(e) => setMotherNationality(e.target.value)} />
                                </div>
                                <div className="col-4">
                                    <label for="age">Religion:</label>
                                    <input id="age" defaultValue={prevdata.mother_religion} type="text" className="form-control" placeholder="Religion" onChange={(e) => setMotherReligion(e.target.value)} />
                                </div>
                                <div className="row">
                                    <div className="col-6 text-left mt-3">
                                        <Link to="/studentparticular"><button className="btn btn-success w25">Back</button></Link>
                                    </div>
                                    <div className="col-6 text-right mt-3">
                                        <button onClick={sendData} className="btn btn-success w25">Next</button>
                                    </div>
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