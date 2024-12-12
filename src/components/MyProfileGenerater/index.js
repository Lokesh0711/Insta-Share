import {BsGrid3X3} from 'react-icons/bs'
import {BiCamera} from 'react-icons/bi'
import './index.css'

const MyProfileGenerater = props => {
  const {profileDetails} = props

  const updatedProfileDeatils = {
    userName: profileDetails.user_name,
    profilePic: profileDetails.profile_pic,
    postsCount: profileDetails.posts_count,
    followersCount: profileDetails.followers_count,
    followingCount: profileDetails.following_count,
    userBio: profileDetails.user_bio,
    stories: profileDetails.stories,
    posts: profileDetails.posts,
  }
  const {
    userName,
    profilePic,
    postsCount,
    followersCount,
    followingCount,
    userBio,
    stories,
    posts,
  } = updatedProfileDeatils
  const postAvailable = posts.length > 0
  return (
    <div className="profile-bg-container">
      <div className="profile-mobile-view">
        <h1 className="user-name">{userName}</h1>
        <div className="profile-pic-followers-details">
          <img src={profilePic} alt="my profile" className="profile-pic" />
          <div className="followers-details-container">
            <p className="followers-count">{postsCount}</p>
            <p className="followers-desc">Posts</p>
          </div>
          <div className="followers-details-container">
            <p className="followers-count">{followersCount}</p>
            <p className="followers-desc">followers</p>
          </div>
          <div className="followers-details-container">
            <p className="followers-count">{followingCount}</p>
            <p className="followers-desc">following</p>
          </div>
        </div>
        <h1 className="user-id">{userName}</h1>
        <p className="user-bio">{userBio}</p>
      </div>
      <div className="profile-desk-view">
        <img src={profilePic} alt="my profile" className="profile-pic" />

        <div className="profile-pic-followers-details">
          <h1 className="user-name">{userName}</h1>
          <div className="followers-posts-details">
            <div className="followers-details-container">
              <p className="followers-count">{postsCount}</p>
              <p className="followers-desc">Posts</p>
            </div>
            <div className="followers-details-container">
              <p className="followers-count">{followersCount}</p>
              <p className="followers-desc">followers</p>
            </div>
            <div className="followers-details-container">
              <p className="followers-count">{followingCount}</p>
              <p className="followers-desc">following</p>
            </div>
          </div>
          <h1 className="user-id">{userName}</h1>
          <p className="user-bio">{userBio}</p>
        </div>
      </div>
      <ul className="user-stories">
        {stories.map(eachStorie => (
          <li className="storie-item" key={eachStorie.id}>
            <img
              src={eachStorie.image}
              alt="my story"
              className="storie-image"
            />
          </li>
        ))}
      </ul>
      <hr className="hori-line" />
      <div className="posts-container">
        <div className="posts-title-container">
          <BsGrid3X3 className="grid-icon" />
          <h1 className="posts-title">Posts</h1>
        </div>
        {postAvailable && (
          <ul className="post-list-container">
            {posts.map(eachPost => (
              <li className="post-list-item" key={eachPost.id}>
                <img className="post-pic" alt="my post" src={eachPost.image} />
              </li>
            ))}
          </ul>
        )}
        {!postAvailable && (
          <div className="no-post-container">
            <div className="no-post-image-container">
              <BiCamera className="no-post-image" />
            </div>
            <p className="no-post-desc">No Post Yet</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default MyProfileGenerater
