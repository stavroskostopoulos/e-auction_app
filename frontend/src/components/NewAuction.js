import React from 'react';
import axios from 'axios';

//import styling
import '../css/NewAuction.css';
import { withStyles } from "@material-ui/core/styles";

//import variables
import productCategories from '../variables/categories';
import possibleDuration from '../variables/durations';

//import Material UI components
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import InputMap from './individual compenents/InputMap';
import MenuItem from '@mui/material/MenuItem';
import DoneIcon from '@mui/icons-material/Done';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';

//import images by category to choose an image for this product
import electronicImages from '../images/image exports/ElectronicImages';
import fashionImages from '../images/image exports/FashionImages';

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

function NewBidPage() {

    //if empty

    const categories = productCategories;
    const durations = possibleDuration;

    
    
    
    //new product info
    const [productTitle, setProductTitle] = React.useState('');
    const [showEmptyProductTitle, setShowEmptyProductTitle] = React.useState(false);
    
    const [productDesc, setProductDesc] = React.useState('');
    const [showEmptyProductDesc, setShowEmptyProductDesc] = React.useState(false);
    
    
    const [chosenCategory, setChosenCategory] = React.useState(categories[0]);
    const [chosenDuration, setChosenDuration] = React.useState(durations[0]);
    const [buyNowPrice, setBuyNowPrice] = React.useState(0);
    
    const [location, setLocation] = React.useState([37.96867087793514, 23.76662747322076]);
    const [showEmptyProductLocation, setShowEmptyProductLocation] = React.useState(false);
    


    const handleChangeCategory = (event) => {
        setChosenCategory(event.target.value);
    };

    const handleChangeDuration = (event) => {
        setChosenDuration(event.target.value);
    };

    const isNumeric = (val) => {
        return /^-?\d+$/.test(val) && val>=0;
    }


    const postProduct = async (e) => {
        
        e.preventDefault();

        (!productTitle) ? setShowEmptyProductTitle(true) : setShowEmptyProductTitle(false);
        (!productDesc) ? setShowEmptyProductDesc(true) : setShowEmptyProductDesc(false);

        (location[0]==37.96867087793514 && location[1]==23.76662747322076) ? setShowEmptyProductLocation(true) : setShowEmptyProductLocation(false);


        if(showEmptyProductTitle || showEmptyProductDesc || showEmptyProductLocation || (!isNumeric(buyNowPrice))){  return; }

        //calculate the end and start date of the auction
        let startDate = new Date();

        let endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + parseInt(chosenDuration))
        
        // choose a random image for this product
        let imgID;

        if(chosenCategory==="Electronics") imgID = Math.floor(Math.random()*electronicImages.length);
        if(chosenCategory==="Fashion") imgID = Math.floor(Math.random()*fashionImages.length);

        const result = await axios.post('https://localhost:8443/api/items/save', 
        
            {
            
                name: productTitle,
                buyPrice: buyNowPrice,
                description: productDesc,
                firstBid: null,
                currentBid: "0",
                bidCount: "0",
                start: startDate,
                end: endDate,
                latitude: location[1].toString(),
                longitude: location[0].toString(),
                country: "Greece",
                photoId: imgID,
            }
        
        
        ,{ headers: {  Access_token: 'Bearer ' + localStorage.getItem('jwt')} });
        
        const result_cat = await axios.post('https://localhost:8443/api/items/save/cat', 
        
        {
        
            itemId: result.data.itemId,
            cats: [chosenCategory],
        
        }
    
    
    ,{ headers: {  Access_token: 'Bearer ' + localStorage.getItem('jwt')} });

        console.log(result.data);

    }



    

    return (
        <div className="main-container">
            <div className="column-left" />
            <div className="column-right"/>
            <div className="column-middle" style={{backgroundColor: "#fff"}}>

                <div className='new-bid-container'>

                    <div className='new-bid-title-container'>
                        <h1 className='admin-title'>Create an auction</h1>
                    </div>
                    
                    <div className='new-bid-rules-container'>

                        <p>In order to sell a product, your auction needs to satisfy the following terms:</p>
                    
                        <ol style={{ marginLeft: '50px', marginTop: '25px' }}>
                            <li>The duration of the auction must be within 4 to 60 days</li>
                            <li>The auction product must fit to one of the given product category options</li>
                            <li>You need to provide a description of the product, declaring its state, its availability, and any further details</li>
                            <li>You can optionally provide a "Buy now price", giving the opportunity to customers to instantly buy your product, <br/>without having to participate to the auction </li>
                        </ol>

                        <p style={{ marginTop: '25px' }}>Please note that once your auction is created, it cannot be canceled!</p>

                    </div>

                    <div className='new-bid-textfields-container'>

                        <div className='textfields-1'>
                            <Stack spacing={3}>
                                <CssTextField 
                                    className="new-bid-textfield" 
                                    label="Product title" 
                                    type='text'
                                    size="small"
                                    value={productTitle}
                                    onChange={(e) => setProductTitle(e.target.value)}
                                    error={showEmptyProductTitle}
                                />
                                <CssTextField 
                                    id="outlined-multiline-static" 
                                    className="new-bid-textfield description-textfield" 
                                    label="Product description"
                                    type='text'
                                    multiline
                                    rows={10}
                                    inputProps={{ maxLength: 240 }}
                                    size="small"
                                    value={productDesc}
                                    onChange={(e) => setProductDesc(e.target.value)}
                                    error={showEmptyProductDesc}
                                />
                                <div className='shrinked-textfield'>

                                    <CssTextField
                                        id="outlined-select-currency"
                                        className="new-bid-textfield" 
                                        select
                                        label="Auction duration days"
                                        // value={`${chosenDuration} days`}
                                        value={chosenDuration}

                                        onChange={handleChangeDuration} 
                                        size="small"

                                    >
                                        {durations.map((option) => (
                                            <MenuItem key={option} value={option}>
                                            {option}
                                            </MenuItem>
                                        ))}
                                    </CssTextField>
                                </div>
                                </Stack>

                        </div>


                        <div className='textfields-2'>

                            <Stack spacing={3}>
                                <CssTextField
                                    id="outlined-select-currency"
                                    className="new-bid-textfield" 
                                    select
                                    label="Product category"
                                    value={chosenCategory}
                                    onChange={handleChangeCategory} 
                                    size="small"

                                >
                                    {categories.map((option) => (
                                        <MenuItem key={option} value={option}>
                                        {option}
                                        </MenuItem>
                                    ))}
                                </CssTextField> 

                                <div style={{width: '380px', height: '250px'}} className="new-bid-input-map">
                                    <InputMap inputMapSetLocation={setLocation} mapWidth="100%" mapHeight="195px" fieldSize="small" textFieldClass="filters-location-textfield" buttonClass="filters-location-button" containsStackClass="filters-stack-1" buttonContainerClass="filters-location-button-container" textfieldError={showEmptyProductLocation}/>
                                </div>
                                
                                <div className='shrinked-textfield'>

                                    <FormControl className='new-bid-textfield'>

                                        <CustomInputLabel htmlFor="outlined-adornment-amount">Buy now price</CustomInputLabel>
                                        <CustomOutlinedInput
                                            id="outlined-adornment-amount"
                                            value={buyNowPrice}
                                            type="number"
                                            size='small'
                                            onChange={(e) => setBuyNowPrice(e.target.value)}
                                            startAdornment={<InputAdornment position="start">€</InputAdornment>}
                                            label="Buy now price"
                                            className='new-bid-textfield'
                                            error={!isNumeric(buyNowPrice)}
                                            
                                            
                                        />
                                        <FormHelperText>Setting this to 0 will not provide a buy now option</FormHelperText>
                                    </FormControl>

                                </div>


                            </Stack>

                        </div>
                        


                    </div>

                    <div className='new-bid-button-container'>
                        <Button variant="contained" size="small" endIcon={<DoneIcon/>} className='new-bid-button' onClick={postProduct}>
                            Create auction
                        </Button>
                        
                    </div>

                    

                </div>

            </div>
        </div>
  )
}

export default NewBidPage;