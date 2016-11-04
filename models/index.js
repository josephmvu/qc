var Sequelize = require('sequelize');
var db = require('../db');
var sequelize = new Sequelize(db.url);

var Student = sequelize.define('student', {
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    school: Sequelize.STRING,
    grade: Sequelize.INTEGER
}, {
    timestamps: false
});

Student.sync();

module.exports.Student = Student;