
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Container } from 'reactstrap'
import {
    Button
} from 'reactstrap';
import LazyGardeByDay from '../components/LazyGardeByDay';
import LazySelectCity from '../components/LazySelectCity';
import { UPDATE_GARDES_BY_DAY } from '../redux/actions/app.actions';
import Footer from '../components/Footer'
function Dash() {

    const { selectedCityId } = useSelector(state => state.app)
    const dispatch = useDispatch()

    const save = () => {
        dispatch(UPDATE_GARDES_BY_DAY(selectedCityId))
    }


    return (
        <Container>
            <div className="dashboard">
                <div className="side-bar-left">
                    <ul>
                        <li><Button size="sm" onClick={save} color="success" outline>Save</Button></li>
                    </ul>
                </div>
                <div className="list-pharmacies">
                    <LazySelectCity />

                    <LazyGardeByDay />

                    <Footer />
                </div>


            </div>
        </Container>
    )
}

export default Dash
