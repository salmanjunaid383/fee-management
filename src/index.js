import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import axios from "axios";

axios
.get(`http://fee-management-api.nastechltd.co/api/school_profile/${localStorage.getItem("school_id")}`).then((response) => {
    console.log(response.data)
    window.img=response.data;
})
ReactDOM.render(
    <>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </>, document.getElementById("root"))