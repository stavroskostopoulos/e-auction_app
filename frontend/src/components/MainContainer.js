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


const CssTextField = withStyles({
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

const CustomCheckbox = withStyles({
    root: {
		
		'&.Mui-checked': {
			color: '#9966cc !important'
	
		}
	},
    
})(Checkbox);






function MainContainer() {
	

	const [searchLabel, setSearchLabel] = React.useState("Search");

	// filters
	const [checkedCateg, setCheckedCateg] = React.useState([]);

	const handleToggle = (value) => () => {

		const currentIndex = checkedCateg.indexOf(value);
		const newChecked = [...checkedCateg];

		if (currentIndex === -1) {
		newChecked.push(value);
		} else {
		newChecked.splice(currentIndex, 1);
		}

		setCheckedCateg(newChecked);

	}

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
							<CssTextField 	label={searchLabel}
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
										onClick={() => setSearchLabel('')}
										
							/>
						</div>


						<div className='bids-filters'>
							<div className='categ-list'>

								<p className='filter-title'>Categories</p>
								{/* categories list */}

								<List className='categ-list-options'>

									<CssListItem
										key='used'
										disablePadding
										
										>									
											<ListItemIcon>
												<CustomCheckbox
													className='filter-list-item'
													edge="start"
													onChange={handleToggle('used')}
													checked={checkedCateg.indexOf('used') !== -1}
													inputProps={{ 'aria-labelledby': 'checkbox-list-secondary-label-used' }}
													size='small'
												/>
											</ListItemIcon>
											<ListItemText  id='checkbox-list-secondary-label-used' primary={<Typography variant="h6" style={{ color: 'rgb(19, 19, 19)', fontSize: '1rem' }}>Used</Typography>} className='list-item-text'/>	
									</CssListItem>


									<CssListItem
										key='unused'
										disablePadding
										
										>									
											<ListItemIcon>
												<CustomCheckbox
													className='filter-list-box'
													edge="start"
													onChange={handleToggle('unused')}
													checked={checkedCateg.indexOf('unused') !== -1}
													inputProps={{ 'aria-labelledby': 'checkbox-list-secondary-label-unused' }}
													size='small'
												/>
											</ListItemIcon>
											<ListItemText  id='checkbox-list-secondary-label-unused' primary={<Typography variant="h6" style={{ color: 'rgb(19, 19, 19)', fontSize: '1rem' }}>Used</Typography>} className='list-item-text'/>	
									</CssListItem>
									
								</List>

								<Divider sx={{ p: 2 }} />

							</div>


						</div>


						<div className='bids-products'>

						</div>

						<div className='filtertags'>

						</div>
					</div>

              	</div>
            </div> 
          
  
  
  
        
      
    );
  }
  
  export default MainContainer;