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

	this.wireFrame = new function() {

	

		this.setup = function() {

			console.log("wireframe setup");

	

		};

	

		this.errorGap = function() {

	

			return {

				x: [$(window).width() * 0.425, $(window).width() * 0.575]

			};

	

		};

	

		this.render = function() {

			console.log(this);

			var rendering = [

				"<div ",

				"style='",

				"position:absolute;",

				"top:0;",

				"bottom:0;",

				"left:",

				this.errorGap().x[0],

				"px;",

				"width:",

				this.errorGap().x[1]-this.errorGap().x[0],

				"px;",

				"background-color:rgba(0,0,0,0.2);",

				"display:inline-block;",

				"' />"

			]; //ErrorGap

	

			$("body").prepend(rendering.join(""))

	

	

			rendering = [

				"<div class='lefthand'",

				"style='",

				"position:absolute;",

				"bottom:0;",

				"left:0;",

				"width:",

				$(window).width() * 0.425,

				"px;",

				"height:",

				$(window).height() * 0.575,

				"px;",

				"background-color:rgba(255,0,0,0.1);",

				"' />"

				]; //LeftHandArea

			$("body").prepend(rendering.join(""));

			rendering = [

				"<div class='righthand'",

				"style='",

				"position:absolute;",

				"bottom:0;",

				"right:0;",

				"width:",

				$(window).width() * 0.425,

				"px;",

				"height:",

				$(window).height() * 0.575,

				"px;",

				"background-color:rgba(255,0,0,0.1);",

				"' />"

				]; //LeftHandArea

			$("body").prepend(rendering.join(""));

		};

	

	

	

	

		this.areas = {

	

			left: function() {

				

			},

	

			right: function() {

	

			}

	

		};

	

	};



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
	this.touchStart = function(e) {
	
		var dataObj = e.originalEvent;
	
		this.DOM.textField.prepend(e.type+": "+dataObj.changedTouches[0].clientX+"<br />");
		
	
		this.touch.start = dataObj;
	
	};

	this.touchEnd = function(e) {
	
		var dataObj = e.originalEvent;
	
		this.touch.end = dataObj;
	
	
		if (this.touch.start) {
			this.processor.init();
		}
	
	};

	this.processor = new function() {
	
		this.type = "touch";
	
	
		this.init = function() {
	
			var touch = _this.touch;
	
			var output = "Processor initiated\n";
	
			if (touch.moved) {
				output += "... move detected";
	
				this.drag();
			} else {
				output += "... touch detected";
	
				this.tap();
			}
	
			$("body").append(output);
	
			this.end();
		};
	
	
		this.end = function() {
			_this.setTouch();
		};
	
	
		this.drag = function() {
	
	
		
	
	
			var touch = _this.touch;
	
	
		
	
	
			var vectors = [
	
	
				{
	
	
					y: touch.start.touches[0].clientY,
	
	
					x: touch.start.touches[0].clientX
	
	
				},
	
	
				{
	
	
					y: touch.end.changedTouches[0].clientY,
	
	
					x: touch.end.changedTouches[0].clientX
	
	
				}
	
	
			];
	
	
		
	
	
			var directionY = function() {
	
	
				if (vectors[0].y > vectors[1].y) { //greater than, because the browser calculates from top left
	
	
					$("#textfield").prepend("it's upwards<br />");
	
	
					return "up";
	
	
		
	
	
				} else if (vectors[0].y == vectors[1].y) {
	
	
					$("#textfield").prepend("it's horizontal<br />");
	
	
					return "none";
	
	
		
	
	
				} else {
	
	
					$("#textfield").prepend("it's downwards<br />");
	
	
					return "down";
	
	
		
	
	
				}
	
	
			};
	
	
		
	
	
			var directionX = function() {
	
	
				if (vectors[0].x < vectors[1].x) { //greater than, because the browser calculates from top left
	
	
					$("#textfield").prepend("it's rightwards<br />");
	
	
					return "right";
	
	
		
	
	
				} else if (vectors[0].x == vectors[1].x) {
	
	
					$("#textfield").prepend("it's vertical<br />");
	
	
					return "none";
	
	
		
	
	
				} else {
	
	
					$("#textfield").prepend("it's leftwards<br />");
	
	
					return "left";
	
	
		
	
	
				}
	
	
			};
	
	
		
	
	
			// directionY();
	
	
			// directionX();
	
	
		
	
	
		
	
	
			_this.createTouch({
	
	
				type: "drag",
	
	
				directionX: directionX(),
	
	
				directionY: directionY(),
	
	
				distance: 0,
	
	
				hand: "none",
	
	
				score: 0
	
	
			});
	
	
		
	
	
		};
	
	
	};
	



};

UXHand.init();