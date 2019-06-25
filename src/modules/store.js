import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk'
import imagesReducer from './imagesReducer.js'

const rootReducer = combineReducers({
  imagesData: imagesReducer
})

export default createStore(rootReducer, applyMiddleware(thunk))
