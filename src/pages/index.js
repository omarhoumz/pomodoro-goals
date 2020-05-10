import React from 'react'
// import { Link } from "gatsby"

import Layout from '../components/layout/layout'
import SEO from '../components/seo'
import Timer from '../components/timer/timer'

const IndexPage = () => (
  <Layout>
    <SEO title='Home' />
    <Timer />
  </Layout>
)

export default IndexPage
