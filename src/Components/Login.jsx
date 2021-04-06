import { React, useEffect, useState } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import './superlogin.css';
import { Link, useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';


const Login = () => {
    const history = useHistory();
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
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const data = {
        email: email,
        password: password
    }
    const sendData = () => {
        if (email === '') {
            setMessageinfo("Enter Email")
            handleMessage();
        }
        else if (password === '') {
            setMessageinfo("Enter Password")
            handleMessage();

        }
        else {
            axios.post(`http://fee-management-api.nastechltd.co/api/login`, data)
                .then(response => {
                    console.log(response)
                    localStorage.setItem("token", response.data)
                    var token = response.data
                    var decoded = jwt_decode(token)
                    if (decoded.role === 'SuperAdmin') {
                        history.push("/super")
                    }
                    else if (decoded.role === 'Administrator') {
                        localStorage.setItem("admin_id", decoded.sub)
                        history.push("/school")
                    }
                    else if (decoded.role === 'Finance_employee') {
                        localStorage.setItem("employee_id", decoded.sub)
                        history.push("/employeedashboard")
                    }
                    else if (decoded.role === 'Student') {
                        history.push(`/studentledger/${decoded.sub}`)

                    }

                })

                .catch((error) => {
                    if (error.response) {
                        setMessageinfo(error.response.data.message);
                        handleMessage();
                    }
                })
        }

    }
    return (
        <>

            <div class="main">

                <div class="form-box">

                    <form id="login" onSubmit={(e) => e.preventDefault()} class="login">
                        <h3 class="login-heading">Login</h3>
                        <div class="input-icons">
                            <input type="text" class="input-field" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required autoFocus />
                            <input type="password" class="input-field" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
                            <Link to="/forgetpassword"><small>Forgotten Password</small></Link>
                        </div>
                        <button type="submit" onClick={sendData} class="submit-btn">Log In</button>

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
export default Login;