import { React, useEffect, useState } from 'react';
import './dashboard.css';
import { Link, useHistory, useParams } from 'react-router-dom';
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
import Snackbar from '@material-ui/core/Snackbar';
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


const StudentPassword = () => {
    const history = useHistory();
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmpassword] = useState('');
    const { studentid } = useParams();
    const [messageinfo, setMessageinfo] = useState('');
    const [message, setMessage] = useState({
        open: false,
        vertical: 'top',
        horizontal: 'right',
    });
    const { vertical, horizontal, open } = message;
    const handleMessage = () => {
        setMessage({ open: true, vertical: 'top', horizontal: 'right' });
    };
    const CloseMessage = () => {
        setMessage({ ...message, open: false });
    };
    const changePassword = () => {
        if (password === '') {
            setMessageinfo("Enter New Password")
            handleMessage();
        }
        else {
            if (password === confirmpassword) {
                axios.put(`http://fee-management-api.nastechltd.co/api/password/${studentid}`, { password: password })
                    .then(response => {
                        console.log(response)
                        setPassword('')
                        setConfirmpassword('');
                        history.push(`/ledger/${studentid}`)
                        // reload();
                        // remove1();
                    })
                    .catch((error) => {
                        if (error.response) {
                            setMessageinfo(error.response.data.message);
                            handleMessage();
                        }
                    })
            }
            else {
                setMessageinfo("Password Does not Match")
                handleMessage();
            }
        }

    }
    const logOut = () => {
        localStorage.clear();
        history.push("/")
    }
    // const [show, setShow] = useState(false);
    // const [expensedata, setExpensedata] = useState([]);
    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
    // const classes = useStyles();
    // const [studentdata, setStudentdata] = useState([]);
    // const [studentname, setStudentname] = useState();
    // const [studentid, setStudentid] = useState('')response.data.first_name;
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


                            <Link class="nav-link" to={`/studentledger/${studentid}`}><div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas fa-calculator-alt"></i>
                                </div>
                                <div class="icon-name">Student Ledger</div>
                            </div></Link>
                            <Link class="nav-link" to={`/feevoucher/${studentid}`}><div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas fa-print"></i>
                                </div>
                                <div class="icon-name">Fee Voucher</div>
                            </div></Link>
                            <Link class="nav-link" to={`/studentpassword/${studentid}`}><div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas active fa-key"></i>
                                </div>
                                <div class="icon-name active">Change Password</div>
                            </div></Link>


                        </div>
                    </div>
                </div>
                <div class="right-side">
                    <div class="right-header">
                        <div class="top-bar">
                            <div class="top-bar-justify">
                                <div class="big-inbox">
                                    Change Password
                                </div>
                                <button onClick={logOut} class="btn text-bolder text-right">Log Out</button>
                            </div>
                        </div>
                        <hr class="new-hr" />
                    </div>
                    <div class="right-body">

                        <div class="message">
                            <div className="row billing-main">
                                <div className="col-8 billing-box">
                                    <TextField className="pb-3 bg-white" type="password" onChange={(e) => setPassword(e.target.value)} label="Password" variant="filled" />
                                    <TextField className="pb-3" type="password" onChange={(e) => setConfirmpassword(e.target.value)} label="Confirm Password" variant="filled" />

                                </div>
                                <div className="col-12 text-center py-3">
                                    <button onClick={changePassword} className="btn btn-primary">Change Password</button>
                                </div>
                            </div>
                        </div>
                        <Snackbar
                            anchorOrigin={{ vertical, horizontal }}
                            open={open}
                            autoHideDuration={4000}
                            onClose={CloseMessage}
                            message={messageinfo}
                            key={vertical + horizontal}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};
export default StudentPassword;













