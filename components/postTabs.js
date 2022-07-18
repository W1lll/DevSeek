import { useState } from 'react'
import 'tailwindcss/tailwind.css'
import { Tab } from '@headlessui/react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Hiring from './Hiring.js'
import Buying from './Buying.js'
import Selling from './Selling.js'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Tabs(props) {
  const data = props.data
  const posts = JSON.parse(props.posts.data)
  const notify = () => toast("Oops! 😬 We're still working on this.\nCheck back later.")

  return (
    <>
      <ToastContainer
      hideProgressBar={true}
      position={"bottom-right"}
      bodyClassName={() => "text-gray-500 p-2"}
      />
      <div className="w-full max-w-3xl sm:px-0">
        <Tab.Group>
          <Tab.List className="flex space-x-1 bg-transparent rounded-xl">
            <Tab
              key="Hiring"
              className={({ selected }) =>
                classNames(
                  'w-32 text-sm leading-5 font-medium text-white/[0.15]',
                  'focus:outline-none',
                  selected
                    ? 'text-green-300 border-b-2 border-green-600 border-solid'
                    : 'text-gray-500 hover:bg-white/[0.12] border-b-2 border-transparent border-solid'
                )
              }
            >
              Hiring
            </Tab>
            <Tab
              key="Buying"
              className={({ selected }) =>
                classNames(
                  'w-32 py-2.5 text-sm leading-5 font-medium text-white/[0.15]',
                  'focus:outline-none',
                  selected
                    ? 'text-green-300 border-b-2 border-green-600 border-solid'
                    : 'text-gray-500 hover:bg-white/[0.12] border-b-2 border-transparent border-solid'
                )
              }
            >
              Buying
            </Tab>
            <Tab
              key="Selling"
              className={({ selected }) =>
                classNames(
                  'w-32 py-2.5 text-sm leading-5 font-medium text-white/[0.15]',
                  'focus:outline-none',
                  selected
                    ? 'text-green-300 border-b-2 border-green-600 border-solid'
                    : 'text-gray-500 hover:bg-white/[0.12] border-b-2 border-transparent border-solid'
                )
              }
            >
              Selling
            </Tab>
          </Tab.List>
          <Tab.Panels className="mt-2">

            <Tab.Panel>
              <Hiring posts={posts} data={props.data}/>
            </Tab.Panel>

            <Tab.Panel>
              <Buying posts={posts} data={props.data}/>
            </Tab.Panel>

            <Tab.Panel>
              <Selling posts={posts} data={props.data}/>
            </Tab.Panel>

          </Tab.Panels>
        </Tab.Group>
      </div>
    </>
  )
}
