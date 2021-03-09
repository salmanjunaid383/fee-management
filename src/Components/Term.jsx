import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import logo from './jb1.png'
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
    const [studentdata, setStudentdata] = useState([]);
    const [classdata, setClassdata] = useState([]);
    const [startingdate, setStartingdate] = useState();
    const [endingdate, setEndingdate] = useState();
    const [description, setDescription] = useState();
    const [classid, setClassid] = useState();
    const school_id = localStorage.getItem("school_id")
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
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul",
        "Aug", "Sep", "Oct", "Nov", "Dec"];
    var StartDate = new Date(startingdate);
    var startdate = StartDate.getDate()
    var startmonth = months[StartDate.getMonth()];
    var startyear = StartDate.getFullYear().toString().substr(-2);
    var EndDate = new Date(endingdate);
    var enddate = EndDate.getDate()
    var endmonth = months[EndDate.getMonth()];
    var endyear = EndDate.getFullYear().toString().substr(-2);
    

    const data = {
        start_date: `${startdate}-${startmonth}-${startyear}` ,
        end_date: `${enddate}-${endmonth}-${endyear}`,
        term_name: description,
        school_id: school_id,
        month_or_year : `${startmonth}-${startyear}`

    }

    const sendData = () => {
        axios.post(`http://fee-management-api.nastechltd.co/api/term`, data)
            .then(response => {
                console.log(response);
            })
            .catch(error => console.log(error))
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

                            <Link to="/dashboard" class="nav-link "><div class="folder-icons ">
                                <div class="icon1">
                                    <i class="fas  fa-columns"></i>
                                </div>
                                <div class="icon-name1 ">Dashboard</div>
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
                                    Fee
                        </div>
                            </div>
                        </div>
                        <hr class="new-hr" />
                    </div>
                    <div class="right-body">

                        <div class="message">
                            <h2 class="text-center mt-3 secondary">Term</h2>
                            <hr class="new-hr1 secondary" />

                            <div class="row billing-main">
                                <div class="col-4 billing-box">
                                    <TextField type="date" className="pb-3" label="Starting Date"  onChange={(e) => setStartingdate(e.target.value)} defaultValue="2021-01-01" variant="filled" />
                                    <TextField type="text" className="pb-3" label="Term Name" onChange={(e) => setDescription(e.target.value)} variant="filled" />



                                </div>

                                <div class="col-4 billing-box">
                                    <TextField type="date" className="pb-3" label="Ending Date" onChange={(e) => setEndingdate(e.target.value)} defaultValue="2021-01-01" variant="filled" />






                                </div>
                            </div>

                            <div class="text-center my-4">  <button onClick={sendData} class="btn btn-generate btn-success">Submit</button></div>
                        </div>


                    </div>
                </div>
            </div>
        </>
    );
};
export default Term;