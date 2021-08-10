

export const SHOW_NOTIFICATION_TIMEOUT = (payload,timeInMs = 3000) => {
    return dispatch => {
        dispatch(SHOW_NOTIFICATION(payload))
        setTimeout(() => dispatch(HIDE_NOTIFICATION()), timeInMs)
    }
}


export const SHOW_NOTIFICATION = payload => ({
    type: 'SHOW_NOTIFICATION',
    payload
})


export const HIDE_NOTIFICATION = payload => ({
    type: 'HIDE_NOTIFICATION',
    payload
})