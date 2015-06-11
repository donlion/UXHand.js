// include ../bower_components/q/q.js
// include ../bower_components/regression-js/build/regression.min.js


'use strict';




var UXHand = new function() {

	this.isIOS = function() {
		return navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false;
	};


	//= include modules/synchronize.js
	//= include modules/compatibility.js
	//= include modules/options.js
	//= include modules/cycle.js
	//= include modules/setupListeners.js
	//= include modules/events.js
	//= include modules/calc.js
	//= include modules/session.js
	//= include modules/domclasses.js
	//= include modules/destroy.js
	//= include modules/wireFrame.js
	//= include modules/updateClass.js

	//= include modules/listeners.js


	this.version = '0.4';

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

		this._synchronize(function() {
			console.log("_synchronize.then");

			UXHand._setupListeners();
			UXHand.cycle();
		});


	};


	this._session = {
		hand: null,
		count: 0,
		threshold: this.options().sessionThreshold
	};

	this._data = {
		'scores': {
			left: null,
			right : null,
			both: null
		},
		'current': null
	};


	this._last = {
		start: null,
		end: null,
		drag: [],
		moved: false
	};


	this.tracking = [];


};


UXHand.init();