
/* 🍀 Server.js 상단 코드 */

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

// c50)  static 파일 보관위해 public폴더 쓸거라는 뜻
app.use('/public_c50', express.static('public_c50'));

// c52)  method-override
var methodOverride = require('method-override');
const passport = require('passport');
app.use(methodOverride('_method'))

// // 🍀c58-10)
// // const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
// const session = require('express-session');

// app.use(passport.initialize());
// app.use(passport.session());
// app.use(session({ secret: 'ingyum123', resave: true, saveUninitialized: false }));


// 🍀c64) .env 파일, environment variable, 
// root folder에 .env파일 만들때 : require('dotenv').config()
// 다른 folder(env_c64)에 .env파일 만들때 : require('dotenv').config({path: "./env_c64/.env"})
require('dotenv').config({path: "./env_c64/.env"})




 
// 🦄🦄me-terminal 명령어 정리 👉 codingapple-Node.js.MongoDB-2022-0629-classnote폴더...server.js


/* 
  👉 c50으로 이동
  app.get('/', function(req요청, res응답) {               //2)
    res응답.sendFile(__dirname + '/index.html')       //4)     
  })   
*/



// 🦄🦄c30 Database에 자료 저장하기, client.db('작명').collection('작명').insertOne(자료오브젝트, 콜백함수)
console.log('🦄🦄c30')

// uri

// var uri = "mongodb+srv://iikim2522:myhk2gXIqgvm2IO8@cluster0.qqllo.mongodb.net/?retryWrites=true&w=majority";
var uri = process.env.DB_URL;

// var db
var db;   //c30-4)

