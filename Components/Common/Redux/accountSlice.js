const initialState = {
    login : false,
    fName : "Guest",
    email : "",
    lName : "",
    photoURL : ""

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
      case 'account/fName': {
        return {
            ...state,
            fName : action.payload
            
        }
      }
      case 'account/lName': {
        return {
            ...state,
            lName : action.payload
            
        }
      }
      case 'account/photoURL': {
        return {
            ...state,
            photoURL : action.payload
            
        }
      }
      default:
        return state
    }
  }