import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Components/reports.css";
import Checkbox from "@mui/material/Checkbox";
const label = { inputProps: { "aria-label": "Checkbox demo" } };

const PrintWarning = () => {
  const TcPrintID = localStorage.getItem("tc_print_id");
  const [AllRecord, setallrecord] = useState("");
  const [allclass, setAllClass] = useState("");
  const [allsection, setAllSection] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    axios
      .get(
        `http://fee-management-api.nastechltd.co/api/issued_tc/${localStorage.getItem("TcPrint")}`
      )
      .then((response) => {
        console.log(response);
        setallrecord(response.data);
      });

    axios
      .get(
        `http://fee-management-api.nastechltd.co/api/gr_no/${localStorage.getItem("gr_no")}`
      )
      .then((response) => {
        console.log(response);
        setAllClass(response.data.class);
        setAllSection(response.data.section);
        setDate(response.data.date);
      });
  }, []);

  return (
    <>
    <div className="container" style={{ width: "80%" }}>
        <div className="row">
          <div className="col-xl-6 f-sec-col">
            <img src="" alt="logo" />

            <h4>Wonderland Grammer Sec. School</h4>
          </div>
        </div>

        <div className="row">
          <div className="col-xl-12 s-sec-col">
            <h6>....a positive change towards education</h6>
          </div>
        </div>

        <div className="row">
          <div className="col-xl-12">
          <div className="" style={{ display: "flex" }}>
              <input
                type="text"
                className="for-input-change"
                placeholder="G.R No"
                style={{ width: "15%" }}
               
              />
         
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-xl-12 t-sec-col">
            <h5>Warning Slip</h5>
          </div>
        </div>

        <div className="row">
          <div className="col-xl-12">
            <h5 style={{ fontWeight: "bold" }}>Dear Parents:</h5>
          </div>
        </div>

        <div className="row">
          <div className="col-xl-12">
            <p>
              We would like to bring the following ticked points to your notice,
              We hope that you will take necessary action
            </p>
          </div>

          {/* CHECK BOXES  */}

          <div>
            <p>
              {" "}
              1.{" "}
              <Checkbox
                value="Your ward does not behave properly"
                {...label}
                
              />{" "}
              Your ward does not behave properly
            </p>
            <p>
              {" "}
              2.{" "}
              <Checkbox
                value="Doe not come in proper uniform"
                {...label}
                
              />{" "}
              Doe not come in proper uniform
            </p>
            <p>
              {" "}
              3.{" "}
              <Checkbox
                value="Does not do homework"
                {...label}
                
              />{" "}
              Does not do homework
            </p>
            <p>
              {" "}
              4.{" "}
              <Checkbox
                value="Does not pay attention to the lesson in
              class"
                {...label}
                
              />{" "}
              Does not pay attention to the lesson in class
            </p>
            <p>
              {" "}
              5.{" "}
              <Checkbox
                value="Does not take interest in class
              discussion"
                {...label}
                
              />{" "}
              Does not take interest in class discussion
            </p>
            <p>
              {" "}
              6.{" "}
              <Checkbox
                value="Your ward is always irregular"
                {...label}
                
              />{" "}
              Your ward is always irregular
            </p>
            <p>
              {" "}
              7.{" "}
              <Checkbox
                value="Your ward always comes late to the
              school"
                {...label}
                
              />{" "}
              Your ward always comes late to the school
            </p>
            <p>
              {" "}
              8.{" "}
              <Checkbox
                value="Does not bring complete books/copies
              according to the time table"
                {...label}
                
              />{" "}
              Does not bring complete books/copies according to the time table
            </p>
            <p>
              {" "}
              9.{" "}
              <Checkbox
                value="keep long hair / nails"
                {...label}
                
              />{" "}
              keep long hair / nails
            </p>
            <p>
              {" "}
              10.{" "}
              <Checkbox
                value="Has lice in hair"
                {...label}
                
              />{" "}
              Has lice in hair
            </p>
            <p>
              {" "}
              11.{" "}
              <Checkbox
                value="Has lice in hair"
                {...label}
                
              />{" "}
              Has lice in hair
            </p>
            <p>
              {" "}
              12.{" "}
              <Checkbox
                value="Is week in subjects"
                {...label}
                
              />{" "}
              Is week in subjects
            </p>
            <p>
              {" "}
              13.{" "}
              <Checkbox
                value="Irregular during assignments"
                {...label}
               
              />{" "}
              Irregular during assignments
            </p>
          </div>
          <div className="col-xl-12">
            <div
              className="row"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <div
                className="col-xl-4"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                <h6>Date</h6>
                <input
                  type="text"
                  className="for-input-change"
                  style={{
                    width: "60%",
                    marginBottom: "20px",
                    marginRight: "5px",
                  }}
                />
              </div>

              <div
                className="col-xl-4"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                <h6>Class Teacher</h6>
                <input
               
                  type="text"
                  className="for-input-change"
                  style={{
                    width: "60%",
                    marginBottom: "20px",
                    marginRight: "5px",
                  }}
                />
              </div>

              <div
                className="col-xl-4"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                <h6>Principal</h6>
                <input
                 
                  type="text"
                  className="for-input-change"
                  style={{
                    width: "60%",
                    marginBottom: "20px",
                    marginRight: "5px",
                  }}
                />
              </div>

              <div className="dash-line"></div>

              <div className="col-xl-12">
                <p>
                  {" "}
                  Note: Parents must see the principal/In charge on
                  <input
                    type="text"
                    className="for-input-change"
                  /> between <input type="text" className="for-input-change" />{" "}
                  to <input type="text" className="for-input-change"  />
                  Please acknowledge this letter by signing this slip.
                </p>
              </div>

              <div className="row">
                <div
                  className="col-xl-3"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                  }}
                >
                  <h6>Name.</h6>
                  <input
                    type="text"
                    className="for-input-change"
                   
                    style={{
                      width: "60%",
                      marginBottom: "20px",
                      marginRight: "5px",
                    }}
                  />
                </div>

                <div
                  className="col-xl-3"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                  }}
                >
                  <h6>Class</h6>
                  <input
                    
                    type="text"
                    className="for-input-change"
                    style={{
                      width: "60%",
                      marginBottom: "20px",
                      marginRight: "5px",
                    }}
                  />
                </div>

                <div
                  className="col-xl-3"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                  }}
                >
                  <h6>Sec</h6>
                  <input
                 
                    type="text"
                    className="for-input-change"
                    style={{
                      width: "60%",
                      marginBottom: "20px",
                      marginRight: "5px",
                    }}
                  />
                </div>

                <div
                  className="col-xl-3"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                  }}
                >
                  <h6>Complaint No.</h6>
                  <input
                    
                    type="text"
                    className="for-input-change"
                    style={{
                      width: "50%",
                      marginBottom: "20px",
                      marginRight: "5px",
                    }}
                  />
                </div>

                <div
                  className="col-xl-12"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                  }}
                >
                  <div
                    className=""
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      marginTop: "20px",
                    }}
                  >
                    <input
                  
                      type="text"
                      className="for-input-change"
                      style={{
                        width: "100%",
                      }}
                    />
                    <h6>Signature.</h6>
                  </div>
                  <div
                    className="col-xl-12"
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <button className="btn btn-success"  style={{height:"30px",display:"flex",alignItems:"center"}}>
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}
  export default PrintWarning;