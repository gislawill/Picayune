import React from 'react'
import { Switch, Route } from 'react-router-dom'
import LandingPageScreen from './screens/LandingPageScreen'
import SignUpScreen from './screens/SignUpScreen'
import LogInScreen from './screens/LogInScreen'
import ViewAccountScreen from './screens/ViewAccountScreen'
import EditAccountScreen from './screens/EditAccountScreen'
import InstagramDataScreen from './screens/InstagramDataScreen'

export default class Router extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={LandingPageScreen} />
        <Route path="/log-in" component={LogInScreen} />
        <Route path="/sign-up" component={SignUpScreen} />
        <Route path="/view-account" component={ViewAccountScreen} />
        <Route path="/edit-account" component={EditAccountScreen} />
        <Route path="/instagram-data" component={InstagramDataScreen} />
        </Switch>
    )
  }
}
