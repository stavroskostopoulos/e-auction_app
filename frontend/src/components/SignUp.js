import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

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




    //Attributes
    const [realname, setRealname] = React.useState('');
    const [surname, setSurname] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [tele, setTele] = React.useState('6983892590');
    const [afm, setAfm] = React.useState('');
    const [type, setType] = React.useState(2);
    const [pass, setPass] = React.useState('');
    const [username, setUsername] = React.useState('');




    const classes = useStyles();

    const handleChange = (event) => {
        setProfiletype(event.target.value);
    };


    const postUser = (e) => {
        e.preventDefault();
        axios.post('https://localhost:8443/api/users', {
            username,
            pass,
            email,
            realname,
            surname,
            tele,
            afm,
            type
        }).then(res => console.log('Posting data', res))
        .catch(error => console.log(error.response.data))
    }

    return (
        <div className='signin-container signup-container'>
            <div className='signin-forms-container'>
                <div className='signin-signup'>
                    <form className='signin-form'>

                        <h2 className='signin-title'>Sign Up</h2>
                        {!locationpick &&
                            <div className='input-field'>
                                <CssTextField id="outlined-basic" className={classes.loginField} label="First name" variant="outlined" value={realname} onChange={(e)=>setRealname(e.target.value)} />
                            </div>
                        }
                        {!locationpick &&
                            <div className='input-field'>
                                <CssTextField id="outlined-basic" className={classes.loginField} label="Last name" variant="outlined" value={surname} onChange={(e)=>setSurname(e.target.value)} />
                            </div>
                        }
                        {!locationpick &&
                            <div className='input-field'>
                                <CssTextField id="outlined-basic" className={classes.loginField} label="Username" variant="outlined" value={username} onChange={(e)=>setUsername(e.target.value)} />
                            </div>
                        }
                        {!locationpick &&
                            <div className='input-field'>
                                <CssTextField id="outlined-basic" className={classes.loginField} label="Email" type="email" variant="outlined" value={email} onChange={(e)=>setEmail(e.target.value)} />
                            </div>
                        }
                        {!locationpick &&
                            <div className='input-field'>
                                <CssTextField id="outlined-basic" className={classes.loginField} label="ΑΦΜ" variant="outlined" value={afm} onChange={(e)=>setAfm(e.target.value)} />
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
                                <CssTextField id="outlined-basic" className={classes.loginField} label="Password" type="password" variant="outlined" value={pass} onChange={(e)=>setPass(e.target.value)} />
                            </div>
                        }
                        {!locationpick &&
                            <div className='input-field'>
                                <CssTextField id="outlined-basic" className={classes.loginField} label="Confirm password" type="password" variant="outlined" />
                            </div>
                        }                        
                        
                        {!locationpick &&
                            // <Button type="button" className={classes.loginFormBtn} endIcon={<ArrowForwardIcon/>} variant="contained" onClick={() => setLocationpick(true)}>Next</Button>
                            <Button type="button" className={classes.loginFormBtn} endIcon={<ArrowForwardIcon/>} variant="contained" onClick={postUser}>Next</Button>

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
