import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Carousel from 'react-bootstrap/Carousel'



const Carosal = ({ image1, image2 }) => {


    return (

        <Carousel style={{ maxWidth: "715px" }}>
            <Carousel.Item interval={1500}>
                <img
                    className="d-block w-100"
                    src={image1}
                    alt="First slide"
                />
            </Carousel.Item>
            <Carousel.Item interval={1500}>
                <img
                    className="d-block w-100"
                    src={image2}
                    alt="Second slide"
                />
            </Carousel.Item>

        </Carousel>

    )
}

export default Carosal