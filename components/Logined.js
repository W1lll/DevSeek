import 'tailwindcss/tailwind.css'
import { Button } from "semantic-ui-react"

export default function Logined({ userdata }) {
    return (
        <div>
            {/* <img
                src={`https://cdn.discordapp.com/avatars/${userdata.id}/${userdata.avatar}.png`}
                alt={userdata.username}
                width={300}
                height={300}
                style={{ borderRadius: '50%', position: 'relative', textAlign: 'center' }}
            /> */}
            <Button color='red' className="font-bold" onClick={() => {
                window.location.replace('/api/logout')
            }}>Logout</Button>
        </div>
    )
}