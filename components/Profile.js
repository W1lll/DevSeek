import 'tailwindcss/tailwind.css'
import { Button } from "semantic-ui-react"
import Tabs from "./profileTabs.js"

export default function Profile(props) {
    return (
        <div className="my-4">
            <Tabs/>
        </div>
    )
}