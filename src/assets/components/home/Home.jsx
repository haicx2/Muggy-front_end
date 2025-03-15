import React from 'react';
import { ChevronRight, Phone, Mail, MapPin, ShoppingCart } from 'lucide-react';
import collection1 from '../../images/collection1.jpg'
import collection2 from '../../images/collection2.jpg'
import collection3 from '../../images/collection3.jpg'

export default function Home() {
    return (
        <main>
            {/* Hero Section */}
            <section className="pt-20 bg-gradient-to-r from-blue-50 via-pink-50 to-blue-50">
                <div className="container mx-auto px-4 py-20">
                    <div className="flex flex-col md:flex-row items-center">
                        <div className="md:w-1/2 mb-10 md:mb-0">
                            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                                Unique Mugs for Unique People
                            </h1>
                            <p className="text-xl text-gray-600 mb-8">
                                Discover our collection of handcrafted mugs that bring joy to every sip
                            </p>
                            <button className="bg-pink-500 text-white px-8 py-3 rounded-full flex items-center hover:bg-pink-600 transition">
                                Shop Now <ChevronRight className="ml-2" />
                            </button>
                        </div>
                        <div className="md:w-1/2">
                            <img
                                src="https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?ixlib=rb-4.0.3"
                                alt="Beautiful Ceramic Mug"
                                className="rounded-lg shadow-xl"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Collection Section */}
            <section id="collection" className="py-20">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Our Collection</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: 'Ceramic Collection',
                                image: collection1,
                                description: 'Handcrafted ceramic mugs with unique designs',
                                price: '$24.99'
                            },
                            {
                                title: 'Artist Series',
                                image: collection2,
                                description: 'Limited edition mugs featuring artist collaborations',
                                price: '$29.99'
                            },
                            {
                                title: 'Modern Collection',
                                image: collection3,
                                description: 'Contemporary designs for the modern home',
                                price: '$19.99'
                            }
                        ].map((product, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300">
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
                                    <p className="text-gray-600 mb-4">{product.description}</p>
                                    <div className="flex justify-between items-center">
                                        <span className="text-blue-600 font-bold">{product.price}</span>
                                        <button className="bg-pink-500 text-white px-4 py-2 rounded-full hover:bg-pink-600 transition flex items-center">
                                            Add to Cart <ShoppingCart className="ml-2 w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="bg-blue-50 py-20">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Get in Touch</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <div className="flex items-center mb-6">
                                <Phone className="w-6 h-6 text-pink-500 mr-4" />
                                <div>
                                    <h3 className="font-semibold">Phone</h3>
                                    <p className="text-gray-600">+1 234 567 890</p>
                                </div>
                            </div>
                            <div className="flex items-center mb-6">
                                <Mail className="w-6 h-6 text-pink-500 mr-4" />
                                <div>
                                    <h3 className="font-semibold">Email</h3>
                                    <p className="text-gray-600">hello@mugly.example.com</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <MapPin className="w-6 h-6 text-pink-500 mr-4" />
                                <div>
                                    <h3 className="font-semibold">Address</h3>
                                    <p className="text-gray-600">123 Mug Street, Ceramic City, 12345</p>
                                </div>
                            </div>
                        </div>
                        <form className="space-y-4">
                            <input
                                type="text"
                                placeholder="Your Name"
                                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-pink-500"
                            />
                            <input
                                type="email"
                                placeholder="Your Email"
                                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-pink-500"
                            />
                            <textarea
                                placeholder="Your Message"
                                rows={4}
                                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-pink-500"
                            ></textarea>
                            <button className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600 transition">
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </main>
    );
}