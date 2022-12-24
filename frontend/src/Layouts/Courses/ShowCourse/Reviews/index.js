import React, { useEffect, useState } from 'react'
import useToken from '../../../../useToken'
import Review from './Review'
import styles from './index.module.css'
import UserOptions from './UserOptions'
import AddReview from './AddReview'
export default function Reviews({ reviews, id, setCourseRating, is_enrolled }) {
    const { token, userdata } = useToken()
    const [myReview, setMyReview] = useState(null)
    const [isEditing, setIsEditing] = useState(0)
    const toggleEditing = () => setIsEditing(!isEditing);
    useEffect(() => {
        if (token) {
            reviews.forEach((ele) => {
                if (ele.SID === userdata.ID) setMyReview(ele);
            })
        }
    }, [])

    const chReview = (review, rating) => {
        setMyReview(review)
        setIsEditing(0)
        setCourseRating(rating)
    }
    return (
        <section>
            <h4>Reviews</h4>
            {
                token && is_enrolled && (
                    isEditing || !myReview ?
                        <AddReview id={id} review={myReview} chReview={chReview} /> :
                        <div className={styles.myReview}>
                            <Review review={myReview} />
                            <UserOptions toggleEditing={toggleEditing} id={id} chReview={chReview} />
                        </div>
                )
            }
            {
                reviews.map((review) => {
                    if (review.SID !== userdata.ID) {
                        return (
                            <Review key={review.SID} review={review} />
                        )
                    }
                })
            }
        </section>
    )
}
