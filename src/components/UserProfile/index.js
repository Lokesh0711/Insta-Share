import {Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import ProfileGenerater from '../ProfileGenerater'
import './index.css'

class UserProfile extends Component {
  state = {profileDetails: null}

  componentDidMount() {
    this.getUserDetails()
  }

  getUserDetails = async () => {
    const token = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/insta-share/users/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.setState({profileDetails: data.user_details})
    }
  }

  render() {
    const {profileDetails} = this.state
    const profileDetailsAvailable = profileDetails !== null
    return (
      <>
        <Header />
        {profileDetailsAvailable && (
          <ProfileGenerater profileDetails={profileDetails} />
        )}
      </>
    )
  }
}

export default UserProfile
