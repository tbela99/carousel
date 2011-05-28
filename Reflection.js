
/*
Script: Reflection.js
	
	License: MIT-style license.
	Copyright: Copyright (c) 2007 Thierry bela <bntfr at yahoo dot fr>

	License:
		MIT-style license.

	Authors:
		Thierry Bela
	Version:
		1.1

*/

/**
 * reflection.js v2.0
 * http://cow.neondragon.net/stuff/reflection/
 * Freely distributable under MIT-style license.
 */
 
!function ($) {
 
	this.Reflection = {
	
		options: {
			opacity : .5,
			height : .5,
			width: .5
		},
		
		add: function(image, options) {
			this.remove($(image));
			
			options = Object.merge(this.options, options);
			
			try {
				
				var d = new Element('div'), p = image,
				newClasses = p.removeClass('reflected').className,
				reflectionHeight = Math.floor(p.height*options['height']), 
				divHeight = Math.floor(p.height*(1+options['height'])),
				reflectionWidth = p.width;
				
				if (Browser.ie && Browser.version < 9) {
					/* Fix hyperlinks */
					//if(p.parentNode.tagName == 'A') d = new Element('a', {href: p.parentNode.href}).inject(p.parentNode, 'after');
						
					/* Copy original image's classes & styles to div */
					if(newClasses) d.className = newClasses;
					p.className = 'reflected';
					
					d.style.cssText = p.style.cssText;
					p.style.cssText = 'vertical-align: bottom';
				
					var reflection = new Element('img', {src: p.src, 
							width: reflectionWidth, 
							height: p.height
						});
						
					reflection.style.display = 'block';
					
					reflection.style.marginBottom = -(p.height-reflectionHeight)+'px';
					reflection.style.filter = 'flipv progid:DXImageTransform.Microsoft.Alpha(opacity='+(options['opacity']*100)+', style=1, finishOpacity=0, startx=0, starty=0, finishx=0, finishy='+(options['height']*100)+')';
					
					d.setStyles({height: divHeight, width: reflectionWidth});
					p.parentNode.replaceChild(d, p);
					
					d.appendChild(p);
					d.appendChild(reflection)
					
				} else {
				
					var canvas = new Element('canvas');
					
					if (canvas.getContext) {
						/* Copy original image's classes & styles to div */
						if(newClasses) d.className = newClasses;
						p.className = 'reflected';
						
						d.style.cssText = p.style.cssText;
						p.style.cssText = 'vertical-align: bottom';
				
						var context = canvas.getContext("2d");
					
						canvas.setProperties({height: reflectionHeight, width: reflectionWidth});
						
						d.setStyles({height: divHeight,width: reflectionWidth});
						
						p.parentNode.replaceChild(d, p);
						
						d.appendChild(p);
						d.appendChild(canvas);
						
						context.save();
						
						context.translate(0,image.height-1);
						context.scale(1,-1);
						
						context.drawImage(image, 0, 0, reflectionWidth, image.height);
		
						context.restore();
						
						context.globalCompositeOperation = "destination-out";
						var gradient = context.createLinearGradient(0, 0, 0, reflectionHeight);
						
						gradient.addColorStop(1, "rgba(255, 255, 255, 1.0)");
						gradient.addColorStop(0, "rgba(255, 255, 255, "+(1-options['opacity'])+")");
			
						context.fillStyle = gradient;
						context.rect(0, 0, reflectionWidth, reflectionHeight*2);
						context.fill()
					}
				}
			}
			
			catch (e) { }
		},
		
		remove : function(image) {
			if (image.className == "reflected") {
				image.className = image.parentNode.className;
				image.parentNode.parentNode.replaceChild(image, image.parentNode);
			}
		}
	}

 }(document.id);