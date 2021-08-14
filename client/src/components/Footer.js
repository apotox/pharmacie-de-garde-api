import React from 'react'

function Footer() {
    
    return (
        <footer>
            <p style={{
                fontSize: 12
            }}>{process.env.REACT_APP_GITHUB_SHA || 'v0.0.0'}</p>
        </footer>
    )
}

export default Footer
