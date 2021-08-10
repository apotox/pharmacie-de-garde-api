import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { Container } from 'reactstrap'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';
import { GET_GARDES } from '../redux/actions/app.actions';

function Dash() {



    const dispatch = useDispatch()

    const load = () => {
        dispatch(GET_GARDES())
    }

    useEffect(() => {
        load()
    }, [])


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
                    <Card>
                        <CardBody>
                            <CardText>2021/08/19</CardText>
                            <CardTitle tag="h5">Bitam</CardTitle>
                            <CardSubtitle tag="h6" className="mb-2 text-muted">07:00 - 19:00</CardSubtitle>

                            <Button>Delete</Button> <Button>GPS</Button>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </Container>
    )
}

export default Dash
