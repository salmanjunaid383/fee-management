import React, { useState, useEffect } from "react";
import "../Components/expenseform.css";
import { Link, useHistory } from "react-router-dom";
import logo from "../Components/formfrontimg.jpg";
import TextField from "@material-ui/core/TextField";
const ExpenseForm = () => {
  return (
    <>
      <div className="background">
        <div className="main-parent row">
          {/* <div className="col-xl-4" style={{height:"100%"}}>
            <img src={logo} width="100%" height="100%" />
          </div> */}
          <div className="col-xl-8">
            <div className="content">
              <div className="col-xl-12 text-center">
                <h4>WONDERLAND GRAMMAR SEC. SCHOOL</h4>
                <h6 style={{fontWeight:"bold", fontSize:"15px"}}>DEBIT/CREDIT VOUCHER</h6>
              </div>
              <div className="row" style={{ display: "flex" }}>
                <div class="col-4 ">
                  <TextField
                    className="pb-3"
                    type="text"
                    label="Quantity"
                    //   onChange={(e) => setQuantity(e.target.value)}
                    //   variant="filled"
                  />
                </div>

                <div class="col-4 ">
                  <TextField
                    className="pb-3"
                    type="text"
                    label="Quantity"
                    //   onChange={(e) => setQuantity(e.target.value)}
                    //   variant="filled"
                  />
                </div>

                <div class="col-4 ">
                  <TextField
                    className="pb-3"
                    type="text"
                    label="Quantity"
                    //   onChange={(e) => setQuantity(e.target.value)}
                    //   variant="filled"
                  />
                </div>

                <div class="col-xl-12 ">
                  <TextField
                    style={{ width: "100%" }}
                    className="pb-3"
                    type="text"
                    label="Quantity"
                    //   onChange={(e) => setQuantity(e.target.value)}
                    //   variant="filled"
                  />
                </div>

                <div class="col-xl-12 ">
                  <TextField
                    style={{ width: "100%" }}
                    className="pb-3"
                    type="text"
                    label="Quantity"
                    //   onChange={(e) => setQuantity(e.target.value)}
                    //   variant="filled"
                  />
                </div>

                <div class="col-xl-12 ">
                  <TextField
                    style={{ width: "100%" }}
                    className="pb-3"
                    type="text"
                    label="Quantity"
                    //   onChange={(e) => setQuantity(e.target.value)}
                    //   variant="filled"
                  />
                </div>

                <div class="col-xl-6 ">
                  <TextField
                    style={{ width: "100%" }}
                    className="pb-3"
                    type="text"
                    label="Quantity"
                    //   onChange={(e) => setQuantity(e.target.value)}
                    //   variant="filled"
                  />
                </div>

                <div class="col-xl-6 ">
                  <TextField
                    style={{ width: "100%" }}
                    className="pb-3"
                    type="text"
                    label="Quantity"
                    //   onChange={(e) => setQuantity(e.target.value)}
                    //   variant="filled"
                  />
                </div>

                <div class="col-xl-6 ">
                  <TextField
                    style={{ width: "100%" }}
                    className="pb-3"
                    type="text"
                    label="Quantity"
                    //   onChange={(e) => setQuantity(e.target.value)}
                    //   variant="filled"
                  />
                </div>

                <div class="col-xl-6 ">
                  <TextField
                    style={{ width: "100%" }}
                    className="pb-3"
                    type="text"
                    label="Quantity"
                    //   onChange={(e) => setQuantity(e.target.value)}
                    //   variant="filled"
                  />
                </div>
                <div className="col-xl-12 text-right">
                    <button className="btn btn-primary" style={{fontWeight:"bold"}}>Save</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ExpenseForm;
