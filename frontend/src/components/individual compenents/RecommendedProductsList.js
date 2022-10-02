import React from 'react'

//custom components
import ProductListItem from './ProductListItem';


//material UI components
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

function RecommendedProductsList(props) {


    const getDaysLeft = (productInfo) => {

        let endDate = new Date(productInfo.end);
        let startDate = new Date(productInfo.start);

        let Difference_In_Time = endDate.getTime() - startDate.getTime();
  
        // To calculate the no. of days between two dates
        let daysLeftNumber = Math.round( Difference_In_Time / (1000 * 3600 * 24));

        return daysLeftNumber.toString();
        // setDaysLeft(( Difference_In_Time / (1000 * 3600 * 24)))
        // setDaysLeft(productInfo.end.getTime());
        

    };



    return (
        <Stack spacing={3} className='recom-products-stack'>
            {/* {console.log(props.productsList.length)} */}
            {(!props.isLoading) && (props.productsList.length!==0) &&
                props.productsList.map((product) =>	(
                    <ProductListItem key={product.itemId} productKey={product.itemId} productname={product.name} category={product.category[0]} photoId={product.photoId} daysLeft={getDaysLeft(product)} owner='kostopez' numberOfBidders={product.bidCount} price={product.currentBid}/>
                    
                    ))
                    
            }
            {(!props.isLoading) && (props.productsList.length===0) && 
                <div className='forbidden-container'>
                    <Stack spacing={2} className="forbidden-stack">
                        <img className="nothing-img" src="/nothing.png"></img>
                        <p className='forbidden-msg'>We were not able to find any recommendations for you!</p>
                    
                    </Stack>
                </div>
            }


            {/* {(!props.isLoading) && console.log(props.productsList)} */}

            {props.isLoading && 
                <div className='circular-container'>
                    <CircularProgress color="secondary" />
                </div>
            }

            
        </Stack>
    )
}

export default RecommendedProductsList