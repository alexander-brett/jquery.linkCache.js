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
		console.log("progress",internal.numberLoaded)
	    },
	    completeCallback: function(){
		console.log("complete",internal.numberLoaded)
	    }
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
		if($(self).data('loaded')==1 ){
		    internal.doCallback.call(self);
		} else {
		    $.get(
			$(self).attr("href"), 
			{inspired_content_only: 1},
			function(returnedData) {
			    $(self).data({
				'loaded': 1, 
				'content': returnedData
			    });
			    internal.doCallback.call(self);
			});
		}
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
