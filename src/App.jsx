// App.jsx
import { CartProvider } from './assets/components/cart/CartContext.jsx';
import { AuthProvider } from './assets/components/user/AuthContext.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './assets/components/home/Home.jsx';
import Footer from './assets/components/layout/Footer.jsx';
import NavBar from './assets/components/layout/NavBar.jsx';
import Mug from './assets/components/mug/Mug.jsx';
import CartPage from './assets/components/cart/CartPage.jsx';
import MugDetails from "./assets/components/mug/MugDetails.jsx";
import FloatingChatBot from "./assets/components/bot/FloatingChatBot.jsx";
import CuteBackground from "./assets/components/layout/CuteBackground.jsx";
import BestSellers from "./assets/components/mug/BestSellers.jsx";
import Login from "./assets/components/user/Login.jsx";
import Register from "./assets/components/user/Register.jsx";
import CheckoutPage from "./assets/components/cart/CheckoutPage.jsx";
import SuccessCheckout from "./assets/components/cart/SuccessCheckout.jsx";
import PaymentPage from "./assets/components/cart/PaymentPage.jsx";
import { Analytics } from "@vercel/analytics/react";
import AboutUs from "./assets/components/home/AboutUs.jsx";

function App() {
    return (
        <AuthProvider>
            <CartProvider>
                <BrowserRouter>
                    <div className="relative min-h-screen">
                        <CuteBackground />
                        <div className="relative z-10">
                            <NavBar />
                            <main className="content-wrapper">
                                <Routes>
                                    <Route path="/" element={<Home />} />
                                    <Route path="/mugs" element={<Mug />} />
                                    <Route path="/cart" element={<CartPage />} />
                                    <Route path="/mug/:id" element={<MugDetails />} />
                                    <Route path="/mugs/bestsellers" element={<BestSellers />} />
                                    <Route path="/login" element={<Login />} />
                                    <Route path="/register" element={<Register />} />
                                    <Route path="/checkout" element={<CheckoutPage />} />
                                    <Route path="/checkout/success" element={<SuccessCheckout />} />
                                    <Route path="/payment" element={<PaymentPage />} />
                                    <Route path="/about-us" element={<AboutUs />} />
                                </Routes>
                            </main>
                            <Footer />
                        </div>
                        <FloatingChatBot />
                        <Analytics/>
                    </div>
                </BrowserRouter>
            </CartProvider>
        </AuthProvider>
    );
}

export default App;