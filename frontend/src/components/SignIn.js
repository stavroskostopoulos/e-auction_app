import React from 'react';
import { Link } from 'react-router-dom';

import "../css/SignIn.css"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import { withStyles } from "@material-ui/core/styles";

const CssTextField = withStyles({
    root: {
      '& label.Mui-focused': {
        color: '#1e2749',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: '#1e2749',
      },
      '& .MuiOutlinedInput-root': {
        
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

    return (
        <div className='signin-container'>
            <div className='signin-forms-container'>
                <div className='signin-signup'>
                    <form className='signin-form'>

                        <h2 className='signin-title'>Sign in</h2>
                        <div className='input-field'>
                            <CssTextField id="outlined-basic" className={classes.loginField} label="Username" variant="outlined" />
                        </div>
                        <div className='input-field'>
                            <CssTextField id="outlined-basic" className={classes.loginField} label="Password" type="password" variant="outlined" />
                        </div>
                        <Button className={classes.loginFormBtn} variant="contained">Login</Button>
                        <p className='register-advice-text'>New here? <Link to={'/register'}>Create an account</Link></p>
                    </form>

                </div>
            </div>

        

        </div>

        // <form className='login-form'>

        //     {/* Email address */}
        //     <div className='input-group span-2'>
        //         {/* <label className='input-label'>Όνομα χρήστη:</label> */}
        //         <CssTextField id="outlined-basic" className={classes.loginField} label="Username" variant="outlined" />
        //         {/* <input type='text' className='input-text' placeholder='Όνομα χρήστη'></input> */}
        //     </div>

        //     {/* Password */}
        //     <div className='input-group span-2'>
        //         {/* <label className='input-label'>Κωδικός πρόσβασης:</label> */}
        //         <CssTextField id="outlined-basic" className={classes.loginField} label="Password" type="password" variant="outlined" />
        //         {/* <input type='password' className='input-text' placeholder='Κωδικός Πρόσβασης'></input> */}
        //     </div>

            

        //     <div className='input-group'>
        //         {/* <button className='input-button'>Εγγραφή</button> */}
        //         <Button className={classes.registerFormBtn} variant="contained">Register</Button>
        //     </div>
        //     <div className='input-group'>
        //         {/* <button className='input-button'>Login</button> */}
        //         <Button className={classes.loginFormBtn} variant="contained">Login</Button>
        //     </div>

        // </form>
        
      
    );
}

export default Login;
