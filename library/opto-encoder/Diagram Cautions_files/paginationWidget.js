$.widget( "canon.paginator", {
 
	currentPage: 1,
	visiblePages: 5,

	// Default options
    options: {
        prevText: 'Prev',
        nextText: 'Next',
        totalPages: 10
    },
    
    
    _create: function() {
    	
    	if (this.options.totalPages < this.visiblePages) {    		
    		this.visiblePages = this.options.totalPages;    		
    	}
    	
    	this._render();  
    	this._attachHandlers(); 
    },
    _render: function() {
    	
    	this.element.addClass('pagination');
    	
    	if (this.options.totalPages === 1) {
    		this.element.hide();
    		return;
    	}
    	
    	var prevLink = $('<a>', {href: '#', class: 'prev', style: 'display: none;'});
    	prevLink.append($('<i>', {class: 'glyphicon glyphicon-chevron-left'}));
    	prevLink.append($('<span>', {text: this.options.prevText, class: 'pag-text'}));
    	
    	this.element.append(prevLink);
    	
    	for (var idx=1; idx <= this.visiblePages; ++idx) {
    		this.element.append($('<a>', {href: '#', text: idx, rel: idx, class: 'pag-button'}));
    	}   
    	    
    	$('a.pag-button:first').addClass('active'); 
    	
    	if (this.visiblePages + 2 <= this.options.totalPages) {
    		this.element.append($('<a>', {href: '#', text: '...', rel: -1, class: 'pag-button'}));
    		this.element.append($('<a>', {href: '#', text: this.options.totalPages, rel: this.options.totalPages, class: 'pag-button'}));    		
    	} else if (this.visiblePages + 1 === this.options.totalPages) {    		
    		this.element.append($('<a>', {href: '#', text: this.options.totalPages, rel: this.options.totalPages, class: 'pag-button'}));    		
    	}
    	this.element.append($('<a>', {href: '#', class: 'next'}).append($('<span>', {text: this.options.nextText, class: 'pag-text'}).append($('<i>', {class: 'glyphicon glyphicon-chevron-right'}))));
    },    
    _attachHandlers: function() {
    	var self = this;
    	this.element.on('click', 'a.prev', function(e) {
    		e.preventDefault();    		
    		if (self.currentPage > 1) {
    			--self.currentPage;   
        		self.setPage(self.currentPage, true);
    		} 
    	});
    	
    	this.element.on('click', 'a.next', function(e) {
    		e.preventDefault();
    		if (self.currentPage < self.options.totalPages) {
    			++self.currentPage;   
    			self.setPage(self.currentPage, true);
    		} 
    	});
    	
    	this.element.on('click', 'a.pag-button', function(e) {
    		e.preventDefault();
    	
    		var requestedPage = Number($(this).attr('rel'));
    		
    		if (requestedPage != self.currentPage) {
    			self.currentPage = requestedPage;  
    			self.setPage(self.currentPage, true);
    		}
    	});
    	    	
    },
    setPage: function(pageNr, trigger) {
    	var self=this;
    	if (pageNr < 1 || pageNr > this.options.totalPages) {
    		return;
    	}
    	
    	this.currentPage = pageNr;
    	self.element.find('a.pag-button').removeClass('active');
    	
    	var isPageVisible = false;
    	
    	if (this.options.totalPages <= (this.visiblePages+1)) {
    		
    	} else if (this.currentPage >= this.visiblePages && this.currentPage < (this.options.totalPages - 3)) {    		
    		$('a.pag-button:eq(1)').text('...').attr('rel', '-1');
    		$('a.pag-button:eq(2)').text(this.currentPage-1).attr('rel', this.currentPage-1);
    		$('a.pag-button:eq(3)').text(this.currentPage).attr('rel', this.currentPage);
    		$('a.pag-button:eq(4)').text(this.currentPage+1).attr('rel', this.currentPage+1);
    		$('a.pag-button:eq(5)').text('...').attr('rel', '-1');
    	} else if (this.currentPage >= (this.options.totalPages - 3)) { 
    		$('a.pag-button:eq(1)').text('...').attr('rel', '-1');
    		$('a.pag-button:eq(2)').text(this.options.totalPages - 4).attr('rel', this.options.totalPages - 4);
    		$('a.pag-button:eq(3)').text(this.options.totalPages - 3).attr('rel', this.options.totalPages - 3);
    		$('a.pag-button:eq(4)').text(this.options.totalPages - 2).attr('rel', this.options.totalPages - 2);
    		$('a.pag-button:eq(5)').text(this.options.totalPages - 1).attr('rel', this.options.totalPages - 1);
    	} else {
    		$('a.pag-button:eq(1)').text('2').attr('rel', '2');
    		$('a.pag-button:eq(2)').text('3').attr('rel', '3');
    		$('a.pag-button:eq(3)').text('4').attr('rel', '4');
    		$('a.pag-button:eq(4)').text('5').attr('rel', '5');
    		$('a.pag-button:eq(5)').text('...').attr('rel', '-1');
    	}
    	    	    		
    	self.element.find("a[rel='" + this.currentPage + "']").addClass('active');
    	
    	if (this.currentPage === 1) {
    		$('a.prev').hide();
    	} else {
    		$('a.prev').show();
    	}
    	
    	if (this.currentPage === this.options.totalPages) {
    		$('a.next').hide();
    	} else {
    		$('a.next').show();
    	}
    
    	if (trigger) {
    		this._trigger( "pageclick", null, { page: this.currentPage } );
    	}    	
    }
});