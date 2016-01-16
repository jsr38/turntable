(function($) {
	
	var productHierarchyJson = {};
	var WCM_BASE_URL = window.location.protocol + '//' + window.location.host; 
	
	$.widget("canon.productfinder", {
				   
		options: {
		  typeaheadButtonLabel : 'Select Product',
		  typeaheadHeader : 'Use your Model Name / Number',
		  typeaheadPlaceholder : 'Enter a Model Name / Number',
		  dropdownHeader : 'Use our Product Finder',
		  productFinderButtonLabel : 'Product Finder',		
		  typeaheadSelectCallback : undefined,
		  context : '',
		  productFinderHierarchyUrl : '',
		  levelLabels : ['Product Category', 'Product Family','Product Series', 'Models'],
		  levelDepth: 4,
		  showImages: false,
		  initialLevel: 0
		},
		_create: function() {
			
			var el = this.element;
			
	        el.addClass('row');
	        
	        el.append($('<div></div>', { class: 'col-xs-12 text-center cf-error', id: 'pf-error-message'}));
	        this._createTypeahead(el);
	        el.append($('<div></div>', { class: 'col-xs-12 col-sm-1 text-center'}).append($('<span></span>', {class: 'conjunction'}).text('OR')));
	        this._createDropdown(el);
	        
	        var selectors = $('<div></div>', { class : 'row pf-all-selectors'});
	        el.after(selectors);
	        
	        selectors.append($('<div></div>', { class : 'col-sm-12 text-right'}).append($('<button></button>', { class : 'cbtn cbtn-canon-red-o pf-clear'}).text('Clear All')));
	       
	        this._createLevel(selectors, this.options.initialLevel, this.options.levelLabels[this.options.initialLevel]);
	        
	        this._addOpenProductFinderClickHandler();
	        this._addCloseButtonHandler();
	        this._initializeTypeAhead();
	        this._addLevelClickHandler();
	        this._addOptionSelectHandler();
	    },
	    _createTypeahead: function(el) {
	    	var self = this;
	    	var outerDiv = $('<div></div>',{ class: 'col-xs-12 col-sm-6 text-center'});
	    	outerDiv.append('<h4>' + this.options.typeaheadHeader + '</h4>');
	    	
	    	var inputGroup = $('<div></div>',{ class: 'input-group'});
	    	inputGroup.append($('<input></input>', {type: 'text', id: 'modelName', class: 'form-control', placeholder: this.options.typeaheadPlaceholder}).attr('autocomplete', 'off'));
	    	inputGroup.keypress(function(e) {
        	  if(e.which == 13) {
        	    var $btn = $('#btn-get');
        	    if ($btn.data('model') != undefined) {	
        	    	CoreMetricsWrapper.createElementTag($btn.text() + ' - ' + $btn.data('model').title,'Open',null);        	    	
	    			self._trigger('selected', e, $btn.data('model'));
	    			$btn.removeData('model');
	    		}	    	
	    		$('#modelName').val('');
        	  }
        	});
	    	
	    	$(document).on('keydown', $('#modelName'), function (e) {	    		
	    		if (e.which != 13) {
	    			var $btn = $('#btn-get');
	    			$btn.removeData('model');
	    		}
			});
	    		    		  
	    	var button = $('<div></div>', {id: 'btn-get', class: 'input-group-addon cbg-dark-gray-1 cbr-dark-gray-1 cf-white'});
	    	button.text(this.options.typeaheadButtonLabel);
	    	button.click(function(e) {		    		
	    		e.preventDefault();	  
	    		var $this = $(this);	    		
	    		if ($this.data('model') != undefined) {    			
	    			CoreMetricsWrapper.createElementTag($this.text()+'-'+$this.data('model').title + ' / ' + $this.data('model').model_id, document.title + '- MODEL NAME/NUMBER ENTRY',null);
	    			self._trigger('selected', e, $this.data('model'));
	    			$this.removeData('model');
	    		}	    	
	    		$('#modelName').val('');
	    	});
	    	button.hover(
	    		function() {
	    			var $this = $(this);
	    			if ($this.data('model') != undefined) {
	    				$this.addClass('cbtn-canon-red');	
	    			}
	    		}, function() {	    			
	    			$(this).removeClass('cbtn-canon-red');	
	    		}
			);
	    	inputGroup.append(button);
	    	
	    	var innerDiv = $('<div></div>',{ class: 'form-group'});
	    	innerDiv.append(inputGroup);
	    	
	    	outerDiv.append(innerDiv);
	    	
	    	el.append(outerDiv);
	    },
	    _createDropdown: function(el) {
	    	var outerDiv = $('<div></div>',{ class: 'col-xs-12 col-sm-5 text-center'});
	    	outerDiv.append('<h4>' + this.options.dropdownHeader + '</h4>');
	    	
	    	var inputGroup = $('<div></div>',{ class: 'input-group'});	    	
	    	var button = $('<div></div>', {class: 'input-group-addon cbg-dark-gray-1 cbr-dark-gray-1 cf-white pf-open', style: 'cursor: pointer'});
	    	button.attr('data-prf-context', this.options.context);
	    	button.append($('<span></span>', {class: 'pf-open-on'}));
	    	button.append(this.options.productFinderButtonLabel);
	    	inputGroup.append(button);
	    	
	    	var innerDiv = $('<div></div>',{ class: 'form-group'});
	    	innerDiv.append(inputGroup);
	    	
	    	outerDiv.append(innerDiv);
	    	
	    	el.append(outerDiv);
	    },
	    _addOpenProductFinderClickHandler: function() {
	    	var self = this;
	    	$('.pf-open').click(function(e){
				e.preventDefault();
		        $('.pf-open span').toggleClass('pf-open-on pf-open-off');        
		        $('.pf-all-selectors').slideToggle();
		        
		        var $this = $(this);
				if ($this.find('span').hasClass('pf-open-off')) {
					var context = $this.attr('data-prf-context');
					
					$.ajax({
				        url: self.options.productFinderHierarchyUrl,		        
				        type: 'POST',
				        datatype:'json',
				        data: {"context" : context},
					}).done(function(data) {
						
						productHierarchyJson = data.sa.items;
						
						if (self.options.initialLevel === 1) {
							productHierarchyJson = data.sa.items[0].children;
						}
																	
						var level0 = $.grep(productHierarchyJson, function(elem, idx) {						
							  return ( elem.depth === self.options.initialLevel.toString() );
						});

						var level0Dropdown = $('#level' + self.options.initialLevel);
						level0Dropdown.empty();
						
						level0.sort(self._sortBy('title', false, null));
						$.each(level0, function(idx, option) {
							level0Dropdown.append($("<li data-depth='" + option.depth + "' data-name='" + option.name +  "' title='" + option.title + "'>" + decodeURIComponent(option.title) + "</li>"));
						});
						
					});
				}	
	    	});
	    },
	    _addOptionSelectHandler: function() {
	    	var self = this;
	    	$(document).on('click', '.pf-selector ul.pf-options li', function() {
				var $this = $(this);			
				$this.closest('.pf-selector').find('small').html($this.text());
				
				var $curentLevel = $this.closest('div.pf-level');
				var currentDepth = $this.attr('data-depth');
				var selectedName = $this.attr('data-name');
				var nextDepth = Number(currentDepth) + 1;
				var $selectors = $('div.pf-all-selectors');
				
				var currentElement;
				$.each(productHierarchyJson, function walker(key, value) {	    					 		
			 		if (value.depth === currentDepth && value.name === selectedName) {
			 			currentElement = value;
			 			return false;
			 		}
			 	
				    if (value !== null && typeof value === "object") {
				        // Recurse into children
				        $.each(value, walker);
				    }
				});	
				
				// remove all the levels that came behind this one
				$curentLevel.nextAll('div.pf-level').remove();
				$('button.pf-continue').remove();
					
				if (currentElement && currentElement.hasOwnProperty('children') && currentElement.children.length > 0) {
					//productHierarchyJson = currentElement[0].children;
					var newLevel = self._createLevel($selectors, nextDepth, self.options.levelLabels[nextDepth]);
					var levelDropdown = $('#level' + nextDepth);
					levelDropdown.empty();				
					var lowestLevel = false;
					
					currentElement.children.sort(self._sortBy('title', false, null));
					$.each(currentElement.children, function(idx, option) {												
						var listItem = $("<li data-depth='" + option.depth + "' data-name='" + option.name +  "' title='" + option.title + "'>" + decodeURIComponent(option.title) + "</li>");
						if (!option.hasOwnProperty('children') || option.children.length === 0) {
							lowestLevel = true;
							listItem.addClass('col-xs-12 col-md-3 col-sm-4');
							if (self.options.showImages) {
								if ($('#devicetype-mobile').is(':visible')) {	    				
									listItem.prepend('<img src="' + WCM_BASE_URL + option.small_thumbnailImageUrl + '" class="img-responsive" /><br/>');
				    			} else if ($('#devicetype-tablet').is(':visible')) {	    				
				    				listItem.prepend('<img src="' + WCM_BASE_URL + option.medium_thumbnailImageUrl + '" class="img-responsive" /><br/>');
				    			} else {	    				
				    				listItem.prepend('<img src="' + WCM_BASE_URL + option.large_thumbnailImageUrl + '" class="img-responsive" /><br/>');
				    			}								
							}
							newLevel.find('h3').text(self.options.levelLabels[self.options.levelLabels.length-1]);
						}
						levelDropdown.append(listItem);
						
						if (lowestLevel && !levelDropdown.hasClass('products-list')) {
							levelDropdown.addClass('products-list');								
						}
					});
					
					newLevel.find('.pf-selector').click();
				} else {
					if ($('button.pf-continue').length === 0) {
						$selectors.append($('<div></div>', { class : 'col-sm-12 text-center'}).append($('<button></button>', { class : 'pf-continue cbtn cbtn-light-gray-1'}).data('model', currentElement).text(self.options.typeaheadButtonLabel)));
						$('button.pf-continue').click(function(e) {	
							e.preventDefault();
							
			    			var selectedHierarchy = '';
			    			$('div.pf-selector small').each(function() {
			    				selectedHierarchy = selectedHierarchy + $(this).text() + '>';
			    			});
			    			
			    			selectedHierarchy = selectedHierarchy.substring(0, selectedHierarchy.length - 1);			    			
			    			
			    			CoreMetricsWrapper.createElementTag($(this).text() + ' - ' + selectedHierarchy + ' / ' + $(this).data('model').model_id, document.title + '- PRODUCT FINDER', null);
			    			
							self._trigger('selected', e, $(this).data('model'));
							$(this).removeData('model');
							self.closeProductFinder();
						});
					} else {
						$('button.pf-continue').data('model', currentElement);
					}					
				}							
			});		
	    },
	    _sortBy: function(field, reverse, primer){

	 	   var key = primer ? 
	 	       function(x) {return primer(x[field])} : 
	 	       function(x) {return x[field]};

	 	   reverse = !reverse ? 1 : -1;

	 	   return function (a, b) {
	 	       return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
	 	     }; 
	 	},
	    _createLevel: function(el, level, label) {
	    	
	    	var outerDiv = $('<div></div>', {class: 'col-sm-12 pf-level', style: 'cursor: pointer'});
	    	var innerDiv = $('<div></div>', {class: 'pf-selector text-center cbr-light-gray-1'});
	    	outerDiv.append(innerDiv);
	    	if (level === this.options.initialLevel) {
	    		outerDiv.addClass('first-level');
	    	}
	    	
	    	innerDiv.append($('<h3></h3>').text(label));
	    	innerDiv.append($('<i></i>',{class: 'fa fa-angle-down pull-right'}));
	    	innerDiv.append($('<small></small>'));
	    	innerDiv.append($('<ul></ul>',{class: 'pf-options clearfix', id: 'level' + level}));
	    	innerDiv.click(function(){});
	    	el.append(outerDiv);
	    	
	    	return outerDiv;
	    },
	    _addLevelClickHandler: function() {
	    	$(document).on('click', '.pf-selector', function() {
	    		var $this = $(this);
	    		$this.toggleClass('active');
	    		$this.find('.pf-options').fadeToggle(0);
	            var $icons = $this.find('i');
	            if ($icons.hasClass("fa-angle-down") ){
	                $icons.removeClass("fa-angle-down").addClass("fa-angle-up");
	            } else {
	                $icons.removeClass("fa-angle-up").addClass("fa-angle-down");
	            }
	        });
	    },
	    closeProductFinder: function() {
	    	$('.pf-open span').removeClass('pf-open-off').addClass('pf-open-on'); 
	    	$('div.pf-level').not('.first-level').remove();
	    	$('button.pf-continue').remove();
	        $('.pf-all-selectors').hide();
	        $('.pf-selector small').text('');
	    },
	    updateButtonLabels: function(newLabel) {
	    	this.options.typeaheadButtonLabel = newLabel;
	    	
	    	$('#btn-get').text(newLabel);
	    	if ($('button.pf-continue').length > 0) {
	    		$('button.pf-continue').text(newLabel);
	    	}
	    },
	    updateContext: function(newContext) {	    	
	    	this.closeProductFinder();
	    	this.options.context = newContext;	
	    	$('div.pf-open').attr('data-prf-context', newContext);
	    },
	    updateLevelLabels: function(newLabels) {
	    	this.options.levelLabels = newLabels;   
	    	$('div.first-level').find('h3').text(newLabels[0]);
	    },
	    showTypeahead: function(show) {	    	
	    	if (show) {
	    		$('#product-finder').show();	
	    		$('button.pf-close').show();	
	    		this.closeProductFinder();
	    	} else {
	    		$('div.pf-open').click();
	    		$('#product-finder').hide();	
	    		$('button.pf-close').hide();	
	    	}
	    },
	    _addCloseButtonHandler: function() {
	    	$('.pf-clear').click(function(e) {
		    	e.preventDefault();
		    	$('div.pf-level').not('.first-level').remove();
		    	$('button.pf-continue').remove();		        
		        $('.pf-selector small').text('');
		    });
	    },	   
	    _initializeTypeAhead: function() {
	    	var self = this;
	    	var _timeout = null;
		    var _keyboardDelay = 700;
		    var models = [];
		    var _typeaheadInitialized = false;
		    
	    	$('#modelName').typeahead({
	    		source: function (query, process) {
	    			
    				if (_typeaheadInitialized) {
	    				return process(models);
	    			}
	    			
	    			 if (_timeout) {
	                     clearTimeout(_timeout);
	                 }
	    			 _timeout = setTimeout(function() {    				 
	    				 return $.post(self.options.productFinderHierarchyUrl, {context: self.options.context}, function (data) { 	    					 	
	    					 	$.each(data.sa.items, function walker(key, value) {	    					 		
	    					 		if (value.title !== undefined && value.model_id !== '') {
	    					 			models.push(value);
	    					 		}
	    					 	
	    						    if (value !== null && typeof value === "object") {
	    						        // Recurse into children
	    						        $.each(value, walker);
	    						    }
	    						});	   
	    			
	    					 	models = Utils.uniqueList(models, 'model_id');
	    					 	
	    					 	models.sort(self._sortBy('title', false, null));
	    					 	
	    					 	_typeaheadInitialized = true;
	    	    	            return process(models);
	    	    	        });
	    			 }, _keyboardDelay);    	        
	    	    },
	    	    displayText: function(model) {  	    	    	
	    	    	return $('<div/>').html(model.title).text();
	    	    },
	    	    afterSelect: function(model) {	    	    		    	    	
	    	    	$('#btn-get').data('model', model);	    	    	    	    
	    	    }
	    	});
	    }
	});
})(jQuery);