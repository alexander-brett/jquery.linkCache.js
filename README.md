jquery.linkCache.js
===================

Library to cache hyperlinks and load cached version

USAGE:

$('a:not(.external)').inspiredMenu({
	progressCallback: function() {
	  $(this).click(function(e){
	    e.preventDefault();
      $('#content').replaceWith($(this).data('content')).remove();
	  })
	}
});
