const knex = require('../../db')
import getDiscordProfile from './fetchDiscordFunction.js'

export async function getAllPosts(id) {
    return await knex('Posts')
      .select()
      .where({ fulfilled: 0 })
      .then(async (rows) => {
        for (const row of rows) {
          const userdata = await getDiscordProfile(row.userId)
          row.username = userdata.data.username
        }
        rows = JSON.stringify(rows)
        return {
          data: rows,
        }
      })
  }