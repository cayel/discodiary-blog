import React, { useEffect } from "react"
import { navigate } from "gatsby"
import { Router } from "@reach/router"
import Layout from "../components/layout"
import Navigation from "../components/app/Navigation"
import Dashboard from "../components/app/Dashboard"
import Account from "../components/app/Account"
import Listening from "../components/app/Listening"
import useAuth from "../hooks/useAuth"

const App = ({ location }) => {
  const { isAuthenticated } = useAuth()
  const redirect = location.pathname.split('/').pop()
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { redirect }});
    }
  }, [isAuthenticated, redirect]);
  
  
  return (
    <Layout>
      <Navigation />
      <Router basepath="/app">
        <Account path="/account" />
        <Listening path="/listening" />
        <Dashboard default />
      </Router>
    </Layout>
  )
}
export default App