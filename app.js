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

app.listen(3000, function() {
    console.log('Example app listening on port 3000!')
});

function json_agg(query) {
    return knex
        .from(query.as('col'))
        .select(knex.raw('json_agg(col)'));
}

app.get('/', function(req, res) {
    knex('student')
        .then(function(results) {
            res.json(results);
        });
});
