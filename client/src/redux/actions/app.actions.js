
import { ApiClient } from "../../helpers/axios-client"
import firebaseClient from "../../helpers/firebase-client"
import { SHOW_NOTIFICATION_TIMEOUT } from "./notification.actions"

export const SET_APP=(payload)=>({
    type: "SET_APP",
    payload
})

export const SET_PROGRAM=payload=>({
    type: 'SET_PROGRAM',
    payload,
})

export const SET_PHARMACIES=payload=>({
    type: 'SET_PHARMACIES',
    payload,
})

export const DO_LOGIN=({email,password})=>{
    return (dispatch)=>{
        firebaseClient.auth().signInWithEmailAndPassword(email,password)
        .then(_=>{
            SUCCESS(dispatch)(`welcome again!`)
        })
        .catch(FAILED(dispatch))
    }
}


export const GET_GARDES=(cityId)=>{

    return dispatch=>{
        ApiClient().then(async client=>{
            const result = await client.get(`/${cityId}/pharmacies`)
            const days = result.data
            let pharmaciesGardes = []
            days.forEach((day,index) => {
                console.log(day)
                pharmaciesGardes = [
                    ...pharmaciesGardes,
                    ...day
                ]
            } );
            dispatch(SET_PROGRAM(pharmaciesGardes))
        })
        .catch(FAILED(dispatch))
    }
}

export const GET_PHARMACIES=(payload)=>{

    return dispatch=>{
        ApiClient().then(async client=>{
            const result = await client.get(`/pharmacies`)
            dispatch(SET_PHARMACIES(result.data))
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
    if(process.env.NODE_ENV === 'development'){
        console.warn('FAILED:', error);
    }
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