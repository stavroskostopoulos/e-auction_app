import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from "@material-ui/core/styles";
import { makeStyles } from '@mui/styles';

import BidsFilters from './individual compenents/BidsFilters';
import ProductListItem from './individual compenents/ProductListItem';

import "../css/Bids.css"


import Button from '@mui/material/Button';
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
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Pagination from '@mui/material/Pagination';


import FilterListIcon from '@mui/icons-material/FilterList';

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




function Bids() {
	

	

	// search
	const [searchLabel, setSearchLabel] = React.useState("Search");

	// filters
	const [checkedCateg, setCheckedCateg] = React.useState([]);
	const [priceRange, setPriceRange] = React.useState([0, 400]);
	//this flag will let us know when to change between filter and delete buttons
	const [responsiveFiltersShown, setResponsiveFiltersShown] = React.useState(false)

	//useRef - References
	const showFiltersRef = React.useRef(0);
	const container = React.useRef(0);


	//filters categories
	const categories = ['Used', 'Unused', 'Electronics', 'Fashion', 'Health & Beauty'];

	//products
	const products = ["Product 1 Title", "Product 2 Title", "Product 3 Title", "Product 4 Title", "Product 5 Title", "Product 6 Title", "Product 7 Title"];


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

	const ShowOrHideFilters = () => {
		//if it is hidden
		if(responsiveFiltersShown===false){
			//set the flag to true
			setResponsiveFiltersShown(true);
			//display it
			showFiltersRef.current.style.display = 'block';
		}else{
			//if it is already displayed
			//change button
			setResponsiveFiltersShown(false);
			//hide it
			showFiltersRef.current.style.display = 'none';
			
		}
	}

    return (
      
       
  
            
            <div className="main-container">
            	<div className="column-left" />
              	<div className="column-right"/>
              	<div className="column-middle" style={{backgroundColor: "#fff"}}>
					
					
					<div ref={container} className="bids-container">


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
						
						<div className='filters-options-show-hide'>
							{responsiveFiltersShown ? 

								<Button  onClick={ShowOrHideFilters} startIcon={<KeyboardArrowUpIcon/>}  className='filters-show-btn'>MINIMIZE</Button>
							:
								<Button  onClick={ShowOrHideFilters} startIcon={<FilterListIcon/>}  className='filters-show-btn'>FILTERS</Button>

							}
						</div>


						<div ref={showFiltersRef} className='bids-filters'>
							<BidsFilters className='filters-component'  categories={categories} checkedCateg={checkedCateg} setCheckedCateg={setCheckedCateg}/>
						</div>

						
						{/* Products */}
						<div className='bids-products'>
							<Stack spacing={3} className='products-stack'>
								{(products.length!==0) &&
									products.map((product) =>	(
										<ProductListItem productname={product} category='Electronics' owner='kostopez' numberOfBidders="15" price="24,50"/>
										
									))
								
								}
							{(products.length>6) &&
								<div className='pagination-container-bids'>
									<Pagination className='pagination-admin' count={10} color="secondary" />
								</div>
							}
							</Stack>
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
  
  export default Bids;