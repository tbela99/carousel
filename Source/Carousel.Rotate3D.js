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

!function ($) {

	var key = 'cr:3d';
	
	Carousel.prototype.plugins.Rotate3D = new Class({
    
		Implements: Events,
		
		/**
		 * Carousel options
		 */
		options: {
		
			// La marge que l'on dans l'overlay crée
			margin: 0,
				
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

		initialize: function (elements, options) {

			this.container = $(options.container);
			this.elements = elements;
			this.current = elements[0];
			
			elements.each(this.addElement.bind(this));
			
			this.options = Object.merge(this.options, options);
			// On re-calcule le centre de l'elipse
			this.center = {
				x: (this.container.getSize().x / 2) + this.options.centerOffset.x,
				y: this.options.centerOffset.y + this.options.yRadius
			};
			
			this.reset()
		},

		reset: function () {
		
			//
			this.fx = new Fx.Elements(this.elements, this.options.fx).addEvents({complete: function () { this.fireEvent('complete', [this.elements.indexOf(this.current), this.current]) }.bind(this)})			
			this.reorder(this.elements.indexOf(this.current), this.direction);
			
			return this
		},
			
		addElement: function(el) {
		
			var size = el.setStyles({display: 'block', overflow: 'hidden'}).getSize();
			
			el.store(key, size).style.position = 'absolute';
				
			// On recalcule la taille maximale
			this.size = {
				x: Math.max(size.x, this.size.x),
				y: Math.max(size.y, this.size.y)
			};

			// On rédéfinit la taille de l'overlay afin que les images ne sorte pas du flux
			this.container.setStyle('height', this.getSize().y );
			
			return this;
		},
		
		add: function(el) { return this.addElement(el).reset() },
		
		remove: function (el) {
		
			//reset size
			this.fx.cancel();
			var size = el.retrieve(key);
			el.setStyles({width: size.x, height: size.y}).eliminate(key);
			this.elements.each(function (el) { el.setStyles(el.retrieve(key)) });
			this.reset()
		},
		
		// Retrieve the carousel size
		getSize: function() {
		
			return {
				x: this.size.x + 2 * ( this.options.margin + this.options.xRadius),
				y: this.size.y + 2 * ( this.options.margin + this.options.yRadius)
			};
		},
		
		// Position images without transition
		reorder: function(offset) {
			
			var length = this.elements.length;
			
			this.elements.each(function (el, index) { el.setStyles(this.getStyles(el, this.getAngle((length + index - offset) % length))) }, this);
			
			return this
		},
		
		getAngle: function(index) {
		
			var teta = (index / this.elements.length) * 2 * Math.PI;
			
			teta = (teta + Math.PI) % (2 * Math.PI) - Math.PI;
			teta = ((teta > 0) ? 1 : -1) * Math.PI * Math.pow( Math.abs(teta) / Math.PI , this.options.powerExponent);
			
			return teta;
		},
		
		// retrieve element styles
		getStyles: function(el, index) {
		
			var size   = el.retrieve(key),
				angle = this.getAngle(index),
			
				sCoeff = 1 + (1-this.options.min) / 2  * (Math.cos(angle)-1),
				width = (size.x * sCoeff).toInt();
			
			return {
					width: width,
					height: (size.y * sCoeff).toInt(),
					// On ajoute la propriété z-index
					zIndex: (this.options.zIndex + sCoeff * 2 * this.elements.length).toInt(), 
					// On ajoute la position en décalant horizontalement l'image de la moitié sa largeur
					left: (this.center.x + this.options.xRadius * Math.sin(angle + this.options.offsetAngle) - width / 2).toInt(),
					top: (this.center.y + this.options.yRadius * Math.cos(angle + this.options.offsetAngle)).toInt()
				};
		},
		
		move: function(current) {
			
			var length = this.elements.length, obj = {};
				
			this.elements.each(function (el, index) { obj[index] = this.getStyles(el, (length + index - current) % length) }, this);
			
			this.fireEvent('change', [current, this.elements[current]]).fx.cancel().start(obj);
		}
	})
	
}(document.id);