import Cookies from 'cookies'
import jwt from 'jsonwebtoken'
const knex = require('../../db')

export default async (req, res) => {
    const code = req.query.code
    const params = new URLSearchParams({
        client_id: process.env.CLIENT_ID,
        code,
        client_secret: process.env.CLIENT_SECRET,
        redirect_uri: 'https://devseek.co.uk/api/callback',
        grant_type: 'authorization_code',
        scope: 'identify email guilds'
    })
    const token = (await (await fetch(`https://discord.com/api/v8/oauth2/token`, {
        method: 'POST',
        body: params,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })).json())['access_token']
    const userinfo = (await (await fetch(`https://discord.com/api/v8/users/@me`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })).json())
    const check = await knex('Profiles')
    .select()
    .where({ userId: userinfo.id })
    if (check.length === 0) {
        await knex('Profiles')
        .insert({ userId: userinfo.id, type: '', bio: '', twitter: '', postCount: 0, associations: '' })
    }
    const user = jwt.sign(userinfo, process.env.JWT_KEY)
    const cookie = new Cookies(req, res)
    cookie.set('token', user, {
        httpOnly: false
    })
    res.redirect('../../profile')
}