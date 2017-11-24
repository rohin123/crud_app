import Actions from './actions.js'
import AjaxWrapper from '../helpers/ajaxWrapper.js'
import Constants from '../utils/constants.js'
import NotificationAction from './notificationActions.js'
import Store from '../store'
import CommonFunc from '../helpers/commonFunc.js'

class EmployeeActions{
	getEmployeesList(){
		let state = Store.getState()
		return (dispatch)=>{
			AjaxWrapper.get({
				url:Constants.employeesApi,
				callback:(employees)=>{
					dispatch(this.setEmployees(employees))
				},
				errCallback:(err)=>{
					dispatch(NotificationAction.openNotification('Error fetching employees'))
				},
				options:{
					showLoader:true
				}
			})
		}
	}

	saveEmployee(payload){
		let state = Store.getState()
		return (dispatch)=>{
			AjaxWrapper.post({
				url:Constants.employeesApi,
				data:payload,
				callback:(employees)=>{
					dispatch(this.setEmployees(employees))
				},
				errCallback:(err)=>{
					dispatch(NotificationAction.openNotification('Error fetching employees'))
				},
				options:{
					showLoader:true
				}
			})
		}
	}

	updateEmployee(id,payload){
		console.log(id,payload,Constants.employeeApi.replace(/:id/,id))
		let state = Store.getState()
		return (dispatch)=>{
			AjaxWrapper.put({
				url:Constants.employeeApi.replace(/:id/,id),
				data:payload,
				callback:(employees)=>{
					dispatch(this.setEmployees(employees))
				},
				errCallback:(err)=>{
					dispatch(NotificationAction.openNotification('Error fetching employees'))
				},
				options:{
					showLoader:true
				}
			})
		}
	}

	removeEmployee(id){
		console.log(id)
		let state = Store.getState()
		return (dispatch)=>{
			AjaxWrapper.Delete({
				url:Constants.employeeApi.replace(/:id/,id),
				callback:(employees)=>{
					dispatch(this.setEmployees(employees))
				},
				errCallback:(err)=>{
					dispatch(NotificationAction.openNotification('Error fetching employees'))
				},
				options:{
					showLoader:true
				}
			})
		}
	}

	setEmployees(payload){
		return {
			type:Actions.FETCH_EMPLOYEES,
			data:payload
		}
	}
}

export default new EmployeeActions()