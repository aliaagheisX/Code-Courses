import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function TopicsChart({ TopicsReport }) {
    const labels = TopicsReport.map(topic => topic.NAME);
    const quizData = TopicsReport.map(topic => topic.number_of_quizzes);
    const articleData = TopicsReport.map(topic => topic.number_of_articles);
    const courseData = TopicsReport.map(topic => topic.number_of_courses);

    const data = {
        labels,
        datasets: [
            {
                label: 'Quizzes',
                data: quizData,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
            {
                label: 'Articles',
                data: articleData,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
            {
                label: 'Courses',
                data: courseData,
                backgroundColor: 'rgba(255, 206, 86, 0.2)',
                borderColor: 'rgba(255, 206, 86, 1)',
                borderWidth: 1,
            },
        ],
    }
    const options = {
        indexAxis: 'y',
        elements: {
            bar: {
                borderWidth: 2,
            },
        },
        responsive: true,
        plugins: {
            legend: {
                position: 'right',
            },
            title: {
                display: true,
                text: 'Topics',
            },
        },
    };
    console.log(data)
    return (
        <div>
            <h2>Topics Report</h2>
            <Bar
                data={data}
                width={1000}
                height={1000}
                options={options}
            />
        </div>
    )
}
