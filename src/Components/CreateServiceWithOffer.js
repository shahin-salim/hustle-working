import * as Yup from "yup";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useSelector, useDispatch } from 'react-redux'
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { Fragment, useEffect, useState } from 'react'
import { Paper, Box, Grid, Typography } from "@mui/material";
// import useAxios from "../../Axios/useAxios"

function CreateServiceWithOffer() {


    var OfferValidationScema = Yup.object().shape({

        type: Yup.string().required("type is required").matches(/^\S*$/, "This field should not be blank"),
        desciption_about_offer: Yup.string().required("desciption_about_offer is required").matches(/^\S*$/, "This field should not be blank"),
        delivery_time: Yup.number()
            .required("delivery_time number is required"),
        price: Yup.number()
            .required("price number is required"),
    });

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        setError,
        setValue,
    } = useForm({
        resolver: yupResolver(OfferValidationScema),
    });









    const onSubmit = async (data) => {

        try {

            // post signup form data to database if the request is success 
            // set access token and refresh token in the local storage
            // and set the userStatus state in redux set as True it will indiacate is online
            // const { data } = await useTheAxios.post("SIGNUP_URL", data)
            // console.log(data)
            // setOpen({ bool: false, type: "" })
            // dispatch(setUserStatus(data.refresh, data.access))

        } catch (error) {

            // set the backend validation error to  hook form 
            console.log("*************************************************", error.response);

            const data = error.response.data;

            // if (data.Discription) setError("Discription", { type: "server", message: error.response.data.Discription[0] });
            // if (data.image1  ) setError("image1    ", { type: "server", message: error.response.data.image1    [0] });
            // if (data.image2) setError("image2", { type: "server", message: error.response.data.image2[0] })
            // if (data.password) setError("password", { type: "server", message: error.response.data.password[0] });
        }
    };

    return (
        <div>



            {/* =========================== offersection =========================== */}




            <>
                <Typography variant='h3' align='center' p={2}>offer section</Typography>
                <Fragment>
                    <Paper>
                        <Box px={3} py={2} sx={{ borderColor: "primary.main" }} >


                            <Grid container spacing={1}>

                                <Grid item xs={12} >
                                    <Typography variant="inherit" color="textSecondary">
                                        {errors.GigTitle?.message}
                                    </Typography>
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="type"
                                        name="type"
                                        label="First Name"
                                        fullWidth
                                        margin="dense"
                                        {...register("type")}
                                        error={errors.type ? true : false}
                                    />
                                    <Typography variant="inherit" color="textSecondary">
                                        {errors.type?.message}
                                    </Typography>
                                </Grid>


                                <Grid item xs={12} sm={12}>
                                    <TextField
                                        required
                                        label="desciption_about_offer"

                                        id="desciption_about_offer"
                                        name="desciption_about_offer"
                                        fullWidth
                                        margin="dense"
                                        {...register("desciption_about_offer")}
                                        error={errors.desciption_about_offer ? true : false}
                                    />
                                    <Typography variant="inherit" color="textSecondary">
                                        {errors.desciption_about_offer?.message}
                                    </Typography>
                                </Grid>


                                <Grid item xs={12} sm={12}>


                                    <TextField
                                        required
                                        id="price"
                                        name="price"
                                        // value={Discription}
                                        label="price"
                                        fullWidth
                                        margin="dense"
                                        {...register("price")}
                                        error={errors.price ? true : false}
                                    />
                                    <Typography variant="inherit" color="textSecondary">
                                        {errors.price?.message}
                                    </Typography>
                                </Grid>



                            </Grid>
                            <Box mt={3} textAlign='center'>
                                <Button variant="contained" color="primary" onClick={handleSubmit(onSubmit)}>
                                    Register
                                </Button>
                            </Box>
                        </Box>
                    </Paper>
                </Fragment>
            </>



            {/* =========================== offersection=== ======================== */}




        </div>
    )
}

export default CreateServiceWithOffer