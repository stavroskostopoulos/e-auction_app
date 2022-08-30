import React from 'react';
import axios from 'axios';


//custom components
import ProductListItem from './ProductListItem';


//material UI components
import Pagination from '@mui/material/Pagination';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';



function ProductsList(props) {


    const getDaysLeft = (productInfo) => {

        let endDate = new Date(productInfo.end);
        let startDate = new Date(productInfo.start);

        let Difference_In_Time = endDate.getTime() - startDate.getTime();
  
        // To calculate the no. of days between two dates
        let daysLeftNumber = ( Difference_In_Time / (1000 * 3600 * 24));

        return daysLeftNumber.toString();
        // setDaysLeft(( Difference_In_Time / (1000 * 3600 * 24)))
        // setDaysLeft(productInfo.end.getTime());
        

    };


    return (
        <Stack spacing={3} className='products-stack'>
            {/* {console.log(props.productsList.length)} */}
            {(!props.isLoading) && (props.productsList.length!==0) &&
                props.productsList.map((product) =>	(
                    <ProductListItem productKey={product.itemId} productname={product.name} category={product.category[0]} photoId={product.photoId} daysLeft={getDaysLeft(product)} owner='kostopez' numberOfBidders={product.bidCount} price={product.currentBid}/>
                    
                    ))
                    
            }
            {(!props.isLoading) && (props.productsList.length===0) && 
                <div className='empty-auctions'>
                    <p>There are no active auctions right now</p>
                </div>
            }


            {/* {(!props.isLoading) && console.log(props.productsList)} */}

            {props.isLoading && 
                <div className='circular-container'>
                    <CircularProgress color="secondary" />
                </div>
            }

            {(props.productsList.length === 0) &&
                <Box sx={{ width: '100%', height: '180px'}}/>
            }

            {/* {(props.productsList.length > 0) && */}
                <div className='pagination-container-bids'>
                    <Pagination variant="outlined" className='pagination-admin' count={props.totalPages} color="secondary" page={props.selectedPage} onChange={(event, pageNumber) => props.pageChangeHandler(event, pageNumber)}/>
                </div>
            {/* } */}
        </Stack>
    )
}

export default ProductsList;