Matrix {#Tabsplugins:Matrix}
============

Apply various effects to the transition, this plugin is designed to work with images.

It should work in every browser but **IE6**.

### Options :{#Tabsplugins:Options}

* random  - (*boolean*, optional) apply effects randomly. default to true.
* mode  - (*string*, optional) define the direction of the animation. default to *horizontal*. possible values are *vertical* | *horizontal* | *both*.
* amount - (*int*, optional) number of line used by the animation. default to 8
* fragments - (*int*, optional) every line will be divided into fragments. default to 3.
* sort - (*mixed*, optional) the sort filter to apply to the slices. default to *['none', 'reverse', 'shuffle']*.
* transitions  - (*mixed*, optional) list of transitions to use, there are now 11 transitions available. you can specify one or more transitions. by default all transitions will be applied. default to *['grow', 'floom', 'wave', 'lines', 'chains', 'fold', 'fall', 'explode', 'implode', 'out', 'split']*
* settings - (*object*, optional) .

#### settings
This property allow you to setup per transition settings. the object keys are transitions name and values are:
* params - (*object*, optional) override [options](#Tabsplugins:Options)
* fx - (*object*, optional) override [fx][]

## Example:

	//example 1
	var swapper = new Tab({
						container: 'slide', 
						//setup animation
						animation: 'Matrix', 
						params: {
						
							//we got the Oskar Floom here
							random: false,
							transitions: 'floom',
							duration: 75,
							amount: 24,
							fragments: 1
						},
						fx: {
							duration: 500 //this should be greater than params.duration * params.fragments * params.amount
						}
					});

	//example 2
	var swapper2 = new Tab({
						container: 'slide2', 
						//setup animation
						animation: 'Matrix', 
						params: {
						
							//plugins parameters here
							transitions: ['fold', 'chains']
						},
						fx: {
							duration: 500
						}
					});

	//example 3, customizing some transitions settings
	var swapper2 = new Tab({
						container: 'slide2', 
						//setup animation
						animation: 'Matrix', 
						params: {
						
							//plugins parameters here
							random: false,
							settings: {
							
								split: {
								
									params: {
									
										random: true,
										sort: ['reverse', 'none'],
										amount: 10,
										fragments: 5
									}
								},
								fold: {
								
									params: {
									
										mode: 'vertical',
										amount: 10,
										fragments: 1
									}
								},
								lines: {
								
									fx: {
									
										transition: 'bounce:out'
									}
								},
								explode: {
								
									fx: {
									
										transition: 'bounce:in'
									}
								}
							}
						},
						fx: {
							duration: 500
						}
					});

[fx]: [Tab#Tab:options]