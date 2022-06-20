import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { axiosBasicInstance } from '../Axios/AxiosBasicInstance';
import axios from 'axios';
import { SEARCH_SERVICES } from '../Utils/Urls';
import SearchIcon from '@mui/icons-material/Search';
import { Button } from '@mui/material';
import { fetchServices, searchingServices } from '../Redux/Actions/fetch.services';
import { useDispatch, useSelector } from 'react-redux';

const filterOptions = createFilterOptions(
    {
        matchFrom: 'start',
        stringify: (option) => option.title,
    }
);

export default function Filter({ marginLeftSize }) {

    const dispatch = useDispatch()

    const [searchItem, setSearchItem] = useState([])
    const [allSearchItems, setAllSearchItems] = useState([])

    const handleSearch = async (item) => {
        try {
            // const { data } = await axios.get(`http://localhost:8000/services/search/${item}`)
            const { data } = await axiosBasicInstance.get(SEARCH_SERVICES + item)
            console.log(data);
            setSearchItem(data)
            setAllSearchItems(data)
        } catch (error) {
            console.log(error.response);
        }
    }


    const handleSort = (e) => {

        const datas = !e.target.value ? allSearchItems :
            allSearchItems.filter(
                data => String(data.title).startsWith(e.target.value)
            )
        setSearchItem(datas)
        dispatch(searchingServices(datas))
    }


    return (
        // <div style={{ display: "flex" }}>

        <Autocomplete
            id="filter-demo"
            options={searchItem}
            fullWidth
            filterOptions={filterOptions}
            sx={{ width: 300, marginLeft: marginLeftSize }}
            getOptionLabel={(option) => option.title}
            onInput={handleSort}
            onFocus={() => handleSearch("")}
            size="small"
            renderInput={(params) => <TextField {...params} label="Search" />}
        />

        // </div>
    );
}
