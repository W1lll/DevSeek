import { useState } from 'react'
import 'tailwindcss/tailwind.css'
import { Tab } from '@headlessui/react'
import Settings from './Settings.js'
import Profile from './Profile.js'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Tabs(props) {
  const data = props.data
  const notify = () => toast("Oops! 😬 We're still working on this.\nCheck back later.")

  return (
    <>
      <ToastContainer
      hideProgressBar={true}
      position={"bottom-right"}
      bodyClassName={() => "text-gray-500 p-2"}
      />
      <div className="w-full max-w-lg py-4 sm:px-0">
        <Tab.Group>
          <Tab.List className="flex space-x-1 bg-transparent rounded-xl">
            <Tab
              key="Profile"
              className={({ selected }) =>
                classNames(
                  'w-32 py-2.5 text-sm leading-5 font-medium text-white/[0.15]',
                  'focus:outline-none',
                  selected
                    ? 'bg-transparent bg-opacity-80 text-white border-b-2 border-white border-solid'
                    : 'text-gray-500 hover:bg-white/[0.12] hover:text-white border-b-2 border-transparent border-solid'
                )
              }
            >
              Profile
            </Tab>
            <btn onClick={notify}>
            <Tab
              key="Settings"
              disabled
              className={({ selected }) =>
                classNames(
                  'w-32 py-2.5 text-sm leading-5 font-medium text-white/[0.15]',
                  'focus:outline-none',
                  selected
                    ? 'bg-transparent bg-opacity-80 text-white border-b-2 border-white border-solid'
                    : 'text-gray-500 hover:bg-white/[0.12] border-b-2 border-transparent border-solid cursor-default'
                )
              }
            >
              Settings
            </Tab>
            </btn>
          </Tab.List>
          <Tab.Panels className="mt-2">

            <Tab.Panel>
              <Profile/>
            </Tab.Panel>

            <Tab.Panel>
              <Settings/>
            </Tab.Panel>

          </Tab.Panels>
        </Tab.Group>
      </div>
    </>
  )
}
