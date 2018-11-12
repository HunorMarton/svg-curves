import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { applyMiddleware, compose, createStore } from 'redux';
import { createBrowserHistory } from 'history';
import { routerMiddleware, ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import rootReducer from './state/reducers';
import { resize } from './state/ducks/canvas/actions';
import { setArcStartPoint } from './state/ducks/arc/actions';
import './index.css';

const history = createBrowserHistory();

const composeEnhancer: typeof compose =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer(history),
  composeEnhancer(applyMiddleware(routerMiddleware(history)))
);

// Initial actions
store.dispatch(resize({ width: window.innerWidth, height: window.innerHeight }));
store.dispatch(setArcStartPoint({ x: 145, y: 174 }));

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
