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


const productData =[{
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
    }]

//     user:[{
//         firstName:'Michaela',
//         lastName:'Adams',
//         isAdmin:false,
//         email:'jfkdsl@gmail.com',
//         password: "hehehe"
//     },{
//         firstName:'Linzay',
//         lastName:'IsCool',
//         isAdmin:true,
//         email:'ususus@gmail.com',
//         password: "hohoho"
//     },{
//         firstName:'DEEE',
//         lastName:'Rocks',
//         isAdmin:true,
//         email:'kdkdkd@gmail.com',
//         password: "teeteetee"
//     }],
//     order:[{
//         status:"created",
//         firstName: "Michaela",
//         lastName: "McCool",
//         address:"5958 Tindall Circle",
//         city:"Austin",
//         state:"Tx",
//         zip:05432,
//         UserId:1,
//     },{
//         status:"created",
//         firstName: "AnotherName",
//         lastName: "IsHere",
//         address:"500 Backwoods Drive",
//         city:"Lost",
//         state:"Iw",
//         zip:11111,
//         UserId:2,
//     }],
//     address:[{
//         firstName:'Michaela',
//         lastName:'Adams',
//         isShipping:false,
//         isBilling:false,
//         address: "hehehe",
//         city: "Princeton",
//         state: "Tx",
//         zip: 97304,
//         UserId: 1
//     }],
//     category:[{
//         title:"fire",
//         description: "ourch, thats hot"
//     },{
//         title:"ice",
//         description: "girl, you cold"
//     }],
//     productsInOrder:[{
//         OrderId:1,
//         ProductId:2
//     }],
//     review:[{
//         review: "honestly, kinda pricy, even for a dragon",
//         numOfStars:2,
//         UserId:1,
//         ProductId:1
//     }]
// }
//the actuall database cleaning and updating 
//there is some crazy nonsense going on with these seeding functions


async function filler (database, data){
    await database.create(data)
  .then(() => database.findOrCreate({where: data}))
  .spread((item, created) => {
    console.log(item.get({
      plain: true
    }))
    console.log(created)
  })
}

db.sync({force:true})
    .then(()=>{
        filler(Product,productData)
        // async function filldaData(){
           
        //     await 
        // }
        // filldaData()
        console.log('TIMBER!!! the database is being dropped')

            // return promise.map(productData,(item)=>{
            //     console.log("itme - ",item)
            //     return db.model(Product)
            //     .create(item)
            // })

    })
    .then(()=>{
        console.log("okay, I just worked really hard and filled your dumb database")
    })
    .catch((err)=>{
        console.error('you goofed, but keep trying',err,err.stack)
    })