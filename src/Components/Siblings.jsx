import React, { useState } from 'react';
import axios from 'axios';
import './personal.css';
import { Link, useHistory } from 'react-router-dom';
// import WebcamCapture from './Webcam'
// import Webcam from 'react-webcam';



const Siblings = () => {


    const [remarks, setRemarks] = useState('');

    const [inputList, setInputList] = useState([
        { name: "", age: "", class: "" }
    ]
    );

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
        list.splice(index,1);
        setInputList(list);
    }
    const history = useHistory();

    var a = JSON.parse(localStorage.getItem('guardian'))
    console.log(a)



    const data ={ 
        siblings : inputList,
        remarks : remarks
    }
    const sendData = () => {
        localStorage.setItem('siblings', JSON.stringify(data))

    }

        



    return (
        <>

            <div className="container-fluid form_body">
                <div className="container ">
                    <h1 className="text-center text-dark">STUDENT ADMISSION FORM</h1>
                    <form onSubmit={(e)=> e.preventDefault()} >
                        <fieldset className="mt-4 field_box shadow">
                            <legend>Siblings Studying</legend>
                            {inputList.map((item, i) => {
                                return (
                                    <div key={i} class="row">
                                        <div className="col-3">
                                            <label for="name">Name:</label>
                                            <input id="name" type="text" name="name" value={item.name} onChange={e => handleChange(e, i)} className="form-control" placeholder="Full Name" />
                                        </div>
                                        <div className="col-3">
                                            <label for="age">Age:</label>
                                            <input id="age" type="number" name="age" value={item.age} onChange={e => handleChange(e, i)} className="form-control" placeholder="Age" />
                                        </div>
                                        <div className="col-3">
                                            <label for="class">Class:</label>
                                            <input id="class" type="number" name="class" value={item.class} onChange={e => handleChange(e, i)} className="form-control" placeholder="Class" />
                                        </div>
                                        <div class="col-1 mt-4">
                                                {inputList.length !== 1 && 
                                                    <button type="button" onClick={removeField} class="btn btn-primary mt-2">Remove</button>
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
                                <div className="col-12 mt-2">
                                <label for="guardAddress">Is there any other information you wish to be considered:</label>
                                    <textarea className="form-control" id="guardAddress" rows="5" onChange={(e)=> setRemarks(e.target.value)} placeholder="........."></textarea>
                                </div>
                                <div className="col-12 text-right mt-3">
                                    <Link to="/emergency"><button onClick={sendData} className="btn btn-success w25">Next</button></Link>
                                </div>
                            </div>

                        </fieldset>

                    </form>
                </div>
            </div>



        </>
    );
};
export default Siblings;