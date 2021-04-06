import { React, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import logo from './jb1.png'
import './dashboard.css';
import Snackbar from '@material-ui/core/Snackbar';
// import LaunchIcon from '@material-ui/icons/Launch';
// import UpdateIcon from '@material-ui/icons/Update';
// import AddIcon from '@material-ui/icons/Add';
// import DeleteIcon from '@material-ui/icons/Delete';
// import Button from '@material-ui/core/Button';
// import ButtonGroup from '@material-ui/core/ButtonGroup';
// import { Modal } from 'react-bootstrap';
// import TextField from '@material-ui/core/TextField';

const Admissions = () => {
    const history = useHistory();
    const [isOppened, setIsOppened] = useState();
    const school_id = localStorage.getItem("school_id")
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
    useEffect(() => {
        axios.get(`http://fee-management-api.nastechltd.co/api/show_school/${school_id}`)
            .then(response => {
                console.log(response.data.is_oppend)
                setIsOppened(response.data.is_oppend)
            })
            .catch((error) => {
                if (error.response) {
                    setMessageinfo(error.response.data.message);
                    handleMessage();
                }
            })
    }, [])
    const openAdmission = () => {
        axios.put(`http://fee-management-api.nastechltd.co/api/admission_open/${school_id}`)
            .then(response => {
                console.log(response);
                axios.get(`http://fee-management-api.nastechltd.co/api/show_school/${school_id}`)
                    .then(response => {
                        console.log(response.data.is_oppend)
                        setIsOppened(response.data.is_oppend)
                    })
                    .catch((error) => {
                        if (error.response) {
                            setMessageinfo(error.response.data.message);
                            handleMessage();
                        }
                    })
            })
            .catch((error) => {
                if (error.response) {
                    setMessageinfo(error.response.data.message);
                    handleMessage();
                }
            })
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
                                    <i class="fas fa-school active"></i>
                                </div>
                                <div class="icon-name1 active">Admission</div>
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
                                    <i class="fas fa-money-check-alt"></i>
                                </div>
                                <div class="icon-name">Fee</div>
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
                                    Admissions
                                </div>
                                <button onClick={logOut} class="btn text-bolder text-right">Log Out</button>

                            </div>
                        </div>
                        <hr class="new-hr" />
                    </div>
                    <div class="right-body">
                        <div class="message">
                            <div className="row">

                                <div className="col-12 text-right">
                                    {isOppened == 0 ?
                                        <>
                                            <p className="m-0 mr-2 pb-2 d-inline-block text-primary text-bold">Are You Sure You Want To Open Admissions?</p>
                                            <button type="button" onClick={openAdmission} class="btn btn-success mt-1 mb-3 d-inline-block"><i class="fas text-white mr-1 fa-check"></i>Open Admission</button>
                                        </>
                                        :
                                        <>
                                            <p className="m-0 mr-2 pb-2 d-inline-block text-primary text-bold">Are You Sure You Want To Close Admissions?</p>
                                            <button type="button" onClick={openAdmission} class="btn btn-danger mb-3 d-inline-block mt-1"><i class="fas fa-times text-white mr-1"></i>Close Admission</button>
                                        </>
                                    }

                                </div>
                            </div>
                            <div className="show_fee">
                                <div class="card p-2" style={{ width: '18rem' }}>
                                    <div class="card-body w-100 p-0">
                                        <div className="text-center mb-2"><i class="fas fa-7x fa-file-alt"></i></div>
                                        <button type="button" onClick={() => history.push("/schoolundertaking")} class="btn mb-0 mt-0 w-100 btn-primary btn-lg">Undertaking</button>

                                    </div>
                                </div>
                                <div class="card p-2" style={{ width: '18rem' }}>
                                    <div class="card-body w-100 p-0">
                                        <div className="text-center mb-2"><i class="fas fa-7x fa-user-plus"></i></div>
                                        <button type="button" onClick={() => history.push("/admissionrequest")} class="btn my-0 w-100 btn-primary btn-lg">Pending Admissions</button>

                                    </div>
                                </div>
                            </div>
                            <div className="show_fee">
                                <div class="card p-2" style={{ width: '18rem' }}>
                                    <div class="card-body w-100 p-0">
                                        <div className="text-center mb-2"><i class="fas fa-7x fa-folder-plus"></i></div>
                                        <button type="button" onClick={() => history.push("/admissionrequest")} class="btn my-0 w-100 btn-primary btn-lg">Documents</button>

                                    </div>
                                </div>
                                <div class="card p-2" style={{ width: '18rem' }}>
                                    <div class="card-body w-100 p-0">
                                        <div className="text-center mb-2"><i class="fas fa-7x fa-file-invoice-dollar"></i></div>
                                        <button type="button" onClick={() => history.push("/admission")} class="btn my-0 w-100 btn-primary btn-lg">Admission Charges</button>

                                    </div>
                                </div>

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
        </>
    );
};
export default Admissions;











