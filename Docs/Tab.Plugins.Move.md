Move {#Tabs-plugins:Move}
============

move panels either vertically or horizontally.

### Options: {#Tabs-plugins:options}

* mode  - (*string*, optional) define the direction of the panels movement. default to *horizontal*. possible values are *vertical* | *horizontal*.
* useOpacity  - (*boolean*) apply opacity when panels are moved. default to false.
* opacity  - (*float*, optional) the opacity value, default to .7.
* circular  - (*boolean*, optional) apply circular movement.

## Example:

	
	var swapper = new Tab({
						container: 'slide', 
						//setup animation
						animation: 'Move',
						onChange: function () {

							if(window.console && console.log) console.log(arguments)
						}, 
						params: {
						
							//plugins parameters here
							mode: 'vertical',
							useOpacity: true,
							opacity: .5
						},
						fx: {
							duration: 800
						}
					});

