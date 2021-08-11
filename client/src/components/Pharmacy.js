import React from 'react'
import {
    Card,CardBody,
    CardTitle, CardSubtitle
} from 'reactstrap';


function Pharmacy({pharmacy}) {
    return (
        <Card onClick={e=> e.stopPropagation()} >
            <CardBody>
                <CardTitle tag="h5">{pharmacy.name}</CardTitle>
                <CardSubtitle tag="h6" className="mb-2 text-muted">07:00 - 19:00</CardSubtitle>
            </CardBody>
        </Card>
    )
}

export default Pharmacy
