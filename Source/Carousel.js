/*
---
script: Carousel.js
license: MIT-style license.
description: Carousel - Extensible mootools carousel with dynamic elements addition/removal.
copyright: Copyright (c) 2010 Thierry Bela
authors: [Thierry Bela]

requires: 
  core:1.3: 
  - Class.Extras
  - Element.Event
  - Element.Style
  - Element.Dimensions
  - Array
  - Type
provides: [Carousel, Carousel.plugins.Move]
...
*/

!function (context, $, undefined) {

"use strict";

function style(el, style) {

	var mrg = el.getStyle(style);
	
	return mrg == 'auto' ? 0 : mrg.toInt() 
}

context.Carousel = new Class({

		Implements: [Options, Events],
		options: {
		
		/*
			circular: false,
			onChange: function (index) {
			
			},
			previous: element1,
			next: element2,
			container: undefined,
			selector: '',
			tabs: [],
		*/
			activeClass: '',
			inactiveClass: '',
			link: 'ignore',
			mode: 'horizontal',
			animation: 'Move',
			scroll: 4,
			distance: 1,
			fx: {
			
				link: 'cancel',
				transition: 'sine:out',
				duration: 500
			}
		},
		current: 0,
		plugins: {},
		initialize: function (options) {
		
			this.addEvents({
			
				change: function (current) {

					if(this.tabs[this.current]) this.tabs[this.current].addClass(this.options.inactiveClass).removeClass(this.options.activeClass)
					if(this.tabs[current]) this.tabs[current].addClass(this.options.activeClass).removeClass(this.options.inactiveClass);

				},
				complete: function (current, selected) {

					this.current = current;
					this.selected = selected
					this.running = false
				}
				
			}).setOptions(options);

			['previous', 'next'].each(function (fn) {

				if(this.options[fn] != undefined) {
					
					var el = $(this.options[fn]);
					
					if(el) el.addEvent('click', function (e) {
					
						e.stop();
						this[fn]()
						
					}.bind(this))
				}
					
			}, this);
			
			var current = options.current || 0,
				events = this.events = {

						click: function(e) {

							e.stop();
							
							var target = e.target,
								index = this.tabs.indexOf(target);

							while(target && index == -1) {

								target = target.parentNode;
								index = this.tabs.indexOf(target)
							}
							
							if(index == -1) return;
							this.move(index)

						}.bind(this)
					};
					
			this.tabs = $$(options.tabs).addEvents(events);
			this.elements = $(options.container).getChildren(options.selector);
			
			this.anim = new this.plugins[this.options.animation](this.elements, this.options, this).addEvents({change: function () { this.fireEvent('change', Array.slice(arguments)) }.bind(this), complete: function () { this.running = false; this.fireEvent('complete', Array.slice(arguments)) }.bind(this)});
			
			this.move(current);
		},
		
		isVisible: function (index) {
		
			if(Type.isElement(index)) index = this.elements.indexOf($(index));
			
			var length = this.elements.length,
				current = this.current,
				scroll = this.options.scroll;
			
			if(current <= index && index < current + scroll) return true;
			if(this.options.circular)  while(scroll--) if((scroll + current)  % length == index) return true;
			
			return false
		},
		
		first: function () { return this.current },
		
		previous: function (direction) { return this.move(this.current - this.options.distance, direction) },
		
		next: function (direction) { return this.move(this.current + this.options.distance, direction) },
	
		add: function (panel, tab, index) {

			panel = $(panel);
			tab = $(tab);

			if(tab) tab.addEvents(this.events).removeClass(this.options.activeClass);

			if(this.elements.indexOf(panel) != -1) return this;

			if(index == undefined) index = this.elements.length;
			index = Math.min(index, this.elements.length);
			
			switch(index) {

				case 0:
						if(this.elements.length > 0) {

							this.elements.unshift(panel.inject(this.elements[0], 'before'));
							if(tab) this.tabs.unshift(tab.inject(this.tabs[0], 'before'));
						}

						else {
						
							this.elements.push(panel.inject(this.options.container));
							if(tab) this.tabs.push(tab);
						}

						break;
				default:
						this.elements.splice(index, 0, panel.inject(this.elements[index - 1], 'after'));
						if(tab) this.tabs.splice(index, 0, tab.inject(this.tabs[index - 1], 'after'));
						break;
			}
			
			if(this.anim.add) this.anim.add(panel);
			this.current = this.elements.indexOf(this.selected);

			return this
		},

		remove: function (index) {

			var panel = this.elements[index],
				tab = this.tabs[index];
				
			//
			if(panel == undefined) return undefined;

			this.elements.splice(index, 1);
			panel.dispose();

			if(tab) {

				tab.removeEvents(this.events).dispose();
				this.tabs.splice(index, 1);
			}

			if(this.anim.remove) this.anim.remove(panel, index);
			
			var current = this.elements.indexOf(this.selected);
			
			if((current == -1 || current != this.current) && this.elements.length > 0) {
			
				current = Math.max(index - 1, 0);
				this.move(current)
			}

			return {panel: panel, tab: tab}
		},

		move: function (index, direction) {
		
			if(this.running) {
			
				switch(this.options.link) {
				
					case 'cancel':
								this.anim.cancel();
								break;
					case 'chain':
								break;
					case 'ignore':
							return this;
				}
			}
			
			var elements = this.elements,
				current = this.current,
				length = elements.length,
				scroll = this.options.scroll;
			
			if(Type.isElement(index)) index = elements.indexOf(index);
			
			if(!this.options.circular) {
		        
				if(index > length - scroll) index = length - scroll;
                index = Math.max(index, 0);
			}	
				
			else {
			    
				if(index < 0) index += length;
				index %= Math.max(length, 1)
			}			
		
			if(index < 0 || length <= scroll || index >= length) return this;

			if(direction == undefined) {
				
				//detect direction. inspired by moostack
				var forward = current < index ? index - current : elements.length - current + index,
					backward = current > index ? current - index : current + elements.length - index;
				
				direction = Math.abs(forward) <= Math.abs(backward) ? 1 : -1
			}	
			
			this.running = true;
			this.anim.move(index, direction);
			return this
		}
	});
	
context.Carousel.prototype.plugins.Move = new Class({
	
		Implements: Events,
		index: 0,
		initialize: function (elements, options) {
		
			var up = this.up = options.mode == 'vertical',
				parent;

			if(elements.length > 0) {
			
				parent = elements[0].getParent();
				
				parent.setStyles({height: parent.getStyle('height'), position: 'relative', overflow: 'hidden'}).getStyle('padding' + (this.up ? 'Top' : 'Left'));
				
				this.padding = style(parent, up ? 'paddingTop' : 'paddingLeft');
				this.pad = style(parent, 'paddingLeft');
			}
			
			this.options = options;
			this.elements = elements;
			this.property = 'offset' + (up ? 'Top' : 'Left');
			this.margin = up ? ['marginTop', 'marginBottom'] : ['marginLeft', 'marginRight'];
		
			elements.each(this.addElement.bind(this));
			this.direction = 1;
			this.current = elements[0];
			this.reset()
		},
		
		cancel: function () { this.fx.cancel() },
		
		reset: function () {
		
			//
			this.fx = new Fx.Elements(this.elements, this.options.fx).addEvents({complete: function () {

				this.current = this.elements[this.index];
				this.fireEvent('complete', [this.index, this.current]) 
			
			}.bind(this)});
			
			this.reorder(this.index, this.direction);
			
			return this
		},
		
		addElement: function (el) {
		
			el.setStyles({display: 'block', position: 'absolute'});
			
			if(isNaN(this.pad)) {
			
				var parent = el.getParent();
				
				this.padding = style(parent, this.up ? 'paddingTop' : 'paddingLeft');
				this.pad = style(parent, 'paddingLeft');
			}
			
			return this
		},
		
		add: function (el) { this.addElement(el).reset() },
		
		remove: function () { 
		
			this.fx.cancel();
			this.reset() 
		},
		
		reorder: function (offset, direction) {
		
			var options = this.options,
				panels = this.elements,
				panel,
				prev,
				pos,
				ini,
				pad = this.pad,
				index,
				current = this.index,
				length = panels.length,
				i = length + 1,
				horizontal = options.mode == 'horizontal',
				side = horizontal ? 'offsetWidth' : 'offsetHeight';
			
			ini = pos = this.padding;
			
			//rtl - consider scroll
			if(direction == -1) {
			
				i = current + 1;
				if(current < offset) i += length;
				
				while(i-- > offset) {
			
					index = (i + length) % length;
					
					prev = panel;
					panel = panels[index];
					
					if(prev) pos -= style(prev, this.margin[0]);
					
					if(horizontal) panel.setStyle('left', pos);
					else panel.setStyles({left: pad, top: pos});
					pos -= (panel[side] + style(panel, this.margin[1]));
				}
				
				//ltr
			} else if(direction == 1) for(i = 0; i < length; i++) {
			
				index = (i + current + length) % length;
				prev = panel;
				panel = panels[index];				
				
				if(horizontal) panel.setStyle('left', pos);
				else panel.setStyles({left: pad, top: pos});
				pos += panel[side] + style(panel, this.margin[0]);
				if(prev) pos += style(prev, this.margin[1]);
			}
			
			return this
		},
		
		move: function (current, direction) {
		
			var up = this.up,
				property = this.property,
				offset,
				element = this.elements[current];
				
			if(this.options.circular) this.reorder(current, direction);
			
			this.index = current;
			this.direction = direction;
			offset = element[property] - this.padding;
			this.fireEvent('change', [current, element]).fx.cancel().start(Object.map(this.elements, function (el, index) { if(!isNaN(index)) return up ? {top: el[property] - offset} : {left: el[property] - offset} }))
		}
	})
	
}(this, document.id);