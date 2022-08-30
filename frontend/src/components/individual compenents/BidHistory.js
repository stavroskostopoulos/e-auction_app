import React from 'react'
import { Link, useLocation } from 'react-router-dom';
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







function BidHistory(props) {

    // const rows = [];

    // React.useEffect(() => {

	// 	if(props.bids.length === 0){
    //         console.log("ADEIO")
    //     }else{
    //         props.bids.forEach(element => {
    //             rows.push(createData(element.bidder.realname + element.bidder.surname, element.bidder.username, element.time.toString(), element.amount))
    //         });
    //     }

	// }, []);

    return (
        <div>
            
            {  !props.rows.length &&

                <div className='empty-msg-container'>
                    <p className='empty-list-msg'>There have not been any bids on this auction yet</p>
                </div> 

            }

            { (props.rows.length!==0) &&
                
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
                        { props.rows.map((row) => (
                            
                                <TableRow
                                key={row.rowid}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row" >
                                            <Link to={ `/profile/${row.id}`} state={{id: row.id }} style={{ textDecoration: 'none' }} className="linkcomponent"><p className='data-table-link'>{row.name}</p></Link>
                                    </TableCell>
                                    <TableCell align="right" ><Link to={ `/profile/${row.id}`} state={{id: row.id }} style={{ textDecoration: 'none' }} className="linkcomponent"><p className='data-table-link'>{row.username}</p></Link></TableCell>
                                    <TableCell align="right">{new Date(row.bidDate).toDateString()}</TableCell>
                                    {/* <TableCell align="right">4</TableCell> */}
                                    <TableCell align="right">{row.amount}</TableCell>
                                    
                                </TableRow>
                            
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>

            }

        </div>
    )
}

export default BidHistory;