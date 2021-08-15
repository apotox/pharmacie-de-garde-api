
import moment from "moment"
import { ApiClient } from "../../helpers/axios-client"
import firebaseClient from "../../helpers/firebase-client"
import { SHOW_NOTIFICATION_TIMEOUT } from "./notification.actions"

export const SET_APP = (payload) => ({
    type: "SET_APP",
    payload
})

export const SET_SELECTED_CITYID = payload => ({
    type: 'SET_SELECTED_CITYID',
    payload
})

export const SET_PROGRAM = payload => ({
    type: 'SET_PROGRAM',
    payload,
})

export const SET_GARDES_BY_DAY = payload => ({
    type: 'SET_GARDES_BY_DAY',
    payload
})

export const SET_PHARMACIES = payload => ({
    type: 'SET_PHARMACIES',
    payload,
})

export const SET_CITIES = payload => ({
    type: 'SET_CITIES',
    payload,
})

export const DO_LOGIN = ({ email, password }) => {
    return (dispatch) => {
        firebaseClient.auth().signInWithEmailAndPassword(email, password)
            .then(_ => {
                SUCCESS(dispatch)(`welcome again!`)
            })
            .catch(FAILED(dispatch))
    }
}


export const GET_GARDES = (cityId) => {

    return dispatch => {
        ApiClient().then(async client => {
            const result = await client.get(`/gardes/${cityId}`)
            const days = result.data
            let pharmaciesGardes = []
            days.forEach((day, index) => {
                console.log(day)
                pharmaciesGardes = [
                    ...pharmaciesGardes,
                    ...day
                ]
            });
            dispatch(SET_PROGRAM(pharmaciesGardes))
        })
            .catch(FAILED(dispatch))
    }
}

export const GET_PHARMACIES = (cityId) => {

    return dispatch => {
        ApiClient().then(async client => {
            const result = await client.get(`/pharmacies/${cityId}`)
            dispatch(SET_PHARMACIES(result.data))
        })
            .catch(FAILED(dispatch))
    }
}


export const SUCCESS = (dispatch) => (message) => {
    dispatch(SHOW_NOTIFICATION_TIMEOUT({
        message,
        color: 'success'
    }))
}

export const FAILED = (dispatch) => (error) => {
    if (process.env.NODE_ENV === 'development') {
        console.warn('FAILED:', error);
    }
    let message = "something is wrong!"
    if (typeof error === 'string') {
        message = error
    } else if (error instanceof Error) {
        message = error.message
    }
    dispatch(SHOW_NOTIFICATION_TIMEOUT({
        message,
        color: 'danger'
    }))
}

export const ADD_GARDES_BY_DAY= (day,payload) => {

    return (dispatch,getState)=>{
        let currentData = getState().app.gardesByDay;
        currentData[day] = [...currentData[day],payload]
        dispatch(SET_GARDES_BY_DAY(currentData))
    }

}

export const DELETE_GARDES_BY_INDEX= (day,index) => {

    return (dispatch,getState)=>{
        let currentData = getState().app.gardesByDay;
        currentData[day] = currentData[day].filter((_,i)=>i!==index)
        dispatch(SET_GARDES_BY_DAY(currentData))
    }

}

// update remote database
export const UPDATE_GARDES_BY_DAY= (cityId) => {


    return async (dispatch,getState)=>{

        
        try {
            const client = await ApiClient()

            const {gardesByDay} = getState().app


            const array = Object.keys(gardesByDay).map(day=> gardesByDay[day])


            const result = await client.put(`/gardes/${cityId}`,{
                weekGarde: array
            })
            
            console.log(result)

            dispatch(SHOW_NOTIFICATION_TIMEOUT({
                message: result.data.success ? 'ok':'failed',
                color: 'success'
            }))

        }catch(error){
            dispatch(SHOW_NOTIFICATION_TIMEOUT({
                message: error.message,
                color: 'danger'
            }))
        }

    }

}

export const GET_GARDES_BY_DAY = (cityId) => {


    return async (dispatch) => {

        const monthdays = Array(moment().daysInMonth()).fill(0).map((_, index) => {
            return moment().add(index, 'day').format('yyyy-MM-DD')
        })
        
        let gardesByDay = {}

        try {
            const client = await ApiClient()

            const result = await client.get(`/gardes/${cityId}`)
            const days = result.data
            let pharmaciesGardes = []
            days.forEach((day) => {
                
                pharmaciesGardes = [
                    ...pharmaciesGardes,
                    ...day
                ]
            });

            gardesByDay = monthdays.reduce((obj, day) => {
                const gardes = pharmaciesGardes || []
                obj[day] = (gardes.filter(p => p.date === day) || [])
                return obj
            }, {})
    
        }catch(error){
            console.warn(error.message)

            dispatch(SHOW_NOTIFICATION_TIMEOUT({
                message: error.message,
                color: 'danger'
            }))
        }

        console.log('gardesByDay',gardesByDay)

        
        dispatch(SET_GARDES_BY_DAY(gardesByDay))

    }
}