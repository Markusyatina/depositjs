'use strict';

/* jshint multistr:true */

/** стили для загрузчика */
var css = " \
	.loader:before, \
	.loader:after, \
	.loader {\
		border-radius: 50%;\
		width: 2.5em;\
		height: 2.5em;\
		-webkit-animation-fill-mode: both;\
		animation-fill-mode: both;\
		-webkit-animation: load7 1.8s infinite ease-in-out;\
		animation: load7 1.8s infinite ease-in-out;\
	}\
	.loader {\
		top: -2.5em; \
		margin: 6px auto 7px;\
		font-size: 10px;\
		position: relative;\
		text-indent: -9999em;\
		-webkit-animation-delay: 0.16s;\
		animation-delay: 0.16s;\
	}\
	.loader:before {\
		left: -3.5em;\
	}\
	.loader:after {\
		left: 3.5em;\
		-webkit-animation-delay: 0.32s;\
		animation-delay: 0.32s;\
	}\
	.loader:before,\
	.loader:after {\
		content: '';\
		position: absolute;\
		top: 0;\
	}\
	@-webkit-keyframes load7 {\
		0%,\
		80%,\
		100% {\
			box-shadow: 0 2.5em 0 -1.3em #f30;\
		}\
		40% {\
			box-shadow: 0 2.5em 0 0 #f30;\
		}\
	}\
	@keyframes load7 {\
		0%,\
		80%,\
		100% {\
			box-shadow: 0 2.5em 0 -1.3em #f30;\
		}\
		40% {\
			box-shadow: 0 2.5em 0 0 #f30;\
		}\
	}"
;

/** создаёт элемент загрузчика */
function createSpinner() {
	var spinner = document.createElement('div');
	spinner.className = "loader";
	spinner.appendChild( document.createTextNode('Loading...') );

	return spinner;
}

/** создаёт кнопку загрузки */
function createDownloadBtn() {
	var id = 'dmts-' + Math.random().toString().slice(2);

	// create button
	var el = document.createElement('a');

	el.style.display = "block";
	el.style.textTransform = "uppercase";

	el.className = "df_button";
	el.id = id;

	return el;
}

/** создаёт текст с предложением скачать */
function createDownloadView() {
	var wrap = document.createElement('span');

	// get action name
	var action = document.querySelector('.string_title').textContent;
	var textView = document.createElement('span');
	textView.appendChild( document.createTextNode(action) );

	wrap.innerHTML = '<span class="sprite download_icon"></span>&nbsp;';
	wrap.appendChild( textView );

	return wrap;
}

/** создаёт сообщение об ошибке */
function createErrorView() {
	var textView = document.createElement('span');
	textView.appendChild( document.createTextNode("{: ERROR :}") );
	textView.style.lineHeight = "38px";
	return textView;
}

/**
 * Объект управления элементом-ссылкой
 */
function Dom() {
	this.el = createDownloadBtn();
	this._core = createDownloadView();
	this._error = createErrorView();

	//spinner
	this._spinner = createSpinner();
	this.$installCss();
}

/** Вставлен ли элемент в DOM */
Dom.prototype.isInstalled = function() {
	return !!document.getElementById(this.el.id);
};

/** Вставляет элемент в DOM */
Dom.prototype.install = function() {
	if (this.isInstalled()) {
		return this;
	}

	var before = document.querySelector('.file_info').nextElementSibling;
	before.parentNode.insertBefore(this.el, before);

	return this;
};

/** @private */
Dom.prototype.$installCss = function() {
	this._cssid = 'dmts-' + Math.random().toString().slice(2);

	if (document.getElementById(this._cssid)) {
		return this;
	}

	var style = document.createElement('style');
	style.id = this._cssid;
	style.textContent = css;

	document.head.insertBefore(style, document.head.firstChild);
	return this;
};

/** назаначает новый url на кнопку */
Dom.prototype.bindUrl = function(url) {
	this.el.href = url;
	return this;
};

/** @private */
Dom.prototype.$removeChilds = function() {
	while (this.el.firstChild) {
		this.el.removeChild(this.el.firstChild);
	}

	return this;
};

/** показывает загрузчик */
Dom.prototype.showSpinner = function() {
	this.$removeChilds();
	this.el.appendChild( this._spinner );

	return this;
};

/** показывает блок ошибки */
Dom.prototype.showError = function() {
	this.$removeChilds();
	this.el.appendChild( this._error );

	return this;
};

/** показывает сообщение о загрузке */
Dom.prototype.showDownloadBar = function() {
	this.$removeChilds();
	this.el.appendChild( this._core );

	return this;
};

module.exports = Dom;
