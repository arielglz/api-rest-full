module.exports = {
  port: process.env.PORT || 3011,
  db: process.env.MONGODB || 'mongodb://localhost:27017/market',
  SECRET_TOKEN: 'miclavedetokens'
}
