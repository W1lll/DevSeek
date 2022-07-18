import { getUserProfile } from "../api/fetchProfile.js"
import { getDiscordProfile } from '../api/fetchDiscord.js'
import { getUserPosts } from '../api/fetchUserPosts.js'
import 'tailwindcss/tailwind.css'
import jwt from 'jsonwebtoken'
import * as cookie from 'cookie'
import DefaultLayout from '@layouts/default'
import Profile from '@includes/other-profile.js'

export async function getServerSideProps(ctx) {
    let id = ctx.params.user
    let key = null
    const userData = await getUserProfile(id)
    const discordData = await getDiscordProfile(id)
    const userPosts = await getUserPosts(id)
    try {
        const cookies = cookie.parse(ctx.req.headers.cookie)
        const user = cookies.token
        key = jwt.verify(user, process.env.JWT_KEY)
    } catch (err) {
        key = null
        console.log(err)
        return {
            redirect: {
              destination: 'https://discord.com/api/oauth2/authorize?client_id=884506815843409960&redirect_uri=https%3A%2F%2Fdevseek.co.uk%2Fapi%2Fcallback&response_type=code&scope=identify%20email%20guilds%20connections',
              permanent: false,
            },
        }
    }
    if (id == key.id) {
        return {
            redirect: {
            destination: '../../profile',
            permanent: false,
            },
        }
    }
    return {
        props: {
            details: key,
            user: userData.data,
            discord: discordData.data,
            posts: userPosts.data
        }
    }
}

export default function User(props) {
    const userData = props.user
    const discordData = props.discord
    const userPosts = props.posts
    return (
        <DefaultLayout user={props.details} title={"DevSeek"} description={"DevSeek"}>
            <Profile details={props.details} user={userData} discord={discordData} posts={userPosts}/>
        </DefaultLayout>
    )
}