import React from 'react'
import {
    Card,CardBody,
    CardTitle, CardSubtitle
} from 'reactstrap';
import {FaTrash} from 'react-icons/fa'
import { useDispatch } from 'react-redux';
import { DELETE_GARDES_BY_INDEX } from '../redux/actions/app.actions';

function Pharmacy({day,pharmacy,index}) {

    const dispatch = useDispatch()

    const deleteGarde=()=>{
        dispatch(DELETE_GARDES_BY_INDEX(day,index))
    }
    return (
        <Card onClick={e=> e.stopPropagation()} >
            <CardBody>
                <CardTitle tag="h5">{pharmacy.name}</CardTitle>
                <CardSubtitle tag="h6" className="mb-2 text-muted">{`${pharmacy.hourFrom} - ${pharmacy.hourTo}`}</CardSubtitle>

                <div className='svg-container' onClick={deleteGarde}>
                    <FaTrash />
                </div>
            </CardBody>
        </Card>
    )
}

export default Pharmacy
