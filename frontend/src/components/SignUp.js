import React from 'react';
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
        <div className='signin-container signup-container'>
            <div className='signin-forms-container'>
                <div className='signin-signup'>
                    <form className='signin-form'>

                        <h2 className='signin-title'>Sign Up</h2>
                        <div className='input-field'>
                            <CssTextField id="outlined-basic" className={classes.loginField} label="First name" variant="outlined" />
                        </div>
                        <div className='input-field'>
                            <CssTextField id="outlined-basic" className={classes.loginField} label="Last name" variant="outlined" />
                        </div>
                        <div className='input-field'>
                            <CssTextField id="outlined-basic" className={classes.loginField} label="Username" variant="outlined" />
                        </div>
                        <div className='input-field'>
                            <CssTextField id="outlined-basic" className={classes.loginField} label="Email" type="email" variant="outlined" />
                        </div>
                        <div className='input-field'>
                            <CssTextField id="outlined-basic" className={classes.loginField} label="Password" type="password" variant="outlined" />
                        </div>
                        <Button className={classes.loginFormBtn} variant="contained">Register</Button>

                        <p className='register-advice-text'>Already own an account? Sign in</p>
                    </form>

                </div>
            </div>

        

        </div>

        
        
      
    );
}

export default Login;
