import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Components/reports.css";

const TcPrint = () => {
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
          <div
            className="col-xl-12"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div className="">
              <h6>The Principal</h6>
              <h6>WonderLand Grammer Secondary School</h6>
              <h6>Campus-I</h6>
              <h6>B-16, Block-10, F.B.Area</h6>
              <h6>Karachi.</h6>
              <br />
              <br />
              <h6>Dear Sir,</h6>
            </div>

            <div className="" style={{ display: "flex" , alignItems:"center" }}>
            <h6>G.R.</h6>
              <input
              defaultValue={AllRecord.G_R_NO}
              type="text"
                className="for-input-change"
                placeholder="G.R No"
                style={{ width: "50%" }}
                
              />
            
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-xl-12 t-sec-col" style={{ marginBottom: "20px" }}>
            <h5>ISSUE OF T.C.</h5>
          </div>
          <div className="col-xl-12">
            <p>
              I shall be thankfull if my son/daugther
              <input 
              type="text" style={{marginLeft:"10px", marginRight:"10px",textAlign:"center",width:"10%"}} className="for-input-change" defaultValue={AllRecord.name}/> S/O, D/O <input type="text" style={{marginLeft:"10px", marginRight:"10px",textAlign:"center",minWidth:"20%"}} defaultValue={AllRecord.father_name} className="for-input-change"  />
              studying in Class
              <input type="text" className="for-input-change" defaultValue={allclass.name} style={{textAlign:"center",width:"10%"}}/> is issued to
              me.
            </p>
          </div>
        </div>
        <br />
        <br />

        <div className="row">
          <div className="col-xl-12">
            <h6>The reason is as below:-</h6>
          </div>
          <div className="col-xl-12">
            <input
              defaultValue={AllRecord.reason}
              type="text"
              className="for-input-change"
              style={{ width: "100%", marginBottom: "20px" }}
            />
          </div>
          
        </div>

        <div className="col-xl-12">
          <p style={{ margin: "0px" }}>
            I have deposited/paid Rs.
            <input type="text" defaultValue={AllRecord.amount} style={{textAlign:"center",width:"10%"}} className="for-input-change"/> as your
            prescribed fee in this reguard.{" "}
          </p>
        </div>

        <br />
        <br />

        <div className="row">
          <div className="col-6">
            <input
              type="text"
              className="for-input-change"
              style={{ width: "50%",margin:"0px" }}
            />
            <h6>Name/Signature</h6>
          </div>
          <div
            className="col-6"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <h6>Date</h6>
            <input
            defaultValue={date}
              type="text"
              className="for-input-change"
              style={{ width: "50%" }}
            />
          </div>
        </div>

        <div
          className="col-xl-12"
          style={{
            padding: "0px",
            margin: "0px",
            marginBottom: "40px",
            marginTop: "40px",
          }}
        >
          <div
            className="line"
            style={{ height: "2px", width: "100%", backgroundColor: "#000" }}
          ></div>
        </div>

        <div className="col-xl-12">
          <h5 style={{ marginBottom: "30px" }}>Received T.C</h5>

          <div className="row">
            <div className="col-6">
              <input
                type="text"
                className="for-input-change"
                style={{ width: "50%" }}
              />
              <h6>Name/Signature</h6>
            </div>
            <div
              className="col-6"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <h6>Date</h6>
              <input
              defaultValue={date}
                type="text"
                className="for-input-change"
                style={{ width: "50%" }}
              />
            </div>
          </div>
        </div>
        <div
          className="col-xl-12"
          style={{
            padding: "0px",
            margin: "0px",
            marginBottom: "40px",
            marginTop: "40px",
          }}
        >
          <div
            className="line"
            style={{ height: "2px", width: "100%", backgroundColor: "#000" }}
          ></div>

          <div className="col-xl-12 t-sec-col">
            <h5>Office Use</h5>
          </div>
          <div className="row">
            <div
              className="col-4"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <h6>G.R.</h6>
              <input
              defaultValue={AllRecord.G_R_NO}
                type="text"
                className="for-input-change"
                style={{
                  width: "60%",
                  marginBottom: "20px",
                  marginRight: "5px",textAlign:"center",minWidth:"20%"
                }}
              />
            </div>

            <div
              className="col-4"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <h6>Name</h6>
              <input
                type="text"
                defaultValue={AllRecord.name}
                className="for-input-change"
                style={{
                  width: "60%",
                  marginBottom: "20px",
                  marginRight: "5px",textAlign:"center",minWidth:"20%"
                }}
              />
            </div>

            <div
              className="col-4"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <h6>Father Name</h6>
              <input
                type="text"
                className="for-input-change"
                defaultValue={AllRecord.father_name}
                style={{
                  width: "60%",
                  marginBottom: "20px",
                  marginRight: "5px",textAlign:"center",minWidth:"20%"
                }}
              />
            </div>

            <div
              className="col-4"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <h6>Issued to</h6>
              <input
              defaultValue={AllRecord.issued_to}
                type="text"
                className="for-input-change"
                style={{
                  width: "50%",
                  marginBottom: "20px",
                  marginRight: "5px",textAlign:"center",minWidth:"20%"
                }}
                
              />
            </div>

            <div
              className="col-4"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <h6>Remarks</h6>
              <input
              defaultValue={AllRecord.remarks}
                type="text"
                className="for-input-change"
                style={{
                  width: "54%",
                  marginBottom: "20px",
                  marginRight: "5px"
                  ,textAlign:"center",minWidth:"20%"
                  
                }}
                
              />
            </div>

            <div
              className="col-4"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <h6>Date of issue</h6>
              <input
              defaultValue={date}
                type="text"
                className="for-input-change"
                style={{
                  width: "60%",
                  marginBottom: "20px",
                  marginRight: "5px"
                  ,textAlign:"center",minWidth:"20%"
                }}
              />
            </div>
          </div>
          <div
            className="col-12"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <button className="btn btn-success" onClick={()=>{window.print()}} id="bton"  type="button">
              Print
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TcPrint;
