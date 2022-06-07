import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Footer from '../Components/Footer/Footer'
import Header from '../Components/Header/Header'
import Content from '../Components/Content/Content'
import { fetchServices } from '../Redux/Actions/fetch.services'
import { useSelector } from 'react-redux'
import Container from 'react-bootstrap/Container';
import VerticalLinearStepper, { HorizontalNonLinearStepper } from '../Components/muiStepper'

import { Paper, Box, Grid, Typography } from "@mui/material";

import Row from 'react-bootstrap/Row';

import Col from 'react-bootstrap/Col';
import CreateNewGig from '../Components/CreateNewGig/CreateNewGig'
import Signup from '../Components/Login'
import PackgeForm from "../Components/PackgeForm"
import axios from 'axios'

import { useLocation, useParams, useNavigate } from 'react-router-dom'
import { GET_SERVICE_URL } from '../Utils/Urls'
import Button from '@mui/material/Button';



const CreateGig = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const [serviceCreationData, setServiceCreationData] = useState({})
    const [packegeData, setPackageData] = useState([])
    const [temp, setTemp] = useState({}) // temp is just used to save the form data
    const [errors, setError] = useState({}) // set the packages login error in this state
    const packageType = ["basic", "standard", "premium"]
    const [editPackage, setEditPackge] = useState([])
    console.log(packegeData, "!!!!");

    const { id } = useParams()

    const activeStep = useSelector(state => state.activeStep)
    console.log(activeStep, "  active step ===");
    useEffect(() => {
        console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$333");
        if ((location.pathname).startsWith("/edit-gig")) {
            setTemp({ ...editPackage[activeStep - 1] })
            console.log("/?????????????????????????????????????/");
        }
    }, [activeStep])


    console.log(editPackage, "   EDIT");

    const fetchDataForEdit = async () => {
        try {
            const { data } = await axios.get(`http://localhost:8000/services/service/${id}/`)
            console.log(data);
            delete data["user"]
            console.log(data, "###################################");
            setServiceCreationData(data)
            const response = await axios.get(`http://localhost:8000/services/scope_and_price/?service_id=${id}`)
            console.log(response.data);
            setEditPackge(response.data)
        } catch (err) {
            console.log(err.response)
        }
    }

    useEffect(() => {
        console.log("***************", (location.pathname).startsWith("/edit-gig"), "****************");

        if ((location.pathname).startsWith("/edit-gig")) {
            fetchDataForEdit()
        }
    }, [])


    const createService = async () => {
        try {
            console.log(temp);
            console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
            // const { data } = await useTheAxios.post(CRUD_SERVICES, formData)
            // console.log("http://localhost:8000/services/", "  ", formData);
            const { data } = await axios.post("http://localhost:8000/services/create/create/", serviceCreationData)
            console.log(data);

            const updatedPackage = packegeData.map((d) => {
                return { ...d, service_id: data.id }
            })

            console.log(updatedPackage);

            //  ==================================================================================

            console.log(packegeData);
            const response = await axios.post("http://localhost:8000/services/scope_and_price/", updatedPackage)
            console.log(response);
            navigate("/")

        } catch (error) {
            // setLoginError(error.response.data.detail);
            console.log(error);
            console.log(error.response);
        }
    }

    useEffect(() => {
        console.log("use Effect worked successfully", packegeData.length);
        console.log(packegeData);
        if (packegeData.length == 3) createService()
    }, [packegeData])

    return <>

        <Header />


        <Container style={{ maxWidth: "1500px", padding: "2rem 0rem 1.5rem 0rem" }}>
            <Typography variant='h3' align='center' p={2}>Create Service</Typography>

            <VerticalLinearStepper>
                <CreateNewGig
                    serviceCreationData={serviceCreationData}
                    setServiceCreationData={setServiceCreationData}
                />

                <PackgeForm
                    type="basic"
                    packegeData={packegeData}
                    setPackageData={setPackageData}
                    temp={temp} setTemp={setTemp}
                    errors={errors}
                    setError={setError}
                    packageType={packageType}
                />
                <PackgeForm
                    type="standard"
                    packegeData={packegeData}
                    setPackageData={setPackageData}
                    temp={temp} setTemp={setTemp}
                    errors={errors}
                    setError={setError}
                    packageType={packageType}
                />
                <PackgeForm
                    type="premium"
                    packegeData={packegeData}
                    setPackageData={setPackageData}
                    temp={temp} setTemp={setTemp}
                    errors={errors}
                    setError={setError}
                    packageType={packageType}
                />
            </VerticalLinearStepper>
            <Box mt={3} textAlign='center'>
                <Button variant="contained"
                    color="primary"
                    onClick={() => navigate("/")}
                >
                    Go to home page
                </Button>
            </Box>
        </Container>


        <Footer />
    </>
}

export default CreateGig