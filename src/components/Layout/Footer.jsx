import React from 'react'

function Footer() {
  return (
    <footer className="footer sm:footer-horizontal bg-black/70 text-gray-200 p-10 flex flex-row gap-100 ">
      <aside>
        <img src="https://cdn-icons-png.flaticon.com/128/3049/3049498.png" alt="" className='w-14 h-14' />
        <p>
          AstroView.
          <br />
          Explore the cosmos with NASA's data and daily discoveries.
          <br />
          © 2025 AstroView. All Rights Reserved.
        </p>
      </aside>
      <nav>
        <h6 className="footer-title mt-12">Social</h6>
        <div className="grid grid-flow-col gap-4">
          {/* Twitter / X */}
          <a href='https://x.com/Harshapu4'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current hover:text-[#9d85e6]">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.5l-5.118-6.708-5.85 6.708H2.224l7.73-8.868L1.75 2.25h6.989l4.644 6.126 4.861-6.126zm-1.161 17.52h1.833L7.084 4.63H5.117l11.966 15.14z" />
            </svg>
          </a>

          {/* GitHub */}
          <a href='https://github.com/Harsha4112004'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current hover:text-[#9d85e6]">
              <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2.1c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.2-1.6-1.2-1.6-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 .1.6 1.9 2.8 1.3.1-.8.4-1.3.8-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.9 1.2 3.2 0 4.4-2.7 5.3-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6a11.5 11.5 0 0 0 7.9-10.9C23.5 5.65 18.35.5 12 .5z" />
            </svg>
          </a>

          {/* LinkedIn */}
          <a href='https://www.linkedin.com/in/harsha-p-u-13538a379/'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current hover:text-[#9d85e6]">
              <path d="M4.98 3.5C3.34 3.5 2 4.85 2 6.48c0 1.64 1.34 2.98 2.98 2.98 1.63 0 2.97-1.34 
                2.97-2.98C7.95 4.85 6.61 3.5 4.98 3.5zM2.4 21.5h5.2V9.5H2.4v12zm7.9 0h5.1v-6.4c0-1.7.6-2.8 
                2.2-2.8 1.6 0 2.2 1.1 2.2 2.8v6.4h5.1V14c0-3.6-1.9-5.3-4.6-5.3-2.1 0-3.1 1.1-3.6 1.9h-.1v-1.6H10.3c.1 1 .1 
                12 0 12z"/>
            </svg>
          </a>
        </div>
      </nav>
    </footer>
  )
}

export default Footer
