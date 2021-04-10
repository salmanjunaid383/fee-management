import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Modal } from 'react-bootstrap';
import axios from 'axios';
import UpdateIcon from '@material-ui/icons/Update';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import logo from '../jb1.png';


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '35ch',
        },
    },
}));

const EmployeeFeeComponents = () => {
    const classes = useStyles();
    const school_id = localStorage.getItem("school_id")
    const history = useHistory();

    // console.log(billingperiod)



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
                            <Link to="/employeedashboard" class="nav-link "><div class="folder-icons ">
                                <div class="icon1">
                                    <i class="fas fa-columns"></i>
                                </div>
                                <div class="icon-name1">Dashboard</div>
                            </div></Link>

                            <Link class="nav-link" to="/employeefeecomponents"><div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas fa-money-check-alt active"></i>
                                </div>
                                <div class="icon-name active">Fee</div>
                            </div></Link>
                            <Link class="nav-link" to="/employeefeevoucheradmin"><div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas fa-print"></i>
                                </div>
                                <div class="icon-name">Fee Voucher</div>
                            </div></Link>
                            <Link class="nav-link" to="/employeeadminledger"><div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas fa-calculator-alt"></i>
                                </div>
                                <div class="icon-name">Student Ledger</div>
                            </div></Link>
                            <Link class="nav-link" to="/employeeexpense"><div class="folder-icons">
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
                                    Fee
                        </div>
                                <button onClick={logOut} class="btn text-bolder text-right">Log Out</button>

                            </div>
                        </div>
                        <hr class="new-hr" />
                    </div>
                    <div class="right-body">
                        <div class="message">
                            <div className="show_fee">
                                <div class="card p-2" style={{ width: '18rem' }}>
                                    <div class="card-body w-100 p-0">
                                        <div className="text-center mb-2"><i class="txt-icon fas fa-7x fa-calendar-times"></i></div>
                                        <button type="button" onClick={() => history.push("/employeeperiod")} class="btn mb-0 mt-0 w-100 btn-primary btn-lg">Fee Period</button>

                                    </div>
                                </div>
                                <div class="card p-2" style={{ width: '18rem' }}>
                                    <div class="card-body w-100 p-0">
                                        <div className="text-center mb-2"><i class="txt-icon fas fa-7x fa-money-check-alt"></i></div>
                                        <button type="button" onClick={() => history.push("/employeestructure")} class="btn my-0 w-100 btn-primary btn-lg">Fee Structure</button>

                                    </div>
                                </div>
                                <div class="card p-2" style={{ width: '18rem' }}>
                                    <div class="card-body w-100 p-0">
                                        <div className="text-center mb-2"><i class="txt-icon fas fa-7x fa-user-tag"></i></div>
                                        <button type="button" onClick={() => history.push("/employeediscount")} class="btn mb-0 mt-0 w-100 btn-primary btn-lg">Discount</button>

                                    </div>
                                </div>
                                <div class="card p-2" style={{ width: '18rem' }}>
                                    <div class="card-body w-100 p-0">
                                        <div className="text-center mb-2"><i class="txt-icon fas fa-7x fa-user-slash"></i></div>
                                        <button type="button" onClick={() => history.push("/employeedefaulter")} class="btn my-0 w-100 btn-primary btn-lg">Defaulters</button>

                                    </div>
                                </div>
                                <div class="card p-2" style={{ width: '18rem' }}>
                                    <div class="card-body w-100 p-0">
                                        <div className="text-center mb-2"><i class="txt-icon fas fa-7x fa-file-invoice-dollar"></i></div>
                                        <button type="button" onClick={() => history.push("/employeecustomvoucher")} class="btn my-0 w-100 btn-primary btn-lg">Custom Feevoucher</button>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default EmployeeFeeComponents;