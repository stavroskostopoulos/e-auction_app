import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';

//import page components
import Header from './Header';
import Signin from './SignIn';
import Signup from './SignUp';
import Bids from './Bids';
import Profile from './Profile';
import Administration from './Administration';
import ProductPage from './ProductPage';
import NewBidPage from './NewAuction';
import NotAccepted from './NotAccepted';
import MessagesPage from './MessagesPage';
import HomePage from './individual compenents/HomePage';

import "../css/App.css"
import { MuiThemeProvider } from "@material-ui/core/styles";
import { createTheme } from '@material-ui/core/styles';

function App() {

  // let navigate = useNavigate();

  const [headerValue, setHeaderValue] = React.useState(false);
  
  React.useEffect(() => {
    // navigate("/login")
   
  }, []);

  return (
    
      <div className='app-container'>
        <Router>

          <Header headerChoice={headerValue} setHeaderChoice={setHeaderValue}/>
          
          <Routes>

            <Route exact path="/" element={<HomePage/>}/>
            <Route exact path="/login" element={<Signin setHeaderChoice={setHeaderValue}/>}/>
            <Route exact path="/auctions" element={<Bids setHeaderChoice={setHeaderValue}/>}/>
            <Route exact path="/register" element={<Signup/>}/>
            <Route exact path="/profile/:userid" element={<Profile setHeaderChoice={setHeaderValue}/>}/>
            <Route exact path="/administration" element={<Administration setHeaderChoice={setHeaderValue}/>}/>
            <Route exact path="/product/:id" element={<ProductPage setHeaderChoice={setHeaderValue}/>}/>
            <Route exact path="/sell" element={<NewBidPage setHeaderChoice={setHeaderValue}/>}/>
            <Route exact path="/not-accepted" element={<NotAccepted/>}/>
            <Route exact path="/messages" element={<MessagesPage/>}/>

          </Routes>
          
        </Router>



      </div>
    
  );
}

export default App;
