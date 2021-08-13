
import moment from 'moment';
import React, { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Container, Collapse } from 'reactstrap'
import {
    Button
} from 'reactstrap';
import Pharmacy from '../components/Pharmacy';
import PharmacyInput from '../components/PharmacyInput';
import SelectCity from '../components/SelectCity';
import { GET_GARDES, GET_PHARMACIES } from '../redux/actions/app.actions';
import { LOAD_CITIES } from '../redux/actions/city.actions';

function Dash() {

    const { program,selectedCityId } = useSelector(state => state.app)
    const [openedDays, setOpenedDays] = useState({})
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(LOAD_CITIES())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        dispatch(GET_GARDES(selectedCityId))
        dispatch(GET_PHARMACIES(selectedCityId))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedCityId])

    const monthDays = useMemo(() => {
        return Array(moment().daysInMonth()).fill(0).map((_, index) => {
            return moment().add(index, 'day').format('yyyy-MM-DD')
        })
    }, [])

    const toggleDayCards = (day) => {
        setOpenedDays({
            ...openedDays,
            [day]: !openedDays[day]
        })
    }


    return (
        <Container>
            <div className="dashboard">
                <div className="side-bar-left">
                    <ul>
                        <li><Button size="sm" color="success" outline>pharmacies</Button></li>
                        <li><Button size="sm" color="success" outline>Gardes</Button></li>
                    </ul>
                </div>
                <div className="list-pharmacies">

                    <SelectCity />

                    {
                        monthDays.map(day => <div className='day' onClick={() => toggleDayCards(day)}>
                            <b>{day}</b>
                            <Collapse isOpen={openedDays && openedDays[day]}>
                                {/* <div className='tools' onClick={e=>e.stopPropagation()}>
                                    <ButtonGroup size='sm'>
                                        <Button outline>add</Button>
                                        <Button outline>empty</Button>
                                    </ButtonGroup>
                                </div> */}
                                <div className='cards-holder'>
                                {
                                    program.filter(p => p.date === day).map((pharmacy, index) => <Pharmacy pharmacy={pharmacy} key={`pharmacy-${index}`} />)
                                }

                                <PharmacyInput />
                                </div>

                            </Collapse>


                        </div>)
                    }

                </div>
            </div>
        </Container>
    )
}

export default Dash
