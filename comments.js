//Create web server
var express = require('express');
var router = express.Router();

//Import comments model
var Comments = require('../models/comments');

//GET comments
router.get('/', function(req, res, next) {
  Comments.find(function(err, comments) {
    if (err) {
      res.send(err);
    }
    res.json(comments);
  });
});

//GET comment by id
router.get('/:id', function(req, res, next) {
  Comments.findById(req.params.id, function(err, comment) {
    if (err) {
      res.send(err);
    }
    res.json(comment);
  });
});

//POST comment
router.post('/', function(req, res, next) {
  var comment = new Comments(req.body);
  comment.save(function(err, comment) {
    if (err) {
      res.send(err);
    }
    res.json(comment);
  });
});

//PUT comment
router.put('/:id', function(req, res, next) {
  Comments.findById(req.params.id, function(err, comment) {
    if (err) {
      res.send(err);
    }
    comment.name = req.body.name;
    comment.comment = req.body.comment;
    comment.save(function(err, comment) {
      if (err) {
        res.send(err);
      }
      res.json(comment);
    });
  });
});

//DELETE comment
router.delete('/:id', function(req, res, next) {
  Comments.findByIdAndRemove(req.params.id, function(err, comment) {
    if (err) {
      res.send(err);
    }
    res.json(comment);
  });
});

module.exports = router;