import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './personal.css';
import { Link, useHistory } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';

// import WebcamCapture from './Webcam'
// import Webcam from 'react-webcam';



const Guardianparticular = () => {
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
    const history = useHistory();
    const [cnic, setCnic] = useState('');
    const [guardianname, setGuardianname] = useState('');
    const [email, setEmail] = useState('');
    const [addressresidential, setAddressresidential] = useState('');
    const [cell, setCell] = useState('');
    const [tel, setTel] = useState('');
    const [qualification, setQualification] = useState('');
    const [occupation, setOccupation] = useState('');
    const [nationality, setNationality] = useState('');
    const [religion, setReligion] = useState('');
    const [prevdata, setPrevdata] = useState('');
    const form_no = localStorage.getItem("form_no")
    const guardian_id = localStorage.getItem("guardian_id")
    useEffect(() => {
        if (guardian_id != null) {
            axios.get(`http://fee-management-api.nastechltd.co/api/student_guardian/${guardian_id}`)
                .then(response => {
                    console.log(response.data)
                    setPrevdata(response.data)
                    setGuardianname(response.data._name);
                    setQualification(response.data.qualification)
                    setNationality(response.data.nationality)
                    setOccupation(response.data.occupation)
                    setReligion(response.data.religion)
                    setAddressresidential(response.data.residential_address)
                    setEmail(response.data.email)
                    setCnic(response.data.CNIC)
                    setCell(response.data.cell_no)
                    setTel(response.data.tel_no)


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
        form_no: form_no,
        name: guardianname,
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
        if (guardian_id == null) {
            if (guardianname == '') {
                setMessageinfo("Enter Name")
                handleMessage();
            }
            else if (qualification == '') {
                setMessageinfo("Enter Qualification")
                handleMessage();
            }
            else if (religion == '') {
                setMessageinfo("Enter Religion")
                handleMessage();
            }
            else if (nationality == '') {
                setMessageinfo("Enter Nationality")
                handleMessage();
            }
            else if (occupation == '') {
                setMessageinfo("Enter Occupation")
                handleMessage();
            }
            else if (tel == '') {
                setMessageinfo("Enter Telephone")
                handleMessage();
            }
            else if (cell == '') {
                setMessageinfo("Enter Cellphone")
                handleMessage();
            }
            else if (cnic == '') {
                setMessageinfo("Enter CNIC")
                handleMessage();
            }
            else if (cnic.length < 13 || cnic.length > 13) {
                setMessageinfo("Enter Valid CNIC")
                handleMessage();
            }
            else if (addressresidential == '') {
                setMessageinfo("Enter Residential Address")
                handleMessage();
            }
            else {
                if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
                    axios.post(`http://fee-management-api.nastechltd.co/api/student_guardian`, data)
                        .then(response => {
                            console.log(response.data);
                            localStorage.setItem("guardian_id", response.data.id)
                            history.push("/siblings")
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
            if (guardianname == '') {
                setMessageinfo("Enter Name")
                handleMessage();
            }
            else if (qualification == '') {
                setMessageinfo("Enter Qualification")
                handleMessage();
            }
            else if (religion == '') {
                setMessageinfo("Enter Religion")
                handleMessage();
            }
            else if (nationality == '') {
                setMessageinfo("Enter Nationality")
                handleMessage();
            }
            else if (occupation == '') {
                setMessageinfo("Enter Occupation")
                handleMessage();
            }
            else if (tel == '') {
                setMessageinfo("Enter Telephone")
                handleMessage();
            }
            else if (cell == '') {
                setMessageinfo("Enter Cellphone")
                handleMessage();
            }
            else if (cnic == '') {
                setMessageinfo("Enter CNIC")
                handleMessage();
            }
            else if (cnic.length < 13 || cnic.length > 13) {
                setMessageinfo("Enter Valid CNIC")
                handleMessage();
            }
            else if (addressresidential == '') {
                setMessageinfo("Enter Residential Address")
                handleMessage();
            }
            else {
                if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
                    axios.put(`http://fee-management-api.nastechltd.co/api/student_guardian/${guardian_id}`, data)
                        .then(response => {
                            console.log(response.data);
                            localStorage.setItem("guardian_id", response.data.id)
                            history.push("/siblings")
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

            <div className="container-fluid requirement_body form_body">
                <div className="container ">
                    <h1 className="text-center text-dark">STUDENT ADMISSION FORM</h1>
                    <form onSubmit={(e) => e.preventDefault()} >
                        <fieldset className="mt-4 field_box shadow">
                            <legend>Guardian's Particular(if any</legend>
                            <div className="row">
                                <div className="col-4">
                                    <label for="guardname">Full Name:</label>
                                    <input id="guardname" defaultValue={prevdata.name} type="text" className="form-control" placeholder="Full Name" onChange={(e) => setGuardianname(e.target.value)} />
                                </div>
                                <div className="col-4">
                                    <label for="age">Qualification:</label>
                                    <input id="age" defaultValue={prevdata.qualification} type="text" className="form-control" placeholder="Qualification" onChange={(e) => setQualification(e.target.value)} />
                                </div>
                                <div className="col-4">
                                    <label for="guardPhone">Tel:</label>
                                    <input id="guardPhone" defaultValue={prevdata.tel_no} type="number" className="form-control" placeholder="Telephone" onChange={(e) => setTel(e.target.value)} />
                                </div>
                                <div className="col-4">
                                    <label for="guardPhone">Cell:</label>
                                    <input id="guardPhone" defaultValue={prevdata.cell_no} type="number" className="form-control" placeholder="Cellphone" onChange={(e) => setCell(e.target.value)} />
                                </div>

                                <div className="col-4">
                                    <label for="guardCnic">CNIC:</label>
                                    <input id="guardCnic" defaultValue={prevdata.CNIC} type="number" className="form-control" placeholder="CNIC Number" onChange={(e) => setCnic(e.target.value)} />
                                </div>
                                <div className="col-4">
                                    <label for="email">Email:</label>
                                    <input id="email" defaultValue={prevdata.email} type="email" className="form-control" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="form-group col-4">
                                    <label for="guardAddress">Residential Address</label>
                                    <textarea className="form-control" defaultValue={prevdata.residential_address} id="guardAddress" rows="1" onChange={(e) => setAddressresidential(e.target.value)}></textarea>
                                </div>

                                <div className="col-4">
                                    <label for="age">Occupation:</label>
                                    <input id="age" defaultValue={prevdata.occupation} type="text" className="form-control" placeholder="Occupation" onChange={(e) => setOccupation(e.target.value)} />
                                </div>
                                <div className="col-4">
                                    <label for="age">Nationality:</label>
                                    <input id="age" defaultValue={prevdata.nationality} type="text" className="form-control" placeholder="Nationality" onChange={(e) => setNationality(e.target.value)} />
                                </div>
                                <div className="col-4">
                                    <label for="age">Religion:</label>
                                    <input id="age" defaultValue={prevdata.religion} type="text" className="form-control" placeholder="Religion" onChange={(e) => setReligion(e.target.value)} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6 text-left mt-3">
                                    <Link to={`/fatherparticular/${form_no}`}><button className="btn btn-success w25">Back</button></Link>
                                </div>
                                {cnic === '' ?
                                    <>
                                        <div className="col-6 text-right mt-3">
                                            <button onClick={() => history.push("/siblings")} className="btn btn-success w25">Next</button>
                                        </div>
                                    </>
                                    :
                                    <>
                                        <div className="col-6 text-right mt-3">
                                            <button onClick={sendData} className="btn btn-success w25">Next</button>
                                        </div>
                                    </>
                                }
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
export default Guardianparticular;