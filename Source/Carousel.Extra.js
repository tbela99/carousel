/*
---
script: Carousel.Extra.js
license: MIT-style license.
description: Tab.Extra - Autosliding carousel.
copyright: Copyright (c) 2010 Thierry Bela
authors: [Thierry Bela]

requires: 
  core:1.2.3: 
  - Class.Extras
  - Element.Event
  - Element.Style
  - Element.Dimensions
  - Array
provides: [Carousel]
...
*/

!function (context) {

"use strict";

context.Carousel.Extra = new Class({

	/*
	
		options: {
		
			interval: 10, //interval between 2 executions in seconds
			delay: 10, //delay between the moment a tab is clicked and the auto slide is restarted
			reverse: true, //move backward
			autostart: true
		},
		*/
	
		Extends: context.Carousel,
		Binds: ['update', 'start', 'stop'],
		initialize: function(options) {

			this.parent(Object.append({interval: 10, delay: 10, autostart: true}, options));
			
			var active,
				events = this.events = {

						click: function(e) {

							e.stop();
							
							active = this.active;

							if(active) this.stop();

							var target = e.event.target,
								index = this.tabs.indexOf(target);

							while(target && index == -1) {

								target = target.parentNode;
								index = this.tabs.indexOf(target)
							}
							
							if(index == -1) return;
							
							this.move(index);
							if(active) this.start.delay(this.options.delay * 1000)

						}.bind(this)
					};
					
			this.tabs.each(function (tab) { tab.removeEvents(this.events).addEvents(events) }, this);
			
			this.events = events;
			
			//handle click on tab. wait 10 seconds before we go
			['previous', 'next'].each(function (fn) {
			
				if($(this.options[fn])) $(this.options[fn]).addEvent('click', function (e) {
			
					e.stop();
					
					active = this.active;
					
					if(active) {
					
						this.stop().start.delay(this.options.delay * 1000);
						this.active = active
					}

				}.bind(this))
			}, this);
		
			this.timer = new PeriodicalExecuter(this.update, this.options.interval).stop();
			this[this.options.autostart ? 'start' : 'stop']()
		},
		
		update: function () { return this[this.options.reverse ? 'previous' : 'next']() },
		
		start: function () {
		
			this.timer.registerCallback();
			this.active = true;
			return this
		},
		
		stop: function() { 
		
			this.timer.stop();
			this.active = false;
			return this
		},
		
		toggle: function() { 
		
			return this[this.active ? 'stop' : 'start']()
		}

	})

}(this);
		