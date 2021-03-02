// import React from 'react';
// import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import './homepage.css';

// const Homepage = () => {
//     return (
//         <>
//             <nav class=" orange navbar navbar-expand-lg navbar-light  ">
//                 <a class="navbar-brand" href="#"><img width="90px" height="58px" src="https://www.vhv.rs/dpng/d/204-2044479_stationery-school-books-png-transparent-png.png" /></a>
//                 <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
//                     <span class="navbar-toggler-icon"></span>
//                 </button>
//                 <div className="container-fluid  ">
//                     <div class="collapse navbar-collapse col-10" id="navbarNav">
//                         <ul class="navbar-nav">
//                             <li class="nav-item active">
//                                 <a class="nav-link text-white" href="#">Home </a>
//                             </li>
//                             <li class="nav-item">
//                                 <a class="nav-link text-white" href="#">Dashboard</a>
//                             </li>
//                             <li class="nav-item">
//                                 <a class="nav-link text-white" href="#">Schools</a>
//                             </li>
//                             <li class="nav-item">
//                                 <a class="nav-link text-white " href="#" tabindex="-1" aria-disabled="true">Students</a>
//                             </li>
//                         </ul>
//                     </div>
//                     <div class="col-2 collapse navbar-collapse left-nav " id="navbarNav">
//                         <ul class="navbar-nav">
//                             <li class="nav-item ">
//                                 <a class="nav-link text-white" href="#">Login</a>
//                             </li>
//                             <span class="text-white">|</span>
//                             <li class="nav-item">
//                                 <a class="nav-link text-white" href="#">Signup</a>
//                             </li>
//                         </ul>
//                     </div>
//                 </div>
//             </nav>
//             <div id="carouselExampleSlidesOnly" class="carousel slide" data-ride="carousel">
//   <div class="carousel-inner">
//     <div class="carousel-item ">
//         <img height="350px" src="assets/images/13113.jpg" class="d-block w-100" alt="..."/>
//     </div>
//     <div class="carousel-item active">
//       <img height="350px" src="https://www.the74million.org/wp-content/uploads/2018/08/iStock-877290928.jpg" class="d-block w-100" alt="..."/>
//     </div>
//     <div class="carousel-item">
//       <img height="350px" src="https://www.rnib.org.uk/sites/default/files/shutterstock_284501777_702x400.jpg" class="d-block w-100" alt="..."/>
//     </div>
//   </div>
// </div>

//         </>
//     );
// };
// export default Homepage;
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export default function AddressForm() {
  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Address line 1"
            fullWidth
            autoComplete="shipping address-line1"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="Address line 2"
            fullWidth
            autoComplete="shipping address-line2"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="shipping address-level2"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField id="state" name="state" label="State/Province/Region" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="shipping country"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Use this address for payment details"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
