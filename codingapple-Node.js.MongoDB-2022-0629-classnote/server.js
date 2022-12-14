
/* ๐ Server.js ์๋จ ์ฝ๋ */

// require(~) : ~ํ์ผ, ~๋ผ์ด๋ธ๋ฌ๋ฆฌ์ ๊ฐ์ ธ์์(import) ์ฐ๊ฒ ๋ค๋ ๋ป
// c18 express
const express = require('express')
const app = express()

// c24-5) bodyParser
const bodyParser= require('body-parser')
app.use(bodyParser.urlencoded({extended: true})) 


/* ๐me - next ์์์ ๋์ฌ ์๋จ ์ฝ๋ ์ ๋ฆฌ

  // c30)
  const MongoClient = require('mongodb').MongoClient;

  // c32) 
  app.set('view engine', 'ejs');

  // c50)  static ํ์ผ ๋ณด๊ด์ํด publicํด๋ ์ธ๊ฑฐ๋ผ๋ ๋ป
  app.use('/public_c50', express.static('public_c50'));

  // c52)  method-override
  var methodOverride = require('method-override');
  const passport = require('passport');
  app.use(methodOverride('_method'))

  // ๐c58-10)
  // const passport = require('passport');
  const LocalStrategy = require('passport-local').Strategy;
  const session = require('express-session');

  app.use(passport.initialize());
  app.use(passport.session());
  app.use(session({ secret: 'ingyum123', resave: true, saveUninitialized: false }));


  // c64) .env ํ์ผ, environment variable, 
  // root folder์ .envํ์ผ ๋ง๋ค๋ : require('dotenv').config()
  // ๋ค๋ฅธ folder(env_c64)์ .envํ์ผ ๋ง๋ค๋ : require('dotenv').config({path: "./env_c64/.env"})
  require('dotenv').config({path: "./env_c64/.env"})
*/

// ๐ฆ๐ฆme- terminal ๋ช๋ น์ด, ํ์ผ์์น ์ ๋ฆฌ (๐codingapple-Node.js.MongoDB-2022-0629-classnoteํด๋...server.js)
/* 
  ๐ฆ๐ฆc12 express ๋ผ์ด๋ธ๋ฌ๋ฆฌ ์ค์น
        $npm init
        $npm install express

  ๐ฆ๐ฆc14 ๋ฏธ๋ฆฌ๋ณด๊ธฐ
  node server.js

  ์๋ฒ ๋๊ธฐ : ctrl +c

  ๐ฆ๐ฆc18 nodemon ์๋ ๋ฏธ๋ฆฌ๋ณด๊ธฐ
  $npm install -g nodemon (yarn add global nodemon)

  $nodemon server.js 

  ๐ฆ๐ฆc24 body-parser ๋ผ์ด๋ธ๋ฌ๋ฆฌ ์ค์น
  $npm install body-parser ํน์ yarn add body-parser


  ๐ฆ๐ฆc28 mongodb ๋ผ์ด๋ธ๋ฌ๋ฆฌ ์ค์น        
  npm install mongodb

  ๐ฆ๐ฆc32 EJS 
  ๐./views/~~.ejs
  npm install ejs

  ๐ฆ๐ฆc52 method-override
  npm install method-override

  ๐ฆ๐ฆc58 passport, passport-local, express-session,
  npm install passport, passport-local, express-session

  ๐ฆ๐ฆc64 dot env
  ๐./env_c64/.env
  npm install dotenv

  ๐ฆ๐ฆc74 router๊ด๋ฆฌ, router.get(์ฃผ์, ๋ฏธ๋ค์จ์ด, ํจ์), router.use(๋ฏธ๋ค์จ์ด)
  ๐ ./routes/shop_c74.js
  ๐ ./routes/zoo_c74.js


  ๐ฆ๐ฆc76
  ๐app.yaml
  ๐gcloud init
  ๐gcloud app deploy


  ๐ฆ๐ฆc78
  ๐./public/image
   npm install multer
        
*/

/* ๐ฆ๐ฆ ์ฐธ๊ณ   
  w3school - node.js
    
  https://www.mongodb.com/docs/manual/reference/method/db.collection.aggregate/

  npmjs.com    
*/


