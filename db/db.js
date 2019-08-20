const mongoose = require('mongoose')

const options = {}
options['useNewUrlParser'] = true
options['useCreateIndex'] = true
options['useNewUrlParser'] = true

mongoose.connect(process.env.MONGO_URI, options).then(s=>console.log('db connected'))