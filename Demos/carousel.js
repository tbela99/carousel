
function init (options) {
	
		var duration = 300,
		
			div = document.getElement('div.tabs');
			links = div.getElements('a'),
			toggle =  document.id('toggle'),
			carousel = new Carousel(Object.append({
			
						activeClass: 'selected',
						container: 'slide',
						scroll: 1,
						distance: 1,
						circular: true,
						autostart: true,
						current: 3,
						previous: links.shift(),
						next: links.pop(),
						tabs: links,
						toggle: toggle,
						/* mode: 'horizontal', */
						fx: {
						
							duration: duration
						}
					}, 
					
					options
				)
			),
			removed = 0;
			
		toggle.addEvent('click', function () { this.set('text', carousel.active ? 'Stop' : 'Play')});
		
		function change() {
		
			var panel = this.retrieve('panel');
			
			if(this.checked) {
				
				if(!panel) {
				
					if(carousel.running) {
					
						carousel.addEvent('complete:once', change.bind(this));
						return
					}
					
					panel = carousel.remove(Math.max(0, this.value - removed));
					
					if(panel) {
					
						this.store('panel', panel);
						removed++;
					}
					
					this.checked = !!panel
				}
				
			} else {
			
				if(panel) {
				
					this.eliminate('panel');
					removed--;
					carousel.add(panel.panel, panel.tab.inject(div.getFirst(), 'after'), this.value)
				}
			}
		}
		
		$$('input.remove').addEvents({click: change, change: change})
	}