

import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from 'reactstrap'

function NAlert() {

    const {message,color,isVisible} = useSelector(state=>state.notification)

    if(!isVisible) return <></>
    return (
        <Alert color={ color || "primary"}>
            {message}
        </Alert>
    )
}

export default NAlert
