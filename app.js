// express setting
const express = require('express')
const app = express()
const port = 3000

// handlebars@3.0.0 setting
const exphbs = require('express-handlebars')
// restaurant's list
const restaurantList = require('./restaurant.json').results

//template engine setting
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// homepage setting
app.get('/homepage', (req, res) => {
  res.render('index', { restaurants: restaurantList })
})

// static files
app.use(express.static('public'))






// Listen the server when it started
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}/homepage`)
})