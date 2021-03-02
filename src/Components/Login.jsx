import { React, useEffect, useState } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import './superlogin.css';
import { Link, useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';


const Login = () => {
    const history = useHistory();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    console.log(email);
    console.log(password);
    const data = {
        email: email,
        password: password
    }
    const sendData = () => {
        axios.post(`http://fee-management-api.nastechltd.co/api/login`, data)
            .then(response => {
                console.log(response)
                localStorage.setItem("token",response.data)
                var token = response.data
                var decoded = jwt_decode(token)
                if (decoded.role == 'SuperAdmin') {
                    history.push("/super")
                }
                else if(decoded.role == 'Administrator'){
                    localStorage.setItem("admin_id",decoded.sub)
                    history.push("/dashboard")
                }

            })
    
            .catch (error => console.log(error));

    }
return (
    <>

        <div class="main">

            <div class="form-box">

                <form id="login" onSubmit={(e) => e.preventDefault()} class="login">
                    <h3>Login</h3>
                    <div class="input-icons">
                        <input type="text" class="input-field" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required autoFocus />
                        <input type="password" class="input-field" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />

                    </div>
                    <button type="submit" onClick={sendData} class="submit-btn">Log In</button>

                </form>
            </div>
        </div>
    </>
);
};
export default Login;