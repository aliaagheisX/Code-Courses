import React from 'react'
import styles from './index.module.css'

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);




export default function ProfileCharts({ labels, data, backgroundColor, title }) {
    labels = labels.map((item, i) => item + ` (${data[i]})`)
    const data_s = {
        labels: labels,
        datasets: [
            {
                label: 'total #',
                data: data,
                backgroundColor: backgroundColor,
            },
        ],
    }



    const options = {
        cutout: 65,
        plugins: {
            legend: {
                position: 'right',
                labels: {
                    usePointStyle: true,
                    pointStyle: 'circle',
                    padding: 25,
                }
            }
        }
    }

    const sum = (data) => data.reduce((sum, curr) => sum + curr, 0)



    return (
        <div className={styles.circle}>
            <Doughnut data={data_s} options={options} />

            <div className={styles.mainLabel}>
                <span className={styles.total}>
                    {sum(data)}
                </span>
                <span className={styles.label}>{title}</span>
            </div>
        </div>
    )
}
