
/* ๐ Server.js ์๋จ ์ฝ๋ */

// c18 express
const express = require('express')
const app = express()

// c24-5) bodyParser
const bodyParser= require('body-parser')
app.use(bodyParser.urlencoded({extended: true})) 

// c30) mongoDB
const MongoClient = require('mongodb').MongoClient;

// c32) ejs
app.set('view engine', 'ejs');

// c50)  static ํ์ผ ๋ณด๊ด์ํด publicํด๋ ์ธ๊ฑฐ๋ผ๋ ๋ป
app.use('/public_c50', express.static('public_c50'));

// c52)  method-override
var methodOverride = require('method-override');
const passport = require('passport');
app.use(methodOverride('_method'))

// // ๐c58-10)
// // const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
// const session = require('express-session');

// app.use(passport.initialize());
// app.use(passport.session());
// app.use(session({ secret: 'ingyum123', resave: true, saveUninitialized: false }));


// ๐c64) .env ํ์ผ, environment variable, 
// root folder์ .envํ์ผ ๋ง๋ค๋ : require('dotenv').config()
// ๋ค๋ฅธ folder(env_c64)์ .envํ์ผ ๋ง๋ค๋ : require('dotenv').config({path: "./env_c64/.env"})
require('dotenv').config({path: "./env_c64/.env"})




 
// ๐ฆ๐ฆme-terminal ๋ช๋ น์ด ์ ๋ฆฌ ๐ codingapple-Node.js.MongoDB-2022-0629-classnoteํด๋...server.js


/* 
  ๐ c50์ผ๋ก ์ด๋
  app.get('/', function(req์์ฒญ, res์๋ต) {               //2)
    res์๋ต.sendFile(__dirname + '/index.html')       //4)     
  })   
*/



// ๐ฆ๐ฆc30 Database์ ์๋ฃ ์ ์ฅํ๊ธฐ, client.db('์๋ช').collection('์๋ช').insertOne(์๋ฃ์ค๋ธ์ ํธ, ์ฝ๋ฐฑํจ์)
console.log('๐ฆ๐ฆc30')

// uri

// var uri = "mongodb+srv://iikim2522:myhk2gXIqgvm2IO8@cluster0.qqllo.mongodb.net/?retryWrites=true&w=majority";
var uri = process.env.DB_URL;

// var db
var db;   //c30-4)

