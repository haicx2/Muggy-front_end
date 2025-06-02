// Register.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { Heart, Flower2, ArrowRight, Mail, Lock, User } from 'lucide-react';

export default function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        // Clear the error for this field when user types
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: null,
            });
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = 'Name is required';

        if (!formData.email) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';

        if (!formData.password) newErrors.password = 'Password is required';
        else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsLoading(true);

        try {
            // In a real app, you would call your API here
            // For demo purposes, we'll simulate registration
            setTimeout(() => {
                register({
                    name: formData.name,
                    email: formData.email,
                });
                navigate('/');
            }, 1000);
        } catch (error) {
            setErrors({ form: 'Registration failed. Please try again.' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-12 flex items-center justify-center">
            <div className="w-full max-w-md">
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden relative">
                    <Flower2 className="absolute -top-4 -left-4 text-pink-200 opacity-50 w-20 h-20" />
                    <Flower2 className="absolute -bottom-4 -right-4 text-pink-200 opacity-50 w-20 h-20" />

                    <div className="p-8 relative">
                        <div className="text-center mb-8">
                            <Heart className="inline-block w-12 h-12 text-pink-500 mb-2" />
                            <h2 className="text-3xl font-bold text-gray-800">Join Muggie!</h2>
                            <p className="text-gray-600">Create your account today</p>
                        </div>

                        {errors.form && (
                            <div className="mb-4 p-3 bg-red-100 border border-red-200 text-red-700 rounded-lg text-sm">
                                {errors.form}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className={`pl-10 pr-4 py-3 w-full border-2 ${errors.name ? 'border-red-300' : 'border-pink-200'} 
                                                 rounded-xl focus:ring-2 focus:ring-pink-200 focus:border-pink-400 bg-white/80`}
                                        placeholder="Your Name"
                                    />
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-pink-400" />
                                </div>
                                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={`pl-10 pr-4 py-3 w-full border-2 ${errors.email ? 'border-red-300' : 'border-pink-200'} 
                                                 rounded-xl focus:ring-2 focus:ring-pink-200 focus:border-pink-400 bg-white/80`}
                                        placeholder="your@email.com"
                                    />
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-pink-400" />
                                </div>
                                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                <div className="relative">
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className={`pl-10 pr-4 py-3 w-full border-2 ${errors.password ? 'border-red-300' : 'border-pink-200'}
                                                 rounded-xl focus:ring-2 focus:ring-pink-200 focus:border-pink-400 bg-white/80`}
                                        placeholder="••••••••"
                                    />
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-pink-400" />
                                </div>
                                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                                <div className="relative">
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className={`pl-10 pr-4 py-3 w-full border-2 ${errors.confirmPassword ? 'border-red-300' : 'border-pink-200'}
                                                 rounded-xl focus:ring-2 focus:ring-pink-200 focus:border-pink-400 bg-white/80`}
                                        placeholder="••••••••"
                                    />
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-pink-400" />
                                </div>
                                {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
                            </div>

                            <div className="pt-2">
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full flex justify-center items-center py-3 px-4 border border-transparent
                                             rounded-xl shadow-sm text-base font-medium text-white bg-pink-500 hover:bg-pink-600
                                             focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-400
                                             transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? (
                                        <span className="inline-block h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                    ) : (
                                        <ArrowRight className="w-5 h-5 mr-2" />
                                    )}
                                    {isLoading ? 'Creating Account...' : 'Create Account'}
                                </button>
                            </div>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-600">
                                Already have an account?{' '}
                                <Link to="/login" className="font-medium text-pink-600 hover:text-pink-500">
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}