/*
 * inspiredMenu
 * 
 * a jQuery plugin to asynchronously load link content
 *
 * Developer: Alexander Brett (alex@alexander-brett.co.uk), Nov 2013
 * Version: 0.0.1
 */

(function($) {

    $.fn.linkCache = function(options) {

	/*
	 * Settings
	 */
	var $menu = this;

	//external
	var defaults = {
	    progressCallback: function(){
		$(this).click(function(e){
		    e.preventDefault();
		    //check we're not hitting the same link
		    if(!$(e.target).is("."+external.activeLinkClass)){
			//set the active link class on the new link
			$("."+external.activeLinkClass)
			    .removeClass(external.activeLinkClass);
			$(e.target).addClass(external.activeLinkClass);
			//swap the content
			$(external.contentSelector)
			    .replaceWith($(e.target).data('content'))
			    .remove();
		    }
		})
	    },
	    completeCallback: function(){},
	    contentSelector: '#content',
	    activeLinkClass: 'current-menu-item'
	    
	}

	var external = $.extend({}, defaults, options );

	//internal
	var internal = {
	    numberToLoad: $menu.filter('a').length,
	    numberLoaded: 0,
	    doCallback: function() {
		internal.numberLoaded++;
		external.progressCallback.call(this);

		(internal.numberLoaded == internal.numberToLoad)
		    ? external.completeCallback.call($menu)
		    : null;
	    },

	    /*
	     * loadLinkContent uses a GET request to load the contents of a 
	     * hyperlink. The data is stored using the jQuery .data() procedure, 
	     * and once loaded, the object.data('loaded') flag is set.
	     */
	    loadLinkContent: function() {
		var self=this
		$(self).data('loaded')==1 ? internal.doCallback.call(self)
		    : $.get(
			$(self).attr("href"),
			function(returnedData) {
			    $(self).data({
				'loaded': 1, 
				'content': $(returnedData)
				    .find(external.contentSelector)[0]
				    || $(returnedData)
				    .filter(external.contentSelector)[0]
			    });
			    internal.doCallback.call(self);
			});
	    }
	}
	
	/*
	 * Procedure
	 */

	this.filter('a').each(function(){
	    internal.loadLinkContent.call(this);
	});

    }
}(jQuery));
