import React from 'react'
import { Link } from 'react-router-dom'

export default class SignUpForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      displayName: {
        value: ''
      },
      userName: {
        value: ''
      },
      passWord: {
        value: ''
      }
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    const target = event.target
    const value = target.value
    const name = target.name
    this.setState({
      [name]: {
        value: value
      }
    })
  }

  handleSubmit(event) {
    const formData = {
      displayName: this.state.displayName.value,
      userName: this.state.userName.value,
      passWord: this.state.passWord.value
    }
    this.props.submitForm(formData)
    event.preventDefault()
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Your Name:
            <input
              type="text"
              name="displayName"
              value={this.state.displayName.value}
              onChange={this.handleChange}
            />
          </label><br />
          <label>
            Email Address:
            <input
              type="email"
              name="userName"
              value={this.state.userName.value}
              onChange={this.handleChange}
            />
          </label><br />
          <label>
            Password:
            <input
              type="password"
              name="passWord"
              value={this.state.passWord.value}
              onChange={this.handleChange}
            />
          </label><br /><br />
          <input type="submit" value="Submit" /><br />
          <Link to="/log-in">Already have a Picayune Account?</Link>
        </form>
      </div>
    )
  }
}
