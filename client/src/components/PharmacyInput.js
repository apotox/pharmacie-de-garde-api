import React, { useState } from 'react'
import {
    Card, CardText, CardBody,
    CardTitle, CardSubtitle, Input, CardFooter, Button
} from 'reactstrap';
import AsyncSelect from 'react-select/async';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_GARDES_BY_DAY } from '../redux/actions/app.actions';

const pharmacySchema={
    name: '',
    hourFrom: '',
    hourTo: '',
    lat: 1,
    lng: 1,
    pharmacyId: null
}

function PharmacyInput({day}) {

    const { pharmacies = []} = useSelector(state => state.app)
    const [pharmacy,setPharmacy] = useState(pharmacySchema)
    const [existingPharmacyKey,setExistingPharmacyKey] = useState(null)
    const dispatch = useDispatch()
    const filterPharmacies = (inputValue) => {
        return pharmacies.filter(p =>
            p.name.toLowerCase().includes(inputValue.toLowerCase())
        ).map(i => ({
            value: i,
            label: i.name
        }))
    };



    const loadPharmacies = (inputValue, callback) => {
        setTimeout(() => {
            callback(filterPharmacies(inputValue));
        }, 200);
    }

    const handleInputChange = (newValue) => {
        //const inputValue = newValue.replace(/\W/g, '');
        //setValue(newValue);
        return newValue;
    };

    const updatePharmacyInput=(field)=>(e)=>{
        // if user change these values
        if(['lat','lng','name'].includes(field)){
            // dont use the existing pharmacy
            setExistingPharmacyKey(null)
        }
        setPharmacy({
            ...pharmacy,
            [field]: e.target.value
        })
    }
    const onSelect = ({ value }) => {

        setExistingPharmacyKey(value.key)
        setPharmacy({
            ...value,
            hourFrom: '19:00',
            hourTo: '00:00'
        })

    }

    const saveParmacy=()=>{
        

        if(existingPharmacyKey){
            pharmacy.pharmacyId = existingPharmacyKey
            setExistingPharmacyKey(null)
        }

        // add the new pharmacy to the redux status
        dispatch(ADD_GARDES_BY_DAY(day,pharmacy))

        // reset the pharmacyInput
        setPharmacy(pharmacySchema)

    }

    return (
        <Card className='pharmacy-input' style={{
            backgroundColor: existingPharmacyKey ? '#8bc34a1f':'#fff',
        }} onClick={e => e.stopPropagation()} >
            <CardBody>
                <p>add new garde for this day</p>
                <CardTitle tag="h5">
                    <div className='autocomplete-container' style={{
                        display: "flex",
                        flexDirection: "row",
                    }}>
                        
                        <Input
                        onChange={updatePharmacyInput('name')}
                        value={pharmacy.name} placeholder="pharmacy name" />


                        {
                        pharmacies.length ? <AsyncSelect
                            
                            className='async-select'
                            onChange={onSelect}
                            onInputChange={handleInputChange}
                            loadOptions={loadPharmacies} /> : null
                        }


                    </div>
                </CardTitle>
                <CardSubtitle tag="h6" className="mb-2 text-muted">
                <div style={{display:'flex',flexDirection:'row'}}>
                    <Input onChange={updatePharmacyInput('hourFrom')} value={pharmacy.hourFrom} type='time' placeholder="07:00" />
                    <Input onChange={updatePharmacyInput('hourTo')} value={pharmacy.hourTo} type='time' placeholder="19:00" />
                    </div>
                </CardSubtitle>
                <CardText>
                    <div style={{display:'flex',flexDirection:'row'}}>
                    <Input onChange={updatePharmacyInput('lat')} value={pharmacy.lat} type='number' placeholder="position gps lat" />
                    <Input onChange={updatePharmacyInput('lng')} value={pharmacy.lng} type='number' placeholder="position gps lng" />
                    </div>
                </CardText>

                
            </CardBody>

            <CardFooter>
                <Button onClick={saveParmacy} disabled={!pharmacy.name}  color='success' size='sm'>save</Button>
            </CardFooter>
        </Card>
    )
}

export default PharmacyInput
