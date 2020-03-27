const express = require("express")
const session = require("express-session")
const bodyParser = require('body-parser')
const app = express()
require('dotenv').config()
const path = require('path')
//const mongo = require('./modules/mongo')

const MongoClient = require('mongodb').MongoClient;
const uri = process.env.MONGO_URI
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })

async function checkHash (req, res) { 

    const hash = req.body.hash
    
    let userData
    try {
        await client.connect()
        const db = client.db('users')
        const hashData = await db.collection('user').findOne({hash: hash})

        userData = hashData
        if(hashData === null) {
            await db.collection('user').insertOne({
                hash: hash,
                data: {}
            })
            userData = await db.collection('user').findOne({hash: hash})
        }

        req.session.user = userData
    } catch(e) { 
        console.error(e)
    } finally {
        res.json({success: true, user: req.session.user})
        // res.redirect('/userData')
    }
}

async function updateUser(req, res) {
    const hash = req.session.user.hash
    console.log(hash, req.body)
    
    try {
        const db = client.db('users')
        
        // let dbHolder = ''
        // if(req.url === '/register-user-data') {
        //     dbHolder = 'userdata'
        // }
        // if(req.url === '/register-minor-data') {
        //     dbHolder = 'minordata'
        // }

        // let data = {}
        // Object.keys(req.body).forEach(item => {
        //     data[item] = req.body[item]
        // })

        await db.collection('user').updateOne({hash: hash}, {$set: {[req.body.type]: req.body.data}}, {upsert: true})

        const hashData = await db.collection('user').findOne({hash: hash})
        req.session.user = hashData
        console.log(req.session.user)
    } catch(e) { 
        console.error(e)
    } finally {
        res.json({success: true, user: req.session.user})
        //res.redirect('/minorData')
    }
}


app.use(session({
	resave: false,
	saveUninitialized: true,
	secret: process.env.SESSION
}))

app.use('/public', express.static('public'))
    .use(bodyParser.urlencoded({ extended: true }))
    .set("view engine", "ejs")
    .set("views", "views")
    .get('/', (req, res) => {
        console.log(req.params)
        res.render('404')
    })
    .get('/enquete/:id', async (req, res) => {
        const hash = req.params.id
        const url = req.protocol + '://' + req.get('host') + req.originalUrl
        res.render('index', {
            hash: hash,
            url: url
        })
    })
    .post('/startEnquete', checkHash)
    .get('/userData', (req, res) => {
        console.log(req.session.user)
        const url = req.protocol + '://' + req.get('host') + req.originalUrl
        const user = req.session.user
        res.render('userData', {
            hash: req.session.user.hash,
            url: url,
            user: user
        })
    })
    .post('/register-user-data', updateUser)
    .get('/minorData', (req, res) => {
        const url = req.protocol + '://' + req.get('host') + req.originalUrl
        const user = req.session.user
        res.render('minorData', {
            hash: req.session.user.hash,
            url: url,
            user: user
        })
    })
    .post('/register-minor-data', updateUser)

const port = 9090
app.listen(port, () => console.log(`Server is gestart op poort: ${port}`))