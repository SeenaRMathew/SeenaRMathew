var express = require('express');
var router = express.Router();
let dao = {};

(async () => {
  const module = await import('../persistence/lowdb-persistence.mjs');
  dao = module.dao;
})();

// GET /books/ -> [ array of books ]
router.get('/', (req, res) => {
  res.json(dao.findBooks());
});

router.post('/', async (req, res) => {
  // title, author, year, no ids
  console.log('req.body:', req.body);
  let bookProto = req.body;

  let resultsBook = await dao.addBook(bookProto);
  res.json(resultsBook);
});

router.get('/gatsby', (req, res) => {
  res.send('The Great Gatsby');
});

router.get('/harry-potter', (req, res) => {
  res.send('Harry Potter and the Chamber of Secrets');
});

module.exports = router;