MongoClient.connect(uri, function(에러, p_client){ 
  
    if (에러) {
      return console.log(에러);
    }

    console.log('c30 데이터베이스 연결 success');

  // database설정 :  db() : .... 'ig_database' 에 연결
  db = p_client.db('ig_database');

  // .collecton(~) : ....'~' 에 연결, collecton이름 여기에 작명하면, mongoDB에 자동으로 그 collecton 만들어짐
  // .insertOne(~) : .insertOne(저장할 데이터, 그 이후 실행할 콜백함수)  👉 mongoDB에 가면 저장된 데이터 확인됨
  db.collection('c30_ig_collection').insertOne({제목: "first", 날짜:1, 이름:'John2', _id:10}, function (에러, 결과) {
    console.log('c30 insertOne success')    
  });

  // 🦄🦄c32 HTML에 DB데이터 넣는 법 1, EJS 파일 만들기 
     console.log('🦄🦄c32')
     console.log('🦄🦄c38')
    

    //  post()를 통한 insetOne()실행, send(), 요청.body.ig_title
    app.post('/add', function(req요청, res응답){   

      res응답.send('c32. post() 전송완료');

      console.log('req요청.body.ig_title:'+req요청.body.ig_title);
      console.log('req요청.body.ig_data:'+req요청.body.ig_data);

      // 38) 
      // .collection('ig_counter'), findOne
      db.collection('ig_counter').findOne({name: '게시물갯수'}, function(p_err,p_db결과) {

        if (p_err) { return console.log('error')    }

        console.log(`p_db결과.totalPost:`+p_db결과.totalPost)
        console.log(`p_db결과.name:`+p_db결과.name)
        
        
        //  _id:총게시물갯수 +1 
        db.collection('ig_collection').insertOne({ _id:  p_db결과.totalPost ,제목 : req요청.body.ig_title, 날짜 : req요청.body.ig_data}, function(){
          console.log('저장완료 c38-2')          
          
          // 🦄🦄c 선생님 40 게시물마다 id넣기2 - id에 +1하기, updateOne(.), mongodb operator: inc
          console.log('🦄🦄c40')  
   

          // updateOne, $inc
          db.collection('ig_counter').updateOne({name:'게시물갯수'},{$inc :{totalPost:+1}},function(p_err,p_db) { 
            if (p_err) { return console.log('err')  }                  

          })
        })
      })
    });   


    // c30-4) 서버띄우는 코드 여기로 옮기기      
    app.listen(8080, function(){
    console.log('c30 listening on 8080')
    });


    // 🦄32-2. ejs문법  (list탭 확인)
    // 👉views/list.ejs 생성
    
    app.get('/list',function(req,res){      //34-4)

        // // .find().toArray() 
        db.collection('ig_collection').find().toArray(function(p_err, p_db결과){   //34-2)    
          console.log(p_db결과)
      
          // render() , list.ejs , ig_posts : p_db결과
          res.render('list.ejs', { ig_posts : p_db결과 })     //34-4)  36-4)
        })
    });



    // 🦄🦄c42 AJAX로 DELETE 요청하기1, $.ajax(.), app.delete('delete',(.)={})
    // 🦄🦄c44 AJAX로 DELETE 요청하기2, deleteOne(.), data-~~, .dataset.~~, parseInt(.)
    // 🦄🦄c46 AJAX로 DELETE 요청하기3, jQuery기능 .status(200).send()
    console.log('🦄🦄c42,44,46')

    //c44) 🍄req요청.body에 담겨온 id를 가진 오브젝트를 db에서 찾아서, 삭제
    // 👉./views/list.ejs
    app.delete('/delete',function (req요청,res응답) {

      // 😎console.log("c42,44,46"+ req.body) 이렇게 하면 에러남. (이유는 모름)
      console.log(req요청.body)
      console.log(req요청.body._id)

      /*
       "req요청.body.~id"를 number로 바꿈  -> "req요청.body"를 deleteOne()에 사용함. 
        ("req요청.body._id"  가 아니라. "req요청.body") 
      */
      req요청.body._id = parseInt(req요청.body._id);

      // ~.deleteOne()
      db.collection('ig_collection').deleteOne(req요청.body,function (err,obj결과) {
        console.log(err)
        console.log('c44 delete Finished')
        

        // c46-30) 성공코드 200:  res응답.status(200).send({message : "c46, success"});  
        // 👉 list.ejs
        res응답.status(200).send({message : "c46, fail"});
        
        // c46-40) 실패코드 400:  res응답.status(400).send({message : "c46, fail"});        
        // res응답.status(400).send({message : "c46, fail"});
      });      
    });


    // 🦄🦄c48 상세페이지를 만들어보자 :id (URL parameter), req요청.params.id
    // 👉detail_c48.ejs

    // :id
    app.get('/detail/:id',function (req요청,res응답) {
      
      //  req요청.params.id 
      // findOne({~},function(){})
      // parseInt 
      db.collection('ig_collection').findOne({_id: parseInt(req요청.params.id)}, function (err,p_db결과) {

        console.log(p_db결과)
        
        // .render('~c~',{ ~b~ : ~a~ })
        res응답.render('detail_c48.ejs',{ig_data : p_db결과 });        
      })      
    });


    // 🦄🦄c52 글 수정 기능1, edit page, html에서 PUT요청하기, method-override
    // 🦄🦄c54 글 수정 기능2. DB 데이터를 수정해보자. updateOne 비밀input보내기, redirect(~), submit button
    console.log('🦄🦄c52, 54')

    // 👉edit_c52.ejs

    /* 🍀
      한번에 모든 기능 만드려면 혼란스러우니,
      순서를 정하자
      일단 frontend파트 먼저 만들어놓고, 기능개발
    */
    /* 🍄
      10) ~/edit/:id 로 접속하면 :id 게시물 데이터 + 수정할수있는 웹페이지로 감

      20) 수정하고, submit         👉edit_c52.ejs

      30) list페이지에서 수정된 데이터가 반영됨
    */
   /* 
    👉상단코드: method-override
    npm install method-override   
   */

    // 52-10)
    // '/edit/:id'
    app.get('/edit/:id',(req요청,res응답)=>{    
      
      // findOne({_id: req요청.params.id},()=>{})
      db.collection('ig_collection').findOne({_id: parseInt(req요청.params.id)},function (p_err,p_db결과) {
        
        
        console.log(p_db결과)

        // .render('~c~',{ ~b~ : ~a~ }) : ~a~데이터를, ~b~이름으로,  ~c~~로 보냄,      
        res응답.render('edit_c52.ejs', {ig_posts: p_db결과})
      })
    });

    // 52-20-2)
    // 🍀c54 👉edit_c52.ejs, style="display:none; 안보이는 input만들어서, 몰래 id정보를 server.js로 보내기

    // 🍀Operator  (c40 reference)
    // $set:  업데이트 해줌 , (없으면 추가해줌)

    app.put('/edit',function (req요청,res응답) {
      /* 🍄
        form에 담긴 데이터를 활용해서,
        db.collecton 에 업데이트함

        updateOne({업데이트할 게시물 오브젝트}),{업데이트값},function (p_err,p_db결과) {})
      */
     db.collection('ig_collection').updateOne({_id: parseInt(req요청.body.ig_id)},{$set:{ 제목: req요청.body.ig_title , 날짜: req요청.body.ig_data}},function (p_err,p_db결과) {  

      console.log('c54 :'+ req요청.body.ig_id +req요청.body.ig_title)  
      console.log('c54 : updateOne fin')

      // .redirect('/list')
      res응답.redirect('/list')
     })

    });



})

