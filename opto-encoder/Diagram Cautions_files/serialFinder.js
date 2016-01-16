(function($) {
	var WCM_BASE_URL = window.location.protocol + '//' + window.location.host; 
	
	$.widget("canon.serialNumberFinder", {
				   
		options: {
		  headerLabel: 'HOW TO FIND YOUR SERIAL NUMBER',		  
		  showCloseButton: true,
		  selectOptions : [],
		  serialNumberWcmUrl: ''
		},
		_create: function() {
			
			var self = this;
			var el = this.element;
				        	      
	        $.ajax({
		        url: this.options.serialNumberWcmUrl,		        
		        type: 'POST',
		        datatype:'json'
			}).done(function(data) {
				
				if (data.productCategoryItems && data.productCategoryItems.items) {
				
					self.options.selectOptions = data.productCategoryItems.items;
					
					el.addClass('row');
			        		     
			        var $title = $('<div></div>', {class: 'col-xs-10 col-sm-10'});		       
			        if (data.displayTitle) {
			        	$title.append($('<p><strong>' + data.displayTitle + '</strong></p>'));
			        } else {
			        	$title.append($('<p><strong>' + self.options.headerLabel + '</strong></p>'));		        	
			        }
			        
			        el.append($title);

			        var $close = $('<div></div>', {class: 'col-xs-2 col-sm-2 pull-right'});	
			        if (self.options.showCloseButton) {
			        	$close.append(self._createCloseButton());
			        }
			        el.append($close);
			        
			        var $secondRow = $('<div class="row"></div>');
			        var $innerDiv = $('<div class="col-xs-12 col-sm-12"></div>');
			        $secondRow.append($innerDiv);    
			        el.append($secondRow);
			        
			        $innerDiv.append(self._createSelectList());	
			        $innerDiv.append('<br/><br/>');	
			        $innerDiv.append($('<p id="serial-title"></p>'));		    
			        $innerDiv.append($('<p id="serial-description"></p>'));
			        $innerDiv.append($('<p><img id="serial-image" class="img-responsive"></p>'));
			        		        		       
			        self._addCategoryHandler();
			        self._addCloseHandler();
				}
				
			});	        	                	    
	    },
	    _createCloseButton: function() {
	    	var a = $('<a></a>', {class: 'addBtn pull-right'});
	    	a.append($('<span></span>', {class: 'glyphicon glyphicon-remove close-serial-number'}));
	    	return a;
	    },
	    _createSelectList: function() {
	    	var select = $('<select></select>', {class: 'form-control selectpicker', id: 'serial-number-select'});
	    	select.append('<option value="-1"></option>');
	    	
	    	$.each(this.options.selectOptions, function(idx, opt) {
	    		var selectOption = $('<option>' + opt.title + '</option>');
	    		selectOption.data('element', opt);
	    		select.append(selectOption);
	    	});
	    	
	    	return select;
	    },
	    _addCategoryHandler: function() {	
	    	var self = this;
	    	$('.selectpicker').on('change', function(){
	    		var selected = $(this).find("option:selected").data('element');	
	    		if (selected) {
	    			if ($('#devicetype-mobile').is(':visible')) {	    				
	    				$('#serial-image').attr('src', WCM_BASE_URL + selected.imageMobile).addClass('img-responsive');
	    			} else if ($('#devicetype-tablet').is(':visible')) {	    				
	    				$('#serial-image').attr('src', WCM_BASE_URL + selected.imageTablet).addClass('img-responsive');
	    			} else {	    				
	    				$('#serial-image').attr('src', WCM_BASE_URL + selected.imageDesktop).addClass('img-responsive');
	    			}
	    			
	    			$('#serial-image').show();
	    			$('#serial-title').html('<strong>' + selected.title + '</strong>');
		    		$('#serial-description').text(selected.description);
	    		} else {
	    			self.clear();
	    		}
	    		
	    	});
		},
		_addCloseHandler: function() {	
			var self = this;
			$('.close-serial-number').click(function () {				
		        $('#SerialNumberInstructions').slideUp();	
		        self.clear();
		    });
		},
		clear: function() {	    	
			$('#serial-image').attr('src', '').removeClass('img-responsive').hide();
    		$('#serial-description').text('');
    		$('#serial-title').html('');
    		$('#serial-number-select').val('-1');
    		$('#serial-number-select').selectpicker('refresh');
    		$('#serial-number-select').selectpicker('render');
	    }
	});
	
})(jQuery);