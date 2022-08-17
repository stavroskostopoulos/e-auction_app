import React from 'react';
import axios from 'axios';

//import custom components
import BidsFilters from './individual compenents/BidsFilters';
import ProductsList from './individual compenents/ProductsList';

//import Styling
import "../css/Bids.css"
import { withStyles } from "@material-ui/core/styles";

//import variables
import productCategories from '../variables/categories';

//import Material UI components
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import ListItem from '@mui/material/ListItem';
import Checkbox from '@mui/material/Checkbox';
import Slider from '@mui/material/Slider';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
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

	//this flag will let us know when to change between filter and delete buttons
	const [responsiveFiltersShown, setResponsiveFiltersShown] = React.useState(false);

	//useRef - References
	const showFiltersRef = React.useRef(0);
	const container = React.useRef(0);


	//filters categories
	const categories = productCategories;

	//products
	const [productsList, setProductsList] = React.useState([]);

	//pagination
	const [totalPages, setTotalPages] = React.useState(0);
	const [currentPages, setCurrentPages] = React.useState(1);


	//is Loading
	const [isLoading, setIsLoading] = React.useState(false);


	//filters
	const [priceRange, setPriceRange] = React.useState(["0", "1000"]);
	const [priceRangeToggle, setPriceRangeToggle] = React.useState(false);
	



    const [location, setLocation] = React.useState([37.96867087793514, 23.76662747322076]);


	React.useEffect(() => {

		
		console.log(priceRangeToggle)
		// ⬇ This calls my get request from the server
		
		//if price range has been modified
        // if( (priceRange[0].toString() !=="0" ) || (priceRange[1].toString() !=="1000") ) {
			
		// 	getProductsbyPrice();
			
        // }else{
			
		// 	if(!checkedCateg.length){
				
		// 		getProducts();
			
		// 	}else{
		// 		getProductsCategories();
		// 	}


		// }
		getProducts();


		// setIsLoading(false);
	}, [currentPages, priceRangeToggle]);

    const pageChangeHandler = (event, pageNumber = 1) => {
		// Your code
        window.scrollTo(0, 0);
		setCurrentPages(pageNumber) 
	};

    const getProducts = async () => {
		
		console.log("DSAFDADSFADSFASDf");
		// const result = await axios.get(`https://localhost:8443/api/items?page=${currentPages-1}&size=8`, { headers: {  Access_token: 'Bearer ' + localStorage.getItem('jwt')} })
		// 							.then(setIsLoading(false))
		// 							.catch(err => {
		// 								setIsLoading(true);
		// 								console.log(err);
		// 							});
		let passCategsParam = "[" + checkedCateg.toString() + "]";

		try{
			const result = await axios.post(`https://localhost:8443/api/items/filter/kostopez/${currentPages-1}`,

			{
				low: priceRange[0],
				high: priceRange[1],
				cats: passCategsParam,
				word: '',

			},


			{ headers: {  Access_token: 'Bearer ' + localStorage.getItem('jwt')} });
										
			setIsLoading(false);
			setTotalPages(result.data.totalPages);
			setProductsList(result.data.content);
			console.log("getprod")
			console.log(result.data.totalPages)
			console.log(result.data);
									
										
		}catch(err){
			console.log(err);
			setIsLoading(true);
		}



	};

	const getProductsCategories = async () => {
		

		// const result = await axios.get(`https://localhost:8443/api/items?page=${currentPages-1}&size=8`, { headers: {  Access_token: 'Bearer ' + localStorage.getItem('jwt')} })
		// 							.then(setIsLoading(false))
		// 							.catch(err => {
		// 								setIsLoading(true);
		// 								console.log(err);
		// 							});

		const result = await axios.post(`https://localhost:8443/api/items/filter/cat/${currentPages-1}`,

                            {
                                cats: checkedCateg,

                            },


                            { headers: {  Access_token: 'Bearer ' + localStorage.getItem('jwt')} })

                            .then(setIsLoading(false))

                            .catch(err => {
                                setIsLoading(true);
                                console.log(err);
                            });

		console.log("getprodCats")
		console.log(result.data);
		setTotalPages(result.data.totalPages);
		setProductsList(result.data.content);

	};


	const getProductsbyPrice = async () => {
		
		let passCategsParam = "[" + checkedCateg.toString() + "]";
		
		const result = await axios.post(`https://localhost:8443/api/items/filter/price/${currentPages-1}`,

                            {
                                low: priceRange[0],
                                high: priceRange[1],
								cats: passCategsParam,

                            },


                            { headers: {  Access_token: 'Bearer ' + localStorage.getItem('jwt')} })

                            .then(setIsLoading(false))

                            .catch(err => {
                                setIsLoading(true);
                                console.log(err);
                            });

		console.log("getprodPRice")
		console.log(result.data);
		setTotalPages(result.data.totalPages);
		setProductsList(result.data.content);

	};

	const handleDelete = (value) => {
		const currentIndex = checkedCateg.indexOf(value);
		const newChecked = [...checkedCateg];

		newChecked.splice(currentIndex, 1);

		setCheckedCateg(newChecked);

		setPriceRangeToggle("togg2" + value.toString());


	};

	

	const handleDeletePriceTag = (min_or_max_str) => {
		if(min_or_max_str === "min"){
			
			setPriceRange(["0", priceRange[1]]);
			setPriceRangeToggle("min");

		}else{
			setPriceRange([priceRange[0], "1000"]);
			setPriceRangeToggle("max");

		}

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
							{/* <h4>Active Auctions</h4> */}

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
							<BidsFilters className='filters-component'  categories={categories} checkedCateg={checkedCateg} setCheckedCateg={setCheckedCateg} setNewLocation={setLocation} setPriceRange={setPriceRange} priceRange={priceRange} setPriceRangeToggle={setPriceRangeToggle} />
						</div>

						
						{/* Products */}
						<div className='bids-products'>
							<ProductsList pageChangeHandler={pageChangeHandler} productsList={productsList} totalPages={4} isLoading={isLoading} setPriceRange={setPriceRange}/>
						</div>

							
						<div className='filtertags'>
							<Stack direction="row" spacing={1}>
								{categories.map((category) => (
									(checkedCateg.indexOf({category}.category)!==-1) && <Chip label={category} color="primary"  size='small' onDelete={() => handleDelete({category}.category)} className="categ-chip"/>
								))}
								{ (priceRange[0].toString() !=="0") && <Chip label={`> ${priceRange[0]}`} color="primary"  size='small' onDelete={() => handleDeletePriceTag("min")} className="price-chip-min"/>}
								{ (priceRange[1].toString() !=="1000") && <Chip label={`< ${priceRange[1]}`} color="primary"  size='small' onDelete={() => handleDeletePriceTag("max")} className="price-chip-max"/>}

							</Stack>
						</div>

					</div>

              	</div>
				
            </div> 
          
  
  
        
      
    );
  }
  
  export default Bids;