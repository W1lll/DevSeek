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
  const discord = props.discord
  let developer, designer, busOwner, blank = false
  props = props.props
  const posts = JSON.parse(props.posts)
  const profile = JSON.parse(props.user)
  switch (profile.type) {
    case "":
      blank = true
      break
    case "Developer":
      developer = true
      break
    case "Designer":
      designer = true
      break
    case "Business Owner":
      busOwner = true
      break
  }

  const router = useRouter()
  const refreshData = () => {
    router.replace(router.asPath)
  }
  const Update = async e => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const formProps = Object.fromEntries(formData)
    updateBio(profile.userId, formProps.category, formProps.bio)
    .then(response => {
        if (response.status == 200) {
          refreshData()
          toast("Bio updated! ✅")
        } else {
          toast("Oops! Something went wrong... 😧")
        }
    })
  }

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
                <form onSubmit={Update}>
                  <label htmlFor="category" className="text-white text-opacity-70">I'm a...</label>
                  <select required name="category" className="w-full bg-gray-800 rounded-md px-2 py-2 my-2 border-solid border-white border-2 ring-0 ring-transparent outline-none border-opacity-50">
                    <option value="" disabled selected={blank}>Please choose an option</option>
                    <option selected={designer}>Designer</option>
                    <option selected={developer}>Developer</option>
                    <option selected={busOwner}>Business Owner</option>
                  </select>
                  <label htmlFor="bio" className="text-white text-opacity-70">Biography</label>
                  <textarea name="bio" maxLength="290" className="bg-gray-800 w-full my-2 relative h-24 p-2 mb-1.5 rounded-md resize-none text-white text-base text-opacity-60 ring-0 ring-transparent outline-none border-solid border-white border-2 border-opacity-50"
                    placeholder="Oops! This is pretty empty...">{(profile.bio == "") ? "" : profile.bio}</textarea>
                  <div className="rounded-md shadow">
                    <button type="submit"
                      className="transition duration-200 ease-in-out w-50 flex items-center justify-center
                                px-5 py-3 border border-transparent text-base font-medium rounded-md text-white 
                                bg-gray-900 dark:bg-gray-800 dark:hover:bg-gray-700 hover:bg-gray-800 md:py-3 md:text-base md:px-5"
                    >
                      Save
                      <ChevronRightIcon className="ml-2 h-4 w-4 text-gray-300"/>
                    </button>
                  </div>
                </form>
              </div>
            </Tab.Panel>

            <Tab.Panel>
              <ProfilePosts posts={posts} data={profile} discord={discord}/>
            </Tab.Panel>

            {/* <Tab.Panel>
            </Tab.Panel> */}

          </Tab.Panels>
        </Tab.Group>
      </div>
    </>
  )
}

async function updateBio(id, category, bio) {
  return await fetch("../api/updateBio", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({id: id, type: category, bio: bio})
  })
}