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