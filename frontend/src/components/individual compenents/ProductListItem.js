import React from 'react';

import '../../css/ProductList.css';


import ssdimg from '../../images/ssd.jpeg'


function ProductListItem(props) {

	return (
		<div className='product-list-card'>
			
			<div className='product-list-img-container'><img src={ssdimg} alt="This should be sth" className='product-list-image'/></div>
			
			<div className='product-list-info'>
				<div className='product-list-title-container'>
					<h3 className='product-list-title'>{props.productname}</h3>
				</div>
				<div className='product-list-owner-container'>
					<p className='product-list-owner-text'>kostopez</p>
				</div>
			
			</div>


		</div>
  	)
}

export default ProductListItem;