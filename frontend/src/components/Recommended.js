import React from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


//import css
import '../css/Recommended.css'

//import custom components
import RecommendedProductsList from './individual compenents/RecommendedProductsList';

function Recommended(props) {

    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        props.setHeaderChoice("4")
        getRecommendedItems();
    },[]);

    const getRecommendedItems = async () => {
        try{
            const res = await axios.get(`https://localhost:8443/api/items/all`, { headers: {  Access_token: 'Bearer ' + localStorage.getItem('jwt')} });
            // setItems(res.data);
            setIsLoading(false);
        }catch(err){
            console.log(err);
            setIsLoading(true);

        }

    };

    return (
        <div className="main-container">
            <div className="column-left" />
            <div className="column-right"/>
            <div className="column-middle" style={{backgroundColor: "#fff"}}>

                <div className='recom-container'>
                    <div className='recom-title-container'><p className='admin-title'>Recommended auctions</p></div>
                </div>

                <div className='recom-items-container'>
							<RecommendedProductsList productsList={items} isLoading={isLoading}/>
                </div>
            </div>    

        </div>    

    )
}

export default Recommended