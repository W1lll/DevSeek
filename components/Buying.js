import 'tailwindcss/tailwind.css'
import Link from "next/link"
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify'

export default function Buying(props) {
  const posts = props.posts
  const data = props.data
  let buyPosts = []
  posts.forEach((post) => {
    if (post.category == "Buying") {
      buyPosts.push(post)
    }
  })

  const router = useRouter()
  const refreshData = () => {
    router.replace(router.asPath)
  }
  async function Delete(id) {
    deletePost(id)
    .then(response => {
        if (response.status == 200) {
          refreshData()
          toast("Post deleted! ✅")
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
    <div className="my-4">
      <ul>
          {buyPosts.map((post) => (
            <>
            <li
              className="flex justify-center items-center w-full p-3 rounded-md hover:bg-gray-800 transition-all ease-in-out duration-200"
            >
              <div className="flex flex-col w-full">
                <h3 className="text-sm font-medium leading-5">
                  {post.description}
                </h3>

                <ul className="flex mt-1 space-x-1 text-xs font-normal leading-4">
                  <li className="font-bold text-green-300"><Link href={`/profiles/${post.userId}`}>{post.username}</Link></li>
                  <li>&middot;</li>
                  <li>{post.date.split('T')[0]}</li>
                  <li>&middot;</li>
                  <li>{post.type}</li>
                  <li>&middot;</li>
                  <li>{post.payment}</li>
                  {post.criteria.split(", ").map((criteria) => (
                    <>
                    <li>&middot;</li>
                    <li>{criteria}</li>
                    </>
                  ))}
                </ul>
              </div>
              {(data.id === post.userId) ? (
                <btn onClick={() => {Delete(post.id)}} className="cursor-pointer font-bold text-sm text-red-300">Delete</btn>
              ) : (
                ""
              )}
            </li>
            </>
          ))}
        </ul>
    </div>
    </>
  )
}

async function deletePost(id) {
    return await fetch("../api/deletePost", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({id: id})
    })
}