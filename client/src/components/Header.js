
import React from 'react'
import { Button } from 'reactstrap'
import firebaseClient from '../helpers/firebase-client'
import useFirebase from '../hooks/useFirebase'
function Header() {
  const [connected,user] = useFirebase()

  const out=()=>{
    firebaseClient.auth().signOut()
  }
    return (
        <header className="App-header">
       
        <p>
          <code>Pharmacie de</code> Garde.
        </p>

        {connected && user && <div className="connected-div">
          <span>you are connected as {user.email}</span><Button size="sm" outline onClick={out}>out</Button>
        </div>}
       
      </header>
    )
}

export default Header
