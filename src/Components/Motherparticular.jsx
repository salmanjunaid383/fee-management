import React, { useState } from 'react';
import axios from 'axios';
import './personal.css';
import { Link, useHistory } from 'react-router-dom';
// import WebcamCapture from './Webcam'
// import Webcam from 'react-webcam';



const Motherparticular = () => {
    const history = useHistory();
    const [Mothername, setMotherName] = useState('');
    const [Mothercnic, setMotherCnic] = useState('');
    const [Motheremail, setMotherEmail] = useState('');
    const [Motheraddress, setMotherAddress] = useState('');
    const [Mothercell, setMotherCell] = useState('');
    const [Mothertel, setMotherTel] = useState('');
    const [Motherqualification, setMotherQualification] = useState('');
    const [Motheroccupation, setMotherOccupation] = useState('');
    const [Mothernationality, setMotherNationality] = useState('');
    const [Motherreligion, setMotherReligion] = useState('');
    const [buttonshow, setButtonshow] = useState(false);

    const handleChangemothername = (e) =>{
        if ((Mothercnic.length > 0)&&(Motheremail.length > 0)&& (Motherqualification.length > 0)&& (Mothername.length > 0) && (Motheroccupation.length > 0)&& (Mothernationality.length > 0)&& (Motherreligion.length > 0) && (Mothercell.length > 0) && (Mothertel.length > 0) &&(Motheraddress.length > 0)){
            setButtonshow(true);
        }
        else{
            setButtonshow(false)
        }
        // setMotherName(e.target.value)
    }
    // const handleChangecnic = (e) =>{
    //     if ((cnic.length > 0)&&(email.length > 0)&& (qualification.length > 0)&& (mothername.length > 0) && (occupation.length > 0)&& (nationality.length > 0)&& (religion.length > 0) && (cell.length > 0) && (tel.length > 0) &&(addressresidential.length > 0)){
    //         setButtonshow(true);
    //     }
    //     else{
    //         setButtonshow(false)
    //     }
    //     setMotherCnic(e.target.value)
    // }
    // const handleChangeemail = (e) =>{
    //     if ((cnic.length > 0)&&(email.length > 0)&& (qualification.length > 0)&& (mothername.length > 0) && (occupation.length > 0)&& (nationality.length > 0)&& (religion.length > 0) && (cell.length > 0) && (tel.length > 0) &&(addressresidential.length > 0)){
    //         setButtonshow(true);
    //     }
    //     else{
    //         setButtonshow(false)
    //     }
    //     setMotherEmail(e.target.value)
    // }
    // const handleChangeaddressresidential = (e) =>{
    //     if ((cnic.length > 0)&&(email.length > 0)&& (qualification.length > 0)&& (mothername.length > 0) && (occupation.length > 0)&& (nationality.length > 0)&& (religion.length > 0) && (cell.length > 0) && (tel.length > 0) &&(addressresidential.length > 0)){
    //         setButtonshow(true);
    //     }
    //     else{
    //         setButtonshow(false)
    //     }
    //     setMotherAddressresidential(e.target.value)
    // }
    // const handleChangecell = (e) =>{
    //     if ((cnic.length > 0)&&(email.length > 0)&& (qualification.length > 0)&& (mothername.length > 0) && (occupation.length > 0)&& (nationality.length > 0)&& (religion.length > 0) && (cell.length > 0) && (tel.length > 0) &&(addressresidential.length > 0)){
    //         setButtonshow(true);
    //     }
    //     else{
    //         setButtonshow(false)
    //     }
    //     setMotherCell(e.target.value)
    // }
    // const handleChangetel = (e) =>{
    //     if ((cnic.length > 0)&&(email.length > 0)&& (qualification.length > 0)&& (mothername.length > 0) && (occupation.length > 0)&& (nationality.length > 0)&& (religion.length > 0) && (cell.length > 0) && (tel.length > 0) &&(addressresidential.length > 0)){
    //         setButtonshow(true);
    //     }
    //     else{
    //         setButtonshow(false)
    //     }
    //     setMotherTel(e.target.value)
    // }
    // const handleChangequalification = (e) =>{
    //     if ((cnic.length > 0)&&(email.length > 0)&& (qualification.length > 0)&& (mothername.length > 0) && (occupation.length > 0)&& (nationality.length > 0)&& (religion.length > 0) && (cell.length > 0) && (tel.length > 0) &&(addressresidential.length > 0)){
    //         setButtonshow(true);
    //     }
    //     else{
    //         setButtonshow(false)
    //     }
    //     setMotherQualification(e.target.value)
    // }
    // const handleChangeoccupation = (e) =>{
    //     if ((cnic.length > 0)&&(email.length > 0)&& (qualification.length > 0)&& (mothername.length > 0) && (occupation.length > 0)&& (nationality.length > 0)&& (religion.length > 0) && (cell.length > 0) && (tel.length > 0) &&(addressresidential.length > 0)){
    //         setButtonshow(true);
    //     }
    //     else{
    //         setButtonshow(false)
    //     }
    //     setMotherOccupation(e.target.value)
    // }
    // const handleChangenationality = (e) =>{
    //     if ((cnic.length > 0)&&(email.length > 0)&& (qualification.length > 0)&& (mothername.length > 0) && (occupation.length > 0)&& (nationality.length > 0)&& (religion.length > 0) && (cell.length > 0) && (tel.length > 0) &&(addressresidential.length > 0)){
    //         setButtonshow(true);
    //     }
    //     else{
    //         setButtonshow(false)
    //     }
    //     setMotherNationality(e.target.value)
    // }
    // const handleChangereligion = (e) =>{
    //     if ((cnic.length > 0)&&(email.length > 0)&& (qualification.length > 0)&& (mothername.length > 0) && (occupation.length > 0)&& (nationality.length > 0)&& (religion.length > 0) && (cell.length > 0) && (tel.length > 0) &&(addressresidential.length > 0)){
    //         setButtonshow(true);
    //     }
    //     else{
    //         setButtonshow(false)
    //     }
    //     setMotherReligion(e.target.value)
    // }

    const data = {
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
                                    <input id="guardname" type="text" className="form-control" placeholder="Full Name" onChange={(e) => setMotherName(e.target.value)} />
                                </div>
                                <div className="col-4">
                                    <label for="age">Qualification:</label>
                                    <input id="age" type="text" className="form-control" placeholder="Qualification" onChange={(e) => setMotherQualification(e)} />
                                </div>
                                <div className="col-4">
                                    <label for="guardPhone">Phone:</label>
                                    <input id="guardPhone" type="number" className="form-control" placeholder="Phone" onChange={(e) => setMotherTel(e.target.value)} />
                                </div>
                                <div className="col-4">
                                    <label for="guardPhone">Cell:</label>
                                    <input id="guardPhone" type="number" className="form-control" placeholder="Cellphone" onChange={(e) => setMotherCell(e.target.value)} />
                                </div>
                                <div className="col-4">
                                    <label for="guardCnic">CNIC:</label>
                                    <input id="guardCnic" type="number" className="form-control" placeholder="CNIC Number" onChange={(e) => setMotherCnic(e.target.value)} />
                                </div>
                                <div className="col-4">
                                    <label for="email">Email:</label>
                                    <input id="email" type="email" className="form-control" placeholder="Email" onChange={(e) => setMotherEmail(e.target.value)} />
                                </div>
                                <div className="form-group col-4">
                                    <label for="guardAddress">Residential Address</label>
                                    <textarea className="form-control" id="guardAddress" onChange={(e) => setMotherAddress(e.target.value)} rows="1"></textarea>
                                </div>

                                <div className="col-4">
                                    <label for="age">Occupation:</label>
                                    <input id="age" type="text" className="form-control" placeholder="Occupation" onChange={(e) => setMotherOccupation(e.target.value)}/>
                                </div>
                                <div className="col-4">
                                    <label for="age">Nationality:</label>
                                    <input id="age" type="text" className="form-control" placeholder="Nationality" onChange={(e) => setMotherNationality(e.target.value)} />
                                </div>
                                <div className="col-4">
                                    <label for="age">Religion:</label>
                                    <input id="age" type="text" className="form-control" placeholder="Religion" onChange={(e) => setMotherReligion(e.target.value)} />
                                </div>
                                {buttonshow == true ? 
                                <>
                                <div className="col-12 text-right mt-3">
                                    <Link to="/guardianparticular"><button onClick={sendData}className="btn btn-success w25">Next</button></Link>
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



        </>
    );
};
export default Motherparticular;