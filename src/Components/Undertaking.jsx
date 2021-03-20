import { React, useEffect, useState } from 'react';
import axios from 'axios';
import './Undertaking.css';

const Undertaking = ({ teamId, orientation = 'portrait' }) => {
    const [student, setStudent] = useState([]);
    const [date, setDate] = useState();
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
        axios.get(`http://fee-management-api.nastechltd.co/api/undertaking/8520`)
            .then(response => {
                console.log(response);
                setStudent(response.data);
                setDate(response.data[1].created_at);
                // setFather(response.data.StudentFather);
                // setMother(response.data.StudentMother);
                // setGuardian(response.data.StudentGuardian);
                // setSiblings(response.data.SiblingsDetail);
                // setEmergency(response.data.EmergencyContact);
            })
            .catch((error) => {
                if (error.response) {
                    alert(error.response.data.message);
                }
            })
    }, [])
    return (
        <>
            <div className="undertaking-main border mx-auto border-dark">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h2 className="text-center">WONDERLAND GRAMMAR SECONDARY SCHOOL</h2>
                        </div>
                        <div className="col-6 text-left">
                            <p className="text-bolder">GR No:<span className="text-bolder">567</span></p>
                        </div>
                        <div className="col-6 text-right">
                            <p className="text-bolder">Date:<span className="text-bolder">{date.slice(0,10)}</span></p>
                        </div>
                        <div className="col-12 mt-2">
                            <h2 className="text-center"><u>Undertaking by the Parents</u></h2>
                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className="col-12">
                            <p>Thanks for granting admission to my son/daughter named<span> Muhammad Jahanzaib</span> In class <span>X</span> of your school sunject to the submission of following documents on or before date 2021-03-24</p>
                        </div>

                    </div>
                    <div className="row mt-1">
                        <div className="col-12  undertaking-line">
                            {
                                student.map((val, i) => {
                                    return (
                                        <>
                                            <p className="text-bolder ml-2">{val.document}</p>
                                        </>
                                    )
                                })
                            }
                        </div>
                        <div className="col-12">
                            <p>Incase the above documents are not provided in time,the school authorities will be authorized to cancel the admission at my risk and responsibility.</p>
                        </div>
                        <p className="undertaking-overline mt-3">Signature of the Father/Mother</p>
                    </div>

                </div>
            </div>
        </>
    )
}
export default Undertaking;