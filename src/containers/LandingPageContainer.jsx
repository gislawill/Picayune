import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { watchAuthState } from '../store/auth/actions'


class LandingPageContainer extends React.Component {
  componentWillMount() {
    if (!this.props.auth.authChecked) {
      this.props.watchAuthState()
    }
  }

  render() {
    const NextStepPrompt = (props) => {
      return props.authStatus.authenticated && !props.authStatus.checkingAuth
        ? <Link to="/view-account">View Account</Link>
        : <span><Link to="/log-in">Log In</Link> / <Link to="/sign-up">Sign Up</Link></span>
    }

    return (
      <div>
        Welcome to Picayune!<br />
        {this.props.auth.authChecked
          ? <NextStepPrompt authStatus={this.props.auth} />
          : null
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    watchAuthState: bindActionCreators(watchAuthState, dispatch)
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(LandingPageContainer)
