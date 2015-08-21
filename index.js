'use strict';

var transformTools = require('browserify-transform-tools');
var pp = require('preprocess');

module.exports = function(preprocessContext, options) {
    options = options || {};

    if (!options.includeExtensions) {
        options.includeExtensions = [".js"];
    }

    if (!options.type) {
        options.type = 'js';
    }

    return transformTools.makeStringTransform("preprocessify", options,
            function (src, transformOptions, done) {
                done(null, pp.preprocess(src, preprocessContext, options));
            });
};
