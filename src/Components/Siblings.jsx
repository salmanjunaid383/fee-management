import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './personal.css';
import { Link, useHistory } from 'react-router-dom';
// import WebcamCapture from './Webcam'
// import Webcam from 'react-webcam';



const Siblings = () => {
    const form_no = localStorage.getItem("form_no");
    const sibling_id = localStorage.getItem("sibling_id");
    const [inputList, setInputList] = useState([
        { name: "", age: "", class: "" }
    ]
    );
    const [prevdata, setPrevdata] = useState([]);
    // console.log(inputList[0].name);
    const handleChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
    }
    const handleAdd = () => {
        setInputList([...inputList, { name: "", age: "", class: "" }]);
    }
    const removeField = (index) => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    }
    const history = useHistory();
    useEffect(() => {
        if (sibling_id != null) {
            axios.get(`http://fee-management-api.nastechltd.co/api/siblings/${form_no}`)
                .then(response => {
                    console.log(response.data)
                    setPrevdata(response.data)
                    // setPrevdata(response.data)
                    // setGuardianname(response.data._name);
                    // setQualification(response.data.qualification)
                    // setNationality(response.data.nationality)
                    // setOccupation(response.data.occupation)
                    // setReligion(response.data.religion)
                    // setAddressresidential(response.data.residential_address)
                    // setEmail(response.data.email)
                    // setCnic(response.data.CNIC)
                    // setCell(response.data.cell_no)
                    // setTel(response.data.tel_no)


                })
                .catch((error) => {
                    if (error.response) {
                        alert(error.response.data.message);
                    }
                })
        }
    }, [])
    const data = {
        siblings: inputList,
        form_no: form_no
        // remarks : remarks
    }
    const sendData = () => {
        if (sibling_id == null) {
            axios.post(`http://fee-management-api.nastechltd.co/api/siblings`, data)
                .then(response => {
                    console.log(response.data);
                    localStorage.setItem("sibling_id", response.data.id)
                    history.push("/emergency")
                    // setStudentdata(response.data);
                })
                .catch((error) => {
                    if (error.response) {
                        alert(error.response.data.message);
                    }
                })
        }
        else{
            axios.put(`http://fee-management-api.nastechltd.co/api/siblings/${sibling_id}`, data)
                .then(response => {
                    console.log(response.data);
                    localStorage.setItem("sibling_id", response.data.id)
                    // history.push("/siblings")
                    // setStudentdata(response.data);
                })
                .catch((error) => {
                    if (error.response) {
                        alert(error.response.data.message);
                    }
                })
        }

    }





    return (
        <>

            <div className="container-fluid form_body">
                <div className="container ">
                    <h1 className="text-center text-dark">STUDENT ADMISSION FORM</h1>
                    <form onSubmit={(e) => e.preventDefault()} >
                        <fieldset className="mt-4 field_box shadow">
                            <legend>Siblings Studying</legend>
                            {inputList.map((item, i) => {
                                return (
                                    <div key={i} class="row">
                                        <div className="col-3">
                                            <label for="name">Name:</label>
                                            <input id="name" defaultValue={'pe'} type="text" name="name" value={item.name} onChange={e => handleChange(e, i)} className="form-control" placeholder="Full Name" />
                                        </div>
                                        <div className="col-3">
                                            <label for="age">Age:</label>
                                            <input id="age" defaultValue={'pe'} type="number" name="age" value={item.age} onChange={e => handleChange(e, i)} className="form-control" placeholder="Age" />
                                        </div>
                                        <div className="col-3">
                                            <label for="class">Class:</label>
                                            <input id="class" defaultValue={'pe'} type="number" name="class" value={item.class} onChange={e => handleChange(e, i)} className="form-control" placeholder="Class" />
                                        </div>
                                        <div class="col-1 mt-4">
                                            {inputList.length !== 1 &&
                                                <button type="button" onClick={()=>removeField(i)} class="btn btn-primary mt-2">Remove</button>
                                            }

                                        </div>
                                        <div class="col-1 mt-4">
                                            {inputList.length - 1 === i &&
                                                <button type="button" onClick={handleAdd} class="btn btn-primary mt-2">Add</button>
                                            }

                                        </div>
                                    </div>
                                )
                            })}
                            <div className="row">
                                {/* <div className="col-12 mt-2">
                                <label for="guardAddress">Is there any other information you wish to be considered:</label>
                                    <textarea className="form-control" id="guardAddress" rows="5" onChange={(e)=> setRemarks(e.target.value)} placeholder="........."></textarea>
                                </div> */}
                                <div className="col-6 text-left mt-3">
                                    <Link to="/guardianparticular"><button className="btn btn-success w25">Back</button></Link>
                                </div>
                                {inputList[0].name == '' ?
                                    <>
                                        <div className="col-6 text-right mt-3">
                                            <button onClick={() => history.push("/emergency")} className="btn btn-success w25">Next</button>
                                        </div>
                                    </>
                                    :
                                    <>
                                        <div className="col-6 text-right mt-3">
                                            <button onClick={sendData} className="btn btn-success w25">Next</button>
                                        </div>
                                    </>
                                }
                            </div>

                        </fieldset>

                    </form>
                </div>
            </div>



        </>
    );
};
export default Siblings;