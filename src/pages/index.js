import * as React from 'react';
import Footer from '../components/Footer';
import { StaticImage } from 'gatsby-plugin-image';

const IndexPage = () => {
  return (
    <main className="min-h-screen flex flex-col items-center bg-gray-100 p-6">

      <h1 className="text-4xl md:text-5xl font-bold text-center text-uestc mt-6 mb-6">Computer Science Conference
        Statistics</h1>

      <StaticImage src="../images/logo.webp" alt="Logo" />

      <p className="text-center text-gray-800">
        Explore top-tier CS conference acceptance rate and number of submission every year.
      </p>

      <p>
        Select a conference:
      </p>

      <button>Select</button>

      <hr className="w-full border-t-1.5 border-gray-600 my-4"/>

      <Footer/>
    </main>
  )
}

export const Head = () => <title>Computer Science Conference Statistics - Xovee Xu</title>

export default IndexPage