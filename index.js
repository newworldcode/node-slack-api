"use strict"

// Get tools and utilities.
const Joi = require("joi")
const utils = require("./lib/utils")
const endpoints = require("./lib/api")

class Node_Slack {
  /**
   * Register all the endpoints in `./lib/api.js`
   * and their validations.
   * @param  {String} access_token to use for all requests.
   * @return {void}
   */
  constructor(access_token) {
    // Add the token to this instance but
    // don't make it enumerable.
    Object.defineProperty(this, "token", {
      value: access_token.toString(),
      enumerable: false
    })

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
            // If it's a Joi object, there's no sub-methods.
            if (endpoints[method_group][method_name].isJoi) {
              this.register_method(method_group, method_name)
            }
            // Otherwise, register the sub-methods.
            else {
              this[method_group][method_name] = Object.create(null)
              Object
                .keys(endpoints[method_group][method_name])
                .forEach(sub_method_name => this.register_sub_method(method_group, method_name, sub_method_name))
            }
          })
      })
  }

  /**
   * Register a method that isn't a sub-method
   * to this instance.
   * @param  {String} method_group to call the method on.
   * @param  {String} method_name to call.
   * @return {void}
   */
  register_method(method_group, method_name) {
    // Register the function with parameter validation.
    this[method_group][method_name] = (params, callback) => {
      // Check the order of the arguments, some endpoints
      // don't take parameters.
      if (!callback || params instanceof Function) {
        return utils.call_slack_api(this.token, `${method_group}.${method_name}`, params)
      }
      else {
        // Validate the incoming parameters with
        // the schema in `lib/api.js`.
        Joi.validate(params, endpoints[method_group][method_name], (err, values) => {
          if (err) {
            callback(err)
          }
          else {
            return utils.call_slack_api(this.token, `${method_group}.${method_name}`, values, callback)
          }
        })
      }
    }
  }

  /**
   * Register a method that is a sub-method
   * to this instance.
   * @param  {String} method_group to call the method on.
   * @param  {String} method_name to call the sub-method on.
   * @param  {String} sub_method_name to call.
   * @return {void}
   */
  register_sub_method(method_group, method_name, sub_method_name) {
    // Register the function with parameter validation.
    this[method_group][method_name][sub_method_name] = (params, callback) => {
      // Check the order of the arguments, some endpoints
      // don't take parameters.
      if (!callback && params instanceof Function) {
        return utils.call_slack_api(this.token, `${method_group}.${method_name}.${sub_method_name}`, callback)
      }
      else {
        // Validate the incoming parameters with
        // the schema in `lib/api.js`.
        Joi.validate(params, endpoints[method_group][method_name][sub_method_name], (err, values) => {
          if (err) {
            callback(err)
          }
          else {
            return utils.call_slack_api(this.token, `${method_group}.${method_name}.${sub_method_name}`, values, callback)
          }
        })
      }
    }
  }
}

module.exports = Node_Slack
