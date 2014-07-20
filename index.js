"use strict";

var transformTools = require('browserify-transform-tools');
var pp = require('preprocess');
var options = {includeExtensions: [".js"]};

module.exports = transformTools.makeStringTransform("preprocessify", options,
        function (src, opts, done) {
            done(null, pp.preprocess(src, opts.config, 'js'));
        });
