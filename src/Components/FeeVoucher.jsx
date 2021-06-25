import { React, useEffect, useState } from 'react';
import './FeeVoucher.css';
import axios from 'axios';
import { useHistory, useParams } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';


const FeeVoucher = ({ teamId, orientation = 'landscape' }) => {
    const [messageinfo, setMessageinfo] = useState('');
    const [message, setMessage] = useState({
        open: false,
        vertical: 'top',
        horizontal: 'right',
    });
    const { vertical, horizontal, open } = message;
    const handleMessage =() => {
        setMessage({ open: true,vertical: 'top',horizontal: 'right' });
    };

    const CloseMessage = () => {
        setMessage({ ...message, open: false });
    };
    const history = useHistory();
    const [discount, setDiscount] = useState();
    const [duedate, setDuedate] = useState();
    const [issuedate, setIssuedate] = useState();
    const [latefee, setLatefee] = useState();
    const [remainingbalance, setRemainingbalance] = useState();
    const [feevoucherbreak, setFeevoucherbreak] = useState([]);
    const [feevoucher, setFeevoucher] = useState({});
    const [studentdata, setStudentdata] = useState({});
    const [classdata, setClassdata] = useState({});
    const [schooldata, setSchooldata] = useState({});
    const { studentid } = useParams();
    function setPageSize(cssPageSize) {
        const style = document.createElement('style');
        style.innerHTML = `@page {size: ${cssPageSize}}`;
        style.id = 'page-orientation';
        document.head.appendChild(style);
    };

    // Set orientation of page being printed
    useEffect(() => {
        setPageSize(orientation);
        return () => {
            const child = document.getElementById('page-orientation');
            child.parentNode.removeChild(child);
        };
    }, [orientation]);
    useEffect(() => {
        axios.get(`http://fee-management-api.nastechltd.co/api/fee_voucher/${studentid}`)
            .then(response => {
                console.log(response.data)
                setDiscount(response.data.discount);
                setDuedate(response.data.due_date);
                setIssuedate(response.data.issue_date);
                setFeevoucher(response.data.feeVoucher);
                setStudentdata(response.data.student);
                setRemainingbalance(response.data.remainingBalance);
                setFeevoucherbreak(response.data.feeVoucherBreakDown);
                setLatefee(response.data.fee_after_due_date)
                axios.get(`http://fee-management-api.nastechltd.co/api/show_school/${response.data.student.school_id}`)
                    .then(response => {
                        console.log(response.data);
                        setSchooldata(response.data)
                    })
                    .catch((error) => {
                        if (error.response) {
                            setMessageinfo(error.response.data.message);
                            handleMessage();
                        }
                    })
                axios.get(`http://fee-management-api.nastechltd.co/api/show_section/${response.data.student.section_id}`)
                    .then(response => {
                        console.log(response.data);
                        setClassdata(response.data)
                    })
                    .catch((error) => {
                        if (error.response) {
                            setMessageinfo(error.response.data.message);
                            handleMessage();
                        }
                    })
            })
            .catch((error) => {
                if (error.response) {
                    setMessageinfo(error.response.data.message);
                    handleMessage();
                    setTimeout(()=>{
                        history.goBack();
                    },1500)
                }
            })
    }, [])
    

    return (
        <>
            <div class="fee-voucher-main">
                <button className="btn btn-danger text-bold" id="print-voucher-btn" onClick={()=>window.print()}>Print</button>
                <div class="fee-voucher-left">
                    <div class="voucher-school">
                        <p class="text-center mt-3 text-bolder voucher-text print-capitalize">{schooldata.name}</p>
                        <p class="text-center voucher-text">(Society For Advancement Of Learning in Pakistan)</p>
                        <p class="text-center text-bolder voucher-text">Bank Al Habib Ltd</p>
                        <p class="text-center text-bolder voucher-text">Collection A/C #0080-900542-01</p>
                        <p class="text-center voucher-text">ALL BAHL BRANCHES IN KARACHI</p>
                    </div>
                    <div class="container-fluid voucher-date mt-2 border-top border-dark border-bottom">
                        <div class="row">
                            <div class="col-4 border border-dark">
                                <p class="voucher-text1 mt-3 text-bolder">Fee Bill No</p>
                                <p class=" voucher-text1">{feevoucher.voucher_no}</p>
                            </div>
                            <div class="col-4 border border-dark">
                                <p class="voucher-text1 mt-3 text-bolder">Fee Period</p>
                                <p class=" voucher-text1">{feevoucher.date}</p>
                            </div>
                            <div class="col-4 border border-dark">
                                <p class="voucher-text1 mt-3 text-bolder">Issue Date</p>
                                <p class=" voucher-text1">{feevoucher.issue_date}</p>
                            </div>
                        </div>
                        <div class="row">

                            <div class="col-4 border border-dark">
                                <p class="voucher-text1 mt-3 text-bolder">GR. No</p>
                                <p class=" voucher-text1">{studentdata.G_R_NO}</p>
                            </div>
                            <div class="col-4 border border-dark">
                                <p class="voucher-text1 mt-3 text-bolder">Class/Section</p>
                                <p class=" voucher-text1">{`${classdata.class_name}/${classdata.name}`}</p>
                            </div>
                            <div class="col-4 border border-dark">
                                <p class="voucher-text1 mt-3 text-bolder">Due Date</p>
                                <p class=" voucher-text1">{feevoucher.due_date}</p>
                            </div>
                        </div>
                        {/* <div class="row"> */}
                            {/* <div class="col-4 border border-dark">
                                <p class="voucher-text1 mt-3 text-bolder">Campus</p>
                                <p class=" voucher-text1">1</p>
                            </div> */}
                            {/* <div class="col-12 border border-dark">
                                <p class="voucher-text1 mt-3 text-bolder">This slip is valid upto</p>
                                <p class=" voucher-text1">{feevoucher.valid_date}</p>
                            </div> */}
                        {/* </div> */}
                        <div class="row">
                            <div class="col-8 border border-dark">
                                <p class="voucher-text1 mt-3 text-bolder">Student's Name</p>
                                <p class=" voucher-text1 text-bolder">{`${studentdata.first_name} ${studentdata.middle_name} ${studentdata.last_name}`}</p>
                            </div>
                            <div class="col-4 border border-dark">
                                <p class="voucher-text1 mt-3 text-bolder">valid upto</p>
                                <p class=" voucher-text1">{feevoucher.valid_date}</p>
                            </div>
                        </div>
                        <div class="row voucher-box border border-dark">
                            <div class="col-12 mt-3">
                                {
                                    feevoucherbreak.map((val, i) => {
                                        return (
                                            <>
                                                <p class="voucher-text1 text-left text-bolder ">{(val.description).charAt(0).toUpperCase() + (val.description).slice(1)}<p class="voucher-text1 text-right ">{val.charges}</p></p>

                                            </>
                                        )
                                    })
                                }
                                <p class="voucher-text1 text-left text-bolder ">Remainig Balance<p class="voucher-text1 text-right ">{remainingbalance}</p></p>


                            </div>

                            <div class="fix-bottom">
                                <div class="col-12 voucher-box-bottom">
                                    <span class="voucher-box-font text-bolder voucher-box-left">Total Month Fee</span>
                                    <span
                                        class="absolute-right voucher-box-font text-bolder flex-left voucher-box-right">{feevoucher.total_amount}</span>
                                </div>
                                <div class="col-12 pos-rel">
                                    <span class="voucher-box-font text-bolder voucher-box-left">Discount Fee</span>
                                    <span class="pos-ab text-bolder">{discount}</span>
                                </div>
                            </div>
                        </div>






                        <div class="row border border-dark">
                            <div class="col-12 border border-dark voucher-box-small">
                                <p class="voucher-box-left mt-2">Fee Payable before Due Date</p>
                                <p class="voucher-box-right text-bolder mt-2">{feevoucher.final_amount}</p>
                            </div>
                            <div class="col-12 border border-dark voucher-box-small">
                                <p class="voucher-box-left mt-1">Fee Payable after Due Date(with charity)</p>
                                <p class="voucher-box-right mt-1 text-bolder">{latefee}</p>
                            </div>
                            <div class="col-12 border border-dark voucher-box-small">
                                <p class="text-smaller mt-1">The additional amount collected after due date will be donated for
                            charitable purpose</p>
                            </div>
                        </div>
                        <div class="row border border-dark">
                            <div class="col-12">
                                <p class="text-small">These Funds are intended for Wonderland Grammar Secondary School (Society
                                for Advancement of Learning in Pakistan)<span class="text-bolder"> Account# 1031-0981-019040-01-9</span> held with Water Pump
                                Branch,Karachi
                                </p>
                            </div>
                            <div class="col-12">
                                <p class="line-2 text-bolder">Campus-|Ph:(021)36360737,36804081,36378276</p>
                            </div>
                            <div class="col-12">
                                <p class="line-2 text-bolder">Campus-|| Ph:(021) 369608211,36944261</p>
                            </div>

                        </div>
                        <div className="col-12">
                            <p class="voucher-box-inline text-bolder voucher-box-left">{`Cell:${schooldata.contact}`}</p>
                            <p class="voucher-box-inline text-bolder voucher-box-right">Bank Copy</p>
                        </div>

                    </div>
                </div>
                <div class="fee-voucher-left">
                    <div class="voucher-school">
                        <p class="text-center mt-3 text-bolder voucher-text print-capitalize">{schooldata.name}</p>
                        <p class="text-center voucher-text">(Society For Advancement Of Learning in Pakistan)</p>
                        <p class="text-center text-bolder voucher-text">Bank Al Habib Ltd</p>
                        <p class="text-center text-bolder voucher-text">Collection A/C #0080-900542-01</p>
                        <p class="text-center voucher-text">ALL BAHL BRANCHES IN KARACHI</p>
                    </div>
                    <div class="container-fluid voucher-date mt-2 border-top border-dark border-bottom">
                        <div class="row">
                            <div class="col-4 border border-dark">
                                <p class="voucher-text1 mt-3 text-bolder">Fee Bill No</p>
                                <p class=" voucher-text1">{feevoucher.voucher_no}</p>
                            </div>
                            <div class="col-4 border border-dark">
                                <p class="voucher-text1 mt-3 text-bolder">Fee Period</p>
                                <p class=" voucher-text1">{feevoucher.date}</p>
                            </div>
                            <div class="col-4 border border-dark">
                                <p class="voucher-text1 mt-3 text-bolder">Issue Date</p>
                                <p class=" voucher-text1">{feevoucher.issue_date}</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-4 border border-dark">
                                <p class="voucher-text1 mt-3 text-bolder">GR. No</p>
                                <p class=" voucher-text1">{studentdata.G_R_NO}</p>
                            </div>
                            <div class="col-4 border border-dark">
                                <p class="voucher-text1 mt-3 text-bolder">Class/Section</p>
                                <p class=" voucher-text1">{`${classdata.class_name}/${classdata.name}`}</p>
                            </div>
                            <div class="col-4 border border-dark">
                                <p class="voucher-text1 mt-3 text-bolder">Due Date</p>
                                <p class=" voucher-text1">{feevoucher.due_date}</p>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-8 border border-dark">
                                <p class="voucher-text1 mt-3 text-bolder">Student's Name</p>
                                <p class=" voucher-text1 text-bolder">{`${studentdata.first_name} ${studentdata.middle_name} ${studentdata.last_name}`}</p>
                            </div>
                            <div class="col-4 border border-dark">
                                <p class="voucher-text1 mt-3 text-bolder">valid upto</p>
                                <p class=" voucher-text1">{feevoucher.valid_date}</p>
                            </div>
                        </div>
                        <div class="row voucher-box border border-dark">
                            <div class="col-12 mt-3">
                                {
                                    feevoucherbreak.map((val, i) => {
                                        return (
                                            <>
                                                <p class="voucher-text1 text-left text-bolder ">{(val.description).charAt(0).toUpperCase() + (val.description).slice(1)}<p class="voucher-text1 text-right ">{val.charges}</p></p>

                                            </>
                                        )
                                    })
                                }
                                <p class="voucher-text1 text-left text-bolder ">Remainig Balance<p class="voucher-text1 text-right ">{remainingbalance}</p></p>


                            </div>

                            <div class="fix-bottom">
                                <div class="col-12 voucher-box-bottom">
                                    <span class="voucher-box-font text-bolder voucher-box-left">Total Month Fee</span>
                                    <span
                                        class="absolute-right voucher-box-font text-bolder flex-left voucher-box-right">{feevoucher.total_amount}</span>
                                </div>
                                <div class="col-12 pos-rel">
                                    <span class="voucher-box-font text-bolder voucher-box-left">Discount Fee</span>
                                    <span class="pos-ab text-bolder">{discount}</span>
                                </div>
                            </div>
                        </div>






                        <div class="row border border-dark">
                            <div class="col-12 border border-dark voucher-box-small">
                                <p class="voucher-box-left mt-2">Fee Payable before Due Date</p>
                                <p class="voucher-box-right text-bolder mt-2">{feevoucher.final_amount}</p>
                            </div>
                            <div class="col-12 border border-dark voucher-box-small">
                                <p class="voucher-box-left mt-1">Fee Payable after Due Date(with charity)</p>
                                <p class="voucher-box-right mt-1 text-bolder">{latefee}</p>
                            </div>
                            <div class="col-12 border border-dark voucher-box-small">
                                <p class="text-smaller mt-1">The additional amount collected after due date will be donated for
                            charitable purpose</p>
                            </div>
                        </div>
                        <div class="row border border-dark">
                            <div class="col-12">
                                <p class="text-small">These Funds are intended for Wonderland Grammar Secondary School (Society
                                for Advancement of Learning in Pakistan)<span class="text-bolder"> Account# 1031-0981-019040-01-9</span> held with Water Pump
                                Branch,Karachi
                                </p>
                            </div>
                            <div class="col-12">
                                <p class="line-2 text-bolder">Campus-|Ph:(021)36360737,36804081,36378276</p>
                            </div>
                            <div class="col-12">
                                <p class="line-2 text-bolder">Campus-|| Ph:(021) 369608211,36944261</p>
                            </div>

                        </div>
                        <div className="col-12">
                            <p class="voucher-box-inline text-bolder voucher-box-left">{`Cell:${schooldata.contact}`}</p>
                            <p class="voucher-box-inline text-bolder voucher-box-right">School Copy</p>
                        </div>

                    </div>
                </div>
                <div class="fee-voucher-left">
                    <div class="voucher-school">
                        <p class="text-center mt-3 text-bolder voucher-text print-capitalize">{schooldata.name}</p>
                        <p class="text-center voucher-text">(Society For Advancement Of Learning in Pakistan)</p>
                        <p class="text-center text-bolder voucher-text">Bank Al Habib Ltd</p>
                        <p class="text-center text-bolder voucher-text">Collection A/C #0080-900542-01</p>
                        <p class="text-center voucher-text">ALL BAHL BRANCHES IN KARACHI</p>
                    </div>
                    <div class="container-fluid voucher-date mt-2 border-top border-dark border-bottom">
                        <div class="row">
                            <div class="col-4 border border-dark">
                                <p class="voucher-text1 mt-3 text-bolder">Fee Bill No</p>
                                <p class=" voucher-text1">{feevoucher.voucher_no}</p>
                            </div>
                            <div class="col-4 border border-dark">
                                <p class="voucher-text1 mt-3 text-bolder">Fee Period</p>
                                <p class=" voucher-text1">{feevoucher.date}</p>
                            </div>
                            <div class="col-4 border border-dark">
                                <p class="voucher-text1 mt-3 text-bolder">Issue Date</p>
                                <p class=" voucher-text1">{feevoucher.issue_date}</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-4 border border-dark">
                                <p class="voucher-text1 mt-3 text-bolder">GR. No</p>
                                <p class=" voucher-text1">{studentdata.G_R_NO}</p>
                            </div>
                            <div class="col-4 border border-dark">
                                <p class="voucher-text1 mt-3 text-bolder">Class/Section</p>
                                <p class=" voucher-text1">{`${classdata.class_name}/${classdata.name}`}</p>
                            </div>
                            <div class="col-4 border border-dark">
                                <p class="voucher-text1 mt-3 text-bolder">Due Date</p>
                                <p class=" voucher-text1">{feevoucher.due_date}</p>
                            </div>
                        </div>
                        {/* <div class="row">

                            <div class="col-4 border border-dark">
                                <p class="voucher-text1 mt-3 text-bolder">Campus</p>
                                <p class=" voucher-text1">1</p>
                            </div>
                            <div class="col-8 border border-dark">
                                <p class="voucher-text1 mt-3 text-bolder">This slip is valid upto</p>
                                <p class=" voucher-text1">07-02-2021</p>
                            </div>
                        </div> */}
                        <div class="row">
                            <div class="col-8 border border-dark">
                                <p class="voucher-text1 mt-3 text-bolder">Student's Name</p>
                                <p class=" voucher-text1 text-bolder">{`${studentdata.first_name} ${studentdata.middle_name} ${studentdata.last_name}`}</p>
                            </div>
                            <div class="col-4 border border-dark">
                                <p class="voucher-text1 mt-3 text-bolder">valid upto</p>
                                <p class=" voucher-text1">{feevoucher.valid_date}</p>
                            </div>
                        </div>
                        <div class="row voucher-box border border-dark">
                            <div class="col-12 mt-3">
                                {
                                    feevoucherbreak.map((val, i) => {
                                        return (
                                            <>
                                                <p class="voucher-text1 text-left text-bolder ">{(val.description).charAt(0).toUpperCase() + (val.description).slice(1)}<p class="voucher-text1 text-right ">{val.charges}</p></p>

                                            </>
                                        )
                                    })
                                }
                                <p class="voucher-text1 text-left text-bolder ">Remainig Balance<p class="voucher-text1 text-right ">{remainingbalance}</p></p>


                            </div>

                            <div class="fix-bottom">
                                <div class="col-12 voucher-box-bottom">
                                    <span class="voucher-box-font text-bolder voucher-box-left">Total Month Fee</span>
                                    <span
                                        class="absolute-right voucher-box-font text-bolder flex-left voucher-box-right">{feevoucher.total_amount}</span>
                                </div>
                                <div class="col-12 pos-rel">
                                    <span class="voucher-box-font text-bolder voucher-box-left">Discount Fee</span>
                                    <span class="pos-ab text-bolder">{discount}</span>
                                </div>
                            </div>
                        </div>






                        <div class="row border border-dark">
                            <div class="col-12 border border-dark voucher-box-small">
                                <p class="voucher-box-left mt-2">Fee Payable before Due Date</p>
                                <p class="voucher-box-right text-bolder mt-2">{feevoucher.final_amount}</p>
                            </div>
                            <div class="col-12 border border-dark voucher-box-small">
                                <p class="voucher-box-left mt-1">Fee Payable after Due Date(with charity)</p>
                                <p class="voucher-box-right mt-1 text-bolder">{latefee}</p>
                            </div>
                            <div class="col-12 border border-dark voucher-box-small">
                                <p class="text-smaller mt-1">The additional amount collected after due date will be donated for
                            charitable purpose</p>
                            </div>
                        </div>
                        <div class="row border border-dark">
                            <div class="col-12">
                                <p class="text-small">These Funds are intended for Wonderland Grammar Secondary School (Society
                                for Advancement of Learning in Pakistan) <span class="text-bolder"> Account# 1031-0981-019040-01-9</span> held with Water Pump
                                Branch,Karachi
                                </p>
                            </div>
                            <div class="col-12">
                                <p class="line-2 text-bolder">Campus-|Ph:(021)36360737,36804081,36378276</p>
                            </div>
                            <div class="col-12">
                                <p class="line-2 text-bolder">Campus-|| Ph:(021) 369608211,36944261</p>
                            </div>

                        </div>
                        <div className="col-12">
                            <p class="voucher-box-inline text-bolder voucher-box-left">{`Cell:${schooldata.contact}`}</p>
                            <p class="voucher-box-inline text-bolder voucher-box-right">Student Copy</p>
                        </div>

                    </div>
                </div>
                <Snackbar
                    anchorOrigin={{ vertical, horizontal }}
                    open={open}
                    autoHideDuration={4000}
                    onClose={CloseMessage}
                    message={messageinfo}
                    key={vertical + horizontal}
                />
            </div>

        </>
    );
};
export default FeeVoucher;













