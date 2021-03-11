import { React, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import logo from './jb1.png'
import LaunchIcon from '@material-ui/icons/Launch';
import './dashboard.css';
import UpdateIcon from '@material-ui/icons/Update';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { Modal } from 'react-bootstrap';
import TextField from '@material-ui/core/TextField';

const BreakDown = () => {
    
    const [monthly, setMonthly] = useState([]);
    const [section, setSection] = useState();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [show1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);
    const [yearly, setYearly] = useState([]);
    const history = useHistory();
    const fee_structure_id = localStorage.getItem("fee_structure_id")

    useEffect(() => {
        axios.get(`http://fee-management-api.nastechltd.co/api/monthly_charges/${fee_structure_id}`)
            .then(response => {
                console.log(response.data)
                setMonthly(response.data.monthly_charges)
                setYearly(response.data.yearly_charges)
            })
            .catch(error => console.log(error))
    }, [])

    // const sendData = () => {
    //     axios.post(`http://fee-management-api.nastechltd.co/api/section`, {
    //         name: section,
            // class_id :class_id,
            // class_name : class_name

    //     })
    //         .then(response => {
    //             console.log(response);
    //             reload();
    //             handleClose();
    //         })
    //         .catch(error => console.log(error))
    // }
    // const update = (id) =>{
    //     axios.get(`http://fee-management-api.nastechltd.co/api/show_section/${id}`)
    //       .then(response => {
    //               console.log(response.data)
    //               localStorage.setItem("id",response.data.id)
    //               localStorage.setItem("name",response.data.name)
    //               setSection(response.data.name)
    //               handleShow1();
    //       })
    //       .catch(error => console.log(error) )
    // }
    // const sendUpdated = () => {
    //     axios.put(`http://fee-management-api.nastechltd.co/api/section/${localStorage.getItem("id")}`, {
    //         name : section

    //     })
    //     .then (response => 
    //         {console.log(response);
    //             localStorage.removeItem("id")
    //             localStorage.removeItem("name")
    //             reload();
    //             handleClose1();
    //         })
    //     .catch (error => console.log(error))
    // }




    // const reload = () => {
    //     axios.get(`http://fee-management-api.nastechltd.co/api/section`)
    //         .then(response => {
    //             console.log(response.data)
    //             setSectiondata(response.data)
    //         })
    //         .catch(error => console.log(error))

    // }
    // const deleteSchool = (id) => {
    //     axios.delete(`http://fee-management-api.nastechltd.co/api/section/${id}`)
    //         .then(response => {
    //             console.log(response)
    //             reload();
    //         })
    //         .catch(error => {
    //             console.log(error)
    //             alert("First Delete Students Of This Class")
    //         })

    // }



    return (
        <>
            <div class="dashboard">
                <div class="left">
                    <div class="navigation">
                        <div class="wrapper2">
                            <div class="abilan">
                                <img src={logo} />
                            </div>
                            <Link to="/dashboard" class="nav-link "><div class="folder-icons ">
                                <div class="icon1">
                                    <i class="fas  fa-columns"></i>
                                </div>
                                <div class="icon-name1 ">Dashboard</div>
                            </div></Link>
                            <Link class="nav-link" to="/class"><div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas fa-user-graduate"></i>
                                </div>
                                <div class="icon-name">Class</div>
                            </div></Link> 
                            <Link class="nav-link" to="/section"><div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas fa-user-graduate active"></i>
                                </div>
                                <div class="icon-name active">Section</div>
                            </div></Link>
                            <Link class="nav-link" to="/students"><div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas fa-user-graduate"></i>
                                </div>
                                <div class="icon-name">Students</div>
                            </div></Link>
                            <Link class="nav-link" to="/finance"><div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas fa-wallet"></i>
                                </div>
                                <div class="icon-name">Finance Employee</div>
                            </div></Link>
                            <Link class="nav-link" to="/fee"><div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas fa-wallet"></i>
                                </div>
                                <div class="icon-name">Fee Generation</div>
                            </div></Link>
                            <Link class="nav-link" to="/feeperiod"><div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas fa-wallet"></i>
                                </div>
                                <div class="icon-name">Fee Period</div>
                            </div></Link>
                            <Link class="nav-link" to="/structure"><div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas fa-wallet"></i>
                                </div>
                                <div class="icon-name">Fee Structure</div>
                            </div></Link>
                            <Link class="nav-link" to="/discounted"><div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas fa-wallet"></i>
                                </div>
                                <div class="icon-name">Discounted</div>
                            </div></Link>
                            <Link class="nav-link" to="/term"><div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas fa-wallet"></i>
                                </div>
                                <div class="icon-name">Term</div>
                            </div></Link>
                            <Link class="nav-link" to="/expense"><div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas fa-wallet"></i>
                                </div>
                                <div class="icon-name">Expense Tracking</div>
                            </div></Link>
                            
                        </div>
                    </div>
                </div>
                <div class="right-side">
                    <div class="right-header">
                        <div class="top-bar">
                            <div class="top-bar-justify">
                                <div class="big-inbox">Sections</div>
                            </div>
                        </div>
                        <hr class="new-hr" />
                    </div>
                    <div class="right-body">
                        <div class="message">
                            <div class="add-student">
                                <button type="button" onClick={handleShow} class="btn btn-primary btn-lg"><AddIcon />Add Section</button>
                                {/* <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Add Section</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <div class="row billing-main">
                                            <div class="col-6 billing-box">
                                                <TextField className="pb-3 bg-white" type="text" onChange={(e) => setSection(e.target.value)} label="Section" variant="filled" />
                                            </div>
                                        </div>


                                    </Modal.Body>
                                    <Modal.Footer>
                                        <button class="btn btn-secondary" onClick={handleClose}>
                                            Close
                                            </button>
                                        <button onClick={sendData} className="btn btn-primary">Create</button>
                                    </Modal.Footer>
                                </Modal>
                                <Modal show={show1} onHide={handleClose1}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Update Section</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <div class="row billing-main">
                                            <div class="col-6 billing-box">
                                                <TextField className="pb-3 bg-white" type="text" defaultValue={localStorage.getItem("name")} onChange={(e) => setSection(e.target.value)} label="Section" variant="filled" />
                                            </div>
                                        </div>


                                    </Modal.Body>
                                    <Modal.Footer>
                                        <button class="btn btn-secondary" onClick={handleClose1}>
                                            Close
                                            </button>
                                        <button onClick={sendUpdated} className="btn btn-primary">Update</button>
                                    </Modal.Footer>
                                </Modal> */}
                            </div>
                            <div class="table-responsive">
                                <h3 class="text-center">Monthly Charges</h3>
                                <table class="table no-wrap">
                                    <thead>
                                        <tr>
                                            <th class="border-top-0">#</th>
                                            <th class="border-top-0">Description</th>
                                            <th class="border-top-0">Charges</th>
                                            <th class="border-top-0">Created At</th>
                                            <th class="border-top-0">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {monthly.map((val, i) => {
                                            return (
                                                <>
                                                    <tr key={i}>
                                                        <td>{i+1}</td>
                                                        <td class="txt-oflo">{val.description}</td>
                                                        <td>{val.charges}</td>
                                                        <td>{val.created_at.slice(0, 10)}</td>
                                                        <td>
                                                            {/* <ButtonGroup disableElevation variant="contained" color="primary">
                                                                <Button className="student-btn-up" onClick={() => update(val.id)}  ><UpdateIcon className="text-white" /></Button>
                                                                <Button className="student-btn-del" onClick={() => deleteSchool(val.id)} ><DeleteIcon className="text-white" /></Button>
                                                            </ButtonGroup> */}
                                                        </td>
                                                    </tr>
                                                </>
                                            )
                                        })}
                                        
                                    </tbody>
                                </table>
                                <h3 class="text-center">Yearly Charges</h3>

                                <table class="table no-wrap">
                                    <thead>
                                        <tr>
                                            <th class="border-top-0">#</th>
                                            <th class="border-top-0">Description</th>
                                            <th class="border-top-0">Charges</th>
                                            <th class="border-top-0">Created At</th>
                                            <th class="border-top-0">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {yearly.map((val, i) => {
                                            return (
                                                <>
                                                    <tr key={i}>
                                                        <td>{i+1}</td>
                                                        <td class="txt-oflo">{val.description}</td>
                                                        <td>{val.charges}</td>
                                                        <td>{val.created_at.slice(0, 10)}</td>
                                                        <td>
                                                            {/* <ButtonGroup disableElevation variant="contained" color="primary">
                                                                <Button className="student-btn-up" onClick={() => update(val.id)}  ><UpdateIcon className="text-white" /></Button>
                                                                <Button className="student-btn-del" onClick={() => deleteSchool(val.id)} ><DeleteIcon className="text-white" /></Button>
                                                            </ButtonGroup> */}
                                                        </td>
                                                    </tr>
                                                </>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default BreakDown;











