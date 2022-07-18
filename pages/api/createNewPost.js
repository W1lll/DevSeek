const knex = require('../../db')

export default async (req, res) => {
  const data = req.body
  let date = new Date()
  date = date.setDate(date.getDate() - 1)
  date = new Date(date).toISOString()
  let check = await knex('Posts')
    .select()
    .where({ userId: data.id })
    .where('date', '>=', date)
  .then(rows => {
    if (rows.length != 0) {
      res.status(401).json({ Err: "You have already made a post within the last 24 hours." })
      return
    } else async () => {
      let create = await knex('Posts')
      .insert({
        userId: data.id,
        type: data.role,
        description: data.description,
        payment: data.payment,
        fulfilled: 0,
        category: data.category,
        criteria: '',
      }).then( function (result) {
        res.status(200).json({ success: true })     // respond back to request
      })
    }
  })
}