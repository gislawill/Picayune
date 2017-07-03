import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import LogInForm from '../components/LogInForm'
import { submitLogIn, watchAuthState } from '../store/auth/actions'

class LogInContainer extends React.Component {
  componentWillMount() {
    if (!this.props.auth.checkingAuth) {
      this.props.watchAuthState()
    }
  }

  render() {
    return (
      <div>
        <Link to="/">Back Home</Link><br /><br /><br />
        Log In Form<br /><br />
        {this.props.auth.authenticated && !this.props.auth.checkingAuth
          ? <Link to="/view-account">View Account</Link>
          : <LogInForm formData={this.props.authFormData}
              submitForm={this.props.submitLogIn} />
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
    submitLogIn: bindActionCreators(submitLogIn, dispatch),
    watchAuthState: bindActionCreators(watchAuthState, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogInContainer);
