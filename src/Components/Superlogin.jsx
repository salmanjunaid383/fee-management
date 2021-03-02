import {React,useState} from "react";
import './superlogin.css'
const Superlogin = () => {
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    console.log(email);
    console.log(password);
    return (
        <>
            <div class="main">

                <div class="form-box">

                    <form id="login" class="login">
                    <h3>Administrator Login</h3>
                        <div class="input-icons">
                        {/* <i class="fa fa-envelope icon"></i> */}
                        <input type="text" class="input-field" placeholder="Email" onChange={(e) =>setEmail(e.target.value)} required autoFocus/>
                        <input type="password" class="input-field" placeholder="Password" onChange={(e) =>setPassword(e.target.value)} required />
                        </div>
                        <input type="checkbox" class="chk-box" /><span>Remember Password</span>
                        <button type="submit" class="submit-btn">Log In</button>

                    </form>
                </div>
            </div>
        </>
    );
};
export default Superlogin;