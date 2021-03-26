import React from 'react';
// import Dashboard from './Components/Dashboard';
// import Student from './Components/Students';
import Login from './Components/Login';
// import Profile from './Components/Profile';
import Studentparticular from './Components/Studentparticular';
import Fatherparticular from './Components/Fatherparticular';
import Motherparticular from './Components/Motherparticular';
import Guardianparticular from './Components/Guardianparticular';
import Siblings from './Components/Siblings';
import Emergency from './Components/Emergency';
import Requirements from './Components/Requirements';
import Signup from './Components/Signup';
import Paro from './Components/Crud';
import Superlogin from './Components/Superlogin';
import Mydashboard from './Components/Mydashboard';
import CampusDashboard from './Components/CampusDashboard';
import Myschool from './Components/Myschool';
import AdminsSchool from './Components/AdminsSchool';
import MyClass from './Components/MyClass';
import Undertaking from './Components/Undertaking';
import SchoolUndertaking from './Components/SchoolUndertaking';
import PrintForm from './Components/PrintForm';
import SubmitForm from './Components/SubmitForm';
import MySection from './Components/Section';
import FeeVoucher from './Components/FeeVoucher';
import FeeVoucherAdmin from './Components/FeeVoucherAdmin';
import Mystudents from './Components/Mystudents';
import BreakDown from './Components/BreakDown';
import Finance from './Components/Finance';
import Student1 from './Components/Student1';
import StudentLedger from './Components/StudentLedger';
import Ledger from './Components/Ledger';
import AdminLedger from './Components/AdminLedger';
import Documents from './Components/Documents';
import AddExpenseTracking from './Components/AddExpenseTracking';
import MyExpense from './Components/ExpenseTracking';
import StudentUpdate from './Components/StudentUpdate';
import ClassUpdate from './Components/ClassUpdate';
import SchoolUpdate from './Components/SchoolUpdate';
import SchoolEntry from './Components/SchoolEntry';
import AdmissionCharges from './Components/AdmissionCharges';
import AdmissionRequest from './Components/AdmissionRequest';
import AdmissionForm from './Components/AdmissionForm';
import Admission from './Components/Admission';
import EmployeeUpdate from './Components/EmployeeUpdate';
import SchoolClass from './Components/ClassEntry';
import Fee from './Components/FeeGenerator';
import FeeComponents from './Components/Fee';
import FeePeriod from './Components/FeePeriod';
import ShowFeePeriod from './Components/ShowFeePeriod';
import Structure from './Components/FeeStructure';
import Discounted from './Components/Discounted';
import SuperAdmin from './Components/SuperAdmin';
import SuperSchool from './Components/SuperSchool';
import Term from './Components/Term';
import { Route, Switch,  } from 'react-router-dom'

const App = () => {
    return <>



        <Switch>
            {/* <Route  path="/dashboard" component={Dashboard} />
            <Route path="/students" component={Student} /> */}
             <Route exact path="/" component={Login} /> 
            <Route  path="/signup" component={Signup} />
            <Route exact path="/profile" component={Paro} />
            <Route path="/adminlogin" component={Superlogin} />
            <Route path="/dashboard" component={Mydashboard} />
            <Route path="/campusdashboard" component={CampusDashboard} />
            <Route path="/school" component={Myschool} />
            <Route path="/superschool" component={SuperSchool} />
            <Route path="/class" component={MyClass} />
            <Route path="/section" component={MySection} />
            <Route path="/students" component={Mystudents} />
            <Route path="/studentledger/:studentid" component={StudentLedger} />
            <Route path="/ledger/:studentid" component={Ledger} />
            <Route path="/adminledger" component={AdminLedger} />
            <Route path="/finance" component={Finance} />
            <Route path="/student1/:studentid" component={Student1} />
            <Route path="/expense" component={MyExpense} />
            <Route path="/fee" component={Fee} />
            <Route path="/feecomponents" component={FeeComponents} />
            <Route path="/breakdown" component={BreakDown} />
            <Route path="/feeperiod" component={FeePeriod} />
            <Route path="/feevoucher/:studentid" component={FeeVoucher} />
            <Route path="/feevoucheradmin" component={FeeVoucherAdmin} />
            <Route path="/structure" component={Structure} />
            <Route path="/admission" component={AdmissionCharges} />
            <Route path="/admissionrequest" component={AdmissionRequest}/>
            <Route path="/admissioncomponents" component={Admission}/>
            <Route path="/admissionform/:schoolid" component={AdmissionForm}/>
            <Route path="/adminschool/:adminid" component={AdminsSchool}/>
            <Route path="/discounted" component={Discounted} />
            <Route path="/documents" component={Documents} />
            <Route path="/term" component={Term} />
            <Route path="/super" component={SuperAdmin} />
            <Route path="/paro" component={Paro} />
            <Route path="/studentparticular" component={Studentparticular} />
            <Route path="/fatherparticular/:formNo" component={Fatherparticular} /> 
            <Route path="/motherparticular" component={Motherparticular} /> 
            <Route path="/guardianparticular" component={Guardianparticular} />
            <Route path="/siblings" component={Siblings} />
            <Route path="/emergency" component={Emergency} />
            <Route path="/requirements/:formNo" component={Requirements} />
            <Route path="/undertaking/:formNo" component={Undertaking} />
            <Route path="/schoolundertaking" component={SchoolUndertaking} />
            <Route path="/printform/:formNo" component={PrintForm} />
            <Route path="/submitform/:formNo" component={SubmitForm} />
        </Switch>

    </>
};
export default App;