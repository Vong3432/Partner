import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reduces'

const initialState = {};

const middleware = [thunk];

const loadState = () => {
    try {
      const serializedState = localStorage.getItem('user');
      if(serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState);
    } catch (e) {
      return undefined;
    }
  };
  
  const saveState = (state) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('user', serializedState);
    } catch (e) {
      // Ignore write errors;
    }
  };

const peristedState = loadState();


const store = createStore(
    rootReducer, 
    peristedState, 
    compose(
        applyMiddleware(...middleware)
        ,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

store.subscribe(() => {
    saveState(store.getState())
})

export default store;