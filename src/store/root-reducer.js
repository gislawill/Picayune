import { combineReducers } from 'redux'
import auth from './auth/reducer'
import instagram from './instagram/reducer'
import user from './user/reducer'

const rootReducer = combineReducers({
  auth,
  instagram,
  user
})

export default rootReducer
