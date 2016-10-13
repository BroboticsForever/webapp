'use strict';

var express = require('express');
var os = require('os');
var redis = require('redis');
var app = express();
var PORT = process.env.PORT || 8081;

var client = redis.createClient('6379', 'redis');

console.log('Connected to redis sevice at redis:6379');

app.get('/', function (req, res) {
  client.incr('counter', function(err, counter) {
    if (err) {
      console.err(err.toString());
      return next(err);
    }

    var response = 'This page has been viewed ' + counter + ' times.<br>\n' +
                   'Currently viewing on ' + os.hostname() + '<br><br>\n\n' +
                   '<a href="http://ec2-54-244-136-163.us-west-2.compute.amazonaws.com:8082/">Visualizer 1</a><br>\n' +
                   '<a href="http://ec2-54-244-26-18.us-west-2.compute.amazonaws.com:8082/">Visualizer 2</a><br>\n'

    res.send(response);
  });
});

app.listen(PORT);

console.log('Running on http://' + os.hostname() + ':' + PORT);
