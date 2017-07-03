import React from 'react'
import Account from '../components/Account'
import RequestAccess from '../components/RequestAccess'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { submitSignOut, watchAuthState } from '../store/auth/actions'
import { addAccessToken } from '../store/instagram/actions'

class ViewAccountContainer extends React.Component {
  componentWillMount() {
    if (!this.props.auth.authChecked) {
      this.props.watchAuthState()
    }
  }

  componentWillReceiveProps(nextProps) {
    // Trying to bypass unnecessary rerender
    // Not sure if good idea (re: more research!)
    if (nextProps.user.uid && !nextProps.instagram.accessToken
      && !nextProps.instagram.addingAccessToken) {
      this.checkForInstaToken(nextProps)
    }
  }

  checkForInstaToken(nextProps) {
    const url = window.location.href
    const query = url.split('#access_token=')
    if (query.length >= 2) {
      const token = query[1]
      nextProps.addAccessToken(nextProps.user.uid, token)
    }
  }

  render() {
    // Parent Class that takes care of this auth logic?
    // ie: class ViewAccountContainer extends AuthRequiredContainer {}
    // Or is this something the Screen should handle?
    if (!this.props.auth.authChecked || this.props.user.gettingUserData) {
      return null
    } else if (this.props.auth.authenticated) {
      if (this.props.instagram.accessToken) {
        return (
          <Account
            displayName={this.props.user.displayName}
            submitSignOut={this.props.submitSignOut}
          />
        )
      } else {
        return <RequestAccess displayName={this.props.user.displayName} />
      }
    } else {
      return <Redirect to={{pathname: '/log-in'}} />
    }
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    instagram: state.instagram,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    watchAuthState: bindActionCreators(watchAuthState, dispatch),
    submitSignOut: bindActionCreators(submitSignOut, dispatch),
    addAccessToken: bindActionCreators(addAccessToken, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewAccountContainer);
