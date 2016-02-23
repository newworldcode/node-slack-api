"use strict"

const tape = require("tape")
const Node_slack = require("../index")

tape("All tests", test => {
  test.plan(3)

  // Create an instance.
  const instance = new Node_slack(process.env.SLACK_TEST_ACCESS_TOKEN.toString())

  instance.api.test((err, res) => {
    test.equal(res.ok, true, "Got okay from the Slack API.")
  })

  instance.api.test({ foo: "bar" }, (err, res) => {
    test.equal(res.ok, true, "Got okay from the Slack API with params.")
  })

  instance.usergroups.users.list({ usergroup: "S0604QSJC" }, (err, res) => {
    test.ok(res, "Got a response from the Slack API on a sub-method.")
  })
})
