import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FolderIcon from '@mui/icons-material/Folder';
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SwitchCameraIcon from '@mui/icons-material/SwitchCamera';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avathar from './Avathar';
import { useNavigate } from 'react-router-dom';


export const LabelBottomNavigation = () => {

    const navigate = useNavigate()
    const [value, setValue] = React.useState('recents');

    const handleChange = (event, newValue) => {
        console.log(newValue);
        setValue(newValue);

        // in this newValue setted the navigated position
        if (newValue !== "More") navigate(newValue)
    };


    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <div className='bottum-navigation-position' >
            <BottomNavigation sx={{ width: "100%", }} value={value} onChange={handleChange}>

                <BottomNavigationAction
                    label="Home"
                    value="/"
                    icon={<HomeIcon />}
                />
                <BottomNavigationAction
                    label="Chat"
                    value="/chat"
                    icon={<ChatIcon />}
                />

                <BottomNavigationAction
                    label="More"
                    value="More"
                    icon={<Avathar />}
                />

            </BottomNavigation>

            {/* <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu> */}

        </div>
    );
}
