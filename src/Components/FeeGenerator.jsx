import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import logo from "./jb1.png";
import { Modal } from 'react-bootstrap';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(0),
            width: '30ch'

        },
    },
    formControl: {
        margin: theme.spacing(0),
        width: '20ch',
        // minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(0),
    },
}));


const Fee = () => {
    const classes = useStyles();
    const [classid, setClassid] = useState();
    const [tax, setTax] = useState();
    const [description, setDescription] = useState();
    const [classdata, setClassdata] = useState([]);
    const history = useHistory();
    const school_id = localStorage.getItem("school_id")
    const [inputList, setInputList] = useState([
        { description: "", charges: "" }
    ]
    );

    const handleChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
    }
    const handleAdd = () => {
        setInputList([...inputList, { description: "", charges: "" }]);
    }
    const removeField = (index) => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    }
    const [inputListYear, setInputListYear] = useState([
        { description: "", charges: "", month: "" }
    ]
    );

    const handleChangeY = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputListYear];
        list[index][name] = value;
        setInputListYear(list);
    }
    const handleAddY = () => {
        setInputListYear([...inputListYear, { description: "", charges: "", month: "" }]);
    }
    const removeFieldY = (index) => {
        const list = [...inputListYear];
        list.splice(index, 1);
        setInputListYear(list);
    }
    console.log(inputListYear)
    useEffect(() => {
        axios.get(`http://fee-management-api.nastechltd.co/api/schools_class/${school_id}`)
            .then(response => {
                console.log(response.data)
                setClassdata(response.data)
            })
            .catch((error) => {
                if (error.response) {
                    alert(error.response.data.message);
                }
            })
    }, [])
    const sendCharges = () => {
        axios.post(`http://fee-management-api.nastechltd.co/api/fee_structure`,
            {
                monthlyCharges: inputList,
                monthly_charges: 0,
                yearly_charges: 0,
                yearlyCharges: inputListYear,
                class_id: classid,
                school_id: school_id,
                description: description,
                tax: tax



            })
            .then(response => {
                console.log(response)
                setDescription();
                setTax();
                setClassid();
                setInputList([{ description: "", charges: "" }])
                setInputListYear([{ description: "", charges: "", month: "" }])
                history.push("/structure")
            })
            .catch((error) => {
                if (error.response) {
                    alert(error.response.data.message);
                }
            })
        // console.log(inputListYear)
        // console.log(inputList)
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
                                <img src={logo} />
                            </div>
                            <Link to="/campusdashboard" class="nav-link "><div class="folder-icons ">
                                <div class="icon1">
                                    <i class="fas  fa-columns"></i>
                                </div>
                                <div class="icon-name1 ">Dashboard</div>
                            </div></Link>
                            <Link to="/admissioncomponents" class="nav-link "><div class="folder-icons ">
                                <div class="icon1">
                                    <i class="fas fa-school"></i>
                                </div>
                                <div class="icon-name1">Admission</div>
                            </div></Link>

                            <Link class="nav-link" to="/class"><div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas fa-users-class"></i>
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
                                    <i class="fas fa-user-tie"></i>
                                </div>
                                <div class="icon-name">Finance Employee</div>
                            </div></Link>
                            <Link class="nav-link" to="/feecomponents"><div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas fa-money-check-alt active"></i>
                                </div>
                                <div class="icon-name active">Fee</div>
                            </div></Link>
                            <Link class="nav-link" to="/feevoucheradmin"><div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas fa-print"></i>
                                </div>
                                <div class="icon-name">Fee Voucher</div>
                            </div></Link>
                            <Link class="nav-link" to="/adminledger"><div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas fa-calculator-alt"></i>
                                </div>
                                <div class="icon-name">Student Ledger</div>
                            </div></Link>
                            <Link class="nav-link" to="/term"><div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas fa-calendar-alt"></i>
                                </div>
                                <div class="icon-name">Term</div>
                            </div></Link>
                            <Link class="nav-link" to="/expense"><div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas fa-receipt"></i>
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
                                    Add Fee Structure
                                </div>
                                <button onClick={logOut} class="btn text-bolder text-right">Log Out</button>

                            </div>
                        </div>
                        <hr class="new-hr" />
                    </div>
                    <div class="right-body">
                        <div class="message">
                            <h2 class="text-center secondary">Fee Structure</h2>
                            <div class="monthly-charges">
                                <div class="row">
                                    <div class="col-2">
                                        <select class="inline select" id="select-class" onChange={(e) => setClassid(e.target.value)}>
                                            <option selected disabled>Class</option>
                                            {classdata.map((val, i) => {
                                                return (
                                                    <>
                                                        <option value={val.id}>{val.name}</option>
                                                    </>
                                                )
                                            })}

                                        </select>
                                    </div>
                                    <div class="col-5">
                                        <input type="text" id="tax" name="description" required onChange={(e) => setDescription(e.target.value)} placeholder="Description" class="inline select" />
                                    </div>
                                    <div class="col-5">
                                        <input type="number" id="tax" name="tax" required data-bs-toggle="tooltip" title="Not in %" onChange={(e) => setTax(e.target.value)} placeholder="Enter Tax" class="inline select" />
                                    </div>
                                </div>

                            </div>

                            <hr class="new-hr" />
                            <div class="monthly-charges">
                                <h4 class="text-center">Monthly Charges</h4>
                                <hr class="new-hr" />
                                {inputList.map((item, i) => {
                                    return (
                                        <div key={i} class="row mb-2">
                                            <div class="col-5">
                                                <input type="text" id="tax" name="description" onChange={(e) => handleChange(e, i)} value={item.description} placeholder="Description" class="inline select" />
                                            </div>
                                            <div class="col-5">
                                                <input type="text" id="tax" name="charges" onChange={(e) => handleChange(e, i)} value={item.charges} placeholder="Charges" class="inline select" />

                                            </div>
                                            <div class="col-1">
                                                {inputList.length !== 1 &&
                                                    <button type="button" onClick={() => removeField(i)} class="btn btn-primary mt-1">Remove</button>
                                                }

                                            </div>
                                            <div class="col-1">
                                                {inputList.length - 1 === i &&
                                                    <button type="button" onClick={handleAdd} class="btn ml-1 btn-primary mt-1">Add</button>
                                                }

                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            <div class="monthly-charges">
                                <hr class="new-hr" />
                                <h4 class="text-center">Yearly Charges</h4>
                                <hr class="new-hr" />
                                <small className="text-center">Yearly Charges will be added according to the Month defined</small>

                                {inputListYear.map((item, i) => {
                                    return (
                                        <div key={i} class="row mb-2">
                                            <div class="col-3">
                                                <select class="inline select" id="select-class" name="month" value={item.month} onChange={(e) => handleChangeY(e, i)}>
                                                    <option selected disabled="disabled" value="" >Month</option>
                                                    <option>Jan</option>
                                                    <option>Feb</option>
                                                    <option>Mar</option>
                                                    <option>Apr</option>
                                                    <option>May</option>
                                                    <option>Jun</option>
                                                    <option>Jul</option>
                                                    <option>Aug</option>
                                                    <option>Sep</option>
                                                    <option>Oct</option>
                                                    <option>Nov</option>
                                                    <option>Dec</option>
                                                </select>


                                            </div>
                                            <div class="col-3">
                                                <input type="text" name="description" value={item.description} onChange={e => handleChangeY(e, i)} placeholder="Description" class="inline select" />
                                            </div>
                                            <div class="col-3">
                                                <input type="text" name="charges" value={item.charges} onChange={e => handleChangeY(e, i)} placeholder="Charges" class="inline select" />

                                            </div>
                                            <div class="col-1">
                                                {inputListYear.length !== 1 &&
                                                    <button type="button" onClick={removeFieldY} class="btn btn-primary mt-1">Remove</button>
                                                }

                                            </div>
                                            <div class="col-2">
                                                {inputListYear.length - 1 === i &&
                                                    <button type="button" onClick={handleAddY} class="btn ml-1 btn-primary mt-1">Add</button>
                                                }
                                            </div>
                                        </div>)

                                })}
                            </div>
                            <div class="text-center mt-4">  <button onClick={sendCharges} class="btn btn-generate btn-success">Add</button></div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Fee;

























