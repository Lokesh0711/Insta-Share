import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import PostsGenerater from '../PostsGenerater'
import './index.css'

class SearchRoute extends Component {
  state = {postsDetails: null, postsLength: null, isLoading: false}

  componentDidMount() {
    this.getPostsDetails()
  }

  getPostsDetails = async () => {
    this.setState({isLoading: true})
    const token = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {searchInput} = params

    const url = `https://apis.ccbp.in/insta-share/posts?search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    this.setState({isLoading: false})
    if (response.ok) {
      this.setState({postsDetails: data.posts, postsLength: data.posts.length})
    }
  }

  render() {
    const {postsDetails, postsLength, isLoading} = this.state
    const postsAvailable = postsDetails !== null
    const isGeaterThanZero = postsLength > 0 && postsAvailable

    return (
      <>
        <Header />
        <div className="search-route-conatiner">
          <h1>Search Results</h1>
          {isLoading && (
            <div className="loader-container" testid="loader">
              <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
            </div>
          )}
          {postsAvailable &&
            postsDetails.map(eachPost => (
              <PostsGenerater key={eachPost.post_id} postsDetails={eachPost} />
            ))}
          {!isGeaterThanZero && (
            <div className="no-search-conatiner">
              <img
                className="search-desk-view"
                src="https://res.cloudinary.com/dicenbnxz/image/upload/v1734040408/search-not-found-desk-view.png"
                alt="failure view"
              />
              <h1 className="no-search-text">Search Not Found</h1>
              <p className="no-search-desc">
                Try different keyword or search again
              </p>
            </div>
          )}
        </div>
      </>
    )
  }
}

export default SearchRoute
