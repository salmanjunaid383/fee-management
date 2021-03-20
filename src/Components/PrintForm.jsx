import { React, useEffect, useState } from 'react';
import axios from 'axios';
import './PrintForm.css';
import { useParams } from 'react-router';
import { capitalize } from '@material-ui/core';

const PrintForm = ({ teamId, orientation = 'portrait' }) => {
    const { formNo } = useParams();
    const [student, setStudent] = useState({});
    const [father, setFather] = useState({});
    const [mother, setMother] = useState({});
    const [guardian, setGuardian] = useState({});
    const [emergency, setEmergency] = useState({});
    const [siblings, setSiblings] = useState([]);
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
                setFather(response.data.StudentFather);
                setMother(response.data.StudentMother);
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
                            <p>First Name: <span>{student.first_name}</span></p>
                        </div>
                        <div className="col-4">
                            <p>Middle Name: <span>{student.middle_name}</span></p>
                        </div>
                        <div className="col-4">
                            <p>Last Name: <span>{student.last_name}</span></p>
                        </div>
                        <div className="col-4">
                            <p>Father Name: <span>{student.father_name}</span></p>

                        </div>
                        <div className="col-4">
                            <p>Date of Birth: <span>{student.date_of_birth}</span></p>

                        </div>
                        <div className="col-4">
                            <p>Email: <span>{student.email}</span></p>

                        </div>
                        <div className="col-4">
                            <p>Place of Birth: <span>{student.place_of_birth}</span></p>

                        </div>
                        <div className="col-4">
                            <p>School Last Attended: <span>{student.last_school_attended}</span></p>

                        </div>
                        <div className="col-4">
                            <p>Gender: <span>{student.gender}</span></p>
                        </div>
                        <div className="col-4">
                            <p>Telephone: <span>{student.tel_no}</span></p>

                        </div>
                        <div className="col-8">
                            <p>Permanent Address: <span>{student.permanent_address}</span></p>

                        </div>
                        <div className="col-4">
                            <p>Cellphone: <span>{student.cell_no}</span></p>

                        </div>
                        <div className="col-8">
                            <p>Present Address: <span>{student.address}</span></p>

                        </div>

                    </div>
                    <div className="row mt-5">
                        <h2>Father's Particular</h2>

                        <div className="col-4">
                            <p>Father's Name: <span>{father.name}</span></p>
                        </div>
                        <div className="col-4">
                            <p>CNIC: <span>{father.CNIC}</span></p>
                        </div>
                        <div className="col-4">
                            <p>Qualification: <span>{father.qualification}</span></p>
                        </div>
                        <div className="col-4">
                            <p>Email: <span>{father.email}</span></p>

                        </div>
                        <div className="col-4">
                            <p>Occupation: <span>{father.occupation}</span></p>

                        </div>
                        <div className="col-4">
                            <p>Nationality: <span>{father.nationality}</span></p>

                        </div>
                        <div className="col-4">
                            <p>Religion: <span>{father.religion}</span></p>

                        </div>
                        <div className="col-4">
                            <p>Telephone: <span>{father.tel_no}</span></p>

                        </div>

                        <div className="col-4">
                            <p>Cellphone: <span>{father.cell_no}</span></p>

                        </div>


                        <div className="col-8">
                            <p>Office Address: <span>{father.office_address}</span></p>

                        </div>

                    </div>

                    <div className="row mt-5">
                        <h2>Mother's Particular</h2>

                        <div className="col-4">
                            <p>Mother's Name: <span>{mother.name}</span></p>
                        </div>
                        <div className="col-4">
                            <p>CNIC: <span>{mother.CNIC}</span></p>
                        </div>
                        <div className="col-4">
                            <p>Qualification: <span>{mother.qualification}</span></p>
                        </div>
                        <div className="col-4">
                            <p>Email: <span>{mother.email}</span></p>

                        </div>
                        <div className="col-4">
                            <p>Occupation: <span>{mother.occupation}</span></p>

                        </div>
                        <div className="col-4">
                            <p>Nationality: <span>{mother.nationality}</span></p>

                        </div>
                        <div className="col-4">
                            <p>Religion: <span>{mother.religion}</span></p>

                        </div>

                        <div className="col-4">
                            <p>Telephone: <span>{mother.tel_no}</span></p>

                        </div>

                        <div className="col-4">
                            <p>Cellphone: <span>{mother.cell_no}</span></p>

                        </div>

                        <div className="col-8">
                            <p>Residential Address: <span>{mother.residential_address}</span></p>

                        </div>

                    </div>
                    {
                        guardian.CNIC == null ?

                            null

                            :
                            <>
                                <div className="row mt-5">

                                    <h2>Guardians's Particular</h2>

                                    <div className="col-4">
                                        <p>Guardian's Name: <span>Muhammad</span></p>
                                    </div>
                                    <div className="col-4">
                                        <p>CNIC: <span>Jahanzaib</span></p>
                                    </div>
                                    <div className="col-4">
                                        <p>Qualification: <span>Mughal</span></p>
                                    </div>
                                    <div className="col-4">
                                        <p>Email: <span>Muhammad Ismail</span></p>

                                    </div>
                                    <div className="col-4">
                                        <p>Occupation: <span></span></p>

                                    </div>
                                    <div className="col-4">
                                        <p>Nationality: <span></span></p>

                                    </div>
                                    <div className="col-4">
                                        <p>Religion: <span></span></p>

                                    </div>


                                    <div className="col-8">
                                        <p>Residential Address: <span></span></p>

                                    </div>
                                    <div className="col-4">
                                        <p>Telephone: <span></span></p>

                                    </div>

                                    <div className="col-4">
                                        <p>Cellphone: <span></span></p>

                                    </div>
                                </div>
                            </>
                    }

                    {
                        siblings.name == null ?
                            null
                            :
                            <>
                                <div className="row mt-5">
                                    <h2>Siblings Studying</h2>

                                    <div className="col-4">
                                        <p>Name: <span>Muhammad</span></p>
                                    </div>
                                    <div className="col-4">
                                        <p>Age: <span>Muhammad</span></p>
                                    </div>
                                    <div className="col-4">
                                        <p>Class: <span>Muhammad</span></p>
                                    </div>
                                </div>
                            </>
                    }
                    <div className="row mt-5">
                        <h2>Incase of Emergency</h2>

                        <div className="col-5">
                            <p>Name of the person to be contacted: <span>{emergency.name}</span></p>
                        </div>
                        <div className="col-4">
                            <p>Telephone:<span>{emergency.tel_no}</span></p>

                        </div>
                        <div className="col-3">
                            <p>Cellphone:<span>{emergency.cell_no}</span></p>

                        </div>
                        <div className="col-4">
                            <p>CNIC: <span>{emergency.CNIC}</span></p>
                        </div>
                        <div className="col-4">
                            <p>Relation with the student: <span>{emergency.relation_student}</span></p>
                        </div>
                        <div className="col-6">
                            <p>Address: <span>{emergency.address}</span></p>

                        </div>

                    </div>


                </div>
            </div>
        </>
    )
}
export default PrintForm;