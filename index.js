require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')

const PORT = process.env.APP_PORT
const router = require('./router/index')
const ErrMiddleware = require('./middleware/err-middle')

app.use(express.json())
app.use('/api', router)
app.use(cors())
app.use(express.static('static'))
app.use(ErrMiddleware)

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        );
        app.listen(PORT, () => {
            console.log(`DB start work and listen on ${PORT} port`)
        })
    } catch (e) {
        console.log(e)
    }
}

start()
