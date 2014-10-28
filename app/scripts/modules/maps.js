/** @module app/scripts/maps */
/* globals google */
'use strict';

var $ = require('jquery');
var defaults = {
	zoom: 15,
	mapTypeId: google.maps.MapTypeId.ROADMAP,
	mapTypeControl: false,
	streetViewControl: false,
	zoomControl: true,
	zoomControlOptions: {
		style: google.maps.ZoomControlStyle.SMALL
	},
	styles: [{
		'featureType': 'water',
		'stylers': [{
			'color': '#46bcec'
		}, {
			'visibility': 'on'
		}]
	}, {
		'featureType': 'landscape',
		'stylers': [{
			'color': '#f2f2f2'
		}]
	}, {
		'featureType': 'road',
		'stylers': [{
			'saturation': -100
		}, {
			'lightness': 45
		}]
	}, {
		'featureType': 'road.highway',
		'stylers': [{
			'visibility': 'simplified'
		}]
	}, {
		'featureType': 'road.arterial',
		'elementType': 'labels.icon',
		'stylers': [{
			'visibility': 'off'
		}]
	}, {
		'featureType': 'administrative',
		'elementType': 'labels.text.fill',
		'stylers': [{
			'color': '#444444'
		}]
	}, {
		'featureType': 'transit',
		'stylers': [{
			'visibility': 'off'
		}]
	}, {
		'featureType': 'poi',
		'stylers': [{
			'visibility': 'off'
		}]
	}]
};

$(window).load(function() {
	$('[map]').each(function() {
		var $el = $(this),
			latLng = $el.attr('map').split(','),
			settings = $.extend({}, defaults, {
				center: new google.maps.LatLng(parseFloat(latLng[0]), parseFloat(latLng[1])),
			}),
			map, marker;

		map = new google.maps.Map(this, settings);


		marker = new google.maps.Marker({
			position: new google.maps.LatLng(parseFloat(latLng[0]), parseFloat(latLng[1])),
			map: map,
			icon: '/images/ui/map-marker.png',
			title: $el.attr('map-title')
		});
	});
});