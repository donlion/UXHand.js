//= include ../bower_components/heatmap.js/src/heatmap.js

'use strict';

if (!UXHand) {
	throw new Error("UXHand.js needed for the heatmap-plugin to work");
}








UXHand.HeatMap = new function() {

	this.init = function() {

		this.createDOM(UXHand.HeatMap.initializeHeatMap);

	};


	this.createDOM = function(callback) {

		var element = document.createElement("DIV");
		element.className = "uxhand__heatmap";
		element.style.position = "fixed";
		element.style.top = "0px";
		element.style.left = "0px";
		element.style.right = "0px";
		element.style.bottom = "0px";
		element.style.height = screen.height;
		element.innerHTML = "<div class='uxhand__heatmap__container' style='height:"+screen.height+"px;'></div>";

		document.body.appendChild(element);

		if (callback) {
			setTimeout(function() {
				callback(element.children);
			}, 20);
		}

	};


	this.initializeHeatMap = function(element) {

		if (!h337) {
			throw new Error("Heatmap plugin wasn't included. Please contact the developer of heatmap.js on github, if this isn't something you removed yourself.");
		}

		var heatMapInstance = h337.create({
			"element": document.querySelector('.uxhand__heatmap__container'),
			radius: 15,
			opacity: 50
		});

		var points = UXHand.tracking,
				max = 0,
				width = screen.width,
				height = screen.height,
				len = 200;

		var data = {
			max: 20,
			min: 0,
			data: points
		};

		console.log(heatMapInstance);

		heatMapInstance.store.setDataSet(data);





		// window.onload = function(){
		// 	var xx = h337.create({"element":document.getElementById("heatmapArea"), "radius":25, "visible":true});
			
		// 	xx.get("canvas").onclick = function(ev){
		// 		var pos = h337.util.mousePosition(ev);
		// 		xx.store.addDataPoint(pos[0],pos[1]);
		// 	};
			
		// 	document.getElementById("dataset").onclick = function(){
		// 		var el = document.getElementById("data").value;
		// 		var obj = eval('('+el+')');
				
		// 		// call the heatmap's store's setDataSet method in order to set static data
		// 		xx.store.setDataSet(obj);
		// 	};
		// 	document.getElementById("gen").onclick = function(){
		// 		xx.store.generateRandomDataSet(100);
		// 	};
		// };
	};

};