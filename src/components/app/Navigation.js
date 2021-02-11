import React from 'react'
import { Link } from 'gatsby'

export default () => (
  <ul className="flex">
    <li className="mx-2 px-2"><Link to="/app">Dashboard</Link></li>
    <li className="mx-2 px-2"><Link to="/app/listening">Listening</Link></li>
  </ul>
)