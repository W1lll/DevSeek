import 'tailwindcss/tailwind.css'
import jwt from 'jsonwebtoken'
import * as cookie from 'cookie'
import LoginButton from "../components/LoginButton"
import Logined from "../components/Logined"
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {useTheme} from 'next-themes'
import { Fragment, useState, useEffect } from 'react'
import { Popover, Transition } from '@headlessui/react'
import {
    MenuIcon,
    XIcon,
    DesktopComputerIcon,
    TerminalIcon,
    AtSymbolIcon,
    UserIcon,
    NewspaperIcon,
    ClipboardIcon,
    BookmarkAltIcon
} from '@heroicons/react/outline'
import { ChevronDownIcon, MoonIcon, SunIcon } from '@heroicons/react/solid'

const partners = [
    {
      name: 'Posts',
      description: 'Open listings.',
      href: '/posts',
      icon: ClipboardIcon,
    },   
    {
      name: 'Developers',
      description: 'Contact list.',
      href: '/',
      icon: TerminalIcon,
    },
]

// const options = [
//   {
//     name: 'Changelog',
//     description: 'DevSeek updates.',
//     href: '/changelog',
//     icon: NewspaperIcon,
//   },   
// ]
  
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Header(props) {
    const [mounted, setMounted] = useState(false)
    const { resolvedTheme, setTheme } = useTheme()
    useEffect(() => setMounted(true), [])

    const notify = () => toast("Oops! 😬 We're still working on this.\nCheck back later.")
    const notlogged = () => toast("Looks like you forgot to login. 🤦‍♂️")
    const data = props.props
    return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <ToastContainer
          hideProgressBar={true}
          position={"bottom-right"}
          bodyClassName={() => "text-gray-500 p-2"}
          />
          <div className="max-w-md sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-auto px-4 sm:px-6 light:bg-white">
            <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
              <div className="flex justify-start lg:w-0 lg:flex-1">
                <Link href="/">
                  <a className="block text-transparent bg-clip-text bg-gradient-to-br from-green-300 via-green-500 to-green-300 xl:inline text-3xl lg:text-3xl font-extrabold">DevSeek</a>
                </Link>
              </div>
              <div className="-mr-2 -my-2 md:hidden">
                <Popover.Button className="bg-white dark:bg-gray-800 dark:text-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none">
                  <span className="sr-only">Open menu</span>
                  <MenuIcon className="h-6 w-6" aria-hidden="true" />
                </Popover.Button>
              </div>
              <Popover.Group as="nav" className="hidden md:flex space-x-10">
                <Popover className="relative">
                  {({ open }) => (
                    <>
                      <Popover.Button
                        className={classNames(
                          open ? 'text-gray-900' : 'text-gray-500',
                          'group light:bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 dark:text-gray-100 focus:outline-none'
                        )}
                      >
                        <span>Browse</span>
                        <ChevronDownIcon
                          className={classNames(
                            open ? 'text-gray-600 dark:text-gray-400' : 'dark:text-gray-200 text-gray-400',
                            'ml-2 h-5 w-5 dark:group-hover:text-gray-400 group-hover:text-gray-600'
                          )}
                          aria-hidden="true"
                        />
                      </Popover.Button>

                      <Transition
                        show={open}
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                      >
                        <Popover.Panel
                          static
                          className="absolute z-10 -ml-4 mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2"
                        >
                          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                            <div className="grid grid-cols-2 grid-rows-1 gap-6 bg-white dark:bg-gray-800 px-5 py-6 sm:gap-8 sm:p-8">
                              {partners.map((item) => (
                                <Link className="col-span-1" href={item.href}>
                                <a
                                  key={item.name}
                                  className="-m-3 pl-2 py-2 flex items-center rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 bg-white dark:bg-gray-800 outline-none"
                                >
                                  <item.icon className="flex-shrink-0 h-6 w-6 text-green-500" aria-hidden="true" />
                                  <div className="ml-3">
                                    <span className="text-base font-medium text-gray-700 dark:text-gray-100">{item.name}</span>
                                    <p className="text-sm text-gray-500 dark:text-gray-200">{item.description}</p>
                                  </div>
                                </a>
                                </Link>
                              ))}
                              {/* {options.map((item) => (
                                <Link className="col-span-2" href={item.href}>
                                <a
                                  key={item.name}
                                  className="-m-3 pl-2 py-2 flex items-center rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 bg-white dark:bg-gray-800 outline-none"
                                >
                                  <item.icon className="flex-shrink-0 h-6 w-6 text-green-500" aria-hidden="true" />
                                  <div className="ml-3">
                                    <span className="text-base font-medium text-gray-700 dark:text-gray-100">{item.name}</span>
                                    <p className="text-sm text-gray-500 dark:text-gray-200">{item.description}</p>
                                  </div>
                                </a>
                                </Link>
                              ))} */}
                            </div>
                          </div>
                        </Popover.Panel>
                      </Transition>
                    </>
                  )}
                </Popover>
                
                {(data === null) ? ("") : (
                
                <Link href="/profile">
                  <a className="text-base font-medium text-gray-500 dark:text-gray-100 hover:text-gray-900 cursor-pointer">
                    Profile
                  </a>
                </Link>

                )}

                <Link href="/new-post">
                  <a className="text-base font-medium text-gray-500 dark:text-gray-100 hover:text-gray-900 cursor-pointer">
                    New Post
                  </a>
                </Link>

                {(data === null) ? (<LoginButton />) : (<Logined userdata={data} />)}
                {/* <button
                  aria-label="Toggle Dark Mode"
                  type="button"
                  className="focus:outline-none"
                  onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
                >
                  {mounted && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      stroke="currentColor"
                      className="w-4 h-4 text-gray-800 dark:text-gray-200"
                    >
                      {resolvedTheme === 'dark' ? (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                      ) : (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                        />
                      )}
                    </svg>
                  )}
                </button> */}
              </Popover.Group>
            </div>
          </div>

          <Transition
            show={open}
            as={Fragment}
            enter="duration-200 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="duration-100 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Popover.Panel
              focus
              static
              className="absolute w-full -top-7 md:hidden"
            >
              <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white dark:bg-gray-800 divide-y-2 divide-gray-50">
                <div className="bg-white dark:bg-gray-800 pt-4 pb-8 px-3 relative">
                  <div className="bg-white dark:bg-gray-800 -mr-2 absolute right-5">
                    <Popover.Button className="bg-white dark:bg-gray-800 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none">
                      <span className="sr-only">Close menu</span>
                      <XIcon className="h-6 w-6 dark:text-white dark:bg-gray-800" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                  <div className="mt-6 dark:bg-gray-800 px-5">
                    <nav className="grid gap-y-6 dark:bg-gray-800 outline-none">
                      <span className="text-xl font-medium dark:text-gray-100 text-gray-500">Quick Links</span>
                      {/* {options.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className="transition duration-200 ease-in-out -m-2 p-3 flex items-center rounded-md dark:text-gray-100 dark:hover:bg-gray-700 hover:bg-gray-50 outline-none"
                        >
                          <item.icon className="flex-shrink-0 h-6 w-6 text-green-500" aria-hidden="true" />
                          <div className="ml-3">
                            <span className="text-base font-medium text-gray-700 dark:text-gray-100">{item.name}</span>
                            <p className="text-sm text-gray-500 dark:text-gray-200">{item.description}</p>
                          </div>
                        </a>
                      ))} */}
                    </nav>
                  </div>
                  <div className="mt-6 bg-white dark:bg-gray-800 px-5">
                    <nav className="grid gap-y-6 bg-white dark:bg-gray-800 outline-none">
                      <span className="text-xl font-medium dark:text-gray-100 text-gray-500">Browse</span>
                      {partners.map((item) => (
                        <Link href={item.href}>
                        <a
                          key={item.name}
                          className="transition duration-200 ease-in-out -m-2 p-3 flex items-center rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 bg-white dark:bg-gray-800 outline-none"
                        >
                          <item.icon className="flex-shrink-0 h-6 w-6 text-green-500" aria-hidden="true" />
                          <div className="ml-3">
                            <span className="text-base font-medium text-gray-700 dark:text-gray-100">{item.name}</span>
                            <p className="text-sm text-gray-500 dark:text-gray-200">{item.description}</p>
                          </div>
                        </a>
                        </Link>
                      ))}
                    </nav>
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
}