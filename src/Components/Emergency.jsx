import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './personal.css';
import { Link, useHistory } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
// import WebcamCapture from './Webcam'
// import Webcam from 'react-webcam';



const Emergency = () => {


    const [name, setName] = useState('');
    const [relation, setRelation] = useState('');
    const [address, setAddress] = useState('');
    const [cnic, setCnic] = useState('');
    const [cell, setCell] = useState('');
    const [tel, setTel] = useState('');
    const [prevdata, setPrevdata] = useState('');
    const form_no = localStorage.getItem("form_no")
    const sibling_id = localStorage.getItem("sibling_id")
    const history = useHistory();
    const emergency_id = localStorage.getItem("emergency_id");
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
        if (emergency_id != null) {
            axios.get(`http://fee-management-api.nastechltd.co/api/emergency/${emergency_id}`)
                .then(response => {
                    console.log(response.data)
                    setPrevdata(response.data)
                    setName(response.data.name);
                    setRelation(response.data.relation_student)
                    setAddress(response.data.address)
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
        name: name,
        CNIC: cnic,
        address: address,
        cell_no: cell,
        tel_no: tel,
        relation_student: relation

    }

    const sendData = () => {
        // console.log(data)
        if (emergency_id == null) {
            if (name == '') {
                setMessageinfo("Enter Name")
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
            else if (address == '') {
                setMessageinfo("Enter Residential Address")
                handleMessage();
            }
            else if (relation == '') {
                setMessageinfo("Enter Relation")
                handleMessage();
            }
            else {
                axios.post(`http://fee-management-api.nastechltd.co/api/emergency`, data)
                    .then(response => {
                        console.log(response.data);
                        localStorage.setItem("emergency_id", response.data.id)
                        history.push(`/submitform/${response.data.form_no}`)
                        // setStudentdata(response.data);
                    })
                    .catch((error) => {
                        if (error.response) {
                            setMessageinfo(error.response.data.message);
                            handleMessage();
                        }
                    })
            }
        }
        else {
            if (name == '') {
                setMessageinfo("Enter Name")
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
            else if (address == '') {
                setMessageinfo("Enter Residential Address")
                handleMessage();
            }
            else if (relation == '') {
                setMessageinfo("Enter Relation")
                handleMessage();
            }
            else {
                axios.put(`http://fee-management-api.nastechltd.co/api/emergency/${emergency_id}`, data)
                    .then(response => {
                        console.log(response.data);
                        localStorage.setItem("emergency_id", response.data.id)
                        history.push(`/submitform/${response.data.form_no}`)
                        // setStudentdata(response.data);
                    })
                    .catch((error) => {
                        if (error.response) {
                            setMessageinfo(error.response.data.message);
                            handleMessage();
                        }
                    })
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
                            <legend>Incase Of Emergency</legend>
                            <div className="row">
                                <div className="col-4">
                                    <label for="guardCnic">CNIC:</label>
                                    <input id="guardCnic" defaultValue={prevdata.CNIC} type="number" className="form-control" placeholder="CNIC Number" onChange={(e) => setCnic(e.target.value)} />
                                </div>
                                <div className="col-4">
                                    <label for="email">Name of the person to be contacted:</label>
                                    <input id="email" defaultValue={prevdata.name} type="text" className="form-control" placeholder="Name" onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div className="form-group col-4">
                                    <label for="guardAddress">Relation with the student</label>
                                    <input id="email" defaultValue={prevdata.relation_student} type="text" className="form-control" placeholder="Realtion" onChange={(e) => setRelation(e.target.value)} />
                                </div>
                                <div className="form-group col-4">
                                    <label for="guardAddress">Address</label>
                                    <textarea className="form-control" defaultValue={prevdata.address} id="guardAddress" rows="1" onChange={(e) => setAddress(e.target.value)}></textarea>
                                </div>
                                <div className="col-4">
                                    <label for="guardPhone">Telephone:</label>
                                    <input id="guardPhone" defaultValue={prevdata.tel_no} type="number" className="form-control" placeholder="Telephone" onChange={(e) => setTel(e.target.value)} />
                                </div>
                                <div className="col-4">
                                    <label for="guardPhone">Cell:</label>
                                    <input id="guardPhone" defaultValue={prevdata.cell_no} type="number" className="form-control" placeholder="Cell" onChange={(e) => setCell(e.target.value)} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6 text-left mt-3">
                                    <Link to="/siblings"><button className="btn btn-success w25">Back</button></Link>
                                </div>
                                <div className="col-6 text-right mt-3">
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



        </>
    );
};
export default Emergency;