import React from "react";
import { Stars } from './RatingDescription'
import styles from './styles/AverageRating.module.css'

export function AverageRating({
    averageRating
}) {
    return <div className={styles.container}>
        <span className={styles.rating}>{averageRating.toPrecision(2)}</span>
        <Stars rating={averageRating} />
        <span className={styles.title}>course rating</span>
    </div>;
}
