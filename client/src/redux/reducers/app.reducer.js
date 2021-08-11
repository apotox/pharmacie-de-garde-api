const initialState = {
    title: "pharmacie de garde",
    version: process.env.REACT_APP_GITHUB_SHA || 'local',
    program: [],
    pharmacies: [],
    cities: []
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
        case 'SET_PHARMACIES':
            return {
                ...state,
                pharmacies: payload || [],
            }
        
            case 'SET_CITIES':
                return {
                    ...state,
                    cities: payload || [],
                }

        default:
            return state
    }
}
