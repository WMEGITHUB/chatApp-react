import express from 'express'
// const express = require('express')
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import model from './model'
import path from 'path'
import csshook from 'css-modules-require-hook/preset'
import assethook from 'asset-require-hook'
assethook({
	extensions: ['png']
})
import React from 'react'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router-dom'
import App from '../src/app'
import reducers from '../src/reducer'

// import { renderToString } from 'react-dom/server'
import { renderToNodeStream } from 'react-dom/server'
import staticPath from '../build/asset-manifest.json'



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
	// const markup = renderToString(
	// 	<Provider store={store}>
	// 		<StaticRouter
	// 			location={req.url}
	// 			context={context}>
  //        <App></App>
  //      </StaticRouter>
  //    </Provider>
	// )
	const obj = {
		'/msg': 'React聊天消息列表',
		'/boss': 'React查看牛人列表'
	}
	res.write(
		`
			<!DOCTYPE html>
		<html lang="en">
		  <head>
		    <meta charset="utf-8">
		    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		    <meta name="theme-color" content="#000000">
		    <meta name="keywords" content="React, Redux, Chat, App, SSR" />
		    <meta name="keywords" content="${obj[req.url]}" />
		    <title>React App</title>
		    <link rel="stylesheet" href="/${staticPath['main.css']}" />
		  </head>
		  <body>
		    <noscript>
		      You need to enable JavaScript to run this app.
		    </noscript>
		    <div id="root">
		`
	)
	const markupStream = renderToNodeStream(
		<Provider store={store}>
			<StaticRouter
				location={req.url}
				context={context}>
        <App></App>
      </StaticRouter>
    </Provider>
	)
	markupStream.pipe(res, { end: false })
	markupStream.on('end', () => {
		res.write(
			`
				</div>
		  </body>
		  <script src="/${staticPath['main.js']}"></script>
		</html>
			`
		)
		res.end()
	})
	// const pageHtml = `
	// 	<!DOCTYPE html>
	// 	<html lang="en">
	// 	  <head>
	// 	    <meta charset="utf-8">
	// 	    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	// 	    <meta name="theme-color" content="#000000">
	// 	    <meta name="keywords" content="React, Redux, Chat, App, SSR" />
	// 	    <meta name="keywords" content="${obj[req.url]}" />
	// 	    <title>React App</title>
	// 	    <link rel="stylesheet" href="/${staticPath['main.css']}" />
	// 	  </head>
	// 	  <body>
	// 	    <noscript>
	// 	      You need to enable JavaScript to run this app.
	// 	    </noscript>
	// 	    <div id="root">${markup}</div>
	// 	  </body>
	// 	  <script src="/${staticPath['main.js']}"></script>
	// 	</html>
	// `
	// res.send(pageHtml)
})
app.use('/', express.static(path.resolve('build')))
server.listen(9093, function() {
	console.log('Node app start at port 9093')
})



