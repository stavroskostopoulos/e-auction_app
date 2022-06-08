import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from "@material-ui/core/styles";
import { makeStyles } from '@mui/styles';

//import styling
import '../css/ProductPage.css'

//import custom components
import BidHistory from './individual compenents/BidHistory';
import Map from './individual compenents/Map';

//import images
import electronicImages from '../images/image exports/ElectronicImages'

//import material UI components
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import PanToolIcon from '@mui/icons-material/PanTool';
import FormControl from '@mui/material/FormControl';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CheckIcon from '@mui/icons-material/Check';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import AlarmIcon from '@mui/icons-material/Alarm';
import PersonSharpIcon from '@mui/icons-material/PersonSharp';
import LocalMallIcon from '@mui/icons-material/LocalMall';

const CustomOutlinedInput = withStyles({
    root: {
        '&.Mui-focused fieldset': {
            borderColor: '#1e2749 !important',
            
        }
    }
})(OutlinedInput);

const CustomInputLabel = withStyles({
    root: {
        '&.Mui-focused': {
            color: '#1e2749 !important',
        }
    }
})(InputLabel);

function priceRangetext(value) {
	return `${value}€`;
}

function ProductPage() {

    //DEN KSEXNW:
    //ALLAZW CURRENT PRICE ME PROPS
    //FWTOGRAFIA ME INDEX PROPS
    // .TOFIXED(2)


	const [previousBids, setPreviousBids] = React.useState(["1", "2", "3", "4", "5", "6", "7"]);

    
    const [dataMenuValue, setDataMenuValue] = React.useState("1");

    const currentprice = 130.20;

    const [newBid, setNewBid] = React.useState(currentprice); //+1 !!!!
    const [invalidNewBid, setInvalidNewBid] = React.useState(false);

    const [openDialogBid, setOpenDialogBid] = React.useState(false);
    const [openDialogBuyNow, setOpenDialogBuyNow] = React.useState(false);

    const [location, setLocation] = React.useState([37.96867087793514, 23.76662747322076]);

    const buyNow_flag = true; //if the porduct has a buy now option, we'll use this flag to show it
    const [buyNowPrice, setBuyNowPrice] = React.useState("12,99")

    const handleClickOpenDialogBid = () => {
      setOpenDialogBid(true);
    };
  
    const handleCloseDialogBid = () => {
      setOpenDialogBid(false);
    };

    const handleClickOpenDialogBuyNow = () => {
        setOpenDialogBuyNow(true);
    };

    const handleCloseDialogBuyNow = () => {
    setOpenDialogBuyNow(false);
    };


    const UpdateBidAmount = (value) =>  {
        console.log(value , currentprice, (value > currentprice));
        (value > currentprice) ?  setInvalidNewBid(false) : setInvalidNewBid(true);
        setNewBid(value);
        
    }
    

    return (
            <div className="main-container">
            	<div className="column-left" />
              	<div className="column-right"/>
                <div className="column-middle" style={{backgroundColor: "#fff"}}>

                    <div className='product-container'>


                        <div className='product-image'>
                            <img draggable="false" src={electronicImages[2]}></img>
                        </div>

                        <div className='product-title'>
                            <div className='product-title-container'>
                                <h3>Product Item 1</h3>
                            </div>
                            <div className='product-description-container'>
                                <p className='product-description'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                            </div>
                            { buyNow_flag &&
                                <div className='product-buynow-container'>
                                    <Button endIcon={<LocalMallIcon/>} className='buy-now-button' onClick={handleClickOpenDialogBuyNow}>Buy now {buyNowPrice}€</Button>
                                </div>
                            }
                        </div>

                        <div className='product-actions'>
                            <div className='current-price'>
                                <p>current price: &nbsp;&nbsp;<span className='product-price-number'> {currentprice}€ </span></p>
                            </div>

                            <div className="new-bid-product-stack-container">

                                <Stack direction="row" spacing={1} className="new-bid-product-stack">
                                    <FormControl >

                                        <CustomInputLabel htmlFor="outlined-adornment-amount">Amount</CustomInputLabel>
                                        <CustomOutlinedInput
                                            id="outlined-adornment-amount"
                                            value={newBid}
                                            type="number"
                                            size='small'
                                            onChange={(e) => UpdateBidAmount(e.target.value)}
                                            startAdornment={<InputAdornment position="start">€</InputAdornment>}
                                            label="Amount"
                                            className='product-bid-textfield'
                                            error={invalidNewBid}
                                        />
                                    </FormControl>

                                    <Button variant="contained" size="small" disabled={invalidNewBid} endIcon={<PanToolIcon/>} className='product-bid-button' onClick={handleClickOpenDialogBid}>
                                        bid
                                    </Button>
                                </Stack>
                            </div>


                            <div className='time-left-container' style={{
                                display: 'flex',
                                alignItems: 'center',
                                flexWrap: 'wrap',
                            }}>
                                <span className='current-bidders-text' >12 days left</span>
							    <AlarmIcon className='current-bidders-icon' />
						
                            </div>

                            <div className='bidders-number-container' style={{
                                display: 'flex',
                                alignItems: 'center',
                                flexWrap: 'wrap',
                            }}>
                                <span className='current-bidders-text' >15 bidders</span>
							    <PersonSharpIcon className='current-bidders-icon' />
                            </div>

                            

                        </div>


                        <div className='product-data'>

                            <div className='data-title-container'>
                                <h1 className='product-data-title'>{(dataMenuValue==1) ? "Bid History" : "Auction Location"}</h1>
                            </div>


                            <div className='data-menu'>
                                <Tabs
                                    value={dataMenuValue}
                                    onChange={(e,value) => {setDataMenuValue(value);}}                        
                                    textColor="secondary"
                                    indicatorColor="secondary"
                                    aria-label="secondary tabs example"
                                    
                                >
                                    <Tab value="1" label={<p>Previous Bids</p>} className='product-data-menu-option'/>
                                    <Tab value="2" label={<p>Location</p>} className='product-data-menu-option' />
                                    
                                </Tabs>
                            </div>

                            <div className='data'>
                                {(dataMenuValue==1) ? 
                                    <BidHistory bids={previousBids}/> 
                                : 
                                    <div className='map-container'>
                                        {/* <p>{"Longitude: "+ location[0] + ", Latitude: " + location[1]}</p> */}
                                        <Map longitude={location[0]} latitude={location[1]}/>
                                    </div>
                                }       
                       
                            
                            </div>

                        </div>

                        {console.log(dataMenuValue)}


                    </div>


                </div>

                <Dialog
                    open={openDialogBid}
                    onClose={handleCloseDialogBid}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    className='bid-dialog'
                >
                    <DialogTitle id="alert-dialog-title">
                    Confirm your bid
                    </DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <p>Please confirm your bid on Product Item 1 auction. Once confirmed, your bid cannot be canceled!<br/><br/>Bid amount: {newBid}€</p> 
                        
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleCloseDialogBid} endIcon={<CloseOutlinedIcon/>} className='dialog-disagree-btn'>Disagree</Button>
                    <Button onClick={handleCloseDialogBid} endIcon={<CheckIcon/>} autoFocus className='dialog-agree-btn'>
                        Agree
                    </Button>
                    </DialogActions>
                </Dialog>

                <Dialog
                    open={openDialogBuyNow}
                    onClose={handleCloseDialogBuyNow}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    className='bid-dialog'
                >
                    <DialogTitle id="alert-dialog-title">
                        Confirm your purchase
                    </DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <p>Please you're willing to purchase Product Item 1 using the "Buy Now" option. Once confirmed, your purchase cannot be refunded!<br/><br/>Purchase amount: {buyNowPrice}€</p> 
                        
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleCloseDialogBuyNow} endIcon={<CloseOutlinedIcon/>} className='dialog-disagree-btn'>Disagree</Button>
                    <Button onClick={handleCloseDialogBuyNow} endIcon={<CheckIcon/>} autoFocus className='dialog-agree-btn'>
                        Agree
                    </Button>
                    </DialogActions>
                </Dialog>



            </div>

  )
}

export default ProductPage;