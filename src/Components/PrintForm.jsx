import { React, useEffect, useState } from 'react';
import axios from 'axios';
import './PrintForm.css';

const PrintForm = () => {
    return (
        <>
            <div className="printform-main border border-dark">
                <div className="container">
                    <h1 className="text-center">AdMISSION FORM</h1>
                    <div className="row">
                        <div className="col-12 text-right">
                            <p>GR No: <span>00000</span> </p>
                        </div>
                        <h2>Student's Particular</h2>
                        <div className="col-4">
                            <p>First Name: <span>Muhammad</span></p>
                        </div>
                        <div className="col-4">
                            <p>Middle Name: <span>Jahanzaib</span></p>
                        </div>
                        <div className="col-4">
                            <p>Last Name: <span>Mughal</span></p>
                        </div>
                        <div className="col-4">
                            <p>Father Name: <span>Muhammad Ismail</span></p>

                        </div>
                        <div className="col-4">
                            <p>Date of Birth: <span>03/03/02</span></p>

                        </div>
                        <div className="col-4">
                            <p>Email: <span>03/03/02</span></p>

                        </div>
                        <div className="col-4">
                            <p>Place of Birth: <span>03/03/02</span></p>

                        </div>
                        <div className="col-4">
                            <p>School Last Attended: <span>03/03/02</span></p>

                        </div>
                        <div className="col-4">
                            <p>Gender: <span>03/03/02</span></p>
                        </div>
                        <div className="col-8">
                            <p>Permanent Address: <span>______________________________________________________</span></p>

                        </div>
                        <div className="col-4">
                            <p>Telephone: <span>03/03/02</span></p>

                        </div>
                        <div className="col-8">
                            <p>Present Address: <span>03/03/02</span></p>

                        </div>
                        <div className="col-4">
                            <p>Cellphone: <span>03/03/02</span></p>

                        </div>

                    </div>
                    <div className="row mt-5">
                    <h2>Father's Particular</h2>
                        
                        <div className="col-4">
                            <p>Father's Name: <span>Muhammad</span></p>
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
                            <p>Occupation: <span>03/03/02</span></p>

                        </div>
                        <div className="col-4">
                            <p>Nationality: <span>03/03/02</span></p>

                        </div>
                        <div className="col-4">
                            <p>Religion: <span>03/03/02</span></p>

                        </div>


                        <div className="col-8">
                            <p>Office Address: <span>______________________________________________________</span></p>

                        </div>
                        <div className="col-4">
                            <p>Telephone: <span>03/03/02</span></p>

                        </div>

                        <div className="col-4">
                            <p>Cellphone: <span>03/03/02</span></p>

                        </div>

                    </div>
                    <div className="row mt-5">
                    <h2>Mother's Particular</h2>

                        <div className="col-4">
                            <p>Mother's Name: <span>Muhammad</span></p>
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
                            <p>Occupation: <span>03/03/02</span></p>

                        </div>
                        <div className="col-4">
                            <p>Nationality: <span>03/03/02</span></p>

                        </div>
                        <div className="col-4">
                            <p>Religion: <span>03/03/02</span></p>

                        </div>


                        <div className="col-8">
                            <p>Residential Address: <span>______________________________________________________</span></p>

                        </div>
                        <div className="col-4">
                            <p>Telephone: <span>03/03/02</span></p>

                        </div>

                        <div className="col-4">
                            <p>Cellphone: <span>03/03/02</span></p>

                        </div>

                    </div>
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
                            <p>Occupation: <span>03/03/02</span></p>

                        </div>
                        <div className="col-4">
                            <p>Nationality: <span>03/03/02</span></p>

                        </div>
                        <div className="col-4">
                            <p>Religion: <span>03/03/02</span></p>

                        </div>
                        
                        
                        <div className="col-8">
                            <p>Residential Address: <span>______________________________________________________</span></p>

                        </div>
                        <div className="col-4">
                            <p>Telephone: <span>03/03/02</span></p>

                        </div>
                        
                        <div className="col-4">
                            <p>Cellphone: <span>03/03/02</span></p>

                        </div>

                    </div>
                    <div className="row mt-5">
                    <h2>Siblings Studying Particular</h2>
                        
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
                    <div className="row mt-5">
                    <h2>Incase of Emergency</h2>
                        
                        <div className="col-5">
                            <p>Name of the person to be contacted: <span>Muhammad</span></p>
                        </div>
                        <div className="col-5">
                            <p>Address: <span>______________________________________</span></p>

                        </div>
                        <div className="col-4">
                            <p>CNIC: <span>Jahanzaib</span></p>
                        </div>
                        <div className="col-4">
                            <p>Relation with the student: <span>Mughal</span></p>
                        </div>
                        <div className="col-4">
                            <p>Email: <span>Muhammad Ismail</span></p>

                        </div>
                       
                        
                        
                        
                       
                        <div className="col-4">
                            <p>Telephone: <span>03/03/02</span></p>

                        </div>
                        
                        <div className="col-4">
                            <p>Cellphone: <span>03/03/02</span></p>

                        </div>

                    </div>
                        

                </div>
            </div>
        </>
    )
}
export default PrintForm;