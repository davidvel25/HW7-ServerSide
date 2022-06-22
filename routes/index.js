var express = require('express');
var router = express.Router();

let BookServerArray = [];

let Book = function (bTitle, bYear, bLastName, bFirstName, bISBN, bGenre, bReviewer, bDate, bRating){
  this.title = bTitle;
  this.year = bYear;
  this.lastName = bLastName;
  this.firstName = bFirstName;
  this.libraryCount = BookServerArray.length + 1;
  this.ISBN = bISBN;
  this.genre = bGenre;
  this.reviewer = bReviewer;
  this.date = bDate;
  this.rating = bRating;
  this.ID = Math.random().toString(16).slice(5);

  //Rating Catalog
  this.newReview = [new Review(bDate, bTitle, bGenre, bReviewer, bRating)];
}

let Review = function(bDate, bTitle, bGenre, bReviewer, bRating){
  this.date = bDate;
  this.title = bTitle;
  this.genre = bGenre;
  this.reviewer = bReviewer;
  this.rating = bRating;
}

BookServerArray.push(new Book("book1", 2012, "floop", "droop", 1925320, 'adventure', 'John Dempsey', '2022-05-04', '5'));


/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' }); //replace this line with the one below
  res.sendFile('index.html');
});
router.get('/getAllBooks', function(req, res, next){
  // res.json(BookServerArray);
  res.status(200).json(BookServerArray);
});

router.post('/AddBook', function(req, res){
  const newBook = req.body;
  // newBook.ID = lastID;
  BookServerArray.push(newBook);
  res.status(200).json(newBook);
}
)

module.exports = router;
