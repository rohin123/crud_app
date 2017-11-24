import React from 'react'
import AutoComplete from '../genericAutoComplete'
import AddUser from '../addUser'
import objectAssign from 'object-assign'

const render = function(){
	let users = this.store.getState().employeesList||[],
		list = users.map((user)=>{
			return objectAssign({},user,{name:user.first_name+' '+user.last_name})
		})

	return (	
			<div className='top-bar'>
				<div className='search-box'>
					<label className={'label '+this.labelClass}>Search Employee</label>
					<AutoComplete name={'username/empid'}   
										  focusIn={this.searchFocusIn} 
										  focusOut={this.searchFocusOut} 
										  setItem={this.setUser}
										  list={list}										  
										  valid={true}/>
				</div>
				<div className='top-bar-buttons'>
					<button className='button green-button add-user-button' onClick={this.addUserPopup}>
						Add Employee
					</button>
				</div>
			</div>
				
		)
}

export default render