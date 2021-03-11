import React from 'react';
// import Dashboard from './Components/Dashboard';
// import Student from './Components/Students';
import Login from './Components/Login';
// import Profile from './Components/Profile';
import Signup from './Components/Signup';
import Paro from './Components/Crud';
import Superlogin from './Components/Superlogin';
import Mydashboard from './Components/Mydashboard';
import CampusDashboard from './Components/CampusDashboard';
import Myschool from './Components/Myschool';
import MyClass from './Components/MyClass';
import MySection from './Components/Section';
import FeeVoucher from './Components/FeeVoucher';
import Mystudents from './Components/Mystudents';
import BreakDown from './Components/BreakDown';
import Finance from './Components/Finance';
import Student1 from './Components/Student1';
import StudentLedger from './Components/StudentLedger';
import AddExpenseTracking from './Components/AddExpenseTracking';
import MyExpense from './Components/ExpenseTracking';
import StudentUpdate from './Components/StudentUpdate';
import ClassUpdate from './Components/ClassUpdate';
import SchoolUpdate from './Components/SchoolUpdate';
import SchoolEntry from './Components/SchoolEntry';
import AdmissionCharges from './Components/AdmissionCharges';
import EmployeeUpdate from './Components/EmployeeUpdate';
import SchoolClass from './Components/ClassEntry';
import Fee from './Components/FeeGenerator';
import FeePeriod from './Components/FeePeriod';
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
            <Route path="/ledger" component={StudentLedger} />
            <Route path="/finance" component={Finance} />
            <Route path="/studentupdate/:studentid" component={StudentUpdate} />
            <Route path="/employeupdate/:employeeid" component={EmployeeUpdate} />
            <Route path="/schoolupdate" component={SchoolUpdate} />
            <Route path="/classentry" component={SchoolClass} />
            <Route path="/classupdate/:classid" component={ClassUpdate} />
            <Route path="/student1/:studentid" component={Student1} />
            <Route path="/addexpense" component={AddExpenseTracking} />
            <Route path="/expense" component={MyExpense} />
            <Route path="/fee" component={Fee} />
            <Route path="/breakdown" component={BreakDown} />
            <Route path="/feeperiod" component={FeePeriod} />
            <Route path="/feevoucher" component={FeeVoucher} />
            <Route path="/structure" component={Structure} />
            <Route path="/admission" component={AdmissionCharges} />
            <Route path="/discounted" component={Discounted} />
            <Route path="/term" component={Term} />
            <Route path="/super" component={SuperAdmin} />
            <Route path="/paro" component={Paro} />
        </Switch>

    </>
};
export default App;