const initialState = {
    isTrackingVegetarian: false,
    isTrackingVegan: false,
    isTrackingPeanutAllergy: false,
    isTrackingFairTrade: false,
    isTrackingSustainable: false,
    isTrackingGreenHouse: false,
    chemicalList:[],
    blackList:[],
    ingredientsToAvoid:[],
    availablePreferenceId : 0,
    getAvailablePreferenceId : function () { 
        return this.availablePreferenceId++;
    },
    
    availableChemPreferenceId : 0,
    getAvailableChemPreferenceId : function () { 
        return this.availableChemPreferenceId++;
    }
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
        case 'preferences/availablePreferenceId/update': {
            
            let newState = Object.assign({}, state);
            if (newState["availablePreferenceId"] != null) {
                newState["availablePreferenceId"] = action.payload;
            }else{
                console.error("Issue with action");   
                console.error(action);
            }return newState

        }
        case 'preferences/blacklist/update': {
            
            let newState = Object.assign({}, state);
            //we want to access the blacklist and check if null
            //if not null update blacklist with new data
            if (newState["blackList"] != null) {
                newState["blackList"] = action.payload;
            }else{
                console.error("Issue with action");   
                console.error(action);
            }return newState

        }
        case 'preferences/chemicallist/update': {
            
            let newState = Object.assign({}, state);
            //we want to access the blacklist and check if null
            //if not null update blacklist with new data
            if (newState["chemicalList"] != null) {
                newState["chemicalList"] = action.payload;
            }else{
                console.error("Issue with action");   
                console.error(action);
            }return newState

        }
        case 'preferences/ingredientsToAvoid/update': {
            
            let newState = Object.assign({}, state);
            //we want to access the blacklist and check if null
            //if not null update blacklist with new data
            if (newState["ingredientsToAvoid"] != null) {
                newState["ingredientsToAvoid"] = action.payload;
            }else{
                console.error("Issue with action");   
                console.error(action);
            }return newState

        }
        

        default:
            return state
    }
}