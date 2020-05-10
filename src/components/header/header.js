import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'

import styles from './header.module.css'

const Header = ({ siteTitle }) => (
  <header className={styles.header}>
    <div className='container'>
      <h1>
        <Link to='/' style={{ color: 'white' }}>
          {siteTitle}
        </Link>
      </h1>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: '',
}

export default Header
