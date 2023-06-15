import React from 'react';

function Footer() {
  return (
    <footer className="bg-slate-700 text-zinc-50 py-6 relative bottom-0 w-full pt-2 pb-2">
      <div className="container mx-auto flex flex-col md:flex-row justify-evenly items-center">
        
        <div className="flex-col items-center mt-4 md:mt-0">
        <div className="flex justify-center">
          <p>&copy; CAMPUSmart.com</p>
        </div>
          <div className="flex items-center" style={{fontSize:'12px'}}>
            <p className="mr-1">Contact Us:</p>
            <p className='pr-3'>himanshuu673@gmail.com</p>
          </div>
          <div className="flex ml-24">
            <a href="https://www.instagram.com/himanshugupta.673/" target="_blank" rel="noopener noreferrer" className="mr-4">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/2048px-Instagram_icon.png" alt="Instagram" className="w-6 h-6" />
            </a>
            <a href="https://www.linkedin.com/in/himanshu-gupta-85858014b" target="_blank" rel="noopener noreferrer">
              <img src="https://static-00.iconduck.com/assets.00/linkedin-icon-1024x1024-z5dvl47c.png" alt="LinkedIn" className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
