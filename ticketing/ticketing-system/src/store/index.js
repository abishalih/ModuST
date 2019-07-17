import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducers from '../reducers';
import { persistStore, persistReducer, } from 'redux-persist';
import storage from 'redux-persist/lib/storage' ;

const persistConfig = {
        key: 'root',
        storage,
}
const persistedReducer = persistReducer(persistConfig, rootReducers)
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
    persistedReducer,
    //rootReducers,
    composeEnhancers(
        applyMiddleware(thunk,logger), 
    )
);
export const persistor = persistStore(store);

export default { store, persistor };
