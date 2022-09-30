import axios from 'axios';

import exportFromJSON from "export-from-json";

const downloadAsXML = async () => {
    
    console.log("SDFASDFASDFSDAFSDAS")

    try{
        const res = await axios.get(`https://localhost:8443/api/items/all`, { headers: {  Access_token: 'Bearer ' + localStorage.getItem('jwt')} });
        console.log(res);
        
        const data = res.data;
        const fileName = "XMLexport"
        let fields = [];  //fieldsAsObjects or fieldsAsStrings, empty list means "use all"
        const exportType = 'xml';
        exportFromJSON({data, fileName, fields, exportType})
    
    }catch(err){
        console.log(err);
    }
    

} 

export default downloadAsXML;