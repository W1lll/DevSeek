import { getUserProfile } from "./api/fetchProfile.js"
import { getDiscordProfile } from './api/fetchDiscord.js'
import { getUserPosts } from './api/fetchUserPosts.js'
import 'tailwindcss/tailwind.css'
import DefaultLayout from '@layouts/default'
import Profile from '@includes/profile-content'
import {useTheme} from 'next-themes'
import jwt from 'jsonwebtoken'
import * as cookie from 'cookie'
import React, {useEffect} from 'react'
import Router from 'next/router'

export async function getServerSideProps(ctx) {
    let key = null
    let userData = null
    let discordData = null
    let userPosts = null
    try {
        const cookies = cookie.parse(ctx.req.headers.cookie)
        const user = cookies.token
        key = jwt.verify(user, process.env.JWT_KEY)
        let id = key.id
        userData = (await getUserProfile(id)).data
        discordData = (await getDiscordProfile(id)).data
        userPosts = (await getUserPosts(id)).data
    } catch (err) {
        key = null
        return {
            redirect: {
              destination: 'https://discord.com/api/oauth2/authorize?client_id=884506815843409960&redirect_uri=https%3A%2F%2Fdevseek.co.uk%2Fapi%2Fcallback&response_type=code&scope=identify%20email%20guilds%20connections',
              permanent: false,
            },
        }
    }
    return {
        props: {
            user: userData,
            discord: discordData,
            posts: userPosts,
            key: key
        }
    }
}

export default function Home(props) {
    const userData = props.user
    const discordData = props.discord
    const userPosts = props.posts
    const {theme, setTheme} = useTheme()
    useEffect(() => { 
      if (props.user === null) {
        Router.push('/')
      }  
    }
    , [])
    return (
        <DefaultLayout user={props.user} title={"DevSeek"} description={"DevSeek"}>
            {(props.user === null) ? ("") : (<Profile user={userData} discord={discordData} posts={userPosts}/>)}
        </DefaultLayout>
    )
}