MongoClient.connect(uri, function(์๋ฌ, p_client){ 
  
    if (์๋ฌ) {
      return console.log(์๋ฌ);
    }

    console.log('c30 ๋ฐ์ดํฐ๋ฒ ์ด์ค ์ฐ๊ฒฐ success');

  // database์ค์  :  db() : .... 'ig_database' ์ ์ฐ๊ฒฐ
  db = p_client.db('ig_database');

  // .collecton(~) : ....'~' ์ ์ฐ๊ฒฐ, collecton์ด๋ฆ ์ฌ๊ธฐ์ ์๋ชํ๋ฉด, mongoDB์ ์๋์ผ๋ก ๊ทธ collecton ๋ง๋ค์ด์ง
  // .insertOne(~) : .insertOne(์ ์ฅํ  ๋ฐ์ดํฐ, ๊ทธ ์ดํ ์คํํ  ์ฝ๋ฐฑํจ์)  ๐ mongoDB์ ๊ฐ๋ฉด ์ ์ฅ๋ ๋ฐ์ดํฐ ํ์ธ๋จ
  db.collection('c30_ig_collection').insertOne({์ ๋ชฉ: "first", ๋ ์ง:1, ์ด๋ฆ:'John2', _id:10}, function (์๋ฌ, ๊ฒฐ๊ณผ) {
    console.log('c30 insertOne success')    
  });

  // ๐ฆ๐ฆc32 HTML์ DB๋ฐ์ดํฐ ๋ฃ๋ ๋ฒ 1, EJS ํ์ผ ๋ง๋ค๊ธฐ 
     console.log('๐ฆ๐ฆc32')
     console.log('๐ฆ๐ฆc38')
    

    //  post()๋ฅผ ํตํ insetOne()์คํ, send(), ์์ฒญ.body.ig_title
    app.post('/add', function(req์์ฒญ, res์๋ต){   

      res์๋ต.send('c32. post() ์ ์ก์๋ฃ');

      console.log('req์์ฒญ.body.ig_title:'+req์์ฒญ.body.ig_title);
      console.log('req์์ฒญ.body.ig_data:'+req์์ฒญ.body.ig_data);

      // 38) 
      // .collection('ig_counter'), findOne
      db.collection('ig_counter').findOne({name: '๊ฒ์๋ฌผ๊ฐฏ์'}, function(p_err,p_db๊ฒฐ๊ณผ) {

        if (p_err) { return console.log('error')    }

        console.log(`p_db๊ฒฐ๊ณผ.totalPost:`+p_db๊ฒฐ๊ณผ.totalPost)
        console.log(`p_db๊ฒฐ๊ณผ.name:`+p_db๊ฒฐ๊ณผ.name)
        
        
        //  _id:์ด๊ฒ์๋ฌผ๊ฐฏ์ +1 
        db.collection('ig_collection').insertOne({ _id:  p_db๊ฒฐ๊ณผ.totalPost ,์ ๋ชฉ : req์์ฒญ.body.ig_title, ๋ ์ง : req์์ฒญ.body.ig_data}, function(){
          console.log('์ ์ฅ์๋ฃ c38-2')          
          
          // ๐ฆ๐ฆc ์ ์๋ 40 ๊ฒ์๋ฌผ๋ง๋ค id๋ฃ๊ธฐ2 - id์ +1ํ๊ธฐ, updateOne(.), mongodb operator: inc
          console.log('๐ฆ๐ฆc40')  
   

          // updateOne, $inc
          db.collection('ig_counter').updateOne({name:'๊ฒ์๋ฌผ๊ฐฏ์'},{$inc :{totalPost:+1}},function(p_err,p_db) { 
            if (p_err) { return console.log('err')  }                  

          })
        })
      })
    });   


    // c30-4) ์๋ฒ๋์ฐ๋ ์ฝ๋ ์ฌ๊ธฐ๋ก ์ฎ๊ธฐ๊ธฐ      
    app.listen(8080, function(){
    console.log('c30 listening on 8080')
    });


    // ๐ฆ32-2. ejs๋ฌธ๋ฒ  (listํญ ํ์ธ)
    // ๐views/list.ejs ์์ฑ
    
    app.get('/list',function(req,res){      //34-4)

        // // .find().toArray() 
        db.collection('ig_collection').find().toArray(function(p_err, p_db๊ฒฐ๊ณผ){   //34-2)    
          console.log(p_db๊ฒฐ๊ณผ)
      
          // render() , list.ejs , ig_posts : p_db๊ฒฐ๊ณผ
          res.render('list.ejs', { ig_posts : p_db๊ฒฐ๊ณผ })     //34-4)  36-4)
        })
    });



    // ๐ฆ๐ฆc42 AJAX๋ก DELETE ์์ฒญํ๊ธฐ1, $.ajax(.), app.delete('delete',(.)={})
    // ๐ฆ๐ฆc44 AJAX๋ก DELETE ์์ฒญํ๊ธฐ2, deleteOne(.), data-~~, .dataset.~~, parseInt(.)
    // ๐ฆ๐ฆc46 AJAX๋ก DELETE ์์ฒญํ๊ธฐ3, jQuery๊ธฐ๋ฅ .status(200).send()
    console.log('๐ฆ๐ฆc42,44,46')

    //c44) ๐req์์ฒญ.body์ ๋ด๊ฒจ์จ id๋ฅผ ๊ฐ์ง ์ค๋ธ์ ํธ๋ฅผ db์์ ์ฐพ์์, ์ญ์ 
    // ๐./views/list.ejs
    app.delete('/delete',function (req์์ฒญ,res์๋ต) {

      // ๐console.log("c42,44,46"+ req.body) ์ด๋ ๊ฒ ํ๋ฉด ์๋ฌ๋จ. (์ด์ ๋ ๋ชจ๋ฆ)
      console.log(req์์ฒญ.body)
      console.log(req์์ฒญ.body._id)

      /*
       "req์์ฒญ.body.~id"๋ฅผ number๋ก ๋ฐ๊ฟ  -> "req์์ฒญ.body"๋ฅผ deleteOne()์ ์ฌ์ฉํจ. 
        ("req์์ฒญ.body._id"  ๊ฐ ์๋๋ผ. "req์์ฒญ.body") 
      */
      req์์ฒญ.body._id = parseInt(req์์ฒญ.body._id);

      // ~.deleteOne()
      db.collection('ig_collection').deleteOne(req์์ฒญ.body,function (err,obj๊ฒฐ๊ณผ) {
        console.log(err)
        console.log('c44 delete Finished')
        

        // c46-30) ์ฑ๊ณต์ฝ๋ 200:  res์๋ต.status(200).send({message : "c46, success"});  
        // ๐ list.ejs
        res์๋ต.status(200).send({message : "c46, fail"});
        
        // c46-40) ์คํจ์ฝ๋ 400:  res์๋ต.status(400).send({message : "c46, fail"});        
        // res์๋ต.status(400).send({message : "c46, fail"});
      });      
    });


    // ๐ฆ๐ฆc48 ์์ธํ์ด์ง๋ฅผ ๋ง๋ค์ด๋ณด์ :id (URL parameter), req์์ฒญ.params.id
    // ๐detail_c48.ejs

    // :id
    app.get('/detail/:id',function (req์์ฒญ,res์๋ต) {
      
      //  req์์ฒญ.params.id 
      // findOne({~},function(){})
      // parseInt 
      db.collection('ig_collection').findOne({_id: parseInt(req์์ฒญ.params.id)}, function (err,p_db๊ฒฐ๊ณผ) {

        console.log(p_db๊ฒฐ๊ณผ)
        
        // .render('~c~',{ ~b~ : ~a~ })
        res์๋ต.render('detail_c48.ejs',{ig_data : p_db๊ฒฐ๊ณผ });        
      })      
    });


    // ๐ฆ๐ฆc52 ๊ธ ์์  ๊ธฐ๋ฅ1, edit page, html์์ PUT์์ฒญํ๊ธฐ, method-override
    // ๐ฆ๐ฆc54 ๊ธ ์์  ๊ธฐ๋ฅ2. DB ๋ฐ์ดํฐ๋ฅผ ์์ ํด๋ณด์. updateOne ๋น๋ฐinput๋ณด๋ด๊ธฐ, redirect(~), submit button
    console.log('๐ฆ๐ฆc52, 54')

    // ๐edit_c52.ejs

    /* ๐
      ํ๋ฒ์ ๋ชจ๋  ๊ธฐ๋ฅ ๋ง๋๋ ค๋ฉด ํผ๋์ค๋ฌ์ฐ๋,
      ์์๋ฅผ ์ ํ์
      ์ผ๋จ frontendํํธ ๋จผ์  ๋ง๋ค์ด๋๊ณ , ๊ธฐ๋ฅ๊ฐ๋ฐ
    */
    /* ๐
      10) ~/edit/:id ๋ก ์ ์ํ๋ฉด :id ๊ฒ์๋ฌผ ๋ฐ์ดํฐ + ์์ ํ ์์๋ ์นํ์ด์ง๋ก ๊ฐ

      20) ์์ ํ๊ณ , submit         ๐edit_c52.ejs

      30) listํ์ด์ง์์ ์์ ๋ ๋ฐ์ดํฐ๊ฐ ๋ฐ์๋จ
    */
   /* 
    ๐์๋จ์ฝ๋: method-override
    npm install method-override   
   */

    // 52-10)
    // '/edit/:id'
    app.get('/edit/:id',(req์์ฒญ,res์๋ต)=>{    
      
      // findOne({_id: req์์ฒญ.params.id},()=>{})
      db.collection('ig_collection').findOne({_id: parseInt(req์์ฒญ.params.id)},function (p_err,p_db๊ฒฐ๊ณผ) {
        
        
        console.log(p_db๊ฒฐ๊ณผ)

        // .render('~c~',{ ~b~ : ~a~ }) : ~a~๋ฐ์ดํฐ๋ฅผ, ~b~์ด๋ฆ์ผ๋ก,  ~c~~๋ก ๋ณด๋,      
        res์๋ต.render('edit_c52.ejs', {ig_posts: p_db๊ฒฐ๊ณผ})
      })
    });

    // 52-20-2)
    // ๐c54 ๐edit_c52.ejs, style="display:none; ์๋ณด์ด๋ input๋ง๋ค์ด์, ๋ชฐ๋ id์ ๋ณด๋ฅผ server.js๋ก ๋ณด๋ด๊ธฐ

    // ๐Operator  (c40 reference)
    // $set:  ์๋ฐ์ดํธ ํด์ค , (์์ผ๋ฉด ์ถ๊ฐํด์ค)

    app.put('/edit',function (req์์ฒญ,res์๋ต) {
      /* ๐
        form์ ๋ด๊ธด ๋ฐ์ดํฐ๋ฅผ ํ์ฉํด์,
        db.collecton ์ ์๋ฐ์ดํธํจ

        updateOne({์๋ฐ์ดํธํ  ๊ฒ์๋ฌผ ์ค๋ธ์ ํธ}),{์๋ฐ์ดํธ๊ฐ},function (p_err,p_db๊ฒฐ๊ณผ) {})
      */
     db.collection('ig_collection').updateOne({_id: parseInt(req์์ฒญ.body.ig_id)},{$set:{ ์ ๋ชฉ: req์์ฒญ.body.ig_title , ๋ ์ง: req์์ฒญ.body.ig_data}},function (p_err,p_db๊ฒฐ๊ณผ) {  

      console.log('c54 :'+ req์์ฒญ.body.ig_id +req์์ฒญ.body.ig_title)  
      console.log('c54 : updateOne fin')

      // .redirect('/list')
      res์๋ต.redirect('/list')
     })

    });



})

