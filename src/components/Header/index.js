import {useState} from 'react'
import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {FaSearch} from 'react-icons/fa'

import './index.css'

const Header = props => {
  const [displayMenu, changeMenuSetting] = useState(false)
  const [displaySearch, changeSearchStatus] = useState(false)
  const [searchInput, updateSearchInput] = useState('')

  const onChangeSearch = event => {
    updateSearchInput(event.target.value)
  }

  const onClickSearch = () => {
    console.log(searchInput)
  }

  const onClickMenu = () => {
    changeMenuSetting(true)
  }

  const onClickClose = () => {
    changeMenuSetting(false)
  }
  const onClickSearchText = () => {
    changeSearchStatus(!displaySearch)
  }

  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <div className="header-bg-container">
      <div className="header-title-menu-container">
        <div className="header-title-logo-container">
          <Link to="/" className="list-item">
            <img
              className="header-logo"
              src="https://res.cloudinary.com/dicenbnxz/image/upload/v1732199748/insta-share/logo.png"
              alt="website logo"
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
          <li className="header-menu-list-item search-container">
            <div className="header-menu-search-container">
              <input
                type="search"
                className="header-menu-search-input-field"
                placeholder="Search Caption"
                onChange={onChangeSearch}
              />
              <Link to={`/search/${searchInput}`}>
                <button
                  className="search-button header-search-menu-icon-conainer"
                  onClick={onClickSearch}
                  type="button"
                  testid="searchIcon"
                >
                  <FaSearch />
                </button>
              </Link>
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
            <li className="header-menu-list-item" onClick={onClickSearchText}>
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
              onChange={onChangeSearch}
            />
            <Link to={`/search/${searchInput}`}>
              <button
                className="search-button"
                onClick={onClickSearch}
                type="button"
                testid="searchIcon"
              >
                <FaSearch />
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default withRouter(Header)
