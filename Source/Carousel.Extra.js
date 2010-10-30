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

Carousel.Extra = new Class({

		/*
		
			options: {
			
				interval: 10, //interval between 2 executions in seconds
				delay: 10, //delay between the moment a tab is clicked and the auto slide is restarted
				reverse: true //move backward
			
			*/
		
			Extends: Carousel,
			Binds: ['update', 'start', 'stop'],
			initialize: function(options) {

				this.parent($merge({interval: 10, delay: 10}, options));
				var self = this;
				
				//handle click on tab. wait 10 seconds before we go
				['previous', 'next'].each(function (val) {
				
					if($(self.options[val])) $(self.options[val]).addEvent('click', function (e) {
				
						e.stop();
						
						if(self.running) self.stop().start.delay(self.options.delay * 1000)
						
					})
				});
			
				this.reverse = !!this.options.reverse;
				this.running = false;
				this.timer = new PeriodicalExecuter(this.update, this.options.interval);
				
				return this
			},
			
			update: function () { return this[this.options.reverse ? 'previous' : 'next']() },
			
			start: function () {
			
				this.timer.registerCallback();
				this.running = true;
				return this
			},
			
			stop: function() { 
			
				this.timer.stop();
				this.running = false;
				return this
			}
		});
		