// // ๐ ์ค์ต์ฝ๋ ๋------


// ๐ฆ๐ฆc50 Bootstrap, nav.ejs..๋ฆฌ์กํธ์ฒ๋ผ ์ฒจ๋ถํ๊ธฐ. <%- include('~') %>

/* 2)
 ๐./public/style.css ๋ง๋ค๊ธฐ

  static files๋ publicํด๋์์ ๋ณด๊ดํ๋๊ฒ ๊ด์ต
  CSSํ์ผ์ด ์ฌ๊ธฐ์ ํด๋น๋จ
  (static files : ๋ฐ์ดํฐ์ ์ํด ๋ณํ์ง ์๋ ํ์ผ)
*/


// 4) ๐์๋จ์ฝ๋) app.use('.public', express.static('pulbic'));
// static ํ์ผ ๋ณด๊ด์ํด publicํด๋ ์ธ๊ฑฐ๋ผ๋ ๋ป


/* 6)
  ๐ ./views/nav.html ๋ง๋ค๊ธฐ

  ๊ณต์ ํ  html ํ์ผ : 
  viewsํด๋
  htmlํ์  (ejs X)
  
  ์ ์ฉ์ ~.ejsํ์ผ์๋ง ์ ์ฉ๊ฐ๋ฅํจ
*/
/* 8)
  ๐./views/~~~.ejs์ ์ฝ์ํ๊ธฐ

  ์ฌ๊ธฐ ์ด์๋ฆฌ์ nav_c50.html์ ๋ฃ์์์์
   <%- include('nav_c50.html') %>
*/

