'use strict';

var md5 = require('spark-md5');

module.exports = function (str) {
	if (typeof str !== 'string') {
		throw new TypeError('Expected string');
	}

	return md5.hash(str);
};