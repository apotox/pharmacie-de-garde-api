import { SET_CITIES } from './app.actions'


export const LOAD_CITIES=()=>{

    return (dispatch,getState)=>{

        if(getState().app.cities.length) {
            console.log('load from memory')
            return}

            console.log('load from file')

        import('../../data/cities.json').then(data=>{
            dispatch(SET_CITIES(data))
        })

    }
}