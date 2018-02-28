
const Sequelize = require('sequelize')

const db = require('../db')


const Review = db.define('Review',{
    review:{ // fine, but consider `content` or `text` -- KHEA
        type: Sequelize.TEXT,
        allowNull:false // consider empty? -- KHEA
    },
    numOfStars:{ // stars. Range validation (1-5) -- KHEA
        type:Sequelize.INTEGER
    }
}) 

module.exports= Review