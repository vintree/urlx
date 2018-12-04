'use strict';

/*
 * @Author: puxiao.wh 
 * @Date: 2017-02-27 16:21:45 
 * @Last Modified by: puxiao.wh
 * @Last Modified time: 2017-12-14 19:21:51
 */

/**
 * url params => json
 * @param  {String} params=''
 * @param  {Function} callback=()=>{}
 */
function parse() {
	var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

	var json = {};
	if (params.indexOf('?') !== -1) {
		params = params.substr(1).split('&');
	}
	for (var i = 0, l = params.length; i < l; i++) {
		var param = params[i];
		param = param.split('=');
		json[param[0]] = callback ? callback(param[1]) : param[1];
	}
	return json;
}

function parseEncode() {
	var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

	return parse(params, function (data) {
		return encodeURIComponent(data);
	});
}

function parseDecode() {
	var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

	return parse(params, function (data) {
		return decodeURIComponent(data);
	});
}

/**
 * json => url params
 * @param  {Object} data
 * @param  {Boolean} isSearch=true, Whether to add '?'
 */
function stringify() {
	var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	var isSearch = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
	var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;

	var params = [];
	var res = '';
	for (var key in data) {
		if (data.hasOwnProperty(key)) {
			params.push(callback ? key + '=' + callback(data[key]) : key + '=' + data[key]);
		}
	}
	if (params.length > 0) {
		res = isSearch ? '?' : '';
	}
	return res + params.join('&');
}

function stringifyEncode() {
	var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	var isSearch = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

	return stringify(data, isSearch, function (data) {
		return encodeURIComponent(data);
	});
}

function stringifyDecode() {
	var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	var isSearch = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

	return stringify(data, isSearch, function (data) {
		return decodeURIComponent(data);
	});
}

/**
 * old params => new params
 * @param  {String} url=location.href
 * @param  {Object} obj
 */
function replace() {
	var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	var obj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	for (var o in obj) {
		if (obj.hasOwnProperty(o)) {
			var ixOf = url.indexOf(o);
			//  是否存在特定参数
			if (ixOf > -1) {
				var keyIx = ixOf + o.length + 1,
				    afterAllStr = url.substr(keyIx),
				    beforeStr = url.substr(0, keyIx),
				    ixOf2 = afterAllStr.indexOf('&');
				if (ixOf2 > -1) {
					var afterStr = afterAllStr.substr(ixOf2);
					//  该参数原val
					// let content = afterAllStr.substr( 0, ixOf2 );
					return beforeStr + obj[o] + afterStr;
				} else {
					return beforeStr + obj[o];
				}
			} else {
				// 不存在该参数，向后追加
				if (url.indexOf('?') === -1) {
					return url + '?' + o + '=' + obj[o];
				} else {
					return url + '&' + o + '=' + obj[o];
				}
			}
		}
	}
}

var urlx = {
	parse: parse,
	parseEncode: parseEncode,
	parseDecode: parseDecode,
	stringifyEncode: stringifyEncode,
	stringifyDecode: stringifyDecode,
	stringify: stringify,
	replace: replace
};

module.exports = urlx;
