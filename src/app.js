const express = require('express')
const path = require('path')
const hbs = require('hbs')

const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

console.log(__dirname)
console.log(__filename)
console.log(path.join(__dirname, '../public'))


// set up path 
const app = express()
const port = process.env.PORT || 3000 //deploy

//define path
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory 
app.use(express.static(publicDirectoryPath))


app.get('', (req, res)=>{
    res.render('index', {
        title: "Weather App", 
        name: 'Jiali Duan', 
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About Me',
        name: 'Jiali Duan'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        title: 'Help',
        name: 'Jiali Duan',
        helpText: 'This is the NodeJS dynamic template'
    })
})


app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error: 'Address must be provided'
        })
    }

    // geocode
    geocode(req.query.address, (error, {latitude, longitude, location} = {})=>{ //destructuring of data object
        if(error){
            return res.send({
                error:error
            })
        }
        forecast(latitude, longitude, (error, data) => {  //destructuring of data object
            if(error) return res.send({error})
            res.send({
                weather_descriptions: data.weather_descriptions,
                temperature: data.temperature, 
                location: req.query.address,
                latitude: data.latitude,
                longitude: data.longitude,
                precipation: data.precipation,
                humidty: data.humidity,
                wind_speed: data.wind_speed, 
                observation_time: data.observation_time,
                localtime: data.localtime
            })
          })
    })
})

// chapter 8
app.get('/products', (req, res)=>{
    if(!req.query.search){
        return res.send({
            error: 'Must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

// setup 404 page
app.get('/help/*', (req, res)=>{
    res.render('404', {
        title: '404', 
        name: 'Jiali Duan', 
        errorMessage: 'Help article not found'
    })
})
app.get('*', (req, res)=>{
    res.render('404', {
        title: '404', 
        name: 'Jiali Duan', 
        errorMessage: 'Page not found',
    })
})
app.listen(port, ()=>{ //deploy
    console.log("Server is up on port " + port) 
})

