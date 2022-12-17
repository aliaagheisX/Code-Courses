import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import Error from './Layouts/Error';
import Waiting from './Layouts/Waiting';


export default function Resource({ path, render, ErrorComp }) {
    if (ErrorComp === undefined) ErrorComp = <Error />;
    const [error, setError] = useState(null);
    const [loading, setLoadeding] = useState(true);
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoadeding(1)
                const res = await fetch(path)
                const data = await res.json()
                if (!res.ok) throw data.message
                setLoadeding(0)
                setItems(data)
            } catch (err) {
                setLoadeding(0)
                setError(err)
            }
        }
        fetchData()


    }, [])


    if (loading) return <Waiting />
    if (error) return ErrorComp

    return render({ items });
}

Resource.propTypes = {
    path: PropTypes.string.isRequired,
    render: PropTypes.func.isRequired
}