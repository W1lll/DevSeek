import 'tailwindcss/tailwind.css'
import { Tab } from '@headlessui/react'
import Link from 'next/link'
import Markdown from 'markdown-to-jsx'
import ProfilePosts from './profilePosts.js'
import { data } from 'autoprefixer'
import {ChevronRightIcon} from '@heroicons/react/outline'
import { ToastContainer, toast } from 'react-toastify'
import fetch from 'node-fetch'
import { useRouter } from 'next/router'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Tabs(props) {
  const details = props.details
  props = props.props
  const discord = props.discord
  const posts = JSON.parse(props.posts)
  const profile = JSON.parse(props.user)

  return (
    <>
      <ToastContainer
      hideProgressBar={true}
      position={"bottom-right"}
      bodyClassName={() => "text-gray-500 p-2"}
      />
      <div className="w-full mt-3 max-w-3xl sm:px-0">
        <Tab.Group>
          <Tab.List className="flex space-x-1 bg-transparent rounded-xl">
            <Tab
              key="Profile"
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
              Profile
            </Tab>
            <Tab
              key="Posts"
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
              Posts
            </Tab>
            {/* <Tab
              key="Reviews"
              disabled
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
              Reviews
            </Tab> */}
          </Tab.List>
          <Tab.Panels className="mt-2 w-full">

            <Tab.Panel>
              <div className="my-4 p-3 w-full rounded-md">
                <h1 className="font-bold">About Me</h1>
                <h1>{(profile.type == null) ? "I haven't set my role yet!" : `I'm a ${profile.type}`}</h1>
                <div className="bg-gray-800 w-full mt-3 relative h-24 p-2 mb-1.5 rounded-md resize-none text-white text-base text-opacity-60 ring-0 ring-transparent outline-none border-solid border-white border-2 border-opacity-50">
                    {(profile.bio == "") ? "" : profile.bio}
                </div>
              </div>
            </Tab.Panel>

            <Tab.Panel>
              <ProfilePosts posts={posts} details={details} data={profile} discord={discord}/>
            </Tab.Panel>

            {/* <Tab.Panel>
            </Tab.Panel> */}

          </Tab.Panels>
        </Tab.Group>
      </div>
    </>
  )
}