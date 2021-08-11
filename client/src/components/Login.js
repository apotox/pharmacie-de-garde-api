import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Button, FormGroup, Label, Input, Container } from 'reactstrap';
import { DO_LOGIN } from '../redux/actions/app.actions';

function Login() {  

    const dispatch = useDispatch()

    const [email,setEmail] = useState(process.env.REACT_APP_EMAIL || "")
    const [password,setPassword] = useState(process.env.REACT_APP_PASSWORD || "")

    const login=()=>{
        dispatch(DO_LOGIN({email,password}))
    }
    return (
        <Container>
            <div className="form">
                <FormGroup>
                    <Label for="exampleEmail">Email</Label>
                    <Input onChange={e=>setEmail(e.target.value)} value={email} type="email" name="email" id="exampleEmail" placeholder="aaa@aaa.aaa" />
                </FormGroup>
                <FormGroup>
                    <Label for="examplePassword">Password</Label>
                    <Input onChange={e=>setPassword(e.target.value)} value={password} type="password" name="password" id="examplePassword" placeholder="password placeholder" />
                </FormGroup>

                <Button color="primary" size="sm" onClick={login}>Connect</Button>
            </div>
        </Container>
    )
}

export default Login
