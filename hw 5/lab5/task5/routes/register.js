let express = require('express');
let router = express.Router();

router.post('/', (req,res)=>{
  console.log(req.body);
  let ans = JSON.stringify(req.body);
  ans = JSON.parse(ans);
  console.log(ans.login);
  console.log('Параметры POST запроса: '+JSON.stringify(req.body));

  res.render('index', {login: ans.login, email: ans.email, pass: ans.password});
});

module.exports = router;
