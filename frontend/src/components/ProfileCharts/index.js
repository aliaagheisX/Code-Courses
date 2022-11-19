import React from 'react'
import styles from './index.module.css'

import Circle from './Circle'

const data = [10, 29, 20]
const labels = [`Courses`, `Quizzes`, `Articles`]
const backgroundColor = ['#424261', '#E59819', '#8FC93A']
const backgroundColorQ = ['#424261', '#8FC93A']

const dataQ = [200, 90]
const labelsQ = [`correct`, `uncorrect`]

const dataC = [3, 7]
const labelsC = [`finished`, `unfinished`]
export default function ProfileCharts() {
    return (
        <div className={styles.wrapper}>
            <Circle data={data} labels={labels} backgroundColor={backgroundColor} title='total activities' />;
            <Circle data={dataC} labels={labelsC} backgroundColor={backgroundColor} title='total courses' />;
            <Circle data={dataQ} labels={labelsQ} backgroundColor={backgroundColorQ} title='total questions' />;
            {/* <Circle data={dataQ} labels={labelsQ} backgroundColor={backgroundColorQ} title={titleQ} />;
            <Circle data={dataC} labels={labelsC} backgroundColor={backgroundColorC} title={titleC} />;
 */}
        </div>
    )
}
