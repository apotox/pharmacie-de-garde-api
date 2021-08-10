const initialState = {
    title: "pharmacie de garde",
    version: process.env.REACT_APP_GITHUB_SHA || 'local',
    program: []
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, { type, payload }) {
    switch (type) {

        case "SET_APP":
            return { ...state, ...payload }

        case 'SET_PROGRAM':
            return {
                ...state,
                program: payload,
            }

        default:
            return state
    }
}
