Move {#Tabs-plugins:Move}
============

move panels either vertically or horizontally.

### Options:

* scattering  - (*int*, optional)

## Example:

	
	var swapper = new Tab({
						container: 'slide', 
						//setup animation
						animation: 'Stack',
						params: {
						
							//plugins parameters here
							scattering: 50
						},
						fx: {
							duration: 800
						}
					});

