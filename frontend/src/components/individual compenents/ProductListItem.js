import React from 'react';

import '../../css/ProductList.css';

import PersonSharpIcon from '@mui/icons-material/PersonSharp';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

//Electronics images
import electronicImages from '../../images/image exports/ElectronicImages'


function ProductListItem(props) {
	
	
	

	//We will generate a random image for each product
	//based on its category 

	



	return (
		<div className='product-list-card'>
			
			<div className='product-list-img-container'>

				{props.category==='Electronics' && <img src={electronicImages[Math.floor(Math.random()*electronicImages.length)]} alt="This should be sth" className='product-list-image'/>}
			</div>
			
			<div className='product-list-info'>
				<div className='product-list-title-container'>
					<h3 className='product-list-title'>{props.productname}</h3>
				</div>
				<div className='product-list-owner-container'>
					<p className='product-list-owner-text'>by {props.owner}</p>
				</div>
				<div className='product-list-details-container'>

					<div className='current-bidders-container' style={{
						display: 'flex',
						alignItems: 'center',
						flexWrap: 'wrap',
						paddingLeft: '20px'

					}}>
						
							<span className='current-bidders-text'>{props.numberOfBidders} bidders</span>
							<PersonSharpIcon className='current-bidders-icon'/>
						
					</div>

				</div>
			
			</div>


		</div>
  	)
}

export default ProductListItem;