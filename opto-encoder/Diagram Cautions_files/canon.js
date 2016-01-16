/*/////////////////////////////

Need to include venders.include.js first:

version 8-25-2015

//////////////////////////////*/


///////////////////////////////////////////////////////
/* XX.) Support Functionality by HCC UI Team */
//////////////////////////////////////////////////////

var userInfo;


function thisHeight(){
    return $(this).height();
}



function heightHelper(){
	var w = $(document).width();
	
	if (w >= 768){
	  // removeInlineStyle('.four-picture-left-justified-img-container');
	 //  heightAdjust('.four-picture-left-justified-img-container',' .col-xs-12');
	}
	
	$(".nav-tabs").each(function() {
		$(this).find('li').css("height", "");
	    var thisULMax = Math.max.apply(Math, $(this).find("li").map(thisHeight));
	   	$(this).find('li').height(thisULMax);
	});
	
}		   
	
	    
function removeInlineStyle(parent){
   $(parent).find(' img').each(function(){
	  $(this).height(0);	  
   });
}	    
	    
	    
function heightAdjust(parent, child){
	
	   $(parent).each(function(){
		   
		   var obj = $(this).parent();
		   var ttl = $(parent + child).length;		   
		   
		   $(obj).find(parent + child+' img').each(function(){
			  
			  $(this).height(parseInt(obj.height()/ttl));
		   });
	
	   }); 
	
}	    
	


$( window ).resize(function() {
	heightHelper();
});

$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
	 heightHelper();
	 
	 //begin Fabiano's test code
	 
	 var x1 = $(($(this)).parent().parent().parent().find('.tab-content')[0]).find('.active.in').not('.fade');

	 if (x1.length==0){
		 x1 = $(($(this)).parent().parent().parent().find('.tab-content')[0]).find('.active.in');
	 }

	 $(x1).find('.canon-accordion').find('.collapse').removeClass('in');

	 $(x1).find('.canon-accordion').find('h4 a').addClass('collapsed').attr("aria-expanded",false);

	 $('.expand-all').html("Expand All");
	 
	 
	 //end test code
	 
	 
	 
});














