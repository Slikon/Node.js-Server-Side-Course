const mongoose = require('mongoose')

const Dishes = require('./models/dishes')
const { db } = require('./models/dishes')

const url ='mongodb://localhost:27017/conFusion'
const connect = mongoose.connect(url, { useNewUrlParser: true })

connect.then((db) => {
    console.log('Succesfully connected to the server with url ' + url);

    Dishes.create({
        name: 'PayVay',
        description: 'test pizzeria'
    })
        .then((dish) => {
            console.log(dish + '\tsuccesfully saved');

            return Dishes.find({}).exec()
        })
        .then((dishes) =>{
            console.log(dishes);

            return Dishes.remove({})
        })
        .then(() => {
            return mongoose.connection.close()
        })
        .catch((err) => {
            console.log(err);
        })
})