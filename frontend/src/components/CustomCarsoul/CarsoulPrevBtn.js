import React, { useEffect } from 'react'
import styles from './CustomCarsoul.module.css'
import { useSwiper } from "swiper/react";

export default function CarsoulPrevBtn({ display }) {
    const swiper = useSwiper();
    return (
        display && (
            <span className={styles.before} onClick={() => swiper.slidePrev()}>
                <span className='material-symbols-outlined'>navigate_before</span>
            </span>
        )
    )
}
