import { useDispatch, useSelector } from 'react-redux'
import './Header.css'
import Modal from "../Modal"
import * as React from 'react'
import Avathar from '../Avathar'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import Drawer from '@mui/material/Drawer'
import Collapse from '@mui/material/Collapse'
import { useNavigate } from "react-router-dom"
import Container from '@mui/material/Container'
import MenuIcon from '@mui/icons-material/Menu'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import ExpandLess from '@mui/icons-material/ExpandLess'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import ExpandMore from '@mui/icons-material/ExpandMore'
import StarBorder from '@mui/icons-material/StarBorder'
import ListItemButton from '@mui/material/ListItemButton'
import { openModal } from '../../Redux/Actions/SetupModal'
import { logoutTheUser } from '../../Redux/Actions/token.action'
import { currActivatePage } from '../../Redux/Actions/findCurrentPage'



const ariaLabel = { 'aria-label': 'description' };

const Header = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const openAnchorEl = Boolean(anchorEl);

    const [open, setOpen] = React.useState(false)
    const [state, setState] = React.useState({ left: false, });
    const [openForm, setOpenForm] = React.useState({ open: true })

    const userStatus = useSelector(state => state.userStatus)
    const currActivePage = useSelector(state => state.currActivePage)

    const handleCloseAnchorEl = () => {
        setAnchorEl(null);
    }

    const handleClickAnchorEl = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const logoutUser = () => {
        dispatch(logoutTheUser())
    }

    const handleClick = () => {
        setOpen(!open);
    };

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({ ...state, [anchor]: open });
    };


    //  ======== switch bying and selling if the user clicked the button ========
    const handleSwitchToSelling = () => {
        if (userStatus.sellerId) {
            dispatch(currActivatePage())
        } else {
            setOpenForm({ bool: true, type: "become_a_seller" })
        }

    }


    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
        >
            <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                    <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="Inbox" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <StarBorder />
                        </ListItemIcon>
                        <ListItemText primary="Starred" />
                    </ListItemButton>
                </List>
            </Collapse>
        </Box>
    );


    return (
        <div>

            {/* ========================================== Modal ======================================== */}
            {openForm.bool && <Modal open={openForm} setOpen={setOpenForm} />}
            {/* ========================================== Modal ======================================== */}

            <Container style={{ maxWidth: "1544px", height: "5rem", width: "100%" }}>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                        alignItems: "center",
                        height: "100%"
                    }}
                >
                    <div className='replace-prev-nav'>
                        <div className='replaced-nav-setup'>
                            <React.Fragment key={'left'}>
                                <span onClick={toggleDrawer('left', true)}>
                                    <MenuIcon />
                                </span>
                                <Drawer
                                    anchor={'left'}
                                    open={state['left']}
                                    onClose={toggleDrawer('left', false)}
                                >
                                    {list('left')}
                                </Drawer>
                            </React.Fragment>
                            <div >
                                <h2 style={{ margin: "0" }} onClick={() => navigate("/")}  >Hustle</h2>
                            </div>
                            <div>
                                <h1></h1>
                            </div>
                        </div>
                    </div>
                    <div className='hide-old-search'>
                        <h2 style={{ margin: "0" }} onClick={() => navigate("/")}>Hustle</h2>

                        <input placeholder='Search' className='item-after-search' style={{ marginLeft: "50px" }} />
                    </div>
                    <div className='item-after-search'>
                        {
                            userStatus &&
                            <>
                                <span
                                    className='navabr-font-color'
                                    onClick={() => navigate("/chat")}
                                >
                                    Messages
                                </span>

                                <span
                                    className='navabr-font-color'
                                    onClick={() => navigate("/orders")}
                                >
                                    Orders
                                </span>

                                <span
                                    className='navabr-font-color'
                                    onClick={handleSwitchToSelling}
                                >
                                    {userStatus.sellerId ? currActivePage == "buyer" ? "Switch to selling" : "Switch to buying" : "Become a seller"}
                                </span>
                            </>
                        }
                        <Avathar />
                        {/* {
                            userStatus ? <Avathar /> : !userStatus &&
                                <>
                                    <span
                                        className='navabr-font-color'
                                        onClick={() => setOpenForm({ bool: true, type: "signup" })}
                                    >
                                        Signup
                                    </span>

                                    <span
                                        className='navabr-font-color'
                                        onClick={() => setOpenForm({ bool: true, type: "login" })}
                                    >
                                        Login
                                    </span>
                                </>
                        } */}
                    </div>
                </div>
            </Container>

            <div className='sub-nav-border item-after-search'>
                {currActivePage === "buyer" && <Container style={{ display: "flex", maxWidth: "1562px" }} className="sub-navbar">
                    <div className='category-list-in-header'>
                        <span className='navabr-font-color'>Smartphone</span>
                        <span className='navabr-font-color'>Graphcs</span>
                        <span className='navabr-font-color'>Webdevelopment</span>
                        <span className='navabr-font-color'>twilio</span>
                        <span className='navabr-font-color'>Smartphone</span>
                        <span className='navabr-font-color'>Graphcs</span>
                        <span className='navabr-font-color'>Webdevelopment</span>
                        <span className='navabr-font-color'>twilio</span>
                        <span className='navabr-font-color'>Smartphone</span>
                        <span className='navabr-font-color'>Graphcs</span>
                        <span className='navabr-font-color'>Webdevelopment</span>
                        <span className='navabr-font-color'>Smartphone</span>
                    </div>
                </Container>}
            </div>

            <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
                <Container>
                    <input placeholder='Find services' className='hide-serach' style={{ width: "100%" }} />
                </Container>
            </div>
            <div>
            </div>
        </div>
    )
}

export default Header