import React from 'react';
import { Link } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Tabs } from '@mui/material';
import Tab from '@mui/material/Tab';
import StoreIcon from '@mui/icons-material/Store';
import Avatar from '@mui/material/Avatar';
import { makeStyles } from '@mui/styles';
import { withStyles } from "@material-ui/core/styles";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

const CustomTab = withStyles({
    selected: {
      color: '#e4d9ff !important',
    },
})(Tab);



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
    },
    avatarImg: {
        marginLeft: 'auto!important',
        cursor: ' pointer'
    },
    linkPosition: {
        marginLeft: 'auto!important'
    }
});

// ----------------------------------------------------------------------




function Header() {

    const classes = useStyles();



    const [value, setValue] = React.useState(false);
    const [admin, setAdmin] = React.useState(false);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenUserMenu = (e) => {
        setAnchorElUser(e.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <React.Fragment>

            <AppBar position="sticky" className={classes.root}>
                <Toolbar>

                    {/* Logo */}
                    <StoreIcon className={classes.logo} />

                    {/* Menu options */}
                    <Tabs 
                        textColor="inherit"
                        value={value}
                        onChange={(e,value) => {setValue(value);
                            {console.log(value)}; }}
                        TabIndicatorProps={{ sx: { backgroundColor: "#e4d9ff"} }}
                        className={classes.menuOptions}
                        >
                        <CustomTab className={classes.menuOption} value="1" label="Home" component={Link} to={'/'}/>
                        <CustomTab className={classes.menuOption} value="2" label="Bids" component={Link} to={'/login'}/>
                        <CustomTab className={classes.menuOption} value="3" label="Services" component={Link} to={'/product'}/>
                        <CustomTab className={classes.menuOption} value="4" label="Settings"/>
                        {!admin &&
                            <CustomTab className={classes.menuOption} value="5" label="Administration Page" component={Link} to={'/administration'}/>
                        }
                    </Tabs>

                    {/* if not logged in  */}
                    {/* <Link to={'/login'} className={classes.linkPosition}>
                        <Button className={classes.loginBtn} variant="outlined" onClick={()=> setValue(false)}>Login</Button>
                    </Link> */}
                    
                    {/* if logged in */}
                    
                    <Avatar alt="Travis Howard" src="/faithplusone.jpg" className={classes.avatarImg} onClick={handleOpenUserMenu}/>
                    <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        <MenuItem key="0" onClick={handleCloseUserMenu} className='user-menu-item' component={Link} to={'/profile'}>
                            <Typography textAlign="center">Profile</Typography>
                        </MenuItem>
                        <MenuItem key="1" onClick={handleCloseUserMenu} className='user-menu-item' component={Link} to={'/login'}>
                            <Typography textAlign="center">Log Out</Typography>
                        </MenuItem>
                       
                    </Menu>




                </Toolbar>
            
            </AppBar>
        </React.Fragment>
  );
}

export default Header;
