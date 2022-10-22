import React from 'react'
import { Link } from 'react-router-dom';


function AllDetailsLink({ linkdetails, cetagory }) {
    return (
        <div className='para'><Link to={`/${cetagory}?cet=${cetagory}`} >{linkdetails}</Link></div>
    )
}

export default AllDetailsLink