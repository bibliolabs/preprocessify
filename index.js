'use strict';

var transformTools = require('browserify-transform-tools');
var fs = require('fs');
var pp = require('preprocess');

module.exports = transformTools.makeStringTransform('preprocessify', {},
    function (content, transformOptions, done) {
        var config = transformOptions.config;

        var context;

        if (config.context) {
            context = config.context;
        } else if (config.contextFile) {
            context = JSON.parse(fs.readFileSync(config.contextFile, 'utf8'));
        } else {
            context = {};
        }

        done(null, pp.preprocess(content, context, {type: 'js'}));
    });
