import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './Header';
import Signin from './SignIn';
import Signup from './SignUp';
import MainContainer from './MainContainer';

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
          </Routes>
          {/* login */}
          {/* <Signin/> */}

          {/* register */}
          {/* <Signup/> */}

          {/* appcontains */}
          {/* <div className='main-container'>
            <div className="column-left" />
            <div className="column-right"/>
            <div className="column-middle" style={{backgroundColor: "#fff"}}>
              <h1>O PASIOS GAMIETAI</h1>
              
            </div>
          </div> */}
        </Router>



      </div>
    
  );
}

export default App;
