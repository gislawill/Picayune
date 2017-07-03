import React from 'react'

export default class LogInForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      displayName: {
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
    event.preventDefault()
    const formData = {
      displayName: this.state.displayName.value
    }
    formData.uid = this.props.uid
    this.props.submitForm(formData)

  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Display Name:
          <input
            type="text"
            name="displayName"
            value={this.state.displayName.value}
            onChange={this.handleChange} />
        </label><br />
        <input type="submit" value="Submit" />
      </form>
    )
  }
}
