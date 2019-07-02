let express = require('express');
let router = express.Router();

router.get('/:id/:action', (req,res,next) => {
  console.log(`URL parameters: id ${req.params.id} + action ${req.params.action}`);
  res.send("Ok!");
});

module.exports = router;
