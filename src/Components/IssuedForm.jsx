import React, { useState, useEffect } from "react";
import { useHistory, Link, useParams } from "react-router-dom";
import "../Components/issueform.css";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { withStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";
import Snackbar from '@material-ui/core/Snackbar';
// import Placeholder from "react-select/src/components/Placeholder";

const GreenRadio = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

// Radio button
const IssuedForm = () => {

  


  const [selectedValue, setSelectedValue] = React.useState("a");

  const genderChange = (event) => {
    setSelectedValue(event.target.value);
  };
  // radio button

  const [opened, setOpened] = React.useState(false);
  const history = useHistory();
  const handleClickOpen = () => {
    setOpened(true);
  };

  const handleClose = () => {
    setOpened(false);
  };
  const [value, setValue] = React.useState("female");
  const nicChange = (event) => {
    setValue(event.target.value);
  };

  const [registration, setRegistration] = useState(0);
  const issued_form_id = localStorage.getItem("issued_form_id")

  const [notify,setNotify] = useState('Submit')
 
  function postFrom() {
   
   
    if (issued_form_id == null) {
      if (studentname == "") {
        setMessageinfo("Enter First Name");
        handleMessage();
       
      }
      else if (studentlastname == "") {
        setMessageinfo("Enter Last Name");
        handleMessage();
      } 
      else if (fathername == "") {
        setMessageinfo("Enter Father Name");
        handleMessage();
      }
       
      else if (cellno1 == "") {
        setMessageinfo("Enter cell No 1");
        handleMessage();
      } 
     
      
      else if (cellno2 == "") {
        setMessageinfo("Enter cell No 2");
        handleMessage();
      }
      else if (dob == "") {
        setMessageinfo("Enter Date of Birth");
        handleMessage();
      } 
      else if (pob == "") {
        setMessageinfo("Enter Place of Birth");
        handleMessage();
      } 
      else if (studentemail == "") {
        setMessageinfo("Enter Student Email");
        handleMessage();
      } 
      else if (mother == "") {
        setMessageinfo("Enter Mother Email");
        handleMessage();
      } 
      else if (fatheremail == "") {
        setMessageinfo("father Email");
        handleMessage();
      }
      
    
      
      else if (cnicValue == "") {
        setMessageinfo("Please pick CNIC or NICOP");
        handleMessage();
      } 
      else if (fathercnic == "") {
        setMessageinfo("Enter Valid Cnic.");
        handleMessage();
        
      }
     
      else{
        setNotify('Please Wait...')
        axios
        .post(`http://fee-management-api.nastechltd.co/api/form_issue`, data)
        .then((response) => {
          console.log("response: ", response);
          // setRegistration(response.data.form.registration_no)
          setRegistration(response.data.form.registration_no);
          localStorage.setItem("issued_form_id",response.data.form.id)
          alert(
            `Please note down your form number: ${response.data.form.registration_no}`
          );
          setNotify('Submited')
          localStorage.setItem("reg_no", response.data.form.registration_no);
          formbuttonchange();
        })
        .catch((error) => {
          console.log(error);
          alert(error.message);
        });

      }
    }
  }
  const [cnicValue, setCnicValue] = React.useState("CNIC");
  const { testschoolid } = useParams();
  const [studentname, setStudentName] = useState("");
  const [studentmiddlename, setStudentMiddleName] = useState("");
  const [studentlastname, setStudentLastName] = useState("");
  const [fathername, setFatherName] = useState("");
  const [fathercnic, setFatherCnic] = useState("");
  const [gen, setGender] = useState("female");
  const [cellno1, setCellNo1] = useState("");
  const [cellno2, setCellNo2] = useState("");
  const [studentemail, setStudentEmail] = useState("");
  const [fatheremail, setFatherEmail] = useState("");
  const [mother, setMotherEmail] = useState("");
  const form_id = localStorage.getItem("form_id");
  const [dob, setDOB] = useState("");
  const [pob, setPOB] = useState("");
  
  const [messageinfo, setMessageinfo] = useState("");
  const [message, setMessage] = useState({
    open: false,
    vertical: "top",
    horizontal: "right",
  });
  const { vertical, horizontal, open } = message;
  const handleMessage = () => {
    setMessage({ open: true, vertical: "top", horizontal: "right" });
  };
  const CloseMessage = () => {
    setMessage({ ...message, open: false });
  };
  //   const [schoolid, setSchoolID] =useState('');
  let [place, setPlaceHolder] = useState("CNIC");
  const data = {
    first_name: studentname,
    middle_name: studentmiddlename,
    last_name: studentlastname,
    father_name: fathername,
    father_CNIC: fathercnic,
    gender: gen,
    cell_no_1: cellno1,
    cell_no_2: cellno2,
    email: studentemail,
    father_email: fatheremail,
    mother_email: mother,
    school_id: localStorage.getItem("school_id"),
    date_of_birth: dob,
    place_of_birth: pob,
    father_CNIC_type: cnicValue,
  };

  useEffect(() => {
    
  }, []);
  const postReg = async () => {
    console.log();
    await axios
      .post(`http://fee-management-api.nastechltd.co/api/check_form`, reg_data)
      .then((response) => {
        // console.log("response: ", response);
        setRegistration(response.data.form.registration_no);
        // history.push("/studentparticular/"+response.data.form.registration_no)
      })
      .catch((error) => {
        console.log(error);
        alert(error.message);
      });
    console.log(registration);
  };

  const [formno, setFormNo] = useState(0);
  const [phone, setPhone] = useState(0);
  const [cnic, setCnic] = useState(0);

  const reg_data = {
    form_no: formno,
    phone_number: phone,
    CNIC: cnic,
  };

  const [checkresponse, setCheckResponse] = useState("false");

  function formbuttonchange() {
    if (checkresponse == "false") {
      setCheckResponse("true");
    } else {
      setCheckResponse("false");
    }
    console.log("form fill button status", checkresponse);
  }

  const [checkCNIC, setCheckCNIC] = useState("");

  const [checkState1, setCheckState1] = useState("true");
  const [checkState2, setCheckState2] = useState("");
  const [checkState3, setCheckState3] = useState("");

  function forCell() {
    setSelectedValue("b");
    setCheckState1("true");
    setCheckState2("false");
    setCheckState3("false");
    console.log("checked 1 :", checkState1);
    console.log("checked 2 :", checkState2);
    console.log("checked 3 :", checkState3);
  }

  function forform() {
    setSelectedValue("c");
    setCheckState2("true");
    setCheckState1("false");
    setCheckState3("false");
    console.log("checked 1 :", checkState1);
    console.log("checked 2 :", checkState2);
    console.log("checked 3 :", checkState3);
  }

  function forCnic() {
    setSelectedValue("d");
    setCheckState3("true");
    setCheckState1("false");
    setCheckState2("false");
    console.log("checked 1 :", checkState1);
    console.log("checked 2 :", checkState2);
    console.log("checked 3 :", checkState3);
  }

  // const handleChange = (event) => {
  //   setCnicValue(event.target.value);
  //   console.log(cnicValue)
  // };
  return (
    <>
      <h1
        style={{ textAlign: "center", marginBottom: "20px", marginTop: "20px" }}
      >
        ISSUED FORM
      </h1>
      <div className="background">
        <fieldset className="mt-4 field_box shadow">
          {/* <legend>Student's Particular</legend> */}
          <div className="container">
            <div className="row">
              <div className="col-4">
                <label for="fname">First Name:</label>
                <input
                  id="fname"
                  type="text"
                  className="form-control"
                  placeholder="First Name"
                  onChange={(e) => setStudentName(e.target.value)}
                />
              </div>

              <div className="col-4">
                <label for="mname">Middle Name:</label>
                <input
                  id="fname"
                  type="text"
                  className="form-control"
                  placeholder="Middle Name"
                  onChange={(e) => setStudentMiddleName(e.target.value)}
                />
              </div>

              <div className="col-4">
                <label for="lname">Last Name:</label>
                <input
                  id="fname"
                  type="text"
                  className="form-control"
                  placeholder="Last Name"
                  onChange={(e) => setStudentLastName(e.target.value)}
                />
              </div>

              <div className="col-4">
                <label for="tel">Father Name:</label>
                <input
                  id="tel"
                  type="text"
                  className="form-control"
                  placeholder="Father Name"
                  onChange={(e) => setFatherName(e.target.value)}
                />
              </div>

              <div className="col-4">
                <label for="tel">Cell No1:</label>
                <input
                  id="tel"
                  type="number"
                  className="form-control"
                  placeholder="Cellphone"
                  onChange={(e) => setCellNo1(e.target.value)}
                />
              </div>
              <div className="col-4">
                <label for="tel">Cell No2:</label>
                <input
                  id="tel"
                  type="number"
                  className="form-control"
                  placeholder="Cellphone"
                  onChange={(e) => setCellNo2(e.target.value)}
                />
              </div>

              <div className="col-4">
                <label for="dob">Date Of Birth:</label>
                <input
                  id="dob"
                  type="date"
                  className="form-control"
                  placeholder="Date Of Birth"
                  onChange={(e) => setDOB(e.target.value)}
                />
              </div>

              <div className="col-4">
                <label for="email">Place Of Birth</label>
                <input
                  id="email"
                  type="text"
                  className="form-control"
                  placeholder="Place of Birth"
                  onChange={(e) => setPOB(e.target.value)}
                />
              </div>

              <div className="col-4">
                <label for="email">Student's Email:</label>
                <input
                  id="email"
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  onChange={(e) => setStudentEmail(e.target.value)}
                />
              </div>

              <div className="col-4">
                <label for="email">Mother's Email:</label>
                <input
                  id="email"
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  onChange={(e) => setMotherEmail(e.target.value)}
                />
              </div>

              <div className="col-4">
                <label for="email">Father's Email:</label>
                <input
                  id="email"
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  onChange={(e) => setFatherEmail(e.target.value)}
                />
              </div>

              <div className="col-4">
                <div className="row">
                  <div className="col-xl-2">
                    <label for="email">Father's:</label>
                  </div>

                  <div
                    className="col-xl-7"
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      margin: "auto",
                      height: "40px",
                      marginTop: "-7px",
                    }}
                  >
                    <div>
                      <FormControl component="fieldset">
                        <RadioGroup
                          style={{ justifyContent: "center" }}
                          row
                          aria-label="position"
                          defaultValue="top"
                          onChange={(e) => setCnicValue(e.target.value)}
                        >
                          <FormControlLabel
                            value="CNIC"
                            control={<Radio color="primary" />}
                            label="CNIC"
                            
                          />
                          <FormControlLabel
                            value="NICOP"
                            control={<Radio color="primary" />}
                            label="NICOP"
                          />
                        </RadioGroup>
                      </FormControl>
                    </div>
                  </div>
                </div>
                <input
                  id="email"
                  className="form-control"
                  placeholder={cnicValue}
                  onChange={(e) => setFatherCnic(e.target.value)}
                />
              </div>

              {/* <div className="col-xl-4">
                <FormControl component="fieldset">
                  <label component="legend">Gender</label>

                  <RadioGroup
                    className="gender"
                    aria-label="gender"
                    name="gender1"
                    value={gen}
                    onChange={genderChange}
                  >
                    <FormControlLabel
                      value="female"
                      control={<Radio color="primary" />}
                      label="Female"
                      onChange={(e) => setGender(e.target.value)}
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio color="primary" />}
                      label="Male"
                      onChange={(e) => setGender(e.target.value)}
                    />
                  </RadioGroup>
                </FormControl>
              </div> */}
              <div className="col-xl-12 text-right" style={{marginTop:"20px"}}>
                <button
                  // disabled={checkresponse == "false" ? true : false}
                  style={
                   {
                          padding: "6px 10px 6px 10px",
                          backgroundColor: "green",
                          Outline: "none",
                          border: "none",
                          borderRadius: "7px",
                          marginRight: "20px",
                          color: "#fff",
                          fontWeight: "bold",
                          Outline: "none",
                        }
                  }
                  onClick={handleClickOpen}
                >
                  Form Fill
                </button>
                <button
                  type="submit"
                  onClick={postFrom}
                  className="issue-form-button"
                >
                  {notify}
                </button>

                <div>
                  <Dialog
                    // className="popup-width"
                    open={opened}
                    onClose={handleClose}
                    aria-labelledby="form-dialog-title"
                  >
                    <DialogTitle id="form-dialog-title">Select One</DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-around",
                            width: "40vw",
                            overflow: "hidden",
                          }}
                        >
                          <h5>
                            Cell No.
                            <Radio
                              checked={selectedValue === "b"}
                              onChange={forCell}
                              value="b"
                              color="default"
                              name="radio-button-demo"
                              inputProps={{ "aria-label": "B" }}
                            />
                          </h5>
                          <h5>
                            Reg No.
                            <Radio
                              checked={selectedValue === "c"}
                              onChange={forform}
                              value="c"
                              name="radio-button-demo"
                              color="default"
                              inputProps={{ "aria-label": "C" }}
                            />
                          </h5>
                          <h5>
                            CNIC.
                            <Radio
                              checked={selectedValue === "d"}
                              onChange={forCnic}
                              value="d"
                              color="default"
                              name="radio-button-demo"
                              inputProps={{ "aria-label": "D" }}
                            />
                          </h5>
                        </div>
                      </DialogContentText>

                      <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Cell NO."
                        type="email"
                        fullWidth
                        onChange={(e) => setPhone(e.target.value)}
                        // style={{width:"100vw"}}
                        style={
                          checkState1 == "" || checkState1 == "false"
                            ? { display: "none" }
                            : { display: "block" }
                        }
                      />
                      <TextField
                        margin="dense"
                        id="name"
                        label="Reg No."
                        type="email"
                        fullWidth
                        onChange={(e) => setFormNo(e.target.value)}
                        style={
                          checkState2 == "" || checkState2 == "false"
                            ? { display: "none" }
                            : { display: "block" }
                        }
                      />

                      <TextField
                        margin="dense"
                        id="name"
                        label="CNIC."
                        type="email"
                        fullWidth
                        onChange={(e) => setCnic(e.target.value)}
                        style={
                          checkState3 == "" || checkState3 == "false"
                            ? { display: "none" }
                            : { display: "block" }
                        }
                      />
                    </DialogContent>

                    <DialogActions>
                      <Button onClick={handleClose} color="primary">
                        Cancel
                      </Button>
                      <Link to={"/studentparticular"}>
                        <Button
                          onClick={handleClose}
                          onClick={postReg}
                          color="primary"
                        >
                          submit
                        </Button>
                      </Link>
                    </DialogActions>
                  </Dialog>
                </div>
              </div>
            </div>
          </div>
        </fieldset>

        <Snackbar
                    anchorOrigin={{ vertical, horizontal }}
                    open={open}
                    autoHideDuration={4000}
                    onClose={CloseMessage}
                    message={messageinfo}
                    key={vertical + horizontal}
                />
      </div>
    </>
  );
};
export default IssuedForm;
