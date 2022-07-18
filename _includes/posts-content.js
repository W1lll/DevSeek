import 'tailwindcss/tailwind.css'
import Link from 'next/link'
import FadeIn from 'react-fade-in'
import Tabs from 'components/postTabs'

export default function Profile(props) {
  const data = props.data
  return (
      <div className="max-w-5xl mx-auto select-none">
        <main className="mt-16 mx-auto max-w-md sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-5xl px-4 sm:px-6 sm:mt-10 md:mt-12 lg:mt-12 xl:mt-12">
            <div className="text-left">
              <FadeIn>
              <div className="grid w-full px-8">
                <Tabs posts={props.posts} data={data}/>
              </div>
              </FadeIn>
            </div>
        </main>
      </div>
  )
}