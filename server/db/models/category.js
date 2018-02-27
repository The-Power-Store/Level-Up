
const Sequelize = require('sequelize');

const db = require('../db')


const Category = db.define('Catagory',{
    title:{
        type: Sequelize.STRING,
        allowNull:true //*** */
    },
    description:{
        type:Sequelize.STRING
    }
}) 

module.exports=Category