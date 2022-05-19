import React from 'react';
import { Link } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import "../css/Administration.css"

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

function Administration() {
  
    const [value, setValue] = React.useState("1");
	const [request, setRequest] = React.useState(false);

	const [totalUsersList, setTotalUsersList] = React.useState(["keepo", "keepa", "keepa", "keepa", "keepa", "keepa", "keepa", "keepa"]);
	const [usersRegisterList, setUsersRegisterList] = React.useState(["kappa", "keepa", "keepa", "keepa", "keepa", "keepa", "keepa", "keepa"]);

    return (
      
       
  
            
            <div className='main-container'>
              <div className="column-left" />
              <div className="column-right"/>
              <div className="column-middle" style={{backgroundColor: "#fff"}}>
                <div className='admin-container'>
                    <div className='admin-title-box'>
                        <h1 className='admin-title'>Administration page</h1>
                    </div>
                    <div className='admin-menu'>
                        <Tabs
                            value={value}
                            onChange={(e,value) => {setValue(value);}}                        textColor="secondary"
                            indicatorColor="secondary"
                            aria-label="secondary tabs example"
                            >
                            <Tab value="1" label="All users" onClick={() => setRequest(false)} />
                            <Tab value="2" label="Pending registration requests" onClick={() => setRequest(true)} />
                            
                        </Tabs>
                    </div>
                    <div className='admin-content'>

						{/* if we are on the All users tab */}
						{!request && (totalUsersList.length!=0) &&
						
							<List sx={{ width: '100%' }}>


								<ListItem 	component={Link} to={'/profile'} >
									<ListItemButton className='list-item-button'>
										<ListItemAvatar>
											<Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
										</ListItemAvatar>
										<ListItemText primary="Vasilis Pasios" className='list-item-admin'/>
										<ListItemSecondaryAction>
											<Tooltip title='Delete user'>
												<IconButton edge="end" aria-label="delete" component={Link} to={'/login'} className='delete-icon-admin'>
													<DeleteIcon />
												</IconButton>
											</Tooltip>
										</ListItemSecondaryAction>
									</ListItemButton>
								</ListItem>


								<Divider variant="middle"  component="li"/>

								<ListItem 	component={Link} to={'/profile'} >
									<ListItemButton className='list-item-button'>
										<ListItemAvatar>
											<Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
										</ListItemAvatar>
										<ListItemText primary="Vasilis Pasios" className='list-item-admin'/>
										<ListItemSecondaryAction>
											<Tooltip title='Delete user'>
												<IconButton edge="end" aria-label="delete" component={Link} to={'/login'} className='delete-icon-admin'>
													<DeleteIcon />
												</IconButton>
											</Tooltip>
										</ListItemSecondaryAction>
									</ListItemButton>
								</ListItem>


								<Divider variant="middle"  component="li"/>

								<ListItem 	component={Link} to={'/profile'} >
									<ListItemButton className='list-item-button'>
										<ListItemAvatar>
											<Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
										</ListItemAvatar>
										<ListItemText primary="Vasilis Pasios" className='list-item-admin'/>
										<ListItemSecondaryAction>
											<Tooltip title='Delete user'>
												<IconButton edge="end" aria-label="delete" component={Link} to={'/login'} className='delete-icon-admin'>
													<DeleteIcon />
												</IconButton>
											</Tooltip>
										</ListItemSecondaryAction>
									</ListItemButton>
								</ListItem>


								<Divider variant="middle"  component="li"/>

								<ListItem 	component={Link} to={'/profile'} >
									<ListItemButton className='list-item-button'>
										<ListItemAvatar>
											<Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
										</ListItemAvatar>
										<ListItemText primary="Vasilis Pasios" className='list-item-admin'/>
										<ListItemSecondaryAction>
											<Tooltip title='Delete user'>
												<IconButton edge="end" aria-label="delete" component={Link} to={'/login'} className='delete-icon-admin'>
													<DeleteIcon />
												</IconButton>
											</Tooltip>
										</ListItemSecondaryAction>
									</ListItemButton>
								</ListItem>


								<Divider variant="middle"  component="li"/>

								<ListItem 	component={Link} to={'/profile'} >
									<ListItemButton className='list-item-button'>
										<ListItemAvatar>
											<Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
										</ListItemAvatar>
										<ListItemText primary="Vasilis Pasios" className='list-item-admin'/>
										<ListItemSecondaryAction>
											<Tooltip title='Delete user'>
												<IconButton edge="end" aria-label="delete" component={Link} to={'/login'} className='delete-icon-admin'>
													<DeleteIcon />
												</IconButton>
											</Tooltip>
										</ListItemSecondaryAction>
									</ListItemButton>
								</ListItem>


								<Divider variant="middle"  component="li"/>

								<ListItem>
									<ListItemButton>
										<ListItemAvatar>
											<Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
										</ListItemAvatar>
										<ListItemText primary="Giannis Symewnidis" />
									</ListItemButton>
								</ListItem>

								<Divider variant="middle" component="li"/>

								<ListItem>
									<ListItemButton>
										<ListItemAvatar>
											<Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
										</ListItemAvatar>
										<ListItemText primary="Chelsea Otakan" />
									</ListItemButton>
								</ListItem>

								<Divider  variant="middle" component="li"/>
								
							</List>
						}

						{/* pagination */}
						{!request && (totalUsersList.length > 7) &&
							<div className='pagination-container'>
								<Pagination className='pagination-admin' count={10} color="secondary" />
							</div>
						}
						{/* if no users */}
						{!request && (totalUsersList.length==0) && 
							<div className='empty-msg-container'>
								<p className='empty-list-msg'>There are no registered users yet</p>
							</div>
						}



						{/* if we are on the registration requets tab */}
						{request && (usersRegisterList.length!=0) &&
						
						<List sx={{ width: '100%' }}>


							<ListItem component={Link} to={'/profile'} >
								<ListItemButton className='list-item-button'>
									<ListItemAvatar>
										<Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
									</ListItemAvatar>
									<ListItemText primary="Giorgos Koumpis" className='list-item-admin'/>
									<ListItemSecondaryAction>
										<Tooltip title='Reject'>
											<IconButton edge="end" aria-label="cancel" sx={{mr: 1}} scomponent={Link} to={'/login'} className='cancel-icon-admin'>
												<CloseOutlinedIcon />
											</IconButton>
										</Tooltip>
										<Tooltip title='Approve'>	
											<IconButton edge="end" aria-label="confirm" component={Link} to={'/login'} className='check-icon-admin'>
												<CheckIcon />
											</IconButton>
										</Tooltip>	
									</ListItemSecondaryAction>
								</ListItemButton>
							</ListItem>


							<Divider variant="middle"  component="li"/>

							<ListItem component={Link} to={'/profile'} >
								<ListItemButton className='list-item-button'>
									<ListItemAvatar>
										<Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
									</ListItemAvatar>
									<ListItemText primary="Giorgos Koumpis" className='list-item-admin'/>
									<ListItemSecondaryAction>
										<Tooltip title='Reject'>
											<IconButton edge="end" aria-label="cancel" sx={{mr: 1}} scomponent={Link} to={'/login'} className='cancel-icon-admin'>
												<CloseOutlinedIcon />
											</IconButton>
										</Tooltip>
										<Tooltip title='Approve'>	
											<IconButton edge="end" aria-label="confirm" component={Link} to={'/login'} className='check-icon-admin'>
												<CheckIcon />
											</IconButton>
										</Tooltip>	
									</ListItemSecondaryAction>
								</ListItemButton>
							</ListItem>


							<Divider variant="middle"  component="li"/>

							<ListItem component={Link} to={'/profile'} >
								<ListItemButton className='list-item-button'>
									<ListItemAvatar>
										<Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
									</ListItemAvatar>
									<ListItemText primary="Giorgos Koumpis" className='list-item-admin'/>
									<ListItemSecondaryAction>
										<Tooltip title='Reject'>
											<IconButton edge="end" aria-label="cancel" sx={{mr: 1}} scomponent={Link} to={'/login'} className='cancel-icon-admin'>
												<CloseOutlinedIcon />
											</IconButton>
										</Tooltip>
										<Tooltip title='Approve'>	
											<IconButton edge="end" aria-label="confirm" component={Link} to={'/login'} className='check-icon-admin'>
												<CheckIcon />
											</IconButton>
										</Tooltip>	
									</ListItemSecondaryAction>
								</ListItemButton>
							</ListItem>


							<Divider variant="middle"  component="li"/>

							<ListItem component={Link} to={'/profile'} >
								<ListItemButton className='list-item-button'>
									<ListItemAvatar>
										<Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
									</ListItemAvatar>
									<ListItemText primary="Giorgos Koumpis" className='list-item-admin'/>
									<ListItemSecondaryAction>
										<Tooltip title='Reject'>
											<IconButton edge="end" aria-label="cancel" sx={{mr: 1}} scomponent={Link} to={'/login'} className='cancel-icon-admin'>
												<CloseOutlinedIcon />
											</IconButton>
										</Tooltip>
										<Tooltip title='Approve'>	
											<IconButton edge="end" aria-label="confirm" component={Link} to={'/login'} className='check-icon-admin'>
												<CheckIcon />
											</IconButton>
										</Tooltip>	
									</ListItemSecondaryAction>
								</ListItemButton>
							</ListItem>


							<Divider variant="middle"  component="li"/>

							<ListItem component={Link} to={'/profile'} >
								<ListItemButton className='list-item-button'>
									<ListItemAvatar>
										<Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
									</ListItemAvatar>
									<ListItemText primary="Giorgos Koumpis" className='list-item-admin'/>
									<ListItemSecondaryAction>
										<Tooltip title='Reject'>
											<IconButton edge="end" aria-label="cancel" sx={{mr: 1}} scomponent={Link} to={'/login'} className='cancel-icon-admin'>
												<CloseOutlinedIcon />
											</IconButton>
										</Tooltip>
										<Tooltip title='Approve'>	
											<IconButton edge="end" aria-label="confirm" component={Link} to={'/login'} className='check-icon-admin'>
												<CheckIcon />
											</IconButton>
										</Tooltip>	
									</ListItemSecondaryAction>
								</ListItemButton>
							</ListItem>


							<Divider variant="middle"  component="li"/>

							

							<ListItem>
								<ListItemButton>
									<ListItemAvatar>
										<Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
									</ListItemAvatar>
									<ListItemText primary="Notis Stamatopoulos" />
								</ListItemButton>
							</ListItem>

							<Divider variant="middle" component="li"/>

							<ListItem>
								<ListItemButton>
									<ListItemAvatar>
										<Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
									</ListItemAvatar>
									<ListItemText primary="Chrysa Vidali" />
								</ListItemButton>
							</ListItem>

							<Divider  variant="middle" component="li"/>
							
						</List>
						
					}
					{/* if no users */}
					{request && (usersRegisterList.length==0) && 
						<div className='empty-msg-container'>
							<p className='empty-list-msg'>You have no pending registration requests</p>
						</div>
					}
					{/* pagination */}
					{request && (usersRegisterList.length > 7) &&
						<div className='pagination-container'>
							<Pagination className='pagination-admin' count={10} color="secondary" />
						</div>
					}
                    </div>
					
                </div>
              </div>
            </div> 
          
  
  
  
        
      
    );
  }
  
  export default Administration;