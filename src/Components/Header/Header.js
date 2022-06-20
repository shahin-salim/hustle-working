import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './Header.css'
import Modal from "../Modal"
import Avathar from '../Avathar'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import Drawer from '@mui/material/Drawer'
import Collapse from '@mui/material/Collapse'
import { useNavigate } from "react-router-dom"
import Container from '@mui/material/Container'
import MenuIcon from '@mui/icons-material/Menu'
import { GET_CATEGORY_URL } from '../../Utils/Urls'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import ExpandLess from '@mui/icons-material/ExpandLess'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import ExpandMore from '@mui/icons-material/ExpandMore'
import StarBorder from '@mui/icons-material/StarBorder'
import ListItemButton from '@mui/material/ListItemButton'
import { openModal } from '../../Redux/Actions/SetupModal'
import { logoutTheUser } from '../../Redux/Actions/token.action'
import { axiosBasicInstance } from '../../Axios/AxiosBasicInstance'
import { currActivatePage } from '../../Redux/Actions/findCurrentPage'

import Asynchronous from '../SerachField'
import { useWindowSize } from "../../Utils/FindScreenWidth"
import axios from 'axios'



const ariaLabel = { 'aria-label': 'description' };

const Header = () => {

    const screenSize = useWindowSize()

    const [open, setOpen] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);
    const [state, setState] = useState({ left: false, });
    const [openForm, setOpenForm] = useState({ open: true })
    const [categories, setCategories] = useState([])

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const openAnchorEl = Boolean(anchorEl);

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
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) return;
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


    const fetchDepartments = async () => {
        try {
            const { data } = await axiosBasicInstance.get(GET_CATEGORY_URL)
            setCategories(data)
        } catch (error) {
            console.log(error.response);
        }
    }

    useEffect(() => {
        fetchDepartments()
    }, [])


    const handleGetCategory = async () => {

        try {
            const { data } = await axios.get(GET_CATEGORY_URL)
            console.log(data);
            // setCategories(data)
        } catch (error) {
            console.log(error.response);
        }

    }



    return (
        <div>

            {/* ============================= Modal ============================= */}
            {openForm.bool && <Modal open={openForm} setOpen={setOpenForm} />}
            {/* ============================= Modal ============================= */}

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
                                    {/* {list('left')} */}



                                    <Box
                                        sx={{ width: "left" === 'top' || "left" === 'bottom' ? 'auto' : 250 }}
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



                                </Drawer>
                            </React.Fragment>
                            <div >
                                <h2 style={{ margin: "0" }} onClick={() => navigate("/")}> Hustle</h2>
                            </div>
                            <div>
                                <h1></h1>
                            </div>
                        </div>
                    </div>
                    <div className='hide-old-search'>
                        <h2 style={{ margin: "0" }} onClick={() => navigate("/")}>Hustle</h2>

                        {/* ============== SEARCH BOX ============== */}
                        <Asynchronous marginLeftSize="10px" />
                        {/* ============== SEARCH BOX ============== */}


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
                                    {
                                        userStatus.sellerId ? currActivePage == "buyer" ? "Switch to selling" : "Switch to buying" : "Become a seller"
                                    }
                                </span>
                            </>
                        }
                        <Avathar />

                    </div>
                </div>
            </Container>

            <div className='sub-nav-border item-after-search'>

                {
                    currActivePage === "buyer" &&

                    <Container style={{ display: "flex", maxWidth: "1562px" }} className="sub-navbar">
                        <div className='category-list-in-header'>

                            {/* =============================== list categories =============================== */}
                            {categories.map(data =>
                                <span key={data.id} onClick={handleGetCategory} className='navabr-font-color' >
                                    {data.name}
                                </span>
                            )}
                            {/* =============================== list categories =============================== */}

                        </div>
                    </Container>
                }

            </div>

            <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
                <Container>

                    {/* ============== SEARCH BOX ============== */}
                    {screenSize < 700 && <Asynchronous marginLeftSize="0" />}
                    {/* ============== SEARCH BOX ============== */}

                </Container>
            </div>
            <div>
            </div>
        </div>
    )
}

export default Header