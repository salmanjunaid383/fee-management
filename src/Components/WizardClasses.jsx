import React, { useState, useEffect } from "react";
import { Link, useHistory,useParams } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Snackbar from "@material-ui/core/Snackbar";

import axios from "axios";
import  './Wizard.css';




const WizardClasses = ({state,triggerParentUpdate}) => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [schoolClass, setSchoolClass] = useState("");

    const [sections, setSections] = useState([{ name: "" }]);
    const handleChange = (e, index) => {
      const { name, value } = e.target;
      const list = [...sections];
      list[index][name] = value;
      setSections(list);
    };
    const handleAdd = () => {
        setSections([...sections, { name: "" }]);
      };
    const removeField = (index) => {
      const list = [...sections];
      list.splice(index, 1);
      setSections(list);
    };
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
    const data = {
        name: schoolClass,
        school_id: localStorage.getItem("school_id"),
        sections: sections,
      };
    const sendData = () => {
        
        if (schoolClass === "") {
          setMessageinfo("Enter Class");
          handleMessage();
        }
        else if (sections[0].name === "") {
          setMessageinfo("Enter atleast one section for class");
          handleMessage();
        } else {

        }
        //   axios
        //     .post("http://fee-management-api.nastechltd.co/api/schools_class", data)
        //     .then((response) => {
        //       console.log(response);
        //       console.log(response.data.id);
        //       setSchoolClass();
        //       setSections([{ name: "" }]);
        //       handleClose();
        //     })
        //     .catch((error) => {
        //       if (error.response) {
        //         setMessageinfo(error.response.data.message);
        //         handleMessage();
        //       }
        //     });
        // }
      };
      const onTrigger = (event) => {
        triggerParentUpdate();
    }

    return(
        <>
        <div class="form-card">
								<div class="row">
										<div class="col-7">
											<h2 class="fs-title">School Classes:</h2>
										</div>
										<div class="col-5">
											<h2 class="steps">Step 2 - 5</h2>
										</div>
										<div>
										<TextField
										id="standard-textarea"
                                        onChange={(e) => setSchoolClass(e.target.value)}
										name="Class"
										label="Class Name"
										placeholder="Add Class"
										type="text"
										fullWidth
										/>
										</div>
                                        {
                                            sections.map((val,i) => {
                                               return(
                                                   <>
                                                   <div>
                                                   <TextField
                                                        id="standard-textarea"
                                                        name="name"
                                                        onChange={(e) => handleChange(e,i)}
                                                        label="Section Name"
                                                        placeholder="Add Section"
                                                        type="text"
                                                        fullWidth
                                                        />
                                                    <span className="fa fa-minus" style={{cursor:"pointer"}} onClick={(e) => removeField(i)}></span>
                                                   </div>
                                                   
                                                       
                                                   
                                                   </>
                                               )
                                            })
                                        }
                                        
                                        
                                        <div>
                                        <button onClick={handleAdd} class="btn btn-success" style={{marginTop:'5px'}}>Add Section</button>
                                        </div>
                                        <div style={{textAlign:'center'}}>
                                        <button class="btn btn-success" style={{marginTop:'5px'}} onClick={sendData}>Add Class</button>
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
       
        </>
    )
}
export default WizardClasses;