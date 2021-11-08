import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import CartFeaTure from './components/Cart';
import Header from './components/Header';
import ProductFeature from './components/Product';

function App() {
  // const isShowUserForm = useSelector(state => state.user.showUserForm)
  
  return (
    <div className="App">
      <Header />

      {/* {isShowUserForm && <UserFeature />} */}
      <Switch>
          <Redirect from="/" to="/products" exact />

          <Route path="/products" component={ProductFeature} />
          <Route path="/cart" component={CartFeaTure} />
      </Switch>

    </div>
  );
}

export default App;
