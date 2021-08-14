import React from 'react'
import {
    Card,CardBody,
    CardTitle, CardSubtitle
} from 'reactstrap';
import {FaTrash} from 'react-icons/fa'

function Pharmacy({pharmacy}) {
    return (
        <Card onClick={e=> e.stopPropagation()} >
            <CardBody>
                <CardTitle tag="h5">{pharmacy.name}</CardTitle>
                <CardSubtitle tag="h6" className="mb-2 text-muted">{`${pharmacy.hourFrom} - ${pharmacy.hourTo}`}</CardSubtitle>

                <div className='svg-container'>
                    <FaTrash />
                </div>
            </CardBody>
        </Card>
    )
}

export default Pharmacy
