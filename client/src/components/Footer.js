import React from 'react'

function Footer() {
    
    return (
        <footer>
            <p>{process.env.REACT_APP_GITHUB_SHA || 'local'}</p>
        </footer>
    )
}

export default Footer
