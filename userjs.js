'use strict';

////////////////////////////////////

var md5      = require('./lib/md5');
var Dom      = require('./lib/dom');
var format   = require('url').format;
var parseUrl = require('url').parse;

////////////////////////////////////
/**
 * Генерирует подпись запроса
 *
 * @param uid {String} id загрузки / пользователя из имени загрузчика
 * @return {String}
 */
function sign(uid) {
	return md5(uid + "dd64vJK3s.dV1/z");
}

/**
 * Генерирует url для обращения к Fastdownload API и получения ссылки на загрузку
 *
 * @param uid {String} id загрузки / пользователя из имени загрузчика
 * @return {String}
 */
function createUrl(uid) {
	var urlObj = {
		protocol: "http",
		hostname: location.hostname,
		pathname: "/api/fastdownload/get",
		query: {
			uid:   uid,
			os:   "win8x64",
			appid: "dfdownloader",
			sign: sign(uid)
		}
	};

	return format(urlObj, true);
}

/**
 * Проверяет, является ли текущая страница
 * страницей с таймером
 *
 * @return {bool}
 */
function isDownloadPage() {
	return document.body.className.indexOf('page_download') != -1;
}

/**
 * Проверяет, является ли текушая страница
 * страницей с выбором метода загрузки
 *
 * @return {bool}
 */
function isGateawayPage() {
	return document.body.className.indexOf('page_download_gateway') != -1;
}

/**
 * Получает данные страницы с таймером
 *
 * @param cb {Function}
 */
function fetchDownloadPage(cb) {
	var xhr = new XMLHttpRequest();
	xhr.open('POST', location.pathname, true);
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			if(xhr.status >= 200 && xhr.status < 300) {
				var domparser = new DOMParser();
				var dom = domparser.parseFromString(xhr.responseText, 'text/html');

				setTimeout(cb.bind(null, dom), 0);
			} else {
				throw new Error('Download error - ' + xhr.status);
			}
		}
	};
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.send('gateway_result=1');
}

/**
 * Обращается к API и получает страницу ссылку загрузки
 *
 * @param api_url {String} ссылка на Fastdownload API
 * @param cb {Function}
 */
function fetchDownloadUrl(api_url, cb) {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', api_url, true);
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			if(xhr.status >= 200 && xhr.status < 300) {

				var jsapi = JSON.parse( xhr.responseText );

				if (!jsapi.status_code) {
					setTimeout(cb.bind(null, new Error()), 0);
					return;
				}

				setTimeout(cb.bind(null, null, jsapi.data.file.download_url), 0);
			} else {
				setTimeout(cb.bind(null, new Error()), 0);
			}
		}
	};

	var setRequestHeader = xhr.setRequestHeader;

	xhr.setRequestHeader = function(name, value) {
		if (name == 'X-Requested-With') { return; }

		setRequestHeader.call(this, name, value);
	};

	xhr.send();
}

/**
 * Получает ссылку на загрузчик
 *
 * @param tag {HTMLElement} элемент формы со ссылкой на загрузчик
 * @return {String}
 */
function getDownloaderUrl(tag) {
	if (tag.nodeName.toLowerCase() != 'form') {
		throw new Error('Impossible to find download url');
	}

	return tag.action;
}

/**
 * Извлекает id загрузки из ссылки на загрузчик
 *
 * @param downloader_url {String} ссылка на загрузчик
 * @return {String}
 */
function getUidFromUrl(downloader_url) {
	var file = parseUrl(downloader_url).pathname;
	return file.split('_')[1];
}

/**
 * Главная функция для страницы загрузки
 *
 * @param dom {HTMLDocument}
 */
function downloadMain(btn, dom) {
	var downloader_url = getDownloaderUrl(dom.getElementById('networkdownloader') || dom.getElementById('dfdownloader_frm') );
	var uid = getUidFromUrl(downloader_url);
	var api_url = createUrl(uid);

	fetchDownloadUrl(api_url, function(err, download_url){
		if (err) {
			btn.showError();
			return;
		}

		btn.bindUrl(download_url).showDownloadBar();
	});
}

function main() {
	var btn = new Dom();
	btn.install().showSpinner();

	if (isGateawayPage()) {
		fetchDownloadPage( downloadMain.bind(null, btn) );

	} else if (isDownloadPage()) {
		downloadMain(btn, document);

	} else {
		throw new Error('Undefined page');
	}
}

window.addEventListener('DOMContentLoaded', main, false);
