import React from 'react'
import Avatar from '../../../../components/Avatar'
import styles from './index.module.css'
export default function AddComment() {
    return (
        <form className='form'>
            <div className={styles.frm}>
                <Avatar avatar={'/15-08.jpg'} />
                <input type='text' placeholder='Add your comment here...' />
            </div>
        </form>
    )
}
