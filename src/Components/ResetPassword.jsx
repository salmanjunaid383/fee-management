import { React, useEffect, useState } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import './superlogin.css';
import { Link, useHistory, useParams } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';


const ResetPassword = () => {
    const history = useHistory();
    const {userid} = useParams();
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
    const [confirmpassword, setConfirmpassword] = useState('');
    const [password, setPassword] = useState('');
    const data = {
        password: password
    }
    const changePassword = () => {
        if (password !== confirmpassword){
            setMessageinfo("Password Does not Match")
            handleMessage();
        }
        else if (password === ''){
            setMessageinfo("Enter Password")
            handleMessage();
        } 
        else{
            axios.put(`http://fee-management-api.nastechltd.co/api/password/${userid}`, { password: password })
                .then(response => {
                    console.log(response)
                    setPassword('')
                    setConfirmpassword('')
                    setMessageinfo("Password Changed");
                    handleMessage();
                    setTimeout(()=>{
                        history.push("/")
                    },500)
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
                        <h3 class="login-heading">Reset Password</h3>
                        <div class="input-icons">
                            <input type="password" class="input-field" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
                            <input type="password" class="input-field" placeholder="Confirm Password" onChange={(e) => setConfirmpassword(e.target.value)} required />
                        </div>
                        <button type="submit" onClick={changePassword} class="submit-btn">Log In</button>

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
export default ResetPassword;