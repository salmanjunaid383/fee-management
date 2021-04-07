import { React, useEffect, useState } from 'react';
import axios from 'axios';
import './Undertaking.css';
import { useHistory, useParams } from 'react-router';
import Snackbar from '@material-ui/core/Snackbar';


const Undertaking = ({ teamId, orientation = 'portrait' }) => {
    const [student, setStudent] = useState({});
    const history = useHistory();
    const school_id = localStorage.getItem("school_id")
    const [schooldata, setSchooldata] = useState({});
    const [documents, setDocuments] = useState([]);
    const [date, setDate] = useState();
    const [myclass, setMyclass] = useState();
    const { formNo } = useParams()
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
        axios.get(`http://fee-management-api.nastechltd.co/api/undertaking/${formNo}`)
            .then(response => {
                console.log(response);
                axios.get(`http://fee-management-api.nastechltd.co/api/show_school/${response.data.form.school_id}`)
                    .then(response => {
                        console.log(response.data);
                        setSchooldata(response.data)
                    })
                    .catch((error) => {
                        if (error.response) {
                            setMessageinfo(error.response.data.message);
                            handleMessage();
                        }
                    })
                axios.get(`http://fee-management-api.nastechltd.co/api/show_class/${response.data.form.class_id}`)
                    .then(response => {
                        setMyclass(response.data.name)
                    })
                    .catch((error) => {
                        if (error.response) {
                            setMessageinfo(error.response.data.message);
                            handleMessage();
                        }
                    })
                setStudent(response.data.form);
                setDocuments(response.data.undertaking);
                setDate(response.data.undertaking[0].date);
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
                        <div className="col-12 text-right">
                            {school_id === null ? <button className="btn btn-primary" onClick={() => history.push("/")}>Home</button> : null}
                        </div>
                        <div className="col-12">
                            <h2 className="text-center print-capitalize">{schooldata.name}</h2>
                        </div>
                        <div className="col-6 text-left">
                            <p className="text-bolder">GR No:<span className="text-bolder">{student.G_R_NO}</span></p>
                        </div>
                        <div className="col-6 text-right">
                            {/* <p className="text-bolder">Date:<span className="text-bolder">{date.slice(0,10)}</span></p> */}
                        </div>
                        <div className="col-12 mt-2">
                            <h2 className="text-center"><u>Undertaking by the Parents</u></h2>
                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className="col-12">
                            <p>Thanks for granting admission to my son/daughter named<span className="text-bold"> {`${student.first_name} ${student.middle_name} ${student.last_name}`}</span> In class <span className="text-bold">{myclass}</span> of your school subject to the submission of following documents on or before date <span className="text-bold"> {date}</span>. </p>
                        </div>

                    </div>
                    <div className="row mt-1">
                        <div className="col-12  undertaking-line">
                            {
                                documents.map((val, i) => {
                                    return (
                                        <>
                                            <p className="text-bolder ml-2 Print-capitalize">{val.document}</p>
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
                    <Snackbar
                        anchorOrigin={{ vertical, horizontal }}
                        open={open}
                        autoHideDuration={4000}
                        onClose={CloseMessage}
                        message={messageinfo}
                        key={vertical + horizontal}
                    />
                </div>
            </div>
        </>
    )
}
export default Undertaking;