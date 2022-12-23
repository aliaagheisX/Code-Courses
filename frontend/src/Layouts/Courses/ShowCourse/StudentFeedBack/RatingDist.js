import React from "react";
import { Stars } from './RatingDescription'
import styles from './styles/RatingDist.module.css'
export function RatingDist({ rating, count, precentage }) {
    return <div className={styles.cont}>
        <Stars rating={rating} />
        <span>{precentage}%</span>
    </div>;
}
