import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Footer from '../Components/Footer/Footer'
import Header from '../Components/Header/Header'
import Content from '../Components/Content/Content'
import { fetchServices } from '../Redux/Actions/fetch.services'
import { useSelector } from 'react-redux'
import Container from 'react-bootstrap/Container';


import Row from 'react-bootstrap/Row';

import Col from 'react-bootstrap/Col';
import CreateNewGig from '../Components/CreateNewGig/CreateNewGig'





const CreateGig = () => {
    return <>
        <Header />
        <CreateNewGig />
        <Footer />
    </>
}

export default CreateGig