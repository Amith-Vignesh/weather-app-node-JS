const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const { title } = require('process');
const hbs = require('hbs');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// Define paths for express config
const viewPath = path.join(__dirname, '../templates/views');
const publicDirectoryPath = path.join(__dirname, '../public');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebar engine and views location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);


// Set up static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("/",( req, res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Amith Vignesh',
        year: new Date().getFullYear()
    });
})

app.get('/help',(req,res) =>{
    res.render('help',{
        title: 'Help page',
        email: 'support@gmail.com',
        year: "2023"
    })
})

app.use('/help', (req, res, next) => {
res.render('notFound',{
    title: '404',
    name: 'Help article not found',
    year: "2022"
})
});

app.get('/about',(req,res) => {
   res.render('about',{
       title: 'About Me',
       name: 'Amith Vignesh',
       year: "2022"
   });
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.use((req, res) => {
    res.render('notFound',{
        title: '404',
        name: 'Page not found',
        year: "2022"
    })
})



app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
})