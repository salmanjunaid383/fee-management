import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import logo from './jb1.png'
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import axios from 'axios';
import Autocomplete from '@material-ui/lab/Autocomplete';



const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '30ch',
        },
    },
}));

const AddExpenseTracking = () => {
    const classes = useStyles();
    const [studentdata, setStudentdata] = useState([]);
    const [studentname, setStudentname] = useState();
    const [studentid, setStudentid] = useState('');
    const [charges, setCharges] = useState();
    const [description, setDescription] = useState();
    useEffect(() => {
        axios.get(`http://fee-management-api.nastechltd.co/api/student`)
            .then(response => {
                console.log(response);
                setStudentdata(response.data);

            })
            .catch(error => (console.log(error)))

    }, [])


    if (studentid.length != 0) {
        axios.get(`http://fee-management-api.nastechltd.co/api/student/${studentid}`)
            .then(response => {
                setStudentname(`${response.data.first_name} ${response.data.last_name}`);

            })
            .catch(error => (console.log(error)))
    }




    const data = {
        student_id: studentid,
        charges: charges,
        description: description,
        name: studentname

    }

    const sendData = () => {
        axios.post(`http://fee-management-api.nastechltd.co/api/expense_tracking`, data)
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

                            <Link to="/dashboard" class="nav-link active"><div class="folder-icons ">
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
                                    <i class="fas fa-wallet active"></i>
                                </div>
                                <div class="icon-name active">Fee Generation</div>
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
                            <h2 class="text-center mt-3 secondary">Expense Tracking</h2>
                            <hr class="new-hr1 secondary" />

                            <div class="row billing-main">
                                <div class="col-4 billing-box">
                                    <FormControl className={classes.formControl}>
                                        <InputLabel id="demo-simple-select-label">Student</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            value={studentid}
                                            onChange={(e) => setStudentid(e.target.value)}


                                        >
                                            {studentdata.map((val, i) => {
                                                return (
                                                    <MenuItem value={val.id}>{`${val.first_name} ${val.last_name}`}</MenuItem>
                                                )

                                            })}
                                        </Select>
                                    </FormControl>
                                    <TextField className="pb-3" type="number" onChange={(e) => setCharges(e.target.value)} label="Charges" variant="filled" />
                                </div>

                                <div class="col-4 billing-box">
                                    <TextField className="pb-3" type="text" label="Description" onChange={(e) => setDescription(e.target.value)} variant="filled" />

                                </div>
                            </div>

                            <div class="text-center my-4">  <button onClick={sendData} class="btn btn-generate btn-success" >Submit</button></div>
                        </div>


                    </div>
                </div>
            </div>
        </>
    );
};
export default AddExpenseTracking;