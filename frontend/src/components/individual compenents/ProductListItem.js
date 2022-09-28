import React from 'react';
import { Link } from 'react-router-dom';

import '../../css/ProductList.css';

import PersonSharpIcon from '@mui/icons-material/PersonSharp';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AlarmIcon from '@mui/icons-material/Alarm';
import Divider from '@mui/material/Divider';

//Electronics images
import electronicImages from '../../images/image exports/ElectronicImages';
import fashionImages from '../../images/image exports/FashionImages';
import healthImages from '../../images/image exports/HealthImages';
import usedImages from '../../images/image exports/UsedImages';

function ProductListItem(props) {
	
	

	const id = props.productKey;
	

	//We will generate a random image for each product
	//based on its category 

	



	return (
		<div className='product-list-card'>
			
			<div className='product-list-img-container'>
				{/* {console.log("sadasds")} */}

				{/* {console.log(props.category)} */}
				{props.category==='Electronics' && <img draggable="false" src={electronicImages[props.photoId]} alt="This should be sth" className='product-list-image'/>}
				{props.category==='Fashion' && <img draggable="false" src={fashionImages[props.photoId]} alt="This should be sth" className='product-list-image'/>}
				{props.category==='Health&Beauty' && <img draggable="false" src={healthImages[props.photoId]} alt="This should be sth" className='product-list-image'/>}
				{props.category==='Used' && <img draggable="false" src={usedImages[props.photoId]} alt="This should be sth" className='product-list-image'/>}
			
			</div>
			
			<div className="product-list-info">
				<div  className='product-list-title-container' >
					{/* <Link to='/product' className='product-name-link'><h3 className='product-list-title' >{props.productname}</h3></Link> */}
					<Link to={ `/product/${id}`} state= {{id: id }} className='product-name-link'><h3 className='product-list-title' >{props.productname}</h3></Link>

				</div>
				<div className='product-list-price-container'>
					<p className='product-list-price'>current price: <span className='product-list-price-number'> {props.price}€ </span></p>
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
						
							<span className='current-bidders-text'>{props.numberOfBidders} bids</span>
							<PersonSharpIcon className='current-bidders-icon'/>
						
					</div>

					<div className='current-currentprice-container' style={{
						display: 'flex',
						alignItems: 'center',
						flexWrap: 'wrap',
						// paddingLeft: '20px'

					}}>
							<Divider orientation="vertical" variant="middle" flexItem />
							<span className='current-bidders-text' style={{ paddingLeft: '20px'}}>{props.daysLeft} days left</span>
							<AlarmIcon className='current-bidders-icon' style={{ paddingLeft: '20px'}}/>
						
					</div>

					

				</div>
			
			</div>


		</div>
  	)
}

export default ProductListItem;