// // 🌊 실습코드 끝------


// 🦄🦄c50 Bootstrap, nav.ejs..리액트처럼 첨부하기. <%- include('~') %>

/* 2)
 👉./public/style.css 만들기

  static files는 public폴더안에 보관하는게 관습
  CSS파일이 여기에 해당됨
  (static files : 데이터에 의해 변하지 않는 파일)
*/


// 4) 👉상단코드) app.use('.public', express.static('pulbic'));
// static 파일 보관위해 public폴더 쓸거라는 뜻


/* 6)
  👉 ./views/nav.html 만들기

  공유할 html 파일 : 
  views폴더
  html형식  (ejs X)
  
  적용은 ~.ejs파일에만 적용가능함
*/
/* 8)
  👉./views/~~~.ejs에 삽입하기

  여기 이자리에 nav_c50.html을 넣을수있음
   <%- include('nav_c50.html') %>
*/

/* 10)
  👉./views/index.ejs 파일변경, 폴더이동.. 
  👉./views/write.ejs 파일변경, 폴더이동.. 
*/

// app.listen(8080, function(){
//     console.log('c30 listening on 8080')
//   });

app.get('/', function(req요청, res응답) {               //2)
  // res응답.sendFile(__dirname + '/index.html')       //4)

  // c50-10)  res응답.render('index.ejs')   
  res응답.render('index.ejs')               
})   

app.get('./public_c50/style.css', function(req, res) {
  res.sendFile(__dirname + "/" + "style.css");
});

app.get('/write',(req요청,res응답)=>{       //2, 2-1)
  // res응답.sendFile(__dirname + '/write.html')       //2-2)

  // c50-10)  res응답.render('index.ejs')   
  res응답.render('write.ejs')
});

app.get('/detail',(req요청,res응답)=>{    

  res응답.render('detail.ejs')
});



// // 🦄🦄c56 (회원 로그인0) 세션, JWT, OAuth 등 회원인증 방법 이해하기
// // 🦄🦄c58 (회원 로그인1) 미들웨어, app.use(~), passport, express-session, passport.authenticate(~),passport.use(new LocalStorategy(~))

// // 🦄🦄c60 (회원 로그인2) 아이디 비번을 DB와 비교하고 세션 만들어주기, passport.serializeUser(~)
// // 🦄🦄c62 (회원 로그인3) 로그인 유저만 접속할 수 있는 페이지 만들기
// console.log('🦄🦄c56,58,60,62')
// (회원기능 만들기 실패함)

// // 👉login_c58.ejs

// // 🍀c58-10)
// // const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
// const session = require('express-session');

// app.use(passport.initialize());
// app.use(passport.session());
// app.use(session({ secret: 'ingyum123', resave: true, saveUninitialized: false }));



// // 🦄c58
//   app.get('/login',function (req요청,res응답) {
//     res응답.render('login_c58.ejs')
    
//   });

//   /*🍀-20)
//     passport.authenticate('local') : (인증해주세요)함수 ,  
  
