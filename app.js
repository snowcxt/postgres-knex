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
        .from(query.as('t'))
        .select(knex.raw('json_agg(t)'));
}

app.get('/', function(req, res) {
    var attendees = json_agg(knex('student')
            .select('student.id', 'student.name')
            .join('student__class', 'student__class.student', 'student.id')
            .where({
                'student__class.class': knex.raw('class.id')
            })
        )
        .as('attendees');

    knex('class')
        .select('id', 'name', 'room', attendees)
        .then(function(results) {
            res.json(results);
        });
});
