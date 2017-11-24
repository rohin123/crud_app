import React from 'react'
import Template from './template.jsx'
import {} from '../../../style/labeledInput.scss'
import FormValidation from '../../helpers/formValidations.js'

const LabeledInput = React.createClass({
	getInitialState:function(){
		this.labelClass=this.props.value?'label-up':'label-down'
		this.isValid = true
		this.errMsg = 'Required Input'
		this.inputVal = this.props.value
		return {
			reRender:false
		}
	},
	componentWillReceiveProps:function(nextProps){
		this.isValid = nextProps.isValid?true:false
		this.inputVal = nextProps.value
		this.setState({
			reRender:true
		})
	},
	changeHandler:function(name,e){
		let val = e.target.value;
		this.inputVal = val
		if(this.props.validationArr&&this.props.validationArr.length){
			let validState = this.checkVaildInput(val)
			this.isValid = validState.valid
			this.errMsg = validState.customMssg||validState.defaultMssg
			this.setState({
				reRender:true
			})
		}
		this.props.changeHandler(name,val,this.isValid)
	},
	checkVaildInput:function(val){
		let validationArr = this.props.validationArr||[],
			op = null
		for(var i = 0 ; i < validationArr.length ; i++){
			let key = validationArr[i].key,
				regex = validationArr[i].regex,
				customMssg = validationArr[i].mssg||null
			op = FormValidation.checkVaildInput(key,val,regex)
			if(!op.valid){
				op.customMssg = customMssg
				break
			}
		}
		return op	
	},
	focusHandler:function(){
		if(this.labelClass!='label-up'){
			this.labelClass='label-up'
			this.setState({
				reRender:true
			})
		}
	},
	blurHandler:function(e){
		if(!e.target.value){
			this.labelClass='label-down'
			this.setState({
				reRender:true
			})
		}
	},
	render:Template
})

export default LabeledInput