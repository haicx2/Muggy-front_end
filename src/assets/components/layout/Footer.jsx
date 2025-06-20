import React from 'react';
import { Flower2 } from 'lucide-react';
import './FooterStyles.css';

const Footer = () => {
    return (
        <footer className="footer-gradient text-white py-12 relative overflow-hidden">
            {/* Decorative flowers */}
            <Flower2 className="footer-flower footer-flower-1 w-8 h-8" />
            <Flower2 className="footer-flower footer-flower-2 w-8 h-8" />
            <Flower2 className="footer-flower footer-flower-3 w-8 h-8" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-2xl font-bold mb-4 text-pink-300">Muggie</h3>
                        <p className="text-blue-200">Gửi trao niềm vui, từng chiếc cốc một.</p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-pink-300">Quick Links</h3>
                        <ul className="space-y-3">
                            <li><a href="#home" className="footer-link text-blue-200 hover:text-pink-300">Trang chủ</a></li>
                            <li><a href="#collection" className="footer-link text-blue-200 hover:text-pink-300">Bộ sưu tập</a></li>
                            <li><a href="#bestsellers" className="footer-link text-blue-200 hover:text-pink-300">Bán chạy</a></li>
                            <li><a href="#contact" className="footer-link text-blue-200 hover:text-pink-300">Liên hệ</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-pink-300">Collections</h3>
                        <ul className="space-y-3">
                            <li><a href="#" className="footer-link text-blue-200 hover:text-pink-300">Bộ sưu tập</a></li>
                            <li><a href="#" className="footer-link text-blue-200 hover:text-pink-300">Cốc sứ nghệ thuật</a></li>
                            <li><a href="#" className="footer-link text-blue-200 hover:text-pink-300">Cốc sứ hiện đại</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-pink-300">Follow Us</h3>
                        <div className="flex flex-col space-y-3">
                            <a href="#" className="footer-link text-blue-200 hover:text-pink-300 w-fit">
                                Facebook
                            </a>
                            <a href="#" className="footer-link text-blue-200 hover:text-pink-300 w-fit">
                                Tiktok
                            </a>
                            <a href="#" className="footer-link text-blue-200 hover:text-pink-300 w-fit">
                                Instagram
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 text-center border-t border-blue-700">
                    <p className="text-blue-200">
                        &copy; {new Date().getFullYear()} Muggy. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;