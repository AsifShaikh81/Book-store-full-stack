const express = require('express')
const router = express.Router()

const bookController = require('../controller/bookController')

router.get('/booklist',bookController.getAllBook)
router.post('/addbook',bookController.createBook)
router.delete('/deletebook/:id',bookController.deleteBook)
router.put("/updatebook/:id", bookController.updateBook);

module.exports = router