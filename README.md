# node-slack-api
Slack methods as they appear in the docs but as a Node API.

`npm i --save node-slack-api`

All methods documented on the [Slack website](https://api.slack.com/methods)

```js
const node_slack = require("node-slack-api")
const slack = new node_slack("YOUR_ACCESS_TOKEN")

slack.users.info({ user: "U1234567890" }, (err, response) => {
  console.log(err, response)

  /*
   null, {
      "ok": true,
      "user": {
        "id": "U023BECGF",
        "name": "bobby",
        "deleted": false,
        "color": "9f69e7",
        "profile": {
          "first_name": "Bobby",
          "last_name": "Tables",
          "real_name": "Bobby Tables",
          "email": "bobby@slack.com",
          "skype": "my-skype-name",
          "phone": "+1 (123) 456 7890",
          "image_24": "https:\/\/...",
          "image_32": "https:\/\/...",
          "image_48": "https:\/\/...",
          "image_72": "https:\/\/...",
          "image_192": "https:\/\/..."
        },
        "is_admin": true,
        "is_owner": true,
        "has_2fa": true,
        "has_files": true
      }
    }
   */
})
```
