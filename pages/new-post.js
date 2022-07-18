import 'tailwindcss/tailwind.css'
import DefaultLayout from '@layouts/default'
import NewPost from '@includes/new-post.js'
import {useTheme} from 'next-themes'
import jwt from 'jsonwebtoken'
import * as cookie from 'cookie'

export async function getServerSideProps(ctx) {
    let key = null
    try {
        const cookies = cookie.parse(ctx.req.headers.cookie)
        const user = cookies.token
        key = jwt.verify(user, process.env.JWT_KEY)
    } catch {
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
            user: key
        }
    }
}

export default function PostsPage(props) {
    const {theme, setTheme} = useTheme()
    return (
        <DefaultLayout user={props.user} title={"DevSeek"} description={"DevSeek"}>
            <NewPost user={props.user}/>
        </DefaultLayout>
    )
}