import * as React from 'react';
import Footer from './Footer';
import { StaticImage } from 'gatsby-plugin-image';
import Dropdown from "./src/components/Dropdown";

const IndexPage = () => {

  const dropDownItems = [
    { label: "AI", href: '#item1' },
    { label: "CV", href: '#item2' },
    { label: "NLP", href: '#item3' },
    { label: "DM", href: '#item4' },
  ];

  return (
    <main className="min-h-screen flex flex-col items-center bg-gray-100 p-6">

      <h1 className="text-4xl md:text-5xl font-bold text-center text-uestc mt-6 mb-6">Computer Science Conference
        Statistics</h1>

      <p className="text-center text-gray-800">
        Explore top-tier CS conference acceptance rate and number of submission every year.
      </p>

      <p>
        Select a conference:
      </p>

      <div>
        <Dropdown label="Dropdown 1" items={dropDownItems} />
        <Dropdown label="Dropdown 2" items={dropDownItems} />
        <Dropdown label="Dropdown 3" items={dropDownItems} />
      </div>

      <hr className="w-full border-t-1.5 border-gray-600 my-4"/>

      <Footer/>
    </main>
  )
}

export const Head = () => <title>Computer Science Conference Statistics - Xovee Xu</title>

export default IndexPage