'use strict'

const config = require('config')
const mongoose = require('mongoose')

const logger = require('../helpers/logger')

const dbname = 'peertube' + config.get('database.suffix')
const host = config.get('database.host')
const port = config.get('database.port')

const database = {
  connect: connect
}

function connect () {
  mongoose.connect('mongodb://' + host + ':' + port + '/' + dbname)
  mongoose.connection.on('error', function () {
    throw new Error('Mongodb connection error.')
  })

  mongoose.connection.on('open', function () {
    logger.info('Connected to mongodb.')
  })
}

// ---------------------------------------------------------------------------

module.exports = database
