import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Components/reports.css";

const PickupPrint = () => {
  const TcPrintID = localStorage.getItem("tc_print_id");
  const [AllRecord, setallrecord] = useState("");
  const [allclass, setAllClass] = useState("");
  const [allsection, setAllSection] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    axios
      .get(
        `http://fee-management-api.nastechltd.co/api/pickup_slip/${TcPrintID}`
      )
      .then((response) => {
        console.log(response);
        setallrecord(response.data);
      });

    axios
      .get(
        `http://fee-management-api.nastechltd.co/api/gr_no/${localStorage.getItem(
          "gr_no"
        )}`
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
      <div className="container">
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
          <div className="col-xl-12 t-sec-col">
            <h5>Student's Early Pick up Slip</h5>
          </div>
        </div>
      </div>

      {/* input fields  */}

      <form>
        <fieldset className="mt-4 field_box shadow">
          <div className="row" style={{ width: "80%", margin: "auto" }}>
            <div
              className="col-3"
              style={{ display: "flex", alignItems: "center" }}
            >
              <label for="fname">G.R. No:</label>
              <input
                defaultValue={AllRecord.G_R_NO}
                
                style={{
                  width: "40%",
                  border: "none",
                  borderRadius: "0px",
                  borderBottom: "1px solid #000",
                  outline: "none",
                }}
                type="text"
                className="form-control"
                placeholder="G.R No"
              />
            </div>

            <div
              className="col-3"
              style={{ display: "flex", alignItems: "center" }}
            >
              <label for="fname">Class:</label>
              <input
                defaultValue={AllRecord.class_id}
                style={{
                  width: "40%",
                  border: "none",
                  borderRadius: "0px",
                  borderBottom: "1px solid #000",
                  outline: "none",
                }}
                id="fname"
                defaultValue={allclass.name}
                type="text"
                className="form-control"
                placeholder="Class"
              />
            </div>

            <div
              className="col-3"
              style={{ display: "flex", alignItems: "center" }}
            >
              <label for="fname">Section:</label>
              <input
                style={{
                  width: "40%",
                  border: "none",
                  borderRadius: "0px",
                  borderBottom: "1px solid #000",
                  outline: "none",
                }}
                id="fname"
                defaultValue={allsection.name}
                type="text"
                className="form-control"
                placeholder="Section"
              />
            </div>

            <div
              className="col-3"
              style={{ display: "flex", alignItems: "center" }}
            >
              <label for="fname">Date:</label>
              <input
                style={{
                  width: "55%",
                  border: "none",
                  borderRadius: "0px",
                  borderBottom: "1px solid #000",
                  outline: "none",
                }}
                id="fname"
                defaultValue={date}
                type="text"
                className="form-control"
                placeholder="Date"
              />
            </div>

            <div className="row" style={{ marginTop: "30px" }}>
              <div className="col-4">
                <label id="for_input_heading">Student Name:</label>
                <input
                id="for_input"
                  type="text"
                  defaultValue={AllRecord.name}
                  placeholder="Enter your name"
                  className="form-control"
                />
              </div>

              <div className="col-4">
                <label   id="for_input_heading" >Reason for early pickup:</label>
                <input
                id="for_input"
                  defaultValue={AllRecord.reason_for_pickup}
                  type="text"
                  placeholder="Reason for early pickup:"
                  className="form-control"
                />
              </div>

              <div className="col-4">
                <label id="for_input_heading">Time of picking up:</label>
                <input
                id="for_input"
                  defaultValue={AllRecord.timing_of_picking_up}
                  type="text"
                  placeholder="Time of picking up:"
                  className="form-control"
                />
              </div>

              <div className="col-4">
                <label id="for_input_heading">Relation with the student:</label>
                <input
                id="for_input"
                  defaultValue={AllRecord.realation_with_student}
                  type="text"
                  placeholder="Relation with the student:"
                  className="form-control"
                />
              </div>

              <div className="col-4">
                <label id="for_input_heading">Address:</label>
                <input
                id="for_input"
                  defaultValue={AllRecord.address}
                  type="text"
                  defaultValue={AllRecord.address}
                  placeholder="Address:"
                  className="form-control"
                />
              </div>

              <div className="col-4">
                <label id="for_input_heading">Remarks:</label>
                <input
                id="for_input"
                  defaultValue={AllRecord.remarks}
                  type="text"
                  placeholder="Remarks:"
                  className="form-control"
                />
              </div>

              <div className="col-4">
                <label id="for_input_heading">Name of the person:</label>
                <input
                id="for_input"
                  defaultValue={AllRecord.name_of_person}
                  type="text"
                  placeholder="Name of the person:"
                  className="form-control"
                />
              </div>

              <div className="col-4">
                <label id="for_input_heading">CNIC:</label>
                <input
                id="for_input"
                  defaultValue={AllRecord.CNIC}
                  type="text"
                  placeholder="CNIC:"
                  className="form-control"
                />
              </div>

              <div className="col-4">
                <label id="for_input_heading">Cell</label>
                <input
                id="for_input"
                  defaultValue={AllRecord.cell}
                  type="text"
                  placeholder="Cell"
                  className="form-control"
                />
              </div>
            </div>
            <div className="col-12" style={{ marginTop: "40px" }}>
              <h5 style={{ fontWeight: "400" }}>Thank You,</h5>
            </div>
            <div className="col-5" style={{ marginTop: "30px" }}>
              <input
                type="text"
                style={{ border: "none", borderBottom: "1px solid #000" }}
              />
              <h6 style={{ fontWeight: "bold" }}>Principal's Signature</h6>
            </div>

            <div className="col-5" style={{ marginTop: "30px" }}>
              <input
                type="text"
                style={{ border: "none", borderBottom: "1px solid #000" }}
              />
              <h6 style={{ fontWeight: "bold" }}>Signature of Parent's</h6>
            </div>

            <div className="col-xl-12 text-right">
              <button
                className="btn btn-success"
                id="bton"
                onClick={() => {
                  window.print();
                }}
                type="button"
              >
                Print
              </button>
            </div>
          </div>
        </fieldset>
      </form>
    </>
  );
};

export default PickupPrint;
