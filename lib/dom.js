'use strict';

/**
 * Объект управления элементом-ссылкой
 */
function Dom(url) {
	this.id = 'dmts-' + Math.random().toString().slice(2);

	// create button
	this.el = document.createElement('a');

	this.el.style.display = "block";
	this.el.style.textTransform = "uppercase";

	this.el.className = "df_button";
	this.el.id = this.id;

	// get action name
	var action = document.querySelector('.string_title').textContent;
	var span = document.createElement('span');
	span.appendChild( document.createTextNode(action) );

	this.el.innerHTML = '<span class="sprite download_icon"></span>&nbsp;';
	this.el.appendChild( span );

	this.el.href = url;
}

/** Вставлен ли элемент в DOM */
Dom.prototype.isInstalled = function() {
	return !!document.getElementById(this.id);
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

module.exports = Dom;