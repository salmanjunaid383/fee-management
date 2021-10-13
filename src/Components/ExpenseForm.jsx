import React, { useState, useEffect } from "react";
import "../Components/expenseform.css";
import { Link, useHistory,useParams } from "react-router-dom";
import logo from "../Components/formfrontimg.jpg";
import TextField from "@material-ui/core/TextField";
import { Select } from "@material-ui/core";
import { MenuItem } from "@material-ui/core";
import axios from "axios";
const ExpenseForm = () => {
  const{voucherId}=useParams();
  
  const schoolId=localStorage.getItem("school_id");
  const[voucher,setVoucher]=useState([]);
  const[ledgersAccount,setLedgersAccount]=useState([]);
  const[expanseArry,setExpanseArray]=useState([{
    ref_no:voucherId,
    account_title:"",
    paid_to:"",
    amount:0,
    payment_type:"Cash",
    bank:"",
    due_on:"",
    description:"",
    school_id:schoolId,
    ledger_account_id:""
  }])

  useEffect(() => {
    axios.get('http://fee-management-api.nastechltd.co/api/voucher/'+voucherId)
        .then( (response) => {
            setVoucher(response.data.FeeVoucher.final_amount);
            console.log(response.data);
        }, (error) => {
            alert("No voucher found with that specific id.")
            console.log(error)
        })
    axios.get('http://fee-management-api.nastechltd.co/api/show_school_account/'+schoolId)
        .then( (response) => {
            setLedgersAccount(response.data);
        }, (error) => {
            console.log(error)
        })
    
  },[voucherId,schoolId])
  function AddMore() {
    console.log(expanseArry)
    setExpanseArray([...expanseArry, { ref_no:voucherId,
      account_title:"",
      paid_to:"",
      amount:0,
      payment_type:"Cash",
      bank:"",
      due_on:"",
      description:"",
      school_id:schoolId,
      ledger_account_id:"" }]);
  }
  function handleChange(e, index) {
    const { name, value } = e.target;
    const list = [...expanseArry];
    list[index][name] = value;
    setExpanseArray(list);
  }
  function Remove(i) {
    const list = [...expanseArry];
    list.pop(i);
    setExpanseArray(list);
  }
  function submit(){
    
    var sum = 0;
    
    expanseArry.forEach(element => {
      sum = sum + parseInt(element.amount);
    });
    console.log(sum)
    if(voucher<sum){
      alert("Total sum of expanse is greater then voucher amount");
    }
    if(voucher>sum){
      alert("Total sum is less then voucher amount")
    }
    if(voucher===sum){
      console.log(expanseArry);
      axios
      .post(`http://fee-management-api.nastechltd.co/api/schools_expense`, {
        expenses: expanseArry,
      })
      .then(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
    }
    else{
      alert("Something went wrong, please try again later")
    }
  }
  return (
    <>
      <div className="background">
        <div className="main-parent row">
          {/* <div className="col-xl-4" style={{height:"100%"}}>
            <img src={logo} width="100%" height="100%" />
          </div> */}
          <div className="container">
          
            <div className="content">
              <div className="col-xl-12 text-center">
                <h4>WONDERLAND GRAMMAR SEC. SCHOOL</h4>
                <h6 style={{fontWeight:"bold", fontSize:"15px"}}>DEBIT/CREDIT VOUCHER</h6>
              </div>
              <div className="col-xl-12 text-left" style={{paddingLeft:'0px'}}>
              <h6 style={{fontWeight:"bold", fontSize:"15px"}}>Total Amount : {voucher}</h6>
              </div>
              
                
                {
                  expanseArry.map((val,i) => {
                    return (
                      <>
                      <hr></hr>
                      <div className="row" style={{ display: "flex" }}>
                      <div className="col-md-4">
                        <TextField
                        onChange={(e) => handleChange(e, i)}
                        id="standard-textarea"
                        name="account_title"
                        label="Account Title"
                        placeholder="Add value"
                        type="text"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        />
                      </div>

                      <div className="col-md-4">
                        <TextField
                        onChange={(e) => handleChange(e, i)}
                        id="standard-textarea"
                        name="paid_to"
                        label="Paid To"
                        placeholder="Add value"
                        type="text"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        />
                      </div>

                      <div className="col-md-4">
                        <TextField
                        onChange={(e) => handleChange(e, i)}
                        id="standard-textarea"
                        name="amount"
                        label="Amount"
                        placeholder="Add value"
                        type="number"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        />
                      </div>
                        
                      <div className="col-md-4" style={{marginTop:'10px'}}>
                        <TextField
                        onChange={(e) => handleChange(e, i)}
                        id="standard-textarea"
                        name="amount_in_words"
                        label="Amount in words"
                        placeholder="Add value"
                        type="text"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        />
                      </div>

                      <div className="col-md-4" style={{marginTop:'10px'}}>
                    <TextField
                      onChange={(e) => handleChange(e, i)}
                      select
                      id="standard-textarea"
                      name="payment_type"
                      label="Payment"
                      helperText="Please select your payment method"
                      
                    >
                      <MenuItem key={"Cash"} value={"Cash"}>Cash</MenuItem>
                      <MenuItem key={"Check"} value={"Check"}>Check</MenuItem>
                      <MenuItem key={"IBFT"} value={"IBFT"}>IBFT</MenuItem>
                    </TextField>
                        
                      </div>

                      <div className="col-md-4" style={{marginTop:'10px'}}>
                        <TextField
                        onChange={(e) => handleChange(e, i)}
                        id="standard-textarea"
                        name="bank"
                        label="Bank Name"
                        placeholder="Add value"
                        type="text"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        />
                      </div>
                      

                      <div className="col-md-4" style={{marginTop:'10px'}}>
                        <TextField
                        onChange={(e) => handleChange(e, i)}
                        id="standard-textarea"
                        name="due_on"
                        label="Due on"
                        placeholder="Add value"
                        type="date"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        />
                      </div>
                        <div className="col-md-4" style={{marginTop:'10px'}}>
                        <TextField
                        onChange={(e) => handleChange(e, i)}
                        id="standard-textarea"
                        name="description"
                        label="Description"
                        placeholder="Add value"
                        type="text"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        />
                        </div>
                        <div className="col-md-4" style={{marginTop:'10px'}}>
                        <TextField
                        id="filled-select-currency-native"
                        select
                        onChange={(e) => handleChange(e, i)}
                        name="ledger_account_id"
                        label="Ledger Account"                        
                        helperText="Please select your Account"
                        >
                        {ledgersAccount.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.name}
                        </MenuItem>
                        ))}
                        </TextField>
                        
                        
                      </div>
                      </div>
                      </>
                    )
                  })
                }

                <br></br>
                <div className="row">
                <div className="col-xl-12 text-right">
                    <button className="btn btn-primary" onClick={AddMore} style={{fontWeight:"bold",marginRight:'5px'}}>Add More</button>
                    <button className="btn btn-success" onClick={submit} style={{fontWeight:"bold"}}>Submit</button>
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
