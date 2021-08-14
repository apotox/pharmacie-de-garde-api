import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AsyncSelect from 'react-select/async';
import { Container } from 'reactstrap'
import { SET_SELECTED_CITYID } from '../redux/actions/app.actions';
import { LOAD_CITIES } from '../redux/actions/city.actions'
import LazyLoading from './LazyLoading';

function SelectCity() {

    const { cities , selectedCityId } = useSelector(state => state.app)
    const [value, setValue] = useState('Ain Touta')

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(LOAD_CITIES())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const parseCity=(i)=>`${i.commune_name_ascii} · ${i.daira_name_ascii} · ${i.wilaya_name_ascii}`

    const filterCities = (inputValue) => {
        return cities.filter(i =>
            i.commune_name_ascii.toLowerCase().includes(inputValue.toLowerCase()) ||
            i.daira_name_ascii.toLowerCase().includes(inputValue.toLowerCase()) ||
            i.wilaya_name_ascii.toLowerCase().includes(inputValue.toLowerCase())
        ).map(i => ({
            value: i.id,
            label: `${parseCity(i)}`
        }))
    };

    const loadCities = (inputValue, callback) => {
        setTimeout(() => {
            callback(filterCities(inputValue));
        }, 200);
    }

    const handleInputChange = (newValue) => {
        //const inputValue = newValue.replace(/\W/g, '');
        setValue(newValue);
        return newValue;
    };

    const onscrollmenu = () => {
    }
    const onSelectCity = ({value}) => {
        dispatch(SET_SELECTED_CITYID(value))
    }
    const loadCityLabelById =(id)=>{
        return parseCity(cities.find(i=>i.id === id))
    }
    
    return (
        <Container>
             <pre>search for "<b>{value}</b>"</pre>
            { cities.length ? <AsyncSelect
                defaultValue={{
                    value: selectedCityId,
                    label: loadCityLabelById(selectedCityId)
                }}
                onChange={onSelectCity}
                onInputChange={handleInputChange}
                loadOptions={loadCities}
                onMenuScrollToBottom={onscrollmenu} /> : <LazyLoading lines={1} />}
        </Container>
    )
}

export default SelectCity
