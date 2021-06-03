import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import './App.css';
import {Container} from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import {CartScreen} from './screens/CartScreen'
import {LoginScreen} from './screens/LoginScreen'
import {RegisterScreen} from './screens/RegisterScreen'
import {ProfileScreen} from './screens/ProfileScreen'
import {ShippingScreen} from './screens/ShippingScreen'
import {PaymentScreen} from './screens/PaymentScreen'
import {PlaceOrderScreen} from './screens/PlaceOrderScreen'
import {UserListScreen} from './screens/UserListScreen'
import {OrderScreen} from './screens/OrderScreen'
import {OrderListScreen} from './screens/OrderListScreen'
import {UserEditScreen} from './screens/UserEditScreen'
import {ProductListScreen} from './screens/ProductListScreen'
import {ProductEditScreen} from './screens/ProductEditScreen'
import Language from './components/Language'

function App() {
  return (
    <Router>
    	<Header />
	       <main className="py-3">
	       		<Container>
              <Language/>
              <Route path='/shipping' component={ShippingScreen}/>
              <Route path='/payment' component={PaymentScreen}/>
              <Route path='/placeorder' component={PlaceOrderScreen}/>
              <Route path='/order/:id' component={OrderScreen}/>
              <Route path='/admin/orderlist' component={OrderListScreen}/>
              <Route path='/login' component={LoginScreen} exact/>
              <Route path='/register' component={RegisterScreen} exact/>
              <Route path='/profile' component={ProfileScreen} exact/>
              <Route path='/product/:id' component={ProductScreen} exact/>
              <Route path='/product/:id/edit' component={ProductEditScreen}/>
              <Route path='/admin/productlist' component={ProductListScreen} exact/>
              <Route path='/admin/productlist:pageNumber' component={ProductListScreen} exact/>
              <Route path='/cart/:id?' component={CartScreen}/>
              <Route path='/user/:id/edit' component={UserEditScreen}/>
              <Route path='/admin/userlist' component={UserListScreen}/>
              <Route path='/search/:keyword' component={HomeScreen} exact/>
              <Route path='/page/:pageNumber' component={HomeScreen} exact/>
              <Route path='/search/:keyword/page/:pageNumber' component={HomeScreen}/>
              <Route path='/' component={HomeScreen} exact/>
	    	  	</Container>
	       </main>
       <Footer />
    </Router>
  );
}

export default App;
