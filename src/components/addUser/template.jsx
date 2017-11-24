import React from 'react'
import LabeledInput from '../labeledInput'
import AppData from '../../utils/appData.js'
import DateComponent from 'react-datepicker'
import moment from 'moment'

const render = function(){
	return (
			<div className='add-user-div wh-center-aligned'>
				<h2>Employee Details</h2>
				<div className='user-details-div'>
					<LabeledInput label={'First Name'} name={'first_name'} type={'text'} 
									changeHandler={this.setEmployeeDetails}
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
									validationArr={[{key:AppData.inputValidations.REQUIRED},
													{key:AppData.inputValidations.EMAIL}
												]}
									isValid = {this.validState['email'].isPristine||
												this.validState['email'].valid}/>
					<LabeledInput label={'Age'} name={'age'} 
									type={'text'} 
									changeHandler={this.setEmployeeDetails}
									validationArr={[{	key:AppData.inputValidations.REQUIRED},
													{	key:AppData.inputValidations.REGEX,
														regex:"^([1-9][0-9])$",
														mssg:"Number between 1 to 99 allowed"
													}]}
									isValid = {this.validState['age'].isPristine||
												this.validState['age'].valid}/>	
					<div className='inline-display dob-div'>												
						<DateComponent selected={this.selectedDate}
									    onChange={this.handleDobSelect}
	  									maxDate={moment()}
	  									placeholderText="Date of Birth"
	  									peekNextMonth
	    								showMonthDropdown
	    								showYearDropdown
	   									dropdownMode="select"/>	
	   					{this.validState['dob'].isPristine||this.validState['dob'].valid?null:<span>{this.invalidDateMssg}</span>}
	   				</div>	
	   				<div className='inline-display'>
	   					<select className='gender-select' name='gender' 
	   						onChange={this.selectGender}>
	   						<option value='male'>male</option>
	   						<option value='female'>female</option>
	   					</select>
	   				</div>				
				</div>	
				<div className={this.checkValidSave()?'buttons-div':'hide'}>
					<button className='button green-button edit-button' onClick={this.saveUser}>SAVE</button>
				</div>
			</div>
		)
}

export default render

