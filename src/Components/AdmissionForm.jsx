import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
// import TextField from '@material-ui/core/TextField';



const Studentparticular = () => {

    const history = useHistory();
    // const [schooldata, setSchooldata] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const { schoolid } = useParams();
    localStorage.setItem("school_id", schoolid);

    useEffect(() => {

        axios.get(`http://fee-management-api.nastechltd.co/api/show_school/${schoolid}`)
            .then(response => {
                console.log(response);
                if (response.data.is_oppend == 1) {
                    history.push("/studentparticular")
                }
                else if (response.data.is_oppend == 0) {
                    handleShow();
                }
                // setSchooldata(response.data);
            })
            .catch(error => (console.log(error)))



    }, [])








    return (
        <>
            <div className="container-fluid form_body">
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div class="row billing-main">
                            <h3>Admissions Are Closed At This Time</h3>
                        </div>


                    </Modal.Body>
                    <Modal.Footer>
                        <button class="btn btn-secondary" onClick={handleClose}>
                            Close
                                            </button>
                        {/* <button className="btn btn-primary">Create</button> */}
                    </Modal.Footer>
                </Modal>
            </div>

        </>);
};

export default Studentparticular;