const initialState = {
    login : false,
    name : "Guest",
    email : ""
}

/*
{type: "account/login", payload: boolean}
{type: "account/name", payload: "string"}
{type: "account/email", payload: "string"}

*/

export default function accountSlice(state = initialState, action) {
    switch (action.type) {
      case 'account/login': {
        return {
            ...state,
            login : action.payload
            
        }
         
      }
      case 'account/email': {
        return {
            ...state,
            email : action.payload
            
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