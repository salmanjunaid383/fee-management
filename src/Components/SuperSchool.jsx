import { React, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import logo from "./jb1.png";
import './dashboard.css';
import UpdateIcon from '@material-ui/icons/Update';
import AddIcon from '@material-ui/icons/Add';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import { Modal } from 'react-bootstrap';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '30ch'

        },
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));
const SuperSchool = () => {
    const classes = useStyles();
    const [schooldata, setSchooldata] = useState([]);
    const history = useHistory();
    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);
    const handleClose = () => setShow(false);
    const handleClose1 = () => setShow1(false);
    const handleShow = () => setShow(true);
    const handleShow1 = () => setShow1(true);
    const [schoolName, setSchoolName] = useState();
    const [selectedFile, setSelectedFile] = useState();
    const [phone, setPhone] = useState();
    const [address, setAddress] = useState();
    const [email, setEmail] = useState();
    const [adminid, setAdminid] = useState();
    const [administratordata, setAdministratordata] = useState([]);

    useEffect(() => {
        axios.get(`http://fee-management-api.nastechltd.co/api/user`)
            .then(response => {
                console.log(response.data)
                setAdministratordata(response.data)
            })
            .catch(error => console.log(error))
    }, [])


    var admin = []
    for (var i = 0; i < administratordata.length; i++) {
        if ((administratordata[i].type).slice(11, 40) === "SchoolAdministrator") {
            var admindata = {
                admin_id: administratordata[i].id,
                name: administratordata[i].first_name + " " + administratordata[i].last_name
            }
            admin.push(admindata)
        }
    }
    const sendData = () => {

        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('admin_id', adminid);
        formData.append('name', schoolName);
        formData.append('contact', phone);
        formData.append('address', address);
        formData.append('email', email);
        // console.log(formData.get('File'))

        axios({
            method: "post",
            url: "http://fee-management-api.nastechltd.co/api/schools",
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
          })
            .then(function (response) {
              //handle success
              console.log(response);
              reload();
              handleClose();
            })
            .catch(function (response) {
              //handle error
              console.log(response);
            });
    }

    // const sendData = () => {
    //     axios.post('http://fee-management-api.nastechltd.co/api/schools', data)
    //         .then(response => {
    //             console.log(response);
    //             console.log(response.data.id);
    //             setSchoolName();
    //             setPhone();
    //             setAddress();
    //             setEmail();
    //             setAdminid()
    //             handleClose();
    //             reload();
    //         })
    //         .catch(error => {
    //             console.log(error)
    //             alert("Invali Field(s)")
    //         })
    // }


    useEffect(() => {
        axios.get(`http://fee-management-api.nastechltd.co/api/schools`)
            .then(response => {
                console.log(response.data)
                setSchooldata(response.data)
            })
            .catch(error => console.log(error))

    }, [])

    const reload = () => {
        axios.get(`http://fee-management-api.nastechltd.co/api/schools`)
            .then(response => {
                setSchooldata(response.data)
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
        history.push("/")
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
                            <div class="add-student">
                                <button type="button" onClick={handleShow} class="btn btn-primary btn-lg"><AddIcon /> Add School</button>
                            </div>
                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title className="text-center">School Registration</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <div class="row billing-main">
                                        <div class="col-6 billing-box">
                                            <FormControl className={classes.formControl}>
                                                <InputLabel id="demo-simple-select-label">Administrator</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={adminid}
                                                    onChange={(e) => setAdminid(e.target.value)}
                                                >
                                                    {admin.map((val, i) => {
                                                        return (
                                                            <MenuItem value={val.admin_id}>{val.name}</MenuItem>
                                                        )

                                                    })}
                                                </Select>
                                            </FormControl>
                                            <TextField className="pb-3 bg-white" type="text" onChange={(e) => setSchoolName(e.target.value)} label="School Name" variant="filled" />
                                            <TextField className="pb-3 bg-white" type="number" onChange={(e) => setPhone(e.target.value)} label="Contact No." variant="filled" />
                                            <label htmlFor="logo">Upload School Logo:</label>
                                            <input id="logo" type="file" name="logo" onChange={(e)=>setSelectedFile(e.target.files[0])} className="form-control w-100" />
                                        </div>

                                        <div class="col-6 billing-box">
                                            <TextField className="pb-3" type="email" onChange={(e) => setEmail(e.target.value)} label="Email" variant="filled" />
                                            <TextField className="pb-3" onChange={(e) => setAddress(e.target.value)} label="Address" multiline rows={1} variant="filled" />
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
                                        {schooldata.map((val, i) => {
                                            return (
                                                <tr key={i}>
                                                    <td>{val.id}</td>
                                                    <td class="txt-oflo">{val.name}</td>
                                                    <td>{val.address}</td>
                                                    <td>{val.contact}</td>
                                                    {/* <td><Link to="campusdashboard"><button onClick={()=>localStorage.setItem("school_id", val.id)} class="btn btn-primary">Enter School</button></Link></td> */}
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
export default SuperSchool;