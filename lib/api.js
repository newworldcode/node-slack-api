"use strict"

// Get tools.
const Joi = require("joi")

// Schemas that aren't endpoints.
const attachments_schema = Joi.object({
  fallback: Joi.string().required(),
  color: Joi.string(),
  pretext: Joi.string(),
  author_name: Joi.string(),
  author_link: Joi.string().uri(),
  author_icon: Joi.string().uri(),
  title: Joi.string(),
  title_link: Joi.string().uri(),
  text: Joi.string(),
  fields: Joi.array().items(Joi.object(
    {
      title: Joi.string(),
      value: Joi.string(),
      short: Joi.boolean()
    }
  )),
  image_url: Joi.string().uri(),
  thumb_url: Joi.string().uri()
})

// Endpoints.
module.exports = {
  api: {
    test: Joi
      .object({ error: Joi.string() })
      .unknown(true)
      .without("error", [])
  },

  auth: {
    test: Joi.object({})
  },

  channels: {
    archive: Joi.object({ channel: Joi.string().required() }),
    create: Joi.object({ name: Joi.string().required() }),
    history: Joi.object({
      channel: Joi.string().required().required(),
      latest: Joi.alternatives().try(
        Joi.number(),
        Joi.string().valid("now").default("now")
      ),
      oldest: Joi.alternatives().try(
        Joi.number().default(0)
      ),
      inclusive: Joi.number().default(0),
      count: Joi.number().default(100),
      unreads: Joi.number().default(0)
    }),
    info: Joi.object({ channel: Joi.string().required() }),
    invite: Joi.object({
      channel: Joi.string().required(),
      user: Joi.string().required()
    }),
    join: Joi.object({ name: Joi.string().required() }),
    kick: Joi.object({
      channel: Joi.string().required(),
      user: Joi.string().required()
    }),
    leave: Joi.object({ channel: Joi.string().required() }),
    list: Joi.object({ exclude_archived: Joi.number().default(0) }),
    mark: Joi.object({
      channel: Joi.string().required(),
      ts: Joi.number().required()
    }),
    rename: Joi.object({
      channel: Joi.string().required(),
      name: Joi.string().required()
    }),
    setPurpose: Joi.object({
      channel: Joi.string().required(),
      purpose: Joi.string().required()
    }),
    setTopic: Joi.object({
      channel: Joi.string().required(),
      topic: Joi.string().required()
    }),
    unarchive: Joi.object({ channel: Joi.string().required() })
  },

  chat: {
    delete: Joi.object({
      channel: Joi.string().required(),
      ts: Joi.number().required()
    }),
    postMessage: Joi.object({
      channel: Joi.string().required(),
      text: Joi.string().required(),
      username: Joi.string(),
      as_user: Joi.boolean(),
      parse: Joi.string().valid("full", "none"),
      link_names: Joi.number().default(1),
      attachments: Joi.array().items(attachments_schema),
      unfurl_links: Joi.boolean().default(true),
      unfurl_media: Joi.boolean().default(false),
      icon_url: Joi.string(),
      icon_emoji: Joi.string()
    }).without("icon_url", ["icon_emoji"]),

    update: Joi.object({
      ts: Joi.number().required(),
      channel: Joi.string().required(),
      text: Joi.string().required(),
      attachments: Joi.array().items(attachments_schema),
      parse: Joi.string().valid("full", "none"),
      link_names: Joi.number().default(1)
    })
  },

  dnd: {
    endDnd: Joi.object(),
    endSnooze: Joi.object(),
    info: Joi.object({
      user: Joi.string()
    }),
    setSnooze: Joi.object({
      num_minutes: Joi.number().required()
    }),
    teamInfo: Joi.object({
      users: Joi.string()
    })
  },

  emoji: {
    list: Joi.object()
  },

  files: {
    comments: {
      add: Joi.object({
        file: Joi.string().required(),
        comment: Joi.string().required()
      }),
      delete: Joi.object({
        file: Joi.string().required(),
        id: Joi.string().required()
      }),
      edit: Joi.object({
        id: Joi.string().required(),
        file: Joi.string().required(),
        comment: Joi.string().required()
      })
    },

    delete: Joi.object({
      file: Joi.string().required()
    }),

    list: Joi.object({
      user: Joi.string(),
      channel: Joi.string(),
      ts_from: Joi.number().default(0),
      ts_to: Joi.number(),
      types: Joi.string().regex(/(all|posts|snippets|images|gdocs|zips|pdfs), ?/gi).default("all"),
      count: Joi.number().default(100),
      page: Joi.number().default(1)
    }),

    upload: Joi.object({
      file: Joi.string().required(),
      content: Joi.string(),
      filetype: Joi.string(),
      filename: Joi.string().required(),
      title: Joi.string(),
      initial_comment: Joi.string(),
      channels: Joi.string()
    })
  },

  groups: {
    archive: Joi.object({ channel: Joi.string().required() }),
    close: Joi.object({ channel: Joi.string().required() }),
    create: Joi.object({ name: Joi.string().required() }),
    createChild: Joi.object({ channel: Joi.string().required() }),
    history: Joi.object({
      channel: Joi.string().required(),
      latest: Joi.number(),
      oldest: Joi.number().default(0),
      inclusive: Joi.number().default(0),
      count: Joi.number().default(100),
      unreads: Joi.number().default(0)
    }),
    info: Joi.object({ channel: Joi.string().required() }),
    invite: Joi.object({
      channel: Joi.string().required(),
      user: Joi.string().required()
    }),
    kick: Joi.object({
      channel: Joi.string().required(),
      user: Joi.string().required()
    }),
    leave: Joi.object({ channel: Joi.string().required() }),
    list: Joi.object({
      exclude_archived: Joi.number().default(0)
    }),
    mark: Joi.object({
      channel: Joi.string().required(),
      ts: Joi.number().required()
    }),
    open: Joi.object({ channel: Joi.string().required() }),
    rename: Joi.object({
      channel: Joi.string().required(),
      name: Joi.string().required()
    }),
    setPurpose: Joi.object({
      channel: Joi.string().required(),
      purpose: Joi.string().required()
    }),
    setTopic: Joi.object({
      channel: Joi.string().required(),
      purpose: Joi.string().required()
    }),
    unarchive: Joi.object({ channel: Joi.string().required() })
  }
}
