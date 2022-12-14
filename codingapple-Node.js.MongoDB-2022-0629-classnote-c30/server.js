
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

 
// ๐ฆ๐ฆ terminal ๋ช๋ น์ด ์ ๋ฆฌ ๐ codingapple-Node.js.MongoDB-2022-0629-classnoteํด๋...server.js





// app.listen(3000, function(){
//     console.log('c30 listening on 3000')
//   });

app.get('/', function(req์์ฒญ, res์๋ต) {               //2)
    res์๋ต.sendFile(__dirname + '/index.html')       //4)
})   

app.get('/style.css', function(req, res) {
    res.sendFile(__dirname + "/" + "style.css");
});

app.get('/write',(req์์ฒญ,res์๋ต)=>{       //2, 2-1)
    res์๋ต.sendFile(__dirname + '/write.html')       //2-2)
  });



// ๐ฆ๐ฆc30 Database์ ์๋ฃ ์ ์ฅํ๊ธฐ, client.db('์๋ช').collection('์๋ช').insertOne(์๋ฃ์ค๋ธ์ ํธ, ์ฝ๋ฐฑํจ์)
// (์ธ์ฆ์ฝ๋ ์๋ฌ๋จ. ์๋ฃ์ถ๊ฐ๋ ์๋จ)


console.log('๐ฆ๐ฆc30')
/* 
  1) mongoDB ์ฌ์ดํธ 
  clusters ->collection -> database๋ ํ๋์ ํด๋, collection์ ํ๋์ ์์ํ์ผ์ด๋ผ๊ณ  ์๊ฐํ๋ฉด ๋ฑ ๋ง์ต๋๋ค. 
*/

// // ๐์ค์ต์ฝ๋ ์์ ------ ๋ค์ ์์์ ์ค์ฒฉ๋์ ์ผ๋จ ์ฝ๋ฉํธ ์ฒ๋ฆฌ

//๐์๋จ๋ฐฐ์น const MongoClient = require('mongodb').MongoClient;

