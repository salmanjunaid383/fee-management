import React, { useState } from 'react';
import axios from 'axios';
import './personal.css';
import { useHistory } from 'react-router-dom';
// import WebcamCapture from './Webcam'
// import Webcam from 'react-webcam';



const Requirements = () => {


    const [selectedFile, setSelectedFile] = useState();
    const [isSelected, setIsSelected] = useState(false);


    const changeHandler = (e) => {
        setSelectedFile(e.target.files);
        // setIsSelected(true);

        let reader = new FileReader();
        reader.readAsDataURL(selectedFile[0])

        reader.onload = (e) => {
            console.warn("file", e.target.result)
            const formdata = { file: e.target.result }
            return (
                axios.post(`http://fee-management-api.nastechltd.co/api/student_document`,
                    {

                        file: formdata,
                        form_no: 552191,
                        document_id: 3,
                        document: "b-form"

                    })
                    .then(response => console.log(response.data))
                    .catch(error => console.log(error))
            )
        }
    };




    // const formData = new FormData();
    // formData.append('File', selectedFile);
    // const handleSubmission = () => {

    //     var data = {
    //         file : formData,
    //         form_no : 552191,
    //         document_id : 3,
    //         document: "b-form"
    //         }
    //     axios.post(`http://fee-management-api.nastechltd.co/api/student_document`,data)
    //     .then(response => console.log(response.data))
    //     .catch(error => console.log(error))
    // }
    // console.log(selectedFile)

    // const formData = new FormData();
    // formData.append('username', 'Chris');
    // console.log(formData)

    // const sendData = () => {
    //     const formData = new FormData();
    //     formData.append('File', selectedFile);
    //     axios.post(`http://fee-management-api.nastechltd.co/api/student_document`,{
    //     file : File,
    //     student_id : 1,
    //     document_id : 1,
    //     document: "b-form"
    //     })
    //     .then(response => console.log(response.data))
    //     .catch(error => console.log(error))
    //     console.log(formData)
    // }







    return (
        <>

            <div className="container-fluid form_body">
                <div className="container ">
                    <h1 className="text-center text-dark">STUDENT ADMISSION FORM</h1>
                    <form onSubmit={(e) => e.preventDefault()} >
                        <fieldset className="mt-4 field_box shadow">
                            <legend>Requirements</legend>
                            <div className="row">
                                <div className="ml-2 mt-2 col-4 form-check">
                                    <input className="form-check-input" type="checkbox" value="agreed" id="a1" />
                                    <label className="form-check-label" for="a1">
                                        Birth Certificte
                                    </label>
                                </div>
                                <div className="col-4">
                                    <input class="form-control" name="file" type="file" id="formFile" onChange={(e) => changeHandler(e)} />
                                </div>
                            </div>

                            {/* <div className="row">
                                <div className="ml-2 mt-2 col-4 form-check">
                                    <input className="form-check-input" type="checkbox" value="agreed" id="a1"  />
                                    <label className="form-check-label" for="a1">
                                        T.C (from last school)
                                    </label>
                                </div>
                                <div className="col-4">
                                    <input class="form-control" type="file" id="formFile" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="ml-2 mt-2 col-4 form-check">
                                    <input className="form-check-input" type="checkbox" value="agreed" id="a1"  />
                                    <label className="form-check-label" for="a1">
                                        Photocopy of valid CNIC of Parents
                                    </label>
                                </div>
                                <div className="col-4">
                                    <input class="form-control" type="file" id="formFile" />
                                </div>
                            </div> */}
                            <div className="row">
                                <div className="col-12 text-right mt-3">
                                    {/* <button onClick={handleSubmission} className="btn btn-success w25">Next</button> */}
                                </div>
                            </div>


                        </fieldset>

                    </form>
                </div>
            </div>



        </>
    );
};
export default Requirements;