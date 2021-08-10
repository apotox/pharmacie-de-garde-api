import moment from 'moment';
import React, { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Container } from 'reactstrap'
import {Button
} from 'reactstrap';
import Pharmacy from '../components/Pharmacy';
import { GET_GARDES } from '../redux/actions/app.actions';

function Dash() {

    const { program } = useSelector(state => state.app)
    const dispatch = useDispatch()

    const load = () => {
        dispatch(GET_GARDES())
    }

    useEffect(() => {
        load()
    }, [])

    const monthDays = useMemo(()=>{
        return Array(moment().daysInMonth()).fill(0).map((_,index)=>{
            
            return moment().startOf('month').add(index,'day').format('yyyy/MM/DD')
        })
        

    },[])

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
                        monthDays.map(day=> <div className='day'>

                        </div>)
                    }
                    {/* {
                        program.map((pharmacy, index) => <Pharmacy pharmacy={pharmacy} key={`pharmacy-${index}`}/>)
                    } */}
                </div>
            </div>
        </Container>
    )
}

export default Dash
