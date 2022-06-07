import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

//import styling
import "../css/NotAccepted.css";

//import Material UI components
import { Stack } from '@mui/material';



function NotAccepted() {
  	return (
		<div className='not-accepted-container'>
			<div className='not-accepted-art'></div>
			<div className='not-accepted-message-container'>
				<Stack spacing={1} style={{textAlign: 'center'}}>
					<h1 className='not-accepted-title'>Please come back in a while...</h1>
					<p className='not-accepted-text'>Your registration needs to be accepted by the administrator</p>

				</Stack>
			</div>
		</div>

  	)
}

export default NotAccepted