// ๐uri : iikim2522:dRT2GRSjF5PoHsam : ๋น๋ฐ๋ฒํธ ๋๋ค์์ฑํ์๋ ์ ์์ฑ๊ณตํจ ,
//๐ home ๐ Projects ๐ Security ๐Quickstart์์ username edit์ ํํ๊ณ  auto generate password ํด๋ฆญ (๊ฐ๋ quick start์๋์ฌ๋ ์๋๋ฐ, home์์๋ถํฐ ๋์ด์ค๋ฉด ์๊น )
// https://cloud.mongodb.com/v2/62be0862fda87151be53eb94#setup/access
// ๋น๋ฐํ์ผ์ ์จ๊ฒจ์ผํจ. ํดํน๋ ์์์, ์ฐ์ต๋๋ ์ฐ์ต๋๋ ๋๋ง๋ค ๋น๋ฐ๋ฒํธ ์๋ก ์์ฑ
var uri = "mongodb+srv://iikim2522:ElrMBKIr97MGy7h9>@cluster0.qqllo.mongodb.net/?retryWrites=true&w=majority";


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
  //     /* ๐ฆ ๋๊ตฐ๊ฐ /add ๊ฒฝ๋ก๋ก POST ์์ฒญ์ ํ๋ฉด, ํผ์ ์๋ ฅ๋ ์๋ฃ๋ฅผ 2๊ฐ๊ฐ ์๋ฒ๋ก ๋์ฐฉํฉ๋๋ค.
  //         ์ด ๋ ์๋ฃ 2๊ฐ๋ฅผ ~~๋ผ๋ ์ด๋ฆ์ collection์ ์ ์ฅํ๊ธฐ */


  // ๐ฆ๐ฆc38 ๊ฒ์๋ฌผ๋ง๋ค id๋ฃ๊ธฐ, auto increment๋ฌธ๋ฒ, findOne(.), insertOne(.)
  /*    
    2) ex)๊ทธ๋ฅ ๋จ์ํ๊ฒ "id:์ด๊ฒ์๋ฌผ๊ฐฏ์+1"ํ๋ฉด 2๋ฒ์งธ ์๋ฃ(id:2)๋ฅผ ์ง์ฐ๊ณ , ์๋ก์ด ๋ฐ์ดํฐ๋ฅผ ๋ฃ์์๋ id:2๊ฐ ๋๋ ์ํฉ์ด ๋ฐ์ํจ
    ์ด๋ ๊ฒ ๋๋ฉด ์๋จ, 
    ์ง์ฐ๊ณ  ์๋ก์ด๊ฑฐ ๋ฃ์ด๋ id:2๋ ๊ณต๋ฐฑ์ด ๋์ด์ผ ํจ
    
    4) find() : ๋ชจ๋  ๋ฐ์ดํฐ ์ฐพ๊ณ ์ถ์๋
    findOne() : ์ํ๋ ๋ฐ์ดํฐ 1๊ฐ๋ง ์ฐพ๊ณ ์ถ์๋  

    findOne({~},function(){}) : {~}๊ฐ ์๋ ์ค๋ธ์ ํธ ๋ญ์น๋ฅผ ์ฐพ์์ค, ๊ทธ ์ค๋ธ์ ํธ ์์ ๋ฐ์ดํฐ๋ค์ ์์ ํ  ์์ 
    
    ~~collection(~)~~.findOne({~~{}~~},function(){
      ~~~~ ์์ ํ  ์ฝ๋~~~
    })


    ๐6) /add๋ก post์์ฒญํ๋ฉด, 
    DB์ ์ด๊ฒ์๋ฌผ๊ฐฏ์ ๋ฐ์ดํฐ ๊ฐ์ ธ์ค์
    
    ๐8) ์๋ก์ด collecton ๋ง๋ฌ
    -> ์ฌ๊ธฐ์ ์๋ฃ๊ฐฏ์๋ฅผ ์ ์ฅํด์ ๊บผ๋๋ ๋ฐฉ์์ ์ฌ์ฉํ  ์์ 
    default๋ก ๋ฐ์ดํฐ ๋ง๋ค์ด๋๊ณ , ๊ฒ์๋ฌผ ๋ง๋ค์ด์ง๋๋ง๋ค totalPost์ซ์ ๋๋ฆฌ๋ ๋ฐฉ์์ ์ฌ์ฉํ  ์์ 
  */

     console.log('๐ฆ๐ฆc32')
     console.log('๐ฆ๐ฆc38')
    

    //  post()๋ฅผ ํตํ insetOne()์คํ, send(), ์์ฒญ.body.ig_title
    app.post('/add', function(req์์ฒญ, res์๋ต){   

      res์๋ต.send('c32. post() ์ ์ก์๋ฃ');

      console.log('req์์ฒญ.body.ig_title:'+req์์ฒญ.body.ig_title);
      console.log('req์์ฒญ.body.ig_data:'+req์์ฒญ.body.ig_data);

      // 32)
      // db.collection('ig_collection').insertOne( { ์ ๋ชฉ : req์์ฒญ.body.ig_title, ๋ ์ง : req์์ฒญ.body.ig_data } , function(){    
      //   console.log('์ ์ฅ์๋ฃ c32-2');
      // });  

      // 38) 
      // .collection('ig_counter'), findOne
      db.collection('ig_counter').findOne({name: '๊ฒ์๋ฌผ๊ฐฏ์'}, function(p_err,p_db๊ฒฐ๊ณผ) {

        if (p_err) { return console.log('error')    }

        console.log(`p_db๊ฒฐ๊ณผ.totalPost:`+p_db๊ฒฐ๊ณผ.totalPost)
        console.log(`p_db๊ฒฐ๊ณผ.name:`+p_db๊ฒฐ๊ณผ.name)
        
        
        //  _id:์ด๊ฒ์๋ฌผ๊ฐฏ์ +1 
        db.collection('ig_collection').insertOne({ _id:  p_db๊ฒฐ๊ณผ.totalPost ,์ ๋ชฉ : req์์ฒญ.body.ig_title, ๋ ์ง : req์์ฒญ.body.ig_data}, function(){
          console.log('์ ์ฅ์๋ฃ c38-2')          
          
          // ๐ฆ๐ฆ ์ ์๋ 40 ๊ฒ์๋ฌผ๋ง๋ค id๋ฃ๊ธฐ2 - id์ +1ํ๊ธฐ, updateOne(.), mongodb operator: inc
          console.log('๐ฆ๐ฆc40')  
          /*
            10) updateOne({},{},function(){}) : ํ๋์ ๋ฐ์ดํฐ ์์ 
            updateMany() : ํ๋ฒ์ ๋ง์ ๋ฐ์ดํฐ ์์ 

            20-10) post()ํ ๋, 
            findOne() :  collection('~~')์์ name:'๊ฒ์๋ฌผ๊ฐฏ์'๋ฐ์ดํฐ๋ฅผ ๊ฐ์ง๊ณ ์๋ ์ค๋ธ์ ํธ ์ ์ฒด๋ฅผ ๊ฐ์ ธ์ด (ex: collection(counter)์ ์ค๋ธ์ ํธ)
            collection("~~")์ insertOne : collection("~~")์  ๊ทธ db๊ฒฐ๊ณผ์ totalPost์ +1์ ํด์ _id๋ง๋ฌ

            20-20) post()ํ  ๋ + collection('~~') ์ insertOneํ ๋ : 
            updateOne() : collection('~~')์์ " name:๊ฒ์๋ฌผ๊ฐฏ์"๋ฐ์ดํฐ๋ฅผ ๊ฐ์ง ์ค๋ธ์ ํธ ์ ์ฒด๋ฅผ ๊ฐ์ ธ์ด. 
            ๊ทธ์์ ๋ฐ์ดํฐ ํ๋(ex: totalPost) ๋ฅผ ์์ ํจ (ex: totalPost+1)

            30) $inc : number data์ +, - ์ํด
            ์์, ์์ ๋๋ค ๊ฐ๋ฅํจ
            +1 : +1 ํด์ค
            -1 : -1 ํด์ค


            30-2) mongodb update operators : 
            https://www.mongodb.com/docs/manual/reference/operator/update/
          */

          // updateOne, $inc
          db.collection('ig_counter').updateOne({name:'๊ฒ์๋ฌผ๊ฐฏ์'},{$inc :{totalPost:+1}},function(p_err,p_db) { 
            if (p_err) { return console.log('err')  }                  

          })
        })
      })
    });   


      // c30-4) ์๋ฒ๋์ฐ๋ ์ฝ๋ ์ฌ๊ธฐ๋ก ์ฎ๊ธฐ๊ธฐ      
      app.listen(3000, function(){
        console.log('c30 listening on 3000')
      });




     // ๐ฆ32-2. ejs๋ฌธ๋ฒ  (listํญ ํ์ธ)
     // ๐views/list.ejs ์์ฑ
     //    npm install ejs

     //๐์๋จ๋ฐฐ์น app.set('view engine', 'ejs');

     /* 4) list๋ก get์์ฒญ...์ ์ํ๋ฉด, ์ค์  DB์ ์ ์ฅ๋ ๋ฐ์ดํฐ ์ ์ฉ๋html๋ณด์ฌ์ค 

      -2) http://localhost:8080/list ์ฃผ์์ฐฝ ์ ์*/
        
      // ๐์ฝ๋ ์์ ---------------- ๋ค์ ์์์ ์ค์ฒฉ๋์ ์ผ๋จ ์ฝ๋ฉํธ ์ฒ๋ฆฌ
      // ๐ c34 ์ฝ๋๋ก ์ฎ๊น

      // // list.ejs
      // app.get('/list',function (res,req) {
      //     req.render('list.ejs');        
      // })

      // ๐์ฝ๋ ๋----------------------------------------------------------


      //๐ฆ๐ฆc34 HTML์ DB๋ฐ์ดํฐ ๋ฃ๋ ๋ฒ 2 (DB๋ฐ์ดํฐ ์ฝ๊ธฐ), .find(.).toArray(์๋ฌ,๊ฒฐ๊ณผ)=>{}), { ig_posts : ๊ฒฐ๊ณผ }
      // ๐list.ejs

      /* list.ejs ํ์ผ์ ์ฝ๋ฉ
            <!-- ๐ฆc34 ๋ฐ๋ณต๋ฌธ     <%  %>   
                for (let i = 0; i < array.length; i++) {
                  const element = array[i];              
                }        
            -->
            
            <%    for (let i = 0; i < ig_posts.length; i++) {   %>  
              <h4>ํ ์ผ ์ ๋ชฉ : <%= ig_posts[i].์ ๋ชฉ %></h4>
              <p>ํ ์ผ ๋ง๊ฐ๋ ์ง : <%= ig_posts[i].๋ ์ง %></p>          
            <%  }  %>        
      */  
      
      /*
          2).find().toArray() ๋ผ๊ณ  ์ ์ผ์๋ฉด collection(โpostโ)์ ์๋ ๋ชจ๋  ๋ฐ์ดํฐ๋ฅผ Array ์๋ฃํ์ผ๋ก ๊ฐ์ ธ์ต๋๋ค. 

          4)list.ejs ํ์ผ์ ๋ ๋๋งํจ๊ณผ ๋์์ {ig_posts: ๊ฒฐ๊ณผ} ๋ผ๋ ๋ฐ์ดํฐ๋ฅผ ํจ๊ป ๋ณด๋ด์ค ์ ์์ต๋๋ค. 

          (์ ํํ ๋งํ๋ฉด ๊ฒฐ๊ณผ๋ผ๋ ๋ฐ์ดํฐ๋ฅผ ig_posts ๋ผ๋ ์ด๋ฆ์ผ๋ก ejs ํ์ผ์ ๋ณด๋ด์ฃผ์ธ์~ ์๋๋ค)
      */
    
      app.get('/list',function(req,res){      //34-4)

          // // .find().toArray() 
          db.collection('ig_collection').find().toArray(function(p_err, p_db๊ฒฐ๊ณผ){   //34-2)
      
            console.log(p_db๊ฒฐ๊ณผ)
        
            // render() , list.ejs , ig_posts : p_db๊ฒฐ๊ณผ
            res.render('list.ejs', { ig_posts : p_db๊ฒฐ๊ณผ })     //34-4)  36-4)
          })
      });
})

// // ๐ ์ค์ต์ฝ๋ ๋------


