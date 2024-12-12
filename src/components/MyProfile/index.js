import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import ProfileGenerater from '../ProfileGenerater'

import './index.css'

class MyProfile extends Component {
  state = {
    profileDetails: undefined,
    isProfileLoading: false,
    dataFetchUncessful: false,
  }

  componentDidMount() {
    this.getMyProfileDetails()
  }

  getMyProfileDetails = async () => {
    this.setState({isProfileLoading: true})
    const token = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/insta-share/my-profile'
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    this.setState({isProfileLoading: false})
    if (response.ok) {
      this.profileDataFetched(data.profile)
    } else {
      this.setState({dataFetchUncessful: true})
    }
  }

  profileDataFetched = profileDetails => {
    this.setState({profileDetails})
    console.log(profileDetails)
  }

  renderLoader = () => (
    <div>
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  renderProfileUnsucess = () => (
    <div>
      <img
        className="went-wrong-image"
        src="https://res.cloudinary.com/dicenbnxz/image/upload/v1732647399/insta-share/ogtjy0fxjqaek4g6magq.png"
        alt="something went wrong"
      />
      <p className="went-wrong-text">Something went wrong. Please try again</p>
      <button type="button" className="try-again-button">
        Try again
      </button>
    </div>
  )

  render() {
    const {isProfileLoading, dataFetchUncessful, profileDetails} = this.state
    const profileDetailsAvailable = profileDetails !== undefined
    return (
      <>
        <Header />
        {isProfileLoading && (
          <div className="loader-container" testid="loader">
            {this.renderLoader()}
          </div>
        )}
        {dataFetchUncessful && (
          <div className="loader-container">{this.renderProfileUnsucess()}</div>
        )}
        {profileDetailsAvailable && <ProfileGenerater />}
      </>
    )
  }
}
export default MyProfile
