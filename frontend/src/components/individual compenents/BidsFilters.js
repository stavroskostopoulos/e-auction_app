import React from 'react'
import { withStyles } from "@material-ui/core/styles";

import "../../css/Bids.css"

import InputMap from './InputMap';


import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Slider from '@mui/material/Slider';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Tooltip from '@mui/material/Tooltip';

const PriceTextField = withStyles({
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


const CssListItem = withStyles({
    root: {
		// backgroundColor: 'red !important',
		height: '25px !important',
		marginTop: '3px !important'
	}
      
})(ListItem);

const CustomSlider = withStyles({
    root: {
		// backgroundColor: 'red !important',
		color: '#9966cc !important',
		'& .MuiSlider-thumb': {
			height: '16px',
			width: '16px',
			backgroundColor: '#9966cc !important',
		},
		'& .MuiSlider-rail': {
			color: '#888888 !important'
		}
	}
      
})(Slider);

const CustomCheckbox = withStyles({
    root: {
		
		'&.Mui-checked': {
			color: '#9966cc !important'
	
		}
	},
    
})(Checkbox);


function priceRangetext(value) {
	return `${value}€`;
}




function BidsFilters(props) {

    // filters

    const [location, setLocation] = React.useState([37.96867087793514, 23.76662747322076]);


    const submitPriceRange = () => {
        props.setPriceRangeToggle(props.priceRange);
    };

    const submitLocation = () => {
        props.setNewLocation(location);
    };

    const handleToggle = (value) => () => {

		// console.log(value);

		const currentIndex = props.checkedCateg.indexOf(value);
		const newChecked = [...props.checkedCateg];

		if (currentIndex === -1) {
		    newChecked.push(value);
            props.setPriceRangeToggle(value);
		} else {
		    newChecked.splice(currentIndex, 1);
            props.setPriceRangeToggle(value+" remove");

		}

		props.setCheckedCateg(newChecked);

	};

	const handleChange = (event, newValue) => {
		props.setPriceRange(newValue);
	};

    



    return (
        <div>
                                <div className='categ-filters-container'>

                                    <p className='filter-title'>Categories</p>
                                    {/* categories list */}

                                    <List className='categ-list-options'>


                                        {props.categories.map((category) => (
                        
                                            <CssListItem
                                            key={category}
                                            disablePadding
                                            
                                            >									
                                                <ListItemIcon>
                                                    <CustomCheckbox
                                                        className='filter-list-item'
                                                        edge="start"
                                                        onChange={handleToggle({category}.category)}
                                                        checked={props.checkedCateg.indexOf({category}.category) !== -1}
                                                        // inputProps={{ 'aria-labelledby': 'checkbox-list-secondary-label-used' }}
                                                        size='small'
                                                    />
                                                </ListItemIcon>
                                                <ListItemText  id='checkbox-list-secondary-label-used' primary={<Typography variant="h6" style={{ color: 'rgb(19, 19, 19)', fontSize: '1rem' }}>{category}</Typography>} className='list-item-text'/>	
                                            </CssListItem>
                                        ))}
                                        

                                    </List>


                                </div>

                                <Divider  sx={{ mt: 3, mb: 5 }}/>

                                <div className='price-slider-container'>

                                    <p className='filter-title'>Price range</p>

                                    <div className='price-range-textfields'>
                                        <div className='minprice-textfield-container'>
                                            <PriceTextField
                                                
                                                // value={`${priceRange[0]}€`}
                                                value={props.priceRange[0]}
                                                
                                                className="minprice-textfield"
                                                size='small'   
                                                onChange={(e)=> props.setPriceRange([e.target.value, props.priceRange[1]])}
                                            />
                                        </div>
                                        <div className='maxprice-textfield-container'>
                                            <PriceTextField
                                                
                                                // value={`${priceRange[1]}€`}
                                                value={props.priceRange[1]}
                                                onChange={(e)=> props.setPriceRange([props.priceRange[0], e.target.value])}

                                                className="maxprice-textfield"
                                                size='small'   
                                            />
                                        </div>
                                        
                                        <Tooltip title={<p className='tooltip-text'>Submit price Range</p>} placement="right" arrow>
                                            <div className='price-range-button' onClick={submitPriceRange}>
                                                <KeyboardArrowRightIcon className='price-range-icon'/>
                                            </div>
                                        </Tooltip>

                                    </div>



                                    <CustomSlider
                                        getAriaLabel={() => 'Price range'}
                                        value={props.priceRange}
                                        onChange={handleChange}
                                        valueLabelDisplay="auto"
                                        getAriaValueText={priceRangetext}
                                        className='price-range-bar'
                                        max='1000'
                                    />
                                    
                                    

                                </div>

                                <Divider  sx={{ mt: 4, mb: 5 }}/>
                                
                                <p className='filter-title'>Search by location</p>

                                <div style={{width: '100%', height: '500px', paddingTop: '40px'}}>
                                    <InputMap inputMapSetLocation={props.setNewLocation} mapWidth="100%" mapHeight="290px" fieldSize="small" textFieldClass="filters-location-textfield" buttonClass="filters-location-button" containsStackClass="filters-stack-1" buttonContainerClass="filters-location-button-container" textfieldError={false} bidsFiltersFlag={true} refreshFunction={props.setPriceRangeToggle}/>
                                </div>
                                
                            </div>
    )
}

export default BidsFilters