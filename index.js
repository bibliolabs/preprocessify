'use strict';

var transformTools = require('browserify-transform-tools');
var pp = require('preprocess');
var options = {includeExtensions: [".js"]};

module.exports = function(preprocessContext) {
    return transformTools.makeStringTransform("preprocessify", options,
            function (src, transformOptions, done) {
                done(null, pp.preprocess(src, preprocessContext, 'js'));
            });
};
