'use strict';

if (!UXHand) {
	throw new Error('UXHand.js needed for the wireframe-plugin to work');
}

UXHand.wireFrame = new function() {


	this.init = function() {

		var canvas = document.createElement('CANVAS');
		canvas.id = 'UXHandCanvas';
		canvas.width = screen.width;
		canvas.height = screen.height;
		canvas.style.position = 'fixed';
		canvas.style.top = '0px';
		canvas.style.left = '0px';

		document.body.appendChild(canvas);

		try {
			this.render(canvas);
		} catch (e) {
			console.error("UXHand.wireFrame failed", e);
		}

	};

	this.render = function(canvas) {

		var context = canvas.getContext('2d');

		var area = this.areas();

		context.fillStyle = 'rgba(63, 81, 181,0.3)';
		context.fillRect(0, screen.height*0.425, area.w, screen.height*0.575);

		context.fillStyle = 'rgba(63, 81, 181,0.3)';
		context.fillRect(area.w+area.x, screen.height*0.425, area.w, screen.height*0.575);

		context.fillStyle = 'rgba(0,0,0,0.2)';
		context.fillRect(area.w, 0, area.x, screen.height);

	};

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




	// this.render = function() {
	// 	console.log(this.errorGap());

	// 	var area = this.areas();

	// 	var rendering = [
	// 		"<div ",
	// 		"style='",
	// 		"position:fixed;",
	// 		"top:0;",
	// 		"bottom:0;",
	// 		"left:",
	// 		area.w,
	// 		"px;",
	// 		"width:",
	// 		area.x,
	// 		"px;",
	// 		"background-color:rgba(0,0,0,0.2);",
	// 		"display:inline-block;",
	// 		"' />"
	// 	]; //ErrorGap

	// 	//$("body").prepend(rendering.join(""));
	// 	document.body.innerHTML += rendering.join("");



	// 	rendering = [
	// 		"<div class='lefthand'",
	// 		"style='",
	// 		"position:fixed;",
	// 		"bottom:0;",
	// 		"left:0;",
	// 		"width:",
	// 		area.w,
	// 		"px;",
	// 		"height:",
	// 		(screen.height*0.575),
	// 		"px;",
	// 		"background-color:#3F51B5;opacity:.3;",
	// 		"' />"
	// 		]; //LeftHandArea

	// 	//$("body").prepend(rendering.join(""));
	// 	document.body.innerHTML += rendering.join("");

	// 	rendering = [
	// 		"<div class='righthand'",
	// 		"style='",
	// 		"position:fixed;",
	// 		"bottom:0;",
	// 		"right:0;",
	// 		"width:",
	// 		area.w,
	// 		"px;",
	// 		"height:",
	// 		(screen.height*0.575),
	// 		"px;",
	// 		"background-color:#3F51B5;opacity:.3;",
	// 		"' />"
	// 		]; //LeftHandArea
	// 	//$("body").prepend(rendering.join(""));
	// 	document.body.innerHTML += rendering.join("");
	// };



};