import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import Router from './Router'
import configureStore from './store/configure-store'

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)

if (process.env.NODE_ENV === 'development' && module.hot) {
	module.hot.accept('./store/root-reducer', () => {
		store.replaceReducer(require('./store/root-reducer').default)
	})
}
