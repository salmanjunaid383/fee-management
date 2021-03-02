import { React, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import logo from './jb1.png'
import LaunchIcon from '@material-ui/icons/Launch';
import './dashboard.css';
import UpdateIcon from '@material-ui/icons/Update';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { Modal } from 'react-bootstrap';
import TextField from '@material-ui/core/TextField';

const MySection = () => {
    const [schoolClass, setSchoolClass] = useState();
    const [section, setSection] = useState();
    const [classdata, setClassdata] = useState([]);
    const [sectiondata, setSectiondata] = useState([]);
    const history = useHistory();
    const class_id = localStorage.getItem("class_id")


    useEffect(() => {
        axios.get(`http://fee-management-api.nastechltd.co/api/section`)
            .then(response => {
                console.log(response.data)
                setClassdata(response.data)
            })
            .catch(error => console.log(error))
    }, [])

    useEffect(() => {
        axios.get(`http://fee-management-api.nastechltd.co/api/section/${class_id}`)
            .then(response => {
                console.log(response.data)
                setSectiondata(response.data)

                // console.log(sectiondata)
                // console.log('classdata')
            })
            .catch(error => console.log(error))
    }, [])




    const reload = () => {
        axios.get(`http://fee-management-api.nastechltd.co/api/section/${class_id}`)
            .then(response => {
                console.log(response.data)
                setSectiondata(response.data)
            })
            .catch(error => console.log(error))

    }
    const deleteSchool = (id) => {
        axios.delete(`http://fee-management-api.nastechltd.co/api/section/${id}`)
            .then(response => {
                console.log(response)
                reload();
            })
            .catch(error => {
                console.log(error)
                alert("First Delete Students Of This Class")
            })

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
                            <Link to="/dashboard" class="nav-link "><div class="folder-icons ">
                                <div class="icon1">
                                    <i class="fas  fa-columns"></i>
                                </div>
                                <div class="icon-name1 ">Dashboard</div>
                            </div></Link>
                            <Link class="nav-link" to="/class"><div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas fa-user-graduate"></i>
                                </div>
                                <div class="icon-name">Class</div>
                            </div></Link>
                            <Link class="nav-link" to="/section"><div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas fa-user-graduate active"></i>
                                </div>
                                <div class="icon-name active">Section</div>
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
                                    <i class="fas fa-wallet"></i>
                                </div>
                                <div class="icon-name">Term</div>
                            </div></Link>
                            <Link class="nav-link" to="/expense"><div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas fa-wallet"></i>
                                </div>
                                <div class="icon-name">Expense Tracking</div>
                            </div></Link>
                            <Link class="nav-link" to="/ledger"><div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas fa-wallet"></i>
                                </div>
                                <div class="icon-name">Student Ledger</div>
                            </div></Link>
                        </div>
                    </div>
                </div>
                <div class="right-side">
                    <div class="right-header">
                        <div class="top-bar">
                            <div class="top-bar-justify">
                                <div class="big-inbox">Sections</div>
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
                                            <th class="border-top-0">Class</th>
                                            <th class="border-top-0">Section</th>
                                            <th class="border-top-0">Created At</th>
                                            <th class="border-top-0">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sectiondata.map((val, i) => {
                                            return (
                                                <>
                                                    <tr key={i}>
                                                        <td>{i + 1}</td>
                                                        <td class="txt-oflo">{val.class_name}</td>
                                                        <td>{val.name}</td>
                                                        <td>{val.created_at.slice(0, 10)}</td>
                                                        <td>
                                                            <ButtonGroup disableElevation variant="contained" color="primary">
                                                                <Button className="student-btn-up" onClick={() => history.push(`/classupdate/${val.id}`)}  ><UpdateIcon className="text-white" /></Button>
                                                                <Button className="student-btn-del" onClick={() => deleteSchool(val.id)} ><DeleteIcon className="text-white" /></Button>
                                                            </ButtonGroup>
                                                        </td>
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
export default MySection;











