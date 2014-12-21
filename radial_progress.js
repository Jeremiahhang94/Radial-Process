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
		text_options:{
				text_show: false,
				
				value_text: "0",
				unit_text: "KM",
				
				value_color: "black",
				unit_color: "black",
				
				value_size: -1,
				unit_size: -1,
				
				value_y_pos: -1,
				unit_y_pos: -1,
				
				font_family: "Arial, Helvetica, sans-serif"
			},
		length: 100,
		auto: false,
		complete: function(){console.log("Complete");},
		onclick: function(){},
		
		//unchangeable
		maxDeg: 180,
		isStopped: false,
		isPlaying: false,
		isReset: false
	}
	
	this.option = merge_option(option, _option);
	this.option.text_options = merge_option(option.text_options, _option.text_options);
	
	this.circle = new Circle(this.option.color, this.option.highlight, this.option.text_options, this.option.length);
	this.circle.obj.addEventListener("click", this.option.onclick);
	dom.appendChild(this.circle.obj);
	if(this.option.auto) this.animate();
}

RadialProgress.prototype.animate = function(_deg)
{
	this.option.isStopped = false;
	
	var startTime = null;
	var circle = this.circle;
	var option = this.option;
	var maxDeg = (!_deg) ? option.maxDeg : _deg;
	var duration = (!_deg) ? option.duration : 0;
	var onComplete = (!_deg) ? option.complete : null;
	start();
	
	//start
	
	
	function step(timestamp)
	{
		if(!startTime) startTime = timestamp;
		var progress = (timestamp - startTime) / duration;
		
		if(!option.isStopped)
		{
			if(progress < 1){ apply(progress); window.requestAnimationFrame(step); }
			else end();
		}
		else
		{
			if(option.isReset)
			{
				reset();
			}
		}
	}
	
	function apply(progress)
	{
		var deg = maxDeg * progress;
		circle.setRotate(deg);
	}
	
	function start()
	{
		window.requestAnimationFrame(step);
		option.isPlaying = true;	
	}
	function end()
	{
		apply(1); 
		option.isPlaying = false; 
		if(onComplete) onComplete();
	}
	function reset()
	{
		startTime = null;
		option.isReset = false;
		option.isStopped = false;
		start();
	}
}

RadialProgress.prototype.stop = function()
{
	this.option.isStopped = true;	
	this.option.isPlaying = false;
}
RadialProgress.prototype.start = function()
{
	if(this.option.isPlaying)
	{
		this.stop();
		this.option.isReset = true;	
	}
	else this.animate();
}

// Setter Methods

RadialProgress.prototype.setPercent = function(percent)
{
	var deg = percent * 180;
	if(deg != 0)
		this.animate(deg);
}

RadialProgress.prototype.setTextValue = function(text_value)
{
	if(this.option.text_options.text_show)
		this.circle.setValue(text_value);
}
RadialProgress.prototype.setTextUnit = function(text_unit)
{
	if(this.option.text_options.text_show)
		this.circle.setUnit(text_unit);
}




var CIRCLE_CLASS = 'radial_circle',
MASK_FULL_CLASS = 'radial_mask radial_full',
FILL_CLASS = 'radial_fill',
MASK_HALF_CLASS = 'radial_mask radial_half',
FILL_FIX_CLASS = 'radial_fill radial_fix',
INSET_CLASS = 'radial_inset',

TEXT_CLASS = 'radial_text',
VALUE_CLASS = 'radial_value',
UNIT_CLASS = 'radial_unit';

function Circle(color, highlight, text_options, length)
{	
	var css = new CircleCSS(color, highlight, text_options, length);

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
	
	if(text_options.text_show)
	{
		this.text = div(TEXT_CLASS);
		this.value = div(VALUE_CLASS, css.VALUE_CSS);
		this.unit = div(UNIT_CLASS, css.UNIT_CSS);
		this.value.innerHTML = text_options.value_text;
		this.unit.innerHTML = text_options.unit_text;
		this.text.appendChild(this.value);
		this.text.appendChild(this.unit);
		this.obj.appendChild(this.text);
	}
	

}

Circle.prototype.setValue = function(_value)
{
	this.value.innerHTML = _value;
}
Circle.prototype.setUnit = function()
{
	this.unit.innerHTML = _unit;
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

function CircleCSS(color, highlight, text_styles, length)
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
	
	if(text_styles.text_show)
	{
		var v_width = 0.7 * length,
		v_height = 0.3 * length,
		v_size = (text_styles.value_size == -1) ? 0.2 * length : text_styles.value_size,
		v_marginLeft = (length - v_width) / 2,
		v_marginTop = (text_styles.value_y_pos == -1) ? (length - v_height) / 2 : text_styles.value_y_pos,
		v_color = text_styles.value_color,
		v_fontFamily = text_styles.font_family;
		
		var u_width = 0.5 * length,
		u_height = 0.1 * length,
		u_size = (text_styles.unit_size == -1) ? 0.1 * length : text_styles.value_size;
		u_marginLeft = (length - u_width) / 2,
		u_marginTop = (text_styles.unit_y_pos == -1) ? ((length - u_height) / 2) + (v_height / 3) : text_styles.value_size,
		u_color = text_styles.unit_color,
		u_fontFamily = v_fontFamily;
		
		this.VALUE_CSS = {
			"width": v_width+"px",
			"height": v_height+"px",
			"position": "absolute",
			"z-index": 1000,
			"margin-left": v_marginLeft+"px",
			"margin-top": v_marginTop+"px",
			"color": v_color,
			"font-family": v_fontFamily,
			"font-size": v_size+"px",
			"text-align": "center"
		};
		this.UNIT_CSS = {
			"width": u_width+"px",
			"height": u_height+"px",
			"position": "absolute",
			"z-index": 1000,
			"margin-left": u_marginLeft+"px",
			"margin-top": u_marginTop+"px",
			"color": u_color,
			"font-family": u_fontFamily,
			"font-size": u_size+"px",
			"text-align": "center"
		};
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