/* 10)
  ๐./views/index.ejs ํ์ผ๋ณ๊ฒฝ, ํด๋์ด๋.. 
  ๐./views/write.ejs ํ์ผ๋ณ๊ฒฝ, ํด๋์ด๋.. 
*/

// app.listen(8080, function(){
//     console.log('c30 listening on 8080')
//   });

app.get('/', function(req์์ฒญ, res์๋ต) {               //2)
  // res์๋ต.sendFile(__dirname + '/index.html')       //4)

  // c50-10)  res์๋ต.render('index.ejs')   
  res์๋ต.render('index.ejs')               
})   

app.get('./public_c50/style.css', function(req, res) {
  res.sendFile(__dirname + "/" + "style.css");
});

app.get('/write',(req์์ฒญ,res์๋ต)=>{       //2, 2-1)
  // res์๋ต.sendFile(__dirname + '/write.html')       //2-2)

  // c50-10)  res์๋ต.render('index.ejs')   
  res์๋ต.render('write.ejs')
});

app.get('/detail',(req์์ฒญ,res์๋ต)=>{    

  res์๋ต.render('detail.ejs')
});



// // ๐ฆ๐ฆc56 (ํ์ ๋ก๊ทธ์ธ0) ์ธ์, JWT, OAuth ๋ฑ ํ์์ธ์ฆ ๋ฐฉ๋ฒ ์ดํดํ๊ธฐ
// // ๐ฆ๐ฆc58 (ํ์ ๋ก๊ทธ์ธ1) ๋ฏธ๋ค์จ์ด, app.use(~), passport, express-session, passport.authenticate(~),passport.use(new LocalStorategy(~))

// // ๐ฆ๐ฆc60 (ํ์ ๋ก๊ทธ์ธ2) ์์ด๋ ๋น๋ฒ์ DB์ ๋น๊ตํ๊ณ  ์ธ์ ๋ง๋ค์ด์ฃผ๊ธฐ, passport.serializeUser(~)
// // ๐ฆ๐ฆc62 (ํ์ ๋ก๊ทธ์ธ3) ๋ก๊ทธ์ธ ์ ์ ๋ง ์ ์ํ  ์ ์๋ ํ์ด์ง ๋ง๋ค๊ธฐ
// console.log('๐ฆ๐ฆc56,58,60,62')
// (ํ์๊ธฐ๋ฅ ๋ง๋ค๊ธฐ ์คํจํจ)

// // ๐login_c58.ejs

// // ๐c58-10)
// // const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
// const session = require('express-session');

// app.use(passport.initialize());
// app.use(passport.session());
// app.use(session({ secret: 'ingyum123', resave: true, saveUninitialized: false }));



// // ๐ฆc58
//   app.get('/login',function (req์์ฒญ,res์๋ต) {
//     res์๋ต.render('login_c58.ejs')
    
//   });

//   /*๐-20)
//     passport.authenticate('local') : (์ธ์ฆํด์ฃผ์ธ์)ํจ์ ,  
  
//     ์ธ์ฆ ์คํจ์ :  app.get('/fail',~~)๋ก ์ฐ๊ฒฐ (failureRedirect : '/fail')

//     ์ธ์ฆ ์ฑ๊ณต์ : res์๋ต.redirect('/') 
//   */
//   app.post('/login',passport.authenticate('local',{
//     failureRedirect : '/fail'
//   }),function (req์์ฒญ,res์๋ต) {

//     // redirect
//     res์๋ต.redirect('/')
//   });

//   app.get('/fail',function () {
//     res์๋ต.render('fail_c58.ejs')    
//   })
       
