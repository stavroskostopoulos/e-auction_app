import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from "@material-ui/core/styles";
import { makeStyles } from '@mui/styles';

import '../css/ProductPage.css'

//Electronics images
import electronicImages from '../images/image exports/ElectronicImages'

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


    const currentprice = 130.20.toFixed(2);

    const [newBid, setNewBid] = React.useState(currentprice); //+1 !!!!
    const [invalidNewBid, setInvalidNewBid] = React.useState(false);

    const [openDialog, setOpenDialog] = React.useState(false);

    const handleClickOpenDialog = () => {
      setOpenDialog(true);
    };
  
    const handleCloseDialog = () => {
      setOpenDialog(false);
    };


    const UpdateBidAmount = (value) =>  {
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
                            <h3>Product Item 1</h3>
                            <p className='product-description'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
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

                                    <Button variant="contained" size="small" disabled={invalidNewBid} endIcon={<PanToolIcon/>} className='product-bid-button' onClick={handleClickOpenDialog}>
                                        bid
                                    </Button>
                                </Stack>
                            </div>
                        </div>





                    </div>


                </div>

                <Dialog
                    open={openDialog}
                    onClose={handleCloseDialog}
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
                    <Button onClick={handleCloseDialog} endIcon={<CloseOutlinedIcon/>} className='dialog-disagree-btn'>Disagree</Button>
                    <Button onClick={handleCloseDialog} endIcon={<CheckIcon/>} autoFocus className='dialog-agree-btn'>
                        Agree
                    </Button>
                    </DialogActions>
                </Dialog>



            </div>

  )
}

export default ProductPage;