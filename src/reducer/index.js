import Actions from '../actions/actions.js'
import state from '../store/index.js'
import objectAssign from 'object-assign'
import AppData from '../utils/appData.js'
import CommonFunc from '../helpers/commonFunc.js'


const reducer = function(state={},action){
	let newFlags = null
	switch(action.type){	
		case Actions.FETCH_EMPLOYEES:{
			newFlags = CommonFunc.setStateFlags([])
			return objectAssign(	{},
									state,
									{
										employeesList:action.data,
										bFlags:newFlags
									}	
								)
		}

		default:{
			return state
		}
	}
}

export default reducer