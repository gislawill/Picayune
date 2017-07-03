import React from 'react'
import InstagramLikes from '../components/InstagramLikes'
import RequestAccess from '../components/RequestAccess'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getLikes } from '../store/instagram/actions'
import { watchAuthState } from '../store/auth/actions'
import { addAccessToken } from '../store/instagram/actions'

class InstagramDataContainer extends React.Component {
  componentWillMount() {
    if (!this.props.auth.authChecked) {
      this.props.watchAuthState()
    }
    if (this.props.instagram.accessToken) {

    }
  }

  render() {
    if (!this.props.auth.authChecked || this.props.user.gettingUserData) {
      return null
    } else if (this.props.auth.authenticated) {
      if (this.props.instagram.accessToken) {
        return (
          <InstagramLikes
            getLikes={this.props.getLikes}
            likeCount={this.props.instagram.likeCount}
            accessToken={this.props.instagram.accessToken}
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
    getLikes: bindActionCreators(getLikes, dispatch),
    watchAuthState: bindActionCreators(watchAuthState, dispatch),
    addAccessToken: bindActionCreators(addAccessToken, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InstagramDataContainer);
