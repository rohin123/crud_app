import store from '../store/index.js'
import objectAssign from 'object-assign';
import Appdata from '../utils/appData.js'
import moment from 'moment'

class CommonFunc{

	checkEmptyObject(obj=[]){
		if(Object.keys(obj).length){
			return false
		}

		return true
	}

	setStateFlags(flags){
		let state = store.getState()
		let currFlags = state['bFlags']
		////console.log(currFlags)
		for( var key in currFlags){
			//////console.log(key)
			currFlags[key] = false
		}
		for(var i = 0; i<flags.length;i++ ){
			//////console.log(flags[i])
			currFlags[flags[i].toString()] = true
		}
		//console.log(currFlags)
		return currFlags
	}

	deepCopyObject(obj) {
	    if (null == obj || "object" != typeof obj) return obj
	    var copy = obj.constructor()
	    for (var attr in obj) {
	        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
	    }
	    return copy
	}

	getUserId(){
		let state = store.getState()
		return state.userinfo.id
	}


	formatDate(timestamp){
		let monthArr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
		let displayDate = new Date(timestamp)
		return displayDate.getDate() + '-' + monthArr[displayDate.getMonth()] + '-' + displayDate.getFullYear()
	}

	getCurrDate(){
		return new Date().setHours(0,0,0,0)
	}

	getValidNumber(val){
		if(val){
			return Number(val);
		}
	}

	isUndefined(str, emptyStringCheck){
		if(typeof str === "undefined" || str === null || str === "undefined" || str === "null"){
			return true
		}
		if(emptyStringCheck && typeof str === "string" && str.toString().trim().length === 0){
			return true;
		}
		return false;
	}

	parseJson(str){
		let self = this;
		if(!self.isUndefined(str)){
			return JSON.parse(str);
		}else{
			return null;
		}
	}

	stripTerminalSpaces(str){
		console.log(str)
		let length = str.length
		if(length&&str.charCodeAt(length-1)==32){
			let newStr = str.substring(0,length-1)
			this.stripTerminalSpaces()
		}else{
			return str
		}
	}

	stripLeadAndTerminalSpaces(str){
		let newStr = str.trim()
		return newStr
	}

	stripAllSpaces(str){
		if(str){
			let len = str.length,
			newStr = ''
			for(var i=0;i<len;i++){
				if(str.charCodeAt(i)==32){
				}else{
					newStr = newStr.concat(str[i])
				}
			}
			return newStr	
		}else{
			return ''
		}	
	}

	randString(x){
	    var s = "";
	    while(s.length<x&&x>0){
	        var r = Math.random();
	        s+= (r<0.1?Math.floor(r*100):String.fromCharCode(Math.floor(r*26) + (r>0.5?97:65)));
	    }
	    return s;
	}

	replaceSpacebyChar(chr,str){
		let strArr = str.split(" "),
		newStr = strArr.join(chr)
		return newStr
	}

	checkValidEmail(val){
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(val);
	}

	checkValidUsername(val){
		var usernameRegex = /^[a-zA-Z0-9.\-_$@]{1,70}$/;
		return usernameRegex.test(val);
	}

	checkValidRole(role){
		return role==Appdata.validRole
	}

	checkDobwithAge(dob,age){
		if(dob&&age){
			let now = moment()
			let years = now.diff(dob,'years')
			console.log('checkDobwithAge',years)
			return (years == age)
		}
		return true
	}

}

export default new CommonFunc()