Random {#Tabplugins:Random}
============

Apply many effects to the transition like the Barack Slideshow plugin.

### Options:

* useOpacity  - (*boolean*) apply opacity when panels are moved. default to false.
* opacity  - (*float*, optional) the opacity value, default to .7.
* random  - (*boolean*, optional) if true the transitions are chosen randomly.
* directions - (*mixed*, optional) directions to which the transitions are applied. default to *['left', 'right', 'top', 'bottom']*
* transitions  - (*mixed*, optional) list of transitions to use. if not specified all transitions will be applied. default to *['fade', 'move', 'slideIn', 'slideOut']*

## Example:

	//example 1
	var swapper = new Tab({
						container: 'slide', 
						//setup animation
						animation: 'Random',
						onChange: function () {

							if(window.console && console.log) console.log(arguments)
						}, 
						params: {
						
							//plugins parameters here
							transitions: 'slideIn'
						},
						fx: {
							duration: 800
						}
					});

	//example 1
	var swapper2 = new Tab({
						container: 'slide2', 
						//setup animation
						animation: 'Random', 
						params: {
						
							//plugins parameters here
							transitions: ['slideIn', 'slideOut']
						},
						fx: {
							duration: 800
						}
					});


	//example 1
	var swapper3 = new Tab({
						container: 'slide2', 
						//setup animation
						animation: 'Random', 
						params: {
						
							//plugins parameters here
							transitions: 'SlideOut',
							directions: ['left', 'right']
						},
						fx: {
							duration: 800
						}
					});

