import 'tailwindcss/tailwind.css'
import DefaultLayout from '@layouts/default'
import Index from '@includes/index-content'
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
    }
    return {
        props: {
            user: key
        }
    }
}

export default function Home(props) {
    const {theme, setTheme} = useTheme()
    return (
        <DefaultLayout user={props.user} title={"DevSeek"} description={"DevSeek"}>
            <Index/>
        </DefaultLayout>
    )
}