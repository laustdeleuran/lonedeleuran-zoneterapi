/** @module app/scripts/maps */
'use strict';

var $ = require('jquery');

$(document).ready(function() {
	var $scroll = $('html, body');
	$('a[href^="#"]').each(function() {
		var $el = $(this),
			id = $el.attr('href'),
			$target = $(id);

		if ($target.length) {
			$el.on('click', function(event) {
				event.preventDefault();

				var distance = $target.offset().top,
					duration = distance / 2;

				$scroll.animate({
					scrollTop: distance
				}, duration > 300 ? duration : 300, function() {
					window.location.hash = id;
				});
			});
		}
	});
});