//   // ๐c60-30) passport.authenticate('local',~)...๋ก๊ทธ์ธ ์ฑ๊ณต์, ๋ค์์ฝ๋ ์คํ๋จ
//     passport.use(new LocalStrategy({
//       usernameField: 'ig_login_id',                 // ๐login_c58.ejs
//       passwordField: 'ig_login_password',            // ๐login_c58.ejs
//       session: true,                                // login ํ session์ ์ ์ฅํ ๊ฒ์ธ์ง?
//       passReqToCallback: false,
//     }, function (req, ์๋ ฅํ์์ด๋, ์๋ ฅํ๋น๋ฒ, done) {

//       console.log(์๋ ฅํ์์ด๋, ์๋ ฅํ๋น๋ฒ);

//       /*-40)
//         error์ฒ๋ฆฌ
//         DB์ ID๊ฐ ์์๋
//         DB์ ID๊ฐ ์์๋
//         DB์ ID๊ฐ ์์ผ๋ฉด, input password == DB password ๋น๊ตํจ

//         -50)
//         done: 3๊ฐ์ argument๋ฅผ ๊ฐ์ง
//         done(์๋ฒ์๋ฌ, ์ฑ๊ณต์ ์ฌ์ฉ์ db๋ฐ์ดํฐ, ์๋ฌ ๋ฉ์์ง)

//         -60)        
//         ์๋ ฅํ ๋น๋ฐ๋ฒํธ๋ฅผ ์ํธํํ ํ ,DB์ ๋น๋ฐ๋ฒํธ์ ๋น๊ตํด์ผํจ (๋์ค์ ์์์ ํ์ธ์)
//       */
//       db.collection('ig_login').findOne({ id: ์๋ ฅํ์์ด๋ }, function (์๋ฌ, user๊ฒฐ๊ณผ) {

//         if (์๋ฌ) return done(์๋ฌ)

//         if (!๊ฒฐ๊ณผ) return done(null, false, { message: '์กด์ฌํ์ง์๋ ์์ด๋์' })

//         if (์๋ ฅํ๋น๋ฒ == user๊ฒฐ๊ณผ.ig_password) {

//           return done(null, user๊ฒฐ๊ณผ)
//         } else {

//           return done(null, false, { message: '๋น๋ฒํ๋ ธ์ด์' })
//         }
//       })
//     }));


//     // -70)
//     // login ์ฑ๊ณต ๋, id๋ฅผ ์ด์ฉํด์ session์ ์ ์ฅ
//     passport.serializeUser(function (user,done) {
//       done(null, user.id)
      
//     });

//     // login ์ฑ๊ณต ๋, ์์ session๋ฐ์ดํฐ๋ฅผ ๊ฐ์ง์ฌ๋์ db์์ ์ฐพ์์ฃผ์ธ์
//     passport.deserializeUser(function (์์ด๋,done) {
      
//       done(null, {})
      
//     });





// ๐ฆ๐ฆc64 .env ํ์ผ, environment variable, ๊ฐ๋ณ์ ์ธ ๋ณ์ ๋ฐ์ดํฐ๋ค ๊ด๋ฆฌํ๊ธฐ 
console.log('๐ฆ๐ฆc64 ')


/* 
  ๐ npm install dotenv

  ๐ ๐์๋จ์ฝ๋ : 
    root folder์ .envํ์ผ ๋ง๋ค๋ : require('dotenv').config()
    ๋ค๋ฅธ folder(env_c64)์ .envํ์ผ ๋ง๋ค๋ : require('dotenv').config({path: "./env_c64/.env"})
  
  ๐ server.js์ ๊ฐ์ ํด๋์ '.env'ํ์ผ ๋ง๋ฌ
   ๐.env  
*/



//๐ฆ๐ฆc66, 68, 70

