import axios from 'axios';
import { React, useState } from 'react';
// import './css/style.css';
// import './fonts/material-icon/css/material-design-iconic-font.min.css';
import { Link, useHistory } from 'react-router-dom';
  

const Signup = () => {
    const history = useHistory();
    const [gender,setGender] = useState();
    const [email,setEmail] = useState();
    const [fname,setFname] = useState();
    const [lname,setLname] = useState();
    const [password,setPassword] = useState();
    const [confirmpassword,setConfirmpassword] = useState();
    const [contact,setContact] = useState();
    // const [age,setAge] = useState();
    console.log(fname);

    const formHandler = (e) => {
        e.preventDefault();
    }

   const data = {
        first_name: fname,
        last_name: lname,
        gender: gender,
        password: password,
        email: email,
        contact_no : contact,
        // age : age
    };
    
    
    const sendData = () => {
        if(password != confirmpassword){
            alert("Incorrect Password");
        }
        else{
        axios.post('http://fee-management-api.nastechltd.co/api/school_administrator', data )
        .then (response => 
            {console.log(response);
                console.log(response.data.id);
                localStorage.setItem("admin_id",response.data.id);
                history.push("/")
             } )
        .catch (error => console.log(error))
    }
    }
    
    return (
        <>
        
        {/* <section class="signup">
    <div class="container">
        <div class="signup-content">
            <div class="signup-form">
                <h2 class="form-title">Sign up</h2>
                <form method="POST" class="register-form" id="register-form">
                <div class="form-group">
                        <label for="Firstname"><i class="zmdi zmdi-account material-icons-name"></i></label>
                        <input type="text" name="Firstname" id="Firstname" placeholder="First Name"/>
                    </div>
                    <div class="form-group">
                        <label for="Lastname"><i class="zmdi zmdi-account material-icons-name"></i></label>
                        <input type="text" name="name" id="Lastname" placeholder="Last Name"/>
                    </div>
                    <div class="form-group">
                        <label for="email"><i class="zmdi zmdi-email"></i></label>
                        <input type="email" name="email" id="email" placeholder="Your Email"/>
                    </div>
                    <div class="form-group">
                        <label for="pass"><i class="zmdi zmdi-lock"></i></label>
                        <input type="password" name="pass" id="pass" placeholder="Password"/>
                    </div>
                    <div class="form-group">
                        <label for="re-pass"><i class="zmdi zmdi-lock-outline"></i></label>
                        <input type="password" name="re_pass" id="re_pass" placeholder="Confirm password"/>
                    </div>
                    <div class="form-group">
                        <input type="checkbox" name="agree-term" id="agree-term" class="agree-term" />
                        <label for="agree-term" class="label-agree-term"><span><span></span></span>I agree all statements in  <a href="#" class="term-service">Terms of service</a></label>
                    </div>
                    <div class="form-group form-button">
                        <input type="submit" name="signup" id="signup" class="form-submit" value="Register"/>
                    </div>
                </form>
            </div>
            <div class="signup-image">
                <figure><img src="assets/images/signup-image.jpg" alt="sing up image"/></figure>
                <Link to="/" class="signup-image-link">I am already member</Link>
            </div>
        </div>
    </div>
</section> */}
<div class="main">

<div class="form-box">

    <form id="login" onSubmit={formHandler} class="login">
    <h3>Signup</h3>
        <div class="input-icons">
        {/* <i class="fa fa-envelope icon"></i> */}
        <input type="text" class="input-field" placeholder="First Name" onChange={(e) =>setFname(e.target.value)}  required autoFocus/>
        <input type="text" class="input-field" placeholder="Last Name" onChange={(e) =>setLname(e.target.value)}  required />
        <input type="email" class="input-field" placeholder="Email" onChange={(e) =>setEmail(e.target.value)}  required />
        <input type="number" class="input-field" placeholder="Contact No." onChange={(e) =>setContact(e.target.value)}  required />
        {/* <input type="number" class="input-field" placeholder="Age(years)" onChange={(e) =>setAge(e.target.value)}  required /> */}
        <input type="password" class="input-field" placeholder="Password" onChange={(e) =>setPassword(e.target.value)} required />
        <input type="password" class="input-field" placeholder="Confirm Password" onChange={(e) =>setConfirmpassword(e.target.value)} required />
        <div class="gender-icon">
        <label>Gender:</label>
        <label for="male"><input id="male" type="radio" value="male" name="gender" onChange={(e) =>setGender(e.target.value)}/>Male</label>
        <label for="female"><input id="female" type="radio" value="female" name="gender" onChange={(e) =>setGender(e.target.value)}/>Female</label>
        </div>
        </div>
        <button type="submit" class="submit-btn" onClick={sendData}>Register</button>
        <span><Link to="/">Already A Member </Link></span>

    </form>
</div>
</div>

        </>
    );
};
export default Signup;