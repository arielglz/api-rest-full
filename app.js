'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const api = require('./routes/routes_api')
const path = require('path')
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.set('views', path.join(__dirname, './views/api'))
app.set('view engine', 'pug')

app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')))
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')))
app.use('/fonts', express.static(path.join(__dirname, '/node_modules/bootstrap/fonts')))
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')))

app.use('/api', api)
app.get('/', (req, res) => {
  res.render('product')
})
app.get('/login', (req, res) => {
  res.render('login')
})
app.get('/register', (req, res) => {
  res.render('register')
})

module.exports = app