MongoClient.connect(uri, function(์๋ฌ, p_client){ 
  
  if (์๋ฌ) {
    return console.log(์๋ฌ);
  }
  db = p_client.db('ig_database');


  //๐ฆ๐ฆc66 ๊ฒ์๊ธฐ๋ฅ1 Query string parameters, .replace('/search?value=' + ์๋ ฅํvalue), req์์ฒญ.query.value
  //๐ฆ๐ฆc68 ๊ฒ์๊ธฐ๋ฅ2 mongoDB์ฌ์ดํธ...indexํญ, Binary Search, 

  // ๐list.ejs

  //๐c66-10)๐list.ejs , query string ๋ง๋ฌ

  /*
    ๐c66-20) server.js์์ query string๊บผ๋ด์, DB์์ ๋ฐ์ดํฐ ๊บผ๋. 

    -a) req์์ฒญ.query : getํจ์์์ ์์ฒญ.body ์ฐ๋๊ฒ๊ณผ ๋น์ทํ๊ฒ ์ฌ์ฉํ๋ ๋ฐฉ์์

    -b)
      collection().findOne()           : 1๊ฐ ์ฐพ์ ๋
      collection().find().toArray()     : ์ฌ๋ฌ๊ฐ ์ฐพ์ ๋
  */

  app.get('/search',(req์์ฒญ,res์๋ต)=>{

    // req์์ฒญ.query 
    console.log(req์์ฒญ.query)
    console.log(req์์ฒญ.query.value)

    //  collection().find().toArray()  
    // find({์ ๋ชฉ:req์์ฒญ.query.value})  ๐ ๋ฌธ์ ์ : ์ ํํ ์ผ์นํ๋ ๊ฒ๋ง ์ฐพ์์ค
    db.collection('ig_collection').find({์ ๋ชฉ:req์์ฒญ.query.value}).toArray((err,p_db๊ฒฐ๊ณผ)=>{
      console.log(p_db๊ฒฐ๊ณผ)

  
       //๐๐ฆc68-10) 
      // ๐search_c68.ejs

      /*๐-20)
          ์ ๊ทํํ์์ด๋?(Regular Expression: Regex)
          https://iankim2511.tistory.com/862


          /๊ธ์ฐ๊ธฐ/ ๋ค์ด๊ฐ๊ฒ ๋ชจ๋ ์ฐพ์์ค
          ๊ฒ์ํ ๊ฒ 1์ต๊ฐ์๋ค๋ฉด?? 


          ๐-30) ๐mongoDB์ฌ์ดํธ  collection ๐ index
          ๊ฐ๋๋ค๋ผ ์ ๋ ฌ
          ์ค๋ฆ์ฐจ์, ๋ด๋ฆผ์ฐจ์
          ๋์์ ์ฌ๋ฌ๊ฐ ์ค์ ๊ฐ๋ฅํจ      
      */
      res์๋ต.render('search_c68.ejs',{ig_posts:p_db๊ฒฐ๊ณผ});
    })

   
    
  });

});

//๐ฆ๐ฆc70 ๊ฒ์๊ธฐ๋ฅ3 mongoDB์ฌ์ดํธ...search indexํญ, $.parma(~), $("#form").serialize(~), aggregate(~), $search, $sort,$limit, $project, {$meta:"searchScore"}

/* 
  ๐70-2) me: okky์ฒ๋ผ ๊ตฌ๊ธ๋ก ๊ฒ์์ด๋์ํค๋ ๋ฐฉ๋ฒ๋ ์์, 

 ๐70-10) ๐mongoDB์ฌ์ดํธ...search indexํญ

 ๐70-20) .aggregate(๊ฒ์์กฐ๊ฑด).toArray()  

 ๐70-30)
    $sort : 
    ๊ฒฐ๊ณผ์ ๋ ฌ
    _id ์์ผ๋ก ์ ๋ ฌ
    1, -1 :  ์ค๋ฆ์ฐจ์, ๋ด๋ฆผ์ฐจ์ ์ ๋ ฌ

    $limit :
    ์์ 10๊ฐ๋ง ๊ฐ์ ธ์์ฃผ์ธ์...๋ผ๋ limit

    $project : ๊ฒ์๊ฒฐ๊ณผ์์ ์ํ๋๊ฒ๋ง ๋ณด์ฌ์ค
    1 : ๊ฒ์๊ฒฐ๊ณผ ๋์ด
    0 : ๊ฒ์๊ฒฐ๊ณผ ๋์ค์ง ์์
    ํญ๋ชฉ์ ๋ฃ์ง์์๋, ๊ฒ์๊ฒฐ๊ณผ ๋์ค์ง ์๋๊ฑธ..๋ก ์๊ณ ์์

    searchScore:  ๊ฒ์์ด์ ๊ฒ์๋ฌผ์ ๊ด๋ จ์์ด ๋์๊ฒ, ๊ฒ์ ๋ง์ด ํ๋ ํญ๋ชฉ์ score๊ฐ ๋์์ง

    score๋ collection์ ์์ด๋ ์ด๋ฐ์์ผ๋ก ์ฝ๋ฉํ๋ฉด , 
    ๊ฒ์๊ฒฐ๊ณผํํฐ๋ง์ผ๋ก ๋ฃ์ด์ค
*/

MongoClient.connect(uri, function(์๋ฌ, p_client){ 
  
  if (์๋ฌ) {
    return console.log(์๋ฌ);
  }
  db = p_client.db('ig_database');


  app.get('/search',(req์์ฒญ,res์๋ต)=>{

    console.log(req์์ฒญ.query.value)
    
    //70-20) .aggregate(๊ฒ์์กฐ๊ฑด).toArray()  
    var ๊ฒ์์กฐ๊ฑด =[
      {
        $search:{
          index : "ig_titleSearch",
          text:{
            query: req์์ฒญ.query.value,
            path: "์ ๋ชฉ"
          }

        }
      },
      // 70-30)$sort, $limit,$project
      {$sort :{_id :1}},
      {$limit : 10},
      {$project : {์ ๋ชฉ : 1, _id: 0, score :{$meta : "searchScore"}}}
    ];
    db.collection('ig_collection').aggregate(๊ฒ์์กฐ๊ฑด).toArray((err,p_db๊ฒฐ๊ณผ)=>{
      console.log(p_db๊ฒฐ๊ณผ)


      res์๋ต.render('search_c68.ejs',{ig_posts:p_db๊ฒฐ๊ณผ});
    })       
  });
});


