const knex = require('../../db')

export async function getUserPosts(id) {
    return await knex('Posts')
        .select()
        .where({ userId: id, fulfilled: 0 })
        .then(rows => {
            rows = JSON.stringify(rows)
            return {
                data: rows
            }
        })
}