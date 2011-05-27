Carousel
============

Extensible mootools carousel with dynamic elements addition/removal.

[Demo](http://tbela99.github.com/carousel/Demos/horizontal.html)

#### More demos

- [Vertical](http://tbela99.github.com/carousel/Demos/vertical.html)
- [Horizontal](http://tbela99.github.com/carousel/Demos/horizontal.html)

How to use
---------------------

It is quite simple to use. a new class *Carousel.Extra* has been added. it allows you to make your carousel slide automatically. it has every Carousel options/properties plus some specific options which allow you to control the auto slide

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

		carousel tabs
	*/
	
	div.tabs a.selected {

		text-decoration: underline;
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
	
		var duration = 300,
		
			links = $$('div.tabs a'),
			
			tab = new Carousel.Extra({
				container: 'slide',
				scroll: 2,
				circular: true,
				current: 3,
				previous: links.shift(),
				next: links.pop(),
				tabs: links,
			/* 
				
				mode: 'horizontal', 
				autostart: false,
				
			*/
				activeClass: 'selected',
				fx: {
				
					duration: duration
				}
			})
	})
	
### Options:

* container  - (*mixed*) the element that contains the panels.
* tabs  - (*mixed*, optional) elements associated to the carousel panels. a click on a tab makes associated panel visible.
* selector  - (*string*, optional) use only children that match this selector. useful when you have something else in your html like arrows to move the carousel.
* link  - (*string*, optional) indicates the way concurrent animations are handled. allowed values are *cancel* (default) cancel current animation, *ignore* ignore the new animation, *chain* run the new animation after the current is completed.
* activeClass  - (*string*, optional) css class od the active tab.
* inactiveClass  - (*mixed*, optional) css class of inactive tab.
* circular: (*boolean*, optional) determines how the carousel behaves when it reaches the bounds.
* previous - (*mixed*, optional) element that moves carousel to the left when clicked.
* next - (*mixed*, optional) element that moves carousel to the right when clicked.
* mode - (*string*, optional) the carousel mode. allowed values are *vertical* and *horizontal*
* scroll - (*int*, optional) the number of items visible in the carousel, this must be set using css. the carousel will not attempt to resize the container to fit this number.
* animation  - (*string*, optional) the transition plugin to use for transition. default to *Move*. possible values are *Move* and *Rotate3D*
* fx - (*object*, optional) parameters for the animation. this can be any of the Fx parameters.
* current  - (*int*, optional) index of the first displayed item. default to 0.
* distance - (*int*, optional) the number of images to cycle through each time next/previous are called .... defaults to 1.

### Additional options for Rotate3D effect:

* margin  - (*int*, optional) carousel margin.
* centerOffset  - (*object*, optional) offset relative to the center of the carousel ellipsis. default to {x:0, y: 0}.
* xRadius  - (*string*, optional) carousel ellipsis x radius.
* yRadius  - (*string*, optional) carousel ellipsis x radius.
* min  - (*mixed*, optional) min element size ratio.
* offsetAngle: (*boolean*, optional) determines how the carousel behaves when it reaches the bounds.
* zIndex - (*int*, optional) elements zIndex, default to 100.

### Carousel.Extra Options:
these options are specific to Carousel.Extra

* interval  - (*int*) interval between 2 animations in seconds.
* delay - (*int*) delay between the moment the next/previous button is clicked and the auto slide is restarted.
* autostart  - (*boolean*) automatically start slide after the carousel is created.
* reverse - (*boolean*) run the carousel in reverse order.

### Events:

#### change

Fired after the first item change.

##### Signature:

	onChange(current)

##### Arguments:

4. current - (*int*) index of the first displayed element.


Method: add 
------------

add an element to the carousel.

### Arguments:

- panel - (*mixed*) element to add.
- tab - (*mixed*, optional) tab associated to the element.
- index - (*int*, optional) position where the tab will be inserted.

### Returns:

* (*object*) - This Carousel instance.

Method: remove 
------------

remove element at given index from the carousel. you cannot remove an element while an animation is running. you cannot remove the current element

### Arguments:

- index - (*int*)

### Returns:

* (*object*) - object containing the element and its tab {panel: panel, tab: tab}.

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

make an item visible.

### Arguments:

1. index - (*mixed*) index or item to show
2. direction - (*int*, optional) indicate the direction of the carousel movement: -1 will move from right to left and 1 will move in the opposite direction. this has no effect if the option circular is false.

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

Carousel.Extra Method: start
------------------------

starts the automatic slide.

### Returns:

* (*object*) this Carousel instance

Carousel.Extra Method: Method: stop
------------------------

stop the automatic slide.

### Returns:

* (*object*) this Carousel instance

Carousel.Extra Method: Method: toggle
------------------------

toggle the automatic slide.

### Returns:

* (*object*) this Carousel instance
