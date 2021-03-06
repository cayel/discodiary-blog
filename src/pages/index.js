import React, { useEffect } from "react"
import { navigate } from "gatsby"
import { Router } from "@reach/router"
import SEO from "../components/seo"
import Layout from "../components/layout"
import Navigation from "../components/app/Navigation"
import Dashboard from "../components/app/Dashboard"
import Account from "../components/app/Account"
import useAuth from "../hooks/useAuth"

const IndexPage = ({ location }) => {
  const { state, isAuthenticated } = useAuth()
  const redirect = location.pathname.split('/').pop()
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { redirect }});
    }
  }, [isAuthenticated, redirect]);
  
  
  return (
    <Layout>
      <SEO title="Home" />
      <pre>
        { JSON.stringify(state, null, 2) }
      </pre>
      <Navigation />
      <Router basepath="/app">
        <Account path="/account" />
        <Dashboard default />
      </Router>
    </Layout>
  )
}

export default IndexPage
