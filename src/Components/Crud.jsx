import React, { useState, useEffect } from "react";
import MultiSelect from "react-multi-select-component";
import axios from 'axios'
// import "./stylens.css";

const Paro = () => {
  const [selected, setSelected] = useState([]);
  const [discount, setDiscount] = useState();
  const [studentdata, setStudentdata] = useState([]);
  const school_id = localStorage.getItem("school_id")

  useEffect(() => {
    axios.get(`http://fee-management-api.nastechltd.co/api/student/1`)
      .then(response => {
        console.log(response);
        setStudentdata(response.data);
      })
      .catch((error) => {
        if (error.response) {
          alert(error.response.data.message);
        }
      })
  }, [])
  const data = {
    students: selected,
    discount: 1000,
    school_id: school_id

}

const sendData = () => {
    axios.post(`http://fee-management-api.nastechltd.co/api/discount`, data)
        .then(response => {
            console.log(response);
            setDiscount();
            
        })
        .catch(error => {
            console.log(error);
            alert("Enter Valid Field(s)")
        })
}

  const options = studentdata.map(val => ({
    label: `${val.first_name} ${val.middle_name} ${val.last_name}`, value: val.id

  }))
  console.log(selected)
// const options = [
//   { label: "Mango 🥭", value: "mango" }
//   { label: "Strawberry 🍓", value: "strawberry" }
// ]



  return (
    <>
    <div>
      <h1>Select Fruits</h1>
      <MultiSelect
        options={options}
        value={selected}
        onChange={setSelected}
        labelledBy={"Select"}
      />
    </div>
    <button onClick={sendData}>send</button>
    </>
  );


  // const [inputList, setInputList] = useState([
  //   {firstName :"Muhammad" , lastName : "Jahanzaib"},
  //   {firstName :"Muhammad" , lastName : "Uzair"}
  // ]);
  // const handleChange = (e, index ) => {
  //   const {name , value} = e.target;
  //   const list = [...inputList];
  //   list [index][name] = value ;
  //   setInputList(list);

  // }
  //   const [inputList,setInputList]=useState([
  //     {Description : "",Charges :""}
  // ]);

  // const handleChange = (e,index) => {
  //     const {name,value} = e.target;
  //     const list = [...inputList];
  //     list[index][name]= value;
  //     setInputList(list);
  // }
  // const handleAdd = () => {
  //     setInputList([...inputList,{Description:"", Charges:""}]);   
  // }
  // const [inputListYear,setInputListYear]=useState([
  //     {DescriptionYear : "",ChargesYear :""}
  // ]
  // );

  // const handleChangeY = (e,index) => {
  //     const {name,value} = e.target;
  //     const list = [...inputListYear];
  //     list[index][name]= value;
  //     setInputListYear(list);
  // }
  // const handleAddY = () => {
  //     setInputListYear([...inputListYear,{DescriptionYear:"", ChargesYear:""}]);   
  // }

  //   return(
  //     <>
  //     <div   class="paro">
  //       <b>Jahanaib</b>
  //       { inputList.map((item , i) =>{

  //         return (
  //           <div key={i} class="paro_box">
  //         <input 
  //         type="text" 
  //         name="firstName"
  //         placeholder="First Name"
  //         value={item.firstName}
  //         onChange={ (e) => handleChange (e, i  )}
  //         />
  //         <input 
  //         type="text" 
  //         name="lastName"
  //         placeholder="Last Name"
  //         value={item.lastName}
  //         onChange={ (e) => handleChange (e, i  )}
  //         />
  //         <input
  //          type="button" 
  //          value="remove"
  //          onClick={handleAdd}
  //          />
  //          <input
  //          type="button" 
  //          value="Add"
  //          />
  //       </div>

  //         )

  //       })}

  //       <pre>
  //         {
  //           JSON.stringify(inputList, null, 2)
  //         }
  //       </pre>
  //     </div>
  //     </>

  //   );
};
export default Paro;