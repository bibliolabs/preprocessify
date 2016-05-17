'use strict';

var assert = require('chai').assert;
var browserify = require('browserify');
var path = require('path');
var transformTools = require('browserify-transform-tools');
var preprocessify = require('../index.js');

describe('preprocessify', function() {
    it('it should transform javascript source running preprocess using a context object', function (done) {
        var source = path.resolve(__dirname, "../fixtures/exampleSrc.js");

        var context = {
            FOO: "BAR in object"
        };

        transformTools.runTransform(preprocessify, source, {config: {context: context}},
            function(err, transformed) {
                assert.equal(transformed, 'console.log("BAR in object");\n');
                done();
            });
    });

    it('it should transform javascript source running preprocess using a context file', function (done) {
        var source = path.resolve(__dirname, "../fixtures/exampleSrc.js");
        var contextFile = path.resolve(__dirname, "../fixtures/exampleContext.json");

        transformTools.runTransform(preprocessify, source, {config: {contextFile: contextFile}},
            function(err, transformed) {
                assert.equal(transformed, 'console.log("BAR in file");\n');
                done();
            });
    });

    it('it should transform browserify bundled code using a context file', function (done) {
        var contextFile = path.resolve(__dirname, "../fixtures/exampleContext.json");

        var b = browserify(path.resolve(__dirname, "../fixtures/exampleSrc.js"))
            .transform(preprocessify, {
                includeExtensions: ['.js'],
                contextFile: contextFile
            });

        b.bundle(function (error, buffer) {
            assert(buffer.toString().includes('console.log("BAR in file")'));
            done();
        });
    });

    it('it should transform browserify bundled code using a context object', function (done) {
        var context = {
            FOO: "BAR in object"
        };

        var b = browserify(path.resolve(__dirname, "../fixtures/exampleSrc.js"))
            .transform(preprocessify, {
                includeExtensions: ['.js'],
                context: context
            });

        b.bundle(function (error, buffer) {
            assert(buffer.toString().includes('console.log("BAR in object")'));
            done();
        });
    });
});
