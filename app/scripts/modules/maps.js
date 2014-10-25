/** @module app/scripts/maps */
/* globals google */
'use strict';

var $ = require('jquery');
var defaults = {
	zoom: 15,
	mapTypeId: google.maps.MapTypeId.ROADMAP,
	styles: [{ // http://snazzymaps.com/style/80/cool-grey
		'featureType': 'landscape',
		'elementType': 'labels',
		'stylers': [{
			'visibility': 'off'
		}]
	}, {
		'featureType': 'transit',
		'elementType': 'labels',
		'stylers': [{
			'visibility': 'off'
		}]
	}, {
		'featureType': 'poi',
		'elementType': 'labels',
		'stylers': [{
			'visibility': 'off'
		}]
	}, {
		'featureType': 'water',
		'elementType': 'labels',
		'stylers': [{
			'visibility': 'off'
		}]
	}, {
		'featureType': 'road',
		'elementType': 'labels.icon',
		'stylers': [{
			'visibility': 'off'
		}]
	}, {
		'stylers': [{
			'hue': '#00aaff'
		}, {
			'saturation': -100
		}, {
			'gamma': 2.15
		}, {
			'lightness': 12
		}]
	}, {
		'featureType': 'road',
		'elementType': 'labels.text.fill',
		'stylers': [{
			'visibility': 'on'
		}, {
			'lightness': 24
		}]
	}, {
		'featureType': 'road',
		'elementType': 'geometry',
		'stylers': [{
			'lightness': 57
		}]
	}]
};

$(window).load(function() {
	$('[map]').each(function() {
		var latLng = $(this).attr('map').split(','),
			settings = $.extend({}, defaults, {
				center: new google.maps.LatLng(parseFloat(latLng[0]), parseFloat(latLng[1])),
			});

		new google.maps.Map(this, settings);
	});
});