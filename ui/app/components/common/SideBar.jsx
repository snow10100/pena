"use client";
import { useState, useEffect } from 'react';
import SideBarItem from './SideBarItem';
import StatIndicator from './StatIndicator';
import GradientBtn from '../buttons/GradientBtn';
import SideBarBtn from '../buttons/SideBarBtn';
import { FiMoon, FiSun, FiSettings, FiUser } from 'react-icons/fi';

function SideBar() {
  const [showSidebar, setShowSidebar] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  const toggleSidebar = () => { return; };

  return (
    <div>
      <button
        onClick={toggleSidebar}
        data-drawer-target="separator-sidebar"
        data-drawer-toggle="separator-sidebar"
        aria-controls="separator-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          />
        </svg>
      </button>

      {showSidebar && <aside
        id="separator-sidebar"
        className="fixed top-0 left-0 z-40 w-[20rem] h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          {/* close button */}
          {/* <div className='w-full text-left '>
            <button
              onClick={toggleSidebar}
              type="button"
              className="sm:hidden rounded-md text-white bg-gray-200 dark:bg-gray-700 aspect-square"
            >x</button>
          </div> */}
          <ul className="space-y-2 font-medium">
            <li className='flex'>
              <SideBarItem text={"Model status: "} icon={""} className='text-nowrap m-0' />
              <span className=''>
                <StatIndicator criticality={'medium'} text='scanning...' className={'text-sm'} />
              </span>
            </li>
            <li>
              <SideBarItem text={"report: "} />
              <span className='ml-3'>
                <StatIndicator criticality={'high'} text='vulnerabitlies' number={16} />
              </span>
              <span className='ml-3'>
                <StatIndicator criticality={'low'} text='open ports' number={4} />
              </span>
              <span className='ml-3'>
                <StatIndicator criticality={'low'} text='missing encryption' number={8} />
              </span>
            </li>
            <li>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z" />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Inbox</span>
                <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                  3
                </span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 18"
                >
                  <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 4.285.772.772 0 0 0 0 .896A6.439 6.439 0 0 1 12.6 11.733 3.998 3.998 0 1 0 14 2ZM6 18a3.998 3.998 0 1 0 1.4-7.733A6.439 6.439 0 0 1 6.069 8a.772.772 0 0 0 0-.896A6.439 6.439 0 0 1 7.4 2.267 3.998 3.998 0 1 0 6 18Z" />
                  <path d="M13 10.268a7.517 7.517 0 0 1-.053 2.58.749.749 0 0 0 .534.899A4 4 0 1 0 17.75 8h-2.15a7.505 7.505 0 0 1-2.5 2.268ZM8.253 10.91a.749.749 0 0 0 .534-.899A7.517 7.517 0 0 1 8.735 7H6.25a4 4 0 1 0 3.266 5.747.749.749 0 0 0-.899-.534A6.426 6.426 0 0 1 8.253 10.91Z" />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Users</span>
              </a>
            </li>
          </ul>

          <ul className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z" />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Products</span>
              </a>
            </li>
            <li>
            </li>
            <li className='text-center'>
              <GradientBtn text={"Generate a report"} />
            </li>
          </ul>
          {/* The very end of the side bar would contain settings like a button for theme (dark/white), a button for settins (gear shape), and lastly a button to sign in and out which willl be disabled */}
          {/* theme btn */}
          <div className="absolute bottom-5 left-0 right-0 flex space-x-4 items-center justify-center">
            <SideBarBtn
              icon={isDarkMode ? <FiSun /> : <FiMoon />}
              onClick={toggleDarkMode}
            />
            <SideBarBtn
              icon={<FiSettings />}
              onClick={() => { }}
            />
            {/* <SideBarBtn
              icon={<FiUser />}
              onClick={() => { }}
              disabled={true}
            /> */}

          </div>

        </div>
      </aside>
      }
    </div>
  )
}

export default SideBar

