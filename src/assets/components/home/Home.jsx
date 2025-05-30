import React, { useState } from 'react';
import { ChevronRight, Phone, Mail, MapPin, ShoppingCart, Flower2, Heart, Send } from 'lucide-react';
import collection1 from '../../images/collection1.jpg'
import collection2 from '../../images/collection2.jpg'
import collection3 from '../../images/collection3.jpg'
import home_mug from '../../images/Home_Mug.jpg'
import './HomeStyles.css'


export default function Home() {
    const [messageSent, setMessageSent] = useState(false);
    const [favorites, setFavorites] = useState(new Set());

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessageSent(true);
        setTimeout(() => setMessageSent(false), 2000);
    };

    const toggleFavorite = (index) => {
        const newFavorites = new Set(favorites);
        if (newFavorites.has(index)) {
            newFavorites.delete(index);
        } else {
            newFavorites.add(index);
        }
        setFavorites(newFavorites);
    };

    return (
        <main>
            {/* Hero Section */}
            <section className="pt-20 bg-gradient-to-r from-pink-50 via-white to-pink-50 relative overflow-hidden">
                <Flower2 className="hero-flower flower-spin w-20 h-20 left-10 top-40" />
                <Flower2 className="hero-flower flower-spin w-16 h-16 right-20 bottom-20" />

                <div className="container mx-auto px-4 py-20">
                    <div className="flex flex-col md:flex-row items-center">
                        <div className="md:w-1/2 mb-10 md:mb-0 relative">
                            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                                Unique Mugs for <span className="text-pink-500">Unique People</span>
                            </h1>
                            <p className="text-xl text-gray-600 mb-8">
                                Hãy khám phá những sản phẩm cốc sứ độc đáo của Muggie ✨
                            </p>
                            <button className="bg-pink-500 text-white px-8 py-3 rounded-full flex items-center hover:bg-pink-600 transition-all hover:transform hover:scale-105 hover:shadow-lg">
                                Shop Now <ChevronRight className="ml-2" />
                            </button>
                        </div>
                        <div className="md:w-1/2">
                            <img
                                src={home_mug}
                                alt="Beautiful Ceramic Mug"
                                className="rounded-lg shadow-xl floating-image"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Collection Section */}
            <section id="collection" className="py-20 bg-gradient-to-b from-pink-50 to-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">
                        Our <span className="text-pink-500">Collection</span>
                    </h2>
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
                            <div key={index} className="collection-card bg-white rounded-lg shadow-lg overflow-hidden relative">
                                <Flower2 className="card-flower w-8 h-8 text-pink-500" />
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-xl font-semibold">{product.title}</h3>
                                        <button
                                            onClick={() => toggleFavorite(index)}
                                            className="text-pink-500 hover:scale-125 transition-transform"
                                        >
                                            <Heart
                                                className={`w-6 h-6 ${favorites.has(index) ? 'fill-current' : ''}`}
                                            />
                                        </button>
                                    </div>
                                    <p className="text-gray-600 mb-4">{product.description}</p>
                                    <div className="flex justify-between items-center">
                                        <span className="text-pink-600 font-bold">{product.price}</span>
                                        <button className="bg-pink-500 text-white px-4 py-2 rounded-full hover:bg-pink-600 transition-all hover:scale-105 flex items-center">
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
            <section id="contact" className="bg-gradient-to-t from-pink-50 to-white py-20">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">
                        Get in <span className="text-pink-500">Touch</span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            {[
                                { Icon: Phone, text: '+1 234 567 890', label: 'Phone' },
                                { Icon: Mail, text: 'hello@muggy.example.com', label: 'Email' },
                                { Icon: MapPin, text: '123 Mug Street, Ceramic City, 12345', label: 'Address' }
                            ].map(({ Icon, text, label }, index) => (
                                <div key={index} className="contact-item flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                                    <Icon className="contact-icon w-6 h-6 text-pink-500 mr-4" />
                                    <div>
                                        <h3 className="font-semibold">{label}</h3>
                                        <p className="text-gray-600">{text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {['Name', 'Email'].map((placeholder, index) => (
                                <div key={index} className="input-wrapper">
                                    <input
                                        type={placeholder.toLowerCase()}
                                        placeholder={`Your ${placeholder}`}
                                        className="w-full px-4 py-3 rounded-lg border border-pink-200 focus:outline-none focus:border-pink-500 transition-all"
                                    />
                                </div>
                            ))}
                            <div className="input-wrapper">
                                <textarea
                                    placeholder="Your Message"
                                    rows={4}
                                    className="w-full px-4 py-3 rounded-lg border border-pink-200 focus:outline-none focus:border-pink-500 transition-all"
                                ></textarea>
                            </div>
                            <button
                                className={`bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 
                                          transition-all hover:shadow-lg flex items-center justify-center gap-2
                                          ${messageSent ? 'send-animation' : ''}`}
                            >
                                Send Message
                                <Send className="w-4 h-4" />
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </main>
    );
}