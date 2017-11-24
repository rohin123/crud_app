import React from 'react'
import Template from './template.jsx'
import {} from '../../../style/editUser.scss'
import {} from '../../../style/react-datepicker.scss'
import {} from '../../../style/addUser.scss'
import CommonFunc from '../../helpers/commonFunc.js'
import moment from 'moment'
import EmployeeActions from '../../actions/employeeActions.js'

const AddUser = React.createClass({
	getInitialState:function(){
		const {store} = this.context
		this.store = store
		this.gender = 'male'
		//this.selectedDate = moment()
		this.invalidDateMssg = 'D.O.B and age mismatch'
		this.validState = {
			first_name:{
					valid:false,
					isPristine:true
				},
			last_name: {
					valid:false,
					isPristine:true
				},
			email: {
					valid:false,
					isPristine:true
				},
			age: {
					valid:false,
					isPristine:true
				},
			dob:{
				valid:false,
				isPristine:true
			}	
		}
		this.newEmp = {}
		return {
			reRender:false
		}
	},
	componentWillMount:function(){
	},
	checkValidSave:function(){
		console.log(this.validState)
		let inputs = (Object.keys(this.validState))||[]
		for(var i = 0 ;i<inputs.length;i++){
			if(!this.validState[inputs[i]].valid){
				return false
			}
		}
		return true
	},
	setEmployeeDetails:function(key,value,valid){
		if(valid){
			this.newEmp[key] = value	
		}
		this.validState[key] = {
			valid:valid,
			isPristine:false
		}
		if(key=='age'&&this.newEmp.dob){
			this.validState['dob'] = {
				valid:CommonFunc.checkDobwithAge(this.newEmp.dob,this.newEmp.age),
				isPristine:this.validState['dob'].isPristine
			}
		}
		this.setState({
			reRender:true
		})
	},
	selectGender:function(evt){
		console.log(evt.target.value,evt.target.name)
		this.gender = evt.target.value
	},
	saveUser:function(){
		console.log(this.newEmp)
		this.newEmp.id = new Date().getTime()
		this.newEmp.gender = this.gender
		this.store.dispatch(EmployeeActions.saveEmployee(this.newEmp))
		this.props.close()
	},
	handleDobSelect:function(date){
		this.selectedDate = date
		this.newEmp['dob'] = date
		this.validState['dob'] = {
			valid:CommonFunc.checkDobwithAge(date,this.newEmp.age),
			isPristine:false
		}

		this.setState({
			reRender:true
		})
	},
	openCalender:function(){
		this.showCalender = true
		this.setState({
			reRender:true
		})
	},
	calenderClosed: function(){
		console.log('----calenderClose---');
		this.showCalender = false;
		this.setState({
			reRender:true
		})
	},
	render:Template
})

AddUser.contextTypes = {
	store:React.PropTypes.object
}

export default AddUser