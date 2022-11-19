import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import WaitingPage from './Layouts/Waiting';
import Error from './Layouts/Error';

export default function Resource({ path, render }) {
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


    if (loading) return <WaitingPage />
    if (error) return <Error />

    return render({ items });
}

Resource.propTypes = {
    path: PropTypes.string.isRequired,
    render: PropTypes.func.isRequired
}