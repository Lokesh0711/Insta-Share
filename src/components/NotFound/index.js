// import {withRouter} from 'react-router-dom'
import './index.css'

const NotFound = props => {
  const onClickHome = () => {
    const {history} = props
    history.replace('/')
  }
  return (
    <div className="notFound-bg-conatiner">
      <img
        className="notFound-icon"
        src="https://res.cloudinary.com/dicenbnxz/image/upload/v1732205946/insta-share/not-found-icon.png"
        alt="not found"
      />
      <h1 className="notFound-title">Page Not Found</h1>
      <p className="notFound-desc">
        we are sorry, the page you requested could not be found.Please go back
        to the homepage.
      </p>
      <button className="notfound-button" type="button" onClick={onClickHome}>
        Home
      </button>
    </div>
  )
}

export default NotFound
