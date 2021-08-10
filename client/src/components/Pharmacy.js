import React from 'react'
import {
    Card, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';


function Pharmacy({pharmacy,index}) {
    return (
        <Card >
            <CardBody>
                <CardText>2021/08/19</CardText>
                <CardTitle tag="h5">{pharmacy.name}</CardTitle>
                <CardSubtitle tag="h6" className="mb-2 text-muted">07:00 - 19:00</CardSubtitle>
                <Button>Edit</Button>
            </CardBody>
        </Card>
    )
}

export default Pharmacy
