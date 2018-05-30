const express = require('express')
const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')
const utils = require('utility')

Router.get('/list', function(req, res) {
  // User.remove({}, function(req, res) {})
  User.find({}, function(err, doc) {
    return res.json(doc)
  })
})
// 登录接口
Router.post('/login', function(req, res) {
  const { user, pwd } = req.body
  User.findOne({ user, pwd: md5Pwd(pwd) }, { 'pwd': 0 }, function(err, doc) {
    if (!doc) {
      return res.json({ code: 1, msg: '用户名或者密码错误' })
    }
    return res.json({ code: 0, data: doc })
  })
})
// 注册接口
Router.post('/register', function(req, res) {
  const { user, pwd, type } = req.body
  User.findOne({ user }, function(err, doc) {
    if (doc) {
      return res.json({ code: 1, msg: '用户名重复' })
    }
    User.create({ user, type, pwd: md5Pwd(pwd) }, function(err, doc) {
      if (err) {
        return res.json({ code: 1, msg: '后端出错了' })
      }
      return res.json({ code: 0 })
    })
  })
})
Router.get('/info', function(req, res) {
  // 用户有没有cookie
  return res.json({code: 1})
})

// md5 加盐 多次加密
function md5Pwd(pwd) {
  const salt = 'wang-love-8080-HTTP@#$~~'
  return utils.md5(utils.md5(pwd + salt))
}

module.exports = Router