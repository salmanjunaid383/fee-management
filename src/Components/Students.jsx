import React from 'react';
import { Link } from 'react-router-dom';

const Student = () => {
    return (
        <header>
            <div id="main-wrapper" data-layout="vertical" data-navbarbg="skin5" data-sidebartype="full" data-sidebar-position="absolute" data-header-position="absolute" data-boxed-layout="full">
                <header class="topbar" data-navbarbg="skin5">
                    <nav class="navbar top-navbar navbar-expand-md navbar-dark">
                        <div class="navbar-header" data-logobg="skin6">
                            <a class="navbar-brand" href="dashboard.html">
                                <b class="logo-icon">
                                    <img src="assets/plugins/images/logo-icon.png" alt="homepage" />
                                </b>
                                <span class="logo-text">
                                    <img src="assets/plugins/images/logo-text.png" alt="homepage" />
                                </span>
                            </a>
                            <a class="nav-toggler waves-effect waves-light text-dark d-block d-md-none"
                                href="javascript:void(0)"><i class="ti-menu ti-close"></i></a>
                        </div>
                        <div class="navbar-collapse collapse" id="navbarSupportedContent" data-navbarbg="skin5">
                            <ul class="navbar-nav d-none d-md-block d-lg-none">
                                <li class="nav-item">
                                    <a class="nav-toggler nav-link waves-effect waves-light text-white"
                                        href="javascript:void(0)"><i class="ti-menu ti-close"></i></a>
                                </li>
                            </ul>
                            <ul class="navbar-nav ml-auto d-flex align-items-center">

                                <li class=" in">
                                    <form role="search" class="app-search d-none d-md-block mr-3">
                                        <input type="text" placeholder="Search..." class="form-control mt-0" />
                                        <a href="" class="active">
                                            <i class="fa fa-search"></i>
                                        </a>
                                    </form>
                                </li>
                                <li>
                                    <a class="profile-pic" href="#">
                                        <img src="assets/plugins/images/users/varun.jpg" alt="user-img" width="36"
                                            class="img-circle" /><span class="text-white font-medium" >Steave</span></a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </header>
                <aside class="left-sidebar" data-sidebarbg="skin6">
                    <div class="scroll-sidebar">
                        <nav class="sidebar-nav">
                            <ul id="sidebarnav">
                                <li class="sidebar-item pt-2">
                                    <Link class="sidebar-link waves-effect waves-dark sidebar-link" to="/dashboard"
                                        aria-expanded="false">
                                        <i class="far fa-clock" aria-hidden="true"></i>
                                        <span class="hide-menu">Dashboard</span>
                                    </Link>
                                </li>
                                <li class="sidebar-item">
                                    <Link class="sidebar-link waves-effect waves-dark sidebar-link" to="/students"
                                        aria-expanded="false">
                                        <i class="fa fa-user" aria-hidden="true"></i>
                                        <span class="hide-menu">Profile</span>
                                    </Link>
                                </li>
                                <li class="sidebar-item">
                                    <a class="sidebar-link waves-effect waves-dark sidebar-link" href="basic-table.html"
                                        aria-expanded="false">
                                        <i class="fa fa-table" aria-hidden="true"></i>
                                        <span class="hide-menu">Basic Table</span>
                                    </a>
                                </li>
                                <li class="sidebar-item">
                                    <a class="sidebar-link waves-effect waves-dark sidebar-link" href="fontawesome.html"
                                        aria-expanded="false">
                                        <i class="fa fa-font" aria-hidden="true"></i>
                                        <span class="hide-menu">Icon</span>
                                    </a>
                                </li>
                                <li class="sidebar-item">
                                    <a class="sidebar-link waves-effect waves-dark sidebar-link" href="map-google.html"
                                        aria-expanded="false">
                                        <i class="fa fa-globe" aria-hidden="true"></i>
                                        <span class="hide-menu">Google Map</span>
                                    </a>
                                </li>
                                <li class="sidebar-item">
                                    <a class="sidebar-link waves-effect waves-dark sidebar-link" href="blank.html"
                                        aria-expanded="false">
                                        <i class="fa fa-columns" aria-hidden="true"></i>
                                        <span class="hide-menu">Blank Page</span>
                                    </a>
                                </li>
                                <li class="sidebar-item">
                                    <a class="sidebar-link waves-effect waves-dark sidebar-link" href="404.html"
                                        aria-expanded="false">
                                        <i class="fa fa-info-circle" aria-hidden="true"></i>
                                        <span class="hide-menu">Error 404</span>
                                    </a>
                                </li>
                                <li class="text-center p-20 upgrade-btn">
                                    <a href="https://www.wrappixel.com/templates/ampleadmin/"
                                        class="btn btn-block btn-danger text-white" target="_blank">
                                        Upgrade to Pro</a>
                                </li>
                            </ul>

                        </nav>
                    </div>
                </aside>
                <div class="page-wrapper">
                    <div class="page-breadcrumb bg-white">
                        <div class="row align-items-center">
                            <div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                                <h4 class="page-title text-uppercase font-medium font-14">Dashboard</h4>
                            </div>
                            <div class="col-lg-9 col-sm-8 col-md-8 col-xs-12">
                                <div class="d-md-flex">
                                    <ol class="breadcrumb ml-auto">
                                        <li><a href="#">Dashboard</a></li>
                                    </ol>
                                    <a href="https://wrappixel.com/templates/ampleadmin/" target="_blank"
                                        class="btn btn-danger  d-none d-md-block pull-right m-l-20 hidden-xs hidden-sm waves-effect waves-light">Upgrade
                                to Pro</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="container-fluid">
                        <div class="row justify-content-center">
                            <div class="col-lg-4 col-sm-6 col-xs-12">
                                <div class="white-box analytics-info">
                                    <h3 class="box-title">Total Visit</h3>
                                    <ul class="list-inline two-part d-flex align-items-center mb-0">
                                        <li>
                                            <div id="sparklinedash"><canvas width="67" height="30"
                                                style={{ display: "inline-block", width: "67px", height: "30px", verticalAlign: "top" }}></canvas>
                                            </div>
                                        </li>
                                        <li class="ml-auto"><span class="counter text-success">659</span></li>
                                    </ul>
                                </div>
                            </div>
                            <div class="col-lg-4 col-sm-6 col-xs-12">
                                <div class="white-box analytics-info">
                                    <h3 class="box-title">Total Page Views</h3>
                                    <ul class="list-inline two-part d-flex align-items-center mb-0">
                                        <li>
                                            <div id="sparklinedash2"><canvas width="67" height="30"
                                                style={{ display: "inline-block", width: "67px", height: "30px", verticalAlign: "top" }}></canvas>
                                            </div>
                                        </li>
                                        <li class="ml-auto"><span class="counter text-purple">869</span></li>
                                    </ul>
                                </div>
                            </div>
                            <div class="col-lg-4 col-sm-6 col-xs-12">
                                <div class="white-box analytics-info">
                                    <h3 class="box-title">Unique Visitor</h3>
                                    <ul class="list-inline two-part d-flex align-items-center mb-0">
                                        <li>
                                            <div id="sparklinedash3"><canvas width="67" height="30"
                                                style={{ display: "inline-block", width: "67px", height: "30px", verticalAlign: "top" }}></canvas>
                                            </div>
                                        </li>
                                        <li class="ml-auto"><span class="counter text-info">911</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12 col-lg-12 col-sm-12 col-xs-12">
                                <div class="white-box">
                                    <h3 class="box-title">Products Yearly Sales</h3>
                                    <div class="d-md-flex">
                                        <ul class="list-inline d-flex ml-auto">
                                            <li class="pl-3">
                                                <h5><i class="fa fa-circle m-r-5 text-info"></i>Mac</h5>
                                            </li>
                                            <li class="pl-3">
                                                <h5><i class="fa fa-circle m-r-5 text-inverse"></i>Windows</h5>
                                            </li>
                                        </ul>
                                    </div>
                                    <div id="ct-visits" style={{ height: "405px" }}>
                                        <div class="chartist-tooltip" style={{ top: "-17px", left: "-12px" }}><span
                                            class="chartist-tooltip-value">6</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
                
            </div>
            
        </header>

    );
};
export default Student;