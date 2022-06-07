import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

import * as Yup from "yup";

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useSelector, useDispatch } from 'react-redux'
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { Fragment, useEffect, useState } from 'react'
import { Paper, Box, Grid, Typography } from "@mui/material";
import useAxios from "../../Axios/useAxios"
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Modal from '../Modal';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { axiosBasicInstance } from '../../Axios/AxiosBasicInstance';
import { CRUD_SERVICES, GET_SUBCATEGORY_URL } from '../../Utils/Urls';
import { HorizontalNonLinearStepper } from "../muiStepper"
import axios from 'axios';
import { stepperAction } from "../../Redux/Actions/activitySetupStepperMui"
import { useLocation } from 'react-router-dom';


const CreateNewGig = ({ serviceCreationData, setServiceCreationData }) => {

    const useTheAxios = useAxios()               //   custom hook for using axios interceptor
    const dispatch = useDispatch()
    const sellerId = useSelector(state => state.userStatus.sellerId)
    // { bool: true, type: "enter_offer_details" }
    const [open, setOpen] = useState({ bool: false })

    const [subCategory, setSubCategory] = React.useState([]);

    const [serviceFormData, setServiceFormData] = useState({})
    const [serviceFormDataError, setServiceFormDataError] = useState({})

    const loaction = useLocation()
    console.log(loaction.pathname);

    useEffect(() => {
        console.log((loaction.pathname), "&&&&@@@@@");
        if ((loaction.pathname).startsWith("/edit-gig")) {
            console.log("F%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%5");
            console.log(serviceCreationData, "@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
            setServiceFormData(serviceCreationData)
        }
    }, [serviceCreationData])


    const onSubmit = async () => {

        try {

            console.log(serviceFormData);

            console.log(typeof serviceFormData.image1);
            console.log(typeof serviceFormData.image2);
            if (typeof serviceFormData.image1 == "string") delete serviceFormData.image1
            if (typeof serviceFormData.image2 == "string") delete serviceFormData.image2

            const formData = new FormData();

            for (var i in serviceFormData) {
                if (typeof serviceFormData[i] == "object") {
                    formData.append(`${i}`, serviceFormData[i], `${i}.png`);
                } else {
                    formData.append(`${i}`, serviceFormData[i]);
                }
            }
            if (sellerId) formData.append("seller_id", sellerId);

            // const { data } = await useTheAxios.post(CRUD_SERVICES, formData)

            var method = "post"
            var URL = "http://localhost:8000/services/create/validate/"
            if (loaction.pathname != "/create-gig") {
                console.log("edit git is activated");

                var abcd = await axios.put("http://localhost:8000/services/?pk=17", formData)
                console.log(abcd);
            } else {
                var { data } = await axios.post(URL, formData)
            }

            console.log(method, "  ***");

            console.log(data);
            setServiceCreationData(formData)
            dispatch(stepperAction(1))

        } catch (error) {
            console.log("*************************************************", error);
            setServiceFormDataError({ ...error.response.data })

        }
    };





    const fetchSubCategories = async () => {

        try {
            const { data } = await axiosBasicInstance.get(GET_SUBCATEGORY_URL)
            setSubCategory([...data])
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchSubCategories()

    }, [])



    return (
        <>
            {/* <Container style={{ maxWidth: "15   00px", padding: "2rem 0rem 1.5rem 0rem" }}> */}
            <Modal open={open} setOpen={setOpen} />



            {/* ======================== service details ============================ */}
            <>
                <Fragment>
                    <Box px={3} py={2} sx={{ borderColor: "primary.main" }}  >
                        <div
                            style={{ display: "flex", justifyContent: "center" }}
                        >
                            <Grid
                                container
                                spacing={1}
                                style={{ maxWidth: "1000px" }}
                            >

                                <Grid item xs={12} sm={12}>
                                    <TextField
                                        required
                                        id="GigTitle"
                                        name="GigTitle"
                                        label="Title"
                                        fullWidth
                                        margin="dense"
                                        value={serviceFormData.title}
                                        onChange={(e) => setServiceFormData({ ...serviceFormData, title: e.target.value })}

                                    />
                                    <span>{serviceFormDataError.title}</span>
                                </Grid>

                                <Grid item xs={12} sm={12}>
                                    <FormControl sx={{ mt: 1, width: "100%" }}>
                                        <InputLabel id="demo-simple-select-helper-label">Subcategory</InputLabel>
                                        <Select
                                            required
                                            labelId="demo-simple-select-helper-label"
                                            id="demo-simple-select-helper"
                                            label="Subcategory"
                                            value={String(serviceFormData.sub_category_id)}
                                            onChange={(e) => setServiceFormData({ ...serviceFormData, sub_category_id: parseInt(e.target.value) })}
                                        >

                                            {/* ========================= list subcategory ========================= */}
                                            {subCategory.map(data =>
                                                <MenuItem
                                                    key={data.id}
                                                    value={data.id}

                                                >
                                                    {data.name}
                                                </MenuItem>
                                            )}
                                            {/* ========================= list subcategory ========================= */}

                                        </Select>
                                    </FormControl>
                                    <span>{serviceFormDataError.sub_category_id}</span>

                                </Grid>

                                <Grid item xs={12} sm={12}>
                                    <TextField
                                        required
                                        id="image1"
                                        name="image1"
                                        type="file"
                                        fullWidth
                                        margin="dense"
                                        onChange={(e) => setServiceFormData({ ...serviceFormData, image1: e.target.files[0] })}

                                    />
                                    <span>{serviceFormDataError.image1}</span>

                                </Grid>

                                <Grid item xs={12} sm={12}>
                                    <TextField
                                        required
                                        id="image2"
                                        name="image2"
                                        type="file"
                                        fullWidth
                                        margin="dense"
                                        onChange={(e) => setServiceFormData({ ...serviceFormData, image2: e.target.files[0] })}
                                    />
                                    <span>{serviceFormDataError.image2}</span>

                                </Grid>

                                <Grid item xs={12} sm={12}>

                                    <TextareaAutosize
                                        aria-label="minimum height"
                                        minRows={3}
                                        placeholder="Minimum 3 rows"
                                        style={{ width: "100%" }}
                                        value={serviceFormData.discription}

                                        onChange={(e) => setServiceFormData({ ...serviceFormData, discription: e.target.value })}

                                    />
                                    <span>{serviceFormDataError.discription}</span>

                                </Grid>
                            </Grid>
                        </div>
                        <Box mt={3} textAlign='center'>
                            <Button variant="contained" color="primary" onClick={onSubmit}>
                                Next
                            </Button>
                        </Box>
                    </Box>
                </Fragment>
            </>
            {/* =================== service details ends ===================== */}


            {/* </Container> */}

        </>


    )
}

export default CreateNewGig