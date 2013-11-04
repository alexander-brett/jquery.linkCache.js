jquery.linkCache.js
===================

Library to cache hyperlinks and load cached version

## USAGE

```js
myLinks = $('a:not(.external)')

myLinks.linkCache();
```

## OPTIONS

### progressCallback

Called each time a link loads. Use this to bind handlers which animate your menus etc.

Default:

```js
function(){
	$(this).click(function(e){
		e.preventDefault();
		$(external.selector)
			.replaceWith($(e.target).data('content'))
			.remove();
	})
    }
```

### completeCallback

Called when loading is complete. Use this, for instance, to fade out a loading screen

Default: `function() {}`

### contentSelector

Selects the element which is cached and replaced. Default: `'#content'`

### activeLinkClass

The class of the active link. Default: `'current-menu-item'`
=======
Default: `'#content'`


## TODO

[ ] detect and ignore external links
