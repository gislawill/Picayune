import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import SignUpForm from '../components/SignUpForm'
import { submitSignUp, watchAuthState } from '../store/auth/actions'

class SignUpContainer extends React.Component {
  componentWillMount() {
    if (!this.props.auth.checkingAuth) {
      this.props.watchAuthState()
    }
  }

  render() {
    return (
      <div>
        <Link to="/">Back Home</Link><br /><br /><br />
        Sign Up Form<br /><br />
        {this.props.auth.authenticated && !this.props.auth.checkingAuth
          ? <Link to="/view-account">View Account</Link>
          : <SignUpForm
              formData={this.props.authFormData}
              submitForm={this.props.submitSignUp}
            />
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
    submitSignUp: bindActionCreators(submitSignUp, dispatch),
    watchAuthState: bindActionCreators(watchAuthState, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpContainer);
