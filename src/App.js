import React from 'react';
import UndertakingReport from './Components/UndertakingReport'
import Reports from './Components/reports'
import IssuedForm from './Components/IssuedForm';
import Termsandconditions from './Components/Termsandconditions';
import Login from './Components/Login';
import Studentparticular from './Components/Studentparticular';
import Fatherparticular from './Components/Fatherparticular';
import Motherparticular from './Components/Motherparticular';
import Guardianparticular from './Components/Guardianparticular';
import Siblings from './Components/Siblings';
import Emergency from './Components/Emergency';
import Requirements from './Components/Requirements';
import Mydashboard from './Components/Mydashboard';
import CampusDashboard from './Components/CampusDashboard';
import EmployeeDashboard from './Components/EmployeePortal/EmployeeDashboard';
import EmployeeFee from './Components/EmployeePortal/EmployeeFee';
import EmployeeLedger from './Components/EmployeePortal/EmployeeLedger';
import EmployeeVoucher from './Components/EmployeePortal/EmployeeVoucher';
import EmployeeCustomVoucher from './Components/EmployeePortal/EmployeeCustomVoucher';
import EmployeePeriod from './Components/EmployeePortal/EmployeePeriod';
import EmployeeDiscount from './Components/EmployeePortal/EmployeeDiscount';
import EmployeeDefaulters from './Components/EmployeePortal/EmployeeDefaulters';
import EmployeeStructure from './Components/EmployeePortal/EmployeeStructure';
import EmployeeBreakdown from './Components/EmployeePortal/EmployeeBreakdown';
import EmployeeExpense from './Components/EmployeePortal/EmployeeExpense';
import EmployeeAddStructure from './Components/EmployeePortal/EmployeeAddStructure';
import Myschool from './Components/Myschool';
import AdminsSchool from './Components/AdminsSchool';
import MyClass from './Components/MyClass';
import Undertaking from './Components/Undertaking';
import Defaulters from './Components/Defaulters';
import DefaulterNotice from './Components/DefaulterNotice';
import SchoolUndertaking from './Components/SchoolUndertaking';
import PrintForm from './Components/PrintForm';
import SubmitForm from './Components/SubmitForm';
import MySection from './Components/Section';
import FeeVoucher from './Components/FeeVoucher';
import ForgetPassword from './Components/ForgetPassword';
import ResetPassword from './Components/ResetPassword';
import CustomFeeVoucher from './Components/CustomFeeVoucher';
import FeeVoucherAdmin from './Components/FeeVoucherAdmin';
import Mystudents from './Components/Mystudents';
import BreakDown from './Components/BreakDown';
import Finance from './Components/Finance';
import File from './Components/File';
import StudentLedger from './Components/StudentLedger';
import StudentPassword from './Components/StudentPassword';
import Ledger from './Components/Ledger';
import AdminLedger from './Components/AdminLedger';
import Documents from './Components/Documents';
import MyExpense from './Components/ExpenseTracking';
import AdmissionCharges from './Components/AdmissionCharges';
import AdmissionRequest from './Components/AdmissionRequest';
import AdmissionForm from './Components/AdmissionForm';
import Admission from './Components/Admission';
import Fee from './Components/FeeGenerator';
import FeeComponents from './Components/Fee';
import FeePeriod from './Components/FeePeriod';
import Structure from './Components/FeeStructure';
import Discounted from './Components/Discounted';
import SuperAdmin from './Components/SuperAdmin';
import SuperSchool from './Components/SuperSchool';
import Term from './Components/Term';
import { Route, Switch, } from 'react-router-dom';
import  TcReport  from './Components/TcReport'
import WarSlip from './Components/WarSlip'
import printUndertakin from './Components/printUndertakin';
import TcPrint from './Components/TcPrint'
import StudentsAttendance from './Components/StudentsAttendance'
import StudentDashboard from './Components/StudentDashboard'
import AdminAttendance from './Components/AdminAttendance';
import MainReport from './MainReport';
import PickupPrint from './Components/PickupPrint';
import PrintWarning from './Components/PrintWarning';
import Listofallvouchers from './Components/Listofallvouchers';
import StudentProfile from './Components/StudentProfile';
import StudentVoucher from './Components/studentVoucher';
import StudentUnpaidVoucher from './Components/StudentUnpaidVoucher';
import StudentAttendance from './Components/StudentAttendance';
import ViewAttendance from './Components/ViewAttendance';
import ExpenseRecord from './Components/ExpenseRecord';
import Inventory from './Components/Inventory';
import AssetTracking from './Components/AssetTracking';
import StudentLeave from './Components/StudentLeave';
import BorrowAssets from './Components/BorrowAssets';
import FeeVoucherCashable from './Components/FeeVoucherCashable';
import ExpenseForm from './Components/ExpenseForm';
import StudentQRCode from './Components/StudentQRCode';
import ExpanseVoucher from './Components/ExpanseVoucher'
import Listofunpaidfeevoucher from './Components/Listofunpaidfeevoucher';
import FeeVoucherCustom from './Components/FeeVoucherCustom';
import AssetsBorrow from './Components/AssetsBorrow';
const App = () => {
    return <>
        <Switch>
            
        <Route path="/AssetsBorrow" component={AssetsBorrow} />
        <Route path="/FeeVoucherCustom/:studentid" component={FeeVoucherCustom} />
        <Route path="/unpaidfeevoucher" component={Listofunpaidfeevoucher} />
        <Route path="/StudentQRCode" component={StudentQRCode} />
        <Route path="/ExpenseForm/:voucherId" component={ExpenseForm} />
        <Route path="/CashableFeeVoucher/:studentid" component={FeeVoucherCashable} />
        <Route path="/BorrowAssets" component={BorrowAssets} />
        <Route path="/StudentLeave" component={StudentLeave} />
            <Route path="/Asset-Tracking" component={AssetTracking} />
            <Route path="/Inventory" component={Inventory} />
            <Route path="/ViewAttendance/:studentid" component={ViewAttendance} />
            <Route path="/studentattendance" component={StudentAttendance} />
            <Route path="/studentUnpaidVoucher/:studentid" component={StudentUnpaidVoucher} />
            <Route path="/studentVoucher/:studentid" component={StudentVoucher} />
            <Route path="/student-profile/:studentid" component={StudentProfile} />
            <Route path="/Voucher-List" component={Listofallvouchers}/>
            <Route path="/warning-print" component={PrintWarning} />
            <Route path="/pickup-print" component={PickupPrint} />
            <Route path="/MainReportPage" component={MainReport} />
            <Route path="/AdminAttendance" component={AdminAttendance} />
            <Route path="/studentdashboard/:studentid" component={StudentDashboard} />
            <Route path="/StudentAttendance" component={StudentsAttendance}/>
            <Route exact path="/" component={Login} />
            <Route path="/printUndertakin" component={printUndertakin}/>
            <Route path="/TcPrint" component={TcPrint}/>
            <Route path="/dashboard" component={Mydashboard} />
            <Route path="/pickup-report" component={Reports} />
            <Route path="/TcReport" component={TcReport}/> 
            <Route path="/WarningSlip" component={WarSlip}/> 
            <Route path="/undertaking-report" component={UndertakingReport} />
            <Route path="/campusdashboard" component={CampusDashboard} />
            <Route path="/school" component={Myschool} />
            <Route path="/superschool" component={SuperSchool} />
            <Route path="/class" component={MyClass} />
            <Route path="/section" component={MySection} />
            <Route path="/students" component={Mystudents} />
            <Route path="/studentledger/:studentid" component={StudentLedger} />
            <Route path="/studentpassword/:studentid" component={StudentPassword} />
            <Route path="/ledger/:studentid" component={Ledger} />
            <Route path="/adminledger" component={AdminLedger} />
            <Route path="/finance" component={Finance} />
            <Route path="/file" component={File}/>
            <Route path="/expense" component={MyExpense} />
            <Route path="/fee" component={Fee} />
            <Route path="/feecomponents" component={FeeComponents} />
            <Route path="/breakdown" component={BreakDown} />
            <Route path="/feeperiod" component={FeePeriod} />
            <Route path="/forgetpassword" component={ForgetPassword} />
            <Route path="/resetpassword/:userid" component={ResetPassword} />
            <Route path="/feevoucher/:studentid" component={FeeVoucher} />
            <Route path="/customfeevoucher" component={CustomFeeVoucher} />
            <Route path="/feevoucheradmin" component={FeeVoucherAdmin} />
            <Route path="/structure" component={Structure} />
            <Route path="/admission" component={AdmissionCharges} />
            <Route path="/admissionrequest" component={AdmissionRequest} />
            <Route path="/admissioncomponents" component={Admission} />
            <Route path="/admissionform/:schoolid" component={AdmissionForm} />
            <Route path="/adminschool/:adminid" component={AdminsSchool} />
            <Route path="/discounted" component={Discounted} />
            <Route path="/documents" component={Documents} />
            <Route path="/term" component={Term} />
            <Route path="/super" component={SuperAdmin} />
            <Route path="/studentparticular" component={Studentparticular} />
            <Route path="/fatherparticular/:id" component={Fatherparticular} />
            <Route path="/motherparticular" component={Motherparticular} />
            <Route path="/guardianparticular" component={Guardianparticular} />
            <Route path="/siblings" component={Siblings} />
            <Route path="/emergency" component={Emergency} />
            <Route path="/requirements/:formNo" component={Requirements} />
            <Route path="/undertaking/:formNo" component={Undertaking} />
            <Route path="/defaulters" component={Defaulters} />
            <Route path="/defaulternotice" component={DefaulterNotice} />
            <Route path="/schoolundertaking" component={SchoolUndertaking} />
            <Route path="/printform/:formNo" component={PrintForm} />
            <Route path="/submitform/:formNo" component={SubmitForm} />
            <Route path="/employeedashboard" component={EmployeeDashboard} />
            <Route path="/employeefeecomponents" component={EmployeeFee} />
            <Route path="/employeefeevoucheradmin" component={EmployeeVoucher} />
            <Route path="/employeeadminledger" component={EmployeeLedger} />
            <Route path="/employeeperiod" component={EmployeePeriod} />
            <Route path="/employeestructure" component={EmployeeStructure} />
            <Route path="/employeeaddstructure" component={EmployeeAddStructure} />
            <Route path="/employeebreakdown" component={EmployeeBreakdown} />
            <Route path="/employeedefaulter" component={EmployeeDefaulters} />
            <Route path="/employeediscount" component={EmployeeDiscount} />
            <Route path="/employeeexpense" component={EmployeeExpense} />
            <Route path="/employeecustomvoucher" component={EmployeeCustomVoucher} />
            <Route path="/terms-conditions/:school_id" component={Termsandconditions}/>
            <Route path="/issued-form/:school_id" component={IssuedForm}/>
            <Route path="/expenseRecord" component={ExpenseRecord}/>
            <Route path="/expanseVoucher" component={ExpanseVoucher}></Route>
        </Switch>

    </>
};
export default App;