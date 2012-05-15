/*
---
script: Carousel.Rotate3D.js
license: MIT-style license.
description: Rotate 3D effect for Carousel.
copyright: Copyright (c) 2010 Thierry Bela
authors: [Thierry Bela]
credits: Moo3DCarousel

requires: 
  core:1.3: 
  - Class.Extras
  - Element.Event
  - Element.Style
  - Element.Dimensions
  - Array
provides: [Carousel.plugins.Rotate3D]
...
*/

!function (context, undefined) {

"use strict";

	var key = 'cr:3d',
		div = document.createElement('div'),
		scale,
		prefixes = ['Khtml','O','ms','Moz','Webkit'], 
		transition;
		
	function getPrefix(prop) {
			
		var i = prefixes.length,
			upper = prop.charAt(0).toUpperCase() + prop.slice(1); 
			
		//check for standard prop first
		if(prop in div.style) return prop;
		
		while(i--) if(prefixes[i] + upper in div.style) return prefixes[i] + upper; 
				
		return prop;
	}
			
	scale = getPrefix('transform');
	transition = getPrefix('transition');
		
	if(scale) Carousel.scale = scale;
	
	div = undefined;
					
	context.Carousel.prototype.plugins.Rotate3D = new Class({
    
		Implements: Events,
		
		/**
		 * Carousel options
		 */
		options: {
		
			opacity: 1,
			// La marge que l'on dans l'overlay
			margin: 10,
				
			// Ellipse center
			center: {x:0, y:0},
		
			// L'offset du centre de l'elipse
			centerOffset: { x:0 , y:0 },
			
			// La longueur du demi-grand axe
			xRadius: 300,
			// La longueur du demi-petit axe
			yRadius: 50,
			
			// Ratio minimal que peut prendre une image
			min: 0.4,
			
			// Angle offset
			offsetAngle: 0,
			
			// On définit le départ pour la propriété z-index
			zIndex: 100,
			
			// Exposant pour la fonction modulant la position
			powerExponent: 0.85
		},
		
		size: {x:0, y:0},

		initialize: function (elements, options, carousel) {

			this.container = document.id(options.container).
				//brings an element to the front
				addEvent('click', function (e) {
		
					var element = e.target,
						index = this.elements.indexOf(element);
					
					while(index == -1 && element) {
								
						element = element.parentNode;
						index = this.elements.indexOf(element)
					}
					
					if(element && element != this.current) {
					
						e.stop();
						carousel.move(index)
					}
					
				}.bind(this));
				
			this.options = Object.append(this.options, options);
			this.elements = elements;
			this.current = elements[0];
			
			elements.each(this.addElement.bind(this));
			
			// On re-calcule le centre de l'ellipse
			this.center = {
				x: (this.container.getSize().x / 2) + this.options.centerOffset.x,
				y: this.options.centerOffset.y + this.options.yRadius
			};
			
			this.reset()
		},
		
		cancel: function () { this.fx.cancel() },
		
		reset: function () {
		
			//
			this.fx = new Fx.Elements(this.elements, this.options.fx).addEvents({complete: function () { 

				this.current = this.elements[this.index];
				this.fireEvent('complete', [this.index, this.current]) 
			
			}.bind(this)});	
			
			return this.reorder(this.elements.indexOf(this.current), this.direction)
		},
			
		addElement: function(el) {
		
			var size = el.setStyles({display: 'block', opacity: this.options.opacity}).getSize();
			
			el.store(key, size).style.position = 'absolute';
			if(transition) el.style[transition] =  scale.hyphenate() + ' ' + this.options.fx.duration + 'ms cubic-bezier(0.37, 0.01, 0.63, 1)';
			
			// On recalcule la taille maximale
			this.size = {
				x: Math.max(size.x, this.size.x),
				y: Math.max(size.y, this.size.y)
			};

			this.container.setStyle('height', this.getSize().y );
			
			return this;
		},
		
		add: function(el) { return this.addElement(el).reset() },
		
		remove: function (el) {
		
			//reset size
			this.fx.cancel();
			var size = el.retrieve(key);
			
			if(transition) el.style[transition] = '';
			if(scale) el.style[scale] = 'scale(1,1)';
			else el.setStyles({width: size.x, height: size.y, opacity: this.options.opacity}).eliminate(key);
			this.elements.each(function (el) { el.setStyles(el.retrieve(key)) });
			this.reset()
		},
		
		// Retrieve the carousel size
		getSize: function() {
		
			return {
				x: this.size.x + 2 * ( this.options.margin + this.options.xRadius),
				y: this.size.y + 2 * ( this.options.margin + this.options.yRadius)
			}
		},
		
		// Position images without transition
		reorder: function(offset) {
			
			var length = this.elements.length;
			
			this.elements.each(function (el, index) { el.setStyles(this.getStyles(el, this.getAngle((length + index - offset) % length))) }, this);
			
			return this
		},
		
		getAngle: function(index) {
		
			var teta = index * 2 * Math.PI / this.elements.length;
			
			teta = (teta + Math.PI) % (2 * Math.PI) - Math.PI;
			teta = (teta > 0 ? 1 : -1) * Math.PI * Math.pow( Math.abs(teta) / Math.PI , this.options.powerExponent);
			
			return teta;
		},
		
		// retrieve element styles
		getStyles: function(el, index) {
		
			var size = el.retrieve(key),
				angle = this.getAngle(index),
			
				sCoeff = 1 + (1-this.options.min) / 2  * (Math.cos(angle)-1),
				width = size.x * sCoeff,
				styles = {
						zIndex: (this.options.zIndex + sCoeff * 2 * this.elements.length).toInt(), 
						left: this.center.x + this.options.xRadius * Math.sin(angle + this.options.offsetAngle) - width / 2,
						top: this.center.y + this.options.yRadius * Math.cos(angle + this.options.offsetAngle)
					};
					
			if(scale) styles[scale] = 'scale(' + sCoeff + ',' + sCoeff + ')';
			else Object.append(styles, {overflow: 'hidden', height: size.y * sCoeff, width: width })
			
			return styles
		},
		
		move: function(current) {
			
			var length = this.elements.length;
				
			this.index = current;
			this.fireEvent('change', [current, this.elements[current]]).fx.cancel().start(Object.map(this.elements, function (el, index) {
			
				if(!isNaN(index)) return this.getStyles(el, (length + index - current) % length)
			}, this))
		}
	})
	
}(this);