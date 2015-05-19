// include ../bower_components/q/q.js
// include ../bower_components/regression-js/build/regression.min.js


'use strict';




var UXHand = new function() {

	this.isIOS = function() {
		return navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false;
	};
	this._synchronize = function(callback) {
		console.log("_synchronize");
	
	
		var localData = JSON.parse(localStorage.getItem("UXHandData"));
	
		if (
			this._data.scores.left == null
			&& this._data.scores.right == null
			&& this._data.scores.both == null
			&& localData
			) {
			this._data = localData;
		} else {
			localStorage.setItem("UXHandData", JSON.stringify(this._data));
		}
	
		if (callback) {
			callback();
		}
	};

	this.compatibility = function() {
	  try {
	    return 'localStorage' in window && window['localStorage'] !== null;
	  } catch (e) {
	    return false;
	  }
	};
	
	this.touchTest = function() {  
	  try {  
	    document.createEvent("TouchEvent");  
	    return true;  
	  } catch (e) {  
	    return false;  
		}  
	};

	this.options = function() {
	
		var userOptions = window.UXHandOptions;
	
	
		var output = {
			certainty: 0.2,
			cycleDelay: 20000,
			destroyClasses: true,
			destroyData: true,
			root: document.body,
			threshold: 50
		};
	
	
		if (userOptions) {
			try {
				for (var key in userOptions) {
					output[key] = userOptions[key];
				}
			} catch(e) {
				console.info("Are your options an array..?");
				console.error(e);
			}
		}
	
		return output;
	
	};

	this.cycle = function() {
		console.info("cycle");
	
		try {
			this._calc();
		} catch(e) {
			console.log("No touches to calculate");
		} finally {
			var _data = this._data;
	
			this._domClasses(_data);
	
			this._synchronize();
	
	
			if (UXHand.HeatMap) {
				var data = this._last;
	
				if (data.start && data.start.pageX != 0 && data.start.pageY != 0) {
					this.tracking.push({
						x: data.start.pageX,
						y: data.start.pageY,
						pageX: data.start.pageX,
						pageY: (data.start.pageY-window.pageYOffset),
						count: 5
					});
				}
	
				if (data.end && data.end[0].clientY != 0 && data.end[0].clientX != 0) {
					this.tracking.push({
						x: data.end[0].clientX,
						y: data.end[0].clientY,
						pageX: data.end[0].pageX,
						pageY: (data.end[0].pageY-window.pageYOffset),
						count: 5
					});
				}
	
				if (data.drag.length != 0) {
					[].forEach.call(data.drag, function(drag, index) {
						console.log(drag.x, drag.y);
						UXHand.tracking.push({
							x: drag.x,
							y: drag.y,
							pageX: drag.pageX,
							pageY: (drag.pageY-window.pageYOffset),
							count: 5 
						});
					});
				}
	
			}
	
	
	
			this._last.move = false;
			this._last.drag = [];
		}
	
	};

	this._setupListeners = function() {
	
		var rootElement = document.body;
		//rootElement = document.querySelector("iframe").contentDocument.body;
	
		rootElement.addEventListener('touchstart', function(e) {
			UXHand._events.touchstart(e);
		});
	
		rootElement.addEventListener('touchend', function(e) {
			UXHand._events.touchend(e);
		});
	
		rootElement.addEventListener('touchmove', function(e) {
			UXHand._events.touchmove(e);
		});
	
	};

	this._events = {
		
		'touchstart': function(e) {
			var dataObj = e;
			console.log("TOUCHSTART", e);
			if (!dataObj) {
				dataObj = e;
			}
	
			UXHand._last.start = dataObj;
	
		},
	
		'touchend': function(e) {
			var dataObj = e;
			console.log("TOUCHEND", e);
	
			if (!dataObj) {
				console.log('!dataObj');
				dataObj = e;
			}
	
			UXHand._last.end = dataObj.changedTouches;
	
			UXHand.cycle();
		},
	
		'touchmove': function(e) {
			console.log(e.touches[0].clientX);
			UXHand._last.moved = true;
	
			if (UXHand._last.drag.indexOf(e) == -1) {
				console.log(e);
				UXHand._last.drag.push({
					"x": e.touches[0].clientY,
					"y": e.touches[0].clientX,
					"pageX": e.touches[0].pageX,
					"pageY": (e.touches[0].pageY-window.pageYOffset)
				});
			}
		}
	
	
	};

	this._calc = function() {
	
		if (!this._last) {
			return;
		}
	
		var _last = this._last;
	
		var output = [];
	
	
		// var vectors = [
		// 	{
		// 		y: _last.start.touches[0].clientY,
		// 		x: _last.start.touches[0].clientX
		// 	},
		// 	{
		// 		y: _last.end[0].clientY,
		// 		x: _last.end[0].clientX
		// 	}
		// ];
	
	
		var vectors = [
			{
				y: _last.start.pageY,
				x: _last.start.pageX
			},
			{
				y: _last.end[0].clientY,
				x: _last.end[0].clientX
			}
		];
	
		console.log(vectors);
	
	
		var drag = function(output) {
	
	
			/*
			Measure direction Y
			*/
			if (vectors[0].y > vectors[1].y) {
				//greater than, because the browser calculates from top left
				output.push("up");
			} else if (vectors[0].y == vectors[1].y) {
				output.push("horizontal");
			} else {
				output.push("down");
			}
	
			console.log(UXHand.isIOS());
	
			if (UXHand.isIOS()) {
				if (vectors[0].x < vectors[1].x) { //greater than, because the browser calculates from top left
					output.push("left");
				} else if (vectors[0].x == vectors[1].x) {
					output.push("vertical");
				} else {
					output.push("right");
				}
			} else {
	
	
				/*
				Measure direction X
				*/
				if (vectors[0].x < vectors[1].x) { //greater than, because the browser calculates from top left
					output.push("right");
				} else if (vectors[0].x == vectors[1].x) {
					output.push("vertical");
				} else {
					output.push("left");
				}
	
			}
	
		};
	
	
	
	
		var tap = function(output) {
	
			if (vectors[0].x < area.w) {
				console.log("Left hand");
				UXHand._data.scores.left++;
			} else if (vectors[0].x > area.w+area.x) {
				console.log("Right hand");
				UXHand._data.scores.right++;
			}
	
		};
	
	
	
	
	
		var area = this.wireFrame.areas();
	
	
	
	
	
		if (_last.moved) {
			output.push("Move detected");
	
			drag(output);
		} else {
			output.push("Touch detected");
	
			tap(output);
		}
	
		console.log(output.join(", "));
	
		if (output.indexOf("vertical") > -1) {
			if (vectors[0].x < area.w) {
				console.log("Left hand");
				this._data.scores.left++;
			} else if (vectors[0].x > area.w+area.x) {
				console.log("Right hand");
				this._data.scores.right++;
			}
		} else {
	
			console.log("_last", _last);
	
			var measurePath = {
				left: 0,
				right : 0
			};
	
			[].forEach.call(_last.drag, function(drag, index) {
				// var dragData = _last.drag[index].touches[0];
				var position = _last.drag[index];
	
				// var position = {
				// 	x: dragData.clientX,
				// 	y: dragData.clientY
				// };
	
				if (_last.drag[index+1]) {
	
					// var nextDragData = _last.drag[index+1].touches[0];
					var nextPosition = _last.drag[index+1];
	
					// var nextPosition = {
					// 	x: nextDragData.clientX,
					// 	y: nextDragData.clientY
					// };
	
	
					if (
						nextPosition.x > position.x
						&& nextPosition.y < position.y
						) {
						measurePath.right++;
					} else if (
						nextPosition.x < position.x 
						&& nextPosition.y < position.y
						) {
						measurePath.left++;
					} else if (
						nextPosition.x > position.x
						&& nextPosition.y > position.y
						) {
						measurePath.left++;
					} else if (
						nextPosition.x < position.x
						&& nextPosition.y > position.y
						) {
						measurePath.right++;
					}
	
	
				}
	
			});
	
			if (measurePath.left > measurePath.right) {
				console.error("LEFT");
				UXHand._data.scores.left++;
			} else if (measurePath.right > measurePath.left) {
				console.error("RIGHT");
				UXHand._data.scores.right++;
			}
	
	
	
		}
	
	
	};

	this._domClasses = function(_data) {
	
		var update = function(value) {
			var classes = value.split(',');
	
			var html = document.querySelector('html'),
					htmlCurrent = html.className.indexOf(' ') > -1 ? html.className.split(' ') : [];
	
			var update = htmlCurrent;
	
			classes.forEach(function(name) {
				update.push(name);
			});
	
			console.log("update", update);
			html.className = update.join(' ');
		};
	
		var reset = function() {
			console.log('reset');
			var html = document.querySelector('html'),
					htmlCurrent = html.className.split(' ');
			
			var inHouseClasses = ['righthand', 'lefthand', 'bothhands'];
	
			inHouseClasses.forEach(function(inHouse) {
				htmlCurrent.splice(inHouse, 1);
			});
	
			html.className = htmlCurrent;
	
		};
	
	
		var count = _data.scores.left+_data.scores.right+_data.scores.both;
	
		if (document.getElementById('textfield')) {
			document.getElementById('textfield').innerHTML = count;
		}
	
		if (!_data || count < this.options().threshold) {
			return;
		}
	
		console.log("COUNT", count, this.options().threshold);
	
		console.log(_data.scores.left, _data.scores.right*(1+this.options().certainty));
	
		if (_data.scores.left > _data.scores.right*(1+this.options().certainty)) {
			reset();
			update('lefthand');
		} else if (_data.scores.right > _data.scores.left*(1+this.options().certainty)) {
			reset();
			update('righthand');
		}
	
		var average = (_data.scores.right+_data.scores.left)/2;
	
		if (_data.scores.both > average) {
			update('bothhands');
		}
	
	};

	this.destroy = function() {
	
		localStorage.removeItem("UXHandData");
	
	};

	this.wireFrame = new function() {
	
		this.areas = function() {
			var gap = UXHand.options().certainty,
					x = screen.width*gap,
					w = (screen.width/2)-(x/2);
	
			return {
				gap: gap,
				x: x,
				w: w
			};
		};
	
		this.errorGap = function() {
	
			var area = this.areas();
	
			return {
				x: [0, area.w+area.x]
			};
	
		};
	
		this.render = function() {
			console.log(this.errorGap());
	
			var area = this.areas();
	
			var rendering = [
				"<div ",
				"style='",
				"position:fixed;",
				"top:0;",
				"bottom:0;",
				"left:",
				area.w,
				"px;",
				"width:",
				area.x,
				"px;",
				"background-color:rgba(0,0,0,0.2);",
				"display:inline-block;",
				"' />"
			]; //ErrorGap
	
			//$("body").prepend(rendering.join(""));
			document.body.innerHTML += rendering.join("");
	
	
	
			rendering = [
				"<div class='lefthand'",
				"style='",
				"position:fixed;",
				"bottom:0;",
				"left:0;",
				"width:",
				area.w,
				"px;",
				"height:",
				(screen.height*0.575),
				"px;",
				"background-color:#3F51B5;opacity:.3;",
				"' />"
				]; //LeftHandArea
	
			//$("body").prepend(rendering.join(""));
			document.body.innerHTML += rendering.join("");
	
			rendering = [
				"<div class='righthand'",
				"style='",
				"position:fixed;",
				"bottom:0;",
				"right:0;",
				"width:",
				area.w,
				"px;",
				"height:",
				(screen.height*0.575),
				"px;",
				"background-color:#3F51B5;opacity:.3;",
				"' />"
				]; //LeftHandArea
			//$("body").prepend(rendering.join(""));
			document.body.innerHTML += rendering.join("");
		};
	
	
	
	};


	this.version = '0.2.3';

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


	this.tracking = [];


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

	this.wireFrame = new function() {

	

		this.areas = function() {

			var gap = UXHand.options().certainty,

					x = screen.width*gap,

					w = (screen.width/2)-(x/2);

	

			return {

				gap: gap,

				x: x,

				w: w

			};

		};

	

		this.errorGap = function() {

	

			var area = this.areas();

	

			return {

				x: [0, area.w+area.x]

			};

	

		};

	

		this.render = function() {

			console.log(this.errorGap());

	

			var area = this.areas();

	

			var rendering = [

				"<div ",

				"style='",

				"position:fixed;",

				"top:0;",

				"bottom:0;",

				"left:",

				area.w,

				"px;",

				"width:",

				area.x,

				"px;",

				"background-color:rgba(0,0,0,0.2);",

				"display:inline-block;",

				"' />"

			]; //ErrorGap

	

			//$("body").prepend(rendering.join(""));

			document.body.innerHTML += rendering.join("");

	

	

	

			rendering = [

				"<div class='lefthand'",

				"style='",

				"position:fixed;",

				"bottom:0;",

				"left:0;",

				"width:",

				area.w,

				"px;",

				"height:",

				(screen.height*0.575),

				"px;",

				"background-color:#3F51B5;opacity:.3;",

				"' />"

				]; //LeftHandArea

	

			//$("body").prepend(rendering.join(""));

			document.body.innerHTML += rendering.join("");

	

			rendering = [

				"<div class='righthand'",

				"style='",

				"position:fixed;",

				"bottom:0;",

				"right:0;",

				"width:",

				area.w,

				"px;",

				"height:",

				(screen.height*0.575),

				"px;",

				"background-color:#3F51B5;opacity:.3;",

				"' />"

				]; //LeftHandArea

			//$("body").prepend(rendering.join(""));

			document.body.innerHTML += rendering.join("");

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

	//= include modules/touchstart.js

	//= include modules/touchend.js

	//= include modules/processor.js


};

UXHand.init();
*/