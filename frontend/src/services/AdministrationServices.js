import axios from 'axios';

import exportFromJSON from "export-from-json";
import { saveAs } from 'file-saver';

const downloadAsXML = async () => {

    try{

        //get all items
        const res = await axios.get(`https://localhost:8443/api/items/all`, { headers: {  Access_token: 'Bearer ' + localStorage.getItem('jwt')} });
        const products = res.data;
        
        //get all bids
        const mergedBids = await Promise.all(products.map( async (product) => {
                const bids = await axios.get(`https://localhost:8443/api/bids/item/${product.itemId}`, { headers: {  Access_token: 'Bearer ' + localStorage.getItem('jwt')} });
                const productBidsInfo = {bids: bids.data}
                return {...product, ...productBidsInfo} 
            }
        ));
        

        const data = [...mergedBids]

        const fileName = "XMLexport"
        let fields = [];  //fieldsAsObjects or fieldsAsStrings, empty list means "use all"
        const exportType = 'xml';
        exportFromJSON({data, fileName, fields, exportType})
    
    }catch(err){
        console.log(err);
    }
    

}



export const downloadAsJSON = async () => {
    try{

        //get all items
        const res = await axios.get(`https://localhost:8443/api/items/all`, { headers: {  Access_token: 'Bearer ' + localStorage.getItem('jwt')} });
        const products = res.data;
        
        //get all bids
        const mergedBids = await Promise.all(products.map( async (product) => {
                const bids = await axios.get(`https://localhost:8443/api/bids/item/${product.itemId}`, { headers: {  Access_token: 'Bearer ' + localStorage.getItem('jwt')} });
                const productBidsInfo = {bids: bids.data}
                return {...product, ...productBidsInfo} 
            }
        ));
        

        const data = [...mergedBids]

        var fileName = 'myData.json';

        // Create a blob of the data
        var fileToSave = new Blob([JSON.stringify(data)], {
            type: 'application/json'
        });

        // Save the file
        saveAs(fileToSave, fileName);
    
    }catch(err){
        console.log(err);
    }
    
};

export default downloadAsXML;
