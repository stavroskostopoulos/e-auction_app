import React from 'react';

//import styling
import '../css/NewAuction.css';
import { withStyles } from "@material-ui/core/styles";

//import variables
import productCategories from '../variables/categories';

//import Material UI components
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import InputMap from './individual compenents/InputMap';
import MenuItem from '@mui/material/MenuItem';


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

function NewBidPage() {

    const categories = productCategories;

    const [location, setLocation] = React.useState([37.96867087793514, 23.76662747322076]);
    const [chosenCategory, setChosenCategory] = React.useState(categories[0]);

    


    const handleChange = (event) => {
        setChosenCategory(event.target.value);
    };

    return (
        <div className="main-container">
            <div className="column-left" />
            <div className="column-right"/>
            <div className="column-middle" style={{backgroundColor: "#fff"}}>

                <div className='new-bid-container'>

                    <bid className='new-bid-title-container'>
                        <h1 className='admin-title'>Create an auction</h1>
                    </bid>
                    
                    <bid className='new-bid-rules-container'>

                        <p>In order to sell a product, your auction needs to satisfy the following terms:</p>
                    
                        <ol style={{ marginLeft: '50px', marginTop: '25px' }}>
                            <li>The duration of the auction must be within 4 to 60 days</li>
                            <li>The auction product must fit to one of the given product category options</li>
                            <li>You need to provide a description of the product, declaring its state, its availability, and any further details</li>
                        </ol>

                        <p style={{ marginTop: '25px' }}>Please note that once your auction is created, it cannot be canceled!</p>

                    </bid>

                    <div className='new-bid-textfields-container'>

                        <div className='textfields-1'>
                            <Stack spacing={3}>
                                <CssTextField 
                                    className="new-bid-textfield" 
                                    label="Product title" 
                                    type='text'
                                    size="small"
    
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
                                    />

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
                                    onChange={handleChange} 
                                    size="small"

                                >
                                    {categories.map((option) => (
                                        <MenuItem key={option} value={option}>
                                        {option}
                                        </MenuItem>
                                    ))}
                                </CssTextField> 

                                <div style={{width: '65%', height: '500px'}} className="new-bid-input-map">
                                    <InputMap inputMapSetLocation={setLocation} mapWidth="100%" mapHeight="195px" fieldSize="small" textFieldClass="filters-location-textfield" buttonClass="filters-location-button" containsStackClass="filters-stack-1" buttonContainerClass="filters-location-button-container"/>
                                </div>

                            </Stack>

                        </div>


                    </div>


                    

                </div>

            </div>
        </div>
  )
}

export default NewBidPage;