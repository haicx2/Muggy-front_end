import { CartProvider } from './assets/components/cart/CartContext.jsx';
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

function App() {
    return (
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
                            </Routes>
                        </main>
                        <Footer />
                    </div>
                    <FloatingChatBot />
                </div>
            </BrowserRouter>
        </CartProvider>
    );
}

export default App;