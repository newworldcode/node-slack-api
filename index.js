"use strict"

const Joi = require("joi")
const utils = require("./lib/utils")
const endpoints = require("./lib/api")

class Slack {
  constructor(token) {
    Object
      .keys(endpoints)
      .forEach(method_group => {
        // Extend this instance.
        this[method_group] = Object.create(null)

        // Add the methods.
        Object
          .keys(endpoints[method_group])
          .forEach(method_name => {
            this[method_group][method_name] = (params, callback) => {
              if (!callback && params instanceof Function) {
                return utils.call_slack_api(token, `${method_group}.${method_name}`, callback)
              }
              else {
                Joi.validate(params, endpoints[method_group][method_name], (err, values) => {
                  if (err) {
                    throw err
                  }
                  else {
                    return utils.call_slack_api(token, `${method_group}.${method_name}`, values, callback)
                  }
                })
              }
            }
          })
      })
  }
}

module.exports = Slack
