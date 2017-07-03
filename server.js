import Express from 'express'
import React from 'react'
import { Provider } from 'react-redux'
import { StaticRouter, redirect } from 'react-router'
import configureStore from './src/store/configure-store'
import Router from './src/Router'
import { renderToString } from 'react-dom/server'

import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import config from './config/webpack.config.dev.js';


const app = Express()
const port = 3000

app.use('/static', Express.static('./build/static'))

app.use(handleRender)

if (app.get('env') === 'development') {
    const compiler = webpack(config);
    app.use(webpackMiddleware(compiler, { publicPath: "/javascripts/", noInfo: true }));
}

function handleRender(req, res) {
  // Create a new Redux store instance
  // Will need Firebase Admin SDK for server-side auth with UID's
  // These might help
  // https://stackoverflow.com/questions/44840196/how-do-i-implement-long-term-single-sign-on-with-firebase-and-a-custom-server
  // https://firebase.google.com/docs/auth/admin/verify-id-tokens#verify_id_tokens_using_the_firebase_admin_sdk
  const store = configureStore()
  const preloadedState = store.getState()
  const context = {}
  const html = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={{}}>
        <Router />
      </StaticRouter>
    </Provider>
  )

  if (context.url) {
    // Somewhere a `<Redirect>` was rendered
    redirect(301, context.url)
  } else {
    // we're good, send the response
    res.send(renderFullPage(html, preloadedState))
  }
}

function renderFullPage(html, preloadedState) {
  return `
  <!doctype html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      <meta name="theme-color" content="#000000">
      <!-- Need to customize these values -->
      <link rel="manifest" href="%PUBLIC_URL%/manifest.json">
      <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
      <title>Picayune</title>
    </head>
    <body>
      <noscript>
        You need to enable JavaScript to run this app.
      </noscript>
      <div id="root">${html}</div>
      <script>
        window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
      </script>
      <script src='/static/js/bundle.js'></script>
    </body>
  </html>
  `
}

app.listen(port)
console.log('Server running on: ' + port)
