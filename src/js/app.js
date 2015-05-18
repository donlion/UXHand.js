//= include ../bower_components/q/q.js
//= include ../bower_components/regression-js/build/regression.min.js


'use strict';




var UXHand = new function() {

	//= include modules/synchronize.js
	//= include modules/compatibility.js
	//= include modules/options.js
	//= include modules/cycle.js
	//= include modules/setupListeners.js
	//= include modules/events.js
	//= include modules/calc.js
	//= include modules/domclasses.js
	//= include modules/destroy.js

	//=include modules/wireFrame.js

	this.version = '0.2.2';

	this.init = function() {
		console.log("init");

		if (!this.compatibility()) {
			console.info("Not compatible with localStorage");
			return;
		}
		if (!this.touchTest()) {
			console.info("Not compatible with touch");
			return;
		}

		this._synchronize().then(function() {
			console.log("_synchronize.then");

			UXHand._setupListeners();
			UXHand.cycle();
		});

		this.wireFrame.render();


	};


	this._data = {
		'scores': {
			left: null,
			right : null,
			both: null
		}
	};

	this._last = {
		start: null,
		end: null,
		drag: [],
		moved: false
	};

};


UXHand.init();















/*
_calc
last, left/right?
move => regression

_last
touch {
	xCoord,
	yCoord
},
move {
	first {
	xCoord,yCoord
	},
	drag [array],
	last {
	xCoord, yCoord
	}
}


_destroy
kill listeners
remove classes if options
clear all data if options
*/



































/*

var UXHand = new function(options) {

	var _this = this;

	this.options = {
		element: "textfield"
	};

	this.DOM = new function() {
		this.textField = $("#textfield");
	};

	this.setTouch = function() {
		_this.touch = {
			start: false,
			end: false,
			moved: false,
		};
	};

	this.touches = [];




	this.touchTest = function() {  
	  try {  
	    document.createEvent("TouchEvent");  
	    return true;  
	  } catch (e) {  
	    return false;  
		}  
	};

	this.init = function() {
		console.log("UXHand initiated");
		this.setTouch();
		this.wireFrame.setup();
		this.wireFrame.render();

		if (this.touchTest()) {
			this.DOM.textField.text("Welcome.");
		} else {
			this.DOM.textField.text("Hello.");
		}

		$(window).on("touchstart", function(e) {
			UXHand.touchStart(e);
		});

		$(window).on("touchend", function(e) {
			UXHand.touchEnd(e);
		});

		$(window).on("touchmove", function(e) {
			UXHand.touch.moved = true;
		});
	};


	//= include modules/wireframe.js


	this.createTouch = function(args) {

		var touch = {
			type: "touch",
			directionX: null,
			directionY: null,
			distance: 0,
			hand: null,
			score: null
		};

		$.extend(touch, args);

		this.touches.push(touch);

	};

	//= include modules/touchstart.js

	//= include modules/touchend.js

	//= include modules/processor.js


};

UXHand.init();
*/