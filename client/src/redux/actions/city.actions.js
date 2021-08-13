import { SET_CITIES } from './app.actions'

/**
 * load cities
 * @returns void
 */
export const LOAD_CITIES=()=>{
    return (dispatch,getState)=>{
        if(getState().app.cities.length) return
        import('../../data/cities.json').then(data=>{
            dispatch(SET_CITIES(data.default))
        })
    }
}