//     인증 실패시 :  app.get('/fail',~~)로 연결 (failureRedirect : '/fail')

//     인증 성공시 : res응답.redirect('/') 
//   */
//   app.post('/login',passport.authenticate('local',{
//     failureRedirect : '/fail'
//   }),function (req요청,res응답) {

//     // redirect
//     res응답.redirect('/')
//   });

//   app.get('/fail',function () {
//     res응답.render('fail_c58.ejs')    
//   })
       
//   // 🍀c60-30) passport.authenticate('local',~)...로그인 성공시, 다음코드 실행됨
//     passport.use(new LocalStrategy({
//       usernameField: 'ig_login_id',                 // 👉login_c58.ejs
//       passwordField: 'ig_login_password',            // 👉login_c58.ejs
//       session: true,                                // login 후 session을 저장할것인지?
//       passReqToCallback: false,
//     }, function (req, 입력한아이디, 입력한비번, done) {

//       console.log(입력한아이디, 입력한비번);

//       /*-40)
//         error처리
//         DB에 ID가 없을때
//         DB에 ID가 있을때
//         DB에 ID가 있으면, input password == DB password 비교함

//         -50)
//         done: 3개의 argument를 가짐
//         done(서버에러, 성공시 사용자 db데이터, 에러 메시지)

//         -60)        
//         입력한 비밀번호를 암호화한 후 ,DB의 비밀번호와 비교해야함 (나중에 알아서 하세요)
//       */
//       db.collection('ig_login').findOne({ id: 입력한아이디 }, function (에러, user결과) {

//         if (에러) return done(에러)

//         if (!결과) return done(null, false, { message: '존재하지않는 아이디요' })

//         if (입력한비번 == user결과.ig_password) {

//           return done(null, user결과)
//         } else {

//           return done(null, false, { message: '비번틀렸어요' })
//         }
//       })
//     }));


//     // -70)
//     // login 성공 때, id를 이용해서 session을 저장
//     passport.serializeUser(function (user,done) {
//       done(null, user.id)
      
//     });

//     // login 성공 때, 위의 session데이터를 가진사람을 db에서 찾아주세요
//     passport.deserializeUser(function (아이디,done) {
      
//       done(null, {})
      
//     });





// 🦄🦄c64 .env 파일, environment variable, 가변적인 변수 데이터들 관리하기 
console.log('🦄🦄c64 ')


/* 
  🍀 npm install dotenv

  🍀 👉상단코드 : 
    root folder에 .env파일 만들때 : require('dotenv').config()
    다른 folder(env_c64)에 .env파일 만들때 : require('dotenv').config({path: "./env_c64/.env"})
  
  🍀 server.js와 같은 폴더에 '.env'파일 만듬
   👉.env  
*/



//🦄🦄c66, 68, 70

MongoClient.connect(uri, function(에러, p_client){ 
  
  if (에러) {
    return console.log(에러);
  }
  db = p_client.db('ig_database');


  //🦄🦄c66 검색기능1 Query string parameters, .replace('/search?value=' + 입력한value), req요청.query.value
  //🦄🦄c68 검색기능2 mongoDB사이트...index탭, Binary Search, 

  // 👉list.ejs

  //🍀c66-10)👉list.ejs , query string 만듬

  /*
    🍀c66-20) server.js에서 query string꺼내씀, DB에서 데이터 꺼냄. 

    -a) req요청.query : get함수에서 요청.body 쓰는것과 비슷하게 사용하는 방식임

    -b)
      collection().findOne()           : 1개 찾을 때
      collection().find().toArray()     : 여러개 찾을 때
  */

  app.get('/search',(req요청,res응답)=>{

    // req요청.query 
    console.log(req요청.query)
    console.log(req요청.query.value)

    //  collection().find().toArray()  
    // find({제목:req요청.query.value})  👉 문제점: 정확히 일치하는 것만 찾아줌
    db.collection('ig_collection').find({제목:req요청.query.value}).toArray((err,p_db결과)=>{
      console.log(p_db결과)

  
       //🍀🦄c68-10) 
      // 👉search_c68.ejs

      /*🍀-20)
          정규표현식이란?(Regular Expression: Regex)
          https://iankim2511.tistory.com/862


          /글쓰기/ 들어간것 모두 찾아줌
          검색할게 1억개있다면?? 


          🍀-30) 👉mongoDB사이트  collection 👉 index
          가나다라 정렬
          오름차순, 내림차순
          동시에 여러개 설정가능함      
      */
      res응답.render('search_c68.ejs',{ig_posts:p_db결과});
    })

   
    
  });

});

