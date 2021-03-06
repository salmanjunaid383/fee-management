import { React, useEffect, useState } from 'react';
import './dashboard.css';
import { Link } from 'react-router-dom';
import UpdateIcon from '@material-ui/icons/Update';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'react-bootstrap';
import TextField from '@material-ui/core/TextField';
import logo from './jb1.png'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';



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


const StudentLedger = () => {
    useEffect(() => {
        axios.get(`http://fee-management-api.nastechltd.co/api/student_ledger`)
            .then(response => {
                console.log(response.data)
            })
            .catch(error => console.log(error))

    }, [])
    // const [show, setShow] = useState(false);
    // const [expensedata, setExpensedata] = useState([]);
    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
    // const classes = useStyles();
    // const [studentdata, setStudentdata] = useState([]);
    // const [studentname, setStudentname] = useState();
    // const [studentid, setStudentid] = useState('');
    // const [charges, setCharges] = useState();
    // const [description, setDescription] = useState();

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


                            <Link class="nav-link" to="/ledger"><div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas fa-wallet active"></i>
                                </div>
                                <div class="icon-name active">Student Ledger</div>
                            </div></Link>
                            <Link class="nav-link" to="/feevoucher"><div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas fa-wallet"></i>
                                </div>
                                <div class="icon-name">Fee Voucher</div>
                            </div></Link>


                        </div>
                    </div>
                </div>
                <div class="right-side">
                    <div class="right-header">
                        <div class="top-bar">
                            <div class="top-bar-justify">
                                <div class="big-inbox">
                                    Student Ledger
                        </div>
                            </div>
                        </div>
                        <hr class="new-hr" />
                    </div>
                    <div class="right-body">

                        <div class="message">

                            <div class="table-responsive">
                                <table class="table no-wrap">
                                    <thead>
                                        <tr>
                                            <th class="border-top-0">#</th>
                                            <th class="border-top-0">NAME</th>
                                            <th class="border-top-0">Description</th>
                                            <th class="border-top-0">Charges</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* {expensedata.map((val, i) => {
                                            return (
                                                <>
                                                    <tr key={i}>
                                                        <td>{val.id}</td>
                                                        <td class="txt-oflo">{val.name}</td>
                                                        <td>{val.description}</td>
                                                        <td>{val.charges}</td>
                                                        <td>
                                                            {val.paid == 1 ?
                                                                <span class="text-primary text-bolder">Paid</span>
                                                                :
                                                                <span class="text-danger text-bolder">Unpaid</span>
                                                            }
                                                        </td>
                                                        <td>
                                                            <ButtonGroup disableElevation variant="contained" color="primary">
                                                                <Button className="expense-btn-p " onClick={() => sendpay(val.id)}><span class="text-white text-bolder mb-3">Pay</span></Button>
                                                            </ButtonGroup>
                                                        </td>
                                                    </tr>
                                                </>
                                            )
                                        })} */}
                                        <tr>
                                            <td>1</td>
                                            <td>Marium</td>
                                            <td>Van</td>
                                            <td>5000</td>
                                        </tr>
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
export default StudentLedger;