$(document).ready(function() {
	
	 heightHelper(); 

    /* Disables autoplay for all carousels  */

    $('.carousel').carousel({
       interval: false
    });

    /* Toggles the bg color and button text for tab slide out pannels */

    $('.canon-collapse').on('hidden.bs.collapse', function (e) {
        $(this).closest('.bg-toggler').removeClass('cbg-light-gray-1');
    });

    $('.canon-collapse').on('show.bs.collapse', function (e) {
        $(this).closest('.bg-toggler').addClass('cbg-light-gray-1');
    });

    $('.viewLess').click(function () {
        var a = $(this).html();
        a = a.replace(/\s+/g, '').toLowerCase();
        a == 'select' ? $(this).html('close') : $(this).html('select');
    });

    $('.canon-accordion .panel-title a').click(function () {


        if ($(this).closest('.collapse').hasClass('.in')) {
            $(this).children('.glyphicon').toggleClass('glyphicon-plus glyphicon-minus');
        }
    });
    /* Toggles the bg color and button text for tab slide out pannels  END*/

    /* Related / Learning Content && Recommended Accessories Carousel */

    $('.carousel[data-type="multi"] .item').each(function () {
        var next = $(this).next();
        if (!next.length) {
            next = $(this).siblings(':first');
        }
        next.children(':first-child').clone().appendTo($(this));

        for (var i = 0; i < 2; i++) {
            next = next.next();
            if (!next.length) {
                next = $(this).siblings(':first');
            }

            next.children(':first-child').clone().appendTo($(this));
        }
    });

    $('.carousel[data-type="multi-eight"] .item').each(function () {
        var next = $(this).next();
        if (!next.length) {
            next = $(this).siblings(':first');
        }
        next.children(':first-child').clone().appendTo($(this));

        for (var i = 0; i < 6; i++) {
            next = next.next();
            if (!next.length) {
                next = $(this).siblings(':first');
            }

            next.children(':first-child').clone().appendTo($(this));
        }
    });
	 
  /* Related / Learning Content && Recommended Accessories Carousel */

    /* 	Disables autoplay for all carousels  */

    $('.checkAgree').click(function () {
        $(this).closest('.row').find('.cbtn').toggleClass('cbtn-dark-gray-1  cbtn-canon-red');
    });

    /* Product Carousel - not carousel handing the product thumbs */

    // handles the carousel thumbnails
    $('[id^=carousel-selector-]').click(function (e) {
    	e.preventDefault();
        var id_selector = $(this).attr("id");
        var id = id_selector.substr(id_selector.length - 1);
        id = parseInt(id);
        $('#ProductCarousel').carousel(id);
        $('[id^=carousel-selector-]').removeClass('selected');
        $(this).addClass('selected');
    });

    // when the carousel slides, auto update
    $('#ProductCarousel').on('slid', function (e) {
        var id = $('.item.active').data('slide-number');
        id = parseInt(id);
        $('[id^=carousel-selector-]').removeClass('selected');
        $('[id=carousel-selector-' + id + ']').addClass('selected');
    });
    /* Product Carousel */


    /* Select Picker class */
    $('.selectpicker').selectpicker();
    /* Select Picker class*/


    /* Support for tabs to display 4-12 tabs */

    var tabID = "SupportTabs";
    var tabTtl = $('ul#' + tabID + ' li').length;
    var colWidth = "";
	
	//console.log(tabTtl%4);
	
    switch (tabTtl % 4) {
	    case 0:
	        colWidth = "col-xs-6 col-sm-3";
	        break;
	
	    case 1:
	    	if (tabTtl == 1) {
				$('ul#' + tabID).addClass('hidden');
	        }
	        else if (tabTtl == 9) {
				colWidth = "col-xs-6 col-sm-4";
	        }
	
	        else {
	        	colWidth = "col-xs-6";
	        	$('ul#' + tabID).addClass('cf-offset-col-10');
			}
	        break;
	
	    case 2:
	        if (tabTtl == 6) {
	            colWidth = "col-xs-6 col-sm-4";
	
	        }
	        else if(tabTtl == 2) {
	       	 	colWidth = "col-xs-6";
	        }
	        else {
	            colWidth = "col-xs-6 ";
	            $('ul#' + tabID).addClass('cf-offset-col-10');
	        }
	        break;
		 
		case 3:
			colWidth = "col-xs-6 col-sm-4";	
			break; 
		 
	    default:
	        colWidth = "col-xs-6 col-sm-3";
	        break;
	 }

    $('ul#' + tabID + ' li').addClass(colWidth);
    $('ul#' + tabID + ' li:first').addClass("active");

    /* Support for tabs to display 4-12 tabs */

    /* Alex's form work, date picker */

    $('[data-toggle="popover"]').popover();
	$('[data-toggle="serialnumber"]').click(function () {
	    $('#SerialNumberInstructions').slideToggle();
	});
    $('.selectpicker').selectpicker();
    $('.form-group .input-group.date').datepicker({
        autoclose: true,
        todayHighlight: true,
        endDate: "0d",
        startDate: "-10y"
        
    });
    /* Alex's form work, date picker END*/

    /* Alex - 2/20/2015 */
    /* Misc 6 - Dropdown selection (Home & Global) */
    $('.selectpicker-btn').click(function () {
        var original_index = $(this).closest('.selectpicker-container').find('ul.dropdown-menu.inner.selectpicker li.selected').attr('data-original-index');
        var url = $(this).closest('.selectpicker-container').find('.selectpicker option').eq(original_index).val();
        if (url) window.open(url, '_blank');
    });

    /* Display Slide Number */
    $('.text-carousel').on('slid.bs.carousel', function () {
        var carouselData = $(this).data('bs.carousel');
        var currentIndex = carouselData.getItemIndex(carouselData.$element.find('.item.active'));
        var totalSlides = carouselData.$items.length;

        var text = "Closest Location ( " + (currentIndex + 1) + " of " + totalSlides + " )";

        $('.carousel-copy p').text(text);
        
         //var address = carouselData.$element.find('.item.active').attr('data-address');
         CreateMarkers();
         
    });

    $('.location-block').click(function () {
        $(this).find('.location-checked').toggleClass('hidden');
    });

    /* 	rotate icon */
    $('.rotateClick').click(function () {
        $(this).children('.cbtn').toggleClass('fa-angle-down fa-angle-up');
    });

        $.fn.toggleIt = function () {
            return this.each(function () {
                var target = $(this).data('toggle-target');
                $(this).click(function (e) {
                    toggleTarget(this, target);
                });
            });
        };

        function toggleTarget(trigger, target) {
        
	        $(window).on('resize', function(){
	            if ($(window).width() < 745) {
	                $(target).detach().appendTo($(trigger).parent('li'));
	            } else {
	                $(target).detach().appendTo($('.site-header'));
	            }
  			});
        
            if ($(window).width() < 745) {
                $(target).detach().appendTo($(trigger).parent('li'));
            } else {
                $(target).detach().appendTo($('.site-header'));
            }
                        
            
            if ($(target).is(':visible') && !$(trigger).parent('li').hasClass('active')) {
                return false;
            } else {
                $(target).stop(true, true).fadeToggle(300);
                $(trigger).parents('.navbar-left').toggleClass('active-child');
            }
        }
        
    $('.toggleize').toggleIt();

    // refactor this
    
    $('html').click(function (e) {
    
       	var carouselData = ($(e.target).attr('data-slide-to'));
       	
		if (!(carouselData === undefined)) {
			console.log(carouselData);	        
		}
        
        
        if (
        	$(e.target).hasClass('carousel-control') ||
			(!(carouselData === undefined))
           )
        {
        	//hack to prevent carousel from breaking the mega menu
        }
        else if ($('.megamenu').is(':visible') && 
            	!$(e.target).hasClass('toggleize') && 
            	$(e.target).parents('.megamenu').length <= 0 ) 
            	{
	           	     $('.navbar-left').removeClass('active-child');
	                $('.megamenu').fadeOut(300);
				}
    });

    $('*[data-action="toggletarget"]').on('click', function (e) {
        e.preventDefault();
        var target = $(this).attr('href');
        $(target).toggle();
        $(this).attr('aria-expanded', $(this).attr('aria-expanded') === 'true' ? 'false' : 'true');
    });

    $('.category-list li').on('click', function () {
        if ($(window).width() < 768) {
            $(this).parents('.megamenu-section').css('left', '-100%');
            $(this).attr('aria-expanded', 'false');
        }
    });

    $('.menu-tab-right header').on('click', function () {
        var target = $(this).parents('.subcategory-list-wrapper').prop('id');
        $('a[href="#' + target + '"]').attr('aria-expanded', 'false');
        $(this).parents('.megamenu-section').css('left', '0');
    });

    $('.search-dropdown a').on('click', function () {
        $('#seach-area').val($(this).text());
        $(this).parents('.search-dropdown').hide();
    });

	/* Contact Support duplicate email fields */

    //Contact Support Phone Number Area 03-05-2015
    $('.product-group').click(function () {
        $("#contact-support-message").html($(this).attr("data-msg"));
        $('#ProductGroups').collapse('hide');

    });
            
    //Expand All Accordion function 03-11-2015
    $('.expand-all').click(function (e) {
    	e.preventDefault();
    	
    	var a = $(this).html();
        a = a.replace(/\s+/g, '').toLowerCase();
        a == 'expandall' ? $(this).html('Collapse All') : $(this).html('Expand All');
       
		if (a == 'expandall'){
			$(this).closest('.canon-accordion').find('.panel-collapse').addClass('in').attr("style", "");			
			$(this).closest('.canon-accordion').find('.panel-collapse').attr("aria-expanded","true");
			$(this).closest('.canon-accordion').find('h4 a').removeClass('collapsed').attr("aria-expanded","true");
			//$("button").attr("aria-expanded","true");
		}
		
		else if (a == 'collapseall'){
			$(this).closest('.canon-accordion').find('.collapse').removeClass('in');
			$(this).closest('.canon-accordion').find('h4 a').addClass('collapsed').attr("aria-expanded","false");
		}		
		
    });
  /*                  
    $('.canon-accordion').on('hide.bs.collapse', function () {
		$(this).closest('.canon-accordion').find('.expand-all').html('Expand All');
		
		//$(this).closest('.canon-accordion').find('.collapse').removeClass('in');
			$(this).closest('.canon-accordion').find('.collapse').removeClass('in');
			$(this).closest('.canon-accordion').find('h4 a').addClass('collapsed').attr("aria-expanded","false");
 
  	});      
	*/
    
    // Ribbon Group/Category Dropdown
    $('.ui-dropdown').click(function() {
        $(this).parent('div').find('.group-dropdown').slideToggle();
    });
    


    // 2-1-26 Product Selector Ribbon - Three //
    //On load, hide all multi-products ribbon's tabs except the first one.
    $('.multi-products').each(function() {
        $('.multi-products section:not(:first-child)').hide();
    });

    //Show selected product and highlight its button
    $('.multi-products li').click(function() {
        var selectedRibbon = $(this).closest('div');
        if (selectedRibbon.length) {
            var selectedRibbonItem = $(this).attr('data-section');
            if (selectedRibbonItem.length) {
                $(selectedRibbon).find('li').removeClass('active');
                $(selectedRibbon).find('li[data-section]:eq('+selectedRibbonItem+')').addClass('active');
                $(selectedRibbon).find('section').hide();
                $(selectedRibbon).find('section:eq('+selectedRibbonItem+')').fadeIn();
            }
        }
    });

    //2-1-41 four-picture-left-justified-height
    $('.four-picture-left-justified-height').height($('.four-picture-left-justified-img-container').height());

	//scroll to top
    $('.scroll-to-top').click(function(e) {
    	e.preventDefault();
    	$('html,body').animate({scrollTop:0},'slow');
    	return false;
    });  
	if ( ($(window).height() + 100) < $(document).height() ) {
	    $('.scroll-to-top').removeClass('hidden');
	}     
	/* Grid View List View Swap 03-16-2015 */ 
	$('.list-view').click(function(e) {
    	e.preventDefault();
    	$('.grid-layout').addClass('list-layout');
    	
    	$('.product-listing').removeClass('col-sm-6 col-md-3');
    	$('.product-info').addClass('col-sm-7');

    	$('.product-rating, .product-price, .product-buttons').addClass('col-md-4');
    	$('.product-list-image').addClass('col-sm-4 col-md-2');
    	$('.product-info-title').addClass('col-sm-7  col-md-3');

    	$('.list-view').addClass('cf-canon-red');
    	$('.grid-view').removeClass('cf-canon-red');
    	
    	
    });
    $('.grid-view').click(function(e) {
    	e.preventDefault();
    	$('.grid-layout').removeClass('list-layout');

    	$('.product-listing').addClass('col-sm-6 col-md-3');
    	$('.product-info').removeClass('col-sm-7');

    	$('.product-rating, .product-price, .product-buttons').removeClass('col-md-4');
    	$('.product-list-image').removeClass('col-sm-4 col-md-2');
    	$('.product-info-title').removeClass('col-sm-7  col-md-3');
    	

    	
    	$('.list-view').removeClass('cf-canon-red');
    	$('.grid-view').addClass('cf-canon-red');
    	
    }); 	
			    
    //Google Map API 3
    if (typeof google === 'object' && typeof google.maps === 'object') {
		var map;
		var geocoder; 
			geocoder = new google.maps.Geocoder();
		//var address = '1 Canon Park Melville, NY';
		var isShowPin = true;
		
		function GoogleMapInit() {
		  //  var latLng = new google.maps.LatLng(41.659, -4.714);
		  //  var infowindow = new google.maps.InfoWindow();
		    var myOptions;
		    
		    if (isShowPin) {
		        myOptions = {
		            scrollwheel: false,
		            zoom: 10,
		            mapTypeId: google.maps.MapTypeId.ROADMAP
		        };
		    }
		    else {
		        myOptions = {
		            scrollwheel: false,
		            zoom: 18,
		            streetViewControl: false,
		            mapTypeId: google.maps.MapTypeId.ROADMAP
		        };
		    }
		    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
		}
		
		function ShowPins(address, icon, slideIndex) {
			var image;
			//var activeAnimation;
			icon == 'active' ? image = 'images/canon-pointer.png' : image = '';
			     
		   // var infowindow = new google.maps.InfoWindow(); 
		    
		    //var marker, i, center, pos;
		    var marker;
		    
		    if (icon == "active"){      
			    geocoder.geocode({ 'address': address }, function (results, status) {
			        if (status == google.maps.GeocoderStatus.OK) {
			            map.setCenter(results[0].geometry.location);
			                marker = new google.maps.Marker({
			                    map: map,
			                    icon: image,
			                    position: results[0].geometry.location,
			                    labelAnchor: new google.maps.Point(22, 0),
			                    //zIndex:3,
			                    animation: google.maps.Animation.DROP
			                    
			                });
			                
				                
							  google.maps.event.addListener(marker, 'click', function() { 				       
						       	goToSlide('#serviceLocations',Number(slideIndex));
							  }); 
			        }
			    }); 
			 }
			 else{
			    geocoder.geocode({ 'address': address }, function (results, status) {
			        if (status == google.maps.GeocoderStatus.OK) {

			                marker = new google.maps.Marker({
			                    map: map,
			                    icon: image,
			                    position: results[0].geometry.location
			                   // ZIndex:1
			                });
				                
						  google.maps.event.addListener(marker, 'click', function() { 				       
					       	goToSlide('#serviceLocations',Number(slideIndex));
						  }); 
			        }
			    }); 
			 }
				                
			 
		}
			
	function CreateMarkers(){
		  var carouselData = $('.googleMapController');
		  //var a =carouselData.data('bs.carousel');		  
		 // var address 	 = carouselData.find('.item.active').attr('data-address');
		  
		  GoogleMapInit();
		  $.each( carouselData.find('.item'), function(){
		  	  
		  	  	var a = $(this).attr('data-address-string');   //street address
				var b = $(this).attr('data-city'); 			   //city, state, zip
				var c = $(this).attr('data-address'); 		   //GPS coords from iNet - not working at the moment.
				var d = a+b;								   	
				
				//if we fix info from iNet we'll switch the d to c and use GPS instead of Postal Address.
		  	  
			  if ($(this).hasClass('active')){
				 ShowPins( d, 'active', $(this).attr('data-index'));
				  
			  }else{
				 ShowPins( d,"", $(this).attr('data-index')); 
			  }

			  			  
		  });
		
		  google.maps.event.trigger(map, 'resize');	
		}
		
		$('a[data-toggle="tab"].mapTab').on('shown.bs.tab', function (e) {
		  CreateMarkers();
		});
   }

   //https://github.com/ablanco/jquery.pwstrength.bootstrap         
	if(jQuery().pwstrength) {

		var options = {};
	    options.common = {
	        minChar: 0
	    };

	    options.rules = {
	        activated: {
	           wordUppercase: true,
			   wordOneNumber: true,
			   wordOneSpecialChar: true,
			   wordSequences: false,
	        },

	        scores:{
		         wordLowercase: 4,
	        }
	    };

	    options.ui = {
	        showVerdictsInsideProgressBar: true,
	        //showErrors:true,

	        errorMessages:{
			  wordLength: "Passwords must be at least "+options.common.minChar+" characters"
			}
	    };

		
	     $(':password').not('.no-pwstrength').pwstrength(options);
  	}  
	
	
    $(".next-ribbon").click(function(){
        $('html, body').animate({
            scrollTop: $(this).parents('.ribbon').next('.ribbon').offset().top
        }, 1000);
    });
    
    function goToSlide(object, slide) {
		$(object).carousel(slide);
	}
	
	/* Contents of compare-products.js */
	$(".cta-add-product").click(function() {
		var formid = $(this).data("target");
		$(this).toggle();
		$(formid).toggleClass('hidden show');
	});    
    
    // //////////// 4-7-1 File Input to upload an image START ////////////
    //http://www.abeautifulsite.net/whipping-file-inputs-into-shape-with-bootstrap-3/
    $(document).on('change', '.btn-file :file', function() {
      var input = $(this),
          numFiles = input.get(0).files ? input.get(0).files.length : 1,
          label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
      input.trigger('fileselect', [numFiles, label]);
    });
    $(document).ready( function() {
        $('.btn-file :file').on('fileselect', function(event, numFiles, label) {

            var input = $(this).parents('.input-group').find(':text'),
                log = numFiles > 1 ? numFiles + ' files selected' : label;

            if( input.length ) {
                input.val(log);
            } else {
                if( log ) alert(log);
            }

        });
    });
    // //////////// 4-7-1 File Input to upload an image END ////////////
    
    
    //4-2-5-2 Search Results Product Sub Categories
    $('.showall').click(function() {
        $('.collapse').collapse('show');
        $('.hideall').show();
        $(this).hide();
    });
    $('.hideall').click(function() {
        $('.collapse.in').collapse('hide');
        $('.showall').show();
        $(this).hide();
    });
    
//    $('.panel-heading').click(function () {
//
//        $(this).find('a').toggleClass('collapsed');
//
//        if ($(this).find('a').hasClass('collapsed')) { 
//        //console.log('have classes collapsed'); 
//        $('.expand-all').html("Expand All"); }
//        else { 
//        //console.log('there are class(es) expanded'); 
//        $('.expand-all').html("Collapse All"); }
//    });
    
    function checkAccordionStatus(t) {
        
    	var $group = $(t).closest('.panel-group');
    	    
    	var allExpanded = false;
    	    if ($group.find('.collapsed').length == 0) allExpanded = true;
    	    if (!allExpanded) {
    	   
    	$group.find('.expand-all').html("Expand All");
    	    } else {
    	   
    	$group.find('.expand-all').html("Collapse All");
    	    }
    }

    $('.panel-heading').click(function () {
    	var t = this;
    	setTimeout(function() {
    	checkAccordionStatus(t);
    	},200);
    });
    
    
    
    //4-2-6-5 Search Results Product Sub Categories
    function openFeedBackResult(feedback_option) {
        $(".feedback-result").each(function(){
            if($(this).data('feedback') == feedback_option)
                $(this).removeClass("closed").addClass("open");
        });
    }
    function closeFeedBackResult() {
        $(".feedback-result").removeClass("open").addClass("closed");
    }

    $(".feedback input[name='inlineRadioOptions']").on('click', function(e) {
        closeFeedBackResult();
        openFeedBackResult($(this).val());
    });
    
	$(function() {
	  $('*[data-toggle=slideLeft]').on('click', function(e) {
	    e.preventDefault();
	    var target = $(this).attr('href');
	    $(target).addClass('collapsed');
	  });
	
	  $('#product-listing-filter h3').on('click', function() {
	    var trigger = $('#product-listing-filter #product-listing-filter-state');
	    if(trigger.hasClass('collapsed')) {
	      trigger.removeClass('collapsed');
	    }
	  });
	
	});    


    /* Filter / Sort Controls */
    $('.filter-ctrls a, .sort-options-list a').on('click', function(evt) {
      evt.preventDefault();
      var a1 = $(this).html();
      a1 = a1.replace(/\s+/g, '').toLowerCase();
      a1 = a1.substr(0, a1.indexOf('<')); 

      desktopSort(a1);
      mobileSort(a1);
   
    });
	function desktopSort(a1){
	  $('.filter-ctrls a').each(
      	function(){ 
         	var a = $(this).html();
		    a = a.replace(/\s+/g, '').toLowerCase();
		    a = a.substr(0, a.indexOf('<')); 
			if (a == a1){
			      $(this).addClass('active-sort');
				  $(this).children('i').removeClass('fa-angle-down').addClass('fa-angle-up');
		    }
		    else{
      			$(this).removeClass('active-sort');
	  			$(this).children('i').addClass('fa-angle-down').removeClass('fa-angle-up');
	  		}	
	  	}
      );	
	}
	function mobileSort(a1){
      $('.sort-options-list a').each(
      function(){
	      var a = $(this).html();
	      a = a.replace(/\s+/g, '').toLowerCase();
	      a = a.substr(0, a.indexOf('<')); 
	      if (a == a1){
	      
	      	$(this).addClass('active active-sort');
	      	currentSort(a);
	      }
	      else{
	      	$(this).removeClass('active active-sort');
	      }
	      $('.sort-options-list').addClass('closed').removeClass('open');
      }); 	
	}
	function currentSort(value){
		var currentSort;
		switch(value){
			case 'mostrelevant' :
				currentSort = 'Most Relevant';
			break;
			default: 
				currentSort = value;
		}
		$('.current-sort').html(currentSort);
	}

	$('.page-selektor > a').on('click', function(evt) {
	  evt.preventDefault();
	  $('.page-selektor-drop').slideDown();
	});

	$('.page-selektor-drop').on('click', function() {
	  $(this).slideUp();
	});

    var $sort_dropdown_list = $(".mobile-product-sort-options .sort-options-list");

    function openSortDropdown() {
        $sort_dropdown_list.removeClass("closed").addClass("open");
    }
    function closeSortDropdown() {
        $sort_dropdown_list.removeClass("open").addClass("closed");
    }

    $(".js-mobile-sort-dropdown").on('click', function(e) {
        e.preventDefault();
        if($sort_dropdown_list.hasClass("closed"))
            openSortDropdown();
        else
            closeSortDropdown();
    });
    
    
	//Alex 03/23/15
    //Supplies / Accessories Finder Start
        //Get querystring value
        function getParameterByName(name) {
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                results = regex.exec(location.search);
            return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        }
        
        //Set button label based on querystring value
        function getLabel (name) {
            switch(name) {
                case "suppliesByProductType":
                    $('.sf-continue').html('Get Supplies by Product Type');
                    break;
                case "suppliesByAccessoryType":
                    $('.sf-continue').html('Get Supplies by Accessory Type');
                    break;
                default:
                    $('.sf-continue').html('Get Supplies by Product Type');
                    break;
            }
        }
        
        var selectedTab = "";
                
        //Activate tab on init
        //$("#" + selectedTab).addClass('active').addClass('c-gradient');
        //$("#selectedTab").val(selectedTab);
        
        //Activate tab based on querystring value
        selectedTab = getParameterByName('tab');
        getLabel(selectedTab);
        //$("#suppliesByProductType").addClass('active').addClass('c-gradient');
        $("#selectedTab").val("suppliesByProductType");
        
        //Activate tab based on user selection
        $('.c-support-tab').click(function() {
            $('.c-support-tab').removeClass("active").removeClass("c-gradient");
            $(this).addClass("active").addClass("c-gradient");
            selectedTab = $(this).attr('id');
            getLabel(selectedTab);
            $("#selectedTab").val($(this).attr('id'));
        });
        

    //Supplies / Accessories Finder end
        
    // Product Advisory Detail - Contact Info
    $('.selectpicker').on('change', function(){
        var original_index = $(this).closest('.selectpicker-container').find('ul.dropdown-menu.inner.selectpicker li.selected').attr('data-original-index');
        $('.product-advisories-detail #Contact div.contact-container').hide().eq(original_index).show();
    });

    
    // Support How-to Library       
    $('.video-list, .video-sidebar').each(function() {
        $("#"+ $(this).attr('data-init-target') ).attr('src', $(this).attr('data-init-src'));
    });
    $('.video-item').click(function() {
        $("#"+ $(this).attr('data-target') ).attr('src', $(this).attr('data-src'));
    });

    
    //JS for MISC-3b-General-NAV template
    $('.global-misc-3b-general-nav.internal-nav .selectpicker').change(function () {
        var val = $(this).closest('.selectpicker-container').find('ul.dropdown-menu.inner.selectpicker li.selected').attr('data-original-index') - 1;
        $('html, body').animate({
            scrollTop: $('.internal-nav-section').eq(val).offset().top
        }, 500);
    });

    //JS for MISC-3c-General-Accordion-NAV template
    $('.global-misc-3b-general-nav-accordion.internal-nav .selectpicker').change(function () {
        var val = $(this).closest('.selectpicker-container').find('ul.dropdown-menu.inner.selectpicker li.selected').attr('data-original-index') - 1;
        $('.internal-nav .panel-collapse.collapse.in').collapse('hide');
        $('.internal-nav .panel-collapse').eq(val).collapse('show');
        $('html, body').animate({
            scrollTop: $('.internal-nav .panel-collapse').eq(val).offset().top
        }, 500);
    });
    
    // MISC 5 Download
    $("#chkAgree").attr("checked",false);
    $('button.download').removeClass('active').attr("disabled",true);
    $("#chkAgree").click(function() {
        var checked_status = this.checked;
        if (checked_status == true) {
           $(this).parents().find('button.download').addClass('active').attr("disabled",false);
        } else {
           $(this).parents().find('button.download').removeClass('active').attr("disabled",true);
        }
    });
        
    function twoBoxDoubleTransparentOverlay(){
	    $('.two-box-double-transparent-overlay').each(function(){
		    
		    var left  = $(this).find('.left-content');
		    var right = $(this).find('.right-content');
		    
		    left.css('height','auto');
		    right.css('height','auto');
		    
		    var a = parseInt(left.css('height').replace(/\D/g,''));
		    var b = parseInt(right.css('height').replace(/\D/g,''));
		    		    
		    a > b ? c = a : c = b;
		    		    
		    left.css('height',c);
		    right.css('height',c);
	    
		});
	}
    
    twoBoxDoubleTransparentOverlay();
    window.onresize = function(event) {
    	twoBoxDoubleTransparentOverlay();
    };

    
	//
	// START
	//
	// Addendum 101 Product Registration Page
	// AD-101-Register-Product.html
	//
    //Add Multiple Serial NUmbers and Show Serial Number Instructions
    $('#find_serial_number').on('change', function(){
        var serial_number_instruction = $(this).closest('.selectpicker-container-regular').find('ul.dropdown-menu.inner.selectpicker li.selected').attr('data-original-index');
        if (serial_number_instruction > 0)
            $(this).parent().find('.serial-number-instructions').slideDown();
        else
            $(this).parent().find('.serial-number-instructions').slideUp();
    });
    $('.serialLocationHolder .glyphicon-remove').click(function() {
        $(this).parents().closest('.serial-number-instructions').slideUp();
        $('#find_serial_number').val(0);
        $('#find_serial_number').selectpicker('refresh');
        $('#find_serial_number').selectpicker('render');
        
    });
         
        //
        // Show/Hide info based on user input (personal vs business, online vs in-store
        //
        
        //After a product is identified using the Product Finder, show Product Registration blocks
        $('#select-product').click(function() {
            
            //Close product finder -- DEV: remove this code block after removing the test button
            $('.pf-open span').toggleClass('pf-open-on pf-open-off');
            $('.pf-all-selectors').fadeOut();
            
            //Show product registration form blocks
            $('.product-identified').fadeIn();
        });
        
        //After showing Product Registration blocks, determine Product Use.
        //Based on Product Use, we show Place of Purchase blocks and make Business related fields REQUIRED.
        
        $('input[name=product_use]').change(function() {
       // var product_use = "";
            var radioCheckValue = $(this).val();
            if (radioCheckValue == 'Business') {
            //    product_use = "Business";
                $('.product-use').addClass("required");
                $('.contact-business').slideDown();
                
            } else {
            //    product_use = "Personal";
                $('.product-use').removeClass("required");
                $('.contact-business').slideUp();
            }
            $('.place-of-purchase-block').slideDown();
        });
        
        //Show Place of Purchase fields beased on user selection (Online / InStore)
        $('input[name=purchase_location]').change(function() {
            $('.purchase-location').slideDown();
            var radioCheckValue = $(this).val();
            if (radioCheckValue == 'Online') {
                $('.online').show();
                $('.in-store').hide();
            } else {
                $('.online').hide();
                $('.in-store').show();
            }
            //Show contact info
            $('.contact-info').slideDown();
        });
        
	//
	// END
	//
	// Addendum 101 Product Registration Page
	// AD-101-Register-Product.html
	//
    
    
	/* Adendum JS 04-16-2015 by Alex */
	
	// Routing Contact Us Blocks
	// Show General Info / Product Specific Blocks based on User Selection
	
	$('input[name=specific_product]').change(function() {
	
	//Hide any previouslt opened pane and reset selectpickers
	$('.contact-email-form').hide();
	$('.contact-options, .route-block').slideUp();
	$('#contact-purpose, #contact-nature, #product_purpose').selectpicker('refresh');
	$('#contact-purpose, #contact-nature, #product_purpose').selectpicker('render');
	$('#contact-purpose, #contact-nature, #product_purpose').val(0);
	
	var radioCheckValue = $(this).val();
	
	$('.specific-product-no,.specific-product-yes').slideUp();
	
	if (radioCheckValue == 'y')
	    $('.specific-product-yes').slideDown();
	else
	    $('.specific-product-no').slideDown();
	
	});
	
	// Show Email Canon Form when user clicks #email_canon
	$('#email_canon').click(function() {
	$('.email-specific-product-no').slideToggle();
	$('html, body').animate({
		    scrollTop: $('.email-specific-product-no').offset().top
		}, 500);
	
	});
	
	//Show Serial Number Instructions
	
	$('#find_serial_number').on('change', function(){
	
		var serial_number_instruction = $(this).closest('.selectpicker-container-regular').find('ul.dropdown-menu.inner.selectpicker li.selected').attr('data-original-index');
		
		if (serial_number_instruction > 0)
		
		    $(this).parent().find('.serial-number-instructions').slideDown();
		
		else
		
		    $(this).parent().find('.serial-number-instructions').slideUp();
	
	});
	    
	    
	//Hide Carousel Controls & Indicators when there is one slider only
	if ($( ".carousel-inner .item" ).length <= 1) {
	    $('.carousel-control, .carousel-indicators').hide();
	}
	
	//Credit Card Type Bootstrap Button Group
	$(".creditcardtype .btn-group button").click(function () {
	    $(".creditcardtype .btn-group button").removeClass('selected');
	    $(this).addClass('selected');
	    $(".creditcardtype #creditcardtype").val( $(this).attr("data-card-type") );    
	});
	   
///////////////////////////////////////////////////////
	// 04-17-2015 creating browser info object done by Ryan
	// 05-20-2015 modified to support mobile devices, 
	// added actual action to show modals
	// 06-13-2015 switched some of the if statements around
	// as IE was screwing things up
	///////////////////////////////////////////////////////
	   
	var nVer = navigator.appVersion;
	var nAgt = navigator.userAgent.toLowerCase();
	var browserName  = navigator.appName;
	var platform = navigator.platform;
	var fullVersion  = ''+parseFloat(navigator.appVersion); 
	var majorVersion = parseInt(navigator.appVersion,10);
	var OSName="Unknown OS";
	var nameOffset,verOffset,ix,osBit;
	
	navigator.userAgent.indexOf("WOW64") != -1 ? osBit= '64' : osBit = '32';
	
	if (nVer.indexOf("Win")!=-1) OSName="Windows";
	if (nVer.indexOf("Mac")!=-1) OSName="MacOS";
	if (nVer.indexOf("X11")!=-1) OSName="UNIX";
	if (nVer.indexOf("Linux")!=-1) OSName="Linux";
	
	if (nAgt.indexOf("android")!=-1) OSName="Android";
	if (nAgt.indexOf("windows phone")!=-1) OSName="Windows Phone";
	
	if ((verOffset=nAgt.indexOf("opera"))!=-1) {
	 browserName = "Opera";
	 fullVersion = nAgt.substring(verOffset+6);
	 if ((verOffset=nAgt.indexOf("version"))!=-1) 
	   fullVersion = nAgt.substring(verOffset+8);
	}	else if ((verOffset=nAgt.indexOf("chrome"))!=-1) {
	 browserName = "Chrome";
	 fullVersion = nAgt.substring(verOffset+7);
	}
	else if ((verOffset=nAgt.indexOf("safari"))!=-1) {
	 browserName = "Safari";
	 fullVersion = nAgt.substring(verOffset+7);
	 if ((verOffset=nAgt.indexOf("version"))!=-1) 
	   fullVersion = nAgt.substring(verOffset+8);
	}
	else if ((verOffset=nAgt.indexOf("firefox"))!=-1) {
	 browserName = "Firefox";
	 fullVersion = nAgt.substring(verOffset+8);
	}
	else if ( ((verOffset=nAgt.indexOf("msie"))!=-1 ) ) {
	 browserName = "Microsoft Internet Explorer";
	 fullVersion = nAgt.substring(verOffset+5);
	
	}
	else if ( ((verOffset=nAgt.indexOf("windows nt"))!=-1 )  ) {
	 	browserName = "Microsoft Internet Explorer"; 
		verNumStart= nAgt.indexOf('rv:');
		verNum = nAgt.substring(verNumStart);
		verNum = verNum.substring(3,5);
		fullVersion = verNum;	
	}

	else if ( (nameOffset=nAgt.lastIndexOf(' ')+1) < 
	          (verOffset=nAgt.lastIndexOf('/')) ) 
	{
	 browserName = nAgt.substring(nameOffset,verOffset);
	 fullVersion = nAgt.substring(verOffset+1);
	 if (browserName.toLowerCase()==browserName.toUpperCase()) {
	  browserName = navigator.appName;
	 }
	}
	if ((ix=fullVersion.indexOf(";"))!=-1)
	   fullVersion=fullVersion.substring(0,ix);
	if ((ix=fullVersion.indexOf(" "))!=-1)
	   fullVersion=fullVersion.substring(0,ix);
	
	majorVersion = parseInt(''+fullVersion,10);
	if (isNaN(majorVersion)) {
	 fullVersion  = ''+parseFloat(navigator.appVersion); 
	 majorVersion = parseInt(navigator.appVersion,10);
	}
	
	userInfo = {
		browser: browserName,
		version: majorVersion,
		operatingSystem: OSName,
		operatingSystemVersion : osBit,
		device : platform
	};

	//console.log("userInfo= "+userInfo);
	//console.log("OS and Version= "+_osVersion);
	
	

    desktopPhone();
    
	//Explore Quilt Version 2
	$('.quilt-simple .tile').hover(function() {
	    $(this).find('.tilehover').fadeToggle();
	    $(this).find('h2').toggleClass('category-on');
	});
	    
	// AD 103-1 Cancel-Repair
	$(document).find(".repair-cancelation-confirmation input:checked[type='radio']").addClass('bounce');
	    
	function hideFeedbackIfVisible () {
	    if($('.do-not-wish-to-continue').is(':visible')) {
	        $('.do-not-wish-to-continue').fadeOut();
	    }
	}
	function resetRepairCancelationConfirmation() {
	    $(".repair-cancelation-confirmation input[type='checkbox']").prop('checked', false);
	    $(".repair-cancelation-confirmation input[type='radio']").prop('checked', false);
	    $(".repair-cancelation-confirmation input[type='text']").val('');
	}
	
	$('[data-toggle="cancel-repair"]').click(function() {
	    $(".repair-cancelation-confirmation").fadeIn();
	});
	$('[data-toggle="request-another-repair"]').click(function() {
	    $(".repair-cancelation-confirmation").fadeToggle();
	});
	$('.close-cancel-repair').click(function() {
	    hideFeedbackIfVisible();
	    resetRepairCancelationConfirmation();
	    $(this).parents().find('.repair-cancelation-confirmation').fadeOut();
	});
	    
	$("[name=cancel_repair_response]").click(function() {
	    if ($(this).val() == "YES") {
	        hideFeedbackIfVisible();
	        resetRepairCancelationConfirmation();
	        $(this).parents().find('.repair-cancelation-confirmation').fadeOut();
	    }
	    else {
	        $(this).parents().find('.do-not-wish-to-continue').fadeIn();
	    }
	}); 
	    
	//Credit Card Type Bootstrap Button Group
	$(".creditcardtype .btn-group button").click(function () {
	    $(".creditcardtype .btn-group button").removeClass('selected');
	    $(this).addClass('selected');
	    $(".creditcardtype #creditcardtype").val( $(this).attr("data-card-type") );
	    $(".creditcardtype .btn-group button").each(function(){
	        if ($(this).is(":focus")) {
	            console.log($(this).html());
	        }
	    });
	});
   


	//adjust column widths in three topic ribbon based on how many items used
	var threeTop = "three-topics-image";
	var topTtl = $('.' + threeTop + ' .topic').length;
	
	var colWidth;
	
	switch(topTtl){
		case 1 :
			colWidth = 6;
		break;
		
		case 2 :
			colWidth = 4;
		break;
		
		default: 
			colWidth = 3;
	}

	$('.' + threeTop + ' [class*=col-sm-]').each(function(e){
		var classString = $(this).attr('class'); 
		var classList = classString.split(' ');
		
		for (var i = 0; i < classList.length; i++) {
		    
		    if (classList[i].match(/col-sm-/)){			    
			    a = classList[i];
			    $(this).removeClass(a);
			    a = a.replace(/\d/g,colWidth);
			    $(this).addClass(a);
		    }		    
		}		
	
	});

 
	$('.carousel[data-type="multi-three"] .item').each(function () {
	var next = $(this).next();
	if (!next.length) {
	    next = $(this).siblings(':first');
	}
	next.children(':first-child').clone().appendTo($(this));
	
	for (var i = 0; i < 1; i++) {
	    next = next.next();
	    if (!next.length) {
	        next = $(this).siblings(':first');
	    }
	
	    next.children(':first-child').clone().appendTo($(this));
	}
	});
	  
	//quick function to swap an image for a video  
	function vidSwap(){
		$(this).find('.imagePlaceholder , .videoPlayer').toggleClass("hidden");
		$(this).css('background-image','none');
		$(this).removeClass('img-transparent');
	}    
	 
	$(" .img-video").on("click", vidSwap); 
                   
	//if only 1 item in carousel let's kill the controls and indicators 6-5-15
	$('.carousel').each(function(){
		var slideCount = $(this).find('.item').length;
		if (slideCount === 1 ){
	  		$(this).find(".controls, .carousel-indicators").hide();
	  		$(this).closest(".background-carousel.slider").find("article .abs-bottom").css("padding-bottom","25px");
		}
	});
     
        

	function clone(e){
		var maxIndex = $(this).parents(".clonedInput").attr('data-max');
		var cloneSource = $(this).parents(".clonedInput").attr('data-div');	
		var cloneIndex = $("."+cloneSource+" .clonedInput").length;
		var cloneBlock = "#"+$(this).closest(".clonedArea").attr('id');
	
		e.preventDefault();
	
		if (cloneIndex < maxIndex){
		
		    $(this).parents(".clonedInput").clone()
		        .appendTo("."+cloneSource)
		        .attr("id", "clonedInput" +  cloneIndex)
		        .attr("name", "clonedInput" +  cloneIndex)
		        .find("*")
		        .each(function() {
					         	            	            
		            if (cloneIndex == maxIndex-1){
			            $("."+cloneSource+' .buttonAdd:last').addClass('hidden');
		            }
		        	           
		            $("."+cloneSource+" #clonedInput"+cloneIndex+' .bootstrap-select').remove();
	
		            if (this.type == 'text'){
		        	 	this.innerHTML="";	
		        	 	this.value="";     	 	
		        	 }
		        	 
		        	 $(this).find('.selectpicker').val(0);
		             $(this).find('label.cf-error').hide();
	
		        })
		        .on('click', ' .buttonAdd', clone)
		        .on('click', '.buttonRemove', remove);
		        
		        $('.fa-info-circle').popover();
		        $('.selectpicker').selectpicker();
		        
			    $('.form-group .input-group.date').datepicker({
			        autoclose: true,
			        todayHighlight: true,
			        endDate: "0d",
			        startDate: "-10y"
			       
			        
			    });	 
			    
			    
			    resetIndex(cloneBlock);
			    cloneIndex++;	        
		        
	  }
	 
	}
	function remove(e){
		e.preventDefault();
		var maxIndex = $(this).parents(".clonedInput").attr('data-max');
		var cloneSource = $(this).parents(".clonedInput").attr('data-div');
		var cloneIndex = $("."+cloneSource+" .clonedInput").length;
	
		var cloneBlock = "#"+$(this).closest(".clonedArea").attr('id');
		
		cloneIndex--;
		
	 $(this).parents(".clonedInput").remove();
		$("."+cloneSource+' .buttonAdd').removeClass('hidden');
		
		if (cloneIndex == maxIndex){
		   	$("."+cloneSource+' .addBtn:last').addClass('hidden');
		}
			
		resetIndex(cloneBlock);
			
	}
	
	function resetIndex(cloneBlock){
	
		$(cloneBlock + " .clonedInput").each(function(e){
		
			numberReset(this,e);
						
			$(this).closest('.clonedInput').find('.form-group, .col-sm-pull-3, div, .form-control, label, select, .selectpicker, button').each(function(){
						 
				 numberReset(this,e);
					
			 });
			 
		});
		
	}
	
	function numberReset(obj,e){
		
		for (var i = 0, atts = obj.attributes, n = atts.length, arr = []; i < n; i++){
		    arr.push(atts[i].nodeName);
				    
		    var nodeName = atts[i].nodeName;
		    var nodeValue = atts[i].value;
		    
		    
		    	    
		    if (nodeName == "id" || nodeName=="for" || nodeName=="data-toggle" || nodeName=="data-id" || nodeName=="role" || nodeName == "name" ) 
		       
		    {
		    
				nodeValue = nodeValue.replace(/\d/g, e);
				obj.setAttribute(nodeName,nodeValue);					
	        }
	        
	        
	        
			 if (nodeName == "id" ){
			    console.log(nodeValue);
		    }	
	        
		 }
	
	}
	
	
	$(" .buttonAdd").on("click", clone);
	$(".buttonRemove").on("click", remove);
	
  /*      Think we're not using this anymore. July 09, 2015
   	
	function setCookie(cname, cvalue, exdays) {
	    var d = new Date();
	    d.setTime(d.getTime() + (exdays*24*60*60*1000));
	    var expires = "expires="+d.toUTCString();
	    document.cookie = cname + "=" + cvalue + "; " + expires;
	}
	
	function getCookie(cname){
	    var name = cname + "=";
	    var ca = document.cookie.split(';');
	    for(var i=0; i<ca.length; i++) {
	        var c = ca[i];
	        while (c.charAt(0)==' ') c = c.substring(1);
	        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
	    }
	    return "";
	}
	
	function checkCookie(){
		var cookie = getCookie('browserInfo');
		
		
		//setCookie('browserInfo','',7);
		if (cookie == ""){
			//new user
			setCookie('browserInfo','true',7);
			browserModal();
			
		}else{
			//returning user
		}
		
	}
*/
	
	
	function browserModal(){
		   
		
					/*
		document.getElementById("cow").innerHTML = 
			"INFO: \n"+
					userInfo['device'] +'\n'+
					
					userInfo['browser'] +'\n'+ 
				   userInfo['version'] +'\n'+ 
				   userInfo['operatingSystem'] ;
		*/

		
			
		if (userInfo['browser'].toLowerCase() == 'opera'){
			
		}
		else if (userInfo['operatingSystem'].toLowerCase() == 'android'){
		
			var string = nAgt.toLowerCase();
			var version = string.match(/android\s([0-9\.]*)/);
		
			if (version[1] <=3){
				$('#browserErrorMobile').modal('toggle');
			}
		}
		else if (userInfo['operatingSystem'].toLowerCase() == 'windows phone'){
		
			if (userInfo['version'] <=10){
				$('#browserErrorMobile').modal('toggle');
			}
		}
		
		else if (
			userInfo['device'].toLowerCase() == 'iphone' ||
			userInfo['device'].toLowerCase() == 'ipod' ||
			userInfo['device'].toLowerCase() == 'ipad' ||
			userInfo['device'].toLowerCase() == 'iphone simulator'
			){
		
			if (userInfo['version'] <=7){
				$('#browserErrorMobile').modal('toggle');
			}	
		}
		else if (userInfo['browser'].toLowerCase() == 'chrome'){	
			if (userInfo['version'] <=31){
				$('#browserError').modal('toggle');
			}	
		}
		else if (userInfo['browser'].toLowerCase() == 'safari'){
			if (userInfo['version'] <=7){
				$('#browserError').modal('toggle');
			}
		}
		else if (userInfo['browser'].toLowerCase() == 'firefox'){
			if (userInfo['version'] <=24){
				$('#browserError').modal('toggle');
			}
		else if (userInfo['browser'].toLowerCase() == 'microsoft internet explorer'){
			if (userInfo['version'] < 10){
				$('#browserError').modal('toggle');
			}
		}

			
		}
		else {
			//alert('fail');
		}
		//alert('broswerModal has run');
	}

	//checkCookie();
     
	
	
	
	//Quilt JS - 03-04-2015
	// Added this back in. Did not realize the old was still being used 6/16/2015
	$(document).ready(function() {
	
		var wall = new freewall(".quilt");
		
	    function checkWidth() {
		        var windowSize = $(window).width();
		        
		        var w,h;
		
		        if (windowSize <= 479) {
		            w = 300;
		            h = 150;
		            
		          
		            
		           
		        }
		        else if (windowSize <= 767) {
		            w = 400;
		            h = 200;
		            
		          
		        }
		        else if (windowSize <= 992) {
					w = 400;
		            h = 200;
		            
		           
		        }
		        else if (windowSize <= 1199) {
					w = 340;
		            h = 180;
		       
		        }
		        else if (windowSize <= 1440) {
					w = 360;
		            h = 180;
		            
		       
		        }
		        else if (windowSize <= 1600) {
					w = 450;
		            h = 210;
		            
		           
		        }
		        else if (windowSize <= 1840) {
					w = 500;
		            h = 250;
		            
		          
		        }
		        
		        else if (windowSize >= 1900) {
		            
		            w = 562;
		            h = 281;
		            
		            
		        }
				
				//console.log(h);
		        wall.reset({
					selector: '.patch',
					draggable: false,
					animate: true,
					gutterX: 0,
					gutterY: 0,
					cellW: w,
					cellH: h,
					delay: 0,
					onResize: function() {
						wall.refresh($(window).width() , $(window).height());
					}
				});
		        
		    } //end checkWidth

	    checkWidth();
	    $(window).resize(checkWidth);
	    
	    $(".filter-label").click(function(e) {
				e.preventDefault();
				var filter = $(this).data('filter');
				if (filter) {
					wall.filter(filter);
				} else {
					wall.filter('.default');
				}
			});

			wall.fitWidth();
			wall.filter('.default');		    
	 } );

        
        
    //
    // Cookies Example
    //
	
	
    if(jQuery().Cookies) { 
    	$(this).collapser(collapserOptions);
   
	    if (Cookies.get('browserInfo')) {
	    	
	        // cookie exists
	    } else {
	       // cookie does not exist
	        Cookies.set('browserInfo', { expires: 7 });
	        browserModal();
	    }
    }
        

    //Accessibility plugin, where we have a background image look for the alt tag
    // and add the span sr-only so we can meet that requirement.
    //6-23 updated to avoid conflicts with other inline styles and to support special chars

    $('[class*=ribbonBG]').each(function(e){
    	var bgString = $(this).attr('style');
    	    
    	if (typeof bgString !== typeof undefined && bgString !== false) {
    		
    		var altTag = bgString.split("&&alt=");
    		
    		if (altTag[1]!== undefined){
    			
    			altTag = altTag[1].replace(/~/g, ' ');
    			
    			altTag = altTag.split("\');");
    			altTag = altTag[0].split("\);");
    			
    			altTag = altTag[0].replace('");','');
    			altTag = altTag.replace('"','');
    			
    			
    			//altTag = altTag[0].replace("\);", '');
    			
    			//altTag = altTag.replace(/[^\w\s]/gi, '');
    			
    			
    			
    			$(this).append("<span class='sr-only'>"+altTag+"</span>");
    		}		
    	}		
    		
    });



    
    
    
    

	//ReadMore JS added 05-13-2015
	
	
	/*
	
	$('[class*=read-more-]').each(function(e){
		
		var classString = $(this).attr('class'); 
		var arrClass = classString.split(" ");
		
		   var readMoreVar = "";
		    for(var i=0; i<arrClass.length;i++) {
		        if (/read-more-/g.test(arrClass[i])) {
		            readMoreVar = arrClass[i].replace(/\D/g,'');
		        }
		    }

	    var collapserOptions = {
	        'mode' : 'chars',
	        'speed' : 0,
	        'truncate' : readMoreVar,
	        'effect' : 'fade',
	        'ellipsis' : '...',
	        'showText' : 'read more',
	        'hideText' : ' read less',
	        'controlBtn' : 'readmoreless',
	        'afterShow' : function(){resizeHelp();},
	        'afterHide' : function(){resizeHelp();}	        
	        
	        
	        

	    };           
	    
	    if(jQuery().collapser) { 
	    	$(this).collapser(collapserOptions);
	    }else{
	        console.log("Collapser plugin is not loaded");
	    }
	    
	});

	    
	$('[class*=rm-anchor-]').each(function(e){
	    var classString = $(this).attr('class');
	    var arrClass = classString.split(" ");
	    var readMoreVar = "";
	    for(var i=0; i<arrClass.length;i++) {
	        if (/rm-anchor-/g.test(arrClass[i])) {
	            readMoreVar = arrClass[i].replace(/\D/g,'');
	        }
	    }
	    var collapserOptions = {
	        'mode' : 'chars',
	        'speed' : 0,
	        'truncate' : readMoreVar,
	        'effect' : 'fade',
	        'ellipsis' : '...',
	        'showText' : '',
	        'hideText' : '',
	        'controlBtn' : 'readmoreless'
	                

	    };           
	    if(jQuery().collapser) { 
	        $(this).collapser(collapserOptions);
	    }else{
	        console.log("Collapser plugin is not loaded");
	    }
	});
	
	*/
    
    // Read More disabled globally on 7/13/2015
    // Read More enabled with new class name
    
	
	$('[class*=truncate-text-]').each(function(e){
		
		var classString = $(this).attr('class'); 
		var arrClass = classString.split(" ");
		
		   var readMoreVar = "";
		    for(var i=0; i<arrClass.length;i++) {
		        if (/truncate-text-/g.test(arrClass[i])) {
		            readMoreVar = arrClass[i].replace(/\D/g,'');
		        }
		    }

	    var collapserOptions = {
	        'mode' : 'chars',
	        'speed' : 0,
	        'truncate' : readMoreVar,
	        'effect' : 'fade',
	        'ellipsis' : '...',
	        'showText' : 'read more',
	        'hideText' : '',
	        'controlBtn' : 'readmoreless cf-canon-red',
	        'afterShow' : function(){resizeHelp();},
	        'afterHide' : function(){resizeHelp();}	        
	        
	        
	        

	    };           
	    
	    if(jQuery().collapser) { 
	    	$(this).collapser(collapserOptions);
	    }else{
	        console.log("Collapser plugin is not loaded");
	    }
	    
	});
	
	
    
    
	
    function getMaxHeight (elm) {
        var heights = $(elm).map(function () {
            return $(this).height();
        }).get();
        return heights;
    }

    //if jQuery mobile is loaded we'll do these for carousels
    if($.mobile) { 
 
	    $(".carousel").swiperight(function() {  
			  $(this).carousel('prev');  
	  	}); 
	
		$(".carousel").swipeleft(function() {  
		      $(this).carousel('next');  
		});     
    }
    
    
    
	
    var videoTwoPictureRightJustifiedAbsBottomHeight = Math.max.apply(null, getMaxHeight(".video-two-picture-right-justified.abs-bottom-sm"));
    $(".video-two-picture-right-justified.abs-bottom-sm").height(videoTwoPictureRightJustifiedAbsBottomHeight);
    var videoTwoPictureRightJustifiedRightyHeight = Math.max.apply(null, getMaxHeight(".video-two-picture-right-justified .video-two-picture-right-justified-righty"));
    $(".video-two-picture-right-justified .row.ribbonWrap.cr-height-B").height(-25+videoTwoPictureRightJustifiedRightyHeight);  
    $(".video-two-picture-right-justified > .row > [class*='col-']").height(videoTwoPictureRightJustifiedRightyHeight + videoTwoPictureRightJustifiedAbsBottomHeight);
    
    
    //Set height for clickable background images
    $('.img-transparent').each(function() {
       // $(this).find('span').height($(this).parents('.ribbon').height());
    });

    
    
    //menu change take 2
    var didScroll;
    var lastScrollTop = 0;
    var delta = 5;
    var navbarHeight = $('header').outerHeight();

    $(window).scroll(function(event){
        didScroll = true;
    });

    setInterval(function() {
        if (didScroll) {
            hasScrolled();
            didScroll = false;
        }
    }, 250);

    function hasScrolled() {
        var st = $(this).scrollTop();
        
        // Make sure they scroll more than delta
        if(Math.abs(lastScrollTop - st) <= delta)
            return;
        
        // If they scrolled down and are past the navbar, add class .nav-up.
        // This is necessary so you never see what is "behind" the navbar.
        if (st > lastScrollTop && st > navbarHeight){
            // Scroll Down
            $('header').removeClass('nav-down').addClass('nav-up');
            $('.navbar-left').removeClass('active-child');
            var w = $(document).width();			
			if (w >= 768) $('.megamenu').fadeOut(300);      
        } else {
            // Scroll Up
            if(            		
            		(st + $(window).height() < $(document).height() ) ||            	
            		(st == 0)         
            ) {
                $('header').removeClass('nav-up').addClass('nav-down');
            }
        }
        
        lastScrollTop = st;
    }
   
	$(".alternate-header-feature-module-center .item:first-child ").addClass("active");
	$(".ribbon-responsive-carousel .item:first-child ").addClass("active");
  
    
    $(".quiltC2A, .doNotPropogate, a[class*=read-more-]").click(function(e){
        e.stopPropagation();
    });
  
    
    var dropdowns = [
 	    [".productGroupToggle.collapsed","#ProductGroups"],
 	    [".MyCanonLinksToggle.collapsed","#MyCanonLinks"]
                 ];
                 
	 $('html').on('click', function (e) {
	 	if ($(e.target).data('toggle') !== 'popover'
	 	    && $(e.target).parents('.popover.in').length === 0) { 
	 	    $('[data-toggle="popover"]').popover('hide');
	 	}
	 	
	 	
	 	
	 	
	 	dropdowns.forEach(function(index, dropdown){
	 	   
	 		if ($(e.target).data('toggle') !== 'collapse'
	 		   
	 		&& $(e.target).parents(dropdown[index]).length === 0) {
	 		$(dropdown[index]).removeClass('in');
	 		}
	 		});

	 	
	 	
	 	
//	 	dropdowns.forEach(function(dropdown){
//	    	
//	    	if ($(e.target).data('toggle') !== 'collapse'
//	 	    	&& $(e.target).parents(dropdown[0]).length === 0) {
//	    	     
//				$(dropdown[1]).removeClass('in');
//				
//	 		}
//	    	
//	 	});
	 	
	 	
	 	
	 }); 
                 
    
  

	
	$('input[name="serviceType"]').click(function () {
	    $(this).closest('label').tab('show');
	});

    
    
	  $("button").hover(function(){
	        var title = $(this).attr("title");
	        $(this).attr("tmp_title", title);
	        $(this).attr("title","");
      },

      function() { 
	        var title = $(this).attr("tmp_title");
	        $(this).attr("title", title);
      });
    
 
	  $(".tinkerScript").remove();  //Helper function for Kapish, 9-28-2015
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
    
    
    
    
    
    
    
});// end document ready function


