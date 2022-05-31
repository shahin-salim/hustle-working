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
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Modal from '../Modal';


function CreateNewGig() {

    const useTheAxios = useAxios()               //   custom hook for using axios interceptor
    const dispatch = useDispatch()
    const data = useSelector(state => state)
    // { bool: true, type: "enter_offer_details" }
    const [open, setOpen] = useState({ bool: false })


    var validationSchema = Yup.object().shape({

        GigTitle: Yup.string().required("GigTitle is required").matches(/^\S*$/, "This field should not be blank"),
        Subcategory: Yup.string().required("Subcategory is required").matches(/^\S*$/, "This field should not be blank"),
        Discription: Yup.string().required("Discription is required").matches(/^\S*$/, "This field should not be blank"),
        image1: Yup.number()
            .required("phone number is required"),
        image2: Yup.number()
            .required("phone number is required"),
    });


    // =================== offer validation schema ===================

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        setError,
        setValue,
    } = useForm({
        resolver: yupResolver(validationSchema),
    });


    const onSubmit = async (data) => {

        try {

            // post signup form data to database if the request is success 
            // set access token and refresh token in the local storage
            // and set the userStatus state in redux set as True it will indiacate is online
            const { data } = await useTheAxios.post("SIGNUP_URL", data)
            console.log(data)
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



    const [subCategory, setSubCategory] = React.useState('');

    console.log(subCategory);



    return (
        <Container style={{ maxWidth: "1500px", padding: "2rem 0rem 1.5rem 0rem" }}>


            <Modal open={open} setOpen={setOpen} />


            {/* ======================== service details ============================ */}
            <>
                <Typography variant='h3' align='center' p={2}>SignUp</Typography>
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
                                        id="GigTitle"
                                        name="GigTitle"
                                        label="First Name"
                                        fullWidth
                                        margin="dense"
                                        {...register("GigTitle")}
                                        error={errors.GigTitle ? true : false}
                                    />
                                    <Typography variant="inherit" color="textSecondary">
                                        {errors.GigTitle?.message}
                                    </Typography>
                                </Grid>

                                <Grid item xs={12} sm={6}>

                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={subCategory}
                                        fullWidth
                                        label="Age"

                                        onChange={(e) => setSubCategory(e.target.value)}
                                        {...register("Subcategory")}
                                        error={errors.Subcategory ? true : false}
                                    >
                                        <MenuItem value={"Ten"}>Ten</MenuItem>
                                        <MenuItem value={"Twenty"}>Twenty</MenuItem>
                                        <MenuItem value={"Thirty"}>Thirty</MenuItem>
                                    </Select>

                           
                                    <Typography variant="inherit" color="textSecondary">
                                        {errors.Subcategory?.message}
                                    </Typography>
                                </Grid>

                                <Grid item xs={12} sm={12}>
                                    <TextField
                                        required
                                        id="image1"
                                        name="image1"

                                        type="file"
                                        // value={Discription}

                                        fullWidth
                                        margin="dense"
                                        {...register("image1")}
                                        error={errors.image1 ? true : false}
                                    />
                                    <Typography variant="inherit" color="textSecondary">
                                        {errors.image1?.message}
                                    </Typography>
                                </Grid>

                                <Grid item xs={12} sm={12}>
                                    <TextField
                                        required
                                        id="image2"
                                        name="image2"

                                        type="file"
                                        // value={Discription}

                                        fullWidth
                                        margin="dense"
                                        {...register("image2")}
                                        error={errors.image2 ? true : false}
                                    />
                                    <Typography variant="inherit" color="textSecondary">
                                        {errors.image2?.message}
                                    </Typography>
                                </Grid>

                                <Grid item xs={12} sm={12}>


                                    <TextareaAutosize
                                        aria-label="minimum height"
                                        minRows={3}
                                        placeholder="Minimum 3 rows"
                                        {...register("Discription")}
                                        // error={errors.Discription ? true : false}
                                        style={{ width: "100%" }}
                                    />
                                    <Typography variant="inherit" color="textSecondary">
                                        {errors.Discription?.message}
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
            {/* =================== service details ends ===================== */}





        </Container>
    )
}

export default CreateNewGig