const promise = require('bluebird')
const db = require('./server/db/db.js')
const {
    User,
    Product,
    Category,
    Review,
    Order,
    Address
} = require('./server/db/models/index.js')


const productData = {
    product: [{
        title: "Snow Dragon",
        description: 'a fierce creature',
        imageUrl: "https://images.duckduckgo.com/iu/?u=http%3A%2F%2Fimages2.fanpop.com%2Fimage%2Fphotos%2F13900000%2FDragon-Wallpaper-dragons-13975578-1280-800.jpg&f=1",
        price: 100000,
        stock: 5,
        category: 1, 
    }, {
        title: "Jerskey Wand",
        description: 'made from a piece of beef jerksey',
        imageUrl: "https://www.printingin3d.eu/pictures/2013/02-voldemort-wand/painted-voldemort-wand.JPG",
        price: 1000,
        stock: 5,
        category: 2, 
    },{
        title: "Fhire Dragon",
        description: 'spicy, like cheetos, but like will kill you',
        imageUrl: "https://wallpapercave.com/wp/McdCS6c.jpg",
        price: 1000,
        stock: 5,
        category: 2, 
    },{
        title: "Healing Potion",
        description: 'heals everything but paper cuts, stubbed toes and when you bite your tongue',
        imageUrl: "https://wtbpotions.com/wp-content/uploads/square-green-1.jpg",
        price: 4600,
        stock: 34,
        category: 3, 
    },{
        title: "Invisibility Potion",
        description: '...And they never saw him again',
        imageUrl: "https://slm-assets2.secondlife.com/assets/6094239/lightbox/Hemlock_Potion_bottle_001.jpg?1345140442",
        price: 234000,
        stock: 5,
        category: 3, 
    },{
        title: "Mothers Cooking",
        description: 'Yes. Youre mother specifically. It is delicious.',
        imageUrl: "https://slm-assets2.secondlife.com/assets/6094239/lightbox/Hemlock_Potion_bottle_001.jpg?1345140442",
        price: 234000,
        stock: 5,
        category: 3, 
    }]
}

const userData = {
    user: [{
        firstName: 'Michaela',
        lastName: 'Adams',
        isAdmin: false,
        email: 'jfkdsl@gmail.com',
        password: "hehehe"
    }, {
        firstName: 'Linzay',
        lastName: 'IsCool',
        isAdmin: true,
        email: 'ususus@gmail.com',
        password: "hohoho"
    }, {
        firstName: 'DEEE',
        lastName: 'Rocks',
        isAdmin: true,
        email: 'kdkdkd@gmail.com',
        password: "teeteetee"
    },{
        firstName: 'Harry',
        lastName: 'Otter',
        isAdmin: false,
        email: 'theboywholived@gmail.com',
        password: "iamhotstuff"
    }]
}

const orderData = {
    order: [{
        status: "created",
        firstName: "Michaela",
        lastName: "McCool",
        address: "5958 Tindall Circle",
        city: "Austin",
        state: "Tx",
        zip: 35432,
        userId: 1,
    }, {
        status: "created",
        firstName: "AnotherName",
        lastName: "IsHere",
        address: "500 Backwoods Drive",
        city: "Lost",
        state: "Iw",
        zip: 58494,
        userId: 2,
    }]

}

const otherData = {
    address: [{
        firstName: 'Michaela',
        lastName: 'Adams',
        isShipping: false,
        isBilling: false,
        address: "hehehe",
        city: "Princeton",
        state: "Tx",
        zip: 97304,
        userId: 1
    }],
    category: [{
        title: "fire",
        description: "ourch, thats hot"
    }, {
        title: "ice",
        description: "girl, you cold"
    },{
        title: "potions",
        description: "These are all our potions, we know what most of them do"
    }],
    productsInOrder: [{
        quantity: 3,
        price: 5.40,
        orderId: 1,
        productId: 2
    }],
    review: [{
        content: "honestly, kinda pricy, even for a dragon",
        stars: 2,
        userId: 1,
        productId: 1
    },{
        content: "not good jerskey",
        stars: 1,
        userId: 3,
        productId: 2
    },{
        content: "gave it to my wife, have not seen her for days",
        stars: 5,
        userId: 4,
        productId: 5
    }],
    cart: [{
        quantity: 7,
        userId: 1,
        productId: 1
    },{
        quantity: 3,
        userId: 1,
        productId: 4
    },
    {
        quantity: 12,
        userId: 2,
        productId: 2
    }]
}

//     
//the actual database cleaning and updating 
//there is some crazy nonsense going on with these seeding functions

db.sync({ force: true })
    .then(() => {
        console.log('TIMBER!!! the database is being dropped')

        return promise.map(Object.keys(productData), (name) => {

            return promise.map((productData[name]), (item) => {

                return db.model(name)
                    .create(item)
            })
        })
    })
    .then(() => {
        return promise.map(Object.keys(userData), (name) => {

            return promise.map((userData[name]), (item) => {

                return db.model(name)
                    .create(item)
            })
        })
        console.log("okay, I just worked really hard and filled your dumb database")
    })
    .then(() => {
        return promise.map(Object.keys(orderData), (name) => {

            return promise.map((orderData[name]), (item) => {

                return db.model(name)
                    .create(item)
            })
        })
    })
    .then(() => {
        return promise.map(Object.keys(otherData), (name) => {

            return promise.map((otherData[name]), (item) => {

                return db.model(name)
                    .create(item)
            })
        })
    })
    .catch((err) => {
        console.error('you goofed, but keep trying', err, err.stack)
    })