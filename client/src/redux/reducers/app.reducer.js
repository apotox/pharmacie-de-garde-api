const initialState = {
    title: "pharmacie de garde",
    version: process.env.REACT_APP_GITHUB_SHA || 'local'
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, { type, payload }) {
    switch (type) {

        case "SET_APP":
            return { ...state, ...payload }

        default:
            return state
    }
}
