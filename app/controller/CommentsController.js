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

var Comment = require('../model/comment');
var CommentsController = require('express');

CommentsController.create = function(req, res){

    var comment = new Comment(req.body);

    comment.save(function(err){
        if(err) res.send(err);
        res.json({ message : 'Comment created' });
    });

};

CommentsController.readAll = function(req, res){
    Comment.find(function(err, comments){
        if(err) res.send(err);
        res.json(comments);
    });
};

CommentsController.readOne = function(req, res) {
    Comment.findById(req.params._id, function(err, comment) {
        if (err) res.send(err);
        res.json(comment);
    });
};

CommentsController.update = function(req, res) {
    Comment.findById(req.params._id, function(err, comment) {
        if (err) res.send(err);
        comment = req.body;
        comment.save(function(err) {
            if (err) res.send(err);
            res.json({ message: 'Comment updated!' });
        });
    });
};

CommentsController.delete = function(req, res) {
    Comment.remove({
        _id: req.params._id
    }, function(err, comment) {
        if (err) res.send(err);
        res.json({ message: 'Successfully deleted' });
    });
}

module.exports = CommentsController;