// JavaScript Document

function RadialProgress(selector, _option)
{
	var dom = document.getElementById(selector);
	
	//default values
	var option = 
	{
		//changeable values
		duration: 1000, //miliseconds
		color: "#66CCFF",
		highlight: "#45a7d8",
		length: 100,
		auto: false,
		complete: function(){console.log("Complete");},
		
		//unchangeable
		maxDeg: 180,
		isStopped: false,
		currentProgress: 0
	}
	this.option = merge_option(option, _option);
	
	this.circle = new Circle(this.option.color, this.option.highlight, this.option.length);
	dom.appendChild(this.circle.obj);
	if(this.option.auto) this.animate();
}

RadialProgress.prototype.animate = function(_deg)
{
	this.option.isStopped = false;
	
	var start = null;
	var circle = this.circle;
	var option = this.option;
	var maxDeg = (!_deg) ? option.maxDeg : _deg;
	var duration = (!_deg) ? option.duration : 0;
	var shouldComplete = (!_deg) ? 1 : 0;
	window.requestAnimationFrame(step);
	
	function step(timestamp)
	{
		if(!start) start = timestamp;
		var progress = (timestamp - start) / duration;
		
		if(!option.isStopped)
		{
			if(progress < 1){ apply(progress); window.requestAnimationFrame(step); }
			else { apply(1); if(shouldComplete) option.complete(); };
		}
	}
	
	function apply(progress)
	{
		var deg = maxDeg * progress;
		circle.setRotate(deg);
	}
}

RadialProgress.prototype.stop = function()
{
	this.option.isStopped = true;	
}

RadialProgress.prototype.setPercent = function(percent)
{
	var deg = percent * 180;
	if(deg != 0)
		this.animate(deg);
}




var CIRCLE_CLASS = 'circle',
MASK_FULL_CLASS = 'mask full',
FILL_CLASS = 'fill',
MASK_HALF_CLASS = 'mask half',
FILL_FIX_CLASS = 'fill fix',
INSET_CLASS = 'inset';

function Circle(color, highlight, length)
{	
	var css = new CircleCSS(color, highlight, length);

	this.obj = div(CIRCLE_CLASS, css.MAIN_CSS),
	this.mask_full = div(MASK_FULL_CLASS, css.MASK_CSS),
	this.fill_full = div(FILL_CLASS, css.FILL_CSS),
	this.mask_half = div(MASK_HALF_CLASS, css.MASK_CSS),
	this.fill_fix = div(FILL_FIX_CLASS, css.FILL_CSS),
	this.fill_half = div(FILL_CLASS, css.FILL_CSS),
	this.inset = div(INSET_CLASS, css.INSET_CSS);
	
	this.rotateable = [ this.mask_full, this.fill_full, this.fill_fix, this.fill_half ];
	
	this.mask_full.appendChild(this.fill_full);
	this.mask_half.appendChild(this.fill_fix);
	this.mask_half.appendChild(this.fill_half);
	this.obj.appendChild(this.mask_full);
	this.obj.appendChild(this.mask_half);
	this.obj.appendChild(this.inset);

}

Circle.prototype.setRotate = function(deg)
{
	var prefix = ['-moz', '-webkit', '-ms', '-o'];
	var obj;
	for(h=0,k=this.rotateable.length; h<k; h++)
	{
		obj = this.rotateable[h];
		for(i=0,l=prefix.length; i<l; i++)
		{
			obj.style[prefix[i]+"-transform"] = "rotate("+deg+"deg)";
		}
	}
}

function CircleCSS(color, highlight, length)
{	
	var halfL = length/2;
	this.MAIN_CSS = { 
		"width": length+"px",
		"height": length+"px",
		"background-color": color,
		"border-radius": "50%",
		"-webkit-backface-visibility": "hidden",
		"position": "absolute"
	}
		
	this.FILL_CSS = { 
		"background-color": highlight,
		"clip": "rect(0px, "+halfL+"px, "+length+"px, 0px)"
	}
	this.FILL_CSS = merge_option(this.MAIN_CSS, this.FILL_CSS);
	
	this.MASK_CSS = { 
		"background-color": "transparent",
		"clip": "rect(0px, "+length+"px, "+length+"px, "+halfL+"px)"
	}
	this.MASK_CSS = merge_option(this.MAIN_CSS, this.MASK_CSS);
	
	var insetL = 0.8 * length;
	var insetM = 0.1 * length;
	this.INSET_CSS = {
		"width": insetL+"px",
		"height": insetL+"px",
		"border-radius": "50%",
		"background-color": "white",
		"position": "absolute",
		"margin-top": insetM+"px",
		"margin-left": insetM+"px",
		"box-shadow": "0px 2px rgba(0,0,0,0.2)"
	}
}

function div(className, css)
{
	var div = document.createElement("div");
	div.className = className;
	for(var key in css)
	{
		div.style[key] = css[key];	
	}
	return div;
}

function merge_option(obj1, obj2)
{
	var obj3 = {};
    for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
    for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
    return obj3;
}