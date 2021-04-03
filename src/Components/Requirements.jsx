import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './personal.css';
import { useHistory, useParams } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';

// import WebcamCapture from './Webcam'
// import Webcam from 'react-webcam';



const Requirements = () => {
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
    const [documentdata, setDocumentdata] = useState([{}]);
    const [document, setDocument] = useState();
    const [selectedFile, setSelectedFile] = useState();
    const [documentid, setDocumentid] = useState();
    const [sent, setSent] = useState([]);
    const history = useHistory();
    const { formNo } = useParams();
    const school_id = localStorage.getItem("school_id");
    useEffect(() => {
        axios.get(`http://fee-management-api.nastechltd.co/api/show_document/${school_id}`)
            .then(response => {
                console.log(response.data)
                setDocumentdata(response.data)
            })
            .catch((error) => {
                if (error.response) {
                    setMessageinfo(error.response.data.message);
                    handleMessage();
                }
            })
    }, [])
    const check = () => {
        for (var i = 0; i < documentdata.length; i++) {
            if (documentdata[i].id == sent[i]) {
                console.log("ho")
                continue;
            }
            else if (sent[i] == undefined) {
                console.log("bump")
                axios.get(`http://fee-management-api.nastechltd.co/api/document/${documentdata[i].id}`)
                    .then(response => {
                        const formData = new FormData();
                        formData.append('file', null);
                        formData.append('document_id', response.data.id);
                        formData.append('document', response.data.required_document);
                        formData.append('form_no', formNo);
                        formData.append('school_id', school_id);
                        axios({
                            method: "post",
                            url: "http://fee-management-api.nastechltd.co/api/student_document",
                            data: formData,
                            headers: { "Content-Type": "multipart/form-data" },
                        })
                            .then(function (response) {
                                //handle success
                                console.log(response);
                                setSelectedFile();
                                setDocumentid();
                                setDocument();

                            })
                            .catch(function (response) {
                                //handle error
                                console.log(response);
                            });
                    })
                    .catch((error) => {
                        if (error.response) {
                            setMessageinfo(error.response.data.message);
                            handleMessage();
                        }
                    })
            }
            else if (documentdata[i].id != sent[i]) {
                console.log(sent[i])
            }

        }
        // console.log("hi")
        axios.get(`http://fee-management-api.nastechltd.co/api/undertaking/${formNo}`)
            .then(response => {
                console.log(response.data)
                for (var i = 0; i < response.data.undertaking.length; i++) {
                    if (response.data.undertaking[i].file === null) {
                        history.push(`/undertaking/${formNo}`)
                        localStorage.clear();
                        break;
                    }

                }
                if (response.data.undertaking.length === 0) {
                    history.push(`/`)
                    localStorage.clear();
                }
            })
            .catch((error) => {
                if (error.response) {
                    setMessageinfo(error.response.data.message);
                    handleMessage();
                }
            })
    }
    const changeHandler = (e) => {
        setSelectedFile(e.target.files[0]);

    };

    const changeHandlerbox = async (e) => {
        setDocumentid(e.target.value);

    };
    const handleSubmission = () => {
        axios.get(`http://fee-management-api.nastechltd.co/api/document/${documentid}`)
            .then(response => {
                const formData = new FormData();
                formData.append('file', selectedFile);
                formData.append('document_id', documentid);
                formData.append('document', response.data.required_document);
                formData.append('form_no', formNo);
                formData.append('school_id', school_id);
                axios({
                    method: "post",
                    url: "http://fee-management-api.nastechltd.co/api/student_document",
                    data: formData,
                    headers: { "Content-Type": "multipart/form-data" },
                })
                    .then(function (response) {
                        //handle success
                        setSent([...sent, response.data.document_id])
                        console.log(response.data.document_id);
                        setSelectedFile();
                        setDocumentid();
                        setDocument();
                        setMessageinfo("Submitted!!")
                        handleMessage();

                    })
                    .catch(function (response) {
                        //handle error
                        console.log(response);
                    });

            })
            .catch((error) => {
                if (error.response) {
                    setMessageinfo(error.response.data.message);
                    handleMessage();
                }
            })
    }









    return (
        <>

            <div className="container-fluid form_body">
                <div className="container ">
                    <h1 className="text-center text-dark">STUDENT ADMISSION FORM</h1>
                    <form onSubmit={(e) => e.preventDefault()} >
                        <fieldset className="mt-4 field_box shadow">
                            <legend>Requirements</legend>
                            {documentdata.map((val, i) => {
                                return (
                                    <>
                                        <div className="row">
                                            <div className="ml-2 mt-2 col-4 form-check">
                                                <input className="form-check-input" type="checkbox" value={val.id} onChange={(e) => changeHandlerbox(e)} id={val.id} />
                                                <label className="form-check-label print-capitalize" for={val.id}>
                                                    {val.required_document}
                                                </label>
                                            </div>
                                            <div className="col-4">
                                                {documentid == val.id ?
                                                    <>
                                                        <input class="form-control" name="file" type="file" id={`${val.id}file`} onChange={(e) => changeHandler(e)} />
                                                    </>
                                                    :
                                                    null}
                                            </div>
                                            <div className="col-3 my-1">
                                                {documentid == val.id ?
                                                    <>
                                                        <button onClick={handleSubmission} className="btn btn-success">Upload</button>
                                                    </>
                                                    :
                                                    <button onClick={handleSubmission} disabled className="btn btn-success">Upload</button>

                                                }
                                            </div>

                                        </div>
                                    </>
                                )
                            })}

                            {/* <div className="row">
                                <div className="ml-2 mt-2 col-4 form-check">
                                    <input className="form-check-input" type="checkbox" value={documentdata.id} id="a1" onChange={(e) => changeHandlerbox(e)} />
                                    <label className="form-check-label" for="a1">
                                        {documentdata.required_document}
                                    </label>
                                </div>
                                <div className="col-4">
                                    <input class="form-control" type="file" id="formFile" onChange={(e) => changeHandler(e)} />
                                </div>
                            </div> */}

                            <div className="row">
                                <div className="col-12 text-right mt-3">
                                    <button onClick={check} className="btn btn-success w25">Next</button>
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
export default Requirements;