/* ๐ฆ๐ฆme- ์๋ฌํด๊ฒฐ 
  10) ์ ์์ด ์๋จ... :   ๋น๋ฐ๋ฒํธ ๋๋ค์์ฑํ์๋ ์ ์์ฑ๊ณตํจ

  20) ์ฝ๋๋ ๋ค ๋ง๊ณ , console.log์๋ ๋ฐ์ดํฐ ์ ๋๋ก ๋ค ์ ์ฉ์ด ๋ฌ๋๋ฐ, mongodb์ฌ์ดํธ์๋ ์๋ณด์ : ๊ทธ๋ฅ mongodb์ฌ์ดํธ ์ฌ๋ก๊ทธ์ธํด์ ํด๊ฒฐ
*/


// ๐ฆ๐ฆc16 npm์๋ฌํด๊ฒฐ, package.json, npm init, npm install express(Node.js, Express๋ผ์ด๋ธ๋ฌ๋ฆฌ ์ค์น)
console.log('๐ฆ๐ฆ๐ฆ๐ฆc5')

/* 
2)
npm
package.json

4) ํฐ๋ฏธ๋ ๋ช๋ น์ด
$npm init
$npm install express
*/


// ๐ฆ๐ฆc18 express๋ก ์๋ฒ์คํ๊ณต์, node server.js, get(์ฃผ์, (req,res)={} ), send('๊ธ์')

/*๐ server.js ์๋จ -  (express) ์๋ฒ์คํ ๊ธฐ๋ณธ๊ณต์  

2) ๐ server.js ์๋จ์ ์ฝ๋ ์ถ๊ฐ, express ๋ผ์ด๋ธ๋ฌ๋ฆฌ ์ฒจ๋ถ์ ์ฌ์ฉ 

4) app.listen()์ ์ํ๋ ํฌํธ์ ์๋ฒ๋ฅผ ์คํํ๋ ๋ฌธ๋ฒ์ด๋ผ๊ณ  ๋ณด์๋ฉด ๋ฉ๋๋ค. 

listen() ํจ์ ์์ ๋๊ฐ์ ํ๋ผ๋ฏธํฐ๊ฐ ํ์ํฉ๋๋ค. 

listen(์๋ฒ๋ฅผ ์คํํ  ํฌํธ๋ฒํธ, function(){์๋ฒ ์คํ์ ์คํํ  ์ฝ๋})

5) 8080ํฌํธ ์ฐ๋ฉด ํธํจ - ๊ตฌ๊ธ ํด๋ผ์ฐ๋์๋น์ค ๋ํดํธ๊ฐ ๐ c76


*/

// ๐์ค์ต์ฝ๋ ์์ ------ ๋ค์ ์์์ ์ค์ฒฉ๋์ ์ผ๋จ ์ฝ๋ฉํธ ์ฒ๋ฆฌ
// (๐ c28 mongoDB์ฝ๋๋ก ์ฎ๊น)


// app.listen(3000, function() {   
//   console.log('listening on 3000')
// })

// ๐ ์ค์ต์ฝ๋ ๋------


/* 
6) node server.js / localhost:3000

ํฐ๋ฏธ๋์์ node server.js๋ฅผ ์๋ ฅํ๋ฉด ์๋ฒ๊ฐ ๋น๋๋ค.

๋ธ๋ผ์ฐ์ ์์ localhost:3000  ์ ์ํ๋ฉด ํ์ธ๊ฐ๋ฅํฉ๋๋ค. 

8) ์๋ฒ ๋๊ธฐ 
terminal์์ ctrl + c
 */

/* 10) get(์ฃผ์, ()={} ), send('๊ธ์')

-2) ๋๊ตฐ๊ฐ๊ฐ localhost:3000/pet์ผ๋ก ๋ฐฉ๋ฌธํ๋ฉด,
-3) ์๋ด๋ฌธ ๋์ฐ๊ธฐ

-4) get์์ ํ๋ผ๋ฏธํฐ eng์ด๋ฆ : (request, response) (req,res) ์ฃผ๋ก ์ฌ์ฉํจ

๋ธ๋ผ์ฐ์  ์ผ์ localhost:3000/pet  ์ ์ํ๋ฉด ํซ์ฉํ ์ฌ๋ผ๋ ์๋ด๋ฌธ์ด ๋จ์ฃ ? */


// 12) ์ฌ์ฉ์๊ฐ / ๊ฒฝ๋ก๋ก ์ ์์ (/ ํ๋๋ง ์์ผ๋ฉด ํํ์ด์ง์๋๋ค)

// app.get('/', function (req, res) {
//   res.send('Hello World')
// })


//๐ค ๋ฐ์ mongodb์ ์ฐ๊ฒฐํ ๋ ์ฐ๋ ค๊ณ  ์ฝ๋ฉํธ ์ฒ๋ฆฌํจ ---c28
// app.listen(3000,function () {
//     console.log('hello  3000')
// })

