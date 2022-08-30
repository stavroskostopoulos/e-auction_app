import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

function HomePage() {
    let navigate = useNavigate();

    React.useEffect(() => {
        navigate("/login")
    }, []);

    return (
        <></>
    )

}

export default HomePage;