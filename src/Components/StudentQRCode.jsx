import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import QRCode from "qrcode"

const StudentQRCode = () => {
    const [src , setSRC]= useState("")

    useEffect(() =>{

QRCode.toDataURL("salman").then((res)=>{
    setSRC(res)
})

    },[])

    return(
        <>
            <img src={src} />
        </>
    )
}
export default StudentQRCode;