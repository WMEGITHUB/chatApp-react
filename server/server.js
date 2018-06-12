import express from 'express'
// const express = require('express')
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import model from './model'
import path from 'path'

import React from 'react'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router-dom'
import App from '../src/app'
import reducers from '../src/reducer'

import { renderToString } from 'react-dom/server'
// React 组件 => div
// function App() {
// 	return (
// 		<div>
// 			<p>server render</p>
// 			<p>hello world</p>
// 		</div>
// 	)
// }

const Chat = model.getModel('chat')
const app = express()
// work with express
const server = require('http').Server(app)

const io = require('socket.io')(server)

io.on('connection', function(socket) {
	socket.on('sendmsg', function(data) {
		// console.log(data)
		// io.emit('recvmsg', data)
		const { from, to, msg } = data
		const chatid = [from, to].sort().join('_')
		Chat.create({ chatid, from, to, content: msg }, function(err, doc) {
			io.emit('recvmsg', Object.assign({}, doc._doc))
		})
	})
})

const userRouter = require('./user')

app.use(cookieParser())
app.use(bodyParser.json())
// 1. 购买域名
// 2. DNS解析到你服务器的IP
// 3. 安装nginx 并配置反向代理
// 4. 使用pm2管理node进程
app.use('/user', userRouter)
app.use(function(req, res, next) {
	if (req.url.startsWith('/user/') || req.url.startsWith('/static/')) {
		return next()
	}
	const store = createStore(reducers, compose(
		applyMiddleware(thunk)
	))
	let context = {}
	const markup = renderToString(
		<Provider store={store}>
			<StaticRouter
				location={req.url}
				context={context}>
        <App></App>
      </StaticRouter>
    </Provider>
	)
	return res.send(markup)
})
app.use('/', express.static(path.resolve('build')))
server.listen(9093, function() {
	console.log('Node app start at port 9093')
})



