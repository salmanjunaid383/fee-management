import { React, useEffect, useState } from 'react';
import axios from 'axios';
import './Undertaking.css';

const Undertaking = () => {
    return (
        <>
            <div className="undertaking-main border border-dark">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h2 className="text-center">WONDERLAND GRAMMAR SECONDARY SCHOOL</h2>
                        </div>
                        <div className="col-12 text-right">
                            <p>GR No:<span><u>567</u></span></p>
                        </div>
                        <div className="col-10 mt-2">
                            <h2 className="text-center"><u>Undertaking by the Parents</u></h2>
                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className="col-12">
                            <p>We, the parents of <span>MUhammad Jahanzaib</span> of class <span>X</span> accept here for undertake that,</p>
                        </div>
                        <div className="col-12 mt-2">
                            <p> i. We Solely take the responsibilty of our ward, if he/she does not show improvement in the next class or if he/she does not cope with the class.</p>
                        </div>
                        <div className="col-12 mt-2">
                            <p> ii. We will not blame the teachers/school for our ward's slow progress.</p>
                        </div>
                    </div>
                    <div className="row mt-4">
                    <div className="col-12">
                        <p>Name of the parent: <span>Muhammad Tariq</span></p>
                        <p>Signature: <span>__________________________</span></p>
                        <p>Date: <span>17-Mar-21</span> </p>
                    </div>
                    </div>

                </div>
            </div>
        </>
    )
}
export default Undertaking;