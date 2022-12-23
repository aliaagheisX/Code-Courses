import React, { useEffect } from 'react';
import { RatingDist } from './RatingDist';
import { AverageRating } from './AverageRating';
import Bar from './Bar';
import styles from './styles/index.module.css'
export default function StudentFeedBack({ ratingData }) {


    const getData = () => {
        const ratingDistribution = {
            0: 0,
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
        }
        let averageRating = 0;
        let cnt = 0;
        ratingData.forEach(({ rate, count }) => {
            ratingDistribution[rate] = count;
            averageRating += rate * count;
            cnt += count;
            console.log(ratingDistribution[rate])
        })
        averageRating = cnt !== 0 ? averageRating / cnt : 0;

        return [averageRating, ratingDistribution, cnt]
    }

    return (
        <div>
            <h4>Student Feedback</h4>
            <div className={styles.container}>
                <AverageRating averageRating={getData()[0]} />

                <div className={styles.dist}>
                    {
                        Object.keys(getData()[1]).map((ratekey) => {
                            const rating = parseInt(ratekey)
                            const count = getData()[1][ratekey];
                            const precentage = getData()[2] !== 0 ? Math.round(count / getData()[2] * 100) : 0;
                            return (
                                <div className={styles.ratings} key={rating}>
                                    <Bar precentage={precentage} />
                                    <RatingDist rating={rating} count={count} precentage={precentage} />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
