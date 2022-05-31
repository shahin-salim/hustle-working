import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Footer from '../Components/Footer/Footer'
import Header from '../Components/Header/Header'
import Content from '../Components/Content/Content'
import { fetchServices } from '../Redux/Actions/fetch.services'
import { useSelector } from 'react-redux'
import { FETCH_SERVICES_OF_SELLER_URL, FETCH_SERVICES_URL } from '../Utils/Urls'

const Home = () => {

    const dispatch = useDispatch();
    const currActivePage = useSelector(state => state.currActivePage)


    useEffect(() => {
        // Fetch all the services on load using redux
        // if the curr actiate page is buyer it means user act a normal user so 
        // if curr page is seller all the seller gigs are display and give  permission to edit

        console.log("****************** home use Effect ***************************");

        if (currActivePage === "buyer") {
            dispatch(fetchServices(FETCH_SERVICES_URL))
        } else {
            dispatch(fetchServices(FETCH_SERVICES_OF_SELLER_URL))
        }

    }, [])

    return (
        <>
            <Header />
            <Content />
            <Footer />
        </>
    )
}

export default Home