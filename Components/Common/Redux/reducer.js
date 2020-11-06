
 
import { combineReducers } from 'redux'

import accountReducer from './accountSlice'
import preferenceReducer from './preferenceSlice'

const rootReducer = combineReducers({
  // Define a top-level state field named `todos`, handled by `todosReducer`
  account: accountReducer,
  preferences: preferenceReducer
})

export default rootReducer