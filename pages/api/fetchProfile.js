const knex = require('../../db')

export async function getUserProfile(id) {
    return await knex('Profiles')
        .select()
        .where({ userId: id })
        .then(rows => {
            rows = JSON.stringify(rows[0])
            return {
                data: rows
            }
        })
}