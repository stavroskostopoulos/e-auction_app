import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './Header';
import Signin from './SignIn';
import Signup from './SignUp';
import MainContainer from './MainContainer';
import Profile from './Profile';
import Administration from './Administration';

import "../css/App.css"
import { MuiThemeProvider } from "@material-ui/core/styles";
import { createTheme } from '@material-ui/core/styles';

function App() {
  

  return (
    
      <div className='app-container'>
        <Router>

          <Header />
          
          <Routes>

            <Route exact path="/" element={<MainContainer/>}/>
            <Route exact path="/login" element={<Signin/>}/>
            <Route exact path="/register" element={<Signup/>}/>
            <Route exact path="/profile" element={<Profile/>}/>
            <Route exact path="/administration" element={<Administration/>}/>

          </Routes>
          
        </Router>



      </div>
    
  );
}

export default App;