// get(), send()
app.get('/pet', function(req์์ฒญ, res์๋ต) {        //-2)  -4)
    res์๋ต.send('ํซ์ฉํ ์ฌ์์ค')           //-3)
  })
  


// ๐ฆ๐ฆc20 ์๋ฒ์์ index.htmlํ์ผ์ ์กํ๊ธฐ, Nodemon์ผ๋ก ์๋ํ, ์ค์น์ค๋ฅํด๊ฒฐ powershell๊ด๋ฆฌ์๋ชจ๋
console.log('๐ฆ๐ฆ๐ฆ๐ฆc20')


/* 
1) nodemon ์ค์น

1-2)
npm install -g nodemon
yarn add global nodemon 

1-4) nodemon server.js
์ด์  ์๋ฒ๋ฅผ ์คํํ  ๋ nodemon server.js ๋ผ๊ณ  ์๋ ฅํด์ฃผ์๋ฉด ๋๊ฒ ์ต๋๋ค.
ํ์ผ ์ ์ฅํ  ๋ ๋ง๋ค ์ด์  ์ง๊ฐ ์์์ ์๋ฒ๋ฅผ ์๋ก ์์ํด์ค๋๋ค.
(ํ์ง๋ง ๋ธ๋ผ์ฐ์ ์์ ์๋ก๊ณ ์นจ์ ํ์์ผํฉ๋๋ค.)

1-5)์๋ฌ๋๋ powershell๊ด๋ฆฌ์๋ชจ๋ ์คํ ๐ set-executionpolicy unrestricted
*/

/* 
2) ์ฌ์ฉ์๊ฐ / ๊ฒฝ๋ก๋ก ์ ์์ (/ ํ๋๋ง ์์ผ๋ฉด ํํ์ด์ง์๋๋ค)

4) server.js๋ ๊ฐ์ ๊ฒฝ๋ก์ ์๋ /index.html ์ด๋ผ๋ ํ์ผ์ ๋ณด๋ด์ค๋๋ค. 

4-2) sendFile() ํจ์๋ฅผ ์ฐ๋ฉด ํ์ผ์ ๋ณด๋ผ ์ ์์ต๋๋ค

4-4) __dirname์ ํ์ฌ ํ์ผ์ ๊ฒฝ๋ก๋ฅผ ๋ปํฉ๋๋ค. */

// sendFile()
app.get('/', function(req์์ฒญ, res์๋ต) {               //2)
    res์๋ต.sendFile(__dirname + '/index.html')       //4)
})   

// 6) css ์ ์ฉํ๊ธฐ (me...๊ตฌ๊ธ๊ฒ์) โก

app.get('/style.css', function(req, res) {
    res.sendFile(__dirname + '/style.css') 
    // res.sendFile(__dirname + "/" + "style.css");
});




// ๐ฆ๐ฆc24 POST์์ฒญ app.post('/add',(res,req)=>{}), body-parser (์๋ ฅํ ๋ฐ์ดํฐ๋ฅผ ์๋ฒ์ ์ ์กํ๋ ๋ฒ)
// ๐write.html
console.log('๐ฆ๐ฆ๐ฆ๐ฆc9')


/*  2) arrow function ์ฌ์ฉ ๊ฐ๋ฅ
2-1) /write์ ์..
2-2) write.html๋ณด๋ด์ค  */

app.get('/write',(req์์ฒญ,res์๋ต)=>{       //2, 2-1)
  res์๋ต.sendFile(__dirname + '/write.html')       //2-2)
});


/* 4)
๐์๊ณ ๋ฆฌ์ฆ pseudo-coding
-1. ๐write.html   ๐      <form action="/add" method="POST">  ์ฝ๋ฉ  , ์๋ฒ์์ input ๊ตฌ๋ถํ๊ธฐ ์ํด nameํ๊ทธ ๋ฃ์
-2. ์ด๋ค ์ฌ๋์ด /add ๊ฒฝ๋ก(html์ ์ง์ ํ action="")๋ก , POST์์ฒญ ํ๋ฉด, 
-3. ??์ ํด์ฃผ์ธ์ */


