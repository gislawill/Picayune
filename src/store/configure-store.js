import { applyMiddleware, createStore } from 'redux'
import { createLogger } from 'redux-logger'
import rootReducer from './root-reducer'
import reduxThunk from 'redux-thunk'

const logger = createLogger()

let initalState

if (typeof window !== 'undefined') {
  initalState = window.__PRELOADED_STATE__
  delete window.__PRELOADED_STATE__
} else {
  initalState = { }
}

export default function configureStore() {
  // const store = createStore(rootReducer, initalState, applyMiddleware(reduxThunk))
  const store = createStore(rootReducer, initalState, applyMiddleware(logger, reduxThunk))

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept(rootReducer, () => {
      const nextRootReducer = rootReducer
      store.replaceReducer(nextRootReducer)
    })
  }
  return store
}
