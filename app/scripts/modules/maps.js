/** @module app/scripts/maps */
/* globals google */
'use strict';

var $ = require('jquery');
var defaults = {
	zoom: 15,
	mapTypeId: google.maps.MapTypeId.ROADMAP,
	styles: [{ // http://snazzymaps.com/style/29/light-monochrome
		'featureType': 'water',
		'elementType': 'all',
		'stylers': [{
			'hue': '#e9ebed'
		}, {
			'saturation': -78
		}, {
			'lightness': 67
		}, {
			'visibility': 'simplified'
		}]
	}, {
		'featureType': 'landscape',
		'elementType': 'all',
		'stylers': [{
			'hue': '#ff00ff'
		}, {
			'saturation': -100
		}, {
			'lightness': 100
		}, {
			'visibility': 'simplified'
		}]
	}, {
		'featureType': 'road',
		'elementType': 'geometry',
		'stylers': [{
			'hue': '#bbc0c4'
		}, {
			'saturation': -93
		}, {
			'lightness': 31
		}, {
			'visibility': 'simplified'
		}]
	}, {
		'featureType': 'poi',
		'elementType': 'all',
		'stylers': [{
			'hue': '#00ffff'
		}, {
			'saturation': -100
		}, {
			'lightness': 100
		}, {
			'visibility': 'off'
		}]
	}, {
		'featureType': 'road.local',
		'elementType': 'geometry',
		'stylers': [{
			'hue': '#e9ebed'
		}, {
			'saturation': -90
		}, {
			'lightness': -8
		}, {
			'visibility': 'simplified'
		}]
	}, {
		'featureType': 'transit',
		'elementType': 'all',
		'stylers': [{
			'hue': '#e9ebed'
		}, {
			'saturation': 10
		}, {
			'lightness': 69
		}, {
			'visibility': 'on'
		}]
	}, {
		'featureType': 'administrative.locality',
		'elementType': 'all',
		'stylers': [{
			'hue': '#2c2e33'
		}, {
			'saturation': 7
		}, {
			'lightness': 19
		}, {
			'visibility': 'on'
		}]
	}, {
		'featureType': 'road',
		'elementType': 'labels',
		'stylers': [{
			'hue': '#bbc0c4'
		}, {
			'saturation': -93
		}, {
			'lightness': 31
		}, {
			'visibility': 'on'
		}]
	}, {
		'featureType': 'road.arterial',
		'elementType': 'labels',
		'stylers': [{
			'hue': '#bbc0c4'
		}, {
			'saturation': -93
		}, {
			'lightness': -2
		}, {
			'visibility': 'simplified'
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