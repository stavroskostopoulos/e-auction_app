import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from "@material-ui/core/styles";
import { makeStyles } from '@mui/styles';



import "../css/Bids.css"

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Slider from '@mui/material/Slider';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

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



const SearchTextField = withStyles({
    root: {
      '& label.Mui-focused': {
            color: 'black',
        },
        '& .MuiOutlinedInput-root': {
			
            '&.Mui-focused fieldset': {
                border: 'none'
            },

			'& fieldset': {
				border: 'none',
	
			}
        },

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




function MainContainer() {
	


	// search
	const [searchLabel, setSearchLabel] = React.useState("Search");

	// filters
	const [checkedCateg, setCheckedCateg] = React.useState([]);
	const [priceRange, setPriceRange] = React.useState([0, 400]);


	const categories = ['Used', 'Unused', 'Electronics', 'Fashion', 'Health & Beauty'];

	const handleDelete = (value) => {
		const currentIndex = checkedCateg.indexOf(value);
		const newChecked = [...checkedCateg];

		newChecked.splice(currentIndex, 1);

		setCheckedCateg(newChecked);

	};

	const handleToggle = (value) => () => {

		console.log(value);

		const currentIndex = checkedCateg.indexOf(value);
		const newChecked = [...checkedCateg];

		if (currentIndex === -1) {
		newChecked.push(value);
		} else {
		newChecked.splice(currentIndex, 1);
		}

		setCheckedCateg(newChecked);

	};

	const handleChange = (event, newValue) => {
		setPriceRange(newValue);
	};

    return (
      
       
  
            
            <div className="main-container">
            	<div className="column-left" />
              	<div className="column-right"/>
              	<div className="column-middle" style={{backgroundColor: "#fff"}}>
					
					
					<div className="bids-container">


						<div className='bids-title'>
							<h4>Active Bids</h4>
						</div>

						<div className='bids-searchbar'>
							<SearchTextField 	label={searchLabel}
										InputProps={{
											endAdornment: (
											  <InputAdornment position="start">
												<SearchIcon />
											  </InputAdornment>
											)
										  }}
										InputLabelProps={{
											shrink: false
										}} 
										size='small'
										className='search-bar'
										onFocus={() => setSearchLabel('')}									
										
							/>
						</div>


						<div className='bids-filters'>
							<div className='categ-filters-container'>

								<p className='filter-title'>Categories</p>
								{/* categories list */}

								<List className='categ-list-options'>


									{categories.map((category) => (
					
										<CssListItem
										key={category}
										disablePadding
										
										>									
											<ListItemIcon>
												<CustomCheckbox
													className='filter-list-item'
													edge="start"
													onChange={handleToggle({category}.category)}
													checked={checkedCateg.indexOf({category}.category) !== -1}
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
											
											value={`${priceRange[0]}€`}
											className="minprice-textfield"
											size='small'   
										/>
									</div>
									<div className='maxprice-textfield-container'>
										<PriceTextField
											
											value={`${priceRange[1]}€`}
											className="maxprice-textfield"
											size='small'   
										/>
									</div>
								</div>



								<CustomSlider
									getAriaLabel={() => 'Price range'}
									value={priceRange}
									onChange={handleChange}
									valueLabelDisplay="auto"
									getAriaValueText={priceRangetext}
									className='price-range-bar'
									max='400'
								/>
								
								

							</div>

							<Divider  sx={{ mt: 4, mb: 5 }}/>
							
							
						</div>


						<div className='bids-products'>
							
						</div>

						<div className='filtertags'>
							<Stack direction="row" spacing={1}>
								{categories.map((category) => (
									(checkedCateg.indexOf({category}.category)!==-1) && <Chip label={category} color="primary"  size='small' onDelete={() => handleDelete({category}.category)}/>
								))}
							</Stack>
						</div>

					</div>

              	</div>
				
            </div> 
          
  
  
        
      
    );
  }
  
  export default MainContainer;