import React, { useEffect, useState } from 'react'
import './CustomCarsoul.module.css'


import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import CarsoulPrevBtn from './CarsoulPrevBtn';
import CarsoulNextBtn from './CarsoulNextBtn';


export default function CustomCarsoul({ items }) {

    const [displayNext, setDisplayNext] = useState(items.length > 3);
    const [displayPrev, setDisplayPrev] = useState(0);

    const handelDisplayButtons = (swiper) => {
        setDisplayNext(!swiper.isEnd)
        setDisplayPrev(!swiper.isBeginning)
    }
    return (
        <Swiper
            breakpoints={{

                1090: {
                    slidesPerView: 3,
                    slidesPerGroup: 2,
                    spaceBetween: 20,
                },
            }}

            modules={[Navigation]}
            speed={500}
            onSlideChange={handelDisplayButtons}
            className='mySwiper'
        >
            <CarsoulNextBtn display={displayNext} />
            <CarsoulPrevBtn display={displayPrev} />

            {items.map((e, i) => (
                <SwiperSlide key={i}>
                    {e}
                </SwiperSlide>
            ))}
        </Swiper>
    )
}
