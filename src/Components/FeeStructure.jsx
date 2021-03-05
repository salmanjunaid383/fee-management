import  {React, useEffect} from 'react';
import './dashboard.css';
import { Link } from 'react-router-dom';
import UpdateIcon from '@material-ui/icons/Update';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import logo from './jb1.png'
import { useState } from 'react';
import axios from 'axios'

const Structure = () => {
    useEffect(() => {
        axios.get(`http://fee-management-api.nastechltd.co/api/fee_structure/3`)
            .then(response => {
                console.log(response.data)
            })
            .catch(error => console.log(error))

    }, [])
    return (
        <>
            <div class="dashboard">
                <div class="left">
                    <div class="navigation">
                        <div class="wrapper2">
                            <div class="abilan">
                                <img
                                    src={logo}/>
                            </div>

                            <Link to="/dashboard" class="nav-link "><div class="folder-icons ">
                                <div class="icon1">
                                    <i class="fas  fa-columns"></i>
                                </div>
                                <div class="icon-name1 ">Dashboard</div>
                            </div></Link>
                            
                            {/* <div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas fa-school"></i>
                                </div>
                                <div class="icon-name"><Link  class="nav-link"to="/school">Campuses</Link></div>
                            </div> */}
                            <Link  class="nav-link"to="/class"><div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas fa-user-graduate"></i>
                                </div>
                                <div class="icon-name">Class</div>
                            </div></Link>
                            <Link  class="nav-link"to="/students"><div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas fa-user-graduate"></i>
                                </div>
                                <div class="icon-name">Students</div>
                            </div></Link>
                            <Link  class="nav-link"to="/finance"><div class="folder-icons">
                                <div class="icon1">
                                <i class="fas fa-wallet"></i>
                                </div>
                                <div class="icon-name">Finance Employee</div>
                            </div></Link>
                            <Link  class="nav-link"to="/fee"><div class="folder-icons">
                                <div class="icon1">
                                <i class="fas fa-wallet"></i>
                                </div>
                                <div class="icon-name">Fee Generation</div>
                            </div></Link>
                            <Link  class="nav-link"to="/feeperiod"><div class="folder-icons">
                                <div class="icon1">
                                <i class="fas fa-wallet"></i>
                                </div>
                                <div class="icon-name">Fee Period</div>
                            </div></Link>
                            <Link  class="nav-link"to="/structure"><div class="folder-icons">
                                <div class="icon1">
                                <i class="fas fa-wallet active"></i>
                                </div>
                                <div class="icon-name active">Fee Structure</div>
                            </div></Link>
                            <Link  class="nav-link"to="/discounted"><div class="folder-icons">
                                <div class="icon1">
                                <i class="fas fa-wallet"></i>
                                </div>
                                <div class="icon-name">Discounted</div>
                            </div></Link>
                            <Link  class="nav-link"to="/term"><div class="folder-icons">
                                <div class="icon1">
                                <i class="fas fa-wallet"></i>
                                </div>
                                <div class="icon-name">Term</div>
                            </div></Link>
                            <Link  class="nav-link"to="/expense"><div class="folder-icons">
                                <div class="icon1">
                                <i class="fas fa-wallet"></i>
                                </div>
                                <div class="icon-name">Expense Tracking</div>
                            </div></Link>
                            <Link class="nav-link" to="/ledger"><div class="folder-icons">
                                <div class="icon1">
                                    <i class="fas fa-wallet"></i>
                                </div>
                                <div class="icon-name">Student Ledger</div>
                            </div></Link>


                        </div>
                    </div>
                </div>
                <div class="right-side">
                    <div class="right-header">
                        <div class="top-bar">
                            <div class="top-bar-justify">
                                <div class="big-inbox">
                                    Fee
                                </div>
                            </div>
                        </div>
                        <hr class="new-hr" />
                    </div>
                    <div class="right-body">
                        
                        <div class="message">
                    <div class="add-student">
                               <Link to="/fee"> <button type="button" class="btn btn-primary btn-lg"><AddIcon/> Add Structure</button></Link>
                            </div>
                        <div class="table-responsive">
                                <table class="table no-wrap">
                                    <thead>
                                        <tr>
                                            <th class="border-top-0">#</th>
                                            <th class="border-top-0">Class</th>
                                            <th class="border-top-0">Total</th>
                                            <th class="border-top-0">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td class="txt-oflo">Class 1</td>
                                            <td>Rs.3000</td>
                                            <td>
                                            <ButtonGroup disableElevation variant="contained" color="primary">
      <Button className="student-btn-up  "><UpdateIcon className="text-white"/></Button>
      <Button className="student-btn-del "><DeleteIcon className="text-white"/></Button>
    </ButtonGroup>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td class="txt-oflo">Class 2</td>
                                            <td>Rs.3500</td>
                                            <td>
                                            <ButtonGroup disableElevation variant="contained" color="primary">
      <Button className="student-btn-up  "><UpdateIcon className="text-white"/></Button>
      <Button className="student-btn-del "><DeleteIcon className="text-white"/></Button>
    </ButtonGroup>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td class="txt-oflo">Class 3</td>
                                            <td>Rs.4000</td>
                                            <td>
                                            <ButtonGroup disableElevation variant="contained" color="primary">
      <Button className="student-btn-up  "><UpdateIcon className="text-white"/></Button>
      <Button className="student-btn-del "><DeleteIcon className="text-white"/></Button>
    </ButtonGroup>
                                            </td>
                                        </tr>
                                        
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
export default Structure;