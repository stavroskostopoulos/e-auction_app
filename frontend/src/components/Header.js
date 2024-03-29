import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/App.css'

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Tabs } from '@mui/material';
import Tab from '@mui/material/Tab';
import StoreIcon from '@mui/icons-material/Store';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import { makeStyles } from '@mui/styles';
import { withStyles } from "@material-ui/core/styles";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import AlarmIcon from '@mui/icons-material/Alarm';
import FaceIcon from '@mui/icons-material/Face';
import LogoutIcon from '@mui/icons-material/Logout';
import Divider from '@mui/material/Divider';
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
        transform: 'scale(1.5)',
        '&:hover': {
            cursor: 'pointer',
        },
        color: '#fff !important'
    },
    logodisabled: {
        transform: 'scale(1.5)',
        '&:hover': {
            cursor: 'default',
        },
        color: '#fff !important'
    },
    menuOptions: {
        marginLeft: '5%',
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
        fontWeight: '600!important',
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




function Header(props) {

    const classes = useStyles();
    let navigate = useNavigate();

    const [unreadMsgs, setUnreadMsgs] = React.useState(true);
    const [value, setValue] = React.useState(false);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleLogoClick = () => {
        props.setHeaderChoice("1");
    };

    const handleOpenUserMenu = (e) => {
        setAnchorElUser(e.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    function logout () {
        localStorage.removeItem("jwt");
        localStorage.removeItem("loggedUserId");
        if(localStorage.getItem("guest")) localStorage.removeItem("guest");
        if(localStorage.getItem("guest_user")) localStorage.removeItem("guest_user");
        if(localStorage.getItem("unreadMessages")) localStorage.removeItem("unreadMessages");


		console.log("logging out");
        navigate("/login")
    }


    return (
        <React.Fragment>

            <AppBar position="sticky" className={classes.root}>
                <Toolbar>

                    {/* Logo */}
                    {!localStorage.getItem("jwt") ? 
                        <IconButton className="disabled-icn-button">
                            <StoreIcon className={classes.logodisabled}/>
                        </IconButton>
                    :

                        <IconButton component={Link} to={'/auctions'} onClick={handleLogoClick}>
                            <StoreIcon className={classes.logo}/>
                        </IconButton>

                    }
    
                    {/* Menu options */}
                    <Tabs 
                        textColor="inherit"
                        value={props.headerChoice}
                        onChange={(e,value) => {props.setHeaderChoice(value);}}
                        TabIndicatorProps={{ sx: { backgroundColor: "#e4d9ff"} }}
                        className={classes.menuOptions}
                        >
                        <CustomTab className={classes.menuOption} value="1" label={<p>Auctions</p>} component={Link} to={'/auctions'} disabled={!localStorage.getItem("jwt")}/>
                        <CustomTab className={classes.menuOption} value="2" label={<p>Sell</p>} component={Link} to={'/sell'} disabled={localStorage.getItem("guest") || !localStorage.getItem("jwt")}/>
                        <CustomTab className={classes.menuOption} value="3" label={(localStorage.getItem("unreadMessages")==="true") ? <Badge anchorOrigin={{vertical: 'top', horizontal: 'left'}} color="primary" variant="dot">Inbox</Badge> : <p>Inbox</p>} component={Link} to={'/messages'} disabled={localStorage.getItem("guest") || !localStorage.getItem("jwt")}/>             
                        <CustomTab className={classes.menuOption} value="4" label={<p>Recommended</p>} component={Link} to={'/recommended'} disabled={localStorage.getItem("guest") || !localStorage.getItem("jwt")}/>
                        <CustomTab className={classes.menuOption} value="5" label={<p>Administration Page</p>} component={Link} to={'/administration'} disabled={localStorage.getItem("guest") || !localStorage.getItem("jwt")}/>
                        
                    </Tabs>

                    {/* if not logged in  */}
                    {
                        (!localStorage.getItem("jwt") || localStorage.getItem("guest_user")) &&

                        <Link to={'/login'} className={classes.linkPosition}>
                            <Button className={classes.loginBtn} variant="outlined" onClick={()=> setValue(false)}>Login</Button>
                        </Link>
                    }
                    
                    {/* if logged in */}
                    {
                        localStorage.getItem("jwt") && !localStorage.getItem("guest_user") &&
                        <>
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
                                <Link to={ `/profile/${localStorage.getItem('loggedUserId')}`} state= {{id: localStorage.getItem('loggedUserId') }} style={{ textDecoration: 'none' }} className="linkcomponent">
                                    <MenuItem key="0" onClick={handleCloseUserMenu} className='user-menu-item'>
                                        {/* <Typography textAlign="center">Profile</Typography> */}
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            flexWrap: 'wrap',
                                        }}>
                                            <span>Profile</span>
                                            <FaceIcon style={{ marginLeft: '14px'}}/>
                                    
                                        </div>
                                    </MenuItem>
                                </Link>
                                <Divider variant="middle" />
                                <MenuItem key="1" onClick={ () => {handleCloseUserMenu(); logout();} } className='user-menu-item' component={Link} to={'/login'}>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        flexWrap: 'wrap',
                                    }}>
                                        <span>Log out</span>
                                        <LogoutIcon style={{ marginLeft: '8px'}}/>
                                
                                    </div>
                                </MenuItem>
                            
                            </Menu>
                        </>
                    }



                </Toolbar>
            
            </AppBar>
        </React.Fragment>
  );
}

export default Header;
