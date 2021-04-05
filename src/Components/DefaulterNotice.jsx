import { React, useEffect, useState } from 'react';
import axios from 'axios';
import './Undertaking.css';
import { useParams } from 'react-router';
import Snackbar from '@material-ui/core/Snackbar';


const DefaulterNotice = ({ teamId, orientation = 'portrait' }) => {
    const [schooldata, setSchooldata] = useState({});
    const school_id = localStorage.getItem("school_id")
    function setPageSize(cssPageSize) {
        const style = document.createElement('style');
        style.innerHTML = `@page {size: ${cssPageSize}}`;
        style.id = 'page-orientation';
        document.head.appendChild(style);
    }
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
    // Set orientation of page being printed
    useEffect(() => {
        setPageSize(orientation);
        return () => {
            const child = document.getElementById('page-orientation');
            child.parentNode.removeChild(child);
        };
    }, [orientation]);
    useEffect(() => {
        axios.get(`http://fee-management-api.nastechltd.co/api/show_school/${school_id}`)
            .then(response => {
                console.log(response.data)
                setSchooldata(response.data);
            })
            .catch((error) => {
                if (error.response) {
                    setMessageinfo(error.response.data.message);
                    handleMessage();
                }
            })
    }, [])
    return (
        <>
            <div className="undertaking-main mx-auto">
                <button className="btn btn-danger text-bold" id="print_undertaking_btn" onClick={() => window.print()}>Print</button>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h2 className="text-center print-capitalize">{schooldata.name}</h2>
                        </div>
                        <div className="col-12 mt-2">
                            <h2 className="text-center"><u>Undertaking by the Parents</u></h2>
                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className="col-12">
                            <p>Dear Parents,</p>
                        </div>
                        <div className="col-12">
                            <p> Greetings of the day!We would like to remind you to please clear all your financial dues. Your prompt attention to this matter will be highly appreciated. </p>
                        </div>
                        <div className="col-12">
                            Thankyou in Advance
                            </div>
                    </div>
                </div>

                <div className="row mt-1 ml-2">
                    <div className="col-12  undertaking-line">
                        {/* {
                                documents.map((val, i) => {
                                    return (
                                        <>
                                            <p className="text-bolder ml-2 Print-capitalize">{val.document}</p>
                                        </>
                                    )
                                })
                            } */}
                    </div>
                    <p className="undertaking-overline mt-3">Signature of the Father/Mother</p>
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
    )
}
export default DefaulterNotice;