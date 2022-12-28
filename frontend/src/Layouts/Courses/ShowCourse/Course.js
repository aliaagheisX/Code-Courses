import React, { useState } from 'react'
import styles from './index.module.css'
import Thumb from '../../../components/Thumb'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'https://esm.sh/remark-gfm@3'
import useToken from '../../../useToken'
import Options from './Options';
import StudentFeedBack from './StudentFeedBack'
import Reviews from './Reviews'
import Resource from '../../../Resource'
import api from '../../../api'
import CourseContent from '../../../components/CourseContent'
import { Link } from 'react-router-dom'

export default function Course({ course }) {
    const { userdata } = useToken()
    const [enrollState, setEnrollState] = useState(course.is_enrolled)
    const [courseRating, setCourseRating] = useState(course.rating)
    const {
        ID, TITLE, INSTRUCTORFNAME, INSTRUCTORSNAME,
        PREREQUISITES, CREATIONDATE, DESCRIPTION, IMAGE, INSTRUCTORID, enrolls_count
    } = course.course
    const create_date = new Date(CREATIONDATE).toDateString().split(' ').slice(1).join(' ');



    return (
        <section className={styles.sec}>
            <Options id={ID} instructor_id={INSTRUCTORID} is_enrolled={enrollState} setEnrollState={setEnrollState} />
            <div className={styles.stLike}>

                <span className={`${styles.vsCont}`}>
                    <span className={styles.stl}>{enrolls_count} </span>
                    <span className="material-symbols-outlined">
                        group
                    </span>
                </span>
            </div>
            <h3>{TITLE}</h3>
            <p className={styles.desc}>{DESCRIPTION}</p>
            <div className='tag-list'>
                {course.topics.map(({ NAME, TID }) => <div key={TID} className='tag active'>{NAME}</div>)}
            </div>

            <Thumb avatar={IMAGE} />
            {
                (userdata.ID === INSTRUCTORID || enrollState) &&
                <div className={styles.opI}>
                    <Link to={`/discussions/${ID}`} className='btnE' >chat room</Link>
                </div>

            }
            <div className={styles.markW}>
                <h2>Prerequisite</h2>

                <ReactMarkdown children={PREREQUISITES} remarkPlugins={[remarkGfm]} />

                <Resource
                    path={api.getCourseLessons(ID)}
                    render={({ items: { lessons } }) => <CourseContent instructor_id={INSTRUCTORID} lessons={lessons} />}
                    ErrorComp={<></>}
                />
                <div className={styles.footer}>
                    <h4>By {INSTRUCTORFNAME === null ? 'Unknown' : `${INSTRUCTORFNAME} ${INSTRUCTORSNAME}`}</h4>
                    <div>at {create_date}</div>
                </div>
                <StudentFeedBack totalCount={enrolls_count} ratingData={courseRating} />
                <Reviews is_enrolled={enrollState} id={ID} reviews={course.reviews} setCourseRating={setCourseRating} />
            </div>


        </section>
    )
}
