import store from '../store/index.js'
import LoaderActions from '../actions/loaderActions.js'

class AjaxWrapper{
	
	get({url: url, callback: callback, errCallback: errCallback, beforeSendCall:beforeSendCall=function(){}, options: options={}} = {}){
		let showLoader = (options.showLoader)? true : false;
		$.ajax({
			url : url,
			type : 'GET',
			beforeSend: function(xhr){
				if(showLoader==true){
					store.dispatch(LoaderActions.showLoader())
				}
				beforeSendCall(xhr)
			}

		}).fail(function(err){
			if(err){
				if(showLoader==true){
					store.dispatch(LoaderActions.hideLoader())
				}
    			errCallback(err);
    		}
		}).done(function(item, statusText, response){
			if(showLoader==true){
					store.dispatch(LoaderActions.hideLoader())
				}
			callback(item);
		 });
	}

	post({url: url, data: data, callback: callback, errCallback: errCallback, beforeSendCall:beforeSendCall=function(){}, options: options={}}={}){
		let showLoader = (options.showLoader)? true : false;
		$.ajax({
			url : url,
			type : 'POST',
			data : JSON.stringify(data),
			contentType : 'application/json',
			beforeSend: function(xhr){
				if(showLoader==true){
					store.dispatch(LoaderActions.showLoader())
				}
				beforeSendCall(xhr)
			}
		}).fail(function(err){
			if(err){
				if(showLoader==true){
					store.dispatch(LoaderActions.hideLoader())
				}
    			errCallback(err);
    		}
		}).done(function(item, statusText, response){
			if(showLoader==true){
					store.dispatch(LoaderActions.hideLoader())
				}	
			callback(item);
		 });
	}

	put({url : url, data : data, beforeSendCall:beforeSendCall=function(){} ,errCallback : errCallback, callback : callback, options: options={} }){
		let showLoader = (options.showLoader)? true : false;
		$.ajax({
			url: url,
    		type: 'PUT',
    		data: JSON.stringify(data),
    		contentType : 'application/json',
    		beforeSend:function(xhr){
    			if(showLoader==true){
					store.dispatch(LoaderActions.showLoader())
				}
				beforeSendCall(xhr)
    		}
    	}).fail(function(err){
    		if(err){
    			if(showLoader==true){
					store.dispatch(LoaderActions.hideLoader())
				}
    			errCallback(err);
    		}
    	}).done(function(item,statusText,response){
    		if(showLoader==true){
					store.dispatch(LoaderActions.hideLoader())
				}
    		callback(item);
    	});
	}

	Delete({url : url, data : data, errCallback : errCallback, callback : callback, beforeSendCall:beforeSendCall=function(){}, options: options={} }){
		$.ajax({
			url: url,
    		type: 'DELETE',
    		data: JSON.stringify(data),
    		contentType : 'application/json',
    		beforeSend: function(xhr){
				beforeSendCall(xhr)
			}
    	}).fail(function(err){

    		if(err){
    			errCallback(err);
    		}
    	}).done(function(item,statusText,response){
    		callback(item);
    	})
	}
}

export default new AjaxWrapper();