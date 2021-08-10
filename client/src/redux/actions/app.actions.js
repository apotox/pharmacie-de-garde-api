import { ApiClient } from "../../helpers/axios-client"
import firebaseClient from "../../helpers/firebase-client"
import { SHOW_NOTIFICATION_TIMEOUT } from "./notification.actions"

export const SET_APP=(payload)=>({
    type: "SET_APP",
    payload
})

export const DO_LOGIN=({email,password})=>{

    return (dispatch)=>{

        firebaseClient.auth().signInWithEmailAndPassword(email,password)
        .then(result=>{



        })
        .catch(err=>{
            
        })


    }
}


export const GET_GARDES=(payload)=>{

    return dispatch=>{
        ApiClient().then(async client=>{

            const result = await client.get(`/118/pharmacies`)
            console.trace(result)

        })
        .catch(FAILED(dispatch))
    }
}


export const SUCCESS=(dispatch)=>(message)=>{
    dispatch(SHOW_NOTIFICATION_TIMEOUT({
        message,
        color: 'success'
    }))
}

export const FAILED=(dispatch)=>(error)=>{
    let message = "something is wrong!"
    if(typeof error === 'string'){
        message = error
    }else if(error instanceof Error){
        message = error.message
    }
    dispatch(SHOW_NOTIFICATION_TIMEOUT({
        message,
        color: 'danger'
    }))
}