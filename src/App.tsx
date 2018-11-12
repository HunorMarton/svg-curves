import * as React from 'react';
import routes from './routes';
import Header from './components/Header';
import './App.css';

class App extends React.Component {
  public render() {
    return (
      <div className="app">
        <Header />
        {routes}
      </div>
    );
  }
}

export default App;
