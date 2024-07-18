import * as React from 'react'

const Footer = () => {
  return (
    <footer className="w-full">

      <div className="container text-center mx-auto md:text-left">
        <p>Created and maintained by <a href="https://www.xoveexu.com" target="_blank" rel="noopener noreferrer">Xovee Xu</a>.</p>

        <p>Data are collected from the proceedings and official websites, but may also including some unofficial sources that could be wrong or incomplete.</p>

        <p>If you would like to add or correct data, suggest new features, please create issues or PRs
          at the <a href="https://github.com/Xovee/cs-conf-stats" target="_blank" rel="noopener noreferrer">GitHub repo</a>, or contact me directly.</p>

        <p>
          &copy; 2024 Xovee Xu <a href="https://www.xoveexu.com" target="_blank" rel="noopener noreferrer">https://www.xoveexu.com</a></p>
      </div>
    </footer>
  );
};

export default Footer;