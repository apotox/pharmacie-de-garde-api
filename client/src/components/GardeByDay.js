import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { Collapse } from 'reactstrap'
import { GET_GARDES_BY_DAY, GET_PHARMACIES } from '../redux/actions/app.actions';
import Pharmacy from './Pharmacy';
import PharmacyInput from './PharmacyInput';


function GardeByDay() {

    const { gardesByDay, selectedCityId } = useSelector(state => state.app)
    const [openedDays, setOpenedDays] = useState({})
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(GET_GARDES_BY_DAY(selectedCityId))
        dispatch(GET_PHARMACIES(selectedCityId))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedCityId])

    // open/close a day card
    const toggleDayCards = (day) => {
        setOpenedDays({
            ...openedDays,
            [day]: !openedDays[day]
        })
    }


    return (
        <div>
            {
                Object.keys(gardesByDay).map(day => <div className='day' key={day}
                    onClick={() => toggleDayCards(day)}
                >
                    <b>{day}</b>
                    <Collapse isOpen={openedDays && openedDays[day]}>
                        <div className='cards-holder'>
                            {
                                gardesByDay[day].map((pharmacy, index) =>
                                    <Pharmacy pharmacy={pharmacy} key={`pharmacy-${day}-${index}`} />)
                            }
                            <PharmacyInput day={day} />
                        </div>
                    </Collapse>
                </div>)
            }
        </div>
    )
}

export default GardeByDay