//๐ฆ๐ฆc72 req.body._id, req.user._id, ํ์ ๊ธฐ๋ฅ...๊ฒ์ํ ๊ธฐ๋ฅ
// (c56~62 ํ์๊ธฐ๋ฅ ์คํจํด์ , ์ด๊ฐ์๋ ๊ฑ ์ค๋ช๋ง ๋ฃ๊ณ  ๋๊น)


//๐ฆ๐ฆc74 router๊ด๋ฆฌ, router.get(์ฃผ์, ๋ฏธ๋ค์จ์ด, ํจ์), router.use(๋ฏธ๋ค์จ์ด)
// ๐ ./routes/shop_c74.js
// ๐ ./routes/zoo_c74.js

/* 
  ๐routes : ๋๋ฌด ๋ง์ app.get(~)์ 1๊ฐ์ ํ์ผ๋ก ๋ฌถ์ด์ ๊ด๋ฆฌํ๊ธฐ
*/

// ๐ app.use(๋ฏธ๋ค์จ์ด)
// ./rountes/shop_c74.js ํ์ผ์ ์ฌ๊ธฐ์ ์ฒจ๋ถ
app.use('/', require('./routes/shop_c74.js'))

// ./rountes/zoo_c74.js ํ์ผ์ ์ฌ๊ธฐ์ ์ฒจ๋ถ
// ๋ฏธ๋ค์จ์ด ํจ์ ์ ์ฉํ๋๋ฒ : ig_middleware
app.use('/zoo', ig_middleware,  require('./routes/zoo_c74.js'))

function ig_middleware(req,res,next) {
  console.log('ig_middleware_c74')  
}


// ๐ฆ๐ฆc76 Google Cloud(=AWS, ๋ค์ด๋ฒํด๋ผ์ฐ๋, cafe24) ์ฌ์ดํธ๋ฐฐํฌ, app.yaml
// ๐app.yaml

/* 
  ๐2. server.js์ ์๋ฒ๋ฅผ ๋์ธ ๋ ํฌํธ๊ฐ 8080์ธ์ง ํ์ธํฉ๋๋ค.
  ย 
  app.listen ์ด ๋ถ๋ถ์ด 8080์ธ์ง ํ์ธํฉ์๋ค.ย 
  app.listen(8080, function() {
      console.log('listening on 8080')
    }) 
  ์๋๋ผ๋ฉด 8080์ผ๋ก ๋ณ๊ฒฝํด์ค์๋ค.
  ์๋๋ฉด ๊ตฌ๊ธํด๋ผ์ฐ๋์์ ๊ธฐ๋ณธ์ ์ผ๋ก ์ด์ฉํ๋ ํฌํธ๊ฐ 8080์๋๋ค.ย 
  8080์ฐ๊ธฐ ์ซ์ผ์๋ฉด ๋ฐ๋ก ์ค์ ํด์ฃผ์๋ฉด ๋๋๋ฐ ๊ท์ฐฎ์ผ๋ 8080์ผ๋ก ๋ง์ถฅ๋๋ค.ย ย 


  ๐gcloud init

  ๐gcloud app deploy
*/

// ๐ฆ๐ฆc78 ์ด๋ฏธ์ง ์๋ก๋ & api๋ง๋ค๊ธฐ, enctype="", multer, upload.array(~,~)
// ๐views/upload_c78.ejs


/* 
  ๐-10) upload.ejs ๋ง๋ฌ : ๐views/upload_c78.ejs
*/

app.get('/upload',(req์์ฒญ,res์๋ต)=>{
  res์๋ต.render('upload_c78.ejs');
});

/* 
  ๐-20_
      npm install multer

      diskStorage : ์ปดํจํฐ ํ๋์์ ์ ์ฅ
      memoryStorage : ๋จ์์ ์ ์ฅ. ํ๋ฐ์ฑ..์ ์ฅ
*/
const multer = require('multer')

// ๐diskStorage
const storage = multer.diskStorage({

  // ๐๊ฒฝ๋ก : './public_c50/image_c78'
  destination: function (req, file, cb) {
    cb(null, './public_c50/image_c78')
  },

  // ๐file name ์ค์  : file.originalname
  filename: function (req, file, cb) {


    /* ๐ํ์ผ๋ช ์ถ๊ฐ๋ก ๋ฃ๊ธฐ      
      a) 
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.originalname + '-' + uniqueSuffix)    

      b) 
      cb(null, file.originalname + '๋ ์ง:' + new Date())    
    */
    cb(null, file.originalname)
    
  }
})

// ๐const upload : ๋ชจ๋ ์ค์ ...const upload์ ์ ์ฅํจ. const multer , const storage ๊ฐ์ ธ์ด

