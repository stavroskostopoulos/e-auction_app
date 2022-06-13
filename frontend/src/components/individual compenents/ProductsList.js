import React from 'react';
import axios from 'axios';


//custom components
import ProductListItem from './ProductListItem';


//material UI components
import Pagination from '@mui/material/Pagination';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';


function ProductsList() {

    //products
    const [productsList, setProductsList] = React.useState([]);

    //pagination
    const [totalPages, setTotalPages] = React.useState(0);
    const [currentPages, setCurrentPages] = React.useState(1);


    //is Loading
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {

		// console.log(currentPages)
		
        // ⬇ This calls my get request from the server
		getProducts();
	
		// setIsLoading(false);
	}, [currentPages]);

    const pageChangeHandler = (event, pageNumber = 1) => {
		// Your code
        window.scrollTo(0, 0);
		setCurrentPages(pageNumber) 
	};

    const getProducts = async () => {
		
		
		const result = await axios.get(`https://localhost:8443/api/items?page=${currentPages-1}&size=8`, { headers: {  Access_token: 'Bearer ' + localStorage.getItem('jwt')} })
									.then(setIsLoading(false))
									.catch(err => {
										setIsLoading(true);
										console.log(err);
									});

		console.log(result.data);
		setTotalPages(result.data.totalPages);
		setProductsList(result.data.content);

	};

    return (
        <Stack spacing={3} className='products-stack'>
            {(!isLoading) && (productsList.length!==0) &&
                productsList.map((product) =>	(
                    <ProductListItem productKey={product.itemId} productname={product.name} category='Electronics' owner='kostopez' numberOfBidders="15" price={product.currentBid}/>
                    
                ))
            
            }

            {isLoading && 
                <div className='circular-container'>
                    <CircularProgress color="secondary" />
                </div>
            }

            {(totalPages > 1) &&
                <div className='pagination-container-bids'>
                    <Pagination variant="outlined" className='pagination-admin' count={totalPages} color="secondary" onChange={(event, pageNumber) => pageChangeHandler(event, pageNumber)}/>
                </div>
            }
        </Stack>
    )
}

export default ProductsList