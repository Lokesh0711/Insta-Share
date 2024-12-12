import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', showErrorMsg: false, errorMsg: ''}

  onLoginClicked = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}

    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      this.onSucessfullLogin(data.jwt_token)
    } else {
      this.setState({showErrorMsg: true, errorMsg: data.error_msg})
    }
  }

  onSucessfullLogin = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onUserNameInput = event => {
    this.setState({username: event.target.value})
  }

  onPassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {showErrorMsg, errorMsg} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-bg-conatiner">
        <img
          className="login-image"
          src="https://res.cloudinary.com/dicenbnxz/image/upload/v1732199614/insta-share/illustartion.jpg"
          alt="website login"
        />
        <div className="login-card">
          <img
            className="login-logo"
            src="https://res.cloudinary.com/dicenbnxz/image/upload/v1732199748/insta-share/logo.png"
            alt="website logo"
          />
          <h1 className="login-heading">Insta Share</h1>
          <form className="form-conatiner" onSubmit={this.onLoginClicked}>
            <div className="login-input-conatiner">
              <label htmlFor="input-name" className="label">
                USERNAME
              </label>
              <input
                type="text"
                id="input-name"
                className="login-input-field"
                onChange={this.onUserNameInput}
              />
            </div>
            <div className="login-input-conatiner">
              <label htmlFor="input-password" className="label">
                PASSWORD
              </label>
              <input
                type="password"
                id="input-password"
                className="login-input-field"
                onChange={this.onPassword}
              />
            </div>
            {showErrorMsg && <p className="login-error-mesg">*{errorMsg}</p>}
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