/* 5)form ๋ฐ์ดํฐ๋ฅผ ์๋ฒ๋ก ์ ์กํ๊ธฐ 
- body-parser ์ค์น 
: POST์์ฒญ์ผ๋ก ์๋ฒ์ ๋ฐ์ดํฐ ์ ์ก ์ฝ๊ฒํด์ฃผ๋ ๋ผ์ด๋ธ๋ฌ๋ฆฌ : body-parser, form, input, name
( http://expressjs.com/en/resources/middleware/body-parser.html )

5-2)
4)๊น์ง๋ง ํด๋ ๋ฐ์ดํฐ๊ฐ ์ ์ ์ก๋๊ธด ํ๋๋ฐ, (์ ์ก๋ ๋ฐ์ดํฐ๋ 'req์์ฒญ'ํ๋ผ๋ฏธํฐ์ ์ ์ฅ๋จ)

์ ์ก๋ ๋ฐ์ดํฐ ์ฌ์ฉํ๊ธฐ : body-parser๋ผ๋ ๋ผ์ด๋ธ๋ฌ๋ฆฌ๊ฐ ์์ด์ผ, ์ฌ๋ฌ๋ถ์ด ๋ณด๋ธ ๋ฐ์ดํฐ๋ค ์ฒ๋ฆฌ๊ฐ ์ฝ๊ฒ ๊ฐ๋ฅํจ.

ํฐ๋ฏธ๋์ ์ผ์ npm install body-parser ํน์ yarn add body-parser๋ฅผ ํ๋๋ก ํฉ์๋ค. 

๐server.js ์๋จ์ ์ถ๊ฐ
const bodyParser= require('body-parser')
app.use(bodyParser.urlencoded({extended: true})) 


5-4)
input์์ฑ ํ submit clickํ๋ ( ๋๊ตฐ๊ฐ๊ฐ /add ๊ฒฝ๋ก๋ก post ์์ฒญ์ ํ  ๋ ) , ํฐ๋ฏธ๋ ์ฝ์์ฐฝ์ ์์ฒญ.body๊ฐ ์ถ๋ ฅ๋จ

์์ฒญ.body๋ ์ฌ๋ฌ๋ถ์ด ํผ์ ์๋ ฅํ ๋ฐ์ดํฐ๊ฐ ๋ค์ด๊ฐ ์์.   */


// ๐์ค์ต์ฝ๋ ์์ ------------------------

// post() , req์์ฒญ.body.ig_title
app.post('/add',function(req์์ฒญ,res์๋ต){    //4-2)

  res์๋ต.send('c24 ์ ์ก์๋ฃํ์ด์ฉ')                       //4-3)
    
  console.log(req์์ฒญ.body)          //5-4)
  console.log(req์์ฒญ.body.ig_title)          //5-4)
  console.log(req์์ฒญ.body.ig_data)          //5-4)

  //  DB์ ์ ์ฅํ๊ธฐ ๐ ๋ค์์๊ฐ์....
})

// ๐ ์ค์ต์ฝ๋ ๋------------------------------




// ๐ฆ๐ฆc28 MongoDB ์ํํ๊ธฐ (๋ฌด๋ฃ ํธ์คํ๋ ๋ฐ์๋ณด์)

console.log('๐ฆ๐ฆ๐ฆ๐ฆc11')

/* 
2) ๊ตฌ๊ธ์ MongoDB Atlas ๊ฒ์ , ๊ฐ์

4) mongodb  ๋ผ์ด๋ธ๋ฌ๋ฆฌ ์ค์น

npm install mongodb  

6) ๐server.js ์๋จ์ ์ฝ๋ ์ถ๊ฐ */

/* 
8) <โmongoDB - cluster - application code>๋ณต์ฌํด๋์
(~~~~://๋๋น๊ณ์ ์์ด๋:๋๋น๊ณ์ ํจ์ค์๋~~~/๋ฐ์ดํฐ๋ฒ ์ด์ค์ด๋ฆ~~~~) 

mongodb+srv://iikim2511:1234qwer@cluster0.o0asn.mongodb.net/<dbname>?retryWrites=true&w=majority

-2) mongoDB์ฐ๊ฒฐ๋๋ฉด, 
-4) ์ด ์๋ฒ ์ฐ๊ฒฐํด์ฃผ์ */

// ๐์ค์ต์ฝ๋ ์์ ------ ๋ค์ ์์์ ์ค์ฒฉ๋์ ์ผ๋จ ์ฝ๋ฉํธ ์ฒ๋ฆฌ

// uri, password

var uri = 'mongodb+srv://iikim2511:ingyum123@cluster0.o0asn.mongodb.net/<dbname>?retryWrites=true&w=majority';

MongoClient.connect(uri, function(์๋ฌ, client){ //8-2)
  
      app.listen(3000,function () {
        console.log('c28 hello  3000')
    })    
})

// ๐ ์ค์ต์ฝ๋ ๋------




