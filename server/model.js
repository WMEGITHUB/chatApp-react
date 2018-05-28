const mongoose = require('mongoose')
//	链接mongo 
const DB_URL = 'mongodb://localhost:27017/imooc'
mongoose.connect(DB_URL)