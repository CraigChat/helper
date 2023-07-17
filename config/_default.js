module.exports = {
  dexare: {
    token: '',

    erisOptions: {
      autoreconnect: true,
      allowedMentions: {
        everyone: false,
        roles: false,
        users: true
      },
      defaultImageFormat: 'png',
      defaultImageSize: 256,
      messageLimit: 0,
      gateway: {
        maxShards: 1,
        intents: ['guilds', 'guildMessages', 'messageContent'],
        requestTimeout: 15000
      }
    },

    elevated: ['158049329150427136'],

    prefix: ['?'],
    mentionPrefix: true,

    logger: {
      level: 'debug'
    }
  },
  commandsPath: './commands'
};
