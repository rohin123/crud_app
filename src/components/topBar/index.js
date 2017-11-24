import React from 'react'
import Template from './template.jsx'
import {} from '../../../style/topBar.scss'
import AddUser from '../addUser'

const TopBar = React.createClass({
	getInitialState:function(){
		this.labelClass='label-down'
		const {store} = this.context
		this.store = store
		this.searchedUser = ''
		return {
			reRender:true
		}
	}, 
	searchFocusIn:function(){
		this.labelClass='label-up'
		this.setState({
			reRender:true
		})
	},
	searchFocusOut:function(){
		if(!this.searchedUser){
			this.labelClass='label-down'
			this.setState({
				reRender:true
			})
		}
	},
	addUserPopup:function(){
		this.props.setPopup(<AddUser/>)
	},
	setUser:function(val){
		console.log(val)
		this.searchedUser = val.name
		this.searchedUserId = val.id||null
		this.props.setUser(this.searchedUserId)
	},
	render:Template
})

TopBar.contextTypes= {
	store:React.PropTypes.object
}

export default TopBar