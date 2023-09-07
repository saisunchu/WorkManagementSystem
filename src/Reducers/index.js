import { combineReducers, createStore } from 'redux';

import Reducers from './Reducers';

const AppReducers = combineReducers({
    Reducers,
});

const rootReducer = (state, action) => {
	return AppReducers(state,action);
}

let store = createStore(rootReducer);

export default store;