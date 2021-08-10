import axios from "axios";
import firebaseClient from "./firebase-client";

const baseURL = process.env.REACT_APP_BASE_URL || 'https://frozen-earth-99544.herokuapp.com/api/'

export const ApiClient=async ()=>{
    const token = await firebaseClient.auth().currentUser.getIdToken()
    return axios.create({
        baseURL,
        headers: {
            'x-client': `web-${process.env.REACT_APP_VERSION || "1.0.0"}`,
            authorization: `Bearer ${token}`
        }
    })
}