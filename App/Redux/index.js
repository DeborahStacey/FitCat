import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import rootSaga from '../Sagas/'

export default () => {
  const rootReducer = combineReducers({
    blank: function (state, action) { if (state == null) state = []; return state }
  })

  return configureStore(rootReducer, rootSaga)
}
