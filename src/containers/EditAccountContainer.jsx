import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { watchAuthState } from '../store/auth/actions'
import { updateAccountSettings } from '../store/user/actions'
import EditAccountForm from '../components/EditAccountForm'

class EditAccountContainer extends React.Component {
  componentWillMount() {
    if (!this.props.auth.authChecked) {
      this.props.watchAuthState()
    }
  }

  render() {
    if (!this.props.auth.authChecked) {
      return null
    } else if (this.props.auth.authenticated) {
      return (
        <EditAccountForm
          displayName={this.props.user.displayName}
          uid={this.props.user.uid}
          submitForm={this.props.updateAccountSettings}
        />
      )
    } else {
      return (
        <Redirect to={{pathname: '/log-in'}} />
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    watchAuthState: bindActionCreators(watchAuthState, dispatch),
    updateAccountSettings: bindActionCreators(updateAccountSettings, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditAccountContainer);
