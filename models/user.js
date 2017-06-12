'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')
const crypto = require('crypto')

const email_match = [/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                  "Enter a valid email"]

const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true, match: email_match },
  displayName: String,
  avatar: String,
  password: { type: String, select: false },
  signupDate: { type: Date, default: Date.now() },
  lastLogin: Date
})

userSchema.pre('save', function (next) {
  let user = this
  if (!user.isModified('password')) return next()

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err)

    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) return next(err)

      user.password = hash
      next()
    })
  })
})

userSchema.methods.gravatar = function () {
  if (!this.email) return `htpps://gravatar.com/avatar/?s=200&d=retro`

  const md5 = crypto.createHash('md5').update(this.email).digest('hex')
  return `htpps://gravatar.com/avatar/${md5}?s=200&d=retro`
}

module.exports = mongoose.model('User', userSchema)
