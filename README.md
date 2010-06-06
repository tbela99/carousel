Carousel
============

Extensible mootools carousel 

[Demo](http://tbela99.github.com/carousel/Demos/horizontal.html)

#### More demos

- [Vertical](http://tbela99.github.com/carousel/Demos/vertical.html)
- [Horizontal](http://tbela99.github.com/carousel/Demos/horizontal.html)

How to use
---------------------

It is quite simple to use. what you need first is 

### CSS:
	/*
		the container
	*/	

	#slide {

		width: 810px;
		margin: 10px auto;
		position: relative;
		height: 300px;
		width: 810px;
		overflow: hidden;
	}

	/*

		carousel items
	*/
	#slide div {

		position: relative;
		display: inline-block;
		width: 400px;
		margin-left: 5px;
	}

	/*
		content
	*/
	#slide span {

		position: absolute;
		bottom: 0;
		left: 0;
		padding: 10px;
		width: 380px;
		color: #fff;
		background: url(../Assets/images/grey.png);
		background: rgba(0, 0, 0, .7)
	}
	
### HTML:

	<div id="slide">
    <div><a href="http://github.com/tbela99/tab"><img src="../Assets/slides/slide1.jpg" width="400" height="300" /></a><span>Caption 1: put anything you want in the caption. Note that there is a link in the image</span></div>
        <div><a href="http://github.com/tbela99/tab"><img src="../Assets/slides/slide2.jpg" width="400" height="300" /></a><span>Caption 2: put anything you want in the caption. Note that there is a link in the image</span></div>
        <div><a href="http://github.com/tbela99/tab"><img src="../Assets/slides/slide3.jpg" width="400" height="300" /></a><span>Caption 3: put anything you want in the caption. Note that there is a link in the image</span></div>
        <div><a href="http://github.com/tbela99/tab"><img src="../Assets/slides/slide4.jpg" width="400" height="300" /></a><span>Caption 4: put anything you want in the caption. Note that there is a link in the image</span></div>
        <div><a href="http://github.com/tbela99/tab"><img src="../Assets/slides/slide5.jpg" width="400" height="300" /></a><span>Caption 5: put anything you want in the caption. Note that there is a link in the image</span></div>
  	  </div>
	  
	//the controls
	<div class="tabs"><a href="#page-p">&laquo;</a><a href="#0">1</a><a href="#1">2</a><a href="#2">3</a><a href="#3">4</a><a href="#4">5</a><a href="#page-p">&raquo;</a></div>
       
### Javascript:

	window.addEvent('domready', function () {
	
			//duration of each transition
		var duration = 300,
		
			//links to manually move the carousel
			links = $$('div.tabs a'),
			
			//the carousel
			tab = new Carousel({
				//the container
				container: 'slide',
				
				//the number of items visibles
				scroll: 2,
				
				//what to do when we reach the bounds
				circular: true,
				
				//first diplayed item
				current: 3,
				
				//carousel mode, default to horizontal
				/* mode: 'horizontal', */
				
				//onChange event handler, update links
				onChange: function (index) {
				
					links.each(function (el, off) {
					
						el[off == index ? 'addClass' : 'removeClass']('selected')
					})
				},
				
				//custom transitions settings
				fx: {
				
					duration: duration
				}
			}),
			
			//
			pe = new PeriodicalExecuter(function () {
		
				tab.move((tab.first() + 2) % 5)
			}, duration / 1000 + 5);
			
			//attach event to arrows
			[links.shift(), links.pop()].map(function (el, index) {
			
				el.addEvent('click', function (e) {
				
					e.stop();
					pe.stop();
					
					tab.move(tab.first() + (index == 0 ? -1 : 1) * tab.options.scroll);
					
					(function () { pe.registerCallback() }).delay(2 * duration)
				})
			});
		
		//attach event to links
		links.each(function (el, index) {
		
			el.addEvent('click', function (e) {
				
				e.stop();
				pe.stop();
				
				tab.move(index);
				(function () { pe.registerCallback() }).delay(2 * duration)
			})
		})
	})

### Options:

* container  - (*mixed*) the element that contains the panels.
* circular: determines how the carousel behaves when it reaches the bounds.
* left - (*mixed*) element that moves carousel to the left when clicked.
* right - (*mixed*) element that moves carousel to the right when clicked.
* mode - (*string*, optional) the carousel mode. allowed values are *vertical* and *horizontal*
* scroll - (*int*) the number of items visible in the carousel, this must be set using css. the carousel will not attempt to resize the container to fit this number.
* selector  - (*string*, optional) use only children that match this selector. useful when you have something else in your html like arrows to move the carousel.
* animation  - (*string*, optional) the transition plugin to use for transition. default to *Move* (the only plugin at this time)
* fx - (*object*, optional) parameters for the animation. this can be any of the Fx parameters.
* current  - (*int*, optional) index of the first displayed item. default to 0.

### Events:

#### change

Fired after the first item change.

##### Signature:

	onChange(current)

##### Arguments:

4. current - (*int*) index of the first displayed element.


Method: next 
------------

display the next set of items.

### Arguments:

- direction - (*int*, optional) indicate the direction of the carousel movement: -1 will move from right to left and 1 will move in the opposite direction. this has no effect if the option circular is false.

### Returns:

* (*object*) - This Carousel instance.

Method: previous
----------------

display the previous set of items.


### Arguments:

- direction - (*int*, optional) indicate the direction of the carousel movement: -1 will move from right to left and 1 will move in the opposite direction. this has no effect if the option circular is false.

### Returns:

* (*object*) - This Carousel instance.

Method: move
----------------

make an item visible. nothing will happen if the item is already visible.

### Arguments:

1 - index - (*mixed*) index or item to show
2 - direction - (*int*, optional) indicate the direction of the carousel movement: -1 will move from right to left and 1 will move in the opposite direction. this has no effect if the option circular is false.

### Returns:

* (*object*) - This Carousel instance.

Method: first
------------------------

### Returns:

* (*int*) - the index of the first displayed item

Method: isVisible
------------------------

return true if the item at *index* is visible.

### Arguments:

- index - (*mixed*) the item or its index in the items list.

### Returns:

* (*boolean*)
