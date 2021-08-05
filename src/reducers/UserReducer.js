
const initialState = {
    user:'',
 }

export default (state = initialState, action = {}) => {
    switch(action.type){
        case 'setUser':
            return {...state, user:action.payload.user};
            break;
        default:
                return state;
    }
    return state;
}