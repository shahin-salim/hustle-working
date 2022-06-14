import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import useTheAxios from '../Axios/useAxios';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Header from '../Components/Header/Header';
import Footer from '../Components/Footer/Footer';
import Container from 'react-bootstrap/Container';
import DataTableMaterial from '../Components/DataTableMaterial';
import { axiosBasicInstance } from '../Axios/AxiosBasicInstance';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';


const Orders = () => {

    const useAxios = useTheAxios()

    const [orders, setOrders] = useState([])
    const [page, setPage] = React.useState(1);
    const [backupOrders, setBackupOrders] = useState([])

    const currActivePage = useSelector(state => state.currActivePage)




    const fetchOrderDetials = async () => {

        try {
            // user may have 2 roles buyer and seller.
            // if buyer order data is need pass buyer as after 'order/' url

            const { data } = await useAxios.get(`/order/${currActivePage}`)
            // const { data } = await axios.get(`http://localhost:8000/order/${currActivePage}`)
            console.log(data);
            setOrders(data)
            setBackupOrders(data)

        } catch (error) {
            console.log(error);
        }
    }

    const ShowOrderDetails = ({ data, index }) => {
        const handleFilter = async (id) => {
            console.log("============= filtering ============", id);
            // ORDER COMPLETED  Funtionality

            try {
                const { data } = await useAxios.post(`order/order_completed/${id}`)

                // ========= order completion status =========
                setOrders(
                    orders.map((value) => {
                        if (value.id == id) {
                            return {
                                ...value,
                                buyer_completion_status: true
                            }
                        }
                        return value
                    })
                )
                // ========= order completion status =========

            } catch (error) {
                console.log(error);
            }
        }



        return (
            <>
                <TableCell align="center" component="th" scope="data">
                    {data.package_id.service_id.user.username}
                </TableCell>
                <TableCell align="center">{data.payment_id ? data.payment_id.amount : "not found"}</TableCell>
                <TableCell align="center">{data.package_id.delivery_time}</TableCell>
                <TableCell align="center">{data.date}</TableCell>
                <TableCell align="center">
                    {
                        !data.buyer_completion_status ?
                            <Button variant="outlined" onClick={() => handleFilter(data.id)}>
                                not completed
                            </Button>
                            :
                            "completed"
                    }
                </TableCell>
            </>
        )
    }


    useEffect(() => {
        fetchOrderDetials()
    }, [currActivePage])


    return (
        <>
            <Container style={{ maxWidth: "1500px", padding: "2rem 0rem 1.5rem 0rem" }}>
                <DataTableMaterial
                    tableHeading={
                        ["Seller", "Amount", "Delivery time", "date", "Mark as completed"]   // headline of the table
                    }
                    lengthOfPagination={Math.ceil(orders.length / 6)}  // length of pagiantion is the lenth of data / 6
                    title={"Orders"}                                   // title of the page
                    page={page}                                        // current pagination no
                    setPage={setPage}                                  // setState of pagination
                    datas={orders.slice(6 * page - 6, 6 * page)}       // data map in table. 6 is the pagination limit in the page
                    RowComponent={ShowOrderDetails}                    // this is each row. this funtion called as row and pass data to it
                    selectTagFileringItems={["Seller", "Amount"]}      // filter option in the page. this items are showed inside the select tag
                    filterFunc={(type, value) => {                     // filter funtion takes 2 arg. type is the selected  item value is the value entered

                        if (type == "Seller") {                        // according to the input write  different filtering logic the set to setOrder
                            setOrders(
                                backupOrders.filter(data => data.package_id.service_id.user.username.startsWith(value))
                            )
                        }
                        else if (type == "Amount") {
                            setOrders(backupOrders.filter(data => data.payment_id.amount > value))
                        }

                        if (!value) {
                            setOrders(backupOrders)
                        }
                    }}

                />
            </ Container>

        </>
    )
}

export default Orders