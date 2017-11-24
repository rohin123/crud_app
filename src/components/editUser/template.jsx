import React from 'react'
import LabeledInput from '../labeledInput'
import AppData from '../../utils/appData.js'
import DateComponent from 'react-datepicker'
import moment from 'moment'

const render = function(){
	console.log('edituser render',this.props.user)
	let user = this.props.user,
		innerHtml = null,
		userActive = user.active === true ? true : false;
	
		innerHtml = (
			<div>
				<h2>Employee Details</h2>
				<div className='user-details-div'>
					<LabeledInput label={'First Name'} name={'first_name'} type={'text'} 
									changeHandler={this.setEmployeeDetails}
									value={this.getValue('first_name')}
									validationArr={[{	key:AppData.inputValidations.REQUIRED},
													{	key:AppData.inputValidations.REGEX,
														regex:"^\\w+$",
														mssg:'Spaces inbetween not allowed'
													}
												]}
									isValid = {this.validState['first_name'].isPristine ||
													this.validState['first_name'].valid}/>
					<LabeledInput label={'Last Name'} name={'last_name'} 
									type={'text'} changeHandler={this.setEmployeeDetails}
									value={this.getValue('last_name')}
									validationArr={[{	key:AppData.inputValidations.REQUIRED},
													{	key:AppData.inputValidations.REGEX,
														regex:"^\\w+$",
														mssg:'Spaces inbetween not allowed'
													}
												]}
									isValid = {this.validState['last_name'].isPristine||
												this.validState['last_name'].valid}/>		
					<LabeledInput label={'Email'} name={'email'} type={'text'} 
									changeHandler={this.setEmployeeDetails}
									value={this.getValue('email')}
									validationArr={[{key:AppData.inputValidations.REQUIRED},
													{key:AppData.inputValidations.EMAIL}
												]}
									isValid = {this.validState['email'].isPristine||
												this.validState['email'].valid}/>
					<LabeledInput label={'Age'} name={'age'} 
									type={'text'} 
									value={this.getValue('age')}
									changeHandler={this.setEmployeeDetails}
									validationArr={[{	key:AppData.inputValidations.REQUIRED},
													{	key:AppData.inputValidations.REGEX,
														regex:"^[1-9][0-9]$",
														mssg:"Number between 10 to 99 allowed"
													}]}
									isValid = {this.validState['age'].isPristine||
												this.validState['age'].valid}/>	
					<div className='inline-display dob-div'>												
						<DateComponent selected={this.editEmpObj.dob||moment(user.dob)}
									    onChange={this.handleDobSelect}
	  									maxDate={moment()}
	  									placeholderText="Date of Birth"
	  									peekNextMonth
	    								showMonthDropdown
	    								showYearDropdown
	   									dropdownMode="select"/>	
	   					<label>Date of Birth</label>
	   					{this.validState['dob'].valid?null:<span>{this.invalidDateMssg}</span>}				
	   				</div>
	   				<div className='inline-display'>
	   					<select className='gender-select'
	   						name='gender' 
	   						onChange={this.selectGender}
	   						value={this.editEmpObj.gender||user.gender}>
	   						<option value='male'>male</option>
	   						<option value='female'>female</option>
	   					</select>
	   				</div>																																
				</div>
				<div className='buttons-div'>
					{(this.isUpdated)?
						<button className={'button edit-button '+ (this.checkValidUpdate()?' green-button':'gray-button')} 
							onClick={this.updateEmployee}>
						UPDATE
						</button>:null
					}
					{(this.isUpdated)?
						<button className='button red-button edit-button' onClick={this.reset}>CANCEL</button>:
						null
					}
					<button className='button red-button edit-button' onClick={this.removeEmployee}>DELETE</button>
				</div>
			</div>
		)
	
	return <div ref={(elem)=>{this.compRef = elem}} className='edit-user-div' onClick={this.toggle}>
					{innerHtml}
			</div>
}


export default render

