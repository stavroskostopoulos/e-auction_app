import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import "../css/SignIn.css"
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import { withStyles } from "@material-ui/core/styles";
import MenuItem from '@mui/material/MenuItem';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Stack from '@mui/material/Stack';

const CssTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: '#1e2749',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#1e2749',
        },
        '& .MuiOutlinedInput-root': {
            minWidth: '380px !important',
            width: '100% !important',
            textAlign: 'left',
            

            '&.Mui-focused fieldset': {
            borderColor: '#1e2749',
            } 

        }

    }
  })(TextField);

const useStyles = makeStyles({
    loginField: {
        maxWidth: '400px',
        width: '100%',
        
    },
    loginFormBtn: {
        width: '150px',
        height: '49px',
        borderRadius: '49px!important',
        backgroundColor: '#7e3fbd!important',
        cursor: 'pointer',
        marginTop: '20px!important',
        '&:hover': {
            transition: '1s',
            backgroundColor: '#9966cc!important'
        }
        
    }
});

function Login() {

    const profiletypes = ['Seller', 'Bidder', 'Malakas'];

    const [profiletype, setProfiletype] = React.useState('Seller');
    const [locationpick, setLocationpick] = React.useState(false);




    //Credentials and their alerts
    const [realname, setRealname] = React.useState('');
    const [showEmptyRealname, setShowEmptyRealname] = React.useState(false);
    
    const [surname, setSurname] = React.useState('');
    const [showEmptySurname, setShowEmptySurname] = React.useState(false);
    
    const [username, setUsername] = React.useState('');
    const [showEmptyUsername, setShowEmptyUsername] = React.useState(false);

    const [email, setEmail] = React.useState('');
    const [showEmptyEmail, setShowEmptyEmail] = React.useState(false);

    const [tele, setTele] = React.useState('6983892590');
    const [showEmptyTele, setShowEmptyTele] = React.useState(false);

    const [afm, setAfm] = React.useState('');
    const [showEmptyAfm, setShowEmptyAfm] = React.useState(false);

    const [type, setType] = React.useState(2);

    const [pass, setPass] = React.useState('');
    const [showEmptyPass, setShowEmptyPass] = React.useState(false);
    const [showIncorrectPass, setShowIncorrectPass] = React.useState(false);

    const [pass2, setPass2] = React.useState('');
    const [showEmptyPass2, setShowEmptyPass2] = React.useState(false);


    //Check if password contains at least one uppercase, lowercase letter and digit
    const passwordValid = (str) => {
        return /[a-z]/.test(str) && /[A-Z]/.test(str) && /\d/.test(str);
    }



    const classes = useStyles();

    const handleChange = (event) => {
        setProfiletype(event.target.value);
    };


    const sendSignUpCredentials = (e) => {
        e.preventDefault();
    
        (!email) ? setShowEmptyEmail(true) : setShowEmptyEmail(false);
        (!realname) ? setShowEmptyRealname(true) : setShowEmptyRealname(false);
        (!surname) ? setShowEmptySurname(true) : setShowEmptySurname(false);
        (!username) ? setShowEmptyUsername(true) : setShowEmptyUsername(false);
        (!afm) ? setShowEmptyAfm(true) : setShowEmptyAfm(false);
        
        //Password checking
        if(!pass){
            setShowEmptyPass(true);
        }else{
            if(!passwordValid(pass)){
                setShowIncorrectPass(true);
            }
        }
        
    
        // axios.post('https://localhost:8443/api/users', {
        //     username,
        //     pass,
        //     email,
        //     realname,
        //     surname,
        //     tele,
        //     afm,
        //     type
        // }).then(res => console.log('Posting data', res))
        // .catch(error => console.log(error.response.data))
    }
    
    return (
        <div className='signin-container signup-container'>
                <div className='signupart'/>
                <div className='signform'>

                    <form className='signin-form'>

                        <h2 className='signin-title'>Sign Up</h2>

                        


                        {!locationpick &&
                        <Stack spacing={1.5} className='signup-stack-1'>
                        
                                {showIncorrectPass && <Alert severity="error" className='signin-signup-alert'>Password must contain at least one uppercace letter, and one digit!</Alert>}
                            
                                <CssTextField id="outlined-basic"  className={classes.loginField} label="First name" variant="outlined" value={realname} onChange={(e)=>setRealname(e.target.value)} error={showEmptyRealname}/>
                            
                        
                            
                                <CssTextField id="outlined-basic" className={classes.loginField} label="Last name" variant="outlined" value={surname} onChange={(e)=>setSurname(e.target.value)} error={showEmptySurname} />
                            
                        
                        
                            
                                <CssTextField id="outlined-basic" className={classes.loginField} label="Username" variant="outlined" value={username} onChange={(e)=>setUsername(e.target.value)} error={showEmptyUsername}/>
                            
                        
                        
                            
                                <CssTextField id="outlined-basic" className={classes.loginField} label="Email" type="email" variant="outlined" value={email} onChange={(e)=>setEmail(e.target.value)} error={showEmptyEmail}/>
                            
                                <CssTextField id="outlined-basic" className={classes.loginField} label="ΑΦΜ" variant="outlined" value={afm} onChange={(e)=>setAfm(e.target.value)} error={showEmptyAfm}/>
                            

                                <CssTextField

                                    id="outlined-select-currency"
                                    select
                                    label="Type"
                                    value={profiletype}
                                    onChange={handleChange}
                                    className={classes.loginField}
                                >
                                    {profiletypes.map((option) => (
                                        <MenuItem key={option} value={option}>
                                        {option}
                                        </MenuItem>
                                    ))}
                                </CssTextField>
                            
                        
                            
                                <CssTextField id="outlined-basic" className={classes.loginField} label="Password" type="password" variant="outlined" value={pass} onChange={(e)=>setPass(e.target.value)} error={showEmptyPass || showIncorrectPass}   />
                        
                           
                                <CssTextField id="outlined-basic" className={classes.loginField} label="Confirm password" type="password" variant="outlined" value={pass2} onChange={(e)=>setPass2(e.target.value)} error={showEmptyPass2} />
                        
                                            
                        
                        
                                {/* <Button type="button" className={classes.loginFormBtn} endIcon={<ArrowForwardIcon/>} variant="contained" onClick={() => setLocationpick(true)}>Next</Button> */}
                                <Button type="button" className={classes.loginFormBtn} endIcon={<ArrowForwardIcon/>} variant="contained" onClick={sendSignUpCredentials}>Next</Button>
                            </Stack>
                        }
                        


                        {/* if the user clicked on "next" proceed to: .... */}
                        
                        {locationpick &&
                            <h3 className="location-title">Choose your location</h3>
                        }
                        {locationpick &&
                            <h3 className="location-title">Choose your location</h3>
                        }
                        {locationpick &&
                            <div className='input-field'>
                                <CssTextField id="outlined-basic" className={classes.loginField} label="Confirm password" variant="outlined" />
                            </div>
                        }
                        {locationpick &&
                            <div className='input-field'>
                                <CssTextField id="outlined-basic" className={classes.loginField} label="Confirm password" variant="outlined" />
                            </div>
                        }
                        {locationpick &&
                            <Button className={classes.loginFormBtn} variant="contained">Register</Button>
                        }
                            

                        
                        <p className='register-advice-text'>Already own an account? <Link to={'/login'}>Sign in</Link></p>
                    </form>
                </div>

        </div>
            

        
        
      
    );
}

export default Login;
