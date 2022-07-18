import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

//import styling
import "../css/SignIn.css"

//import variables
import userTypes from '../variables/userTypes';

//import custom components
import Map from './individual compenents/Map';
import InputMap from './individual compenents/InputMap';

//import Material UI components
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import { withStyles } from "@material-ui/core/styles";
import MenuItem from '@mui/material/MenuItem';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Stack from '@mui/material/Stack';
import InputAdornment from '@mui/material/InputAdornment';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import MyLocationIcon from '@mui/icons-material/MyLocation';


const CssTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: '#1e2749',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#1e2749',
        },
        '& .MuiOutlinedInput-root': {
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
        minWidth: '380px !important',
        width: '100%',
        
    },
    loginFieldTele: {
        maxWidth: '400px',
        width: '100%',
        marginTop: '30px!important',
        
    },
    loginFormBtn: {
        width: '150px',
        height: '49px',
        borderRadius: '25px!important',
        backgroundColor: '#7e3fbd!important',
        cursor: 'pointer',
        marginTop: '20px!important',
        '&:hover': {
            transition: '1s',
            backgroundColor: '#9966cc!important'
        }
        
    },
    loginFormBtnFinal: {
        width: '150px',
        height: '49px',
        borderRadius: '25px!important',
        backgroundColor: '#7e3fbd!important',
        cursor: 'pointer',
        marginTop: '30px!important',
        '&:hover': {
            transition: '1s',
            backgroundColor: '#9966cc!important'
        }
        
    },
    loginFormBtnFinalBack: {
        width: '150px',
        height: '49px',
        borderRadius: '25px!important',
        backgroundColor: '#866ca0!important',
        cursor: 'pointer',
        marginTop: '30px!important',
        '&:hover': {
            transition: '1s',
            backgroundColor: '#9966cc!important'
        }
        
    }

});

