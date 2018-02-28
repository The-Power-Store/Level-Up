const promise  = require('bluebird')
const db = require('./server/db/db.js')
const {
    User,
    Product,
    Category,
    Review,
    Order,
    Address
  } = require('./server/db/models/index.js')

const data = {
    Product:[{
        title:"dragon",
        description:'a fierce creature',
        imageUrl: "https://images.duckduckgo.com/iu/?u=http%3A%2F%2Fimages2.fanpop.com%2Fimage%2Fphotos%2F13900000%2FDragon-Wallpaper-dragons-13975578-1280-800.jpg&f=1",
        price:1000,
        stock:5
    },{
        title:"wand",
        description:'made from a piece of beef jerksey',
        imageUrl: "https://www.printingin3d.eu/pictures/2013/02-voldemort-wand/painted-voldemort-wand.JPG",
        price:1000,
        stock:5
    }],
    User:[{
        firstName:'Michaela',
        lastName:'Adams',
        isAdmin:false,
        email:'jfkdsl@gmail.com',
        password: "hehehe"
    },{
        firstName:'Linzay',
        lastName:'IsCool',
        isAdmin:true,
        email:'ususus@gmail.com',
        password: "hohoho"
    },{
        firstName:'DEEE',
        lastName:'Rocks',
        isAdmin:true,
        email:'kdkdkd@gmail.com',
        password: "teeteetee"
    }],
    Address:[{
        firstName:'Michaela',
        lastName:'Adams',
        isShipping:false,
        isBilling:false,
        address: "hehehe",
        city: "Princeton",
        state: "Tx",
        zip: 97304
    }],
    Catagory:[{
        title:"fire",
        description: "ourch, thats hot"
    },{
        title:"ice",
        description: "girl, you cold"
    }],
    ProductsInOrder:[{
        OrderId:1,
        ProductId:2
    }],
    Review:[{
        review: "honestly, kinda pricy, even for a dragon",
        numOfStars:2,
        UserId:1,
        ProductId:1
    }],
    Order:[{
        status:"created",
        firstName: "Michaela",
        lastName: "McCool",
        address:"5958 Tindall Circle",
        city:"Austin",
        state:"Tx",
        zip:05432,
        UserId:1,
    },{
        status:"created",
        firstName: "AnotherName",
        lastName: "IsHere",
        address:"500 Backwoods Drive",
        city:"Lost",
        state:"Iw",
        zip:11111,
        UserId:2,
    }]
}
//the actuall database cleaning and updating 
//there is some crazy nonsense going on with these seeding functions
db.sync({force:true})
    .then(()=>{
        console.log('TIMBER!!! the database is being dropped')

        return promise.map(Object.keys(data),(name)=>{

            return promise.map((data[name]),(item)=>{

                return db.model(name)
                .create(item)
            })
        })
    })
    .then(()=>{
        console.log("okay, I just worked really hard and filled your dumb database")
    })
    .catch((err)=>{
        console.error('you goofed, but keep trying',err,err.stack)
    })