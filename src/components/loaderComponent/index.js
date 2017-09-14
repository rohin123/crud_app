import React from 'react'
import Template from './template.jsx'
import {} from '../../../style/loaderComponent.scss'

const LoaderComponent = React.createClass({
	getInitialState:function(){
		const {store} = this.context
		this.store = store
		this.open = false
		return {
			reRender:false
		}
	},
	componentWillReceiveProps:function(nextProps){
		//used only for login page to show loader forcefully. dont use this props elsewhere 
		if(nextProps.showLoader){
			this.open = true
		}
		this.setState({
			reRender:true
		})
	},
	componentWillMount:function(){
		let self = this
		console.log('store-->',this.store,this.store.getState())
		if(this.store){
			this.unsub = this.store.subscribe(function(){
				let state = self.store.getState() 
				console.log('state[loaderCount]==>',state)
				if(state['loaderCount']){
					self.open = true
					self.setState({
						reRender:true
					})
				}else{
					self.open = false
					self.setState({
						reRender:true
					})
				}
			})
		}
	},
	componentWillUnmount:function(){
		if(this.unsub){
			this.unsub()
		}
	},
	render:Template
})

LoaderComponent.contextTypes = {
	store:React.PropTypes.object
}

export default LoaderComponent