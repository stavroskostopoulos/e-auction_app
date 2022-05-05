import React from 'react';
import { Link } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Tabs } from '@mui/material';
import Tab from '@mui/material/Tab';
import StoreIcon from '@mui/icons-material/Store';
import { makeStyles } from '@mui/styles';

// ----------------------------------------------------------------------

const useStyles = makeStyles({
    root: {
        background: '#1e2749!important'
    },
    logo: {
        transform: 'scale(1.5)'
    },
    menuOptions: {
        marginLeft: '5%'
    },
    loginBtn: {
        marginLeft: 'auto!important',
        color: '#e4d9ff!important',
        borderColor: '#e4d9ff!important',
        textTransform: 'unset!important',
        '&:hover': {
            backgroundColor: '#e4d9ff!important',
            color: '#1e2749!important'
        }
    },
    menuOption: {
        textTransform: 'unset!important',
        '&:hover': {
            color: '#e4d9ff!important'
        }
    }
});

// ----------------------------------------------------------------------


const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];


function Header() {

    const classes = useStyles();

    const [value, setValue] = React.useState();


    

    return (
        <React.Fragment>

            <AppBar position="static" className={classes.root}>
                <Toolbar>

                    {/* Logo */}
                    <StoreIcon className={classes.logo} />

                    {/* Menu options */}
                    <Tabs 
                        textColor="inherit"
                        value={value}
                        onChange={(e,value) => setValue(value)}
                        TabIndicatorProps={{ sx: { backgroundColor: "#e4d9ff"} }}
                        className={classes.menuOptions}
                        >
                        <Tab className={classes.menuOption} label="Home"/>
                        <Tab className={classes.menuOption} label="Bids"/>
                        <Tab className={classes.menuOption} label="Services"/>
                        <Tab className={classes.menuOption} label="Settings"/>

                    </Tabs>

                    <Button className={classes.loginBtn} variant="outlined">Login</Button>
                
                </Toolbar>
            
            </AppBar>
        </React.Fragment>
  );
}

export default Header;
