import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import logo from './jb1.png'
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import UpdateIcon from '@material-ui/icons/Update';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { Modal } from 'react-bootstrap';
import MultiSelect from "react-multi-select-component";
import Snackbar from '@material-ui/core/Snackbar';




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
    navigation: {
        marginTop: theme.spacing(2)
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const Discounted = () => {
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
    const classes = useStyles();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [show1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);
    const [studentdata, setStudentdata] = useState([]);
    const [sectiondata, setSectiondata] = useState([]);
    const [classdata, setClassdata] = useState([]);
    const [sectionid, setSectionid] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [classid, setClassid] = useState('');
    const [discounteddata, setDiscounteddata] = useState([]);
    const [selected, setSelected] = useState([]);
    const [discount, setDiscount] = useState('');
    const [discountType, setDiscountType] = useState('');
    const [prevdata, setPrevdata] = useState('');
    const school_id = localStorage.getItem("school_id");
    const history = useHistory();
    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);
    const handleClick = (id) => {
        localStorage.setItem("user_id", id)
        handleShow2();
    }
    const remove = () => {
        localStorage.removeItem("user_id")
        handleClose2();
    }
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
                    handleMessage();
                    setMessageinfo(error.response.data.message);
                }
            })

    }, [])
    useEffect(() => {
        axios.get(`http://fee-management-api.nastechltd.co/api/show_discount/${school_id}`)
            .then(response => {
                console.log(response);
                setDiscounteddata(response.data);
            })
            .catch((error) => {
                if (error.response) {
                    setMessageinfo(error.response.data.message);
                    handleMessage();
                }
            })

    }, [])

    const reload = () => {
        axios.get(`http://fee-management-api.nastechltd.co/api/show_discount/${school_id}`)
            .then(response => {
                console.log(response);
                setDiscounteddata(response.data);
            })
            .catch((error) => {
                if (error.response) {
                    setMessageinfo(error.response.data.message);
                    handleMessage();
                }
            })
    }
    console.log(discountType)
    const search = () => {
        axios.get(`http://fee-management-api.nastechltd.co/api/section/${classid}`)
            .then(response => {
                console.log(response.data)
                setSectiondata(response.data)
            })
            .catch(error => console.log(error))
    }
    const reset = () => {
        setClassid('');
        // setSearchTerm('');
        setSectionid('');
    }


    const options = studentdata.filter((val) => {
        if (sectionid == '') {
            return val;
        }
        else if (val.section_id.toString().includes(sectionid)) {
            return val;
        }
    }).map(val => (
        val.middle_name === null ?
            {
                label: `${val.first_name} ${val.last_name}`, value: val.id

            }
            :
            {
                label: `${val.first_name} ${val.middle_name} ${val.last_name}`, value: val.id

            }
    ))
    const data = {
        students: selected,
        discount: discount,
        school_id: school_id,
        discount_type: discountType

    }

    const sendData = () => {
        if (discount < 0) {
            handleMessage();
            setMessageinfo("Discount Can't be Negative")
        }
        else if (discount == '') {
            handleMessage();
            setMessageinfo("Enter Discount")

        }
        else if (selected.length == 0) {
            handleMessage();
            setMessageinfo("Select Student(s)")

        }
        else if (discountType == '') {
            handleMessage();
            setMessageinfo("Enter Discount Type")

        }
        else {
            axios.post(`http://fee-management-api.nastechltd.co/api/discount`, data)
                .then(response => {
                    console.log(response);
                    setDiscount('');
                    setSelected([]);
                    setDiscountType('');
                    reload();
                    handleClose();
                })
                .catch(error => {
                    console.log(error);
                    handleMessage();
                    setMessageinfo("Enter Valid Field(s)")
                })
        }
    }

    const update = (id) => {
        axios.get(`http://fee-management-api.nastechltd.co/api/discount/${id}`)
            .then(response => {
                console.log(response.data);
                setPrevdata(response.data)
                setDiscountType(response.data.discount_type);
                setDiscount(response.data.discount)
                handleShow1();
            })
            .catch((error) => {
                if (error.response) {
                    setMessageinfo(error.response.data.message);
                    handleMessage();
                }
            })
    }

    const sendUpdated = () => {
        if (discount < 0) {
            handleMessage();
            setMessageinfo("Discount Can't be Negative")
        }
        else if (discount == '') {
            handleMessage();
            setMessageinfo("Enter Discount")

        }
        else if (discountType == '') {
            handleMessage();
            setMessageinfo("Enter Discount Type")

        }
        else {
            axios.put(`http://fee-management-api.nastechltd.co/api/discount/${prevdata.id}`, {
                student_id: prevdata.student_id,
                discount: discount,
                discount_type: discountType
            })
                .then(response => {
                    console.log(response);
                    setPrevdata('');
                    setDiscount('');
                    setDiscountType('');
                    reload();
                    handleClose1();

                })
                .catch((error) => {
                    if (error.response) {
                        setMessageinfo(error.response.data.message);
                        handleMessage();
                    }
                })
        }
    }
    const deleteDiscount = (id) => {
        axios.delete(`http://fee-management-api.nastechltd.co/api/discount/${localStorage.getItem("user_id")}`)
            .then(response => {
                console.log(response);
                remove();
                reload();
            })
            .catch((error) => {
                if (error.response) {
                    setMessageinfo(error.response.data.message);
                    handleMessage();
                }
            })
    }
    // ect(() => {
    //     axios.get(`http://fee-management-api.nastechltd.co/api/monthly_charges`)
    //         .then(response => {
    //             console.log(response.data)
    //             setChargesdata(response.data)

    //         })
    //         .catch(error => console.log(error))
    // }, [])
    // console.log(studentid)
    var count = 0;
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
                            <Link class="nav-link" to="/expense">
                <div class="folder-icons">
                  <div class="icon1">
                    <i class="fas fa-receipt"></i>
                  </div>
                  <div class="icon-name">Expense Tracking</div>
                </div>
              </Link>

              <Link class="nav-link" to="/MainReportPage">
                <div class="folder-icons">
                  <div class="icon1">
                    <i class="fas fa-file-medical-alt"></i>
                  </div>
                   <div class="icon-name">Reports</div>
                </div>
              </Link>

              <Link class="nav-link" to="/Voucher-List">
                <div class="folder-icons">
                  <div class="icon1">
                    <i class="fas fa-file"></i>
                  </div>
                  <div class="icon-name">Paid Vouchers</div>
                </div>
              </Link>

              <Link class="nav-link" to="/AdminAttendance">
                <div class="folder-icons">
                  <div class="icon1">
                    <i class="fas fa-user-graduate"></i>
                  </div>
                  <div class="icon-name">Attendance</div>
                </div>
              </Link>

              <Link class="nav-link" to="/Inventory">
                <div class="folder-icons">
                  <div class="icon1">
                    <i class="              fas fa-shuttle-van
