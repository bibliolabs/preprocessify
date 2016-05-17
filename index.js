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
            done(new Error('A context object or file must be specified (e.g. "browserify -t [preprocessify --contextFile ./path/to/file.json] app.js" or "b.transform(preprocessify, {context: {FOO:BAR}})"'));
        }

        done(null, pp.preprocess(content, context, {type: 'js'}));
    });

