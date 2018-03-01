const Sequelize = require('sequelize')
const Address = require('./address')
const Cart = require('./cart')
const Category = require('./category')
const User = require('./user')
const Order = require('./order')
const Product = require('./product')
const ProductsInOrder = require('./productsInOrder')
const Review = require('./review')

Address.belongsTo(User) // Product.belongsTo(Category) //CategoryId on product

Cart.belongsTo(User)
Cart.hasMany(Product)

Category.hasMany(Product) //CategoryId on product

Order.belongsTo(User) //UserId on order
Order.belongsToMany(Product, { through: ProductsInOrder }) //ProductsInOrder join table

Product.hasMany(Review) //ProductId on review

ProductsInOrder.belongsTo(Order)
ProductsInOrder.belongsTo(Product)

User.hasMany(Cart)
User.hasMany(Address)
User.hasMany(Review)

Review.belongsTo(Product)  //UserId on review

module.exports = {
  User,
  Product,
  Category,
  Review,
  Order,
  Address,
  ProductsInOrder
}
