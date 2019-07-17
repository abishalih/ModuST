import React, { Component } from 'react';
import Home from './templates/Home';
import Ticket from './templates/Ticket';
import User from './templates/User';
import './App.css';
import { Router, Switch, Route } from 'react-router-dom';
import { store, persistor } from './store';
import { Provider } from 'react-redux';
import history from './helpers/history';
import { PersistGate } from 'redux-persist/integration/react'

class App extends Component {
	render() {
		return (
			// <Home />
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<Router history={history}>
						<div className='App'>
							<Switch>
								<Route exact path='/' component={Home} />
								<Route path='/ticket' component={Ticket} />
								<Route path='/user' component={User} />
							</Switch>
						</div>
					</Router>
				</PersistGate>
			</Provider>
		);
	}
}

export default App;
