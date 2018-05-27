import { createStore, combineReducers } from 'redux';
import Cookies from 'js-cookie';

const api = { prod: "not ready", dev: "https://lawyr.herokuapp.com/api/v1/" }
const session = { active: false }
let set_state = { api: api, session: session }
if(Cookies.get("lawyr") !== undefined) {
	set_state = Cookies.getJSON("lawyr");
}
function mainReducer(state={}, action) {
	switch(action.type) {
		case 'LOGIN_ACTION' : 
			set_state.session.active = true;
		break;
		case 'LOGOUT_ACTION' :
			set_state.session.active = false;
		break;
		case 'SHOW_QUESTION_NAV':
			state.show_question_nav = true;
			state.questions = action.payload;
			break;
		case 'HIDE_QUESTION_NAV':
			state.show_question_nav = false;
			state.questions = 0;
			break;
		default: break;
	}
	Cookies.set("lawyr", set_state, { expires: 7, path: '/' });
	return state;
}

const rootReducer = combineReducers ({
	state: (state = set_state) => {
		return state
	},
	main: mainReducer
});

const store = createStore(rootReducer);
export default store;