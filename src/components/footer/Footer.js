import React from 'react';
import './footer.css';

function Footer() {
    return (
        <div className='footer' onClick={() => window.scrollTo(0, 0)}>
            <p>Back to top</p>
        </div>
    )
}

export default Footer