import React from 'react';
import errorImage from '../resources/error-page.png'

const ErrorPage = () => {
    return (
        <div className="search-main">
            <p>The page you have requested is either under construction or doesn't exist! Try going back.</p>
            <img src={errorImage} alt="page does not exist" className="search-image" />
        </div>
    )
}

export default ErrorPage