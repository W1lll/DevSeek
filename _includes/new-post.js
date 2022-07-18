import 'tailwindcss/tailwind.css'
import Link from 'next/link'
import FadeIn from 'react-fade-in'
import {ChevronRightIcon} from '@heroicons/react/outline'
import { ToastContainer, toast } from 'react-toastify'
import fetch from 'node-fetch'

export default function NewPost(props) {
  const userData = props.user
  const createPost = async e => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const formProps = Object.fromEntries(formData)
    formProps['id'] = userData.id
    const response = await fetch("../api/createNewPost", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formProps)
    }).then(res => {
      if (res.status == 200) {
        Array.from(document.querySelectorAll("input")).forEach(
          input => (input.value = "")
        )
        Array.from(document.querySelectorAll("select")).forEach(
          select => (select.selectedIndex = 0)
        )
        toast("Post created! ✅")
      } else if (res.status == 401) {
        toast("⛔️ Looks like you have already made a post within the last 24 hours...")
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
      <div className="max-w-5xl mx-auto select-none">
        <main className="mt-16 mx-auto max-w-md sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-5xl px-4 sm:px-6 sm:mt-10 md:mt-12 lg:mt-12 xl:mt-12">
            <div className="text-left">
              <FadeIn>
              <div className="grid w-full px-8">
                <h1 className="font-bold text-3xl">
                    Create New Post
                </h1>
                <div className="mt-3">
                    <form onSubmit={createPost} className="w-full max-w-3xl grid grid-cols-3 gap-4">
                        <div className="col-span-3 w-full max-w-3xl">
                            <label htmlFor="description" className="text-white text-opacity-70">Description</label>
                            <textarea required type="text" placeholder="Describe your enquiry..." name="description" className="placeholder-gray-600 h-40 resize-none mt-1 w-full bg-gray-800 border-opacity-50 rounded-md px-2 py-1 border-solid border-white border-2 ring-0 ring-transparent outline-none"/>
                        </div>
                        <div className="col-span-1 w-full max-w-3xl">
                            <label htmlFor="category" className="text-white text-opacity-70">Category</label>
                            <select required name="category" className="w-full bg-gray-800 rounded-md px-2 py-2 border-solid border-white border-2 ring-0 ring-transparent outline-none border-opacity-50">
                              <option value="" disabled selected>Please choose an option</option>
                              <option>Hiring</option>
                              <option>Buying</option>
                              <option>Selling</option>
                            </select>
                        </div>
                        <div className="col-span-1 w-full max-w-3xl">
                            <label htmlFor="role" className="text-white text-opacity-70">Role</label>
                            <select required name="role" className="w-full bg-gray-800 rounded-md px-2 py-2 border-solid border-white border-2 ring-0 border-opacity-50 ring-transparent outline-none">
                              <option value="" disabled selected>Please choose an option</option>
                              <option>Developer</option>
                              <option>Designer</option>
                              <option>Business Owner</option>
                            </select>
                        </div>
                        <div className="col-span-1 w-full max-w-3xl">
                            <label htmlFor="payment" className="text-white text-opacity-70">Payment</label>
                            <input required type="text" placeholder="$4,500/m or equity" name="payment" className="placeholder-gray-600 w-full border-opacity-50 bg-gray-800 rounded-md px-2 py-1.5 border-solid border-white border-2 ring-0 ring-transparent outline-none"/>
                        </div>
                        <div className="rounded-md shadow">
                          <button
                            type="submit"
                            className="transition duration-200 ease-in-out w-50 flex items-center justify-center
                                      px-5 py-3 border border-transparent text-base font-medium rounded-md text-white 
                                      bg-gray-900 dark:bg-gray-800 dark:hover:bg-gray-700 hover:bg-gray-800 md:py-3 md:text-base md:px-5"
                          >
                            Submit
                            <ChevronRightIcon className="ml-2 h-4 w-4 text-gray-300"/>
                          </button>
                        </div>
                    </form>
                </div>
              </div>
              </FadeIn>
            </div>
        </main>
      </div>
    </>
  )
}