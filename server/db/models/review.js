
const Sequelize = require('sequelize')

const db = require('../db')


const Review = db.define('Review',{
    review:{
        type: Sequelize.TEXT,
        allowNull:false
    },
    numOfStars:{
        type:Sequelize.INTEGER
    }
}) 

module.exports= Review