function resizeHelp(){
	//things we need to reset when we hit read more, like heights and such
	
	
	//heightHelper(); // this has not been finished and moved over
	readMoreP();
	didScroll = true; 
	
}    

function readMoreP(){
	//can't change the way WCM people initalize the plugin
	//thus, we need to remove those p tags and replace with span
	// this way we do not change font sizes if we're using a header, for instance
	$('[class*=read-more-] p').replaceWith(function(){
		return '<span class="clearfix">' + $(this).html() + '</span>';
	});
}

$(function() {

    var $allVideos = $("iframe[src^='//player.vimeo.com'], iframe[src^='//www.youtube.com'], object, embed"),
    $fluidEl = $("figure");

	$allVideos.each(function() {

	  $(this)
	    // jQuery .data does not work on object/embed elements
	    .attr('data-aspectRatio', this.height / this.width)
	    .removeAttr('height')
	    .removeAttr('width');

	});

	$(window).resize(function() {

	  var newWidth = $fluidEl.width();
	  $allVideos.each(function() {

	    var $el = $(this);
	    $el
	        .width(newWidth)
	        .height(newWidth * $el.attr('data-aspectRatio'));

	  });

	}).resize();

});
(function ( $ ) {
	"use strict";

	$.fn.konami = function( options ) {
		var opts, controllerCode;

		opts = $.extend({}, $.fn.konami.defaults, options);
		controllerCode = [];

		// note that we use the passed-in options, not the resolved options
		opts.eventProperties = $.extend({}, options,  opts.eventProperties);

		this.keyup(function( evt ) {
			var code = evt.keyCode || evt.which;

			if ( opts.code.length > controllerCode.push( code ) ) {
				return;
			} // end if

			if ( opts.code.length < controllerCode.length ) {
				controllerCode.shift();
			} // end if

			if ( opts.code.toString() !== controllerCode.toString() ) {
				return;
			} // end if

			opts.cheat(evt, opts);

		}); // end keyup

		return this;
	}; // end opts

	$.fn.konami.defaults = {
		code : [38,38,40,40,37,39,37,39,66,65],
		eventName : 'konami',
		eventProperties : null,
		cheat: function(evt, opts) {
			$(evt.target).trigger(opts.eventName, [ opts.eventProperties ]);
		}
	};

}( jQuery ));




