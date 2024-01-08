import Home from "./components/Home";
import MerchantLogin from "./components/MerchantLogin";
import MerchantSignup from "./components/MerchantSignup";
import MerchantHome from "./components/MerchantHome";
import {Route,Link} from "wouter";
function App() {
  return (
    <>
    <Route path='/' component={Home} />
    <Route path='/MerchantLogin' component={MerchantLogin} />
    <Route path='/MerchantSignup' component={MerchantSignup} />
    <Route path='/MerchantHome' component={MerchantHome} />
    </>
  );
}

export default App;
