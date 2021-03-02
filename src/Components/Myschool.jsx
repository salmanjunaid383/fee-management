import {React,useEffect,useState} from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import logo from "./jb1.png";
import './dashboard.css';
import UpdateIcon from '@material-ui/icons/Update';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

const Myschool = () => {
  const [data, setData] = useState([]);
const history = useHistory();
 const admin_id = localStorage.getItem("admin_id")

    // const id = localStorage.getItem("school_id");
    useEffect(() => {
        axios.get(`http://fee-management-api.nastechltd.co/api/schools/${admin_id}`)
        .then(response => {
            console.log(response.data)
            setData(response.data)
        })
        .catch(error => console.log(error) )

    },[])  

    const reload = () => {
        axios.get(`http://fee-management-api.nastechltd.co/api/school`)
        .then(response => {
            console.log(response.data)
            setData(response.data)
        })
        .catch(error => console.log(error) )

    }
    const deleteSchool = (id) =>{
        axios.delete(`http://fee-management-api.nastechltd.co/api/school/${id}`)
        .then (response => {
            console.log(response)
            reload();
        })
        .catch (error => {
            console.log(error)
            alert("First Delete the Classes");
        })
        
    
    }

      
    return (
        <>
            <div class="dashboard">
                <div class="left">
                    <div class="navigation">
                        <div class="wrapper2">
                            <div class="abilan">
                                <img
                                    src={logo} />
                            </div>

                            <Link class="nav-link" to="/dashboard"><div class="folder-icons ">
                                <div class="icon1">
                                    <i class="fas fa-columns"></i>
                                </div>
                                <div class="icon-name1">Dashboard</div>
                            </div></Link>

                            <Link to="/school" class="nav-link active "><div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas active fa-school"></i>
                                </div>
                                <div class="icon-name active">School</div>
                            </div></Link>

                            {/* <div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas fa-user-graduate"></i>
                                </div>
                                <div class="icon-name nav-link"><Link to="/students">Students</Link></div>
                            </div>
                            <div class="folder-icons">
                                <div class="icon1">
                                <i class="fas fa-wallet"></i>
                                </div>
                                <div class="icon-name nav-link "><Link to="/finance" class="">Finance Employee </Link></div>
                            </div>
                            <div class="folder-icons">
                                <div class="icon1">
                                <i class="fas fa-wallet"></i>
                                </div>
                                <div class="icon-name nav-link "><Link to="/class" class="">Class </Link></div>
                            </div>
                            <div class="folder-icons">
                        <div class="icon1">
                            <i class="fas fa-user-graduate"></i>
                        </div>
                        <div class="icon-name nav-link"><Link to="/fee">Fee Generation</Link></div>
                    </div>
                    <div class="folder-icons">
                        <div class="icon1">
                        <i class="fas fa-wallet"></i>
                        </div>
                        <div class="icon-name nav-link "><Link to="/feeperiod" >Fee Period</Link></div>
                    </div>
                    <div class="folder-icons">
                        <div class="icon1">
                        <i class="fas fa-wallet"></i>
                        </div>
                        <div class="icon-name nav-link "><Link to="/structure">Fee Structure</Link></div>
                    </div> */}



                        </div>
                    </div>
                </div>
                <div class="right-side">
                    <div class="right-header">
                        <div class="top-bar">
                            <div class="top-bar-justify">
                                <div class="big-inbox">
                                    Schools
                        </div>
                            </div>
                        </div>
                        <hr class="new-hr" />
                    </div>
                    <div class="right-body">
                        <div class="message">
                        <div class="table-responsive">
                                <table class="table no-wrap">
                                    <thead>
                                        <tr>
                                            <th class="border-top-0">#</th>
                                            <th class="border-top-0">NAME</th>
                                            <th class="border-top-0">Address</th>
                                            <th class="border-top-0">Phone</th>
                                            <th class="border-top-0">Visit</th>
                                            {/* <th class="border-top-0">Action</th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map ((val, i) => {
                                            return(
                                                <tr key={i}>
                                            <td>{val.id}</td>
                                            <td class="txt-oflo">{val.name}</td>
                                            <td>{val.address}</td>
                                            <td>{val.contact}</td>
                                            <td><Link to="campusdashboard"><button onClick={()=>localStorage.setItem("school_id", val.id)} class="btn btn-primary">Enter School</button></Link></td>
                                            {/* <td>
                                            <ButtonGroup disableElevation variant="contained" color="primary">
      <Button className="student-btn-up" onClick={()=>history.push(`/schoolupdate/${val.id}`)}  ><UpdateIcon className="text-white"/></Button>
      <Button className="student-btn-del" onClick={()=>deleteSchool(val.id)} ><DeleteIcon className="text-white"/></Button>
    </ButtonGroup>
                                            </td> */}
                                        </tr>

                                            )
                                        })}

                                        
                                        
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

};
export default Myschool;