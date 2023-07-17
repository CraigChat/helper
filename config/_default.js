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
      maxShards: 1,
      messageLimit: 0,
      intents: ['guilds', 'guildMessages', 'messageContent']
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
