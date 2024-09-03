
import './App.css';
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import LoginUser from './pages/login'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
import RegisterSeller from './pages/RegisterSeller';
import RegisterCustomer from './pages/RegisterCustomer';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';

import AdminDashboardPage from './pages/AdminDashboardPage';
import Contact from './pages/Contact';
import About from './components/About';
import AboutPage from './pages/AboutPage';
import AddProperty from './pages/AddProperty';
import UserProfilePage from './pages/UserProfile';
import UserProfileForm from './pages/UserProfileForm';
import SellerDashboard from './pages/SellerDashboard';
import AddProductPage from './pages/AddProductPage';
import SearchResults from './pages/SearchResults';
import PlaceOrder from './pages/PlaceOrder';
import OrderConfirmation from "./pages/OrderConfirmation";
import CustomerProfile from "./pages/CustomerProfile";
import ViewProduct from './pages/viewProduct';
import UpdateProduct from './pages/updateProduct';
import ViewPendingOrder from './pages/viewPendingOrder';
import ViewShippedOrder from './pages/viewShippedOrder';
import ViewDeliveredOrder from './pages/viewDeliveredOrder';
import SellerProfile from './pages/SellerProfile';
import ViewAdminProfile from './pages/adminProfile';
import ViewCustomer from './pages/viewCustomer';
import ViewSeller from './pages/viewSeller';
import ViewAllProduct from './pages/viewAllProduct';
import ViewAllPendingOrder from './pages/viewAllPendingOrder';
import ViewAllShippedOrder from './pages/viewAllShippedOrder';
import ViewAllDeliveredOrder from './pages/viewAllDeliveredOrder';
import UpdateAdminProduct from './pages/updateAdminProduct';
import OrdersPage from './pages/OrdersPage';

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/login" element={<LoginUser />} />
        <Route path="/registerSeller" element={<RegisterSeller />} />
        <Route path="/registerCustomer" element={<RegisterCustomer />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Wishlist" element={<Wishlist />} />

        {/* <Route path="/AddProduct" element={<AddProperty />} /> */}
        <Route path="/UserProfile" element={<UserProfilePage />} />
        <Route path="/UserProfileForm" element={<UserProfileForm />} />
        <Route path="/SellerDashboard" element={<SellerDashboard />} />
        <Route path="/About" element={<AboutPage />} />
        <Route path="/AdminDashboardPage" element={<AdminDashboardPage />} />
        <Route path='/viewSeller' element={<ViewSeller/>}/>

        <Route path="/search-results" element={<SearchResults />} />
        <Route path="add-product/:sellerId" element={<AddProductPage />} />
        <Route path="viewProduct/:sellerId" element={<ViewProduct />} />
        <Route path='/updateProduct/:productId/:sellerId' element={<UpdateProduct/>}/>
        <Route path='/updateAdminProduct/:productId/:userId' element={<UpdateAdminProduct/>}/>
        <Route path='/viewPendingOrder/:sellerId' element={<ViewPendingOrder/>}/>
        <Route path='/viewShippedOrder/:sellerId' element={<ViewShippedOrder/>}/>
        <Route path='/viewDeliveredOrder/:sellerId' element={<ViewDeliveredOrder/>}/>
        <Route path='/sellerProfile/:sellerId' element= {<SellerProfile/>}/>
        <Route path='/adminProfile/:userId' element= {<ViewAdminProfile/>}/>
        <Route path='/viewCustomer' element={<ViewCustomer/>}/>
        <Route path='/viewAllProduct' element={<ViewAllProduct/>}/>
        <Route path='/viewAllPendingOrder' element={<ViewAllPendingOrder/>}/>
        <Route path='/viewAllShippedOrder' element={<ViewAllShippedOrder/>}/>
        <Route path='/viewAllDeliveredOrder' element={<ViewAllDeliveredOrder/>}/>
        <Route path='/orders/:customerId' element= {<OrdersPage/>}/>



        <Route
          path="/product-details/:productId"
          element={<ProductDetails />}
        />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="/profile" element={<CustomerProfile />} />
      </Routes>

      <ToastContainer />
    </div>
  );
}

export default App;
