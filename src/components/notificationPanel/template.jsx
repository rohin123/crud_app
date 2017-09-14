import React from 'react'
import CloseCross from '../closeCross/index.js'

const render = function(){
	let self = this,
		content = this.content,
		//state = this.store.getState(),
		//notificationWrapper = this.open?'notification-panel-wrapper':'hide',
		innerHtmlArr = this.notificationArray.map(function(item,index){
			return (
					<div className='notification-panel-wrapper'>
						<div className='notification-panel-div'>
							<div className='close-cross-notification'>
								<CloseCross close={self.close.bind(self,index)}/>
							</div>
							<div className='notification-content'>
								{item}
							</div>
						</div>
					</div>	
				)
		})
		//console.log(innerHtmlArr)
	return (
			<div>
				{innerHtmlArr}
			</div>
		)
}

export default render