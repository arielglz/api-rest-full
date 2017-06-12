const mongoose = require('mongoose')
const app = require('./app')

const config = require('./config')

mongoose.connect(config.db, (err, res) => {
  if (err) throw err
  console.log('Conexión a la base de datos realizada..')

  app.listen(config.port, () => {
    console.log(`API REST corriendo en http://localhost:${config.port}`)
  })
})
