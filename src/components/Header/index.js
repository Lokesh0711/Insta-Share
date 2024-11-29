import {useState} from 'react'
import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {FaSearch} from 'react-icons/fa'

import ActiveTabContext from '../../context/ActiveTabContext'

import './index.css'

const Header = props => {
  const [displayMenu, changeMenuSetting] = useState(false)
  const [displaySearch, changeSearchStatus] = useState(false)
  return (
    <ActiveTabContext.Consumer>
      {value => {
        const {activeTab, changeActiveTab} = value
        console.log(activeTab)

        const onClickMenu = () => {
          changeMenuSetting(true)
        }

        const onClickClose = () => {
          changeMenuSetting(false)
        }

        const onClickLogout = () => {
          Cookies.remove('jwt_token')
          const {history} = props
          history.replace('/login')
        }

        const onClickSearch = () => {
          onClickClose()
          changeSearchStatus(!displaySearch)
        }

        return (
          <div className="header-bg-container">
            <div className="header-title-menu-container">
              <div className="header-title-logo-container">
                <Link to="/" className="list-item">
                  <img
                    className="header-logo"
                    src="https://res.cloudinary.com/dicenbnxz/image/upload/v1732199748/insta-share/logo.png"
                    alt="logo"
                  />
                </Link>
                <h1 className="header-title">Insta Share</h1>
              </div>
              <img
                className="header-menu-icon"
                src="https://res.cloudinary.com/dicenbnxz/image/upload/v1732208941/insta-share/menu-icon.png"
                alt="menu icon"
                onClick={onClickMenu}
              />
              <ul className="header-largescreen-menu-list-container">
                <li className="header-menu-list-item">
                  <div className="header-menu-search-container">
                    <input
                      type="text"
                      className="header-menu-search-input-field"
                      placeholder="Search Caption"
                    />
                    <div className="header-search-menu-icon-conainer">
                      <FaSearch />
                    </div>
                  </div>
                </li>
                <Link to="/" className="list-item">
                  <li className="header-menu-list-item">Home</li>
                </Link>
                <Link to="/my-profile" className="list-item">
                  <li className="header-menu-list-item">Profile</li>
                </Link>
                <li className="header-menu-list-item">
                  <button
                    className="header-menu-list-item-button"
                    type="button"
                    onClick={onClickLogout}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
            <div className="header-menu-items">
              {displayMenu && (
                <ul className="header-menu-list-container">
                  <Link to="/" className="list-item">
                    <li className="header-menu-list-item">Home</li>
                  </Link>
                  <li className="header-menu-list-item" onClick={onClickSearch}>
                    Search
                  </li>
                  <Link to="/my-profile" className="list-item">
                    <li className="header-menu-list-item">Profile</li>
                  </Link>
                  <li className="header-menu-list-item">
                    <button
                      className="header-menu-list-item-button"
                      type="button"
                      onClick={onClickLogout}
                    >
                      Logout
                    </button>
                  </li>
                  <li className="header-menu-list-item">
                    <img
                      src="https://res.cloudinary.com/dicenbnxz/image/upload/v1732211028/insta-share/cnhjgswpiovv4ps7cfjs.png"
                      alt="close"
                      onClick={onClickClose}
                    />
                  </li>
                </ul>
              )}
              {displaySearch && (
                <div className="header-menu-search-container">
                  <input
                    type="text"
                    className="header-menu-search-input-field"
                    placeholder="Search Caption"
                  />
                  <div className="header-search-menu-icon-conainer">
                    <FaSearch />
                  </div>
                </div>
              )}
            </div>
          </div>
        )
      }}
    </ActiveTabContext.Consumer>
  )
}
export default withRouter(Header)
