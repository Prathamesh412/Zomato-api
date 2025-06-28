const express = require('express')
const  mongoose  = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
const port = 3000|| process.env.PORT

// Middleware
app.use(cors())
app.use(bodyParser.json())


// MongoDB connection   
mongoose.connect('mongodb+srv://prathprabhu:N4NFA3sMmlGGRsRD@cluster0.9fj5ovn.mongodb.net/Zomato')
.then(() => {
    console.log('Connected to MongoDB')
})
.catch(err => {
    console.error('Error connecting to MongoDB:', err)
})

// Routes
app.get('/', (req, res) => res.send('Hello World!'))

// Importing routes
app.use('/location', require('./routes/location.routes'))
app.use('/mealTypes', require('./routes/mealTypes.routes'))
app.use('/orders', require('./routes/orders.routes'))
app.use('/restaurantMenu', require('./routes/restaurantMenu.routes'))
app.use('/restaurantData', require('./routes/restaurantData.routes'))

// Start the server
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

