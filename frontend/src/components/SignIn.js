import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


import "../css/SignIn.css"

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import { withStyles } from "@material-ui/core/styles";
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';

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
        maxWidth: '380px',
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

function Login(props) {

    const classes = useStyles();
    let navigate = useNavigate();

    const [username, setUsername] = React.useState('');
    const [showEmptyUsername, setShowEmptyUsername] = React.useState(false);

    const [pass, setPass] = React.useState('');
    const [showEmptyPass, setShowEmptyPass] = React.useState(false);

    //errors
    const [credentialsError, setCredentialsError] = React.useState(false);
    const [guestError, setGuestError] = React.useState(false);

    React.useEffect(() => {

        //reset header choice (NavBar focus)
        props.setHeaderChoice(false);

    }, []);

    const sendSignInCredentials = async (e) => {

        e.preventDefault();

        // (!username) ? setShowEmptyUsername(true) : setShowEmptyUsername(false);
            
        // (!pass) ? setShowEmptyPass(true) : setShowEmptyPass(false);
            
        if(!username){
            if(!pass){ 
                setShowEmptyPass(true); 
            }else{
                setShowEmptyPass(false);
            }

            setShowEmptyUsername(true);

            return;
        }

        if(!pass){
            setShowEmptyPass(true);

            return;
        }

        setShowEmptyUsername(false);
        setShowEmptyPass(false);

        try{

            const res = await axios.post('https://localhost:8443/login', {
                username,
                pass
            });

            //there is a possibility a guest user decides to sign in 
            if(localStorage.getItem("jwt")) localStorage.removeItem("jwt");
            if(localStorage.getItem("loggedUserId")) localStorage.removeItem("loggedUserId");
            if(localStorage.getItem("guest")) localStorage.removeItem("guest");
            if(localStorage.getItem("guest_user")) localStorage.removeItem("guest_user");



            // console.log(res.data.split(' ')[0].split(':')[1]);
            localStorage.setItem("loggedUserId", res.data.split(' ')[0].split(':')[1]);

            localStorage.setItem("jwt", res.data.split(' ').pop());

            const result = await axios.get(`https://localhost:8443/api/users/accepted/${localStorage.getItem("loggedUserId")}`, { headers: {  Access_token: 'Bearer ' + localStorage.getItem('jwt')} });

            if(result.data === 1){
                localStorage.setItem("guest", true);
            }

            setCredentialsError(false);
            navigate("/auctions");

        }catch(err){
           console.log(err);
           setCredentialsError(true);
        }

    };

    const signInAsGuest = async () => {
        try{
            const res = await axios.post('https://localhost:8443/login', {
                username: "guest",
                pass: "null"
            });

            localStorage.setItem("loggedUserId", res.data.split(' ')[0].split(':')[1]);
            localStorage.setItem("jwt", res.data.split(' ').pop());
            localStorage.setItem("guest", true);
            localStorage.setItem("guest_user", true);

            props.setHeaderChoice("1");
            navigate("/auctions");

        }catch(err){
            console.log(err);
            setGuestError(true);

        }
    };

    return (
        <div className='signin-container'>
            <div className='signinart'/>
            <div className='signform'>
                    <form className='signin-form'>

                        <h2 className='signin-title'>Sign in</h2>
                        <Stack spacing={1.5} className='signup-stack-1'>

                            {credentialsError && <Alert severity="error" className='signinalert'>Your sign in credentials don't match any account in our system.</Alert>}
                            {guestError && <Alert severity="error" className='signinalert'>Browsing as a guest is temporarily unavailable!</Alert>}
                            
                            <CssTextField id="outlined-basic" className={classes.loginField} label="Username" variant="outlined" value={username} onChange={(e) => setUsername(e.target.value)} error={showEmptyUsername} />
                            
                            
                            <CssTextField id="outlined-basic" className={classes.loginField} label="Password" type="password" variant="outlined" value={pass} onChange={(e) => setPass(e.target.value)} error={showEmptyPass} />
                            
                            <Button className={classes.loginFormBtn} variant="contained" onClick={sendSignInCredentials}>Login</Button>
                            <p className='register-advice-text'>New here? <Link to={'/register'}>Create an account</Link></p>
                            <Button endIcon={<DirectionsRunIcon/>} className="guest-button" variant="contained" onClick={signInAsGuest}>Continue as a guest</Button>
                            
                        </Stack>

                    </form>

                </div>
        </div>
  
        
      
    );
}

export default Login;
