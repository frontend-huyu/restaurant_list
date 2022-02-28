// express setting
const express = require('express')
const app = express()
const port = 3000

// handlebars@3.0.0 setting
const exphbs = require('express-handlebars')
// restaurant list
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

// show restaurant cards
app.get('/homepage/restaurants/:id', (req, res) => {
  // console.log(req.params.id)
  const paramsId = req.params.id
  const restaurant = restaurantList.find(function (restaurant) {
    return restaurant.id.toString() === paramsId
  })
  res.render('show', { restaurant: restaurant })
})

// search for name or category

app.get('/search', (req, res) => {

  if (req.query.keywords === undefined) {
    res.redirect('/homepage')
    return
  }

  const keywords = req.query.keyword
  const keyword = req.query.keyword.trim().toLowerCase()

  const filterRestaurantList = restaurantList.filter(function (results) {
    return results.name.toLowerCase().includes(keyword) || results.name_en.toLowerCase().includes(keyword) || results.category.includes(keyword)
  })

  res.render('index', { restaurants: filterRestaurantList, keyword: keywords })
})

// Listen the server when it started
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}/homepage`)
})