"use client";
import { useState, useEffect } from 'react';
import SideBarItem from './SideBarItem';
import StatIndicator from './StatIndicator';
import GradientBtn from '../buttons/GradientBtn';
import SideBarBtn from '../buttons/SideBarBtn';
import { FiMoon, FiSun, FiSettings, FiUser } from 'react-icons/fi';
import { HiMiniCommandLine } from "react-icons/hi2";
import { useTheme } from '../../hooks/ThemeContext';
import Image from 'next/image';
import { useModelContext } from '../../hooks/ModelContext';
import ModelStatus from './ModelStatus';

function SideBar() {
  const [showSidebar, setShowSidebar] = useState(true);
  const { theme, toggleTheme } = useTheme();
  const toggleSidebar = () => setShowSidebar(!showSidebar);
  const { modelStatus, setModelStatus, modelSummary, setModelSummary } = useModelContext();


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
        <div className="h-full px-3 py-4 overflow-y-auto bg-[#F1F4FA] dark:bg-gray-800">
          {/* close button */}
          {/* <div className='w-full text-left '>
            <button
              onClick={toggleSidebar}
              type="button"
              className="sm:hidden rounded-md text-white bg-gray-200 dark:bg-gray-700 aspect-square"
            >x</button>
          </div> */}
          <ul className="space-y-2 font-medium">
            <li className='logo '>
              <Image src='/logo.svg' alt='logo' width={0}
                height={0}
                sizes="100vw"
                style={{ width: '100%', height: 'auto' }}
              />
            </li>
            <li className='flex'>
              <SideBarItem text={"Model status: "} icon={""} className='text-nowrap m-0' />
              <span className=''>
                <ModelStatus status={modelStatus} />
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
              <SideBarItem text={"Running commands"} icon={<HiMiniCommandLine size={24} />} />
            </li>
          </ul>

          <ul className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
            <li>
            </li>
            <li className='text-center'>
              <GradientBtn text={"Generate a Report"} />
            </li>
          </ul>
          {/* The very end of the side bar would contain settings like a button for theme (dark/white), a button for settins (gear shape), and lastly a button to sign in and out which willl be disabled */}
          {/* theme btn */}
          <div className="absolute bottom-5 left-0 right-0 flex space-x-4 items-center justify-center">
            <SideBarBtn
              icon={theme == 'dark' ? <FiSun /> : <FiMoon />}
              onClick={toggleTheme}
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