//🦄🦄c70 검색기능3 mongoDB사이트...search index탭, $.parma(~), $("#form").serialize(~), aggregate(~), $search, $sort,$limit, $project, {$meta:"searchScore"}

/* 
  🍀70-2) me: okky처럼 구글로 검색이동시키는 방법도 있음, 

 🍀70-10) 👉mongoDB사이트...search index탭

 🍀70-20) .aggregate(검색조건).toArray()  

 🍀70-30)
    $sort : 
    결과정렬
    _id 순으로 정렬
    1, -1 :  오름차순, 내림차순 정렬

    $limit :
    상위 10개만 가져와주세요...라는 limit

    $project : 검색결과에서 원하는것만 보여줌
    1 : 검색결과 나옴
    0 : 검색결과 나오지 않음
    항목에 넣지않아도, 검색결과 나오지 않는걸..로 알고있음

    searchScore:  검색어와 게시물의 관련석이 높은것, 검색 많이 하는 항목은 score가 높아짐

    score는 collection에 없어도 이런식으로 코딩하면 , 
    검색결과필터링으로 넣어줌
*/

MongoClient.connect(uri, function(에러, p_client){ 
  
  if (에러) {
    return console.log(에러);
  }
  db = p_client.db('ig_database');


  app.get('/search',(req요청,res응답)=>{

    console.log(req요청.query.value)
    
    //70-20) .aggregate(검색조건).toArray()  
    var 검색조건 =[
      {
        $search:{
          index : "ig_titleSearch",
          text:{
            query: req요청.query.value,
            path: "제목"
          }

        }
      },
      // 70-30)$sort, $limit,$project
      {$sort :{_id :1}},
      {$limit : 10},
      {$project : {제목 : 1, _id: 0, score :{$meta : "searchScore"}}}
    ];
    db.collection('ig_collection').aggregate(검색조건).toArray((err,p_db결과)=>{
      console.log(p_db결과)


      res응답.render('search_c68.ejs',{ig_posts:p_db결과});
    })       
  });
});


//🦄🦄c72 req.body._id, req.user._id, 회원 기능...게시판 기능
// (c56~62 회원기능 실패해서 , 이강의는 걍 설명만 듣고 넘김)


//🦄🦄c74 router관리, router.get(주소, 미들웨어, 함수), router.use(미들웨어)
// 👉 ./routes/shop_c74.js
// 👉 ./routes/zoo_c74.js

/* 
  🍀routes : 너무 많은 app.get(~)을 1개의 파일로 묶어서 관리하기
*/

// 🍀 app.use(미들웨어)
// ./rountes/shop_c74.js 파일을 여기에 첨부
app.use('/', require('./routes/shop_c74.js'))

// ./rountes/zoo_c74.js 파일을 여기에 첨부
// 미들웨어 함수 적용하는법 : ig_middleware
app.use('/zoo', ig_middleware,  require('./routes/zoo_c74.js'))

function ig_middleware(req,res,next) {
  console.log('ig_middleware_c74')  
}


// 🦄🦄c76 Google Cloud(=AWS, 네이버클라우드, cafe24) 사이트배포, app.yaml
// 👉app.yaml

/* 
  🍀2. server.js에 서버를 띄울 때 포트가 8080인지 확인합니다.
   
  app.listen 이 부분이 8080인지 확인합시다. 
  app.listen(8080, function() {
      console.log('listening on 8080')
    }) 
  아니라면 8080으로 변경해줍시다.
  왜냐면 구글클라우드에서 기본적으로 이용하는 포트가 8080입니다. 
  8080쓰기 싫으시면 따로 설정해주시면 되는데 귀찮으니 8080으로 맞춥니다.  


  🍀gcloud init

  🍀gcloud app deploy
*/

