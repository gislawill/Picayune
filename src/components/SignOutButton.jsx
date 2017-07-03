import React from 'react'

export default class SignOutButton extends React.Component {
  constructor(props) {
    super(props)
    this.handleLogOut = this.handleLogOut.bind(this)
  }

  handleLogOut() {
    this.props.submitSignOut()
  }

  render() {
    return (
      <button onClick={this.handleLogOut}>Sign Out</button>
    )
  }
}
