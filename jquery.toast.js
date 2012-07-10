/*@cc_on
(function(f) {
	window.setTimeout = f(window.setTimeout);   // overwrites the global function!
	window.setInterval = f(window.setInterval); // overwrites the global function!
})(function(f) {
	return function(c, t) {
		var a = [].slice.call(arguments, 2);    // gathers the extra args
		return f(function() {
			c.apply(this, a);                   // passes them to your function
		}, t);
	};
});
@*/
/**
* jQuery Toast Plugin 1.0
* www.sam-benne.co.uk
* Copyright 2012, Sam Bennett
* Free to use under the MIT license.
* http://www.opensource.org/licenses/mit-license.php
*/

;(function($){
	var toastContainer = null, theToast = null, theIcon = null, theMessage = null, theClose = null;
	var settings = null;
	var lastMessage = null;
	var methods = {
		init: function(options) {
			settings = {
				animation: 'fadeAndSlide',
				animationspeed: 600,
				text: '',
				sticky: false,
				stayTime: 3000,
				type: 'notice',
				position: 'top-right',
				closeText: '&times;',
				onShow: null,
				onHide: null,
				onDestroy: null
			};
		},
		destroy: function() {
			if(typeof settings.onDestroy === "function") settings.onDestroy.call();
		},
		show: function(options) {
			methods.init(options);
			var localSettings = $.extend(localSettings, settings, options, true);
			toastContainer = (!$('.toastContainer').length ? $('<div></div>', {'class': 'toastContainer ' + localSettings.position}).appendTo('body') : $('.toastContainer'));
			theToast = $('<div></div>', {'class': 'the-toast clearfix', 'id': 'theToast_'+$('.the-toast').length}).appendTo('.toastContainer');
			theIcon = $('<div></div>', {'class': 'icon ' + localSettings.type}).appendTo(theToast);
			theMessage = $('<div></div>', {'class': 'message'}).html(localSettings.text).appendTo(theToast);

			if(!localSettings.sticky) {
				setTimeout(function(e) {
					methods.hide(e);
				}, localSettings.stayTime, theToast);
			} else {
				var tempToast = theToast;
				theClose = $('<div></div>', {'class': 'close'}).html(settings.closeText).appendTo(tempToast).click(function() {methods.hide(tempToast);});
			}
			if(typeof settings.onShow === "function") settings.onShow.call();
		},
		hide: function(theToast) {
			if($('.toastContainer .the-toast').length) {
				theToast.fadeOut(settings.animationspeed, function() {
					theToast.remove();
				});
			}
			if(typeof settings.onHide === "function") settings.onHide.call();
		}
	};

	$.toast = function(method) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || ! method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method ' +	method + ' does not exist on jQuery.toast');
		}
	};
})(jQuery);