const upload = multer({
  storage: storage,

  /* 
    // ๐fileFilter : PNG, JPG๋ง ์๋ก๋ํ๊ธฐ
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
            return callback(new Error('PNG, JPG๋ง ์๋ก๋ํ์ธ์'))
        }
        callback(null, true)
    },

    // ๐limits : ํ์ผ์ฌ์ด์ฆ ์ ํ
    limits:{
        fileSize: 1024 * 1024
    }
   */
});


/* 
  ๐-30
      upload.ejs์์ post์์ฒญ์ค๋ฉด

      ./public/imageํด๋์์ ์ ์ฅํจ
*/

/* 
  ๐๋ฏธ๋ค์จ์ด const upload : upload.single('ig_uploadInput')
  ๐./views/upload.ejs์  <input type="file" name="ig_uploadInput"> ์ name="ig_uploadInput"๊ฐ์ ธ์ด
*/
app.post('/upload',upload.single('ig_uploadInput'),(req์์ฒญ,res์๋ต)=>{
  res์๋ต.send('c78_fin');
});

/* 
  ๐-40 API๋ง๋ค๊ธฐ (์๋ก๋ํ ์ด๋ฏธ์ง... API๋ก ๋ง๋ค๊ธฐ)

  ๐URLํ๋ผ๋ฏธํฐ 
  
    a) ์ด๋ฆ์ง๊ธฐ๐ :ig_imageName

      ์ ์ฉ ๐ req์์ฒญ.params.ig_imageName


    b) ํ์ผ๊ฒฝ๋ก : __dirname +'/public_c50/image_c78'


    c) html์ imgํ๊ทธ์ ์ ์ฉํ๊ธฐ (ํ์ผ๋ช :   test_c78.jpg)
    ๐upload_c78.ejs
     <img src="/public_c50/image_c78/test_c78.jpg" alt="">
*/

app.get('/image_c78/:ig_imageName',(req์์ฒญ,res์๋ต)=>{
  res์๋ต.sendFile(__dirname +'/public_c50/image_c78'+ req์์ฒญ.params.ig_imageName)
})


// ๐ฆ๐ฆ80 ๋ผ์ด๋ธ๋ฌ๋ฆฌ ์๊ฐ helmet.js , Mongoose, Connect-mongo, OAuth์์๋ก๊ทธ์ธ
/* 
  ๋ณด์ : helmet.js ๋ผ์ด๋ธ๋ฌ๋ฆฌ 
  ex) express์ฌ์ฉํ๊ณ ์๋ค๋ ์ ๋ณด...์จ๊ฒจ์ค ํ์๊ฐ ์์

  Mongoose : mongodb ๋ฐ์ดํฐ์ ์ฅํ ๋ ๊ฒ์ฌ๋์์ค

  OAuth์์๋ก๊ทธ์ธ 
  Connect-mongo : ์ธ์๋ฐ์ดํฐ..db์ ์ฅ  ...์ฌ์ฉํ๋ฉด ์๋ ์๋๋ ค์ง๊ณ  ์ข์
 */



// ๐ฆ๐ฆ88 Node์๋ฒ+ React ํฉ์น๊ธฐ, app.get("*",~), ๋ฆฌ์กํธ router์ฌ์ฉ, proxy ๋ผ์ด๋ธ ์ฝ๋ฉ

/*   
    ๋ฆฌ์กํธ ๋ผ์ฐํฐ์์ ๋ค ํด๊ฒฐํด์ฃผ๋ฏ๋ก, ์๋ฒ์ ์ญํ ์  db์ฐ๊ฒฐ๋ง์ผ๋ก ์ถ์์ํฌ์์์



    ์ผ๋ฐ ์๋ฐ์คํฌ๋ฆฝํธ ํ์ด์ง ๋ณด๋ค๊ฐ,

    ํน์ ํ์ด์ง ๋ค์ด๊ฐ์๋, ๋ฆฌ์กํธ ํ์ด์ง ๋ณด์ฌ์ฃผ๋ ๋ฒ


    "/" ์ ์ : ์๋ฐ์คํฌ๋ฆฝํธ htmlํ์ด์ง ๋ณด์ฌ์ค

    "/react"์ ์ :  ๋ฆฌ์กํธ ํ์ด์ง ๋ณด์ฌ์ค



    ๋ฏธ๋ค์จ์ด : ์๋ฒ์ ์์ฒญ๊ณผ ์๋ต์ฌ์ด์ ์คํํ  ์ฝ๋ , 

    ์ ์ ๊ฐ /~~url๋ก ์์ฒญ์, ์๋ตํ๊ธฐ์ ์ ์คํํ  ์ฝ๋





    "homepage" :"~~" ์ถ๊ฐํ ํ 

    npm run build


    ๊ณ์ ์ค๊ฐ์ ๋ฉ์ถ๊ณ  build๋ฅผ ํด์ผํ๋๊ฐ??

    ใดใด, ๋ผ์ด๋ธ๋ก ๊ฐ๋ฅํจ

    proxy ๊ฒ์
*/



