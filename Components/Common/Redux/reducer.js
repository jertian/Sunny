
 
import { combineReducers } from 'redux'

import accountReducer from './accountSlice'
import preferenceReducer from './preferencesSlice'

const rootReducer = combineReducers({
  // Define a top-level state field named `todos`, handled by `todosReducer`
  account: accountReducer,
  preference: preferenceReducer
})

export default rootReducer