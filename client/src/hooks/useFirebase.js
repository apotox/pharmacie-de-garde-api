import { useState } from 'react'
import firebaseClient from '../helpers/firebase-client'

function useFirebase() {

    const [user, setUser] = useState(null)
    const [connected, setConnected] = useState(false)

    firebaseClient.auth().onAuthStateChanged(resultUser => {
        if (resultUser) {
            setUser(resultUser)
            setConnected(true)
        } else {
            setConnected(false)
            setUser(null)
        }
    })

    return [connected, user]

}

export default useFirebase
