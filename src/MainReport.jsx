import React, { useState, useEffect } from "react";
import { useHistory, Link, useParams } from "react-router-dom";
import axios from "axios";

const MainReport = () => {
  return (
    <>
        <Link to="/TcReport"><button className="btn btn-primary mx-2 report_button">TC Report</button></Link>
        <Link to="/pickup-report"><button className="btn btn-primary mx-2 report_button">PickUp Slip</button></Link>
        <Link to="/WarningSlip"><button className="btn btn-primary mx-2  report_button">Warning Slip</button></Link>
        <Link to="/undertaking-report"><button className="btn btn-primary mx-2 report_button">Undertaking</button></Link>
    </>
  );
};
export default MainReport;
