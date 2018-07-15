import { createStore, combineReducers } from 'redux';


const api = { prod: "not ready", dev: "https://lawyr.herokuapp.com/api/v1/" }
const session = { active: false }
let set_state = { api: api, session: session, token: null }
if(localStorage.getItem("lawyr")) {
	set_state = JSON.parse(localStorage.getItem("lawyr"));
}
function mainReducer(state={}, action) {
	switch(action.type) {
		case 'LOGIN_ACTION' : 
			set_state.session.active = true;
			set_state.token = action.payload.token;
		break;
		case 'LOGOUT_ACTION' :
			set_state.session.active = false;
			localStorage.removeItem("lawyr");
			set_state = { api: api, session: session, token: null }
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
	// Global Saves / Caches
	if(action.type.toString().split("_")[0] === 'SAVE') {
		let key = action.type.toString().substring(action.type.toString().split("_")[0].length+1)
		set_state[key.toString().toLowerCase()] = action.payload
	}
	localStorage.setItem("lawyr", JSON.stringify(set_state));

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