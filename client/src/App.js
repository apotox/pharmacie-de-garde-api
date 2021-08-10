
import { Route, Switch } from 'react-router-dom';
import './App.css';
import WithAuth from './auth/WithAuth';
import Header from './components/Header';
import NAlert from './components/NAlert';
import About from './pages/About';
import Dash from './pages/Dash';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
        <Header />

        <Switch>
          <Route exact path="/" render={props=> <Home {...props} />} />
          <Route exact path="/dashboard" render={props=> <WithAuth Cmp={Dash} _props={props} />} />
          <Route exact path="/about" render={props=> <About {...props} />} />

          <Route path="*" render={props=> <p>not found!</p>} />
        </Switch>

        <NAlert />
    </div>
  );
}

export default App;
