/*

The MIT License (MIT)

Copyright (c) 2015 Guilherme Ogliari Rodrigues

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/

'use strict';

var express = require('express');
var router = express.Router();
var User = require('../model/user');

router.route('/users')
    
    .post(function(req, res){
        
        var user = new User(req.body);
    
        user.save(function(err){
            if(err) res.send(err);
            res.json({ message : 'User created' });
        });
    
    })

    .get(function(req, res){
        User.find(function(err, users){
            if(err) res.send(err);
            res.json(users);
        });
    });

router.route('/users/:user_id')

    .get(function(req, res) {
		User.findById(req.params.user_id, function(err, user) {
			if (err) res.send(err);
			res.json(user);
		});
	})

    .put(function(req, res) {
		User.findById(req.params.user_id, function(err, user) {
			if (err) res.send(err);
			user = req.body;
			user.save(function(err) {
				if (err) res.send(err);
				res.json({ message: 'User updated!' });
			});
		});
	})

    .delete(function(req, res) {
		User.remove({
			_id: req.params.user_id
		}, function(err, user) {
			if (err) res.send(err);
			res.json({ message: 'Successfully deleted' });
		});
    });

module.exports = router;