import React, { useState, useEffect } from "react";
import { Link, useHistory,useParams } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Snackbar from "@material-ui/core/Snackbar";
import { MenuItem } from "@material-ui/core";
import axios from "axios";
import  './Wizard.css';




const WizardFeeStructure = ({state,triggerParentUpdate}) => {
    const [classid, setClassid] = useState('');
    const [tax, setTax] = useState('');
    const [description, setDescription] = useState('');
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const school_id = localStorage.getItem("school_id")
   
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
    const[classData,setClassData]=useState([]);

    useEffect(() => {
        axios.get(`http://fee-management-api.nastechltd.co/api/schools_class/1`)
            .then(response => {
                console.log(response.data)
                setClassData(response.data)

            })
            .catch((error) => {
                if (error.response) {
                    setMessageinfo(error.response.data.message);
                    handleMessage();
                }
            })
    }, [])

    const [inputList, setInputList] = useState([
        { description: "", charges: "" }
    ]
    );
    const handleChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
    }
    const handleAdd = () => {
        setInputList([...inputList, { description: '', charges: '' }]);
    }
    const removeField = (index) => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    }

    const [inputListYear, setInputListYear] = useState([
        { description: '', charges: '', month: '' }
    ]
    );

    const handleChangeY = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputListYear];
        list[index][name] = value;
        setInputListYear(list);
    }
    const handleAddY = () => {
        setInputListYear([...inputListYear, { description: '', charges: '', month: '' }]);
    }
    const removeFieldY = (index) => {
        const list = [...inputListYear];
        list.splice(index, 1);
        setInputListYear(list);
    }

    const sendCharges = () => {
        if (classid === '') {
            setMessageinfo("Select Class")
            handleMessage();
        }
        else if (tax < 0) {
            setMessageinfo("Tax Can't be Negative")
            handleMessage();
        }
        else if (tax === '') {
            setMessageinfo("Enter Tax")
            handleMessage();
        }
        else if (description === '') {
            setMessageinfo("Enter Description")
            handleMessage();
        }
        else {
            for (var i = 0; i < inputList.length; i++) {
                if (inputList[i].charges < 0) {
                    setMessageinfo("Monthly Charges Can't be Negative")
                    handleMessage();
                }
                else if (inputList[i].charges === '') {
                    setMessageinfo("Enter Monthly Charges")
                    handleMessage();
                }
                else if (inputList[i].description === '') {
                    setMessageinfo("Enter Monthly Description")
                    handleMessage();
                }
                else {
                    for (var j = 0; j < inputListYear.length; j++) {
                        if (inputListYear[j].charges < 0) {
                            setMessageinfo("Yearly Charges can't be Negative")
                            handleMessage();
                        }
                        else if (inputListYear[j].charges === '') {
                            setMessageinfo("Enter Yearly Charges")
                            handleMessage();
                        }
                        else if (inputListYear[j].month === '') {
                            setMessageinfo("Select Month")
                            handleMessage();
                        }
                        else if (inputListYear[j].description === '') {
                            setMessageinfo("Enter Yearly Description")
                            handleMessage();
                        }
                        else {
                            axios.post(`http://fee-management-api.nastechltd.co/api/fee_structure`,
                                {
                                    monthlyCharges: inputList,
                                    monthly_charges: 0,
                                    yearly_charges: 0,
                                    yearlyCharges: inputListYear,
                                    class_id: classid,
                                    school_id: school_id,
                                    description: description,
                                    tax: tax
                                })
                                .then(response => {
                                    console.log(response)
                                    setDescription('');
                                    setTax('');
                                    setClassid('');
                                    setInputList([{ description: '', charges: '' }])
                                    setInputListYear([{ description: '', charges: '', month: '' }])
                                })
                                .catch((error) => {
                                    if (error.response) {
                                        setMessageinfo(error.response.data.message);
                                        handleMessage();
                                    }
                                })
                        }
                    }
                }
            }
        }

    }
    
    const onTrigger = (event) => {
        triggerParentUpdate();
    }

    return(
        <>
        <div class="form-card">
								<div class="row">
										<div class="col-7">
											<h2 class="fs-title">Fee Structure:</h2>
										</div>
										<div class="col-5">
											<h2 class="steps">Step 3 - 5</h2>
										</div>
										<div class="row"> 
                                            <div className="col-md-4">
                                            <TextField
                                            select
                                            id="standard-textarea"
                                            label="Class"
                                            placeholder="Select class"
                                            fullWidth
                                            >
                                                {classData.map((option) => (
                                                <MenuItem key={option.id} value={option.id}>
                                                {option.name}
                                                </MenuItem>
                                                ))}
                                            </TextField>
                                            </div>
                                            <div className="col-md-4">
                                            <TextField
                                            id="standard-textarea"
                                            label="Description"
                                            placeholder="Add description"
                                            type="text"
                                            fullWidth
                                            />
                                            </div>
                                            <div className="col-md-4">
                                            <TextField
                                            id="standard-textarea"
                                            label="Tax"
                                            placeholder="Add Tax"
                                            type="text"
                                            fullWidth
                                            />
                                            </div>
                                                                                    
										
										</div>
                                       
                                       <div >                
                                       <hr></hr>
                                       <h2 class="fs-title">Monthly Charges:</h2>
                                       </div>
                                       <div class="row">
                                                {
                                                    inputList.map((val , i) => {
                                                        return(
                                                            <>
                                                            <div class="col-md-6">
                                                            <TextField
                                                            id="standard-textarea"
                                                            name="description"
                                                            onChange={(e) => handleChange(e,i)}
                                                            label="Description"
                                                            placeholder="Add Description"
                                                            type="text"
                                                            fullWidth
                                                            />
                                                            </div>
                                                            <div class="col-md-6">
                                                            <TextField
                                                            id="standard-textarea"
                                                            name="charges"
                                                            onChange={(e) => handleChange(e,i)}
                                                            label="Charges"
                                                            placeholder="Add charges"
                                                            type="number"
                                                            fullWidth
                                                            />
                                                            </div>
                                                            <div class="col-md-12">
                                                            <span className="fa fa-minus" style={{cursor:"pointer"}} onClick={(e) => removeField(i)}></span>
                                                            </div>

                                                            </>
                                                        )
                                                    })
                                                }
                                                <div >
                                                <button class="btn btn-success" onClick={handleAdd} style={{marginTop:'5px'}} >Add More</button>
                                                </div>
                                       </div>

                                       <div >                
                                       <hr></hr>
                                       <h2 class="fs-title">Yearly Charges:</h2>
                                       </div>
                                       <div class="row">
                                           {
                                               inputListYear.map((val,i) => {
                                                return (
                                                    <>
                                                    <div class="col-md-4">
                                                    <TextField  select
                                                    id="standard-textarea"
                                                    name="month"
                                                    label="Month"
                                                    placeholder="Select Month"
                                                    fullWidth 
                                                    onChange={(e) => handleChangeY(e, i)}>
                                                                <MenuItem key="Jan" value="Jan">Jan</MenuItem>
                                                                <MenuItem key="Feb" value="Feb">Feb</MenuItem>
                                                                <MenuItem key="Mar" value="Mar">Mar</MenuItem>
                                                                <MenuItem key="Apr" value="Apr">Apr</MenuItem>
                                                                <MenuItem key="May" value="May">May</MenuItem>
                                                                <MenuItem key="Jun" value="Jun">Jun</MenuItem>
                                                                <MenuItem key="Jul" value="Jul">Jul</MenuItem>
                                                                <MenuItem key="Aug" value="Aug">Aug</MenuItem>
                                                                <MenuItem key="Sep" value="Sep">Sep</MenuItem>
                                                                <MenuItem key="Oct" value="Oct">Oct</MenuItem>
                                                                <MenuItem key="Nov" value="Nov">Nov</MenuItem>
                                                                <MenuItem key="Dec" value="Dec">Dec</MenuItem>
                                                    </TextField>
                                                    </div>
                                                    <div class="col-md-4">
                                                    <TextField
                                                        id="standard-textarea"
                                                        name="description"
                                                        onChange={(e) => handleChangeY(e,i)}
                                                        label="Description"
                                                        placeholder="Add description"
                                                        type="text"
                                                        fullWidth
                                                        />
                                                    </div>
                                                    <div class="col-md-4">
                                                    <TextField
                                                        id="standard-textarea"
                                                        name="charges"
                                                        onChange={(e) => handleChangeY(e,i)}
                                                        label="Charges"
                                                        placeholder="Add charges"
                                                        type="number"
                                                        fullWidth
                                                        />
                                                    </div>
                                                    <div class="col-md-12">
                                                            <span className="fa fa-minus" style={{cursor:"pointer"}} onClick={(e) => removeFieldY(i)}></span>
                                                    </div>
                                                    </>
                                                )
                                               })
                                           }
                                        <div >
                                                <button class="btn btn-success" onClick={handleAddY} style={{marginTop:'5px'}} >Add More</button>
                                            </div>
                                       </div>
                                        
                                        
                                        <div style={{textAlign:'center'}}>
                                        <button class="btn btn-success"  style={{marginTop:'5px',width:'100px'}} >Submit</button>
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
export default WizardFeeStructure;