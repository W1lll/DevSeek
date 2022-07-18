import 'tailwindcss/tailwind.css'
import Link from 'next/link'
import FadeIn from 'react-fade-in'
import Tabs from 'components/otherProfileTabs'

export default function Profile(props) {
  const userData = JSON.parse(props.user)
  const userPosts = JSON.parse(props.posts)
  const discordData = props.discord
  return (
      <div className="max-w-5xl mx-auto select-none">
        <main className="mt-16 mx-auto max-w-md sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-5xl px-4 sm:px-6 sm:mt-10 md:mt-12 lg:mt-12 xl:mt-12">
            <div className="text-left">
              <FadeIn>
              <div className="grid w-full px-8">
                <h1 className="font-bold text-3xl">
                    Currently Viewing: <span className="font-bold text-green-500">{discordData.username}#{discordData.discriminator}</span>
                </h1>
                <Tabs props={props} details={props.details} discord={discordData}/>
              </div>
              </FadeIn>
            </div>
        </main>
      </div>
  )
}
