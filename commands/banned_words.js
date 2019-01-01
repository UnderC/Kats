const command = require('../command')

module.exports = class extends command {
  constructor (client) {
    super(client)
    this.noBlack = true
  }

  async message (msg) {
    if (!msg.channel.nsfw) {
      this.redis.smembers(`${msg.guild.id}:bw`, (err, reply) => {
        if (err) {
          console.error(err)
        }

        if (reply === []) {
          return
        }

        this.redis.get(`${msg.guild.id}:bw:msg`, (err, replyy) => {
          if (err) {
            console.error(err)
          }

          if (replyy === '') {
            replyy = 'BANNED WORD!!!! / 금지 된 단어!!! {user}'
          }
          reply.forEach(i => {
            if (msg.content.includes(i.toLowerCase())) {
              msg.delete()
              msg.channel.send(replyy.replace('{user}', msg.author.toString()))
            }
          })
        })
      })
    }
  }

  messageUpdate (_, msg) {
    if (!msg.channel.nsfw) {
      this.redis.smembers(`${msg.guild.id}:bw`, (err, reply) => {
        if (err) {
          console.error(err)
        }

        if (!reply) {
          return
        }

        this.redis.get(`${msg.guild.id}:bw:msg`, (err, replyy) => {
          if (err) {
            console.error(err)
          }
          
          if (!replyy) {
            replyy = 'BANNED WORD!!!! / 금지 된 단어!!! {user}'
          }
          reply.forEach(i => {
            if (msg.content.includes(i.toLowerCase())) {
              msg.delete()
              msg.channel.send(replyy.replace('{user}', msg.author.toString()))
            }
          })
        })
      })
    }
  }
}