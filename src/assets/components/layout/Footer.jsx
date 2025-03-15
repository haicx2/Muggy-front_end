const Footer = () => {
    return (
        <footer className="bg-blue-900 text-white py-10">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4">MUGGY</h3>
                        <p className="text-blue-200">Crafting moments of joy, one mug at a time</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><a href="#home" className="text-blue-200 hover:text-pink-300">Home</a></li>
                            <li><a href="#collection" className="text-blue-200 hover:text-pink-300">Collection</a></li>
                            <li><a href="#bestsellers" className="text-blue-200 hover:text-pink-300">Best Sellers</a></li>
                            <li><a href="#contact" className="text-blue-200 hover:text-pink-300">Contact</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Collections</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-blue-200 hover:text-pink-300">Ceramic Collection</a></li>
                            <li><a href="#" className="text-blue-200 hover:text-pink-300">Artist Series</a></li>
                            <li><a href="#" className="text-blue-200 hover:text-pink-300">Modern Collection</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
                        <div className="flex space-x-4">
                            <a href="#" className="text-blue-200 hover:text-pink-300">Facebook</a>
                            <a href="#" className="text-blue-200 hover:text-pink-300">Twitter</a>
                            <a href="#" className="text-blue-200 hover:text-pink-300">Instagram</a>
                        </div>
                    </div>
                </div>
                <div className="border-t border-blue-800 mt-8 pt-8 text-center text-blue-200">
                    <p>&copy; 2024 Muggy. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
