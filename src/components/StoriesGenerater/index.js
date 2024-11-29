import {Component} from 'react'
import Slider from 'react-slick'

import './index.css'

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
}

class StoriesGenerater extends Component {
  renderSlider = () => {
    const {storyDetails} = this.props

    return (
      <Slider {...settings}>
        {storyDetails.map(eachLogo => {
          const eachStory = {
            userId: eachLogo.user_id,
            storyUrl: eachLogo.story_url,
            userName: eachLogo.user_name,
          }
          const {userId, storyUrl, userName} = eachStory
          return (
            <div className="slick-item" key={userId}>
              <div className="image-container">
                <img className="logo-image" src={storyUrl} alt="user story" />
              </div>
              <p className="user-name">{userName}</p>
            </div>
          )
        })}
      </Slider>
    )
  }

  render() {
    return (
      <div className="main-container">
        <div className="slick-container">{this.renderSlider()}</div>
      </div>
    )
  }
}

export default StoriesGenerater
