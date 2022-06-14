import React from 'react';
import axios from 'axios';


//custom components
import ProductListItem from './ProductListItem';


//material UI components
import Pagination from '@mui/material/Pagination';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';


function ProductsList(props) {



    return (
        <Stack spacing={3} className='products-stack'>
            {(!props.isLoading) && (props.productsList.length!==0) &&
                props.productsList.map((product) =>	(
                    <ProductListItem productKey={product.itemId} productname={product.name} category='Electronics' owner='kostopez' numberOfBidders="15" price={product.currentBid}/>
                    
                    ))
                    
            }

            {props.isLoading && 
                <div className='circular-container'>
                    <CircularProgress color="secondary" />
                </div>
            }

            {(props.totalPages > 1) &&
                <div className='pagination-container-bids'>
                    <Pagination variant="outlined" className='pagination-admin' count={props.totalPages} color="secondary" onChange={(event, pageNumber) => props.pageChangeHandler(event, pageNumber)}/>
                </div>
            }
        </Stack>
    )
}

export default ProductsList;