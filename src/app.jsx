import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import HomeComponent from './components/home'
import {Provider} from 'react-redux'
import store from './store/index.js'
import Loader from './components/loaderComponent'
import NotificationPanel from './components/notificationPanel'

const render = function(){
	console.log('main--->',store.getState())
 	return (<Router>
 				<Provider store={store}>
	 				<div>
	 					<Loader/>
						<NotificationPanel/>
						<Route exact path='/' component={HomeComponent}/>
	 				</div>
	 			</Provider>	
 			</Router>)
}

export default render