import React from 'react'
import Template from './template.jsx'
//import UserActions from '../../actions/userActions.js'
//import RoleActions from '../../actions/roleActions.js'
import {} from '../../../style/userList.scss'
import EmployeeActions from '../../actions/employeeActions.js'


const UserList = React.createClass({
	getInitialState:function(){
		const {store} = this.context
		this.store = store
		return {
			reRender:false
		}
	},
	componentWillMount:function(){
		this.unsub = this.store.subscribe(()=>{
			this.setState({
				reRender:true
			})
		})
	},
	componentDidMount:function(){
		this.store.dispatch(EmployeeActions.getEmployeesList())
	},
	componentWillUnmount:function(){
		this.unsub()
	},
	render:Template
})

UserList.contextTypes = {
	store:React.PropTypes.object
}

export default UserList
