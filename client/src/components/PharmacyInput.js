import React from 'react'
import {
    Card, CardText, CardBody,
    CardTitle, CardSubtitle, Input
} from 'reactstrap';
import AsyncSelect from 'react-select/async';
import { useSelector } from 'react-redux';

function PharmacyInput() {

    const { pharmacies , selectedPharmacyId } = useSelector(state => state.app)


    return (
        <Card onClick={e => e.stopPropagation()} >
            <CardBody>
                <CardTitle tag="h5">
                    <div className='autocomplete-container' style={{
                        display: "flex",
                        flexDirection: "row"
                    }}>
                        <Input placeholder="pharmacy name" />



                        {/* {pharmacies.length && <AsyncSelect
                defaultValue={{
                    value: selectedCityId,
                    label: loadCityLabelById(selectedCityId)
                }}
                onChange={onSelectCity}
                onInputChange={handleInputChange}
                loadOptions={loadCities}
                onMenuScrollToBottom={onscrollmenu} />} */}
                        
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
