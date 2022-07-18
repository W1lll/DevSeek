const knex = require('../../db')

export default async (req, res) => {
  const id = req.body.id
  const bio = req.body.bio
  const type = req.body.type
  let create = await knex('Profiles')
    .where({ userId: id})
    .update({ bio: bio, type: type })
    .then( function (result) {
      res.status(200).json({ success: true })     // respond back to request
   })
  }