var express = require('express');
var router = express.Router();
var Models = require('../models');

/* GET all students */
router.get('/', function(req, res, next) {
  Models.Student.findAll().then(function(students) {
      res.render('students/index', {
          students: students
      });
  }).catch(function(err) {
      next(err);
  });
});

/* GET new student form */
router.get('/new', function(req, res, next) {
    res.render('students/new');
});

/* CREATE student */
router.post('/', function(req, res, next) {
    Models.Student.create(req.body.student)
    .then(function(student) {
        res.redirect('/students');
    }).catch(function(err) {
        next(err);
    });
});

/* SHOW student */
router.get('/:id', function(req, res, next) {
    Models.Student.findOne({
        where: { id: req.params.id }
    }).then(function(student) {
        if (!student) {
            return res.redirect('/students');
        }
        res.render('students/show', {
            student: student
        });
    }).catch(function(err) {
        next(err);
    });
});

/* GET edit student form */
router.get('/:id/edit', function(req, res, next) {
    Models.Student.findOne({
        where: { id: req.params.id }
    }).then(function(student) {
        if (!student) {
            return res.redirect('/students');
        }
        res.render('students/edit', {
            student: student
        });
    }).catch(function(err) {
        next(err);
    });
});

/* UPDATE student*/
router.put('/:id', function(req, res, next) {
    Models.Student.findOne({
        where: { id: req.params.id }
    }).then(function(student) {
        
        if (!student) {
            return res.redirect('/students');
        }
        
        student.firstName = req.body.student.firstName;
        student.lastName = req.body.student.lastName;
        student.school = req.body.student.school;
        student.grade = req.body.student.grade;
        
        student.save().then(function() {
            res.redirect('/students');
        }).catch(function(err) {
            next(err);
        });
    }).catch(function(err) {
        next(err);
    });
});

/* DELETE student*/
router.delete('/:id', function(req, res, next) {
    Models.Student.destroy({
        where: { id: req.params.id }
    }).then(function() {
        console.log('Student deleted');
        res.redirect('/students');
    }).catch(function(err) {
        next(err);
    });
});

module.exports = router;
