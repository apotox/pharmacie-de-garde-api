const initialState = {
    isVisible: false,
    message: "",
    color: null
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, { type, payload }) {
    switch (type) {

        case "SHOW_NOTIFICATION":
            return { ...state, isVisible: true, ...payload }

        case "HIDE_NOTIFICATION":
            return { ...state, isVisible: false, message: "", color: null }

        default:
            return state
    }
}
