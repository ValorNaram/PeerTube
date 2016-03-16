'use strict'

const checkErrors = require('./utils').checkErrors
const friends = require('../../lib/friends')
const logger = require('../../helpers/logger')

const reqValidatorsPod = {
  makeFriends: makeFriends,
  podsAdd: podsAdd
}

function makeFriends (req, res, next) {
  friends.hasFriends(function (err, has_friends) {
    if (err) {
      logger.error('Cannot know if we have friends.', { error: err })
      res.sendStatus(500)
    }

    if (has_friends === true) {
      // We need to quit our friends before make new ones
      res.sendStatus(409)
    } else {
      return next()
    }
  })
}

function podsAdd (req, res, next) {
  req.checkBody('data.url', 'Should have an url').notEmpty().isURL({ require_protocol: true })
  req.checkBody('data.publicKey', 'Should have a public key').notEmpty()

  logger.debug('Checking podsAdd parameters', { parameters: req.body })

  checkErrors(req, res, next)
}

// ---------------------------------------------------------------------------

module.exports = reqValidatorsPod
