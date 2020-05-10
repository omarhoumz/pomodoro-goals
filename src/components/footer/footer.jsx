import React, { memo } from 'react'

import styles from './footer.module.css'

const Footer = memo(function Footer() {
  return (
    <footer className={['container', styles.footer].join(' ')}>
      <p>
        © {new Date().getFullYear()}, Built by
        {` `}
        <a href='https://omarhoumz.com'>Omar Houmz</a>
        {` with `}
        <a href='https://www.gatsbyjs.org'>Gatsby</a>
        {`. Deployed to `}
        <a href='https://www.netlify.com'>Netlify</a>
      </p>
      <p>
        <a href='https://github.com/omhoumz/pomodoro-goals/issues'>
          Report a bug or request a feature
        </a>
      </p>
    </footer>
  )
})

export default Footer
