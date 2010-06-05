Tab {#Tab}
============

Minimalistic but extensible tab swapper. It can be used to create a tab swapper as well as a galerie slideshow. The swapping can be customized by specifying a plugin in the constructor.

Tab Method: constructor {#Class:constructor}
---------------------

### Syntax:

	var swapper = new Tab(options);


### Arguments:

1. options - (*object*) See below.

### Options: {#Tab:options}

* container  - (*mixed*) the element that contains the panels.
* selector  - (*string*, optional) only container children that match the selector will be grabbed.
* animation  - (*string*, optional) the transition plugin to use for swapping. default to *None*
* params - (*object*, optional) parameters specific to the transition plugin.
* fx - (*object*, optional) parameters for the animation. this can be any of the Fx parameters.
* current  - (*int*, optional) index of the panel that is displayed first. default to 0
* tabs  - (*mixed*, optional) when a tab is clicked, the corresponding panel is shown. anything you can pass to $$ is accepted. 
* activeClass  - (*string*, optional) style applied to the selected tab.
* inactiveClass  - (*string*, optional) style applied to every unselected tab.

### Events:

#### create

Fired right after the tabs has been setup.

##### Signature:

	onCreate(newPanel, index)

##### Arguments:

1. newPanel - (*element*) the active panel.
2. index - (*int*) the index of the active panel.

#### change

Fired when the active panel is changed.

##### Signature:

	onChange(newPanel, curPanel, index, current)

##### Arguments:

1. newPanel - (*element*) the active panel.
2. oldPanel - (*element*) the previously selected panel.
3. index - (*int*) the index of the active panel.
4. current - (*int*) index of the previously selected panel.


Tab Method: next {#Tab:next}
----------------------------

display the next panel.

### Returns:

* (*object*) - This Tab instance.

Tab Method: previous {#Tab:previous}
----------------------------

display the previous panel.

### Returns:

* (*object*) - This Tab instance.

Tab Method: getSelectedIndex {#Tab:getSelectedIndex}
----------------------------

### Returns:

* (*int*) - the index of the displayed panel

Tab Method: setSelectedIndex {#Tab:setSelectedIndex}
----------------------------

set the displayed panel.

### Syntax:

	swapper.setSelectedIndex(0);

### Arguments:

- index - (*int*) index of the panel to display.
- direction - (*int*, optional) direction of the animation. allowed values are -1 for right to left and 1 for left to right. this is used in Tab.plugins.Move when [circular][] is true

### Returns:

* (*object*) - This Tab instance.


[circular]: [Tab.Plugins.Move#Tabs-plugins:options]