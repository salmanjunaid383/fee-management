import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Modal } from 'react-bootstrap';
import axios from 'axios';
import logo from './jb1.png';
import UpdateIcon from '@material-ui/icons/Update';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Select1 from 'react-select'
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';



// const useStyles = makeStyles((theme) => ({
//     root: {
//       '& > *': {
//         margin: theme.spacing(1),
//         width: '30ch',
//       },
//     },
//   }));
const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '30ch'

        },
    },
    formControl: {
        margin: theme.spacing(1),
        //   width: '30ch',
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const Term = () => {
    const classes = useStyles();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [studentdata, setStudentdata] = useState([]);
    const [classdata, setClassdata] = useState([]);
    const [term, setTerm] = useState([]);
    const [startingdate, setStartingdate] = useState();
    const [endingdate, setEndingdate] = useState();
    const [startdatefinal, setStartdatefinal] = useState();
    const [enddatefinal, setEnddatefinal] = useState();
    const [monthyear, setMonthyear] = useState();
    const [description, setDescription] = useState();
    const [classid, setClassid] = useState();
    const school_id = localStorage.getItem("school_id");
    const history = useHistory();
    useEffect(() => {
        axios.get(`http://fee-management-api.nastechltd.co/api/show_term/${school_id}`)
            .then(response => {
                console.log(response);
                setTerm(response.data);
            })
            .catch(error => (console.log(error)))
    }, [])
    useEffect(() => {
        axios.get(`http://fee-management-api.nastechltd.co/api/schools_class/${school_id}`)
            .then(response => {
                console.log(response.data)
                setClassdata(response.data)
            })
            .catch(error => console.log(error))

    }, [])
    useEffect(() => {
        axios.get(`http://fee-management-api.nastechltd.co/api/student/${school_id}`)
            .then(response => {
                console.log(response);
                setStudentdata(response.data);
            })
            .catch(error => (console.log(error)))

    }, [])
    
    const reload = () => {
        axios.get(`http://fee-management-api.nastechltd.co/api/show_term/${school_id}`)
            .then(response => {
                console.log(response);
                setTerm(response.data);
            })
            .catch(error => (console.log(error)))
    }
    const deleteTerm = (id) => {
        axios.delete(`http://fee-management-api.nastechltd.co/api/term/${id}`)
            .then(response => {
                console.log(response);
                reload();
            })
            .catch(error => console.log(error))
    }

    const update = (id) => {
        axios.get(`http://fee-management-api.nastechltd.co/api/term/${id}`)
            .then(response => {
                console.log(response.data);
                localStorage.setItem("id", response.data.id);
                localStorage.setItem("term_name", response.data.term_name);
                setDescription(response.data.term_name)
                localStorage.setItem("startdate", response.data.start_date);
                localStorage.setItem("enddate", response.data.end_date);
                handleShow();
            })
            .catch(error => (console.log(error)))
            
    }
    const sendUpdated = () => {
        if (startingdate == undefined){
            alert("Select Starting Date")
        }
        else if (endingdate == undefined){
            alert("Select ending Date")

        }
        else{
        axios.put(`http://fee-management-api.nastechltd.co/api/term/${localStorage.getItem("id")}`,{
        start_date: `${StartDate.getTime()/1000}`,
        end_date: `${EndDate.getTime()/1000}`,
        term_name: description,
        school_id: school_id,
        month_or_year: `${startmonth}-${startyear}`
        })
            .then(response => {
                console.log(response.data);
                localStorage.removeItem("id")
                localStorage.removeItem("term_name");
                localStorage.removeItem("startdate");
                localStorage.removeItem("enddate");
                setStartingdate();
                setEndingdate();
                setDescription();
                reload();
                handleClose();
            })
            .catch(error => (console.log(error)))
        }
    }

    function timeConverter(UNIX_timestamp){
        var a = new Date(UNIX_timestamp * 1000);
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        var time = date + ' ' + month + ' ' + year ;
        return time;
      }
    // const feedDate = () => {
        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul",
            "Aug", "Sep", "Oct", "Nov", "Dec"];
        var StartDate = new Date(startingdate);
        // console.log(StartDate)
        var startdate = StartDate.getDate()
        var startmonth = months[StartDate.getMonth()];
        var startyear = StartDate.getFullYear().toString().substr(-2);
        var EndDate = new Date(endingdate);
        var enddate = EndDate.getDate()
        var endmonth = months[EndDate.getMonth()];
        var endyear = EndDate.getFullYear().toString().substr(-2);
        // setStartdatefinal(`${startdate}-${startmonth}-${startyear}`);
        // setEnddatefinal(`${enddate}-${endmonth}-${endyear}`);
        // setMonthyear(`${startmonth}-${startyear}`);


    

    // var tt = new Date().getTime()/1000;
    // console.log(tt)

    const data = {
        start_date: `${StartDate.getTime()/1000}`,
        end_date: `${EndDate.getTime()/1000}`,
        term_name: description,
        school_id: school_id,
        month_or_year: `${startmonth}-${startyear}`

    }
    const sendData = () => {


        axios.post(`http://fee-management-api.nastechltd.co/api/term`, data)
            .then(response => {
                console.log(response);
                setStartingdate();
                setEndingdate();
                setDescription();
                reload();
            })
            .catch(error => console.log(error))



        // console.log(data)
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

                            <Link to="/campusdashboard" class="nav-link "><div class="folder-icons ">
                                <div class="icon1">
                                    <i class="fas  fa-columns"></i>
                                </div>
                                <div class="icon-name1 ">Dashboard</div>
                            </div></Link>
                            <Link to="/documents" class="nav-link "><div class="folder-icons ">
                                <div class="icon1">
                                    <i class="fas  fa-columns"></i>
                                </div>
                                <div class="icon-name1 ">Documents</div>
                            </div></Link>
                            {/* <div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas fa-school"></i>
                                </div>
                                <div class="icon-name"><Link  class="nav-link"to="/school">Campuses</Link></div>
                            </div> */}
                            <Link class="nav-link" to="/class"><div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas fa-user-graduate"></i>
                                </div>
                                <div class="icon-name">Class</div>
                            </div></Link>
                            <Link class="nav-link" to="/admissionrequest"><div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas fa-user-graduate"></i>
                                </div>
                                <div class="icon-name">Pending Admissions</div>
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
                            <Link class="nav-link" to="/feevoucheradmin"><div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas fa-wallet"></i>
                                </div>
                                <div class="icon-name">Fee Voucher</div>
                            </div></Link>
                            <Link class="nav-link" to="/adminledger"><div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas fa-wallet"></i>
                                </div>
                                <div class="icon-name">Student Ledger</div>
                            </div></Link>
                            <Link class="nav-link" to="/admission"><div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas fa-wallet"></i>
                                </div>
                                <div class="icon-name">Admission Charges</div>
                            </div></Link>
                            <Link class="nav-link" to="/discounted"><div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas fa-wallet"></i>
                                </div>
                                <div class="icon-name">Discounted</div>
                            </div></Link>
                            <Link class="nav-link" to="/term"><div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas fa-wallet active"></i>
                                </div>
                                <div class="icon-name active">Term</div>
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
                                <div class="big-inbox">
                                    Term
                                </div>
                                <button onClick={logOut} class="btn text-bolder text-right">Log Out</button>

                            </div>
                        </div>
                        <hr class="new-hr" />
                    </div>
                    <div class="right-body">

                        <div class="message">
                            <div className="add-student">
                                <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Update Term</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <div class="row billing-main">
                                            <div class="col-6 billing-box">
                                                <TextField type="date" className="pb-3" label="Starting Date" onChange={(e) => setStartingdate(e.target.value)} defaultValue="2021-01-01" variant="filled" />
                                                <TextField type="text" className="pb-3" required label="Term Name" defaultValue={localStorage.getItem("term_name")} onChange={(e) => setDescription(e.target.value)} variant="filled" />
                                            </div>
                                            <div class="col-6 billing-box">
                                                <TextField type="date" className="pb-3" required label="Ending Date" onChange={(e) => setEndingdate(e.target.value)} defaultValue="2021-01-01" variant="filled" />
                                            </div>
                                        </div>


                                    </Modal.Body>
                                    <Modal.Footer>
                                        <button class="btn btn-secondary" onClick={handleClose}>
                                            Close
                                            </button>
                                        <button onClick={sendUpdated} className="btn btn-primary">Update</button>
                                    </Modal.Footer>
                                </Modal>
                            </div>
                            {term.length > 0 ?
                                <>
                                    <div class="table-responsive">

                                        <table class="table no-wrap">
                                            <thead>
                                                <tr>
                                                    <th class="border-top-0">#</th>
                                                    <th class="border-top-0">Name</th>
                                                    <th class="border-top-0">Starting Date</th>
                                                    <th class="border-top-0">Ending Date</th>
                                                    <th class="border-top-0">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {term.map((val, i) => {
                                                    return (
                                                        <>
                                                            <tr key={i}>
                                                                <td>{val.id}</td>
                                                                <td>{val.term_name}</td>
                                                                <td>{timeConverter(val.start_date)}</td>
                                                                <td class="txt-oflo">{timeConverter(val.end_date)}</td>
                                                                <td>
                                                                    <ButtonGroup disableElevation variant="contained" color="primary ">
                                                                        <Button className="student-btn-up" onClick={() => update(val.id)}   ><UpdateIcon className="text-white" /></Button>
                                                                        <Button className="student-btn-del" onClick={() => deleteTerm(val.id)}  ><DeleteIcon className="text-white" /></Button>
                                                                    </ButtonGroup>
                                                                </td>

                                                            </tr>
                                                        </>
                                                    )
                                                })}

                                            </tbody>
                                        </table>
                                    </div>
                                </>
                                :
                                <>
                                    <h2 class="text-center mt-3 secondary">Term</h2>
                                    <hr class="new-hr1 secondary" />

                                    <div class="row billing-main">
                                        <div class="col-4 billing-box">
                                            <TextField type="date" className="pb-3" label="Starting Date" onChange={(e) => setStartingdate(e.target.value)} defaultValue="2021-01-01" variant="filled" />
                                            <TextField type="text" className="pb-3" label="Term Name" onChange={(e) => setDescription(e.target.value)} variant="filled" />
                                        </div>
                                        <div class="col-4 billing-box">
                                            <TextField type="date" className="pb-3" label="Ending Date" onChange={(e) => setEndingdate(e.target.value)} defaultValue="2021-01-01" variant="filled" />
                                        </div>
                                    </div>
                                    <div class="text-center my-4">  <button onClick={sendData} class="btn btn-generate btn-success">Submit</button></div>
                                </>












                            }

                        </div>


                    </div>
                </div>
            </div>
        </>
    );
};
export default Term;