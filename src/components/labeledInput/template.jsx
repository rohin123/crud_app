import React from 'react'

const render = function(){
	let props = this.props
	return (
				<div className='labeled-input-div'>
					<label className={'label '+this.labelClass}>{props.label}</label>
					<div className='input-div'>
						<input type={props.type} value={this.inputVal} 
									onChange={this.changeHandler.bind(this,props.name)} 
									onFocus={this.focusHandler}
									onBlur={this.blurHandler}
									readOnly={props.readonly}/>
						{this.isValid?null:<span>{this.errMsg}</span>}			
					</div>											
				</div>
		)
}

export default render