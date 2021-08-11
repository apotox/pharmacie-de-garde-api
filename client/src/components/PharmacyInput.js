import React from 'react'
import Autocomplete from 'react-autocomplete';
import {
    Card, CardText, CardBody,
    CardTitle, CardSubtitle, Input
} from 'reactstrap';


function PharmacyInput() {


    return (
        <Card onClick={e => e.stopPropagation()} >
            <CardBody>
                <CardTitle tag="h5">
                    <div className='autocomplete-container' style={{
                        display: "flex",
                        flexDirection: "row"
                    }}>
                        <Input placeholder="pharmacy name" />
                        <Autocomplete

                            inputProps={{
                                placeholder: "Search",
                                className: 'form-control'
                            }}
                            renderItem={(item, isHighlighted) =>
                                <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                                    {item.label}
                                </div>
                            }
                            items={[
                                { label: 'apple' },
                                { label: 'banana' },
                                { label: 'pear' }
                            ]}
                        />
                    </div>
                </CardTitle>
                <CardSubtitle tag="h6" className="mb-2 text-muted">
                    <Input placeholder="07:00-19:00" />
                </CardSubtitle>
                <CardText>
                    <Input placeholder="position gps" />
                </CardText>
            </CardBody>
        </Card>
    )
}

export default PharmacyInput
