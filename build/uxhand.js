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
			threshold: 50,
			sessionThreshold: 10
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
						// console.log(drag.x, drag.y);
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
	
		if (rootElement) {
	
			rootElement.addEventListener('touchstart', function(e) {
				UXHand._events.touchstart(e);
			});
	
			rootElement.addEventListener('touchend', function(e) {
				UXHand._events.touchend(e);
			});
	
			rootElement.addEventListener('touchmove', function(e) {
				UXHand._events.touchmove(e);
			});
	
		} else {
			document.addEventListener("DOMContentLoaded", function() {
				UXHand._setupListeners();
			}, false);
		}
	
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
			// console.log(e.touches[0].clientX);
			UXHand._last.moved = true;
	
			if (UXHand._last.drag.indexOf(e) == -1) {
				// console.log(e);
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
	
	
		var pushHand = function(hand, session) {
			if (hand == 'right') {
				UXHand._data.scores.right++;
			} else {
				UXHand._data.scores.left++;
			}
	
			if (session) {
				UXHand.session().add(hand);
			}
		};
	
	
		var vectors = [
			{
				// y: _last.start.pageY,
				// x: _last.start.pageX
				y: _last.start.touches[0].clientY,
				x: _last.start.touches[0].clientX
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
				if (vectors[0].x < vectors[1].x) { //greater than, because iOS calculates from top right
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
	
	
			handSize(vectors[0], vectors[1]);
	
		};
	
	
	
	
		var tap = function(output) {
	
			if (vectors[0].x < area.w) {
				console.log("Left hand");
				pushHand('left');
			} else if (vectors[0].x > area.w+area.x) {
				console.log("Right hand");
				pushHand('right');
			}
	
		};
	
	
		/*
		Handsize measurement in progress
		*/
	
	
		var handSize = function() {
			return;
		};
	
		// var handSize = function(vOne, vTwo) {
	
		// 	function aScreen() {
		// 		var lowerY = vOne.y > vTwo.y ? vTwo : vOne,
		// 				biggerY = vOne.y > vTwo.y ? vOne : vTwo;
	
		// 		var lowerX = vOne.x > vTwo.x ? vTwo : vOne,
		// 				biggerX = vOne.x > vTwo.x ? vOne : vTwo;
	
		// 		console.log("Y", lowerY, biggerY);
	
		// 		var aScreen = {
		// 			width: biggerX.x - lowerX.x,
		// 			height: biggerY.y - lowerY.y,
		// 			offset: {
		// 				x: lowerX.x,
		// 				y: lowerY.y
		// 			}
		// 		};
	
		// 		aScreen.ratio = aScreen.height/aScreen.width;
	
		// 		return aScreen;
		// 	};
	
	
		// 	function createExample() {
	
		// 		var settings = aScreen();
	
		// 		var element = document.createElement('DIV');
		// 		element.style.height = settings.height+"px";
		// 		element.style.width = settings.width+"px";
		// 		element.style.position = 'fixed';
		// 		element.style.bottom = settings.offset.y+"px";
		// 		element.style.left = settings.offset.x+"px";
		// 		element.style.backgroundColor = "rgba(0,0,0,0.2)";
	
		// 		console.log(settings);
	
		// 		document.body.appendChild(element);
	
		// 	};
	
		// 	console.log('artificialScreen', aScreen());
		// 	console.log(vOne, vTwo);
	
		// 	createExample();
	
		// };
	
	
	
	
	
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
				pushHand('left', true);
			} else if (vectors[0].x > area.w+area.x) {
				console.log("Right hand");
				pushHand('right', true);
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
				pushHand('left', true);
			} else if (measurePath.right > measurePath.left) {
				console.error("RIGHT");
				pushHand('right', true);
			}
	
	
	
		}
	
	
	};

	this.session = function() {
	
		var self = UXHand._session;
	
	
		var add = function(hand) {
			console.log('session.add');
			if (self.hand == hand) {
				self.count++;
			} else {
				self.hand = hand;
				self.count = 1;
			}
	
			sync();
	
		};
	
	
	
		var sync = function() {
			if (self.count != 3) {
				return;
			}
	
			var html = document.querySelector('html'),
					htmlClass = html.className;
	
			var newClass = htmlClass.replace(' templeft', '').replace(' tempright', '');
			newClass += ' temp'+self.hand;
	
			html.className = newClass.trim();
		};
	
	
	
	
		return {
			'data': {
				hand: self.hand,
				count: self.count,
				threshold: self.threshold
			},
			add: add,
			sync: sync
		};
	
	};

	this._domClasses = function(_data) {
	
		var update = function(value) {
	
			var classes = value.split(','),
					UXHandClasses = ['lefthand', 'righthand', 'bothhands'];
	
			var html = document.querySelector('html'),
					htmlClass = html.className;
	
			var outputClasses = function() {
	
				UXHandClasses.forEach(function(className) {
	
					if (value.indexOf(className) >= 0) {
	
						if (htmlClass.indexOf(className) == -1) {
							htmlClass += ' '+className;
						} 
	
					} else {
						htmlClass = htmlClass.replace(' '+className, '');
					}
	
				});
	
				return htmlClass;
			};
	
			html.className = outputClasses();
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
			update('lefthand');
		} else if (_data.scores.right > _data.scores.left*(1+this.options().certainty)) {
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
	
	
	
	};



	this.version = '0.3';

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