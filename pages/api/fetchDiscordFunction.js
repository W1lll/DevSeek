import fetch from 'node-fetch'

export default async function getDiscordProfile(id) {
    return await fetch(`https://discord.com/api/v8/users/${id}`, {
        headers: {
            Authorization: `Bot ${process.env.TOKEN}`
        }
    })
    .then(res => res.json())
    .then(res => {
        return {
            data: res
        }
    })
}