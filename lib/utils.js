"use strict"

/**
 * Convert an object to an escaped query string.
 * @param  {Object} object to query string-ise.
 * @return {String} Query string.
 */
function object_to_query_string(object) {
  const query_string = []

  Object
    .keys(object)
    .forEach(key => {
      query_string.push(`${key}=${escape(object[key])}`)
    })

  return query_string.join("&")
}

/**
 * Make a call to the Slack api with any extra
 * query parameters.
 *
 * @param  {String} access_token to authy with the api.
 * @param  {String} method from https://api.slack.com/methods
 * @param  {String|Function}   query_string or callback to execute when done.
 * @param  {Function} done callback to execute when requests finishes.
 * @return {Promise} promise for further processing.
 */
function call_slack_api(access_token, method, query_object, done) {
  // Get tools.
  const request = require("request")

  // The default values.
  let callback = done
  let query = ""

  // Check the arguments if we got a query string
  // or just a callback.
  if (!callback && query_object instanceof Function) {
    callback = query_object
  }
  else {
    query = object_to_query_string(query_object)
  }

  // If it's not the OAuth method, add the token.
  if (method.toLowerCase() !== "oauth.access") {
    query.token = access_token
  }

  // Call the api and return the promise.
  return request(`https://slack.com/api/${method}?${query}`, (err, _, response_text) => {
    // Parse the response.
    const res = JSON.parse(response_text)

    // Check for errors.
    if (err) {
      /* istanbul ignore next */
      callback(err)
    }
    // Check that Slack thinks the request was okay.
    else if (!res.ok) {
      callback(res)
    }
    // All good, keep going.
    else {
      callback(null, res)
    }
  })
}

// Export.
module.exports.call_slack_api = call_slack_api
module.exports.object_to_query_string = object_to_query_string