function Login() {

    const profiletypes = userTypes;

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

    const [tele, setTele] = React.useState('');
    const [showEmptyTele, setShowEmptyTele] = React.useState(false);
    const [showNonNumeric, setShowNonNumeric] = React.useState(false);

    const [afm, setAfm] = React.useState('');
    const [showEmptyAfm, setShowEmptyAfm] = React.useState(false);

    const [type, setType] = React.useState(2);

    const [pass, setPass] = React.useState('');
    const [showEmptyPass, setShowEmptyPass] = React.useState(false);
    const [showIncorrectPass, setShowIncorrectPass] = React.useState(false);
    const [showUnmatchingPass, setShowUnmatchingPass] = React.useState(false);

    const [pass2, setPass2] = React.useState('');
    const [showEmptyPass2, setShowEmptyPass2] = React.useState(false);

    const [location, setLocation] = React.useState([37.96867087793514, 23.76662747322076]);
    const [showEmptyLocation, setShowEmptyLocation] = React.useState(false);

    //Check if password contains at least one uppercase, lowercase letter and digit
    const passwordValid = (str) => {
        return /[a-z]/.test(str) && /[A-Z]/.test(str) && /\d/.test(str);
    }

    const isNumeric = (str) => {
        return /^-?\d+$/.test(str);
    }


    const classes = useStyles();

    const handleChange = (event) => {
        setProfiletype(event.target.value);
    };

    const proceedtoStepTwoOfSignUp = (e) => {
        e.preventDefault();
        console.log("tzimakos");
        (!email) ? setShowEmptyEmail(true) : setShowEmptyEmail(false);
        (!realname) ? setShowEmptyRealname(true) : setShowEmptyRealname(false);
        (!surname) ? setShowEmptySurname(true) : setShowEmptySurname(false);
        (!username) ? setShowEmptyUsername(true) : setShowEmptyUsername(false);
        (!afm) ? setShowEmptyAfm(true) : setShowEmptyAfm(false);
        //Password checking
        if(!pass){
            setShowEmptyPass(true);
        }else{
            (!passwordValid(pass)) ?
                setShowIncorrectPass(true) : setShowIncorrectPass(false);
            
        }

        //Pass2 shit
        if(!pass2){
            setShowEmptyPass2(true);
            return;
        }

        //compare the two passwords
        if(pass!==pass2){
            setShowUnmatchingPass(true);
            return;
        }
        
        if(email && realname && surname && afm && username){
            // proceed to step 2 of sign up
            setLocationpick(true);
        }


    }

    


    const sendSignUpCredentials = async (e) => {
        e.preventDefault();
    
        
        (location[0]==37.96867087793514 && location[1]==23.76662747322076) ? setShowEmptyLocation(true) : setShowEmptyLocation(false);
        
        if(!tele){

            setShowEmptyTele(true);
            return;

        }else{

            setShowEmptyTele(false);

            if(!isNumeric(tele)){
                setShowNonNumeric(true);
                return;
            }else{
                setShowNonNumeric(false);
            }

        }
        
        if(location[0]==37.96867087793514 && location[1]==23.76662747322076 && !tele) return;

        try {
            const res = await axios.post('https://localhost:8443/api/users/save', {
                    username,
                    pass,
                    email,
                    realname,
                    surname,
                    tele,
                    afm,
                    latitude: location[1].toString(),
                    longitude: location[0].toString(),
                    type
                }
                ,{ headers: {  Access_token: 'Bearer ' + localStorage.getItem('jwt')} });
        }catch(err){
            console.log(err)
        }
    
    }
    
    return (
        <div className='signin-container signup-container'>
            {console.log(location)}
                <div className='signupart'/>
                <div className='signform'>

                    <form className='signin-form'>

                        <h2 className='signin-title'>Sign Up</h2>

                        


                        {!locationpick &&
                        <Stack spacing={1.5} className='signup-stack-1'>
                        
                                {showIncorrectPass && <Alert severity="error" className='signin-signup-alert'>Password must contain at least one uppercace letter, and one digit!</Alert>}
                                {showUnmatchingPass && <Alert severity="error" className='signin-signup-alert'>Passwords do not match!</Alert>}
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
                        
                                            
                        
                        
                                <Button type="button" className={classes.loginFormBtn} endIcon={<ArrowForwardIcon/>} variant="contained" onClick={proceedtoStepTwoOfSignUp}>Next</Button>
                                {/* <Button type="button" className={classes.loginFormBtn} endIcon={<ArrowForwardIcon/>} variant="contained" onClick={sendSignUpCredentials}>Next</Button> */}
                            </Stack>
                        }
                        


                        {/* if the user clicked on "next" proceed to: .... */}
                    
                        {locationpick &&
                            <Stack spacing={1.5} className='signup-stack-1'>
                                
    

                                <InputMap inputMapSetLocation={setLocation} mapWidth="400px" mapHeight="320px" fieldSize="medium" textFieldClass="location-textfield" buttonClass="location-button" containsStackClass="signup-stack-1" buttonContainerClass="location-button-container" textfieldError={showEmptyLocation} />
                                

                                <CssTextField id="outlined-basic"
                                    InputProps={{

                                        endAdornment: (
                                        <InputAdornment position="start">
                                            <LocalPhoneIcon />
                                        </InputAdornment>
                                        ),
                            
                                    }}
                                    className={classes.loginFieldTele} 
                                    label="Phone number" 
                                    variant="outlined" 
                                    value={tele} 
                                    onChange={(e)=>setTele(e.target.value)} 
                                    error={showEmptyTele || showNonNumeric}
                                />

                                <Stack direction="row" spacing={2}>
                                    <Button type="button" className={classes.loginFormBtnFinalBack} startIcon={<KeyboardBackspaceIcon/>} variant="contained" onClick={() => setLocationpick(false)}>Back</Button>
                                    <Button type="button" className={classes.loginFormBtnFinal} variant="contained" onClick={sendSignUpCredentials}>Register</Button>
                                </Stack>
                            </Stack>


                        }
                        
                            

                        
                        <p className='register-advice-text'>Already own an account? <Link to={'/login'}>Sign in</Link></p>
                    </form>
                </div>

        </div>
            

        
        
      
    );
}

export default Login;
