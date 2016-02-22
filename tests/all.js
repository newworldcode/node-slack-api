"use strict"

const tape = require("tape")
const Node_slack = require("../index")

tape("All tests", test => {
  const instance = new Node_slack("123")

  console.log(instance.channels.archive.toString())
})
