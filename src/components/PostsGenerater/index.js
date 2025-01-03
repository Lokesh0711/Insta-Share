import {useState} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'

import {BsHeart} from 'react-icons/bs'
import {FcLike} from 'react-icons/fc'
import {FaRegComment} from 'react-icons/fa'
import {BiShareAlt} from 'react-icons/bi'

import './index.css'

const PostsGenerater = props => {
  const [postLiked, changePostLikeStutes] = useState(false)

  const {postsDetails} = props
  const post = {
    profilePic: postsDetails.profile_pic,
    userId: postsDetails.user_id,
    userName: postsDetails.user_name,
    postImageUrl: postsDetails.post_details.image_url,
    postCaption: postsDetails.post_details.caption,
    likesCount: postsDetails.likes_count,
    createdAt: postsDetails.created_at,
    postId: postsDetails.post_id,
    comments: postsDetails.comments.map(eachComment => ({
      comment: eachComment.comment,
      userId: eachComment.user_id,
      userName: eachComment.user_name,
    })),
  }
  const {
    profilePic,
    userName,
    userId,
    postImageUrl,
    postCaption,
    likesCount,
    comments,
    createdAt,
    postId,
  } = post

  const [onSiteLikesCount, updateLikesCount] = useState(likesCount)

  const raisePostrequest = async () => {
    const token = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/insta-share/posts/${postId}/like`
    const postLikeStatus = {
      like_status: !postLiked,
    }
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'POST',
      body: JSON.stringify(postLikeStatus),
    }
    await fetch(url, options)
  }

  const changeLikeCount = () => {
    if (!postLiked) {
      updateLikesCount(onSiteLikesCount + 1)
    } else {
      updateLikesCount(onSiteLikesCount - 1)
    }
  }

  const onChangePostLikeStutes = () => {
    changePostLikeStutes(!postLiked)
    raisePostrequest()
    changeLikeCount()
  }

  return (
    <div className='post-container'>
      <Link to={`/users/${userId}`} className='link'>
        <div className='post-profile-container'>
          <img
            className='post-profile-pic'
            src={profilePic}
            alt='post author profile'
          />
          <p className='post-profile-name'>{userName}</p>
        </div>
      </Link>
      <img className='post-image' src={postImageUrl} alt='post' />
      <div className='post-details-container'>
        <div className='post-details-icons-container'>
          {!postLiked && (
            <button
              type='button'
              className='post-details-icons'
              testid='likeIcon'
              onClick={onChangePostLikeStutes}
            >
              <BsHeart className='icons' />
            </button>
          )}
          {postLiked && (
            <button
              type='button'
              className='post-details-icons'
              testid='unLikeIcon'
              onClick={onChangePostLikeStutes}
            >
              <FcLike className='icons' />
            </button>
          )}
          <button type='button' className='post-details-icons'>
            <FaRegComment className='icons' />
          </button>
          <button type='button' className='post-details-icons'>
            <BiShareAlt className='icons' />
          </button>
        </div>
        <p className='post-caption'>{onSiteLikesCount} likes</p>
        <p className='post-caption'>{postCaption}</p>
        {comments.map(eachComment => (
          <p className='post-comment' key={eachComment.userId}>
            <span className='comment-user-name'>{eachComment.userName} </span>
            {eachComment.comment}
          </p>
        ))}
        <p className='post-created-at'>{createdAt}</p>
      </div>
    </div>
  )
}

export default PostsGenerater
