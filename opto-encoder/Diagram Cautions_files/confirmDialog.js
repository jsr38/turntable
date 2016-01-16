(function($) {
	$.widget("canon.confirmDialog", {
				   
		options: {
		  title: 'Please Confirm',
		  message: 'Are you sure ?',
		  closeLabel: 'Close',
		  cancelLabel: 'Cancel',
		  okLabel: 'Ok'
		},
		_create: function() {
			
			var el = this.element;
			
	        el.addClass('modal fade');
	        el.attr('tabindex', '-1').attr('role', 'dialog').attr('aria-hidden', 'true');
	        
	        var modalDialog = $('<div></div>', {class: 'modal-dialog'});
	        el.append(modalDialog);
	        
	        var modalContent = $('<div></div>', {class: 'modal-content'});
	        modalDialog.append(modalContent);
	        
	        var modalHeader = $('<div></div>', {class: 'modal-header'});
	        var modalBody = $('<div></div>', {class: 'modal-body'});
	        var modalFooter = $('<div></div>', {class: 'modal-footer'});
	        modalContent.append(modalHeader).append(modalBody).append(modalFooter);
	        
	        var closeButton = $('<button></button>', {type: 'button', class: 'close'});
	        closeButton.attr('data-dismiss', 'modal').attr('aria-label', this.options.closeLabel);
	        closeButton.append($('<span></span>').attr('aria-hidden', 'true').html('&times;'));	        
	        
	        modalHeader.append(closeButton).append($('<h4></h4>', {class: 'modal-title'}).text(this.options.title));
	        
	        modalBody.append($('<p></p>').text(this.options.message));
	        
	        var cancelButton = $('<button></button>', {type: 'button', class: 'cbtn cbtn-light-gray-2', id: 'btn-cancel'});
	        cancelButton.attr('data-dismiss', 'modal');	   
	        cancelButton.text(this.options.cancelLabel);
	        
	        var okButton = $('<button></button>', {type: 'button', class: 'cbtn cbtn-canon-red', id: 'btn-confirm'});	       
	        okButton.text(this.options.okLabel);
	        
	        modalFooter.append(cancelButton).append(okButton);
	    }
	});
	
})(jQuery);