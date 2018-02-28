// spacing?! -- KHEA
const Sequelize = require('sequelize'); // lol -- semicolons -- KHEA

const db = require('../db')


const Category = db.define('Catagory',{ // you already changed me :D -- KHEA
    title:{
        type: Sequelize.STRING,
        allowNull:true //***  do I need to be here -- KHEA
    },
    description:{
        type:Sequelize.STRING
    }
}) 

module.exports=Category