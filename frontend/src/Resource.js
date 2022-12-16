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
        fetch(path)
            .then((res) => {
                if (res.ok) return res.json();
                throw Error;
            })
            .then(
                (result) => {
                    setLoadeding(false);
                    setItems(result);
                },
                (error) => {
                    setLoadeding(false);
                    setError(error);
                }
            )

    }, [])


    if (loading) return <Waiting />
    if (error) return ErrorComp

    return render({ items });
}

Resource.propTypes = {
    path: PropTypes.string.isRequired,
    render: PropTypes.func.isRequired
}