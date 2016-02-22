"use strict"

/**
 * Make a call to the Slack api with any extra
 * query parameters.
 *
 * @param  {String}   method from https://api.slack.com/methods
 * @param  {String|Function}   query_string or callback to execute when done.
 * @param  {Function} done callback to execute when requests finishes.
 * @return {Promise} promise for further processing.
 */
function call_slack_api(access_token, method, query_string, done) {
  // Get tools.
  const request = require("request")

  // The default values.
  let callback = done
  let query = ""

  // Check the arguments if we got a query string
  // or just a callback.
  if (!callback && query_string instanceof Function) {
    callback = query_string
  }
  else {
    query = query_string
  }

  // Call the api and return the promise.
  return request(`https://slack.com/api/${method}?token=${access_token}${query}`, (err, _, response_text) => {
    // Parse the response.
    const res = JSON.parse(response_text)

    // Check for errors.
    if (err) {
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

module.exports.call_slack_api = call_slack_api
