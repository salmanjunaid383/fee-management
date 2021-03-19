import { React, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import { Modal } from 'react-bootstrap';
import TextField from '@material-ui/core/TextField';
import logo from "./jb1.png";
import './dashboard.css';
import UpdateIcon from '@material-ui/icons/Update';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

const AdminsSchool = () => {
    const [data, setData] = useState([]);
    const history = useHistory();
    const { adminid } = useParams();
    const [show1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);
    const [schoolName, setSchoolName] = useState();
    const [phone, setPhone] = useState();
    const [address, setAddress] = useState();
    const [email, setEmail] = useState();
    // const id = localStorage.getItem("school_id");
    useEffect(() => {
        axios.get(`http://fee-management-api.nastechltd.co/api/schools/${adminid}`)
            .then(response => {
                console.log(response.data);
                setData(response.data);
            })
            .catch(error => console.log(error))

    }, [])
    const reload = () => {
        axios.get(`http://fee-management-api.nastechltd.co/api/schools/${adminid}`)
            .then(response => {
                setData(response.data);
            })
            .catch(error => console.log(error))

    }

    const deleteSchool = (id) => {
        axios.delete(`http://fee-management-api.nastechltd.co/api/schools/${id}`)
            .then(response => {
                console.log(response)
                reload();
            })
            .catch(error => {
                console.log(error)
                alert("First Delete the Classes");
            })
    }
    const update = (id) => {
        axios.get(`http://fee-management-api.nastechltd.co/api/show_school/${id}`)
            .then(response => {
                console.log(response.data)
                localStorage.setItem("id", response.data.id)
                localStorage.setItem("name", response.data.name)
                localStorage.setItem("email", response.data.email)
                localStorage.setItem("phone", response.data.contact)
                localStorage.setItem("address", response.data.address)
                setAddress(response.data.address)
                setSchoolName(response.data.name)
                setPhone(response.data.contact)
                setEmail(response.data.email)
                handleShow1();
            })
            .catch(error => console.log(error))
    }
    const sendUpdated = () => {
        axios.put(`http://fee-management-api.nastechltd.co/api/schools/${localStorage.getItem("id")}`, {
            name: schoolName,
            email: email,
            contact: phone,
            address: address

        })
            .then(response => {
                console.log(response);
                localStorage.removeItem("id")
                localStorage.removeItem("name")
                localStorage.removeItem("email")
                localStorage.removeItem("contact")
                localStorage.removeItem("address")
                reload();
                handleClose1();

            })
            .catch(error => console.log(error))
    }



const logOut = () => {
    localStorage.clear();
    history.push("/");
}


return (
    <>
        <div class="dashboard">
            <div class="left">
                <div class="navigation">
                    <div class="wrapper2">
                        <div class="abilan">
                            <img
                                src={logo} />
                        </div>

                        <Link class="nav-link" to="/super"><div class="folder-icons ">
                            <div class="icon1">
                                <i class="fas fa-columns"></i>
                            </div>
                            <div class="icon-name1">Dashboard</div>
                        </div></Link>

                        <Link to="/superschool" class="nav-link active "><div class="folder-icons">
                            <div class="icon1">
                                <i class="fas active fa-school"></i>
                            </div>
                            <div class="icon-name active">School</div>
                        </div></Link>

                        {/* <div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas fa-user-graduate"></i>
                                </div>
                                <div class="icon-name nav-link"><Link to="/students">Students</Link></div>
                            </div>
                            <div class="folder-icons">
                                <div class="icon1">
                                <i class="fas fa-wallet"></i>
                                </div>
                                <div class="icon-name nav-link "><Link to="/finance" class="">Finance Employee </Link></div>
                            </div>
                            <div class="folder-icons">
                                <div class="icon1">
                                <i class="fas fa-wallet"></i>
                                </div>
                                <div class="icon-name nav-link "><Link to="/class" class="">Class </Link></div>
                            </div>
                            <div class="folder-icons">
                        <div class="icon1">
                            <i class="fas fa-user-graduate"></i>
                        </div>
                        <div class="icon-name nav-link"><Link to="/fee">Fee Generation</Link></div>
                    </div>
                    <div class="folder-icons">
                        <div class="icon1">
                        <i class="fas fa-wallet"></i>
                        </div>
                        <div class="icon-name nav-link "><Link to="/feeperiod" >Fee Period</Link></div>
                    </div>
                    <div class="folder-icons">
                        <div class="icon1">
                        <i class="fas fa-wallet"></i>
                        </div>
                        <div class="icon-name nav-link "><Link to="/structure">Fee Structure</Link></div>
                    </div> */}



                    </div>
                </div>
            </div>
            <div class="right-side">
                <div class="right-header">
                    <div class="top-bar">
                        <div class="top-bar-justify">
                            <div class="big-inbox">
                                Schools
                                </div>
                            <button onClick={logOut} class="btn text-bolder text-right">Log Out</button>
                        </div>

                    </div>
                    <hr class="new-hr" />
                </div>
                <div class="right-body">
                    <div class="message">
                    <Modal show={show1} onHide={handleClose1}>
                                <Modal.Header closeButton>
                                    <Modal.Title className="text-center"> Update School</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <div class="row billing-main">
                                        <div class="col-6 billing-box">

                                            <TextField className="pb-3 bg-white" type="text" defaultValue={localStorage.getItem("name")} onChange={(e) => setSchoolName(e.target.value)} label="School Name" variant="filled" />
                                            <TextField className="pb-3 bg-white" type="number" defaultValue={localStorage.getItem("phone")} onChange={(e) => setPhone(e.target.value)} label="Contact No." variant="filled" />
                                        </div>

                                        <div class="col-6 billing-box">
                                            <TextField className="pb-3" type="email" defaultValue={localStorage.getItem("email")} onChange={(e) => setEmail(e.target.value)} label="Email" variant="filled" />
                                            <TextField className="pb-3" defaultValue={localStorage.getItem("address")} onChange={(e) => setAddress(e.target.value)} label="Address" multiline rows={1} variant="filled" />
                                        </div>

                                    </div>
                                </Modal.Body>
                                <Modal.Footer>
                                    <button class="btn btn-secondary" onClick={handleClose1}>
                                        Close
                                        </button>
                                    <button onClick={sendUpdated} className="btn btn-primary">Update</button>
                                </Modal.Footer>
                            </Modal>
                        <div class="table-responsive">
                            <table class="table no-wrap">
                                <thead>
                                    <tr>
                                        <th class="border-top-0">#</th>
                                        <th class="border-top-0">NAME</th>
                                        <th class="border-top-0">Address</th>
                                        <th class="border-top-0">Phone</th>
                                        {/* <th class="border-top-0">Visit</th> */}
                                        <th class="border-top-0">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((val, i) => {
                                        return (
                                            <tr key={i}>
                                                <td>{val.id}</td>
                                                <td class="txt-oflo">{val.name}</td>
                                                <td>{val.address}</td>
                                                <td>{val.contact}</td>
                                                <td>
                                                    <ButtonGroup disableElevation variant="contained" color="primary">
                                                        <Button className="student-btn-up" onClick={() => update(val.id)}  ><UpdateIcon className="text-white" /></Button>
                                                        <Button className="student-btn-del" onClick={() => deleteSchool(val.id)} ><DeleteIcon className="text-white" /></Button>
                                                    </ButtonGroup>
                                                </td>
                                            </tr>

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
export default AdminsSchool;