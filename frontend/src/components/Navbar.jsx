// import React, { useState, useEffect } from 'react';
// import navElements from './index.js';
// import { Link, useLocation } from 'react-router-dom';
// import UserProfile from './UserProfile.jsx';
// import gsap from 'gsap';
// import { useGSAP } from '@gsap/react';

// const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const location = useLocation();

//   // Check if the user is admin
//   const email = localStorage.getItem("email");
//   const isAdmin = email === "safestreet456@gmail.com";

//   // Filter nav elements based on role
//   const filteredNavElements = navElements.filter(([label]) => {
//     if (isAuthenticated) {
//       if (isAdmin) {
//         return ['Home', 'Analysis', 'Notifications'].includes(label);
//       } else {
//         return ['Home', 'Report Damage', 'History', 'About', 'Contact'].includes(label); // ✅ Include History for users
//       }
//     } else {
//       return ['Home', 'Report Damage', 'About', 'Contact'].includes(label); // Unauthenticated users only see these
//     }
//   });

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth >= 1024) {
//         setIsOpen(false);
//       }
//     };

//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (isOpen && !event.target.closest('aside') && !event.target.closest('i')) {
//         setIsOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, [isOpen]);

//   function handleClick() {
//     setIsOpen(!isOpen);
//   }

//   return (
//     <header className='font-[Poppins] bg-black/40 backdrop-blur-lg w-full h-18 flex justify-between items-center px-4 text-white fixed top-0 left-0 z-20'>
//       <nav className='flex justify-between w-full items-center py-4'>
//         <Link to="/"><img src="./logo.png" alt="Logo" /></Link>
//         <ul className='space-x-4 hidden lg:flex justify-center items-center'>
//           {filteredNavElements.map((element, index) => (
//             <li
//               key={index}
//               className={`cursor-pointer hover:text-gray-300 font-semibold text-[18px] relative text-nowrap ${
//                 location.pathname === element[1]
//                   ? 'text-gray-300 after:absolute after:left-0 after:bottom-[-22px] after:h-[2px] after:w-full after:bg-white after:content-[""] after:transition-all after:duration-300'
//                   : 'after:absolute after:left-0 after:bottom-[-22px] after:h-[2px] after:w-0 after:bg-white after:content-[""]'
//               }`}
//             >
//               <Link to={element[1]}>{element[0]}</Link>
//             </li>
//           ))}
//         </ul>

//         <ul className='space-x-4 hidden lg:flex'>
//           {!isAuthenticated && (
//             <li>
//               <button
//                 className='px-4 py-2 bg-transparent border border-white rounded-md cursor-pointer hover:bg-white hover:text-black font-semibold transition-colors duration-300'
//               >
//                 <Link to="/login">Login</Link>
//               </button>
//             </li>
//           )}
//           {isAuthenticated && <UserProfile setIsAuthenticated={setIsAuthenticated} />}
//         </ul>

//         <div className='flex items-center justify-end space-x-3 lg:hidden'>
//           {isAuthenticated && <UserProfile setIsAuthenticated={setIsAuthenticated} />}
//           <button
//             className="lg:hidden z-30"
//             onClick={handleClick}
//             aria-label={isOpen ? 'Close menu' : 'Open menu'}
//           >
//             <i className={`ri-menu-line text-xl ${isOpen ? 'hidden' : 'block'} cursor-pointer`}></i>
//           </button>
//         </div>
//       </nav>

//       {/* Overlay */}
//       <div
//         className={`fixed inset-0 bg-black/30 transition-opacity duration-300 lg:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
//         onClick={() => setIsOpen(false)}
//       ></div>

//       {/* Sidebar */}
//       <aside
//         className={`fixed top-0 right-0 bg-black/90 backdrop-blur-md w-64 h-screen transform transition-transform duration-300 ease-in-out ${
//           isOpen ? 'translate-x-0' : 'translate-x-full'
//         } z-30 lg:hidden`}
//       >
//         <i
//           className={`absolute top-4 right-4 ri-close-fill text-2xl ${isOpen ? 'block' : 'hidden'} cursor-pointer`}
//           onClick={() => setIsOpen(false)}
//         ></i>
//         <ul className='flex flex-col space-y-6 p-6 mt-20'>
//           {filteredNavElements.map((element, index) => (
//             <li
//               key={index}
//               className='cursor-pointer hover:text-gray-300 font-semibold text-[18px] w-full p-2'
//               onClick={() => setIsOpen(false)}
//             >
//               <Link to={element[1]}>{element[0]}</Link>
//             </li>
//           ))}
//           <hr />
//           <li className="pt-4">
//             <Link to="/login">
//               <button
//                 className={`w-full px-4 py-2 bg-transparent border border-white rounded-md cursor-pointer hover:bg-white hover:text-black font-semibold transition-colors duration-300 ${
//                   isAuthenticated ? 'hidden' : ''
//                 }`}
//                 onClick={() => setIsOpen(false)}
//               >
//                 Login
//               </button>
//             </Link>
//           </li>
//         </ul>
//       </aside>
//     </header>
//   );
// };

// export default Navbar;

import React, { useState, useEffect } from 'react';
import navElements from './index.js';
import { Link, useLocation } from 'react-router-dom';
import UserProfile from './UserProfile.jsx';
import { BellIcon } from '@heroicons/react/24/outline'; // Ensure heroicons is installed
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const email = localStorage.getItem("email");
  const isAdmin = email === "safestreet456@gmail.com";

  const filteredNavElements = navElements.filter(([label]) => {
    if (isAuthenticated) {
      if (isAdmin) {
        return ['Home', 'Analysis', 'Notifications'].includes(label);
      } else {
        return ['Home', 'Report Damage', 'History', 'About', 'Contact'].includes(label);
      }
    } else {
      return ['Home', 'Report Damage', 'About', 'Contact'].includes(label);
    }
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('aside') && !event.target.closest('i')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  function handleClick() {
    setIsOpen(!isOpen);
  }

  return (
    <header className='font-[Poppins] bg-black/40 backdrop-blur-lg w-full h-18 flex justify-between items-center px-4 text-white fixed top-0 left-0 z-20'>
      <nav className='flex justify-between w-full items-center py-4'>
        <Link to="/"><img src="./logo.png" alt="Logo" /></Link>
        <ul className='space-x-4 hidden lg:flex justify-center items-center'>
          {filteredNavElements.map((element, index) => (
            <li
              key={index}
              className={`cursor-pointer hover:text-gray-300 font-semibold text-[18px] relative text-nowrap ${
                location.pathname === element[1]
                  ? 'text-gray-300 after:absolute after:left-0 after:bottom-[-22px] after:h-[2px] after:w-full after:bg-white after:content-[""] after:transition-all after:duration-300'
                  : 'after:absolute after:left-0 after:bottom-[-22px] after:h-[2px] after:w-0 after:bg-white after:content-[""]'
              }`}
            >
              <Link to={element[1]}>{element[0]}</Link>
            </li>
          ))}
        </ul>

        <ul className='space-x-4 hidden lg:flex items-center'>
          {!isAuthenticated && (
            <li>
              <button className='px-4 py-2 bg-transparent border border-white rounded-md cursor-pointer hover:bg-white hover:text-black font-semibold transition-colors duration-300'>
                <Link to="/login">Login</Link>
              </button>
            </li>
          )}

          {/* Notification Bell Icon */}
          {isAuthenticated && !isAdmin && (
            <li>
              <Link to="/user-notifications">
                <BellIcon className="w-6 h-6 text-white hover:text-gray-300" />
              </Link>
            </li>
          )}

          {isAuthenticated && <UserProfile setIsAuthenticated={setIsAuthenticated} />}
        </ul>

        <div className='flex items-center justify-end space-x-3 lg:hidden'>
          {/* Notification Icon for mobile */}
          {isAuthenticated && !isAdmin && (
            <Link to="/notifications">
              <BellIcon className="w-6 h-6 text-white" />
            </Link>
          )}
          {isAuthenticated && <UserProfile setIsAuthenticated={setIsAuthenticated} />}
          <button
            className="lg:hidden z-30"
            onClick={handleClick}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            <i className={`ri-menu-line text-xl ${isOpen ? 'hidden' : 'block'} cursor-pointer`}></i>
          </button>
        </div>
      </nav>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/30 transition-opacity duration-300 lg:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 right-0 bg-black/90 backdrop-blur-md w-64 h-screen transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } z-30 lg:hidden`}
      >
        <i
          className={`absolute top-4 right-4 ri-close-fill text-2xl ${isOpen ? 'block' : 'hidden'} cursor-pointer`}
          onClick={() => setIsOpen(false)}
        ></i>
        <ul className='flex flex-col space-y-6 p-6 mt-20'>
          {filteredNavElements.map((element, index) => (
            <li
              key={index}
              className='cursor-pointer hover:text-gray-300 font-semibold text-[18px] w-full p-2'
              onClick={() => setIsOpen(false)}
            >
              <Link to={element[1]}>{element[0]}</Link>
            </li>
          ))}

          {!isAdmin && isAuthenticated && (
            <li onClick={() => setIsOpen(false)}>
              <Link to="/notifications" className="text-white hover:text-gray-300 flex items-center space-x-2">
                <BellIcon className="w-5 h-5" />
                <span>Notifications</span>
              </Link>
            </li>
          )}

          <hr />
          <li className="pt-4">
            <Link to="/login">
              <button
                className={`w-full px-4 py-2 bg-transparent border border-white rounded-md cursor-pointer hover:bg-white hover:text-black font-semibold transition-colors duration-300 ${
                  isAuthenticated ? 'hidden' : ''
                }`}
                onClick={() => setIsOpen(false)}
              >
                Login
              </button>
            </Link>
          </li>
        </ul>
      </aside>
    </header>
  );
};

export default Navbar;
