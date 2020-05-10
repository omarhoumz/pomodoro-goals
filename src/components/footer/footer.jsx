import React, { memo } from 'react'

import styles from './footer.module.css'

const Footer = memo(function Footer() {
  return (
    <footer className={['container', styles.footer].join(' ')}>
      © {new Date().getFullYear()}, Built by
      {` `}
      <a href='https://omarhoumz.com'>Omar Houmz</a>
      {` with `}
      <a href='https://www.gatsbyjs.org'>Gatsby</a>
      {`. Deployed to `}
      <a href='https://www.netlify.com'>Netlify</a>
    </footer>
  )
})

export default Footer
