const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express()

const publicDirectoryPath = path.join(__dirname,'../public')
const viewspath = path.join(__dirname, '../templates/views')
const partialspath = path.join(__dirname, '../templates/partials')

app.set('view engine','hbs')
app.set('views', viewspath)

hbs.registerPartials(partialspath)

app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index', {
        tittle: 'Weather',
        name: 'Mohit'
    })
})

app.get('/help', (req, res)=>{
    res.render('help',{
        tittle: 'Help',
        name : 'Mohit Bhatt',
        helptext: 'Your Query will be solved '
    })
})

app.get('/about', (req, res)=>{
    res.render('about',{
        tittle: 'About Me',
        name : 'Mohit Bhatt'
    })
})

app.get('/products', (req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error:'Address is required'
        })
    }
    geocode(req.query.address, (error,{lattitude, longitude, location })=>{
        if(error){
            res.send({
                error
            })
        }
        forecast(lattitude, longitude, (error, forecastdata)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastdata,
                location,
                address: req.query.address
            })
        })
    })
    // res.send('Weather Page')
})

app.listen(3000, ()=>{
    console.log('Server is up on port 3000')
})