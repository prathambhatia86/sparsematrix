import Home from "./components/Home";
import MerchantLogin from "./components/MerchantLogin";
import MerchantSignup from "./components/MerchantSignup";
import {Route,Link} from "wouter";
function App() {
  return (
    <>
    <Route path='/' component={Home} />
    <Route path='/MerchantLogin' component={MerchantLogin} />
    <Route path='/MerchantSignup' component={MerchantSignup} />
    </>
  );
}

export default App;
