import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './personal.css';
import { Link, useHistory, useParams } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
// import WebcamCapture from './Webcam'
// import Webcam from 'react-webcam';



const Fatherparticular = () => {


    const history = useHistory();
    const [Fathercnic, setFatherCnic] = useState('');
    const [Fathername, setFatherName] = useState('');
    const [Fatheremail, setFatherEmail] = useState('');
    const [Fatheraddressoffice, setFatherAddressoffice] = useState('');
    const [Fathercell, setFatherCell] = useState('');
    const [Fathercell2, setFatherCell2] = useState('');
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
    const [Mothercell2, setMotherCell2] = useState('');
    const [Mothertel, setMotherTel] = useState('');
    const [prevdata, setPrevdata] = useState('');
    const [getdata, setGetData] = useState('');
    const [Motherqualification, setMotherQualification] = useState('');
    const [Motheroccupation, setMotherOccupation] = useState('');
    const [Mothernationality, setMotherNationality] = useState('');
    const [Motherreligion, setMotherReligion] = useState('');
    const { formNo } = useParams();
    const reg_id = localStorage.getItem("reg_no");
    const parent_id = localStorage.getItem("parent_id");
    localStorage.setItem("form_no", formNo)
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

        const reg_data={
            form_no:reg_id
        }
        



        if (parent_id != null) {

            axios.get(`http://fee-management-api.nastechltd.co/api/student_parent/${parent_id}`)
                .then(response => {
                    console.log("parent id code ran")
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
                    setMotherCell(response.data.mother_cell_1)
                    setMotherCell2(response.data.mother_cell_2)
                    setMotherTel(response.data.mother_tel_no)
                    setFatherName(response.data.father_name);
                    setFatherQualification(response.data.father_qualification)
                    setFatherNationality(response.data.father_nationality)
                    setFatherOccupation(response.data.father_occupation)
                    setFatherReligion(response.data.father_religion)
                    setFatherAddressoffice(response.data.father_office_address)
                    setFatherEmail(response.data.father_email)
                    setFatherCnic(response.data.father_normalize_CNIC)
                    setFatherCell(response.data.father_cell_1)
                    setFatherCell2(response.data.father_cell_2)
                    setFatherTel(response.data.father_tel_no)

                })
                .catch((error) => {
                    if (error.response) {
                        setMessageinfo(error.response.data.message);
                        handleMessage();
                    }
                })

        }
        else{
            console.log("use effect code ran")
            axios.post(`http://fee-management-api.nastechltd.co/api/check_form`, reg_data )
        .then(response => {
            console.log("reg response",response)
            // console.log('fname',response.data.form.name)
            setGetData(response.data.form)
            setFatherEmail(response.data.form.father_email)
            setMotherEmail(response.data.form.mother_email)
            setFatherCnic(response.data.form.father_normalize_CNIC)
            console.log(response.data.form.father_CNIC)

          
        })

        .catch((error) => {
            if (error.response) {
                console.log(error)
                console.log(error.response.data.message)
                setMessageinfo(error.response.data.message);
                handleMessage();
            }
        })
        }
    }, [])










    const data = {
        form_no: reg_id,
        father_name: Fathername,
        father_qualification: Fatherqualification,
        father_religion: Fatherreligion,
        father_nationality: Fathernationality,
        father_occupation: Fatheroccupation,
        father_tel_no: Fathertel,
        father_cell_1: Fathercell,
        father_cell_2: Fathercell2,
        father_CNIC: Fathercnic,
        father_office_address: Fatheraddressoffice,
        father_email: Fatheremail,
        mother_name: Mothername,
        mother_qualification: Motherqualification,
        mother_religion: Motherreligion,
        mother_nationality: Mothernationality,
        mother_occupation: Motheroccupation,
        mother_tel_no: Mothertel,
        mother_cell_1: Mothercell,
        mother_cell_2: Mothercell2,
        mother_CNIC: Mothercnic,
        mother_residential_address: Motheraddress,
        mother_email: Motheremail,
        father_CNIC_type:"CNIC",
        mother_CNIC_type:"CNIC"
    }
 console.log(Fathercnic.length) 
 console.log(Mothercnic.length)
    const sendData = () => {
        console.log(data)
        if (parent_id == null) {
            if (Fathername === '') {
                setMessageinfo("Enter Father Name")
                handleMessage();
            }
            else if (Fatherqualification === '') {
                setMessageinfo("Enter Father's Qualification")
                handleMessage();
            }
            else if (Fatherreligion === '') {
                setMessageinfo("Enter Father's Religion")
                handleMessage();
            }
            else if (Fathernationality === '') {
                setMessageinfo("Enter Father's Nationality")
                handleMessage();
            }
            else if (Fatheroccupation === '') {
                setMessageinfo("Enter Father's Occupation")
                handleMessage();
            }
            else if (Fathertel === '') {
                setMessageinfo("Enter Father's Telephone")
                handleMessage();
            }
            else if (Fathercell === '') {
                setMessageinfo("Enter Father's Cellphone")
                handleMessage();
            }
            else if (Fathercnic === '') {
                setMessageinfo("Enter Father's CNIC")
                handleMessage();
            }
            else if (Fathercnic.length < 13 || Fathercnic.length > 13) {
                setMessageinfo("Enter Father's Valid CNIC")
                handleMessage();
            }
            else if (Fatheraddressoffice === '') {
                setMessageinfo("Enter Father's Address")
                handleMessage();
            }
            else if (Mothername === '') {
                setMessageinfo("Enter Mother Name")
                handleMessage();
            }
            else if (Motherqualification === '') {
                setMessageinfo("Enter Mother's Qualification")
                handleMessage();
            }
            else if (Motherreligion === '') {
                setMessageinfo("Enter Mother's Religion")
                handleMessage();
            }
            else if (Mothernationality === '') {
                setMessageinfo("Enter Mother's Nationality")
                handleMessage();
            }
            else if (Motheroccupation === '') {
                setMessageinfo("Enter Mother's Occupation")
                handleMessage();
            }
            else if (Mothertel === '') {
                setMessageinfo("Enter Mother's Telephone")
                handleMessage();
            }
            else if (Mothercell === '') {
                setMessageinfo("Enter Mother's Cellphone")
                handleMessage();
            }
            else if (Mothercnic === '') {
                setMessageinfo("Enter Mother's CNIC")
                handleMessage();
            }
            else if (Mothercnic.length < 13 || Mothercnic.length > 13) {
                setMessageinfo("Enter Mother's Valid CNIC")
                handleMessage();
            }
            else if (Mothercnic === Fathercnic) {
                setMessageinfo("CNIC must be unique")
                handleMessage();
            }
            else if (Motheraddress === '') {
                setMessageinfo("Enter Mother's address")
                handleMessage();
            }
            else {
                console.log(data)

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
                                setMessageinfo(error.response.data.message);
                                handleMessage();
                            }
                        })
                }
                else {
                    setMessageinfo("Enter Valid Email(s)")
                    handleMessage();
                }
            }
        }
        else {
            if (Fathername === '') {
                setMessageinfo("Enter Father Name")
                handleMessage();
            }
            else if (Fatherqualification === '') {
                setMessageinfo("Enter Father's Qualification")
                handleMessage();
            }
            else if (Fatherreligion === '') {
                setMessageinfo("Enter Father's Religion")
                handleMessage();
            }
            else if (Fathernationality === '') {
                setMessageinfo("Enter Father's Nationality")
                handleMessage();
            }
            else if (Fatheroccupation === '') {
                setMessageinfo("Enter Father's Occupation")
                handleMessage();
            }
            else if (Fathertel === '') {
                setMessageinfo("Enter Father's Telephone")
                handleMessage();
            }
            else if (Fathercell === '') {
                setMessageinfo("Enter Father's Cellphone")
                handleMessage();
            }
            else if (Fathercnic === '') {
                setMessageinfo("Enter Father's CNIC")
                handleMessage();
            }
            else if (Fathercnic.length < 13 || Fathercnic.length > 13) {
                setMessageinfo("Enter Father's Valid CNIC")
                handleMessage();
            }
            else if (Fatheraddressoffice === '') {
                setMessageinfo("Enter Father's Address")
                handleMessage();
            }
            else if (Mothername === '') {
                setMessageinfo("Enter Mother Name")
                handleMessage();
            }
            else if (Motherqualification === '') {
                setMessageinfo("Enter Mother's Qualification")
                handleMessage();
            }
            else if (Motherreligion === '') {
                setMessageinfo("Enter Mother's Religion")
                handleMessage();
            }
            else if (Mothernationality === '') {
                setMessageinfo("Enter Mother's Nationality")
                handleMessage();
            }
            else if (Motheroccupation === '') {
                setMessageinfo("Enter Mother's Occupation")
                handleMessage();
            }
            else if (Mothertel === '') {
                setMessageinfo("Enter Mother's Telephone")
                handleMessage();
            }
            else if (Mothercell === '') {
                setMessageinfo("Enter Mother's Cellphone")
                handleMessage();
            }
            else if (Mothercnic === '') {
                setMessageinfo("Enter Mother's CNIC")
                handleMessage();
            }
            else if (Mothercnic.length < 13 || Mothercnic.length > 13) {
                setMessageinfo("Enter Mother's Valid CNIC")
                handleMessage();
            }
            else if (Mothercnic === Fathercnic) {
                setMessageinfo("CNIC must be unique")
                handleMessage();
            }
            else if (Motheraddress === '') {
                setMessageinfo("Enter Mother's address")
                handleMessage();
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
                                setMessageinfo(error.response.data.message);
                                handleMessage();
                            }
                        })
                }
                else {
                    setMessageinfo("Enter Valid Email(s)")
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
                                    <label for="guardPhone">Cell1:</label>
                                    <input id="guardPhone" defaultValue={prevdata.father_cell_1} type="number" className="form-control" placeholder="Cellphone 1" onChange={(e) => setFatherCell(e.target.value)} />
                                </div>
                                <div className="col-4">
                                    <label for="guardPhone">Cell 2:</label>
                                    <input id="guardPhone" defaultValue={prevdata.father_cell_2} type="number" className="form-control" placeholder="Cellphone 2" onChange={(e) => setFatherCell2(e.target.value)} />
                                </div>
                                <div className="col-4">
                                    <label for="guardFatherCnic">CNIC:</label>
                                    <input id="guardFatherCnic" defaultValue={prevdata.father_normalize_CNIC} type="text" className="form-control" placeholder='Without "-" ' onChange={(e) => setFatherCnic(e.target.value)} />
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
                                    <label for="guardPhone">Cell 1:</label>
                                    <input id="guardPhone" defaultValue={prevdata.mother_cell_1} type="number" className="form-control" placeholder="Cellphone 1" onChange={(e) => setMotherCell(e.target.value)} />
                                </div>
                                <div className="col-4">
                                    <label for="guardPhone">Cell 2:</label>
                                    <input id="guardPhone" defaultValue={prevdata.mother_cell_2} type="number" className="form-control" placeholder="Cellphone 2" onChange={(e) => setMotherCell2(e.target.value)} />
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
                <Snackbar
                    anchorOrigin={{ vertical, horizontal }}
                    open={open}
                    autoHideDuration={4000}
                    onClose={CloseMessage}
                    message={messageinfo}
                    key={vertical + horizontal}
                />
            </div>



        </>
    );
};
export default Fatherparticular;