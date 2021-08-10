import React from 'react'
import Login from '../components/Login'
import useFirebase from '../hooks/useFirebase'

function WithAuth({Cmp,target="",_props={}}) {

    const [connected,user] = useFirebase()

    if(connected){
        return <Cmp {..._props} user={user} />
    }

    return <Login />
}

export default WithAuth
