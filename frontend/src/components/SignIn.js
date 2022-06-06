import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


import "../css/SignIn.css"

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import { withStyles } from "@material-ui/core/styles";
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

function Login() {

    const classes = useStyles();
    const [username, setUsername] = React.useState('');
    const [showEmptyUsername, setShowEmptyUsername] = React.useState(false);

    const [pass, setPass] = React.useState('');
    const [showEmptyPass, setShowEmptyPass] = React.useState(false);


    const sendSignInCredentials = async (e) => {

        e.preventDefault();

        if(!username) {
            setShowEmptyUsername(true);
            return;
        }
            
        if(!pass){
            setShowEmptyPass(true);
            return;   
        }


        // axios.post('https://localhost:8443/login', {
        //     username,
        //     pass
        // }).then( res => console.log(res))
        // .catch(error => console.log(error.response.data));

        const response = await axios.post('https://localhost:8443/login', { username, pass});
        console.log(response);
    };

    return (
        <div className='signin-container'>
            <div className='signinart'/>
            <div className='signform'>
                    <form className='signin-form'>

                        <h2 className='signin-title'>Sign in</h2>
                        <Stack spacing={1.5} className='signup-stack-1'>

                            
                            <CssTextField id="outlined-basic" className={classes.loginField} label="Username" variant="outlined" value={username} onChange={(e) => setUsername(e.target.value)} error={showEmptyUsername} />
                            
                            
                            <CssTextField id="outlined-basic" className={classes.loginField} label="Password" type="password" variant="outlined" value={pass} onChange={(e) => setPass(e.target.value)} error={showEmptyPass} />
                            
                            <Button className={classes.loginFormBtn} variant="contained" onClick={sendSignInCredentials}>Login</Button>
                            <p className='register-advice-text'>New here? <Link to={'/register'}>Create an account</Link></p>
                        </Stack>

                    </form>

                </div>
        </div>
  
        
      
    );
}

export default Login;