"></i>
                  </div>
                  <div class="icon-name">Inventory</div>
                </div>
              </Link>

              <Link class="nav-link" to="/Asset-Tracking">
                <div class="folder-icons">
                  <div class="icon1">
                    <i class="fas fa-book-reader"></i>
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
                                    Discount
                        </div>
                                <button onClick={logOut} class="btn text-bolder text-right">Log Out</button>

                            </div>
                        </div>
                        <hr class="new-hr" />
                    </div>
                    <div class="right-body">
                        <div className={`${classes.navigation}`}>
                            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                                <Link className="text-decoration-none" color="inherit" to="/feecomponents">
                                    Fee
                                </Link>
                                <Typography color="textPrimary">Discount</Typography>
                            </Breadcrumbs>
                        </div>
                        <div class="message">
                            <div class="add-student">
                                <div className="col-12">
                                    <div className="float-start">
                                        <TextField className="pb-3 bg-white" value={searchTerm} type="text" helperText="Search by Name" onChange={(e) => setSearchTerm(e.target.value)} label="Search Student" />
                                        <button onClick={reset} className="btn btn-primary mt-3 ml-5 mr-5">Reset</button>
                                    </div>
                                    <button type="button" onClick={handleShow} class="btn btn-primary btn-lg float-end"><AddIcon /> Add Discount</button>
                                </div>
                                <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Add Discount</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <div class="row billing-main">
                                            <div className="col-12">
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
                                                <FormControl style={{display:"none"}} className={classes.formControl}>
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
                                                </FormControl>
                                                <button onClick={reset} className="btn btn-primary mt-3 ml-2">Reset</button>

                                            </div>
                                            <div className="col-8 text-center">
                                                <div class="form-check form-check-inline">
                                                    <input class="form-check-input" name="discountType" type="radio" id="oneTime" value="one_time" onChange={(e) => setDiscountType(e.target.value)} />
                                                    <label class="form-check-label" for="oneTime">One Time</label>
                                                </div>
                                                <div class="form-check form-check-inline">
                                                    <input class="form-check-input" name="discountType" type="radio" id="always" value="always" onChange={(e) => setDiscountType(e.target.value)} />
                                                    <label class="form-check-label" for="always">Always</label>
                                                </div>
                                            </div>
                                            <div class="col-8 billing-box">

                                                {/* <FormControl className={classes.formControl}>
                                                    <InputLabel id="demo-simple-select-label">Student</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        // value={id}
                                                        onChange={(e) => setStudentid(e.target.value)}
                                                    >
                                                        {studentdata.map((val, i) => {
                                                            return (
                                                                <MenuItem value={val.id}>{`${val.first_name} ${val.middle_name} ${val.last_name}`}</MenuItem>
                                                            )

                                                        })}
                                                    </Select>
                                                </FormControl> */}
                                                <TextField type="number" helperText="Discount Amount (Not In %)" onChange={(e) => setDiscount(e.target.value)} label="Discount" variant="filled" />
                                                <MultiSelect
                                                    className="mb-1"
                                                    options={options}
                                                    value={selected}
                                                    onChange={setSelected}
                                                    labelledBy={"Select"}
                                                />
                                                {/* <Select1 className="pb-3 searchSelect"  onChange={(e)=>setStudentid(e.target.value)} placeholder="Select Student" options={options} /> */}


                                            </div>
                                        </div>

                                    </Modal.Body>
                                    <Modal.Footer>
                                        <button class="btn btn-secondary" onClick={handleClose}>
                                            Close
                                            </button>
                                        <button onClick={sendData} className="btn btn-primary">Add</button>
                                    </Modal.Footer>
                                </Modal>
                                <Modal show={show1} onHide={handleClose1}>
                                    <Modal.Header closeButton>
                                        <Modal.Title className="text-center">Update Discount</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <div class="row billing-main">
                                            {prevdata.discount_type === 'one_time' ?
                                                <>
                                                    <div className="col-8 text-center">
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" name="inlineRadioOptions" checked id="inlineRadio1" onChange={(e) => setDiscountType(e.target.value)} value="one_time" />
                                                            <label class="form-check-label" for="inlineRadio1">One Time</label>
                                                        </div>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" onChange={(e) => setDiscountType(e.target.value)} value="always" />
                                                            <label class="form-check-label" for="inlineRadio2">Always</label>
                                                        </div>
                                                    </div>
                                                </>
                                                :
                                                <>
                                                    <div className="col-8 text-center">
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" onChange={(e) => setDiscountType(e.target.value)} value="one_time" />
                                                            <label class="form-check-label" for="inlineRadio1">One Time</label>
                                                        </div>
                                                        <div class="form-check form-check-inline">
                                                            <input class="form-check-input" type="radio" name="inlineRadioOptions" checked id="inlineRadio2" onChange={(e) => setDiscountType(e.target.value)} value="always" />
                                                            <label class="form-check-label" for="inlineRadio2">Always</label>
                                                        </div>
                                                    </div>
                                                </>
                                            }

                                            <div className="col-8 text-center">
                                                <TextField type="number" helperText="Discount Amount" defaultValue={prevdata.discount} onChange={(e) => setDiscount(e.target.value)} label="Discount" variant="filled" />

                                            </div>
                                        </div>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <button class="btn btn-secondary" onClick={handleClose1}>
                                            Close
                                        </button>
                                        <button onClick={sendUpdated} className="btn btn-primary">Update</button>
                                    </Modal.Footer>
                                </Modal>
                                <Modal show={show2} onHide={remove}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Confirmation</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <div className="row">
                                            <div className="col-12">
                                                <h2 className="text-center">Are You Sure You Want To Delete?</h2>
                                            </div>
                                        </div>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <button class="btn btn-secondary" onClick={remove}>
                                            Close
                                            </button>
                                        <button onClick={deleteDiscount} className="btn btn-primary">Yes</button>
                                    </Modal.Footer>
                                </Modal>
                            </div>
                            <div class="table-responsive">
                                <table class="table no-wrap">
                                    <thead>
                                        <tr>
                                            <th class="border-top-0">#</th>
                                            <th class="border-top-0">Name</th>
                                            <th class="border-top-0">Amount</th>
                                            <th class="border-top-0">Created At</th>
                                            <th class="border-top-0">Type</th>
                                            <th class="border-top-0">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {discounteddata.filter((val) => {
                                            if (searchTerm === '') {
                                                return val;
                                            }
                                            else if (`${val.name}`.toLowerCase().includes(searchTerm.toLowerCase())) {
                                                return val;
                                            }
                                        }).map((val, i) => {
                                            return (
                                                <>
                                                    <tr key={i}>
                                                        <td>{count = 1 + count}</td>
                                                        <td class="txt-oflo print-capitalize">{val.name}</td>

                                                        <td>{val.discount}</td>

                                                        <td>{val.created_at.slice(0, 10)}</td>
                                                        <td style={{textTransform:"capitalize"}}>{val.discount_type}</td>
                                                        <td>
                                                            <ButtonGroup disableElevation variant="contained" color="primary">
                                                                <Button className="student-btn-up" onClick={() => update(val.id)}  ><UpdateIcon className="text-white" /></Button>
                                                                <Button className="student-btn-del" onClick={() => handleClick(val.id)} ><DeleteIcon className="text-white" /></Button>
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
export default Discounted;