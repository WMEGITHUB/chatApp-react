const mongoose = require('mongoose')
//	链接mongo 
const DB_URL = 'mongodb://localhost:27017/imooc'
mongoose.connect(DB_URL, { useMongoClient: true })
mongoose.connection.on('connected', function() {
  console.log('mongo connect success')
})

const models = {
  user: {
    'user': { type: String, require: true },
    'pwd': { type: String, require: true },
    'type': { type: String, require: true },
    // 头像
    'avatar': { type: String },
    // 个人简介或者职位简介
    'desc': { type: String },
    // 职位名
    'title': { type: String },
    // 如果是boss，还会有以下两个字段
    'company': { type: String },
    'money': { type: String }
  },
  chat: {
    'chatid': { type: String, require: true },
    'from': { type: String, require: true },
    'to': { type: String, require: true },
    'read': { type: Boolean, default: false },
    'content': { type: String, require: true, default: '' },
    'create_time': { type: Number, default: Date.now }
  }
}

for (let m in models) {
  mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
  getModel: function(name) {
    return mongoose.model(name)
  }
}