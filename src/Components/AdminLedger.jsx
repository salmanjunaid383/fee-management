import React, { useState, useEffect } from 'react';
import './dashboard.css';
import { Link, useHistory } from 'react-router-dom';
import LaunchIcon from '@material-ui/icons/Launch';
import Button from '@material-ui/core/Button';
import logo from './jb1.png'
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
// import PrintIcon from '@material-ui/icons/Print';
// import UpdateIcon from '@material-ui/icons/Update';
// import AddIcon from '@material-ui/icons/Add';
// import DeleteIcon from '@material-ui/icons/Delete';
// import ButtonGroup from '@material-ui/core/ButtonGroup';
// import DescriptionIcon from '@material-ui/icons/Description';
// import { Modal } from 'react-bootstrap';
// import FormLabel from '@material-ui/core/FormLabel';



import { makeStyles } from '@material-ui/core/styles';
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


const AdminLedger = () => {
    const classes = useStyles();
    const [studentdata, setStudentdata] = useState([]);
    const history = useHistory();
    const school_id = localStorage.getItem("school_id")
    const [searchTerm, setSearchTerm] = React.useState('');
    const [sectiondata, setSectiondata] = useState([]);
    const [classdata, setClassdata] = useState([]);
    const [classid, setClassid] = useState('');
    const [sectionid, setSectionid] = useState('');
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
        axios.get(`http://fee-management-api.nastechltd.co/api/student/${school_id}`)
            .then(response => {
                console.log(response);
                setStudentdata(response.data);
            })
            .catch((error) => {
                if (error.response) {
                    setMessageinfo(error.response.data.message);
                    handleMessage();
                }
            })
        axios.get(`http://fee-management-api.nastechltd.co/api/schools_class/${school_id}`)
            .then(response => {
                console.log(response.data)
                setClassdata(response.data)
            })
            .catch((error) => {
                if (error.response) {
                    setMessageinfo(error.response.data.message);
                    handleMessage();
                }
            }).catch((error) => {
                if (error.response) {
                    setMessageinfo(error.response.data.message);
                    handleMessage();
                }
            })

    }, [])








    // const reload = () => {
    //     axios.get(`http://fee-management-api.nastechltd.co/api/student/${school_id}`)
    //         .then(response => {
    //             console.log(response);
    //             setStudentdata(response.data);
    //         })
    //         .catch((error) => {
    //             if (error.response) {
    // setMessageinfo(error.response.data.message);
    //  handleMessage();               
    //             }
    //         })
    // }


    const search = () => {
        axios.get(`http://fee-management-api.nastechltd.co/api/section/${classid}`)
            .then(response => {
                console.log(response.data)
                setSectiondata(response.data)
            })
            .catch((error) => {
                if (error.response) {
                    setMessageinfo(error.response.data.message);
                    handleMessage();
                }
            })
    }
    // console.log(studentdata[0].section_id)



    const reset = () => {
        setClassid('');
        setSearchTerm('');
        setSectionid('');
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
                                    alt="Logo" src={"http://fee-management-api.nastechltd.co/api/school_profile/"+localStorage.getItem("school_id")} />
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
                                    <i class="fas fa-calculator-alt active"></i>
                                </div>
                                <div class="icon-name active">Student Ledger</div>
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

                            <Link class="nav-link" to="/MainReportPage">
                <div class="folder-icons">
                  <div class="icon1">
                    <i class="fas fa-receipt"></i>
                  </div>
                     <div class="icon-name">Reports</div>
                </div>
              </Link>

              <Link class="nav-link" to="/Voucher-List">
                <div class="folder-icons">
                  <div class="icon1">
                    <i class="fas fa-file-alt"></i>
                  </div>
                  <div class="icon-name">Paid Vouchers</div>
                </div>
              </Link>

              <Link class="nav-link" to="/AdminAttendance">
                <div class="folder-icons">
                  <div class="icon1">
                    <i class="fas fa-file-alt"></i>
                  </div>
                  <div class="icon-name">Attendance</div>
                </div>
              </Link>

              <Link class="nav-link" to="/Inventory">
                <div class="folder-icons">
                  <div class="icon1">
                    <i class="fas fa-file-alt"></i>
                  </div>
                  <div class="icon-name">Inventory</div>
                </div>
              </Link>

              <Link class="nav-link" to="/Asset-Tracking">
                <div class="folder-icons">
                  <div class="icon1">
                    <i class="fas fa-file-alt"></i>
                  </div>
                  <div class="icon-name">School Assets</div>
                </div>
              </Link>



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
                                <button onClick={logOut} class="btn text-bolder text-right">Log Out</button>

                            </div>
                        </div>
                        <hr class="new-hr" />
                    </div>
                    <div class="right-body">

                          {/* back to dashboard option*/}
                    <a href="/campusdashboard" style={{textDecoration:"none"}}>
                                <div className="col-xl-2 dash-button" style={{marginBottom:"10px",display:"flex",alignItems:"flex-end",justifyContent:"center",padding:"6px",color:"#fff", borderRadius:"5px",cursor:"pointer"}}>
                                   
                                <i class="fas fa-tachometer-alt" style={{fontSize:"25px"}}></i>
                                <h5 style={{margin:"0px",marginLeft:"10px", fontSize:"15px", fontWeight:"bold"}}>Dashboard</h5>
                                </div>
                                </a>

                        <div class="message"><div className="row">
                            <div className="col-6 text-left mt-1">
                                <TextField className="pb-3 bg-white" value={searchTerm} type="text" helperText="By GR.No or Name" onChange={(e) => setSearchTerm(e.target.value)} label="Search Student" />
                                <button onClick={reset} className="btn btn-primary mt-3 ml-5">Reset</button>

                            </div>
                            <div className="col-6 text-right">
                                <FormControl className={classes.formControl}>
                                    <InputLabel id="demo-simple-select-label">Class</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={classid}
                                        onChange={(e) => setClassid(e.target.value)}
                                    >
                                        {classdata.map((val, i) => {
                                            return (
                                                <MenuItem value={val.id}>{`${val.name}`}</MenuItem>
                                            )

                                        })}
                                    </Select>
                                </FormControl>
                                <button onClick={search} className="btn btn-primary mt-3 ml-1">Search</button>
                                {/* <FormControl className={classes.formControl}>
                                    <InputLabel id="demo-simple-select-label">Section</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={sectionid}
                                        onChange={(e) => setSectionid((e.target.value).toString())}
                                    >
                                        {sectiondata.map((val, i) => {
                                            return (
                                                <MenuItem value={val.id}>{`${val.name}`}</MenuItem>
                                            )

                                        })}
                                    </Select>
                                </FormControl> */}

                            </div>

                        </div>
                            <div class="table-responsive">
                                <table class="table no-wrap">
                                    <thead>
                                        <tr>
                                            <th class="border-top-0">G.R No</th>
                                            <th class="border-top-0">Name</th>
                                            <th class="border-top-0">Gender</th>
                                            {/* <th class="border-top-0">Details</th> */}
                                            <th class="border-top-0">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {studentdata.filter((val) => {
                                            if (searchTerm == '') {
                                                return val;
                                            }
                                            else if (val.section_id.toString().includes(searchTerm)) {
                                                return val;
                                            }
                                            else if (val.G_R_NO.toLowerCase().includes(searchTerm.toLowerCase())) {
                                                return val;
                                            }
                                            else if (`${val.first_name} ${val.middle_name} ${val.last_name}`.toLowerCase().includes(searchTerm.toLowerCase())) {
                                                return val;
                                            }
                                        }).filter((val) => {
                                            if (sectionid == '') {
                                                return val;
                                            }
                                            else if (val.section_id.toString().includes(sectionid)) {
                                                return val;
                                            }
                                        }).map((val, i) => {
                                            return (
                                                <tr key={i}>
                                                    <td>{val.G_R_NO}</td>
                                                    {val.middle_name === null ?
                                                        <td class="txt-oflo print-capitalize">{`${val.first_name} ${val.last_name}`}</td>
                                                        :
                                                        <td class="txt-oflo print-capitalize">{`${val.first_name} ${val.middle_name} ${val.last_name}`}</td>
                                                    }
                                                    <td className="print-capitalize">{val.gender}</td>
                                                    {/* <td><Button onClick={() => history.push(`/student1/${val.id}`)}><DescriptionIcon /></Button></td> */}


                                                    <td><Button onClick={() => history.push(`/ledger/${val.id}`)}><LaunchIcon /></Button></td>


                                                </tr>
                                            )
                                        })}
                                        {/* {searchResults.map(item => (
                                            <li>{item}</li>
                                        ))} */}
                                    </tbody>
                                </table>
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
export default AdminLedger;


