import Home from "./components/Home";
import MerchantLogin from "./components/MerchantLogin";
import MerchantSignup from "./components/MerchantSignup";
import MerchantHome from "./components/MerchantHome";
import { Route } from "wouter";
import Login from "./components/Login";
import MerchantNameForm from "./components/MerchantNameForm";
function App() {
	return (
		<>

			<Route path='/' component={Login} />
			{/*<Route path='/' component={Home} />*/}
			<Route path='/MerchantLogin' component={MerchantNameForm} />
			<Route path='/MerchantSignup' component={MerchantSignup} />
			<Route path='/MerchantHome' component={MerchantHome} />
		</>
	);
}

export default App;
