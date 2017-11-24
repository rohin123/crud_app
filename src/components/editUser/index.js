import React from 'react'
import Template from './template.jsx'
import {} from '../../../style/editUser.scss'
import objectAssign from 'object-assign'
//import UserActions from '../../actions/userActions.js'
import CommonFunc from '../../helpers/commonFunc.js'
import moment from 'moment'
import EmployeeActions from '../../actions/employeeActions.js'

const EditUser = React.createClass({
	getInitialState:function(){
		this.isUpdated = false
		const {store} = this.context
		this.store = store
		this.validState = {}
		this.init(this.props.user)
		this.editEmpObj = {}
		this.id = this.props.user.id
		this.invalidDateMssg = 'D.O.B and age mismatch'
		return {
			reRender:false
		}
	},
	init:function(emp){
		(Object.keys(emp)||[]).map((key)=>{
			this.validState[key] = {
				isPristine:true,
				valid:true
			}
		})	
	},
	
	checkValidUpdate:function(){
		console.log()
		let inputs = (Object.keys(this.validState))||[]
		for(var i=0;i<inputs.length;i++){
			if(!this.validState[inputs[i]].valid){
				return false
			}
		}

		return true
	},
	setEmployeeDetails:function(name,value,valid){
		this.isUpdated = true
		this.editEmpObj[name] = value
		this.validState[name] = {
			isPristine:false,
			valid:valid
		}
		if(name=='age'){
			this.validState['dob'] = {
				valid:CommonFunc.checkDobwithAge(this.editEmpObj['dob']||
							moment(this.props.user.dob),this.editEmpObj['age']),
				isPristine:false
			}
		}
		this.setState({
			reRender:true
		})
	},
	handleDobSelect:function(date){
		this.isUpdated = true
		this.editEmpObj.dob = date
		this.validState['dob'] = {
				valid:CommonFunc.checkDobwithAge(this.editEmpObj['dob'],this.editEmpObj['age']||
						this.props.user.age),
				isPristine:false
			}
		this.setState({
			reRender:true
		})
	},
	updateEmployee:function(){
		if(this.checkValidUpdate()){
			console.log(this.editEmpObj)
			console.log(this.props.user)
			this.store.dispatch(EmployeeActions.updateEmployee(this.id,this.editEmpObj))
			this.reset()
		}
	},
	reset:function(){
		this.editEmpObj = {}
		this.isUpdated = false
		this.init(this.props.user)
		this.setState({
			reRender:true
		})
	},
	removeEmployee:function(){
		this.store.dispatch(EmployeeActions.removeEmployee(this.id))
	},
	getSelectedRoles:function(){
		let ret = [];
		(Object.keys(this.rolesMap)||[]).map((role)=>{
			if(this.rolesMap[role]){
				ret.push(role)
			}
		})
		return ret
	},
	getValue:function(name){
		if(this.editEmpObj[name]||this.editEmpObj[name]==''){
			return this.editEmpObj[name]
		}else{
			return this.props.user[name]
		}
	},
	stopBubbling:function(e){
		e.stopPropagation()
	},
	checkDobwithAge:function(){

	},
	selectGender:function(e){
		this.editEmpObj.gender = e.target.value
		this.isUpdated = true
		this.setState({
			reRender:true
		})
	},
	render:Template
})

EditUser.contextTypes = {
	store:React.PropTypes.object
}

export default EditUser
