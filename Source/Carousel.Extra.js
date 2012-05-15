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
  MORE:1.2.3: 
  - Class.Refactor
provides: [Carousel]
...
*/

Class.refactor(Carousel, {

	/*
	
		options: {
		
			interval: 10, //interval between 2 executions in seconds
			delay: 10, //delay between the moment a tab is clicked and the auto slide is restarted
			reverse: true, //move backward
			autostart: false,
			toggle: 'toggle',
			next: 'next',
			previous: 'previous'
		},
	*/
	Binds: ['update', 'start', 'stop'],
	initialize: function(options) {

		this.previous(Object.append({interval: 10, delay: 10/* , autostart: false */}, options));
		
		var toggle = options.toggle && document.id(options.toggle);
			
		if(toggle) toggle.addEvent('click', function (e) { e.stop(); this.toggle() }.bind(this));

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

});
		