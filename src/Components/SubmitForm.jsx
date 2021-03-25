import { React, useEffect, useState } from 'react';
import axios from 'axios';
import './PrintForm.css';
import { useHistory, useParams } from 'react-router';
import { capitalize } from '@material-ui/core';

const SubmitForm = ({ teamId, orientation = 'portrait' }) => {
    const { formNo } = useParams();
    const [student, setStudent] = useState({});
    const [parent, setParent] = useState({});
    const [guardian, setGuardian] = useState({});
    const [emergency, setEmergency] = useState({});
    const [siblings, setSiblings] = useState([]);
    const history = useHistory();
    function setPageSize(cssPageSize) {
        const style = document.createElement('style');
        style.innerHTML = `@page {size: ${cssPageSize}}`;
        style.id = 'page-orientation';
        document.head.appendChild(style);
    }

    // Set orientation of page being printed
    useEffect(() => {
        setPageSize(orientation);
        return () => {
            const child = document.getElementById('page-orientation');
            child.parentNode.removeChild(child);
        };
    }, [orientation]);
    useEffect(() => {
        axios.get(`http://fee-management-api.nastechltd.co/api/admission_form/${formNo}`)
            .then(response => {
                console.log(response);
                setStudent(response.data.AdmissionForm);
                setParent(response.data.StudentParent);
                setGuardian(response.data.StudentGuardian);
                setSiblings(response.data.SiblingsDetail);
                setEmergency(response.data.EmergencyContact);
            })
            .catch((error) => {
                if (error.response) {
                    alert(error.response.data.message);
                }
            })
    }, [])

    return (
        <>
            <div className="printform-main mx-auto border border-dark">
                <div className="container">
                    <h1 className="text-center">ADMISSION FORM</h1>
                    <div className="row">
                        <div className="col-12 text-right">
                            <p>GR No: <span>00000</span> </p>
                        </div>
                        <h2>Student's Particular</h2>
                        <div className="col-4">
                            <p>First Name: <span className="print-capitalize">{student.first_name}</span></p>
                        </div>
                        <div className="col-4">
                            <p>Middle Name: <span className="print-capitalize">{student.middle_name}</span></p>
                        </div>
                        <div className="col-4">
                            <p>Last Name: <span className="print-capitalize">{student.last_name}</span></p>
                        </div>
                        <div className="col-4">
                            <p>Father Name: <span className="print-capitalize">{student.father_name}</span></p>

                        </div>
                        <div className="col-4">
                            <p>Date of Birth: <span className="print-capitalize">{student.date_of_birth}</span></p>

                        </div>
                        <div className="col-4">
                            <p>Email: <span className="">{student.email}</span></p>

                        </div>
                        <div className="col-4">
                            <p>Place of Birth: <span className="print-capitalize">{student.place_of_birth}</span></p>

                        </div>
                        <div className="col-4">
                            <p>School Last Attended: <span className="print-capitalize">{student.last_school_attended}</span></p>

                        </div>
                        <div className="col-4">
                            <p>Gender: <span className="print-capitalize">{student.gender}</span></p>
                        </div>
                        <div className="col-4">
                            <p>Telephone: <span className="print-capitalize">{student.tel_no}</span></p>

                        </div>
                        <div className="col-8">
                            <p>Permanent Address: <span className="print-capitalize">{student.permanent_address}</span></p>

                        </div>
                        <div className="col-4">
                            <p>Cellphone: <span className="print-capitalize">{student.cell_no}</span></p>

                        </div>
                        <div className="col-8">
                            <p>Present Address: <span className="print-capitalize">{student.address}</span></p>

                        </div>

                    </div>
                    <div className="row mt-5">
                        <h2>Father's Particular</h2>

                        <div className="col-4">
                            <p>Father's Name: <span className="print-capitalize">{parent.father_name}</span></p>
                        </div>
                        <div className="col-4">
                            <p>CNIC: <span className="print-capitalize">{parent.father_CNIC}</span></p>
                        </div>
                        <div className="col-4">
                            <p>Qualification: <span className="print-capitalize">{parent.father_qualification}</span></p>
                        </div>
                        <div className="col-4">
                            <p>Email: <span className="">{parent.father_email}</span></p>

                        </div>
                        <div className="col-4">
                            <p>Occupation: <span className="print-capitalize">{parent.father_occupation}</span></p>

                        </div>
                        <div className="col-4">
                            <p>Nationality: <span className="print-capitalize">{parent.father_nationality}</span></p>

                        </div>
                        <div className="col-4">
                            <p>Religion: <span className="print-capitalize">{parent.father_religion}</span></p>

                        </div>
                        <div className="col-4">
                            <p>Telephone: <span className="print-capitalize">{parent.father_tel_no}</span></p>

                        </div>

                        <div className="col-4">
                            <p>Cellphone: <span className="print-capitalize">{parent.father_cell_no}</span></p>

                        </div>


                        <div className="col-8">
                            <p>Office Address: <span className="print-capitalize">{parent.father_office_address}</span></p>

                        </div>

                    </div>

                    <div className="row mt-5">
                        <h2>Mother's Particular</h2>

                        <div className="col-4">
                            <p>Mother's Name: <span className="print-capitalize">{parent.mother_name}</span></p>
                        </div>
                        <div className="col-4">
                            <p>CNIC: <span className="print-capitalize">{parent.mother_CNIC}</span></p>
                        </div>
                        <div className="col-4">
                            <p>Qualification: <span className="print-capitalize">{parent.mother_qualification}</span></p>
                        </div>
                        <div className="col-4">
                            <p>Email: <span className="">{parent.mother_email}</span></p>

                        </div>
                        <div className="col-4">
                            <p>Occupation: <span className="print-capitalize">{parent.mother_occupation}</span></p>

                        </div>
                        <div className="col-4">
                            <p>Nationality: <span className="print-capitalize">{parent.mother_nationality}</span></p>

                        </div>
                        <div className="col-4">
                            <p>Religion: <span className="print-capitalize">{parent.mother_religion}</span></p>

                        </div>

                        <div className="col-4">
                            <p>Telephone: <span className="print-capitalize">{parent.mother_tel_no}</span></p>

                        </div>

                        <div className="col-4">
                            <p>Cellphone: <span className="print-capitalize">{parent.mother_cell_no}</span></p>

                        </div>

                        <div className="col-8">
                            <p>Residential Address: <span className="print-capitalize">{parent.mother_residential_address}</span></p>

                        </div>

                    </div>
                    {
                        guardian == null ?

                            null

                            :
                            <>
                                <div className="row mt-5">

                                    <h2>Guardians's Particular</h2>

                                    <div className="col-4">
                                        <p>Guardian's Name: <span className="print-capitalize">{guardian.name}</span></p>
                                    </div>
                                    <div className="col-4">
                                        <p>CNIC: <span className="print-capitalize">{guardian.CNIC}</span></p>
                                    </div>
                                    <div className="col-4">
                                        <p>Qualification: <span className="print-capitalize">{guardian.qualification}</span></p>
                                    </div>
                                    <div className="col-4">
                                        <p>Email: <span className="">{guardian.email}</span></p>

                                    </div>
                                    <div className="col-4">
                                        <p>Occupation: <span className="print-capitalize">{guardian.occupation}</span></p>

                                    </div>
                                    <div className="col-4">
                                        <p>Nationality: <span className="print-capitalize">{guardian.nationality}</span></p>

                                    </div>
                                    <div className="col-4">
                                        <p>Religion: <span className="print-capitalize">{guardian.religion}</span></p>

                                    </div>


                                    <div className="col-8">
                                        <p>Residential Address: <span className="print-capitalize">{guardian.residential_address}</span></p>

                                    </div>
                                    <div className="col-4">
                                        <p>Telephone: <span className="print-capitalize">{guardian.tel_no}</span></p>

                                    </div>

                                    <div className="col-4">
                                        <p>Cellphone: <span className="print-capitalize">{guardian.cell_no}</span></p>

                                    </div>
                                </div>
                            </>
                    }


                    {siblings.length == 0 ?
                        null
                        :
                        <>
                            {siblings.map((val, i) => {
                                return (
                                    <div className="row mt-5">
                                        <h2>Siblings Studying</h2>

                                        <div className="col-4">
                                            <p>Name: <span className="print-capitalize">{val.name}</span></p>
                                        </div>
                                        <div className="col-4">
                                            <p>Age: <span className="print-capitalize">{val.age}</span></p>
                                        </div>
                                        <div className="col-4">
                                            <p>Class: <span className="print-capitalize">{val.class}</span></p>
                                        </div>
                                    </div>

                                )
                            })}
                        </>
                    }

                    <div className="row mt-5">
                        <h2>Incase of Emergency</h2>

                        <div className="col-5">
                            <p>Name of the person to be contacted: <span className="print-capitalize">{emergency.name}</span></p>
                        </div>
                        <div className="col-4">
                            <p>Telephone:<span className="print-capitalize">{emergency.tel_no}</span></p>

                        </div>
                        <div className="col-3">
                            <p>Cellphone:<span className="print-capitalize">{emergency.cell_no}</span></p>

                        </div>
                        <div className="col-5">
                            <p>CNIC: <span className="print-capitalize">{emergency.CNIC}</span></p>
                        </div>
                        <div className="col-4">
                            <p>Relation with the student: <span className="print-capitalize">{emergency.relation_student}</span></p>
                        </div>
                        <div className="col-6">
                            <p>Address: <span className="print-capitalize">{emergency.address}</span></p>

                        </div>

                    </div>

                </div>
                <div className="row">
                    <div className="col-12 print-submit-btn"><button onClick={()=>history.push(`/requirements/${formNo}`)} className="btn btn-success">Submit</button></div>

                </div>
            </div>
        </>
    )
}
export default SubmitForm;