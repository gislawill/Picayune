import React from 'react'

export default class RequestAccess extends React.Component {
  constructor(props) {
    super(props)
    this.accessRedirect = this.accessRedirect.bind(this)
  }

  accessRedirect() {
    const url = window.location.href
    const clientID = '5f95d7d3c0fd4563928cab164cceb1ce'
    let instagramAccessURL = 'https://api.instagram.com/oauth/authorize/?client_id='
    instagramAccessURL += clientID + '&redirect_uri=' + url + '&response_type=token&scope=basic+public_content+likes+relationships'
    window.location = instagramAccessURL
  }

  render() {
    return (
      <div>
        <p>Hi {this.props.displayName}!</p>
        <p>Currently, Picayune cannot access to your Instagram</p>
        <p>So, like, what's the point?</p>
        <button onClick={this.accessRedirect}>Give Access</button>
      </div>
    )
  }
}
