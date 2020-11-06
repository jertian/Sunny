const initialState = {
    login : false,
    name : "New User"
}

/*
{type: account/login, payload: boolean}
{type: account/name, payload: string}

*/

export default function todosReducer(state = initialState, action) {
    switch (action.type) {
      case 'account/login': {
        return {
            ...state,
            login : action.payload
            
        }
         
      }
      case 'account/name': {
        return {
            ...state,
            name : action.payload
            
        }
      }
      default:
        return state
    }
  }