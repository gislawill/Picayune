import React from 'react'

export default class InstagramLikes extends React.Component {
  constructor(props) {
    super(props)
    this.props.getLikes(this.props.accessToken)
  }

  render() {
    return (
      <div>
        Number of items you've liked: {this.props.likeCount}
      </div>
    )
  }
}