// 🦄🦄c78 이미지 업로드 & api만들기, enctype="", multer, upload.array(~,~)
// 👉views/upload_c78.ejs


/* 
  🍀-10) upload.ejs 만듬 : 👉views/upload_c78.ejs
*/

app.get('/upload',(req요청,res응답)=>{
  res응답.render('upload_c78.ejs');
});

/* 
  🍀-20_
      npm install multer

      diskStorage : 컴퓨터 하드안에 저장
      memoryStorage : 램안에 저장. 휘발성..저장
*/
const multer = require('multer')

// 🍉diskStorage
const storage = multer.diskStorage({

  // 🍉경로 : './public_c50/image_c78'
  destination: function (req, file, cb) {
    cb(null, './public_c50/image_c78')
  },

  // 🍉file name 설정 : file.originalname
  filename: function (req, file, cb) {


    /* 🍉파일명 추가로 넣기      
      a) 
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.originalname + '-' + uniqueSuffix)    

      b) 
      cb(null, file.originalname + '날짜:' + new Date())    
    */
    cb(null, file.originalname)
    
  }
})

// 🍉const upload : 모든설정...const upload에 저장함. const multer , const storage 가져옴

const upload = multer({
  storage: storage,

  /* 
    // 🍉fileFilter : PNG, JPG만 업로드하기
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
            return callback(new Error('PNG, JPG만 업로드하세요'))
        }
        callback(null, true)
    },

    // 🍉limits : 파일사이즈 제한
    limits:{
        fileSize: 1024 * 1024
    }
   */
});


/* 
  🍀-30
      upload.ejs에서 post요청오면

      ./public/image폴더안에 저장함
*/

/* 
  🍉미들웨어 const upload : upload.single('ig_uploadInput')
  🍉./views/upload.ejs의  <input type="file" name="ig_uploadInput"> 의 name="ig_uploadInput"가져옴
*/
app.post('/upload',upload.single('ig_uploadInput'),(req요청,res응답)=>{
  res응답.send('c78_fin');
});

/* 
  🍀-40 API만들기 (업로드한 이미지... API로 만들기)

  🍉URL파라미터 
  
    a) 이름짓기👉 :ig_imageName

      적용 👉 req요청.params.ig_imageName


    b) 파일경로 : __dirname +'/public_c50/image_c78'


    c) html에 img태그에 적용하기 (파일명 :   test_c78.jpg)
    👉upload_c78.ejs
     <img src="/public_c50/image_c78/test_c78.jpg" alt="">
*/

app.get('/image_c78/:ig_imageName',(req요청,res응답)=>{
  res응답.sendFile(__dirname +'/public_c50/image_c78'+ req요청.params.ig_imageName)
})


// 🦄🦄80 라이브러리 소개 helmet.js , Mongoose, Connect-mongo, OAuth소셜로그인
/* 
  보안 : helmet.js 라이브러리 
  ex) express사용하고있다는 정보...숨겨줄 필요가 있음

  Mongoose : mongodb 데이터저장할때 검사도와줌

  OAuth소셜로그인 
  Connect-mongo : 세션데이터..db저장  ...사용하면 속도 안느려지고 좋음
 */



// 🦄🦄88 Node서버+ React 합치기, app.get("*",~), 리액트 router사용, proxy 라이브 코딩

/*   
    리액트 라우터에서 다 해결해주므로, 서버의 역할을  db연결만으로 축소시킬수있음



    일반 자바스크립트 페이지 보다가,

    특정페이지 들어갔을때, 리액트 페이지 보여주는 법


    "/" 접속 : 자바스크립트 html페이지 보여줌

    "/react"접속 :  리액트 페이지 보여줌



    미들웨어 : 서버의 요청과 응답사이에 실행할 코드 , 

    유저가 /~~url로 요청시, 응답하기전에 실행할 코드





    "homepage" :"~~" 추가한 후 

    npm run build


    계속 중간에 멈추고 build를 해야하는가??

    ㄴㄴ, 라이브로 가능함

    proxy 검색
*/