(function( $ ) {
	"use strict";

	$(function() {
		$( window ).konami({
			cheat: function() {
				$('.ribbon').toggleClass('ribbon-separate');

			}
		});

	});
}(jQuery));



//18 Aug 2015 - RMH: added this to one-click play, currently only works with Vimeo.
// Invodo will be handled with the Invodo caller, YouTube API is blocked by Canon.

function playVideo(source){
	var vimeo = document.getElementById(source+"_video");
	var player;

	var btn = ('#videoPreview_'+source);
    if(Froogaloop) { player = $f(vimeo);} //Vimeo

    if($('.img-responsive.video-preview').attr("src")) {
    	 $('.img-responsive.video-preview ~ .video-container').addClass('invodoHide');
   }

    $(btn).click(function() {
	    var h = $(this).height();
        $($(this) .find( ' ~ .video-container') ).removeClass('invodoHide').height(h);
        $(this).hide();
        if(Froogaloop) { player.api("play");}//Vimeo
       
    });
}	 

var OsAutoDetector = {
		detect: function() {
			var userAgent = navigator.userAgent;

			var osType = null;
			var osVersion = null;
			for (var i=0, len=OsAutoDetector.OS_VER_REGEX_LIST.length; i<len; i++) {
				var os = OsAutoDetector.OS_VER_REGEX_LIST[i];
				if (userAgent.match(os.regex)) {
					osType = os.type;
					osVersion = os.version;
					break;
				}
			}

			if (osType == "WINDOWS" && osVersion != null &&
			    (navigator.platform == "Win64" || userAgent.indexOf("Win64") != -1 || userAgent.indexOf("WOW64") != -1)) {
				osVersion += "_X64";
			}

			if (osVersion == null) osVersion = "";

			return {version:osVersion};
		}
	};

	OsAutoDetector.OS_VER_REGEX_LIST = [
		 {type:"WINDOWS", version:"WINDOWS_10", regex:/Win(dows )?NT 10\.0/}
		,{type:"WINDOWS", version:"WINDOWS_8_1", regex:/Win(dows )?NT 6\.3/}
		,{type:"WINDOWS", version:"WINDOWS_8", regex:/Win(dows )?NT 6\.2/}
		,{type:"WINDOWS", version:"WINDOWS_7", regex:/Win(dows )?NT 6\.1/}
		,{type:"WINDOWS", version:"WINDOWS_VISTA", regex:/Win(dows )?NT 6\.0/}
		,{type:"WINDOWS", version:"WINDOWS_SERVER_2003", regex:/Win(dows )?NT 5\.2/}
		,{type:"WINDOWS", version:"WINDOWS_XP", regex:/Win(dows )?(NT 5\.1|XP)/}
		,{type:"WINDOWS", version:"WINDOWS_ME", regex:/Win(dows)? (9x 4\.90|ME)/}
		,{type:"WINDOWS", version:"WINDOWS_2000", regex:/Win(dows )?(NT 5\.0|2000)/}
		,{type:"WINDOWS", version:"WINDOWS_98", regex:/Win(dows )?98/}
		,{type:"WINDOWS", version:"WINDOWS_NT", regex:/Win(dows )?NT( 4\.0)?/}
		,{type:"WINDOWS", version:"WINDOWS_95", regex:/Win(dows )?95/}
		,{type:"WINDOWS", version:"WINDOWS_3_1", regex:/Win(dows )?3\.1/}
		,{type:"LINUX", version:"LINUX", regex:/Linux/}
		,{type:"MAC", version:"OS_X_V10_11", regex:/Mac OS X 10(\.|_)11(;|_)?/}
		,{type:"MAC", version:"OS_X_V10_10", regex:/Mac OS X 10(\.|_)10(;|_)?/}
		,{type:"MAC", version:"OS_X_V10_9",  regex:/Mac OS X 10(\.|_)9(;|_)?/}
		,{type:"MAC", version:"MAC_OS_X_V10_8", regex:/Mac OS X 10(\.|_)8(;|_)/}
		,{type:"MAC", version:"MAC_OS_X_V10_7", regex:/Mac OS X 10(\.|_)7(;|_)/}
		,{type:"MAC", version:"MAC_OS_X_V10_6", regex:/Mac OS X 10(\.|_)6(;|_)/}
		,{type:"MAC", version:"MAC_OS_X_V10_5", regex:/Mac OS X 10(\.|_)5(;|_)/}
		,{type:"MAC", version:"MAC_OS_X_V10_4", regex:/Mac OS X 10(\.|_)4(;|_)/}
		,{type:"MAC", version:"MAC_OS_X_V10_3", regex:/Mac OS X 10(\.|_)3(;|_)/}
		,{type:"MAC", version:"MAC_OS_X_V10_2", regex:/Mac OS X 10(\.|_)2(;|_)/}
		,{type:"MAC", version:"MAC_OS_X_V10_1", regex:/Mac OS X 10(\.|_)1(;|_)/}
		,{type:"MAC", version:"MAC_OS_9", regex:/Mac OS 9/}
		,{type:"MAC", version:"MAC_OS_8", regex:/Mac OS 8/}
		,{type:"MAC", version:"MAC_OS_X", regex:/Mac OS X/}
	];



		var os1 = OsAutoDetector.detect();
		var _detectedOsVersion = os1.version;
		var _osVersion = "";
		if (typeof gDlSelectedOsName != "undefined") {
			_osVersion = gDlSelectedOsName;
		} else {
			_osVersion = _detectedOsVersion;
		}
     

		
		
		
	    var ua = navigator.userAgent.toLowerCase();
	    var isDesktop = !(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(ua)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(ua.substr(0,4)));
	    
	    function desktopPhone(){
		    if (isDesktop) {
		        $('[data-tel]').each(function(){
		            $(this).removeAttr('href').addClass('cf-black');
		        });
		    }
	    }