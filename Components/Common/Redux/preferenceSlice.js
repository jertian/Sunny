const initialState = {
    isTrackingVegetarian: false,
    isTrackingVegan: false,
    isTrackingPeanutAllergy: false,

}

/*
{type: preference/update, preference: string, payload: boolean}

*/

export default function todosReducer(state = initialState, action) {
    switch (action.type) {
        case 'preferences/update': {
            
            let newState = Object.assign({}, state);
            if (newState["isTracking" + action.preference] != null) {
                newState["isTracking" + action.preference] = action.payload;
            }else{
                console.error("Issue with action");   
                console.error(action);
            }return newState

        }

        default:
            return state
    }
}