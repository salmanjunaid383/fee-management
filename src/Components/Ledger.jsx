import { React, useEffect, useState } from 'react';
import './dashboard.css';
import { Link, useHistory } from 'react-router-dom';
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


const Ledger = () => {
    const history = useHistory();
    const [studentledger, setStudentledger] = useState([]);
    const [name, setName]= useState();
    useEffect(() => {
        const student_id = localStorage.getItem("student_id");
        axios.get(`http://fee-management-api.nastechltd.co/api/user/${student_id}`)
            .then(response => {
                // console.log(response.data)
                setName(`${response.data.first_name} ${response.data.last_name}`);
            })
            .catch(error => console.log(error))

        axios.get(`http://fee-management-api.nastechltd.co/api/student_ledger/${student_id}`)
            .then(response => {
                console.log(response.data)
                setStudentledger(response.data);
            })
            .catch(error => console.log(error))

    }, [])
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


                            <Link class="nav-link" to="/ledger"><div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas fa-wallet active"></i>
                                </div>
                                <div class="icon-name active">Student Ledger</div>
                            </div></Link>
                            


                        </div>
                    </div>
                </div>
                <div class="right-side">
                    <div class="right-header">
                        <div class="top-bar">
                            <div class="top-bar-justify">
                                <div class="big-inbox">
                                    {`${name}'s `} Ledger
                                </div>
                                    <button onClick={logOut} class="btn text-bolder text-right">Log Out</button>
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
                                            <th class="border-top-0">Term</th>
                                            <th class="border-top-0">Description</th>
                                            <th class="border-top-0">Date</th>
                                            <th class="border-top-0">Debit</th>
                                            <th class="border-top-0">Credit</th>
                                            <th class="border-top-0">Balance</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {studentledger.map((val, i) => {
                                            return (
                                                <>
                                                    <tr key={i}>
                                                        <td>{val.term}</td>
                                                        <td class="txt-oflo">{val.description}</td>
                                                        <td>{val.date}</td>
                                                        {
                                                            val.debit == 0 ?
                                                                <td></td> :

                                                                <td>{val.debit}</td>
                                                        }
                                                        {
                                                            val.credit == 0 ?
                                                                <td></td> :

                                                                <td>{val.credit}</td>
                                                        }
                                                        <td>{val.balance}</td>

                                                    </tr>
                                                </>
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
export default Ledger;













