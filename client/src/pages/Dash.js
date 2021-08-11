
import moment from 'moment';
import React, { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Container, Collapse, ButtonGroup } from 'reactstrap'
import {
    Button
} from 'reactstrap';
import Pharmacy from '../components/Pharmacy';
import PharmacyInput from '../components/PharmacyInput';
import { GET_GARDES } from '../redux/actions/app.actions';
import { LOAD_CITIES } from '../redux/actions/city.actions';

function Dash() {

    const { program } = useSelector(state => state.app)
    const [cityId,setCityId] = useState(118)
    const [openedDays, setOpenedDays] = useState({})
    const dispatch = useDispatch()

    const load = () => {
        dispatch(LOAD_CITIES())
        dispatch(GET_GARDES(cityId))
    }

    useEffect(() => {
        load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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

                    {
                        monthDays.map(day => <div className='day' onClick={() => toggleDayCards(day)}>
                            <b>{day}</b>
                            <Collapse isOpen={openedDays && openedDays[day]}>
                                <div className='tools' onClick={e=>e.stopPropagation()}>
                                    <ButtonGroup size='sm'>
                                        <Button outline>add</Button>
                                        <Button outline>empty</Button>
                                    </ButtonGroup>
                                </div>
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
