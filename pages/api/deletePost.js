const knex = require('../../db')

export default async (req, res) => {
  const id = req.body.id
  let create = await knex('Posts')
    .where({ id: id})
    .update({ fulfilled: 1 })
    .then( function (result) {
      res.status(200).json({ success: true })     // respond back to request
   })
  }