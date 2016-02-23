"use strict"

const Joi = require("joi")
const utils = require("./lib/utils")
const endpoints = require("./lib/api")

class Slack {
  constructor(token) {
    // Get the method groups.
    Object
      .keys(endpoints)
      .forEach(method_group => {
        // Extend this instance.
        this[method_group] = Object.create(null)

        // Add the methods.
        Object
          .keys(endpoints[method_group])
          .forEach(method_name => {
            // Register the function with parameter validation.
            this[method_group][method_name] = (params, callback) => {
              // Check the order of the arguments, some endpoints
              // don't take parameters.
              if (!callback && params instanceof Function) {
                return utils.call_slack_api(token, `${method_group}.${method_name}`, callback)
              }
              else {
                // Validate the incoming parameters with
                // the schema in `lib/api.js`.
                Joi.validate(params, endpoints[method_group][method_name], (err, values) => {
                  if (err) {
                    callback(err)
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
