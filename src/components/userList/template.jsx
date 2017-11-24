import React from 'react'
import EditUser from '../editUser'

const render =  function(){
	let state = this.store.getState()
	let	userListHtml = null
	if(this.props.selectedUserId){
		for(var i= 0; i<(state.employeesList||[]).length;i++){
			if(state.employeesList[i].id == this.props.selectedUserId){
				userListHtml = <EditUser user={state.employeesList[i]}/>
				break
			}
		}
	}else{
		userListHtml = (state.employeesList||[]).map((item,index)=>{
			return <EditUser key={item.id} user={item}/>
		})
	}
	return (
			<div className='user-list-div'>
				{userListHtml}
			</div>
		)
}

export default render