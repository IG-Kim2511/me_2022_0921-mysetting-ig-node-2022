
/*🍀server.js 상단 코드 */





//c13) EJS
app.set('view engine', 'ejs');

// c22)  “/public 위치에 있는 폴더를 쓰겠다”라는 뜻
app.use('/public', express.static('public'))

// c23-10) method-override
const methodOverride = require('method-override')
app.use(methodOverride('_method'))



























