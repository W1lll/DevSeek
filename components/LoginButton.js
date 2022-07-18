import 'tailwindcss/tailwind.css'
import {Button} from "semantic-ui-react"

export default function LoginButton() {
    return (
        <Button className="font-bold" onClick={() => {
            window.location.replace(`https://discord.com/api/oauth2/authorize?client_id=884506815843409960&redirect_uri=https%3A%2F%2Fdevseek.co.uk%2Fapi%2Fcallback&response_type=code&scope=identify%20email%20guilds%20connections`)
        }}>Login</Button>
    )
}