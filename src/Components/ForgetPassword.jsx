import { React, useEffect, useState } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import './superlogin.css';
import { Link, useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';


const ForgetPassword = () => {
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
    const data = {
        email: email,
    }
    const sendData = () => {
        if (email === '') {
            setMessageinfo("Enter Email")
            handleMessage();
        }
        else {
            if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
                axios.post(`http://fee-management-api.nastechltd.co/api/email_password`, data)
                    .then(response => {
                        console.log(response)
                        setMessageinfo("Go Check You Inbox");
                        handleMessage();
                    })
                    .catch((error) => {
                        if (error.response) {
                            setMessageinfo(error.response.data.message);
                            handleMessage();
                        }
                    })
            }
            else {
                setMessageinfo("Enter Valid Email")
                handleMessage();

            }
        }

    }
    return (
        <>

            <div class="main">

                <div class="form-box">

                    <form id="login" onSubmit={(e) => e.preventDefault()} class="login">
                        <h3 class="login-heading">Confirm Email</h3>
                        <div class="input-icons">
                            <input type="text" class="input-field" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required autoFocus />
                        </div>
                        <button type="submit" onClick={sendData} class="submit-btn">Send</button>

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
export default ForgetPassword;