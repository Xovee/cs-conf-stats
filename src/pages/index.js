// Step 1: Import React
import * as React from 'react'
import { Link } from 'gatsby'

// Step 2: Define your component
const IndexPage = () => {
  return (
    <main>
      <h1>Computer Science Conference Statistics</h1>

      <p>Explore top-tier CS conference acceptance rate and number of submission every year.</p>

      <p>Created and maintained by <Link to="https://www.xoveexu.com">Xovee Xu</Link>.
        If you would like to add or correct data, create issues or PRs at the
        <Link to="https://github.com/Xovee/cs-conf-stats"></Link>GitHub repo.</p>
    </main>
  )
}

// You'll learn about this in the next task, just copy it for now
export const Head = () => <title>Home Page</title>

// Step 3: Export your component
export default IndexPage