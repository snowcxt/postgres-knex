var express = require('express');
var knex = require('knex')({
    client: 'postgresql',
    connection: {
        host: 'localhost',
        user: 'postgres',
        password: '',
        database: 'postgres'
    }
});
var app = express();

app.listen(7000, function() {
    console.log('Example app listening on port 7000!')
});

function json_agg(query) {
    return knex
        .select(knex.raw('json_agg(t)'))
        .from(query.as('t'));
}

app.get('/', function(req, res) {
    var attendees = json_agg(
          knex
            .select('student.id', 'student.name')
            .from('student')
            .join('student__course', 'student__course.student', 'student.id')
            .where({
                'student__course.course': knex.raw('course.id')
            })
        )
        .as('attendees');

    knex
        .select('id', 'name', 'room', attendees)
        .from('course')
        .then(function(results) {
            res.json(results);
        });
});
