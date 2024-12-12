import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import StoriesGenerater from '../StoriesGenerater'
import PostsGenerater from '../PostsGenerater'

import './index.css'

class Home extends Component {
  state = {
    storiesData: undefined,
    postsData: undefined,
    storiesDataFetchFailed: false,
    postsDataFetchFailed: false,

    isStoriesLoading: false,
    isPostsLoading: false,
  }

  componentDidMount() {
    this.getStoriesData()
    this.getPostsData()
  }

  getStoriesData = async () => {
    this.setState({isStoriesLoading: true})
    const token = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/insta-share/stories'
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    const data = await response.json()
    this.setState({isStoriesLoading: false})
    if (response.ok) {
      this.storiesFetchedSucess(data.users_stories)
    } else {
      this.setState({storiesDataFetchFailed: true})
    }
  }

  storiesFetchedSucess = userStories => {
    this.setState({storiesData: userStories})
  }

  getPostsData = async () => {
    this.setState({isPostsLoading: true})
    const token = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/insta-share/posts'
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    const data = await response.json()
    this.setState({isPostsLoading: false})
    if (response.ok) {
      this.PostsFetchedSucess(data.posts)
    } else {
      this.setState({postsDataFetchFailed: true})
    }
  }

  PostsFetchedSucess = posts => {
    this.setState({postsData: posts})
  }

  renderLoader = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  render() {
    const {
      storiesData,
      isStoriesLoading,
      isPostsLoading,
      postsData,
      postsDataFetchFailed,
      storiesDataFetchFailed,
    } = this.state
    const storiesDataAvailable = storiesData !== undefined
    const postsDataAvailable = postsData !== undefined

    return (
      <>
        <Header />
        <div className="home-bg-container">
          {isStoriesLoading && <div testid="loader">{this.renderLoader()}</div>}
          {storiesDataAvailable && (
            <StoriesGenerater storyDetails={storiesData} />
          )}
          {storiesDataFetchFailed && (
            <div className="">
              <img src="" alt="failure view" />
              <p className="">Something went wrong. Please try again</p>
              <button type="button" onCilck={this.getStoriesData}>
                Try Again
              </button>
            </div>
          )}
          <hr className="story-line" />
          {isPostsLoading && <div testid="loader">{this.renderLoader()}</div>}
          {postsDataAvailable &&
            postsData.map(eachPost => (
              <PostsGenerater key={eachPost.post_id} postsDetails={eachPost} />
            ))}
          {postsDataFetchFailed && (
            <div className="">
              <img src="" alt="failure view" />
              <p className="">Something went wrong. Please try again</p>
              <button type="button" onCilck={this.getPostsData}>
                Try Again
              </button>
            </div>
          )}
        </div>
      </>
    )
  }
}

export default Home
