import React from 'react';
import { Link } from 'react-router-dom';

import "../css/SignIn.css"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import { withStyles } from "@material-ui/core/styles";
import MenuItem from '@mui/material/MenuItem';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

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

    const profiletypes = ['Seller', 'Bidder', 'Malakas'];

    const [profiletype, setProfiletype] = React.useState('Seller');
    const [locationpick, setLocationpick] = React.useState(false);


    const classes = useStyles();

    const handleChange = (event) => {
        setProfiletype(event.target.value);
    };

    return (
        <div className='signin-container signup-container'>
            <div className='signin-forms-container'>
                <div className='signin-signup'>
                    <form className='signin-form'>

                        <h2 className='signin-title'>Sign Up</h2>
                        {!locationpick &&
                            <div className='input-field'>
                                <CssTextField id="outlined-basic" className={classes.loginField} label="First name" variant="outlined" />
                            </div>
                        }
                        {!locationpick &&
                            <div className='input-field'>
                                <CssTextField id="outlined-basic" className={classes.loginField} label="Last name" variant="outlined" />
                            </div>
                        }
                        {!locationpick &&
                            <div className='input-field'>
                                <CssTextField id="outlined-basic" className={classes.loginField} label="Username" variant="outlined" />
                            </div>
                        }
                        {!locationpick &&
                            <div className='input-field'>
                                <CssTextField id="outlined-basic" className={classes.loginField} label="Email" type="email" variant="outlined" />
                            </div>
                        }
                        {!locationpick &&
                            <div className='input-field'>
                                <CssTextField id="outlined-basic" className={classes.loginField} label="ΑΦΜ" variant="outlined" />
                            </div>
                        }
                        {!locationpick &&

                            <div className='input-field'>

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
                            </div>
                        }
                        {!locationpick &&
                            <div className='input-field'>
                                <CssTextField id="outlined-basic" className={classes.loginField} label="Password" type="password" variant="outlined" />
                            </div>
                        }
                        {!locationpick &&
                            <div className='input-field'>
                                <CssTextField id="outlined-basic" className={classes.loginField} label="Confirm password" type="password" variant="outlined" />
                            </div>
                        }                        
                        
                        {!locationpick &&
                            <Button type="button" className={classes.loginFormBtn} endIcon={<ArrowForwardIcon/>} variant="contained" onClick={() => setLocationpick(true)}>Next</Button>
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

        

        </div>

        
        
      
    );
}

export default Login;
