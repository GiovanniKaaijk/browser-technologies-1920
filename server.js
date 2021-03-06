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
    console.log(req.body)
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
        console.log(req.session.user)
        if(req.body.javascript) {
            res.json({success: true, user: req.session.user})
        } else {
            res.redirect('/userData')
        }
    }
}

async function updateUser(req, res) {
    const hash = req.session.user.hash
    console.log(hash, req.body)
    
    try {
        const db = client.db('users')
        
        let dbHolder = ''
        if(req.url === '/register-user-data') {
            dbHolder = 'userdata'
        }
        if(req.url === '/register-minor-data') {
            dbHolder = 'minordata'
        }
        if(req.url === '/register-favorite-data') {
            dbHolder = 'favoritedata'
        }

        let data = {}
        Object.keys(req.body).forEach(item => {
            data[item] = req.body[item]
        })

        if(req.body.type !== undefined) {
            await db.collection('user').updateOne({hash: hash}, {$set: {[req.body.type]: req.body.data}}, {upsert: true})
        } else {
            await db.collection('user').updateOne({hash: hash}, {$set: {[dbHolder]: data}}, {upsert: true})
        }

        

        const hashData = await db.collection('user').findOne({hash: hash})
        req.session.user = hashData
        console.log(req.session.user)
    } catch(e) { 
        console.error(e)
    } finally {
        if(req.body.javascript) {
            res.json({success: true, user: req.session.user})
        }
        if(req.url === '/register-user-data') {
            res.redirect('/minorData')
        }
        if(req.url === '/register-minor-data') {
            res.redirect('/favorite')
        }
        if(req.url === '/register-favorite-data') {
            res.redirect(`/enquete/${hash}`)
        } 
    }
}


app.use(session({
	resave: false,
	saveUninitialized: true,
	secret: process.env.SESSION
}))

app.use('/public', express.static('public'))
    .use(bodyParser.urlencoded({ extended: true }))
    .use(bodyParser.json())
    .set("view engine", "ejs")
    .set("views", "views")
    .get('/', (req, res) => {
        console.log(req.params)
        res.redirect(`/enquete/${Math.floor(Math.random() * 100000)}`)
    })
    .get('/enquete/:id', async (req, res) => {
        const hash = req.params.id
        res.render('index', {
            hash: hash
        })
    })
    .post('/startEnquete', checkHash)
    .get('/userData', (req, res) => {
        console.log(req.session.user)
        const user = req.session.user
        res.render('userData', {
            hash: req.session.user.hash,
            user: user
        })
    })
    .post('/register-user-data', updateUser)
    .get('/minorData', (req, res) => {
        const user = req.session.user
        res.render('minorData', {
            hash: req.session.user.hash,
            user: user
        })
    })
    .post('/register-minor-data', updateUser)
    .get('/favorite', (req, res) => {
        const user = req.session.user
        console.log(user)
        res.render('favorite', {
            hash: req.session.user.hash,
            user: user
        })
    })
    .post('/register-favorite-data', updateUser)
    .get('/finish', (req, res) => {
        res.redirect(`/enquete/${req.session.user.hash}`)
    })

    
const port = process.env.PORT || 9090

app.listen(process.env.PORT || 9090, () => console.log(`Server is gestart op poort: ${port}`))