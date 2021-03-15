import React, { useState } from 'react';
import axios from 'axios';



function Form() {


    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [gender, setGender] = useState('');
    const [dob, setDOB] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [province, setProvince] = useState('');
    const [homephone, setHomephone] = useState('');
    const [phone, setPhone] = useState('');
    const [postal, setPostal] = useState('');
    const [email, setEmail] = useState('');
    const [cnic, setCNIC] = useState('');

    const [schoolname, setSchlname] = useState('');
    const [schooladdress, setSchladdress] = useState('');
    const [schoolduration, setSchlduration] = useState('');
    const [schooldegree, setSchldegree] = useState('');
    const [schoolmajor, setSchlmajor] = useState('');
    const [collegename, setColgname] = useState('');
    const [collegeaddress, setColgaddress] = useState('');
    const [collegedegree, setColgdegree] = useState('');
    const [collegemajor, setColgmajor] = useState('');
    const [others, setOthers] = useState('');
    const [gname, setGname] = useState('');
    const [gage, setGage] = useState('');
    const [gaddress, setGaddress] = useState('');
    const [gphone, setGphone] = useState('');
    const [gcnic, setGcnic] = useState('');
    const [ggender, setGgender] = useState('');
    const [employer, setEmployer] = useState('');
    const [workphone, setWorkphone] = useState('');
    const [dateEmployed, setDateEmployed] = useState('');
    const [salary, setSalary] = useState('');
    const [workcity, setWorkcity] = useState('');
    const [workprovince, setWorkprovince] = useState('');
    const [workaddress, setWorkaddress] = useState('');
    const [dutiesperformed, setDutiesperformed] = useState('');
    const [supervisor, setSupervisor] = useState('');
    const [reason, setReason] = useState('');
    const [position, setPosition] = useState('');
    const [refname, setRefname] = useState('');
    const [reftitle, setReftitle] = useState('');
    const [refcompany, setRefcompany] = useState('');
    const [refphone, setRefphone] = useState('');
    const [inputList, setInputList] = useState([
        { sibling_name: "", sibling_age: "", sibling_class: "" }
    ]
    );

    const handleChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
    }
    const handleAdd = () => {
        setInputList([...inputList, { sibling_name: "", sibling_age: "", sibling_class: "" }]);
    }








    return (
        <>
            <div className="container-fluid form_body">
                <div className="container ">
                    <h1 className="text-center text-dark">STUDENT ADMISSION FORM</h1>
                    <form onSubmit="return false" >


                        <fieldset className="mt-4 field_box shadow">
                            <legend>Student's Particular</legend>
                            <div className="row">
                                <div className="col">
                                    <label for="name">Full Name:</label>
                                    <input id="name" type="text" className="form-control" placeholder="Full Name" onChange={(e) => setFname(e.target.value)} />
                                </div>
                                <div className="col">
                                    <label for="nameLast">Father's Name:</label>
                                    <input id="nameLast" type="text" className="form-control" placeholder="Father's Name" onChange={(e) => setLname(e.target.value)} />
                                </div>
                                <div className="col">
                                    <label for="dob">Date Of Birth:</label>
                                    <input id="dob" type="date" className="form-control" placeholder="Date Of Birth" onChange={(e) => setDOB(e.target.value)} />

                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label for="email">Email:</label>
                                    <input id="email" type="email" className="form-control" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="col">
                                    <label for="email">School Last Attended:</label>
                                    <input id="email" type="email" className="form-control" placeholder="School Attended" onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="col">
                                    <label for="email">Place Of Birth</label>
                                    <input id="email" type="email" className="form-control" placeholder="Place of Birth" onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                {/* <div className="col">
                                <label for="cellPhone">Cell Phone:</label>
                                <input id="cellPhone" type="number" className="form-control" placeholder="Cell Phone" onChange={(e) => setPhone(e.target.value)} />
                            </div>
                            <div className="col">
                                <label for="homePhone">Home Phone:</label>
                                <input id="homePhone" type="number" className="form-control" placeholder="Home Phone" onChange={(e) => setHomephone(e.target.value)} />
                            </div> */}
                            </div>
                            {/* <div className="row">
                            <div className="col">
                                <label for="postal">Postal Code:</label>
                                <input id="postal" type="number" className="form-control" placeholder="Postal Code" onChange={(e) => setPostal(e.target.value)} />
                            </div>
                            <div className="col">
                                <label for="province">Province:</label>
                                <input id="province" type="text" className="form-control" placeholder="Province" onChange={(e) => setProvince(e.target.value)} />
                            </div>
                            <div className="col">
                                <label for="city">City:</label>
                                <input id="city" type="text" className="form-control" placeholder="City" onChange={(e) => setCity(e.target.value)} />
                            </div>


                        </div> */}
                            <div className="row">
                                <div className="form-group col-8">
                                    <label for="address">PermanentAddress</label>
                                    <textarea className="form-control" id="address" rows="1" onChange={(e) => setAddress(e.target.value)}></textarea>
                                </div>
                                <div className="col-4">
                                    <label for="tel">Tel:</label>
                                    <input id="tel" type="number" className="form-control" placeholder="Telephone" onChange={(e) => setCNIC(e.target.value)} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-8">
                                    <label for="address">Present Address</label>
                                    <textarea className="form-control" id="address" rows="1" onChange={(e) => setAddress(e.target.value)}></textarea>
                                </div>
                                <div className="col-4">
                                    <label for="tel">Tel:</label>
                                    <input id="tel" type="number" className="form-control" placeholder="Telephone" onChange={(e) => setCNIC(e.target.value)} />
                                </div>
                                {/* <div className="col">
                                <label for="cnic">CNIC:</label>
                                <input id="cnic" type="number" className="form-control" placeholder="B-Form/CNIC" onChange={(e) => setCNIC(e.target.value)} />
                            </div> */}
                                <div className="col-4">
                                    <label>Gender:</label>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="gender" id="male" value="male" onChange={(e) => setGender(e.target.value)} />
                                        <label className="form-check-label" for="male">
                                            Male
                            </label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="gender" id="female" value="female"
                                            onChange={(e) => setGender(e.target.value)} />
                                        <label className="form-check-label" for="female">
                                            Female
                            </label>
                                    </div>

                                </div>

                            </div>

                        </fieldset>
                        <fieldset className="mt-4 field_box shadow">
                            <legend>Father's Particular</legend>
                            <div className="row">
                                <div className="col">
                                    <label for="guardname">Full Name:</label>
                                    <input id="guardname" type="text" className="form-control" placeholder="Full Name" onChange={(e) => setGname(e.target.value)} />
                                </div>
                                <div className="col">
                                    <label for="age">Qualification:</label>
                                    <input id="age" type="text" className="form-control" placeholder="Qualification" onChange={(e) => setGage(e.target.value)} />
                                </div>
                                <div className="col">
                                    <label for="guardPhone">Phone:</label>
                                    <input id="guardPhone" type="number" className="form-control" placeholder="Phone" onChange={(e) => setGphone(e.target.value)} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-4">
                                    <label for="guardCnic">CNIC:</label>
                                    <input id="guardCnic" type="number" className="form-control" placeholder="CNIC Number" onChange={(e) => setGcnic(e.target.value)} />
                                </div>
                                <div className="col-4">
                                    <label for="email">Email:</label>
                                    <input id="email" type="email" className="form-control" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="form-group col-4">
                                    <label for="guardAddress">Office Address</label>
                                    <textarea className="form-control" id="guardAddress" rows="1" onChange={(e) => setGaddress(e.target.value)}></textarea>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label for="age">Occupation:</label>
                                    <input id="age" type="text" className="form-control" placeholder="Occupation" onChange={(e) => setGage(e.target.value)} />
                                </div>
                                <div className="col">
                                    <label for="age">Nationality:</label>
                                    <input id="age" type="text" className="form-control" placeholder="Nationality" onChange={(e) => setGage(e.target.value)} />
                                </div>
                                <div className="col">
                                    <label for="age">Religion:</label>
                                    <input id="age" type="text" className="form-control" placeholder="Religion" onChange={(e) => setGage(e.target.value)} />
                                </div>
                            </div>
                        </fieldset>
                        <fieldset className="mt-4 field_box shadow">
                            <legend>Mother's Particular</legend>
                            <div className="row">
                                <div className="col">
                                    <label for="guardname">Full Name:</label>
                                    <input id="guardname" type="text" className="form-control" placeholder="Full Name" onChange={(e) => setGname(e.target.value)} />
                                </div>
                                <div className="col">
                                    <label for="age">Qualification:</label>
                                    <input id="age" type="text" className="form-control" placeholder="Qualification" onChange={(e) => setGage(e.target.value)} />
                                </div>
                                <div className="col">
                                    <label for="guardPhone">Phone:</label>
                                    <input id="guardPhone" type="number" className="form-control" placeholder="Phone" onChange={(e) => setGphone(e.target.value)} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-4">
                                    <label for="guardCnic">CNIC:</label>
                                    <input id="guardCnic" type="number" className="form-control" placeholder="CNIC Number" onChange={(e) => setGcnic(e.target.value)} />
                                </div>
                                <div className="col-4">
                                    <label for="email">Email:</label>
                                    <input id="email" type="email" className="form-control" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="form-group col-4">
                                    <label for="guardAddress">Residential Address</label>
                                    <textarea className="form-control" id="guardAddress" rows="1" onChange={(e) => setGaddress(e.target.value)}></textarea>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label for="age">Occupation:</label>
                                    <input id="age" type="text" className="form-control" placeholder="Occupation" onChange={(e) => setGage(e.target.value)} />
                                </div>
                                <div className="col">
                                    <label for="age">Nationality:</label>
                                    <input id="age" type="text" className="form-control" placeholder="Nationality" onChange={(e) => setGage(e.target.value)} />
                                </div>
                                <div className="col">
                                    <label for="age">Religion:</label>
                                    <input id="age" type="text" className="form-control" placeholder="Religion" onChange={(e) => setGage(e.target.value)} />
                                </div>
                            </div>
                        </fieldset>

                        <fieldset className="mt-4 field_box shadow">
                            <legend>Guardian's Particular</legend>
                            <div className="row">
                                <div className="col">
                                    <label for="guardname">Full Name:</label>
                                    <input id="guardname" type="text" className="form-control" placeholder="Full Name" onChange={(e) => setGname(e.target.value)} />
                                </div>
                                <div className="col">
                                    <label for="age">Qualification:</label>
                                    <input id="age" type="text" className="form-control" placeholder="Qualification" onChange={(e) => setGage(e.target.value)} />
                                </div>
                                <div className="col">
                                    <label for="guardPhone">Phone:</label>
                                    <input id="guardPhone" type="number" className="form-control" placeholder="Phone" onChange={(e) => setGphone(e.target.value)} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-4">
                                    <label for="guardCnic">CNIC:</label>
                                    <input id="guardCnic" type="number" className="form-control" placeholder="CNIC Number" onChange={(e) => setGcnic(e.target.value)} />
                                </div>
                                <div className="col-4">
                                    <label for="email">Email:</label>
                                    <input id="email" type="email" className="form-control" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="form-group col-4">
                                    <label for="guardAddress">Residential Address</label>
                                    <textarea className="form-control" id="guardAddress" rows="1" onChange={(e) => setGaddress(e.target.value)}></textarea>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label for="age">Occupation:</label>
                                    <input id="age" type="text" className="form-control" placeholder="Occupation" onChange={(e) => setGage(e.target.value)} />
                                </div>
                                <div className="col">
                                    <label for="age">Nationality:</label>
                                    <input id="age" type="text" className="form-control" placeholder="Nationality" onChange={(e) => setGage(e.target.value)} />
                                </div>
                                <div className="col">
                                    <label for="age">Religion:</label>
                                    <input id="age" type="text" className="form-control" placeholder="Religion" onChange={(e) => setGage(e.target.value)} />
                                </div>
                            </div>
                        </fieldset>

                        <fieldset className="mt-4 field_box shadow">
                            <legend>Siblings Studying</legend>
                            {inputList.map((item, i) => {
                                return (
                                    <div key={i} class="row">
                                        <div className="col">
                                            <label for="name">Name:</label>
                                            <input id="name" type="text" name="sibling_name" value={item.sibling_name} onChange={e => handleChange(e, i)} className="form-control" placeholder="Full Name" onChange={(e) => setGname(e.target.value)} />
                                        </div>
                                        <div className="col">
                                            <label for="age">Age:</label>
                                            <input id="age" type="number" name="sibling_age" value={item.sibling_age} onChange={e => handleChange(e, i)} className="form-control" placeholder="Age" onChange={(e) => setGage(e.target.value)} />
                                        </div>
                                        <div className="col">
                                            <label for="class">Class:</label>
                                            <input id="class" type="number" name="sibling_class" value={item.sibling_class} onChange={e => handleChange(e, i)} className="form-control" placeholder="Class" onChange={(e) => setGphone(e.target.value)} />
                                        </div>
                                        <div class="col-1 mt-4">
                                            {inputList.length - 1 === i &&
                                                <button type="button" onClick={handleAdd} class="btn btn-primary mt-1">Add</button>
                                            }

                                        </div>
                                    </div>
                                )
                            })}
                            {/* <div className="row">
                            <div className="col">
                                <label for="name">Name:</label>
                                <input id="name" type="text" name="sibling_name" value={item.sibling_name} onChange={e => handleChange(e, i)} className="form-control" placeholder="Full Name" onChange={(e) => setGname(e.target.value)} />
                            </div>
                            <div className="col">
                                <label for="age">Age:</label>
                                <input id="age" type="number" name="sibling_age" value={item.sibling_age} onChange={e => handleChange(e, i)} className="form-control" placeholder="Age" onChange={(e) => setGage(e.target.value)} />
                            </div>
                            <div className="col">
                                <label for="class">Class:</label>
                                <input id="class" type="number" name="sibling_class" value={item.sibling_class} onChange={e => handleChange(e, i)} className="form-control" placeholder="Class" onChange={(e) => setGphone(e.target.value)} />
                            </div>
                        </div> */}

                        </fieldset>








                        {/* <fieldset className="mt-4 field_box shadow">
                        <legend>Employee Portal</legend>
                        <div class="row">
                            <div className="col">
                                <label for="descrip">Description:</label>
                                <input id="descrip" type="text" className="form-control" placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
                            </div>
                            <div className="col">
                                <label for="devname">Device Name:</label>
                                <input id="devname" type="text" className="form-control" placeholder="Device Name" onChange={(e) => setDevname(e.target.value)} />
                            </div>
                            <div className="col">
                                <label for="makeAddress">Make Address:</label>
                                <input id="makeAddress" type="text" className="form-control" placeholder="Make Address" onChange={(e) => setMakeaddress(e.target.value)} />
                            </div>
                        </div>

                    </fieldset> */}


                        <fieldset className="mt-4 field_box shadow">
                            <legend>Requirements</legend>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="agreed" id="a1" /*onChange={(e) => setTerms(e.target.value)}*/ />
                                <label className="form-check-label" for="a1">
                                    Birth Certificte with photocopy. (Orignal certificate will be returned & photocopy retained)
                    </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="agreed" id="a2" /*onChange={(e) => setTerms(e.target.value)}*/ />
                                <label className="form-check-label" for="a2">
                                    T.C (from last school attended)
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="agreed" id="a3" /*onChange={(e) => setTerms(e.target.value)}*/ />
                                <label className="form-check-label" for="a3">
                                    Photocopy of valid CNIC (both father & mother and form-B from NADRA)
                                </label>
                            </div>


                        </fieldset>

                        <div className="btn text-center mx-auto w-100">
                            <button type="button" className="btn btn-success w-100">Submit</button>
                        </div>

                    </form>
                </div>
            </div>

        </>);
};

export default Form;