import { axiosBasicInstance } from "../Axios/AxiosBasicInstance";
import * as Yup from "yup";
import { Link } from "react-router-dom"
import useAxios from '../Axios/useAxios';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { LOGIN_URL } from '../Utils/Urls';
import { red } from '@mui/material/colors';
import TextField from '@mui/material/TextField';
import React, { Fragment, useEffect } from 'react'
import DialogTitle from '@mui/material/DialogTitle';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Paper, Box, Grid, Typography } from "@mui/material";
import { setUserStatus } from '../Redux/Actions/token.action';
import DialogContentText from '@mui/material/DialogContentText';
import axios from "axios";
import { stepperAction } from "../Redux/Actions/activitySetupStepperMui";
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { useLocation } from "react-router-dom";
import useTheAxios from "../Axios/useAxios";


const PackgeForm = ({ type, packegeData, setPackageData, temp, setTemp, packageType, errors, setError }) => {

    const dispatch = useDispatch()
    const activeStep = useSelector(state => state.activeStep)


    const location = useLocation()
    const useAxios = useTheAxios()
    const onSubmit = async () => {
        try {
            console.log(temp);
            // const { data } = await useTheAxios.post(CRUD_SERVICES, formData)
            // console.log("http://localhost:8000/services/", "  ", formData);

            // find which method wants to perform if the url is create-gig assume seller wants to create
            // service otherwise its an edit so make method as put

            if (!(location.pathname).startsWith("/edit-gig")) {
                const updatedPackge = { ...temp, type: packageType[activeStep - 1] }
                var { data } = await useAxios.post("services/scope_and_price/", updatedPackge)
                setPackageData([...packegeData, updatedPackge])
            } else {
                delete temp["service_id"]
                var { data } = await useAxios.put(`services/scope_and_price/`, temp)
            }
            setTemp({})
            dispatch(stepperAction(1))

        } catch (error) {
            // setLoginError(error.response.data.detail);
            console.log(error.response);
            setError({ ...error.response.data })
        }
    };

    console.log("+++++++++++", errors, "++++++++++++++");

    return (
        <>
            <Fragment>
                {/* <Paper> */}
                <Box px={3} py={2} sx={{ borderColor: "primary.main" }} >


                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                required
                                id="name_of_the_package"
                                name="name_of_the_package"
                                label="name_of_the_package"
                                fullWidth
                                margin="dense"
                                value={temp.name_of_the_package}

                                onChange={(e) => setTemp({ ...temp, name_of_the_package: e.target.value })}
                            />
                            <Typography variant="inherit" color="textSecondary">
                                {errors.name_of_the_package}
                            </Typography>
                        </Grid>
                        <>
                            {" "}
                            <Grid item xs={12} >
                                <TextareaAutosize
                                    required
                                    id="desciption_about_offer"
                                    name="desciption_about_offer"
                                    label="desciption_about_offer"
                                    type="desciption_about_offer"
                                    style={{ width: "100%" }}
                                    minRows={3}
                                    aria-label="minimum height"
                                    placeholder="desciption_about_offer"
                                    value={temp.desciption_about_offer}
                                    onChange={(e) => setTemp({ ...temp, desciption_about_offer: e.target.value })}
                                />
                                <Typography variant="inherit" color="textSecondary">
                                    {errors.desciption_about_offer}
                                </Typography>
                            </Grid>

                            <Grid item xs={12} >
                                <TextField
                                    required
                                    id="delivery_time"
                                    name="delivery_time"
                                    label="delivery_time"
                                    type="delivery_time"
                                    fullWidth
                                    margin="dense"
                                    value={temp.delivery_time}
                                    onChange={(e) => setTemp({ ...temp, delivery_time: e.target.value })}
                                />
                                <Typography variant="inherit" color="textSecondary">
                                    {errors.delivery_time}
                                </Typography>
                            </Grid>


                            <Grid item xs={12} >
                                <TextField
                                    required
                                    id="price"
                                    name="price"
                                    label="price"
                                    type="price"
                                    fullWidth
                                    margin="dense"
                                    value={temp.price}
                                    onChange={(e) => setTemp({ ...temp, price: e.target.value })}
                                />
                                <Typography variant="inherit" color="textSecondary">
                                    {errors.price}
                                </Typography>
                            </Grid>


                        </>
                    </Grid>

                    <Box mt={3} textAlign='center'>
                        <Button variant="contained"
                            color="primary"
                            onClick={onSubmit}
                        >
                            save & continue
                        </Button>
                    </Box>

                </Box>
                {/* </Paper> */}
            </Fragment>
        </>
    )
}

export default PackgeForm