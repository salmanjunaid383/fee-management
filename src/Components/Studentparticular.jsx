import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, Link, useParams } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import { ContactMail } from "@material-ui/icons";

const Studentparticular = () => {
  const history = useHistory();
  const [fname, setFname] = useState("");
  const [prevdata, setPrevdata] = useState("");
  const [fathername, setFathername] = useState("");
  const [mname, setMname] = useState("");
  const [lname, setLname] = useState("");
  const [bform, setBform] = useState("");
  const [getdata, setGetdata] = useState({});
  const [email, setEmail] = useState("");
  const [fatherEmail, setfatherEmail] = useState("");
  const [motherEmail, setmotherEmail] = useState("");
  const [gender, setGender] = useState("");
  const [classid, setClassid] = useState("");
  const [singleclass, setSingleclass] = useState({});
  const [classdata, setClassdata] = useState([]);
  const [dob, setDOB] = useState("");
  const [pob, setPOB] = useState("");
  const [lastschool, setLastschool] = useState("");
  const [addresspresent, setAddresspresent] = useState("");
  const [addresspermanent, setAddresspermanent] = useState("");
  const [tel, setTel] = useState("");
  const [cell, setCell] = useState("");
  const { schoolid } = useParams();
  const [cell2, setCell2] = useState("");
  const [extracomment, setExtraComment] = useState("");
  const [issueform, setIssueform] = useState("");
  const [selectedFile, setSelectedFile] = useState();

  // from local storage

  const school_id = localStorage.getItem("school_id");
  const form_id = localStorage.getItem("form_id");
  const class_id = localStorage.getItem("class_id");
  const reg_id = localStorage.getItem("reg_no");

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
  useEffect(() => {
    if (form_id == null){
    axios
      .get(
        `http://fee-management-api.nastechltd.co/api/schools_class/${school_id}`
      )
      .then((response) => {
        console.log(response.data);
        setClassdata(response.data);
      })
      .catch((error) => {
        if (error.response) {
          setMessageinfo(error.response.data.message);
          handleMessage();
        }
      });
    const reg_data = {
      form_no: reg_id,
    };
    axios
      .post(`http://fee-management-api.nastechltd.co/api/check_form`, reg_data)
      .then((response) => {
        console.log("reg response", response);
        // console.log('fname',response.data.form.name)
        setGetdata(response.data.form);
        setFname(response.data.form.first_name);
        setLname(response.data.form.last_name);
        setMname(response.data.form.middle_name);
        setFathername(response.data.form.father_name);
        setCell(response.data.form.cell_no_1);
        setCell2(response.data.form.cell_no_2);
        setIssueform(response.data.form.issue_form_date);
        setDOB(response.data.form.date_of_birth);
        setPOB(response.data.form.place_of_birth);
        setfatherEmail(response.data.form.father_email);
        setmotherEmail(response.data.form.mother_email);
        setEmail(response.data.form.email);
        localStorage.setItem("response_id", response.data.form.id);
        console.log(response.data.form.id);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error);
          console.log(error.response.data.message);
          setMessageinfo(error.response.data.message);
          handleMessage();
        }
      });
    }

    if (form_id != null) {
        axios
          .get(
            `http://fee-management-api.nastechltd.co/api/admission_form/${reg_id}`
          )
          .then((response) => {
            console.log(form_id);
            console.log(response.data);
            console.log("form api response" + response.data);
            setPrevdata(response.data.AdmissionForm);
            setGetdata(response.data.AdmissionForm);
            setFname(response.data.AdmissionForm.first_name);
            setLname(response.data.AdmissionForm.last_name);
            setMname(response.data.AdmissionForm.middle_name);
            setFathername(response.data.AdmissionForm.father_name);
            setDOB(response.data.AdmissionForm.date_of_birth);
            setEmail(response.data.AdmissionForm.email);
            setBform(response.data.AdmissionForm.b_form);
            setLastschool(response.data.AdmissionForm.last_school_attended);
            setPOB(response.data.AdmissionForm.place_of_birth);
            setAddresspermanent(response.data.AdmissionForm.permanent_address);
            setTel(response.data.AdmissionForm.tel_no);
            setAddresspresent(response.data.AdmissionForm.address);
            setClassid(response.data.AdmissionForm.class_id);
            setGender(response.data.AdmissionForm.gender);
            setCell(response.data.AdmissionForm.cell_no_1);
            setCell2(response.data.AdmissionForm.cell_no_2);
            setfatherEmail(response.data.AdmissionForm.father_email);
            setmotherEmail(response.data.AdmissionForm.mother_email);
            setIssueform(response.data.AdmissionForm.issue_form_date)
            // setSelectedFile(e.target.files[0])
            setSelectedFile(response.data.AdmissionForm.profile_image)
            console.log("previos data",setPrevdata)
            axios
              .get(
                `http://fee-management-api.nastechltd.co/api/show_class/${response.data.AdmissionForm.class_id}`
              )
              .then((response) => {
                setSingleclass(response.data);
              })
              .catch((error) => {
                if (error.response) {
                  setMessageinfo(error.response.data.message);
                  handleMessage();
                }
              });
          })
          .catch((error) => {
            if (error.response) {
              setMessageinfo(error.response.data.message);
              handleMessage();
            }
          });
          
    }

    const profile_pic_enter =   localStorage.getItem("pic-enter-again")

    if (profile_pic_enter == "enter"){
      setMessageinfo("Please select the profile pic again!");
      handleMessage();
      localStorage.setItem("pic-enter-again","do not enter")
    }
  }, []);
  

  var today = new Date();
  var birthDate = new Date(dob);
  var age_now = today.getFullYear() - birthDate.getFullYear();


  const changeHandler = (e) => {
    setSelectedFile(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  const sendData = () => {
    // localStorage.setItem('student', JSON.stringify(data))
    if (form_id == null) {
      if (fname == "") {
        setMessageinfo("Enter First Name");
        handleMessage();
      } else if (lname == "") {
        setMessageinfo("Enter Last Name");
        handleMessage();
      } else if (bform == "") {
        setMessageinfo("Enter Bform No.");
        handleMessage();
      } else if (bform.length < 13 || bform.length > 13) {
        setMessageinfo("Enter Valid B-Form No.");
        handleMessage();
      } else if (fathername == "") {
        setMessageinfo("Enter Father Name");
        handleMessage();
      } else if (classid == "") {
        setMessageinfo("Select Class");
        handleMessage();
      } else if (tel == "") {
        setMessageinfo("Enter Telephone");
        handleMessage();
      } else if (gender == "") {
        setMessageinfo("Select Gender");
        handleMessage();
      } else if (cell == "") {
        setMessageinfo("Enter Cellphone");
        handleMessage();
      } else if (dob == "") {
        setMessageinfo("Enter Date of Birth");
        handleMessage();
      } else if (age_now < 2) {
        setMessageinfo("Enter Valid Date");
        handleMessage();
      } else if (pob == "") {
        setMessageinfo("Enter Place of Birth");
        handleMessage();
      } else if (addresspermanent == "") {
        setMessageinfo("Enter Permanent Address");
        handleMessage();
      } else if (addresspresent == "") {
        setMessageinfo("Enter Present Address");
        handleMessage();}
        else if (selectedFile == "") {
          console.log(selectedFile);
          setMessageinfo("Select a profile image");
          handleMessage();
      } else {
        if (/^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/.test(email)) {
          console.log(selectedFile);
          const formData = new FormData();
          formData.append("profile_image", selectedFile);
          formData.append("first_name", fname);
          formData.append("last_name", lname);
          formData.append("middle_name", mname);
          formData.append("date_of_birth", dob);
          formData.append("place_of_birth", pob);
          formData.append("last_school_attended", lastschool);
          formData.append("cell_no_1", cell);
          formData.append("class_id", classid);
          formData.append("b_form", bform);
          formData.append("cell_no_2", cell2);
          formData.append("father_email", fatherEmail);
          formData.append("mother_email", motherEmail);
          formData.append("extra_comment", extracomment);
          formData.append("registration_no", reg_id);
          formData.append("issue_form_date", issueform);
          formData.append("gender", gender);
          formData.append("permanent_address", addresspermanent);
          formData.append("tel_no", tel);
          formData.append("father_name", fathername);
          formData.append("school_id", school_id);
          formData.append("address", addresspresent);
          formData.append("email", email);
          console.log("running post");
          axios({
            method: "post",
            url: "http://fee-management-api.nastechltd.co/api/admission_form",
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
          })
            .then((response) => {
              console.log("salman", response);
              console.log("formDAta", formData);
              history.push(`/fatherparticular/${response.data.registration_no}`);
              localStorage.setItem("form_id", response.data.id);
              setAddresspermanent("");
            })
            .catch((error) => {
              if (error.response) {
                // setMessageinfo(error.response.data.message);
                // console.log(error.response.data.message);
                setMessageinfo("Enter the profile picture");

                handleMessage();
              }
            });
        } else {
          setMessageinfo("Enter Valid Email");
          handleMessage();
        }
      }
    } else {
      if (fname == "") {
        setMessageinfo("Enter First Name");
        handleMessage();
      } else if (lname == "") {
        setMessageinfo("Enter Last Name");
        handleMessage();
      } else if (bform == "") {
        setMessageinfo("Enter Bform No.");
        handleMessage();
      } else if (bform.length < 13 || bform.length > 13) {
        setMessageinfo("Enter Valid B-Form No.");
        handleMessage();
      } else if (fathername == "") {
        setMessageinfo("Enter Father Name");
        handleMessage();
      } else if (classid == "") {
        setMessageinfo("Select Class");
        handleMessage();
      } else if (tel == "") {
        setMessageinfo("Enter Telephone");
        handleMessage();
      } else if (gender == "") {
        setMessageinfo("Select Gender");
        handleMessage();
      } else if (cell == "") {
        setMessageinfo("Enter Cellphone");
        handleMessage();
      } else if (dob == "") {
        setMessageinfo("Enter Date of Birth");
        handleMessage();
      } else if (age_now < 2) {
        setMessageinfo("Enter Valid Date");
        handleMessage();
      } else if (pob == "") {
        setMessageinfo("Enter Place of Birth");
        handleMessage();
      } else if (addresspermanent == "") {
        setMessageinfo("Enter Permanent Address");
        handleMessage();
      } else if (addresspresent == "") {
        setMessageinfo("Enter Present Address");
        handleMessage();
      } 
      else if (selectedFile == "") {
        setMessageinfo("Select a profile image");
        handleMessage();
    }
      else {
        if (
          /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/.test(
            email
          )
        ) {
          console.log(fname, lname, fatherEmail);
          const formData = new FormData();
          formData.append("profile_image", selectedFile);
          formData.append("first_name", fname);
          formData.append("last_name", lname);
          formData.append("middle_name", mname);
          formData.append("date_of_birth", dob);
          formData.append("place_of_birth", pob);
          formData.append("last_school_attended", lastschool);
          formData.append("cell_no_1", cell);
          formData.append("class_id", classid);
          formData.append("b_form", bform);
          formData.append("cell_no_2", cell2);
          formData.append("father_email", fatherEmail);
          formData.append("mother_email", motherEmail);
          formData.append("extra_comment", extracomment);
          formData.append("registration_no", reg_id);
          formData.append("issue_form_date", issueform);
          formData.append("gender", gender);
          formData.append("permanent_address", addresspermanent);
          formData.append("tel_no", tel);
          formData.append("father_name", fathername);
          formData.append("school_id", school_id);
          formData.append("address", addresspresent);
          formData.append("email", email);
          
          formData.append('_method', 'PUT')

          for (var value of formData.values()) {
            console.log(value);
          }
          axios({
            method: "post",
            url: `http://fee-management-api.nastechltd.co/api/admission_form/${form_id}`,
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
          })
            .then((response) => {

              console.log("res for put");
              console.log(response);
              history.push(`/fatherparticular/${response.data.registration_no}`);
              localStorage.setItem("form_id", response.data.id);
              // setStudentdata(response.data);
              // togetupdate()
            })
            .catch((error) => {
              if (error.response) {
                // setMessageinfo(error.response.data.message);
                setMessageinfo("Enter Profile Picture");
                handleMessage();
              }
            });
        } else {
          setMessageinfo("Enter Valid Email");
          handleMessage();
        }
      }
    }
  };


  return (
    <>
      <div className="container-fluid form_body">
        <div className="container ">
          <h1 className="text-center text-dark">STUDENT ADMISSION FORM</h1>
          {/* <button onClick={forCallingPic}>FOR CALLING PIC</button> */}

          <form
            enctype="multipart/form-data"
            onSubmit={(e) => e.preventDefault()}
          >
            <fieldset className="mt-4 field_box shadow">
              <div
                style={{ display: "flex", alignItems: "center", gap: "15px" }}
              >
                <legend>Student's Particular</legend>
              </div>
              <div className="row">
                {/* <button onClick={uploadImage}> upload</button> */}

                <div className="col-4">
                  <label for="fname">First Name:</label>
                  <input
                    id="fname"
                    defaultValue={getdata.first_name}
                    type="text"
                    className="form-control"
                    placeholder="First Name"
                    onChange={(e) => setFname(e.target.value)}
                  />
                </div>
                <div className="col-4">
                  <label for="mname">Middle Name:</label>
                  <input
                    id="mname"
                    defaultValue={getdata.middle_name}
                    type="text"
                    className="form-control"
                    placeholder="Middle Name"
                    onChange={(e) => setMname(e.target.value)}
                  />
                </div>
                <div className="col-4">
                  <label for="lname">Last Name:</label>
                  <input
                    id="lname"
                    defaultValue={getdata.last_name}
                    type="text"
                    className="form-control"
                    placeholder="Last Name"
                    onChange={(e) => setLname(e.target.value)}
                  />
                </div>
                <div className="col-4">
                  <label for="tel">B-Form No/CNIC:</label>
                  <input
                    id="tel"
                    defaultValue={prevdata.b_form}
                    type="text"
                    className="form-control"
                    onChange={(e) => setBform(e.target.value)}
                  />
                </div>
                <div className="col-4">
                  <label for="class">Select Class:</label>

                  <select
                    id="class"
                    class="form-select"
                    aria-label="Default select example"
                    onChange={(e) => setClassid(e.target.value)}
                  >
                    <option selected disabled>
                      {singleclass.name}
                    </option>
                    {classdata.map((val, i) => {
                      return (
                        <>
                          <option key={i} value={val.id}>
                            {val.name}
                          </option>
                        </>
                      );
                    })}
                  </select>
                </div>
                <div className="col-4">
                  <label for="nameLast">Father's Name:</label>
                  <input
                    id="nameLast"
                    defaultValue={getdata.father_name}
                    type="text"
                    className="form-control"
                    placeholder="Father's Name"
                    onChange={(e) => setFathername(e.target.value)}
                  />
                </div>
                <div className="col-4">
                  <label for="dob">Date Of Birth:</label>
                  <input
                    id="dob"
                    defaultValue={getdata.date_of_birth}
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
                    defaultValue={getdata.place_of_birth}
                    type="text"
                    className="form-control"
                    placeholder="Place of Birth"
                    onChange={(e) => setPOB(e.target.value)}
                  />
                </div>

                <div className="col-4">
                  <label for="email">School Last Attended:</label>
                  <input
                    id="email"
                    defaultValue={prevdata.last_school_attended}
                    type="text"
                    className="form-control"
                    placeholder="School Attended"
                    onChange={(e) => setLastschool(e.target.value)}
                  />
                </div>

                <div className="col-4">
                  <label for="email">Student's Email:</label>
                  <input
                    id="email"
                    defaultValue={getdata.email}
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="col-4">
                  <label for="email">Mother's Email:</label>
                  <input
                    id="email"
                    defaultValue={getdata.mother_email}
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    onChange={(e) => setmotherEmail(e.target.value)}
                  />
                </div>

                <div className="col-4">
                  <label for="email">Father's Email:</label>
                  <input
                    id="email"
                    defaultValue={getdata.father_email}
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    onChange={(e) => setfatherEmail(e.target.value)}
                  />
                </div>

                <div className="form-group col-8">
                  <label for="address">Permanent Address</label>
                  <textarea
                    className="form-control"
                    defaultValue={prevdata.permanent_address}
                    id="address"
                    rows="1"
                    onChange={(e) => setAddresspermanent(e.target.value)}
                  ></textarea>
                </div>

                <div className="col-4">
                  <label for="tel">Extra Information:</label>
                  <input
                    id="tel"
                    defaultValue={prevdata.extra_comment}
                    className="form-control"
                    onChange={(e) => setExtraComment(e.target.value)}
                  />
                </div>
                <div className="col-4">
                  <label for="tel">Tel:</label>
                  <input
                    id="tel"
                    defaultValue={prevdata.tel_no}
                    maxLength=""
                    type="number"
                    className="form-control"
                    placeholder="Telephone"
                    onChange={(e) => setTel(e.target.value)}
                  />
                </div>
                <div className="form-group col-8">
                  <label for="address">Present Address</label>
                  <textarea
                    className="form-control"
                    defaultValue={prevdata.address}
                    id="address"
                    rows="1"
                    onChange={(e) => setAddresspresent(e.target.value)}
                  ></textarea>
                </div>

                <div className="col-4">
                  <label for="tel">Cell No1:</label>
                  <input
                    id="tel"
                    defaultValue={getdata.cell_no_1}
                    type="number"
                    className="form-control"
                    placeholder="Cellphone"
                    onChange={(e) => setCell(e.target.value)}
                  />
                </div>

                <div className="col-4">
                  <label for="tel">Cell No2:</label>
                  <input
                    id="tel"
                    defaultValue={getdata.cell_no_2}
                    type="number"
                    className="form-control"
                    placeholder="Cellphone"
                    onChange={(e) => setCell2(e.target.value)}
                  />
                </div>

                <div className="col-4">
                  <label for="tel">Date Of Issued Form:</label>
                  <input
                    id="tel"
                    defaultValue={getdata.issue_form_date}
                    className="form-control"
                    placeholder="Issue Date"
                    onChange={(e) => setIssueform(e.target.value)}
                  />
                </div>

                <div className="col-4">
                  <label for="fname">Upload Image:</label>
                  <input
                  
                    class="form-control"
                    name="profile_image"
                    type="file"
                    accept="image/png, image/jpg, image/jpeg"
                    id="image"
                    // value={selectedFile}
                    onChange={(e) => setSelectedFile(e.target.files[0])}
                    
                  />
                </div>

                {form_id === null ? (
                  <>
                    <div
                      className="col-12 mt-5"
                     
                    >
                      <label>Gender:</label>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="gender"
                          id="male"
                          value="male"
                          onChange={(e) => setGender(e.target.value)}
                        />
                        <label
                          className="form-check-label"
                          for="male"
                          style={{ marginRight: "10px" }}
                        >
                          Male
                        </label>
                        <input
                          className="form-check-input"
                          type="radio"
                          name="gender"
                          id="female"
                          value="female"
                          onChange={(e) => setGender(e.target.value)}
                       
                        />
                        <label className="form-check-label" for="female">
                          Female
                        </label>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {prevdata.gender === "male" ? (
                      <>
                        <div className="col-4 mt-5">
                          <label>Gender:</label>
                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="gender"
                              id="male"
                              value="male"
                              checked
                              onChange={(e) => setGender(e.target.value)}
                            />
                            <label className="form-check-label" for="male">
                              Male
                            </label>
                          </div>
                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="gender"
                              id="female"
                              value="female"
                              onChange={(e) => setGender(e.target.value)}
                            />
                            <label className="form-check-label" for="female">
                              Female
                            </label>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="col-4 mt-5">
                          <label>Gender:</label>
                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="gender"
                              id="male"
                              value="male"
                              onChange={(e) => setGender(e.target.value)}
                            />
                            <label className="form-check-label" for="male">
                              Male
                            </label>
                          </div>
                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="gender"
                              id="female"
                              value="female"
                              checked
                              onChange={(e) => setGender(e.target.value)}
                            />
                            <label className="form-check-label" for="female">
                              Female
                            </label>
                          </div>
                        </div>
                      </>
                    )}
                  </>
                )}

                <div className="col-12 text-right mt-3">
                  <button onClick={sendData} className="btn btn-success w25">
                    Next
                  </button>
                </div>
              </div>
            </fieldset>
          </form>
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
    </>
  );
};

export default Studentparticular;
