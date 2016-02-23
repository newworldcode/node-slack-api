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
  },

  im: {
    close: Joi.object({ channel: Joi.string().required() }),
    history: Joi.object({
      channel: Joi.string().required(),
      latest: Joi.number(),
      oldest: Joi.number().default(0),
      inclusive: Joi.number().default(0),
      count: Joi.number().default(100),
      unreads: Joi.number().default(0)
    }),
    list: Joi.object(),
    mark: Joi.object({
      channel: Joi.string().required(),
      ts: Joi.number().required()
    }),
    open: Joi.object({
      user: Joi.string().required()
    })
  },

  mpim: {
    close: Joi.object({ channel: Joi.string().required() }),
    history: Joi.object({
      channel: Joi.string().required(),
      latest: Joi.number(),
      oldest: Joi.number().default(0),
      inclusive: Joi.number().default(0),
      count: Joi.number().default(100),
      unreads: Joi.number().default(0)
    }),
    list: Joi.object(),
    mark: Joi.object({
      channel: Joi.string().required(),
      ts: Joi.number().required()
    }),
    open: Joi.object({
      users: Joi.string().required()
    })
  },

  oauth: {
    access: Joi.object({
      client_id: Joi.string().required(),
      client_secret: Joi.string().required(),
      code: Joi.string().required(),
      redirect_uri: Joi.string().uri()
    })
  },

  pins: {
    add: Joi.object({
      channel: Joi.string().required(),
      file: Joi.string(),
      file_comment: Joi.string(),
      timestamp: Joi.number()
    }),
    list: Joi.object({ channel: Joi.string().required() }),
    remove: Joi.object({
      channel: Joi.string().required(),
      file: Joi.string(),
      file_comment: Joi.string(),
      timestamp: Joi.number()
    })
  },

  reactions: {
    add: Joi.object({
      name: Joi.string().required(),
      file: Joi.string(),
      file_comment: Joi.string(),
      timestamp: Joi.number(),
      channel: Joi.string()
    }),
    get: Joi.object({
      full: Joi.boolean(),
      file: Joi.string(),
      file_comment: Joi.string(),
      timestamp: Joi.number(),
      channel: Joi.string()
    }),
    list: Joi.object({
      user: Joi.string(),
      full: Joi.boolean(),
      count: Joi.number().default(100),
      page: Joi.number().default(1)
    }),
    remove: Joi.object({
      name: Joi.string().required(),
      file: Joi.string(),
      file_comment: Joi.string(),
      timestamp: Joi.number(),
      channel: Joi.string()
    })
  },

  rtm: {
    start: Joi.object({
      simple_latest: Joi.boolean(),
      no_unreads: Joi.boolean(),
      mpim_aware: Joi.boolean()
    })
  },

  search: {
    all: Joi.object({
      query: Joi.string().required(),
      sort: Joi.string().valid("score", "timestamp"),
      sort_dir: Joi.string().valid("asc", "desc").default("desc"),
      highlight: Joi.number(),
      count: Joi.number().default(20),
      page: Joi.number().default(1)
    }),
    files: Joi.object({
      query: Joi.string().required(),
      sort: Joi.string().valid("score", "timestamp"),
      sort_dir: Joi.string().valid("asc", "desc").default("desc"),
      highlight: Joi.number(),
      count: Joi.number().default(20),
      page: Joi.number().default(1)
    }),
    messages: Joi.object({
      query: Joi.string().required(),
      sort: Joi.string().valid("score", "timestamp"),
      sort_dir: Joi.string().valid("asc", "desc").default("desc"),
      highlight: Joi.number(),
      count: Joi.number().default(20),
      page: Joi.number().default(1)
    })
  },

  stars: {
    add: Joi.object({
      file: Joi.string(),
      file_comment: Joi.string(),
      channel: Joi.string(),
      time: Joi.number()
    }),
    list: Joi.object({
      user: Joi.string(),
      count: Joi.number().default(100),
      page: Joi.number().default(1)
    }),
    remove: Joi.object({
      file: Joi.string(),
      file_comment: Joi.string(),
      channel: Joi.string(),
      time: Joi.number()
    })
  },

  team: {
    accessLogs: Joi.object({
      count: Joi.number().default(100),
      page: Joi.number().default(1)
    }),
    info: Joi.object(),
    integrationLogs: Joi.object({
      service_id: Joi.string(),
      app_id: Joi.string(),
      user: Joi.string(),
      change_type: Joi.string(),
      count: Joi.number().default(100),
      page: Joi.number().default(1)
    })
  },

  usergroups: {
    create: Joi.object({
      name: Joi.string().required(),
      handle: Joi.string(),
      description: Joi.string(),
      channels: Joi.string(),
      include_count: Joi.number()
    }),
    disable: Joi.object({
      usergroup: Joi.string().required(),
      include_count: Joi.number()
    }),
    enable: Joi.object({
      usergroup: Joi.string().required(),
      include_count: Joi.number()
    }),
    list: Joi.object({
      include_count: Joi.number(),
      include_users: Joi.number(),
      include_disabled: Joi.number()
    }),
    update: Joi.object({
      usergroup: Joi.string().required(),
      name: Joi.string().required(),
      handle: Joi.string(),
      description: Joi.string(),
      channels: Joi.string(),
      include_count: Joi.number()
    }),

    users: {
      list: Joi.object({
        usergroup: Joi.string().required(),
        include_disabled: Joi.number()
      }),
      update: Joi.object({
        usergroup: Joi.string().required(),
        users: Joi.string().required(),
        include_count: Joi.number()
      })
    }
  },

  users: {
    getPresence: Joi.object({ user: Joi.string().required() }),
    info: Joi.object({ user: Joi.string().required() }),
    list: Joi.object({ presence: Joi.number() }),
    setActive: Joi.object(),
    setPresence: Joi.object({ presence: Joi.string().valid("auto", "away") })
  }
}
