import React, { useEffect } from 'react'
import styles from './CustomCarsoul.module.css'
import { useSwiper } from "swiper/react";

export default function CarsoulNextBtn({ display }) {

    const swiper = useSwiper();
    const clickHandeler = () => {
        swiper.slideNext();
    }

    return (
        display && (
            <span className={styles.next} onClick={clickHandeler}>
                <span className='material-symbols-outlined'>navigate_next</span>
            </span>
        )
    )
}
