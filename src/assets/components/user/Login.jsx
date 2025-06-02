import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { Heart, Flower2, ArrowRight, Mail, Lock } from 'lucide-react';

export default function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
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
        if (!formData.email) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';

        if (!formData.password) newErrors.password = 'Password is required';
        else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';

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
            // For demo purposes, we'll simulate a successful login
            setTimeout(() => {
                login({
                    email: formData.email,
                    name: formData.email.split('@')[0], // Use part of email as name for demo
                });
                navigate('/');
            }, 1000);
        } catch (error) {
            setErrors({ form: 'Invalid email or password' });
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
                            <h2 className="text-3xl font-bold text-gray-800">Welcome Back!</h2>
                            <p className="text-gray-600">Sign in to your Muggie account</p>
                        </div>

                        {errors.form && (
                            <div className="mb-4 p-3 bg-red-100 border border-red-200 text-red-700 rounded-lg text-sm">
                                {errors.form}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
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

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        className="h-4 w-4 text-pink-500 focus:ring-pink-400 border-pink-300 rounded"
                                    />
                                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                                        Remember me
                                    </label>
                                </div>

                                <a href="#" className="text-sm font-medium text-pink-600 hover:text-pink-500">
                                    Forgot password?
                                </a>
                            </div>

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
                                {isLoading ? 'Signing In...' : 'Sign In'}
                            </button>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-600">
                                Don't have an account?{' '}
                                <Link to="/register" className="font-medium text-pink-600 hover:text-pink-500">
                                    Register here
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}