import React from 'react'
import { Link } from 'react-router-dom';
import { withStyles } from "@material-ui/core/styles";

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import CheckIcon from '@mui/icons-material/Check';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import Pagination from '@mui/material/Pagination';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Gingerbread', 356, 16.0, 49, 3.9),

  ];


function BidHistory(props) {

    

    return (
        <div>
            
            <TableContainer component={Paper} className='data-table'>
                <Table sx={{ minWidth: 650 }} aria-label="simple table" >
                    <TableHead className='data-tablehead'>
                        <TableRow>
                            <TableCell className='tablecell-title'><p>Name</p></TableCell>
                            <TableCell className='tablecell-title' align="right"><p>Username</p></TableCell>
                            <TableCell className='tablecell-title' align="right"><p>Date</p></TableCell>
                            {/* <TableCell className='tablecell-title' align="right"><p>Bid number</p></TableCell> */}
                            <TableCell className='tablecell-title' align="right"><p>Amount&nbsp;(€)</p></TableCell>
                            
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => (
                        <TableRow
                        key={row.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row" >
                            <p className='data-table-link'>Vasilis Pasios</p>
                        </TableCell>
                        <TableCell align="right" ><p className='data-table-link'>vaspio</p></TableCell>
                        <TableCell align="right">12/03/2022</TableCell>
                        {/* <TableCell align="right">4</TableCell> */}
                        <TableCell align="right">20</TableCell>
                        
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>
        </div>
    )
}

export default BidHistory;