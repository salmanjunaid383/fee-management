import React, { useState } from 'react';

const Paro = () => {
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
  const [inputList,setInputList]=useState([
    {Description : "",Charges :""}
]);

const handleChange = (e,index) => {
    const {name,value} = e.target;
    const list = [...inputList];
    list[index][name]= value;
    setInputList(list);
}
const handleAdd = () => {
    setInputList([...inputList,{Description:"", Charges:""}]);   
}
const [inputListYear,setInputListYear]=useState([
    {DescriptionYear : "",ChargesYear :""}
]
);

const handleChangeY = (e,index) => {
    const {name,value} = e.target;
    const list = [...inputListYear];
    list[index][name]= value;
    setInputListYear(list);
}
const handleAddY = () => {
    setInputListYear([...inputListYear,{DescriptionYear:"", ChargesYear:""}]);   
}

  return(
    <>
    <div   class="paro">
      <b>Jahanaib</b>
      { inputList.map((item , i) =>{

        return (
          <div key={i} class="paro_box">
        <input 
        type="text" 
        name="firstName"
        placeholder="First Name"
        value={item.firstName}
        onChange={ (e) => handleChange (e, i  )}
        />
        <input 
        type="text" 
        name="lastName"
        placeholder="Last Name"
        value={item.lastName}
        onChange={ (e) => handleChange (e, i  )}
        />
        <input
         type="button" 
         value="remove"
         onClick={handleAdd}
         />
         <input
         type="button" 
         value="Add"
         />
      </div>

        )

      })}
      
      <pre>
        {
          JSON.stringify(inputList, null, 2)
        }
      </pre>
    </div>
    </>

  );
};
export default Paro;