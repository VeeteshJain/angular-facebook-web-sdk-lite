brandHomeApp.directive('snapFacebook', ['fbService', function(fbService){'use strict';
	return {
		link: function($scope, iElm, iAttrs, controller) {
			fbService.getFb().then(function(FB){
				FB.XFBML.parse(iElm[0], function fbParse(){
				});
			});
		}
	};
}]);

brandHomeApp.factory('fbService', ['$window', '$document', '$q', function($window, $document, $q){'use strict';
	var _locale = 'en_US';
	var _initParams = {
	    status: true,
	    cookie: true,
	    xfbml: false,
	    version: 'v2.0'
	};

	var _fbInstancePromise = $q.defer();
	$window.fbAsyncInit = function(){
		$window.FB.init(_initParams);
		_fbInstancePromise.resolve($window.FB);
	};

	function _fbInstance(){
		var deffer = $q.defer();
		if(!$window.FB){
			_fbInstancePromise.promise.then(function(){
				deffer.resolve($window.FB);
			});
			_fbApiLoader(_locale);
		}else{
			deffer.resolve($window.FB);
		}
		return deffer.promise;
	}

	function _fbApiLoader(locale){
		(function(d) {
		    var js, 
		    	id = 'facebook-jssdk';
		    if (d.getElementById(id)) {
		        return;
		    }
		    js = d.createElement('script');
		    js.id = id;
		    js.async = true;
		    js.src = '//connect.facebook.net/'+locale+'/sdk.js';
		    d.getElementsByTagName('head')[0].appendChild(js);
		}($document[0]));
	}
	return {
		getFb: function(){
			return _fbInstance();
		}
	};
}]);
