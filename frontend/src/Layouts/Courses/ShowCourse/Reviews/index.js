import React, { useEffect, useState } from 'react'
import useToken from '../../../../useToken'
import Review from './Review'

export default function Reviews({ reviews }) {
    const { token, userdata } = useToken()
    const [myReview, setMyReview] = useState()
    useEffect(() => {
        if (token) {
            reviews.forEach((ele) => {
                if (ele.SID === userdata.ID) setMyReview(ele);
            })
        }
    }, [])
    return (
        <section>
            <h4>Reviews</h4>
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
