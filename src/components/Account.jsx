import React from 'react'
import { Link } from 'react-router-dom'
import SignOutButton from './SignOutButton'

export default class Account extends React.Component {
  render() {
    const displayName = this.props.displayName ? this.props.displayName + '\'s' : 'Your'
    return (
      <div>
        <p>{displayName} Account</p>
        <p><Link to="/instagram-data">View Likes</Link></p>
        <p><Link to="/edit-account">Edit Account</Link></p>
        <SignOutButton submitSignOut={this.props.submitSignOut} />
      </div>
    )
  }
}
