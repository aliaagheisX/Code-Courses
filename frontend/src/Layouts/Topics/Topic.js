import React, { createRef, useEffect, useState } from 'react'
import api from '../../api'
import useToken from '../../useToken'
import styles from './index.module.css'
import Spinner from 'react-bootstrap/Spinner';

export default function Topic({ tagName, id, isAdd }) {
    const { token } = useToken()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(0)
    const [onIt, setOnIt] = useState(0)
    const [tag, setTag] = useState(tagName)
    const [addedTopics, setAddedTopics] = useState([])
    const myInput = createRef()

    const resizeInput = () => {

        myInput.current.style.width = myInput.current.value.length + 1 + "ch";
    }
    useEffect(() => {
        resizeInput();
    }, [])

    const startEditing = () => {
        myInput.current.disabled = false
        myInput.current.focus()
        if (isAdd) {
            myInput.current.value = ''
        }
    }
    const handelBlurInput = () => {
        myInput.current.value = tagName
        myInput.current.disabled = true
        resizeInput()
        setLoading(0)
        setError('')
    }
    const handelInputChange = (e) => {

        setTag(e.target.value)
        resizeInput()

        if (/\d/.test(e.target.value) || e.target.value === '')
            setError("enter string with no number") //check if not number
    }

    const handelEditTag = async (body) => {
        setLoading(1)

        fetch(api.editTopic(id), {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', 'token': token },
            body: JSON.stringify(body)
        })
            .then(async (res) => {
                const ret = await res.json()

                if (res.status !== 200)
                    throw ret.message
                return ret
            })
            .then(data => {
                setError('')
                setLoading(0)
            })
            .catch(err => {
                setError(err)
                setLoading(0)
            })
    }

    const handelAddTopic = async (body) => {
        try {
            const res = await fetch(api.addTopic, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'token': token },
                body: JSON.stringify(body)
            })
            const data = await res.json()

            if (res.status !== 201)
                throw data.message
            else {
                const g = addedTopics
                const nwTopic = { tag: tag, id: data.topic.ID }
                g.unshift(nwTopic)
                setAddedTopics(g)

                setLoading(0)
            }
        }
        catch (err) {
            setError(err)
            setLoading(0)
        }
    }

    const handelSubmit = async (e) => {
        e.preventDefault()
        if (error) return;
        setLoading(1)
        const body = { name: myInput.current.value }

        if (isAdd)
            handelAddTopic(body)
        else
            handelEditTag(body)


    }


    return (
        <>

            <div className='error'>{error}</div>
            <form onSubmit={handelSubmit}>
                <div className={`tag ${error ? 'error' : ''}`}
                    onMouseEnter={() => setOnIt(1)}
                    onMouseLeave={() => setOnIt(0)}
                    onChange={handelInputChange}
                >
                    <input ref={myInput} value={tag} disabled className={styles.tagIn} onBlur={handelBlurInput} />
                    {!loading && (onIt || isAdd) ? (<>
                        <span className="material-symbols-outlined"
                            onClick={startEditing}>
                            {isAdd ? 'add' : 'edit'}
                        </span>
                    </>) : null}

                    {
                        loading ? <Spinner animation="border" variant="primary" size="sm" /> : null
                    }

                </div>
            </form>

            {
                addedTopics.map(({ tag, id }) =>
                    <Topic tagName={tag} id={id} key={id} isAdd={0} />
                )}
        </>
    )
}
